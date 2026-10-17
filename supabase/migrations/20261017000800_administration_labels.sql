-- Names only for the selected tenant's members/invitees, never a global directory.
create function public.administration_labels(p_tenant uuid)
returns table(user_id uuid,display_name text)
language plpgsql stable security definer set search_path='' as $$
begin
 if not private.has_role(p_tenant,array['tenant_admin']::public.tenant_role[]) then
 raise exception 'Nedovoljno ovlašćenje.' using errcode='42501'; end if;
 return query select p.id,p.display_name from public.profiles p where exists(
 select 1 from public.memberships m where m.user_id=p.id and m.tenant_id=p_tenant)
 or exists(select 1 from public.invitations i where i.user_id=p.id and i.tenant_id=p_tenant);
end;
$$;
revoke all on function public.administration_labels(uuid) from public,anon,authenticated,service_role;
grant execute on function public.administration_labels(uuid) to authenticated;
notify pgrst,'reload schema';
