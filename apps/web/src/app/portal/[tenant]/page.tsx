import Link from 'next/link';
import { AccessFrame } from '@/features/access/frame';
import { tenantAccess } from '@/features/access/server';
import { AdminForm, Basis, BuildingForm, InviteForm, MembershipForm, roles, UnitForm } from '@/features/access/admin-forms';
import { Choice } from '@/features/access/choice';
export const dynamic = 'force-dynamic';
type ActivePeriod = {revoked_at:string|null;valid_from:string;valid_until:string|null};
function active(row:ActivePeriod, now:number) { return !row.revoked_at && Date.parse(row.valid_from)<=now && (!row.valid_until || Date.parse(row.valid_until)>now); }
export default async function TenantPage({ params }: { params:Promise<{tenant:string}> }) {
 const { tenant } = await params;
 const {client,space,rights} = await tenantAccess(tenant);
 if (!rights.tenant_admin) return <AccessFrame title={space.name}><Link href="/portal" className="underline">← Moj pristup</Link><section className="demo-section space-y-4 p-6"><h2 className="text-xl font-semibold">Vaš pristup</h2><p>Članstvo je provjereno. Administracija je dostupna administratoru ZEV-a i administratoru sistema.</p><ul>{rights.finance_write && <li>Finansijski unos</li>}{rights.finance_read && <li>Finansijski pregled</li>}{rights.content_write && <li>Upravljanje sadržajem</li>}{rights.member && <li>Pregled zajedničkih podataka</li>}</ul><p className="text-muted">Poslovni moduli još nisu povezani sa bazom. Sintetički demo dostupan je zasebno.</p><Link href="/demo" className="underline">Otvori sintetički demo</Link></section></AccessFrame>;
 const {data: labels,error: labelsError}=await client.rpc('administration_labels',{p_tenant:tenant});
 if(labelsError) throw new Error('Imena nisu učitana.');
 const names:Record<string,string>=Object.fromEntries((labels as {user_id:string;display_name:string}[]).map(p=>[p.user_id,p.display_name]));
 const results = await Promise.all([
 client.from('buildings').select('id,name').eq('tenant_id',tenant).order('name'),
 client.from('units').select('id,label,building_id,area_m2').eq('tenant_id',tenant).order('label'),
 client.from('memberships').select('id,user_id,valid_from,valid_until,revoked_at').eq('tenant_id',tenant),
 client.from('tenant_role_grants').select('membership_id,role,valid_from,valid_until,revoked_at').eq('tenant_id',tenant),
 client.from('invitations').select('id,user_id,accepted_at,revoked_at,expires_at').eq('tenant_id',tenant),
 ]);
 if (results.some(r=>r.error)) throw new Error('Administracija nije učitana.');
 const [buildings,units,memberships,grants,invitations] = results;
 const now=Date.now();
 return <AccessFrame title={`${space.name} · Administracija`}>
 <Link href="/portal" className="underline">← Moj pristup i izbor ZEV-a</Link>
 <p className="text-muted">Izmjene se čuvaju u lokalnoj bazi. Opozivi ostaju u istoriji. Posljednji administrator zahtijeva prethodnu zamjenu.</p>
 <nav aria-label="Administrativne cjeline" className="flex flex-wrap gap-4">{[['zgrade','Zgrade'],['jedinice','Jedinice'],['clanstva','Članstva i role'],['pozivi','Pozivi']].map(([id,label])=><a key={id} href={`#${id}`} className="action action-secondary">{label}</a>)}</nav>
 <section id="zgrade" className="demo-section space-y-6 p-6"><h2 className="text-2xl font-semibold">Zgrade</h2>{buildings.data?.map(b=><details key={b.id} className="border-t border-line pt-4"><summary className="cursor-pointer py-3 font-semibold">{b.name} · Uredi</summary><BuildingForm tenant={tenant} id={b.id} name={b.name}/></details>)}<details><summary className="cursor-pointer py-3 font-semibold">Dodaj zgradu</summary><BuildingForm tenant={tenant}/></details></section>
 <section id="jedinice" className="demo-section space-y-6 p-6"><h2 className="text-2xl font-semibold">Jedinice</h2>{units.data?.length ? units.data.map(u=><details key={u.id} className="border-t border-line pt-4"><summary className="cursor-pointer py-3 font-semibold">{u.label} · {new Intl.NumberFormat('sr-Latn-BA').format(u.area_m2)} m² · {buildings.data?.find(b=>b.id===u.building_id)?.name}</summary><UnitForm tenant={tenant} buildings={buildings.data??[]} unit={u}/></details>):<p>Nema jedinica.</p>}{buildings.data?.length ? <details><summary className="cursor-pointer py-3 font-semibold">Dodaj jedinicu</summary><UnitForm tenant={tenant} buildings={buildings.data}/></details>:<p>Prvo dodajte zgradu.</p>}</section>
 <section id="clanstva" className="demo-section space-y-6 p-6"><h2 className="text-2xl font-semibold">Članstva i role</h2><p>Članstvo i role su odvojene dodjele. Samo članstvo ne daje vlasničku karticu. Dodijelite odgovarajuću rolu nakon potvrde osnova.</p>{memberships.data?.map(m=>{
 const enabled=active(m,now); const ownRoles=grants.data?.filter(g=>g.membership_id===m.id && active(g,now))??[];
 return <details key={m.id} className="border-t border-line pt-4"><summary className="cursor-pointer break-all py-3"><span className="font-semibold">{names[m.user_id]??m.user_id}</span> · {enabled?'Aktivno':'Neaktivno'}<span className="block text-muted">{ownRoles.map(g=>roles.find(r=>r.value===g.role)?.label??g.role).join(', ')||'Bez aktivnih rola'}</span></summary>
 <p className="break-all text-sm text-muted">Korisnički ID: {m.user_id}</p>
 {enabled && <div className="grid gap-6 md:grid-cols-2"><AdminForm tenant={tenant} operation="role" id={m.id} submit="Potvrdi promjenu role"><Choice name="role" id={`role-${m.id}`} label="Rola" options={roles}/><Choice name="enabled" id={`enabled-${m.id}`} label="Radnja" options={[{value:'true',label:'Dodijeli rolu'},{value:'false',label:'Opozovi rolu'}]}/><Basis/></AdminForm><details><summary className="cursor-pointer py-3 font-semibold text-danger">Opozovi cijelo članstvo</summary><p className="mb-4">Prestaje pristup kroz ovo članstvo i njegove role.</p><AdminForm tenant={tenant} operation="revoke" id={m.id} submit="Potvrdi opoziv članstva"><Basis/></AdminForm></details></div>}</details>;
 })}<details><summary className="cursor-pointer py-3 font-semibold">Dodaj potvrđeni postojeći nalog</summary><MembershipForm tenant={tenant}/></details></section>
 <section id="pozivi" className="demo-section space-y-6 p-6"><h2 className="text-2xl font-semibold">Pozivi</h2><p>Novi korisnik dobija email, postavlja lozinku i prihvata poziv. Početna rola je član. Poziv za ZEV važi sedam dana; email veza može isteći ranije.</p><InviteForm tenant={tenant}/><details><summary className="cursor-pointer py-3 font-semibold">Poziv za postojeći nalog / dovršavanje djelimičnog poziva</summary><MembershipForm tenant={tenant} pending/></details>{invitations.data?.map(i=><details key={i.id} className="border-t border-line pt-4"><summary className="cursor-pointer break-all py-3">{names[i.user_id]??i.user_id} · {i.accepted_at?'Prihvaćen':i.revoked_at?'Opozvan':Date.parse(i.expires_at)<=now?'Istekao':'Čeka prihvatanje'}</summary>{!i.accepted_at&&!i.revoked_at&&<AdminForm tenant={tenant} operation="cancel-invite" id={i.id} submit="Opozovi poziv"><Basis/></AdminForm>}</details>)}</section>
 </AccessFrame>;
}
