import Link from 'next/link';
import { AccessField as TextField } from '@/features/access/field';
import { AccessFrame } from '@/features/access/frame';
import { AccessForm } from '@/features/access/form';
import { identity } from '@/features/access/server';
import { logout } from '@/features/access/auth-actions';
import { acceptInvite, profile } from '@/features/access/admin-actions';
import { SystemPanel } from '@/features/access/system-panel';
import { Button } from '@/components/ui/button';
export const dynamic = 'force-dynamic';
export default async function PortalPage({ searchParams }: { searchParams: Promise<{ poruka?: string }> }) {
 const { client, user } = await identity();
 const [spaces, invitations, person] = await Promise.all([
 client.from('tenants').select('id,name').order('name'),
 client.rpc('my_invitations'),
 client.from('profiles').select('display_name').eq('id',user.id).single(),
 ]);
 if (spaces.error || invitations.error || person.error) throw new Error('Podaci nisu učitani. Pokušajte ponovo.');
 const {data: rights,error: rightsError}=await client.rpc('my_permissions',{p_tenant:null});
 if(rightsError) throw new Error('Prava nisu učitana.');
 const pendingInvitations=invitations.data as {id:string;tenant_name:string;expires_at:string}[];
 const { poruka } = await searchParams;
 return <AccessFrame title="Moj pristup">
 <div className="flex flex-wrap items-center justify-between gap-4"><p className="break-all">{user.email}</p><form action={logout}><Button type="submit" variant="secondary">Odjavi se</Button></form></div>
 {poruka === 'pristup' && <p role="alert" className="text-danger">Traženi ZEV ili administratorski pristup nije dostupan.</p>}
 {poruka === 'lozinka' && <p role="status" className="text-success">Lozinka je sačuvana.</p>}
 <section className="demo-section space-y-4 p-6"><h2 className="text-xl font-semibold">Dostupni ZEV-ovi</h2>{spaces.data.length ? <ul className="space-y-3">{spaces.data.map(s => <li key={s.id}><Link className="action action-secondary" href={`/portal/${s.id}`}>{s.name} →</Link></li>)}</ul> : <p>Nemate aktivno članstvo. Prihvatite poziv ili kontaktirajte administratora.</p>}</section>
 <section className="demo-section space-y-4 p-6"><h2 className="text-xl font-semibold">Pozivi za članstvo</h2><p className="text-muted">Prihvatanje daje osnovnu rolu člana. Vlasništvo i posebne role dodjeljuju se odvojeno.</p>{pendingInvitations.length ? pendingInvitations.map(i => <div key={i.id} className="space-y-3 border-t border-line pt-4"><p className="break-all">Poziv za {i.tenant_name}</p><p>Važi do {new Date(i.expires_at).toLocaleString('sr-Latn-BA',{timeZone:'Europe/Belgrade'})} (Europe/Belgrade)</p><AccessForm action={acceptInvite} submit="Prihvati poziv"><input type="hidden" name="id" value={i.id}/></AccessForm></div>) : <p>Nema aktivnih poziva.</p>}</section>
 {rights?.system_admin && <SystemPanel/>}
 <section className="demo-section max-w-xl space-y-4 p-6"><h2 className="text-xl font-semibold">Moj profil</h2><AccessForm action={profile}><TextField id="name" name="name" label="Ime za prikaz" defaultValue={person.data.display_name} maxLength={120} required/></AccessForm><p className="break-all text-sm text-muted">Korisnički ID: {user.id}</p><Link className="underline" href="/lozinka">Promijeni lozinku</Link></section>
 </AccessFrame>;
}
