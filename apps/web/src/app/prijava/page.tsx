import Link from 'next/link';
import { AccessField as TextField } from '@/features/access/field';
import { AccessFrame } from '@/features/access/frame';
import { AccessForm } from '@/features/access/form';
import { login } from '@/features/access/auth-actions';
export default function LoginPage() {
  return <AccessFrame title="Prijava"><section className="demo-section max-w-lg space-y-6 p-6">
    <p>Pristupite ZEV-ovima za koje imate ovlašćenje. Novi nalozi otvaraju se putem poziva.</p>
    <AccessForm action={login} submit="Prijavi se"><TextField id="email" name="email" type="email" label="Email" autoComplete="username" required maxLength={254}/><TextField id="password" name="password" type="password" label="Lozinka" autoComplete="current-password" required maxLength={256}/></AccessForm>
    <Link href="/oporavak" className="underline">Zaboravljena lozinka</Link>
    <p className="text-sm text-muted">Lokalno razvojno okruženje sa sintetičkim nalozima.</p>
  </section></AccessFrame>;
}
