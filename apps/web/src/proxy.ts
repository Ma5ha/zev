import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { accessConfig } from './features/access/config';

export async function proxy(request: NextRequest) {
  const { url, key } = accessConfig();
  let response = NextResponse.next({ request });
  const client = createServerClient(url, key, {
    cookieOptions: { httpOnly: true, sameSite: 'lax', secure: false, path: '/' },
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(values) {
        for (const { name, value } of values) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of values) response.cookies.set(name, value, options);
      },
    },
  });
  const { data: { user } } = await client.auth.getUser();
  if (!user && (request.nextUrl.pathname.startsWith('/portal') || request.nextUrl.pathname === '/lozinka')) {
    const destination = new URL('/prijava', request.url);
    const denied = NextResponse.redirect(destination);
    for (const cookie of response.cookies.getAll()) denied.cookies.set(cookie);
    denied.headers.set('Cache-Control', 'private, no-store');
    return denied;
  }
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('Referrer-Policy', 'no-referrer');
  return response;
}
export const config = { matcher: ['/portal/:path*', '/prijava', '/oporavak', '/lozinka', '/auth/:path*', '/api/prilozi/:path*'] };
