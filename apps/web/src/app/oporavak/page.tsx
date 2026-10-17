import { AccessField as TextField } from '@/features/access/field';
import { AccessFrame } from '@/features/access/frame';
import { AccessForm } from '@/features/access/form';
import { recover } from '@/features/access/auth-actions';
export default function RecoveryPage() {
 return <AccessFrame title="Oporavak pristupa"><section className="demo-section max-w-lg space-y-6 p-6"><p>Poslaćemo vezu na email naloga. Ako više nemate pristup emailu, obratite se administratoru sistema radi provjere identiteta.</p><AccessForm action={recover} submit="Zatraži vezu"><TextField id="email" name="email" type="email" label="Email naloga" autoComplete="email" required maxLength={254}/></AccessForm></section></AccessFrame>;
}
