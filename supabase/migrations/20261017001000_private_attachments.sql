-- DEV-03-D infrastructure. Parent module records must later own/derive these scopes.
create table public.attachments (
 id uuid primary key default gen_random_uuid(),
 tenant_id uuid not null references public.tenants(id),
 scope text not null check(scope in ('common_finance','content','card','report')),
 unit_id uuid,
 record_date date,
 author_id uuid not null references public.profiles(id),
 created_at timestamptz not null default statement_timestamp(),
 media_type text not null check(media_type in ('application/pdf','image/jpeg','image/png','text/plain')),
 byte_size integer not null check(byte_size between 1 and 5242880),
 foreign key(unit_id,tenant_id) references public.units(id,tenant_id),
 check ((scope='card' and unit_id is not null and record_date is not null)
     or (scope<>'card' and unit_id is null and record_date is null))
);
alter table public.attachments enable row level security;
revoke all on public.attachments from public,anon,authenticated;
grant select on public.attachments to authenticated;
create trigger audit_change after insert or update or delete on public.attachments
for each row execute function private.record_change();

create function private.attachment_readable(a public.attachments) returns boolean
language sql stable security definer set search_path='' set timezone='Europe/Belgrade' as $$
 select auth.uid() is not null and case a.scope
 when 'card' then private.can_read_card(a.tenant_id,a.unit_id,a.record_date)
 when 'common_finance' then private.has_role(a.tenant_id,array['tenant_admin','finance_operator','finance_viewer','member']::public.tenant_role[])
 when 'content' then private.has_role(a.tenant_id,array['tenant_admin','content_operator','member']::public.tenant_role[])
 when 'report' then private.has_role(a.tenant_id,array['tenant_admin','content_operator']::public.tenant_role[])
   or (a.author_id=auth.uid() and private.is_member(a.tenant_id))
 else false end;
$$;
create function private.attachment_writable(a public.attachments) returns boolean
language sql stable security definer set search_path='' as $$
 select auth.uid() is not null and case a.scope
 when 'card' then private.has_role(a.tenant_id,array['tenant_admin','finance_operator']::public.tenant_role[])
 when 'common_finance' then private.has_role(a.tenant_id,array['tenant_admin','finance_operator']::public.tenant_role[])
 when 'content' then private.has_role(a.tenant_id,array['tenant_admin','content_operator']::public.tenant_role[])
 when 'report' then a.author_id=auth.uid() and private.is_member(a.tenant_id)
 else false end;
$$;
revoke all on function private.attachment_readable(public.attachments), private.attachment_writable(public.attachments) from public,anon,authenticated,service_role;
create policy attachment_read on public.attachments for select to authenticated
using(private.attachment_readable(attachments));

create function public.reserve_attachment(p_tenant uuid,p_scope text,p_unit uuid,p_date date,p_type text,p_size integer) returns uuid
language plpgsql security definer set search_path='' as $$
declare a public.attachments;
begin
 a.id:=gen_random_uuid(); a.tenant_id:=p_tenant; a.scope:=p_scope;
 a.unit_id:=p_unit; a.record_date:=p_date; a.author_id:=auth.uid();
 if not coalesce(private.attachment_writable(a),false) then
 raise exception 'Nedovoljno ovlašćenje.' using errcode='42501'; end if;
 insert into public.attachments(id,tenant_id,scope,unit_id,record_date,author_id,media_type,byte_size)
 values(a.id,p_tenant,p_scope,p_unit,p_date,auth.uid(),p_type,p_size);
 return a.id;
end;
$$;
revoke all on function public.reserve_attachment(uuid,text,uuid,date,text,integer) from public,anon,service_role;
grant execute on function public.reserve_attachment(uuid,text,uuid,date,text,integer) to authenticated;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('zev-private','zev-private',false,5242880,array['application/pdf','image/jpeg','image/png','text/plain']);
-- No SELECT policy: clients cannot download directly, list objects or mint signed URLs.
-- Only immutable INSERT, with DB-owned tenant/id path, current rights and size/type match.
create function private.attachment_upload_allowed(p_name text,p_metadata jsonb) returns boolean
language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.attachments a
 where p_name=a.tenant_id::text||'/'||a.id::text
 and a.author_id=auth.uid() and private.attachment_writable(a)
 and a.created_at>statement_timestamp()-interval '15 minutes'
 and p_metadata->>'mimetype'=a.media_type
 and p_metadata->>'size'=a.byte_size::text);
$$;
revoke all on function private.attachment_upload_allowed(text,jsonb) from public,anon,authenticated,service_role;
create policy attachment_insert on storage.objects for insert to authenticated
with check(bucket_id='zev-private' and private.attachment_upload_allowed(name,metadata));
notify pgrst,'reload schema';
