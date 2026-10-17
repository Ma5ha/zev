import { AccessFrame } from '@/features/access/frame';
import { AccessForm } from '@/features/access/form';
import { confirm } from '@/features/access/auth-actions';
export default async function ConfirmPage({ searchParams }: { searchParams: Promise<{ token_hash?: string; type?: string }> }) {
 const { token_hash, type } = await searchParams;
 return <AccessFrame title="Potvrda email veze"><section className="demo-section max-w-lg space-y-6 p-6">{token_hash && (type === 'invite' || type === 'recovery') ? <><p>Potvrdite nastavak i postavite lozinku za svoj nalog. Veza se koristi jednom.</p><AccessForm action={confirm} submit="Nastavi"><input type="hidden" name="token_hash" value={token_hash}/><input type="hidden" name="type" value={type}/></AccessForm></> : <p>Veza nije ispravna. Zatražite novi poziv ili oporavak pristupa.</p>}</section></AccessFrame>;
}
