'use server';
import { redirect } from 'next/navigation';
import { serverClient, identity } from './server';
import { accessConfig } from './config';
import type { FormState } from './form';

export async function login(_: FormState, form: FormData): Promise<FormState> {
  const client = await serverClient();
  const { error } = await client.auth.signInWithPassword({ email: String(form.get('email')).trim(), password: String(form.get('password')) });
  if (error) return { error: 'Prijava nije uspjela. Provjerite email i lozinku ili pokušajte ponovo.' };
  redirect('/portal');
}
export async function logout() {
  const client = await serverClient();
  const { error } = await client.auth.signOut();
  if (error) throw new Error('Odjava nije potvrđena. Pokušajte ponovo.');
  redirect('/prijava');
}
export async function recover(_: FormState, form: FormData): Promise<FormState> {
  const email=String(form.get('email')??'').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length>254) return {error:'Unesite ispravan email.'};
  const client = await serverClient();
  await client.auth.resetPasswordForEmail(email, { redirectTo: `${accessConfig().origin}/auth/potvrda` });
  return { success: 'Ako nalog postoji i slanje je dostupno, dobićete poruku za oporavak. Provjerite poštu; ako poruka ne stigne, pokušajte kasnije ili kontaktirajte administratora sistema.' };
}
export async function confirm(_: FormState, form: FormData): Promise<FormState> {
  const type = form.get('type');
  if (type !== 'invite' && type !== 'recovery') return { error: 'Neispravna veza.' };
  const client = await serverClient();
  const { error } = await client.auth.verifyOtp({ token_hash: String(form.get('token_hash')), type });
  if (error) return { error: 'Veza je nevažeća ili je istekla. Zatražite novu poruku.' };
  redirect('/lozinka');
}
export async function password(_: FormState, form: FormData): Promise<FormState> {
  const { client } = await identity();
  const value = String(form.get('password'));
  if (value.length < 12 || value !== form.get('repeat')) return { error: 'Unesite najmanje 12 znakova i jednaku potvrdu lozinke.' };
  const { error } = await client.auth.updateUser({ password: value });
  if (error) return { error: 'Lozinka nije promijenjena. Pokušajte ponovo ili zatražite novu vezu.' };
  redirect('/portal?poruka=lozinka');
}
