import { AccessField as TextField } from '@/features/access/field';
import { AccessFrame } from '@/features/access/frame';
import { AccessForm } from '@/features/access/form';
import { password } from '@/features/access/auth-actions';
import { identity } from '@/features/access/server';
export default async function PasswordPage() {
 await identity();
 return <AccessFrame title="Postavite lozinku"><section className="demo-section max-w-lg p-6"><AccessForm action={password} submit="Sačuvaj lozinku"><TextField id="password" name="password" type="password" label="Nova lozinka" hint="Najmanje 12 znakova." minLength={12} maxLength={256} autoComplete="new-password" required/><TextField id="repeat" name="repeat" type="password" label="Ponovite novu lozinku" minLength={12} maxLength={256} autoComplete="new-password" required/></AccessForm></section></AccessFrame>;
}
