-- Storage performs authorization preflight before actual object metadata exists.
-- Bucket limits constrain actual MIME/size; the download broker verifies final size/type.
create or replace function private.attachment_upload_allowed(p_name text,p_metadata jsonb) returns boolean
language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.attachments a
 where p_name=a.tenant_id::text||'/'||a.id::text
 and a.author_id=auth.uid() and private.attachment_writable(a)
 and a.created_at>statement_timestamp()-interval '15 minutes');
$$;
