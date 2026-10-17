export function accessConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  const origin = process.env.APP_ORIGIN;
  if (!url || !key || !origin) throw new Error('Lokalni pristup nije konfigurisan.');
  // Remote resources require a separate reviewed configuration and authorization.
  if (url !== 'http://127.0.0.1:54321' || origin !== 'http://127.0.0.1:3000') throw new Error('Podržan je samo odobreni lokalni staging.');
  return { url, key, origin };
}
