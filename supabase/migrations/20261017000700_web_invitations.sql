-- Invitations grant no access before explicit acceptance by the invited Auth identity.
create table public.invitations (
 id uuid primary key default gen_random_uuid(),
 tenant_id uuid not null references public.tenants(id),
 user_id uuid not null references public.profiles(id),
 invited_by uuid not null references public.profiles(id),
 created_at timestamptz not null default now(),
 expires_at timestamptz not null default now() + interval '7 days',
 accepted_at timestamptz,
 revoked_at timestamptz,
 basis text not null check(length(trim(basis)) > 0),
 check(expires_at > created_at)
);
alter table public.invitations enable row level security;
revoke all on public.invitations from public,anon,authenticated,service_role;
grant select on public.invitations to authenticated;
create policy invitations_read on public.invitations for select to authenticated using(
 user_id=(select auth.uid()) or private.has_role(tenant_id,array['tenant_admin']::public.tenant_role[]));
create trigger audit_invitations after insert or update or delete on public.invitations
for each row execute function private.record_change();

create function public.record_invitation(p_tenant uuid,p_user uuid,p_basis text) returns uuid
language plpgsql security definer set search_path='' as $$
declare result uuid;
begin
 perform private.require_admin(p_tenant); perform private.require_basis(p_basis);
 if exists(select 1 from public.invitations where tenant_id=p_tenant and user_id=p_user
   and accepted_at is null and revoked_at is null and expires_at>statement_timestamp()) then
 raise exception 'Aktivan poziv već postoji.' using errcode='23514'; end if;
 insert into public.invitations(tenant_id,user_id,invited_by,basis)
 values(p_tenant,p_user,auth.uid(),p_basis) returning id into result;
 return result;
end;
$$;
create function public.revoke_invitation(p_invitation uuid,p_basis text) returns void
language plpgsql security definer set search_path='' as $$
declare t uuid;
begin
 select tenant_id into t from public.invitations where id=p_invitation for update;
 perform private.require_admin(t); perform private.require_basis(p_basis);
 update public.invitations set revoked_at=statement_timestamp() where id=p_invitation and accepted_at is null;
end;
$$;
create function public.accept_invitation(p_invitation uuid) returns uuid
language plpgsql security definer set search_path='' as $$
declare i public.invitations; result uuid; issuer_valid boolean;
begin
 -- Same serialization boundary as administrative revocations.
 perform private.lock_authorization();
 select * into i from public.invitations where id=p_invitation and user_id=auth.uid() for update;
 if i.id is null or i.revoked_at is not null or i.expires_at<=statement_timestamp() then
 raise exception 'Poziv nije dostupan ili je istekao.' using errcode='42501'; end if;
 if not exists(select 1 from auth.users where id=auth.uid() and email_confirmed_at is not null) then
 raise exception 'Potvrdite email.' using errcode='42501'; end if;
 select exists(select 1 from public.system_admin_grants where user_id=i.invited_by and revoked_at is null
 and valid_from<=statement_timestamp() and (valid_until is null or valid_until>statement_timestamp()))
 or exists(select 1 from public.memberships m join public.tenant_role_grants g on g.membership_id=m.id
 where m.user_id=i.invited_by and m.tenant_id=i.tenant_id and m.revoked_at is null
 and m.valid_from<=statement_timestamp() and (m.valid_until is null or m.valid_until>statement_timestamp())
 and g.role='tenant_admin' and g.revoked_at is null and g.valid_from<=statement_timestamp()
 and (g.valid_until is null or g.valid_until>statement_timestamp())) into issuer_valid;
 if not issuer_valid then raise exception 'Pozivalac više nema ovlašćenje. Zatražite novi poziv.' using errcode='42501'; end if;
 if i.accepted_at is not null then
 raise exception 'Poziv je već prihvaćen.' using errcode='23514'; end if;
 perform private.require_basis('Prihvatanje poziva');
 select id into result from public.memberships where tenant_id=i.tenant_id and user_id=auth.uid()
 and revoked_at is null and valid_from<=statement_timestamp() and (valid_until is null or valid_until>statement_timestamp());
 if result is null then
 insert into public.memberships(tenant_id,user_id) values(i.tenant_id,auth.uid()) returning id into result;
 end if;
 if not exists(select 1 from public.tenant_role_grants where membership_id=result and role='member' and revoked_at is null) then
 insert into public.tenant_role_grants(tenant_id,membership_id,role,granted_by,basis)
 values(i.tenant_id,result,'member',auth.uid(),'Prihvatanje poziva'); end if;
 update public.invitations set accepted_at=statement_timestamp() where id=i.id;
 return result;
end;
$$;
revoke all on function public.record_invitation(uuid,uuid,text),public.revoke_invitation(uuid,text),public.accept_invitation(uuid) from public,anon,authenticated,service_role;
grant execute on function public.record_invitation(uuid,uuid,text),public.revoke_invitation(uuid,text),public.accept_invitation(uuid) to authenticated;
notify pgrst, 'reload schema';
