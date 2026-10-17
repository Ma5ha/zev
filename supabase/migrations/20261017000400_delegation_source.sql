-- Delegation never outlives the source owner's effective authority.
create function private.delegation_source_active(p_ownership uuid) returns boolean
language sql stable security definer set search_path='' as $$
select exists(select 1 from public.ownerships o where o.id=p_ownership
and current_date>=o.valid_from and (o.valid_until is null or current_date<o.valid_until)
and exists(select 1 from public.memberships m where m.tenant_id=o.tenant_id and m.user_id=o.user_id
and m.revoked_at is null and m.valid_from<=statement_timestamp()
and (m.valid_until is null or m.valid_until>statement_timestamp()))
and exists(select 1 from public.card_access_grants g where g.source_ownership_id=o.id
and g.user_id=o.user_id and g.kind in ('owner','former_owner') and g.revoked_at is null
and g.valid_from<=statement_timestamp() and (g.valid_until is null or g.valid_until>statement_timestamp())
and current_date>=g.period_from and (g.period_until is null or current_date<g.period_until)));
$$;
revoke all on function private.delegation_source_active(uuid) from public,anon,authenticated,service_role;

create or replace function private.can_read_card(p_tenant uuid,p_unit uuid,p_date date) returns boolean
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
       else private.is_member(p_tenant) and private.delegation_source_active(o.id) and current_date>=o.valid_from
         and (o.valid_until is null or current_date<o.valid_until) end
   )
 );
$$;
create or replace function private.card_grant_visible(p_id uuid) returns boolean
language sql stable security definer set search_path='' as $$
select exists(select 1 from public.card_access_grants g join public.ownerships o on o.id=g.source_ownership_id
where g.id=p_id and (
 private.has_role(g.tenant_id,array['tenant_admin','finance_operator','finance_viewer']::public.tenant_role[])
 or (g.user_id=auth.uid() and g.revoked_at is null and g.valid_from<=statement_timestamp()
 and (g.valid_until is null or g.valid_until>statement_timestamp())
 and (g.kind='former_owner' or private.is_member(g.tenant_id))
 and (g.kind<>'tenant_delegate' or (private.delegation_source_active(o.id) and current_date>=o.valid_from and (o.valid_until is null or current_date<o.valid_until))))));
$$;
create or replace function public.delegate_card(p_ownership uuid,p_user uuid,p_from date,p_until date,p_expires timestamptz,p_basis text) returns uuid
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
 if not private.delegation_source_active(o.id) or not exists(
 select 1 from public.card_access_grants g where g.source_ownership_id=o.id and g.user_id=o.user_id
 and g.kind in ('owner','former_owner') and g.revoked_at is null and g.valid_from<=statement_timestamp()
 and (g.valid_until is null or g.valid_until>=p_expires)
 and p_from>=g.period_from and (g.period_until is null or p_until<=g.period_until)) then
 raise exception 'Izvorno ovlašćenje vlasnika nije aktivno ili ne pokriva traženi period.' using errcode='23514'; end if;
 if not exists(select 1 from public.memberships where tenant_id=o.tenant_id and user_id=p_user
 and revoked_at is null and valid_from<=statement_timestamp() and (valid_until is null or valid_until>statement_timestamp())) then
 raise exception 'Zakupac zahtijeva aktivno članstvo.' using errcode='23514'; end if;
 insert into public.card_access_grants(tenant_id,unit_id,user_id,kind,source_ownership_id,
 granted_by,basis,period_from,period_until,valid_until)
 values(o.tenant_id,o.unit_id,p_user,'tenant_delegate',o.id,auth.uid(),p_basis,p_from,p_until,p_expires) returning id into result;
 return result;
end;
$$;
create or replace function public.end_ownership(p_ownership uuid,p_until date,p_basis text) returns void
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
-- A member whose only basis was this ownership loses current common access,
 -- while explicit operational roles, another ownership or delegation remain independent.
 if not exists(select 1 from public.ownerships x where x.tenant_id=o.tenant_id and x.user_id=o.user_id
   and x.id<>o.id and x.valid_from<=p_until and (x.valid_until is null or x.valid_until>p_until))
 and not exists(select 1 from public.tenant_role_grants g join public.memberships m on m.id=g.membership_id
   where m.tenant_id=o.tenant_id and m.user_id=o.user_id and m.revoked_at is null
   and g.revoked_at is null and g.role<>'member'
   and (g.valid_until is null or g.valid_until>statement_timestamp()))
 and not exists(select 1 from public.card_access_grants g join public.ownerships x on x.id=g.source_ownership_id
   where g.tenant_id=o.tenant_id and g.user_id=o.user_id and g.kind='tenant_delegate' and g.revoked_at is null
   and (g.valid_until is null or g.valid_until>p_until::timestamptz)
   and (x.valid_until is null or x.valid_until>p_until)) then
   if p_until<=current_date then
     update public.memberships set revoked_at=statement_timestamp()
     where tenant_id=o.tenant_id and user_id=o.user_id and revoked_at is null;
   else
     update public.memberships set valid_until=least(coalesce(valid_until,p_until::timestamptz),p_until::timestamptz)
     where tenant_id=o.tenant_id and user_id=o.user_id and revoked_at is null;
   end if;
 end if;
end;
$$;
notify pgrst, 'reload schema';
