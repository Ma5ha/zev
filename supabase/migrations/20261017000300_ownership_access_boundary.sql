-- Review correction: ownership change ends member-only current access.
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
   and x.id<>o.id and (x.valid_until is null or x.valid_until>p_until))
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
create or replace function public.can_read_card(p_tenant uuid,p_unit uuid,p_date date) returns boolean
language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.units where id=p_unit and tenant_id=p_tenant)
 and private.can_read_card(p_tenant,p_unit,p_date);
$$;
