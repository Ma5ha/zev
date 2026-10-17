-- RLS evaluates policy helpers as the calling role; private schema is not exposed by PostgREST.
-- These functions only return caller-scoped booleans and never bypass caller authorization.
grant execute on function private.attachment_readable(public.attachments) to authenticated;
grant execute on function private.attachment_upload_allowed(text,jsonb) to authenticated;
