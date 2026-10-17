import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { accessConfig } from './config';

export async function serverClient() {
  const jar = await cookies();
  const { url, key } = accessConfig();
  return createServerClient(url, key, {
    cookieOptions: { httpOnly: true, sameSite: 'lax', secure: false, path: '/' },
    cookies: {
      getAll: () => jar.getAll(),
      setAll: (values) => {
        try { for (const { name, value, options } of values) jar.set(name, value, options); }
        catch { /* Server Components are read-only; proxy persists refreshed cookies. */ }
      },
    },
  });
}

export async function identity() {
  const client = await serverClient();
  const { data, error } = await client.auth.getUser();
  if (error || !data.user) redirect('/prijava');
  return { client, user: data.user };
}

export async function tenantAccess(tenant: string, admin = false) {
  const { client, user } = await identity();
  const { data: space, error } = await client.from('tenants').select('id,name').eq('id', tenant).maybeSingle();
  const { data: rights, error: rightsError } = await client.rpc('my_permissions', { p_tenant: tenant });
  if (error || rightsError || !space || (admin && !rights?.tenant_admin)) redirect('/portal?poruka=pristup');
  return { client, user, space, rights };
}

// Called only after a fresh user-scoped permission check. Never exported to a client component.
export function authAdministrator() {
  const { url } = accessConfig();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error('Slanje poziva trenutno nije dostupno.');
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
