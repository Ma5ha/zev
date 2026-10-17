-- A recipient can identify the invited ZEV before membership, without general tenant access.
create function public.my_invitations()
returns table(id uuid,tenant_name text,expires_at timestamptz)
language sql stable security definer set search_path='' as $$
 select i.id,t.name,i.expires_at from public.invitations i join public.tenants t on t.id=i.tenant_id
 where i.user_id=auth.uid() and i.accepted_at is null and i.revoked_at is null
 and i.expires_at>statement_timestamp();
$$;
revoke all on function public.my_invitations() from public,anon,authenticated,service_role;
grant execute on function public.my_invitations() to authenticated;
-- Use the same lock order as acceptance and other administrative operations.
create or replace function public.revoke_invitation(p_invitation uuid,p_basis text) returns void
language plpgsql security definer set search_path='' as $$
declare t uuid;
begin
 perform private.lock_authorization();
 select tenant_id into t from public.invitations where id=p_invitation for update;
 perform private.require_admin(t); perform private.require_basis(p_basis);
 update public.invitations set revoked_at=statement_timestamp() where id=p_invitation and accepted_at is null;
end;
$$;
notify pgrst,'reload schema';
