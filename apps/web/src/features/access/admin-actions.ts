'use server';
import { revalidatePath } from 'next/cache';
import { authAdministrator, identity, tenantAccess } from './server';
import { accessConfig } from './config';
import type { FormState } from './form';

function value(form: FormData, key: string) { return String(form.get(key) ?? '').trim(); }
function optional(form: FormData, key: string) { return value(form, key) || null; }
function failure(code?: string): FormState {
  if (code === '42501') return { error: 'Nemate ovlašćenje za ovu radnju. Osvježite stranicu.' };
  if (code === '23514') return { error: 'Promjena nije dozvoljena. Provjerite aktivno članstvo, datume i prethodnu zamjenu posljednjeg administratora.' };
  if (code === '23505') return { error: 'Zapis sa tim podacima već postoji.' };
  if (code === '40001') return { error: 'Podaci su se u međuvremenu promijenili. Osvježite stranicu i pokušajte ponovo.' };
  return { error: 'Promjena nije potvrđena. Provjerite unos, osvježite podatke i pokušajte ponovo.' };
}
export async function administration(_: FormState, form: FormData): Promise<FormState> {
  const tenant = value(form, 'tenant');
  const { client } = await tenantAccess(tenant, true);
  const operation = value(form, 'operation');
  const basis = value(form, 'basis');
  const id = optional(form, 'id');
  let name: string; let args: Record<string, unknown>;
  switch (operation) {
    case 'building': name = 'save_building'; args = { p_tenant: tenant, p_name: value(form, 'name'), p_id: id }; break;
    case 'unit': name = 'save_unit'; args = { p_tenant: tenant, p_building: value(form, 'building'), p_label: value(form, 'label'), p_area: Number(value(form, 'area').replace(',', '.')), p_id: id }; break;
    case 'membership': name = 'add_membership'; args = { p_tenant: tenant, p_user: value(form, 'user'), p_basis: basis }; break;
    case 'role': name = 'set_tenant_role'; args = { p_membership: id, p_role: value(form, 'role'), p_enabled: value(form, 'enabled') === 'true', p_basis: basis }; break;
    case 'revoke': name = 'revoke_membership'; args = { p_membership: id, p_basis: basis }; break;
    case 'cancel-invite': name = 'revoke_invitation'; args = { p_invitation: id, p_basis: basis }; break;
    default: return { error: 'Nepoznata radnja.' };
  }
  // Cross-tenant membership/invitation IDs must match the explicitly selected context as well as RPC authorization.
  if (['role', 'revoke', 'cancel-invite'].includes(operation)) {
    const table = operation === 'cancel-invite' ? 'invitations' : 'memberships';
    const { data, error } = await client.from(table).select('id').eq('id', id).eq('tenant_id', tenant).maybeSingle();
    if (error || !data) return { error: 'Zapis nije dostupan u ovom ZEV-u.' };
  }
  const { error } = await client.rpc(name, args);
  if (error) return failure(error.code);
  revalidatePath('/portal', 'layout');
  return { success: 'Promjena je sačuvana.' };
}
export async function invite(_: FormState, form: FormData): Promise<FormState> {
  const tenant = value(form, 'tenant');
  const { client } = await tenantAccess(tenant, true);
  const email = value(form, 'email');
  const basis = value(form, 'basis');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || !basis || basis.length > 1000) return { error: 'Unesite ispravan email i osnov poziva.' };
  // Privileged Auth access is confined to sending invitations; tenant data always uses caller JWT/RLS.
  const { data, error } = await authAdministrator().auth.admin.inviteUserByEmail(email, { redirectTo: `${accessConfig().origin}/auth/potvrda` });
  if (error || !data.user) return { error: 'Poziv nije poslat. Ako nalog već postoji, koristite njegovo potvrđeno korisničko ID članstvo. Provjerite lokalnu poštu prije ponavljanja.' };
  const { error: recordError } = await client.rpc('record_invitation', { p_tenant: tenant, p_user: data.user.id, p_basis: basis });
  if (recordError) return { error: 'Nalog/poruka su kreirani, ali poziv za ZEV nije evidentiran. Pristup nije dodijeljen. Administrator treba provjeriti stanje i evidentirati poziv za potvrđeni ID.' };
  revalidatePath('/portal', 'layout');
  return { success: 'Poziv je poslat. Članstvo nastaje tek nakon prihvatanja; početna rola je član.' };
}
export async function recordInvite(_: FormState, form: FormData): Promise<FormState> {
 const tenant = value(form, 'tenant'); const { client } = await tenantAccess(tenant, true);
 const { error } = await client.rpc('record_invitation', { p_tenant: tenant, p_user: value(form,'user'), p_basis: value(form,'basis') });
 if(error) return failure(error.code);
 revalidatePath('/portal','layout'); return { success: 'Poziv za postojeći nalog je evidentiran. Korisnik ga vidi pri prijavi.' };
}
export async function acceptInvite(_: FormState, form: FormData): Promise<FormState> {
 const { client } = await identity();
 const { error } = await client.rpc('accept_invitation', { p_invitation: value(form, 'id') });
 if (error) return { error: 'Poziv nije prihvaćen. Možda je istekao, opozvan ili pozivalac više nema ovlašćenje. Obratite se administratoru.' };
 revalidatePath('/portal', 'layout'); return { success: 'Poziv je prihvaćen. ZEV je sada dostupan.' };
}
export async function profile(_: FormState, form: FormData): Promise<FormState> {
 const { client } = await identity();
 const { error } = await client.rpc('update_profile', { p_display_name: value(form, 'name') });
 if (error) return failure(error.code);
 revalidatePath('/portal', 'layout'); return { success: 'Profil je sačuvan.' };
}
export async function systemAdministration(_: FormState, form: FormData): Promise<FormState> {
 const { client } = await identity();
 const {data: rights,error: permissionError}=await client.rpc('my_permissions',{p_tenant:null});
 if(permissionError || !rights?.system_admin) return {error:'Ova radnja zahtijeva administratora sistema.'};
 const op=value(form,'operation');
 const {error}=op==='tenant'
 ? await client.rpc('create_tenant',{p_slug:value(form,'slug'),p_name:value(form,'name'),p_admin:value(form,'user'),p_basis:value(form,'basis')})
 : op==='system-role'
 ? await client.rpc('set_system_admin',{p_user:value(form,'user'),p_enabled:value(form,'enabled')==='true',p_basis:value(form,'basis')})
 : {error:{code:'22023'}};
 if(error) return failure(error.code);
 revalidatePath('/portal','layout'); return {success:'Sistemska promjena je sačuvana.'};
}
