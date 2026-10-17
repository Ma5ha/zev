-- DEV-03-A: portable foundation, deliberately closed to application clients.
-- Mutating RPCs, permission policies and last-administrator rules follow in DEV-03.
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create type public.tenant_role as enum (
  'tenant_admin', 'finance_operator', 'content_operator', 'member', 'finance_viewer'
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete restrict,
  display_name text not null check (length(trim(display_name)) between 1 and 120),
  created_at timestamptz not null default now()
);
create table public.tenants (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (length(trim(name)) between 1 and 160),
  created_at timestamptz not null default now()
);
create table public.buildings (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete restrict,
  name text not null check (length(trim(name)) between 1 and 160),
  unique (tenant_id, id)
);
create table public.units (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete restrict,
  building_id uuid not null,
  label text not null check (length(trim(label)) between 1 and 80),
  area_m2 numeric(10,2) not null check (area_m2 > 0),
  foreign key (tenant_id, building_id) references public.buildings(tenant_id, id),
  unique (tenant_id, id),
  unique (building_id, label)
);
create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete restrict,
  user_id uuid not null references public.profiles(id) on delete restrict,
  valid_from timestamptz not null default now(),
  valid_until timestamptz,
  revoked_at timestamptz,
  unique (tenant_id, id),
  check (valid_until is null or valid_until > valid_from),
  check (revoked_at is null or revoked_at >= valid_from)
);
create index memberships_user_tenant on public.memberships(user_id, tenant_id);
create table public.tenant_role_grants (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete restrict,
  membership_id uuid not null,
  role public.tenant_role not null,
  granted_by uuid not null references public.profiles(id),
  basis text not null check (length(trim(basis)) > 0),
  valid_from timestamptz not null default now(),
  valid_until timestamptz,
  revoked_at timestamptz,
  foreign key (tenant_id, membership_id) references public.memberships(tenant_id, id),
  check (valid_until is null or valid_until > valid_from),
  check (revoked_at is null or revoked_at >= valid_from)
);
create index tenant_role_grants_membership on public.tenant_role_grants(membership_id);
create table public.system_admin_grants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id),
  granted_by uuid not null references public.profiles(id),
  basis text not null check (length(trim(basis)) > 0),
  valid_from timestamptz not null default now(),
  valid_until timestamptz,
  revoked_at timestamptz,
  check (valid_until is null or valid_until > valid_from),
  check (revoked_at is null or revoked_at >= valid_from)
);
create index system_admin_grants_user on public.system_admin_grants(user_id);
create table public.ownerships (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id),
  unit_id uuid not null,
  user_id uuid not null references public.profiles(id),
  basis text not null check (length(trim(basis)) > 0),
  valid_from date not null,
  valid_until date,
  foreign key (tenant_id, unit_id) references public.units(tenant_id, id),
  unique (tenant_id, unit_id, id),
  check (valid_until is null or valid_until > valid_from)
);
create index ownerships_user on public.ownerships(user_id, tenant_id);
-- No ledger yet: unit scope is a foundation for future card/period policies.
create table public.card_access_grants (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id),
  unit_id uuid not null,
  user_id uuid not null references public.profiles(id),
  kind text not null check (kind in ('owner', 'former_owner', 'tenant_delegate')),
  source_ownership_id uuid not null,
  granted_by uuid not null references public.profiles(id),
  basis text not null check (length(trim(basis)) > 0),
  period_from date not null,
  period_until date,
  valid_from timestamptz not null default now(),
  valid_until timestamptz,
  revoked_at timestamptz,
  foreign key (tenant_id, unit_id) references public.units(tenant_id, id),
  foreign key (tenant_id, unit_id, source_ownership_id)
    references public.ownerships(tenant_id, unit_id, id),
  check (period_until is null or period_until > period_from),
  check (valid_until is null or valid_until > valid_from),
  check (revoked_at is null or revoked_at >= valid_from)
);
create index card_access_grants_user on public.card_access_grants(user_id, tenant_id);

-- Internal audit is not part of the API schemas. No application mutation access.
create table private.audit_events (
  id bigint generated always as identity primary key,
  occurred_at timestamptz not null default now(),
  actor_id uuid,
  database_actor text not null,
  tenant_id uuid,
  table_name text not null,
  record_id uuid not null,
  operation text not null check (operation in ('INSERT', 'UPDATE', 'DELETE')),
  old_data jsonb,
  new_data jsonb
);
create function private.record_change() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  previous_row jsonb;
  next_row jsonb;
  current_row jsonb;
begin
  if TG_OP <> 'INSERT' then previous_row := to_jsonb(OLD); end if;
  if TG_OP <> 'DELETE' then next_row := to_jsonb(NEW); end if;
  current_row := coalesce(next_row, previous_row);
  insert into private.audit_events(actor_id, database_actor, tenant_id, table_name,
    record_id, operation, old_data, new_data)
  values (auth.uid(), session_user,
    case when TG_TABLE_NAME = 'tenants' then (current_row ->> 'id')::uuid
      else (current_row ->> 'tenant_id')::uuid end,
    TG_TABLE_NAME, (current_row ->> 'id')::uuid, TG_OP, previous_row, next_row);
  return coalesce(NEW, OLD);
end;
$$;
revoke all on function private.record_change() from public, anon, authenticated;

-- Fail closed until dedicated, reviewed mutation RPCs and RLS are implemented.
do $$
declare relation_name text;
begin
  foreach relation_name in array array['profiles','tenants','buildings','units',
    'memberships','tenant_role_grants','system_admin_grants','ownerships','card_access_grants']
  loop
    execute format('alter table public.%I enable row level security', relation_name);
    execute format('revoke all on table public.%I from anon, authenticated', relation_name);
    execute format('create trigger audit_change after insert or update or delete on public.%I for each row execute function private.record_change()', relation_name);
  end loop;
end;
$$;
revoke all on private.audit_events from public, anon, authenticated;
