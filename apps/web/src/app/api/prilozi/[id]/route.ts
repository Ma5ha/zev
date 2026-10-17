import { serverClient, authAdministrator } from '../../../../features/access/server';

export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'private, no-store, max-age=0', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer' };
const unavailable = () => new Response(null, { status: 404, headers });

// No redirect or reusable Storage URL escapes this server boundary.
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id)) return unavailable();
  const client = await serverClient();
  const { data: identity, error: identityError } = await client.auth.getUser();
  if (identityError || !identity.user) return unavailable();
  const query = () => client.from('attachments').select('id,tenant_id,media_type,byte_size').eq('id', id).maybeSingle();
  const { data: attachment, error } = await query();
  if (error || !attachment) return unavailable();
  const { data: file, error: downloadError } = await authAdministrator().storage
    .from('zev-private').download(`${attachment.tenant_id}/${attachment.id}`);
  if (downloadError || !file || (file.size !== attachment.byte_size || file.type.split(';', 1)[0].trim().toLowerCase() !== attachment.media_type)) return unavailable();
  // A revocation committed while fetching must also block release of buffered bytes.
  const { data: stillAllowed, error: recheckError } = await query();
  if (recheckError || !stillAllowed) return unavailable();
  return new Response(file, { headers: {
    ...headers, 'Content-Type': attachment.media_type,
    'Content-Disposition': `attachment; filename="prilog-${attachment.id}"`,
    'Content-Length': String(file.size),
  } });
}
