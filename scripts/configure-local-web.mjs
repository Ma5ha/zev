import { execFileSync } from 'node:child_process';
import { writeFileSync, chmodSync } from 'node:fs';
const status = JSON.parse(execFileSync('corepack', ['pnpm', 'exec', 'supabase', 'status', '-o', 'json'], {
 encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
}));
if (status.API_URL !== 'http://127.0.0.1:54321') throw new Error('Dozvoljen je samo lokalni staging.');
const target = new URL('../apps/web/.env.local', import.meta.url);
writeFileSync(target, `SUPABASE_URL=${status.API_URL}\nSUPABASE_ANON_KEY=${status.ANON_KEY}\nSUPABASE_SERVICE_ROLE_KEY=${status.SERVICE_ROLE_KEY}\nAPP_ORIGIN=http://127.0.0.1:3000\n`, { mode: 0o600 });
chmodSync(target, 0o600);
console.log('Lokalna web konfiguracija sačuvana u ignorisani apps/web/.env.local (0600). Restartujte web server.');
