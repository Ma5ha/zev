-- INSERT alone also permits minting bearer upload tokens. Allow only normal authenticated upload.
-- Operation name verified against the installed local Storage API's ROUTE_OPERATIONS.
alter policy attachment_insert on storage.objects with check (
 bucket_id='zev-private'
 and storage.allow_only_operation('object.upload')
 and private.attachment_upload_allowed(name,metadata)
);
