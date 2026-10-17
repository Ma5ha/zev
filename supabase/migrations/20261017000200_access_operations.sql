-- DEV-03-B: reads use RLS, all mutations use narrow authenticated RPCs.
create function private.is_system_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select auth.uid() is not null and exists (
    select 1 from public.system_admin_grants g where g.user_id = auth.uid()
    and g.valid_from <= statement_timestamp() and g.revoked_at is null
    and (g.valid_until is null or g.valid_until > statement_timestamp())
  );
$$;
create function private.has_role(p_tenant uuid, p_roles public.tenant_role[]) returns boolean
language sql stable security definer set search_path = '' as $$
  select private.is_system_admin() or exists (
    select 1 from public.memberships m join public.tenant_role_grants g
      on g.membership_id = m.id and g.tenant_id = m.tenant_id
    where m.tenant_id = p_tenant and m.user_id = auth.uid()
    and m.valid_from <= statement_timestamp() and m.revoked_at is null
    and (m.valid_until is null or m.valid_until > statement_timestamp())
    and g.role = any(p_roles) and g.valid_from <= statement_timestamp()
    and g.revoked_at is null and (g.valid_until is null or g.valid_until > statement_timestamp())
  );
$$;
create function private.is_member(p_tenant uuid) returns boolean
language sql stable security definer set search_path = '' as $$
 select private.is_system_admin() or exists (
   select 1 from public.memberships m where m.tenant_id=p_tenant and m.user_id=auth.uid()
   and m.valid_from<=statement_timestamp() and m.revoked_at is null
   and (m.valid_until is null or m.valid_until>statement_timestamp())
 );
$$;
-- Rechecks delegation source and membership on every request, not JWT role claims.
create function private.can_read_card(p_tenant uuid,p_unit uuid,p_date date) returns boolean
language sql stable security definer set search_path = '' as $$
 select p_date is not null and (
   private.has_role(p_tenant,array['tenant_admin','finance_operator','finance_viewer']::public.tenant_role[])
   or exists (
     select 1 from public.card_access_grants g join public.ownerships o
       on o.id=g.source_ownership_id and o.unit_id=g.unit_id and o.tenant_id=g.tenant_id
     where g.tenant_id=p_tenant and g.unit_id=p_unit and g.user_id=auth.uid()
     and g.valid_from<=statement_timestamp() and g.revoked_at is null
     and (g.valid_until is null or g.valid_until>statement_timestamp())
     and p_date>=g.period_from and (g.period_until is null or p_date<g.period_until)
     and p_date>=o.valid_from and (o.valid_until is null or p_date<o.valid_until)
     and case when g.kind='former_owner' then o.user_id=auth.uid()
       when g.kind='owner' then o.user_id=auth.uid() and private.is_member(p_tenant)
       else private.is_member(p_tenant) and current_date>=o.valid_from
         and (o.valid_until is null or current_date<o.valid_until) end
   )
 );
$$;
create function private.require_admin(p_tenant uuid default null) returns void
language plpgsql security definer set search_path = '' as $$
begin
 -- One lock serializes role/membership/ownership changes, including last-admin checks.
 perform pg_advisory_xact_lock(70420261017);
 if auth.uid() is null or not (private.is_system_admin() or
   (p_tenant is not null and private.has_role(p_tenant,array['tenant_admin']::public.tenant_role[])))
 then raise exception 'Nedovoljno ovlašćenje.' using errcode='42501'; end if;
end;
$$;
create function private.require_basis(p_basis text) returns void
language plpgsql immutable set search_path='' as $$
begin
 if p_basis is null or length(trim(p_basis))=0 then
   raise exception 'Osnov promjene je obavezan.' using errcode='22023'; end if;
end;
$$;
create function private.check_last_admin(p_tenant uuid default null) returns void
language plpgsql security definer set search_path='' as $$
begin
 if p_tenant is null then
   if not exists(select 1 from public.system_admin_grants where revoked_at is null
     and valid_from<=statement_timestamp() and valid_until is null) then
     raise exception 'Posljednji administrator sistema zahtijeva prethodnu zamjenu.' using errcode='23514';
   end if;
 else
   if not exists(select 1 from public.tenant_role_grants g join public.memberships m on m.id=g.membership_id
     where g.tenant_id=p_tenant and g.role='tenant_admin' and g.revoked_at is null
     and g.valid_from<=statement_timestamp() and g.valid_until is null
     and m.revoked_at is null and m.valid_from<=statement_timestamp() and m.valid_until is null) then
     raise exception 'Posljednji administrator ZEV-a zahtijeva prethodnu zamjenu.' using errcode='23514';
   end if;
 end if;
end;
$$;

-- Avoid copying email or security-sensitive metadata into public profiles.
create function private.create_profile() returns trigger
language plpgsql security definer set search_path='' as $$
begin
 insert into public.profiles(id,display_name) values(NEW.id,
   left(coalesce(nullif(trim(NEW.raw_user_meta_data->>'display_name'),''),'Novi korisnik'),120));
 return NEW;
end;
$$;
create trigger create_application_profile after insert on auth.users
for each row execute function private.create_profile();
insert into public.profiles(id,display_name)
 select id,left(coalesce(nullif(trim(raw_user_meta_data->>'display_name'),''),'Novi korisnik'),120)
 from auth.users on conflict(id) do nothing;

-- Read policies never expose an entire resident directory to normal members.
grant usage on schema private to authenticated;
grant select on public.profiles,public.tenants,public.buildings,public.units,public.memberships,
 public.tenant_role_grants,public.system_admin_grants,public.ownerships,public.card_access_grants to authenticated;
create policy profiles_read on public.profiles for select to authenticated
 using(id=(select auth.uid()) or (select private.is_system_admin()));
create policy tenants_read on public.tenants for select to authenticated using(private.is_member(id));
create policy buildings_read on public.buildings for select to authenticated using(private.is_member(tenant_id));
create policy units_read on public.units for select to authenticated using(
 private.has_role(tenant_id,array['tenant_admin','finance_operator','finance_viewer']::public.tenant_role[])
 or exists(select 1 from public.ownerships o where o.unit_id=units.id and o.user_id=(select auth.uid()))
 or exists(select 1 from public.card_access_grants g where g.unit_id=units.id and g.user_id=(select auth.uid()))
);
create policy memberships_read on public.memberships for select to authenticated using(
 user_id=(select auth.uid()) or private.has_role(tenant_id,array['tenant_admin']::public.tenant_role[]));
create policy roles_read on public.tenant_role_grants for select to authenticated using(
 private.has_role(tenant_id,array['tenant_admin']::public.tenant_role[]) or exists(
 select 1 from public.memberships m where m.id=membership_id and m.user_id=(select auth.uid())));
create policy system_roles_read on public.system_admin_grants for select to authenticated
 using((select private.is_system_admin()) or user_id=(select auth.uid()));
create function private.ownership_visible(p_id uuid) returns boolean
language sql stable security definer set search_path='' as $$
select exists(select 1 from public.ownerships o where o.id=p_id and (
 private.has_role(o.tenant_id,array['tenant_admin','finance_operator','finance_viewer']::public.tenant_role[])
 or (o.user_id=auth.uid() and (private.is_member(o.tenant_id) or exists(select 1 from public.card_access_grants g
 where g.source_ownership_id=o.id and g.user_id=auth.uid() and g.kind='former_owner' and g.revoked_at is null
 and g.valid_from<=statement_timestamp() and (g.valid_until is null or g.valid_until>statement_timestamp()))))))
$$;
create policy ownerships_read on public.ownerships for select to authenticated using(private.ownership_visible(id));
create function private.card_grant_visible(p_id uuid) returns boolean
language sql stable security definer set search_path='' as $$
select exists(select 1 from public.card_access_grants g join public.ownerships o on o.id=g.source_ownership_id
where g.id=p_id and (
 private.has_role(g.tenant_id,array['tenant_admin','finance_operator','finance_viewer']::public.tenant_role[])
 or (g.user_id=auth.uid() and g.revoked_at is null and g.valid_from<=statement_timestamp()
 and (g.valid_until is null or g.valid_until>statement_timestamp())
 and (g.kind='former_owner' or private.is_member(g.tenant_id))
 and (g.kind<>'tenant_delegate' or (current_date>=o.valid_from and (o.valid_until is null or current_date<o.valid_until))))));
$$;
create policy cards_read on public.card_access_grants for select to authenticated using(private.card_grant_visible(id));

create function public.update_profile(p_display_name text,p_user uuid default null) returns void
language plpgsql security definer set search_path='' as $$
declare target uuid:=coalesce(p_user,auth.uid());
begin
 if auth.uid() is null or (target<>auth.uid() and not private.is_system_admin()) then
 raise exception 'Nedovoljno ovlašćenje.' using errcode='42501'; end if;
 update public.profiles set display_name=p_display_name where id=target;
 if not found then raise exception 'Profil nije dostupan.' using errcode='22023'; end if;
end;
$$;
-- Service-role-only, one-shot bootstrap. No arbitrary first-user self-promotion.
create function public.bootstrap_system_admin(p_user uuid,p_basis text) returns uuid
language plpgsql security definer set search_path='' as $$
declare result uuid;
begin
 perform pg_advisory_xact_lock(70420261017); perform private.require_basis(p_basis);
 if exists(select 1 from public.system_admin_grants) then
 raise exception 'Početni administrator je već postavljen.' using errcode='23514'; end if;
 insert into public.system_admin_grants(user_id,granted_by,basis) values(p_user,p_user,p_basis) returning id into result;
 return result;
end;
$$;
create function public.set_system_admin(p_user uuid,p_enabled boolean,p_basis text) returns void
language plpgsql security definer set search_path='' as $$
begin
 perform private.require_admin(); perform private.require_basis(p_basis);
 if p_enabled is null then raise exception 'Izbor je obavezan.' using errcode='22023'; end if;
 if p_enabled then
   if not exists(select 1 from public.system_admin_grants where user_id=p_user and revoked_at is null) then
     insert into public.system_admin_grants(user_id,granted_by,basis) values(p_user,auth.uid(),p_basis);
   end if;
 else
   update public.system_admin_grants set revoked_at=statement_timestamp() where user_id=p_user and revoked_at is null;
   perform private.check_last_admin();
 end if;
end;
$$;
create function public.create_tenant(p_slug text,p_name text,p_admin uuid,p_basis text) returns uuid
language plpgsql security definer set search_path='' as $$
declare result uuid; member_id uuid;
begin
 perform private.require_admin(); perform private.require_basis(p_basis);
 insert into public.tenants(slug,name) values(p_slug,p_name) returning id into result;
 insert into public.memberships(tenant_id,user_id) values(result,p_admin) returning id into member_id;
 insert into public.tenant_role_grants(tenant_id,membership_id,role,granted_by,basis)
 values(result,member_id,'tenant_admin',auth.uid(),p_basis);
 return result;
end;
$$;
create function public.update_tenant(p_tenant uuid,p_name text) returns void
language plpgsql security definer set search_path='' as $$
begin
 perform private.require_admin(p_tenant);
 update public.tenants set name=p_name where id=p_tenant;
 if not found then raise exception 'ZEV nije dostupan.' using errcode='22023'; end if;
end;
$$;
create function public.save_building(p_tenant uuid,p_name text,p_id uuid default null) returns uuid
language plpgsql security definer set search_path='' as $$
declare result uuid;
begin
 perform private.require_admin(p_tenant);
 if p_id is null then insert into public.buildings(tenant_id,name) values(p_tenant,p_name) returning id into result;
 else update public.buildings set name=p_name where id=p_id and tenant_id=p_tenant returning id into result; end if;
 if result is null then raise exception 'Zgrada nije dostupna.' using errcode='22023'; end if;
 return result;
end;
$$;
create function public.save_unit(p_tenant uuid,p_building uuid,p_label text,p_area numeric,p_id uuid default null) returns uuid
language plpgsql security definer set search_path='' as $$
declare result uuid;
begin
 perform private.require_admin(p_tenant);
 if p_id is null then insert into public.units(tenant_id,building_id,label,area_m2)
 values(p_tenant,p_building,p_label,p_area) returning id into result;
 else update public.units set building_id=p_building,label=p_label,area_m2=p_area
 where id=p_id and tenant_id=p_tenant returning id into result; end if;
 if result is null then raise exception 'Jedinica nije dostupna.' using errcode='22023'; end if;
 return result;
end;
$$;
create function public.add_membership(p_tenant uuid,p_user uuid,p_basis text,p_until timestamptz default null) returns uuid
language plpgsql security definer set search_path='' as $$
declare result uuid;
begin
 perform private.require_admin(p_tenant); perform private.require_basis(p_basis);
 select id into result from public.memberships where tenant_id=p_tenant and user_id=p_user
 and revoked_at is null and valid_from<=statement_timestamp()
 and (valid_until is null or valid_until>statement_timestamp());
 if result is null then
 insert into public.memberships(tenant_id,user_id,valid_until) values(p_tenant,p_user,p_until) returning id into result;
 end if;
 return result;
end;
$$;
create function public.set_tenant_role(p_membership uuid,p_role public.tenant_role,p_enabled boolean,p_basis text) returns void
language plpgsql security definer set search_path='' as $$
declare m public.memberships;
begin
 perform pg_advisory_xact_lock(70420261017);
 select * into m from public.memberships where id=p_membership;
 perform private.require_admin(m.tenant_id); perform private.require_basis(p_basis);
 if m.id is null or p_role is null or p_enabled is null then raise exception 'Neispravan izbor.' using errcode='22023'; end if;
 if p_enabled then
   if m.revoked_at is not null or m.valid_from>statement_timestamp() or
     (m.valid_until is not null and m.valid_until<=statement_timestamp()) then
     raise exception 'Članstvo nije aktivno.' using errcode='22023'; end if;
   if p_role='tenant_admin' and m.valid_until is not null then
     raise exception 'Administrator zahtijeva članstvo bez automatskog isteka.' using errcode='23514'; end if;
   if not exists(select 1 from public.tenant_role_grants where membership_id=m.id and role=p_role and revoked_at is null) then
     insert into public.tenant_role_grants(tenant_id,membership_id,role,granted_by,basis)
     values(m.tenant_id,m.id,p_role,auth.uid(),p_basis);
   end if;
 else
   update public.tenant_role_grants set revoked_at=statement_timestamp()
     where membership_id=m.id and role=p_role and revoked_at is null;
   if p_role='tenant_admin' then perform private.check_last_admin(m.tenant_id); end if;
 end if;
end;
$$;
create function public.revoke_membership(p_membership uuid,p_basis text) returns void
language plpgsql security definer set search_path='' as $$
declare m public.memberships; was_admin boolean;
begin
 perform pg_advisory_xact_lock(70420261017);
 select * into m from public.memberships where id=p_membership;
 perform private.require_admin(m.tenant_id); perform private.require_basis(p_basis);
 if m.id is null then raise exception 'Članstvo nije dostupno.' using errcode='22023'; end if;
 select exists(select 1 from public.tenant_role_grants where membership_id=m.id and role='tenant_admin'
 and revoked_at is null) into was_admin;
 update public.memberships set revoked_at=statement_timestamp() where id=m.id and revoked_at is null;
 update public.tenant_role_grants set revoked_at=statement_timestamp() where membership_id=m.id and revoked_at is null;
 if was_admin then perform private.check_last_admin(m.tenant_id); end if;
end;
$$;
create function public.add_ownership(p_tenant uuid,p_unit uuid,p_user uuid,p_from date,p_basis text) returns uuid
language plpgsql security definer set search_path='' as $$
declare result uuid;
begin
 perform private.require_admin(p_tenant); perform private.require_basis(p_basis);
 if not exists(select 1 from public.memberships where tenant_id=p_tenant and user_id=p_user and revoked_at is null
 and valid_from<=statement_timestamp() and (valid_until is null or valid_until>statement_timestamp())) then
 raise exception 'Vlasnik zahtijeva aktivno članstvo.' using errcode='23514'; end if;
 if exists(select 1 from public.ownerships where tenant_id=p_tenant and unit_id=p_unit and user_id=p_user
 and (valid_until is null or valid_until>p_from)) then
 raise exception 'Vlasnička veza se preklapa.' using errcode='23514'; end if;
 insert into public.ownerships(tenant_id,unit_id,user_id,basis,valid_from)
 values(p_tenant,p_unit,p_user,p_basis,p_from) returning id into result;
 insert into public.card_access_grants(tenant_id,unit_id,user_id,kind,source_ownership_id,granted_by,basis,period_from)
 values(p_tenant,p_unit,p_user,'owner',result,auth.uid(),p_basis,p_from);
 return result;
end;
$$;
create function public.end_ownership(p_ownership uuid,p_until date,p_basis text) returns void
language plpgsql security definer set search_path='' as $$
declare o public.ownerships;
begin
 perform pg_advisory_xact_lock(70420261017);
 select * into o from public.ownerships where id=p_ownership;
 perform private.require_admin(o.tenant_id); perform private.require_basis(p_basis);
 if o.id is null or o.valid_until is not null or p_until is null or p_until<=o.valid_from then
 raise exception 'Neispravan period vlasništva.' using errcode='22023'; end if;
 update public.ownerships set valid_until=p_until where id=o.id;
 -- Keep the old owner's historical grant; no automatic transfer of balances.
 update public.card_access_grants set kind='former_owner',period_until=p_until
 where source_ownership_id=o.id and kind='owner' and revoked_at is null;
 -- Future-dated ends are also enforced by can_read_card on every request.
 update public.card_access_grants set revoked_at=statement_timestamp()
 where source_ownership_id=o.id and kind='tenant_delegate' and revoked_at is null and p_until<=current_date;
end;
$$;
create function public.delegate_card(p_ownership uuid,p_user uuid,p_from date,p_until date,p_expires timestamptz,p_basis text) returns uuid
language plpgsql security definer set search_path='' as $$
declare o public.ownerships; result uuid;
begin
 perform pg_advisory_xact_lock(70420261017);
 select * into o from public.ownerships where id=p_ownership;
 perform private.require_admin(o.tenant_id); perform private.require_basis(p_basis);
 if o.id is null or p_from is null or p_until is null or p_from<o.valid_from or p_until<=p_from
 or (o.valid_until is not null and p_until>o.valid_until)
 or current_date<o.valid_from or (o.valid_until is not null and current_date>=o.valid_until)
 or p_expires is null or p_expires<=statement_timestamp() then
 raise exception 'Neispravan period delegacije.' using errcode='22023'; end if;
 if not exists(select 1 from public.memberships where tenant_id=o.tenant_id and user_id=p_user
 and revoked_at is null and valid_from<=statement_timestamp() and (valid_until is null or valid_until>statement_timestamp())) then
 raise exception 'Zakupac zahtijeva aktivno članstvo.' using errcode='23514'; end if;
 insert into public.card_access_grants(tenant_id,unit_id,user_id,kind,source_ownership_id,
 granted_by,basis,period_from,period_until,valid_until)
 values(o.tenant_id,o.unit_id,p_user,'tenant_delegate',o.id,auth.uid(),p_basis,p_from,p_until,p_expires) returning id into result;
 return result;
end;
$$;
create function public.revoke_card_access(p_grant uuid,p_basis text) returns void
language plpgsql security definer set search_path='' as $$
declare target_tenant uuid;
begin
 perform pg_advisory_xact_lock(70420261017);
 select tenant_id into target_tenant from public.card_access_grants where id=p_grant;
 perform private.require_admin(target_tenant); perform private.require_basis(p_basis);
 if target_tenant is null then raise exception 'Ovlašćenje nije dostupno.' using errcode='22023'; end if;
 update public.card_access_grants set revoked_at=statement_timestamp() where id=p_grant and revoked_at is null;
end;
$$;
-- Returns only caller permissions, never answers whether another person has a role.
create function public.my_permissions(p_tenant uuid) returns jsonb
language sql stable security definer set search_path='' as $$
 select jsonb_build_object(
 'system_admin',private.is_system_admin(),
 'tenant_admin',private.has_role(p_tenant,array['tenant_admin']::public.tenant_role[]),
 'member',private.has_role(p_tenant,array['member','tenant_admin']::public.tenant_role[]),
 'finance_read',private.has_role(p_tenant,array['tenant_admin','finance_operator','finance_viewer']::public.tenant_role[]),
 'finance_write',private.has_role(p_tenant,array['tenant_admin','finance_operator']::public.tenant_role[]),
 'content_write',private.has_role(p_tenant,array['tenant_admin','content_operator']::public.tenant_role[]));
$$;
create function public.can_read_card(p_tenant uuid,p_unit uuid,p_date date) returns boolean
language sql stable security definer set search_path='' as $$
 select private.can_read_card(p_tenant,p_unit,p_date);
$$;

alter table private.audit_events add column transaction_id xid8 not null default pg_current_xact_id();

-- Every change reason is retained separately; audit row snapshots remain private.
create table private.operation_reasons (
 id bigint generated always as identity primary key,
 actor_id uuid, occurred_at timestamptz not null default statement_timestamp(),
 operation text not null, basis text not null, transaction_id xid8 not null default pg_current_xact_id()
);
create or replace function private.require_basis(p_basis text) returns void
language plpgsql volatile security definer set search_path='' as $$
begin
 if p_basis is null or length(trim(p_basis))=0 then
 raise exception 'Osnov promjene je obavezan.' using errcode='22023'; end if;
 insert into private.operation_reasons(actor_id,operation,basis)
 values(auth.uid(),'access_change',p_basis);
end;
$$;
-- Freeze accidental default execution grants for all new functions in this migration.
do $$
declare f record;
begin
 for f in select p.oid::regprocedure as sig,n.nspname,p.proname from pg_proc p
 join pg_namespace n on n.oid=p.pronamespace where n.nspname in ('public','private')
 and p.proname in ('is_system_admin','has_role','is_member','can_read_card','require_admin',
 'ownership_visible','card_grant_visible','require_basis','check_last_admin','create_profile','update_profile','bootstrap_system_admin',
 'set_system_admin','create_tenant','update_tenant','save_building','save_unit','add_membership',
 'set_tenant_role','revoke_membership','add_ownership','end_ownership','delegate_card','revoke_card_access','my_permissions')
 loop
   execute format('revoke all on function %s from public, anon, authenticated, service_role',f.sig);
   if f.nspname='public' and f.proname='bootstrap_system_admin' then
     execute format('grant execute on function %s to service_role',f.sig);
   elsif f.nspname='public' or f.proname in ('is_system_admin','has_role','is_member','ownership_visible','card_grant_visible') then
     execute format('grant execute on function %s to authenticated',f.sig);
   end if;
 end loop;
end;
$$;
revoke all on private.operation_reasons from public,anon,authenticated,service_role;
-- No client UPDATE/INSERT/DELETE grants or write policies: RPCs are the only write path.
notify pgrst, 'reload schema';
