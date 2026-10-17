import { execFileSync } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { mkdirSync, writeFileSync, chmodSync, readFileSync } from 'node:fs';

// Development provisioning, never a remote seed or a source of shared passwords.
const config = readFileSync(new URL('../supabase/config.toml', import.meta.url), 'utf8');
if (!config.includes('project_id = "zev-staging"')) throw new Error('Potreban je lokalni zev-staging projekat.');
const status = JSON.parse(execFileSync('corepack', ['pnpm', 'exec', 'supabase', 'status', '-o', 'json'], {
  encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
}));
if (status.API_URL !== 'http://127.0.0.1:54321') throw new Error('Seed dozvoljava samo lokalni staging URL.');
const service = status.SERVICE_ROLE_KEY;
const api = async (path, method, body, token = service) => {
  const response = await fetch(`${status.API_URL}${path}`, {
    method, headers: { apikey: status.ANON_KEY, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!response.ok) {
    // Never print a response that could contain credentials or auth data.
    throw new Error(`${method} ${path.split('?')[0]}: HTTP ${response.status}`);
  }
  return response.status === 204 ? null : response.json();
};
const definitions = [
  ['system', 'Staging sistem administrator'], ['admin', 'Staging Javor administrator'],
  ['finance', 'Staging finansijski operater'], ['content', 'Staging operater sadržaja'],
  ['member', 'Staging vlasnik'], ['viewer', 'Staging finansijski pregled'],
  ['delegate', 'Staging zakupac'], ['coowner', 'Staging suvlasnik'],
  ['lipa', 'Staging Lipa administrator'], ['outsider', 'Staging bez članstva'],
];
const existing = (await api('/auth/v1/admin/users?page=1&per_page=1000', 'GET')).users;
const users = {};
for (const [name, displayName] of definitions) {
  const email = `${name}@zev-staging.invalid`;
  const password = randomBytes(32).toString('base64url');
  const previous = existing.find(user => user.email === email);
  const data = await api(previous ? `/auth/v1/admin/users/${previous.id}` : '/auth/v1/admin/users', previous ? 'PUT' : 'POST', {
    email, password, email_confirm: true, user_metadata: { display_name: displayName },
  });
  users[name] = { id: data.id, email, password };
}
const directory = new URL('../supabase/.temp/', import.meta.url);
mkdirSync(directory, { recursive: true, mode: 0o700 });
const credentialsFile = new URL('local-identities.json', directory);
writeFileSync(credentialsFile, JSON.stringify(users, null, 2), { mode: 0o600 });
chmodSync(credentialsFile, 0o600);

// Bootstrap is intentionally one-shot. Reruns only continue with this same synthetic admin.
const admins = JSON.parse(execFileSync('docker', ['exec', 'supabase_db_zev-staging', 'psql', '-U', 'postgres', '-d', 'postgres', '-Atc',
  "select coalesce(json_agg(user_id),'[]'::json) from public.system_admin_grants where revoked_at is null"], {
  encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
}));
if (!admins.length) await api('/rest/v1/rpc/bootstrap_system_admin', 'POST', { p_user: users.system.id, p_basis: 'Lokalni sintetički bootstrap DEV-03-B' });
else if (!admins.includes(users.system.id)) throw new Error('Postoji drugi sistemski administrator; potrebna je ručna provjera.');
const login = await api('/auth/v1/token?grant_type=password', 'POST', { email: users.system.email, password: users.system.password }, status.ANON_KEY);
const rpc = (name, args) => api(`/rest/v1/rpc/${name}`, 'POST', args, login.access_token);
const javor = '10000000-0000-4000-8000-000000000001';
const lipa = '10000000-0000-4000-8000-000000000002';
for (const [name, roles] of [
  ['admin', ['tenant_admin', 'member']], ['finance', ['finance_operator', 'member']],
  ['content', ['content_operator', 'member']], ['member', ['member']],
  ['viewer', ['finance_viewer', 'member']], ['delegate', ['member']], ['coowner', ['member']],
  ['lipa', ['tenant_admin', 'member']],
]) {
  const membership = await rpc('add_membership', { p_tenant: name === 'lipa' ? lipa : javor, p_user: users[name].id, p_basis: 'Sintetičko članstvo DEV-03-B' });
  for (const role of roles) await rpc('set_tenant_role', { p_membership: membership, p_role: role, p_enabled: true, p_basis: 'Sintetička rola DEV-03-B' });
}
// Grant ownership only when no current connection exists; keep reruns non-destructive.
const ownerships = await api('/rest/v1/ownerships?select=id,user_id,unit_id,valid_until', 'GET', undefined, login.access_token);
for (const name of ['member', 'coowner']) {
  const unit = '30000000-0000-4000-8000-000000000001';
  if (!ownerships.some(o => o.user_id === users[name].id && o.unit_id === unit && o.valid_until === null)) {
    await rpc('add_ownership', { p_tenant: javor, p_unit: unit, p_user: users[name].id, p_from: '2026-01-01', p_basis: 'Sintetičko suvlasništvo DEV-03-B' });
  }
}
console.log('Lokalni sintetički identiteti i role pripremljeni. Kredencijali su samo u ignorisanom supabase/.temp/local-identities.json (0600).');
