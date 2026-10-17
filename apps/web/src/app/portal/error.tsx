'use client';
import { Button } from '@/components/ui/button';
export default function PortalError({ reset }: { reset: () => void }) {
 return <main id="sadrzaj" className="mx-auto max-w-xl space-y-6 p-6"><h1 className="text-2xl font-semibold">Podaci trenutno nisu dostupni</h1><p role="alert">Provjerite vezu i lokalni staging pa pokušajte ponovo. Promjene nisu potvrđene ovim prikazom.</p><Button onClick={reset}>Pokušaj ponovo</Button></main>;
}
