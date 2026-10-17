import type { ReactNode } from 'react';
import { AccessField as TextField } from '@/features/access/field';
import { AccessForm } from './form';
import { Choice } from './choice';
import { Basis } from './basis';
export { Basis } from './basis';
import { administration, invite, recordInvite } from './admin-actions';
export const roles = [
 {value:'member',label:'Član'}, {value:'tenant_admin',label:'Administrator ZEV-a'},
 {value:'finance_operator',label:'Finansijski operater'}, {value:'content_operator',label:'Operater sadržaja'}, {value:'finance_viewer',label:'Finansijski pregled'},
];
export function AdminForm({ tenant, operation, id, children, submit }: { tenant:string; operation:string; id?:string; children:ReactNode; submit:string }) {
 return <AccessForm action={administration} submit={submit}><input type="hidden" name="tenant" value={tenant}/><input type="hidden" name="operation" value={operation}/>{id && <input type="hidden" name="id" value={id}/>} {children}</AccessForm>;
}
export function BuildingForm({tenant,id,name}:{tenant:string;id?:string;name?:string}) {
 return <AdminForm tenant={tenant} operation="building" id={id} submit={id?'Sačuvaj zgradu':'Dodaj zgradu'}><TextField id={`building-name-${id??'new'}`} name="name" label="Naziv zgrade" defaultValue={name} required maxLength={160}/></AdminForm>;
}
export function UnitForm({ tenant, buildings, unit }: {tenant:string;buildings:{id:string;name:string}[];unit?:{id:string;label:string;building_id:string;area_m2:number}}) {
 return <AdminForm tenant={tenant} operation="unit" id={unit?.id} submit={unit?'Sačuvaj jedinicu':'Dodaj jedinicu'}><Choice name="building" id={`building-${unit?.id??'new'}`} label="Zgrada" options={buildings.map(b=>({value:b.id,label:b.name}))} initial={unit?.building_id}/><TextField id={`label-${unit?.id??'new'}`} name="label" label="Oznaka jedinice" defaultValue={unit?.label} maxLength={80} required/><TextField id={`area-${unit?.id??'new'}`} name="area" label="Površina (m²)" type="number" min="0.01" max="99999999.99" step="0.01" defaultValue={unit?.area_m2} required/></AdminForm>;
}
export function InviteForm({tenant}:{tenant:string}) {
 return <AccessForm action={invite} submit="Pošalji email poziv"><input type="hidden" name="tenant" value={tenant}/><TextField id="invite-email" name="email" label="Email novog korisnika" type="email" required maxLength={254}/><Basis/></AccessForm>;
}
export function MembershipForm({tenant,pending=false}:{tenant:string;pending?:boolean}) {
 const fields = <><TextField id={pending?'invite-user':'member-user'} name="user" label="Potvrđeni korisnički ID" hint="ID iz profila postojećeg naloga. Provjerite identitet prije dodjele." required pattern="[0-9a-fA-F-]{36}"/><Basis/></>;
 return pending ? <AccessForm action={recordInvite} submit="Evidentiraj poziv"><input type="hidden" name="tenant" value={tenant}/>{fields}</AccessForm> : <AdminForm tenant={tenant} operation="membership" submit="Dodaj članstvo">{fields}</AdminForm>;
}
