-- A real row update also rejects stale repeatable-read writers with serialization failure.
-- Advisory locks alone only serialize execution, not an already acquired MVCC snapshot.
create table private.authorization_lock (
 id boolean primary key default true check (id),
 revision bigint not null default 0
);
insert into private.authorization_lock(id) values(true);
revoke all on private.authorization_lock from public,anon,authenticated,service_role;
create function private.lock_authorization() returns void
language plpgsql volatile security definer set search_path='' as $$
begin
 update private.authorization_lock set revision=revision+1 where id=true;
 if not found then raise exception 'Nedostaje administratorska kontrola.' using errcode='55000'; end if;
end;
$$;
revoke all on function private.lock_authorization() from public,anon,authenticated,service_role;
do $$
declare definition text;
begin
 for definition in select pg_get_functiondef(p.oid) from pg_proc p
 join pg_namespace n on n.oid=p.pronamespace
 where n.nspname in ('private','public') and p.prokind='f'
 and p.prosrc like '%pg_advisory_xact_lock(70420261017)%'
 loop
   execute replace(definition,'pg_advisory_xact_lock(70420261017)','private.lock_authorization()');
 end loop;
end;
$$;
