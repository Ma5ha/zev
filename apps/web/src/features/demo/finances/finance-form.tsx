'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, LinkButton } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { TextField } from '@/components/ui/text-field';
import { Notice } from '@/components/ui/notice';
import { PageHeading } from '@/components/ui/page-heading';
import { useDemo } from '../demo-provider';
import { DemoSection } from '../demo-sections';
import { formatDemoMoney } from '../selectors';
import { EXPENSE_CATEGORIES, assessmentPreview, initialFinanceDraft, parseCents, validateFinanceDraft, type FinanceDraft, type FinanceErrors, type FinanceKind } from '../finance';
import { AttachmentPreview } from './attachment-preview';

const titles = { expense: 'Dodaj trošak', payment: 'Evidentiraj uplatu', assessment: 'Mjesečni obračun' };

export function FinanceForm({ kind }: { kind: FinanceKind }) {
  const { view, dispatch, financeDraft } = useDemo();
  const tenant = view.financeTenant;
  const router = useRouter();
  const [errors, setErrors] = useState<FinanceErrors>({});
  const [reviewed, setReviewed] = useState(false);
  const summary = useRef<HTMLParagraphElement>(null);
  const draft = financeDraft?.kind === kind ? financeDraft : initialFinanceDraft(kind, '2026-10-16');
  if (!tenant) return <DeniedFinance />;

  function patch(patch: Partial<FinanceDraft>) {
    dispatch({ type: 'finance-draft', draft: { ...draft, ...patch } });
    setReviewed(false);
  }
  const rows = assessmentPreview(tenant, draft);
  const total = rows.filter(row => !row.existing).reduce((sum, row) => sum + row.amountCents, 0);

  return <div className="max-w-3xl space-y-6">
    <PageHeading eyebrow="Lokalna finansijska simulacija" title={titles[kind]}>Unos važi samo za {view.tenantName}. Novac i dokumenti se ne šalju izvan demoa.</PageHeading>
    <Notice>Demo pretpostavke: stopa i rok su ručni; zaokruživanje po jedinici je na fening, pola naviše. Uplate se raspoređuju prvo na najstarije obaveze; ostatak je avans koji umanjuje naredna zaduženja.</Notice>
    <form noValidate className="space-y-5 rounded-xl border border-line bg-surface p-5 sm:p-6" onSubmit={event => {
      event.preventDefault();
      const nextErrors = validateFinanceDraft(draft, tenant);
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length) { requestAnimationFrame(() => summary.current?.focus()); return; }
      if (!reviewed) { setReviewed(true); return; }
      dispatch({ type: 'finance-save' });
      router.push('/demo/finansije');
    }}>
      <p ref={summary} tabIndex={-1} aria-live="polite" className="text-danger">{Object.keys(errors).length ? 'Provjerite označena polja. Ostali unos je sačuvan.' : ''}</p>
      {kind === 'assessment' ? <>
        <TextField id="month" label="Mjesec obračuna" type="month" value={draft.month} error={errors.month} onChange={event => patch({ month: event.target.value })} required />
        <TextField id="dueDate" label="Rok plaćanja" type="date" value={draft.dueDate} error={errors.dueDate} onChange={event => patch({ dueDate: event.target.value })} required hint="Unesite rok ručno. Primjer demoa: 15. oktobar 2026." />
      </> : <TextField id="date" label="Datum" type="date" value={draft.date} error={errors.date} onChange={event => patch({ date: event.target.value })} required hint="Početni datum je sintetički: 16. oktobar 2026." />}
      {kind === 'payment' && <SelectField id="unitId" label="Jedinica" value={draft.unitId} error={errors.unitId} onChange={value => patch({ unitId: value })} options={tenant.units.map(unit => [unit.id, unit.label])} />}
      {kind === 'expense' && <SelectField id="category" label="Kategorija" value={draft.category} error={errors.category} onChange={value => patch({ category: value })} options={EXPENSE_CATEGORIES.map(category => [category, category])} />}
      {kind !== 'assessment' && <TextField id="description" label={kind === 'expense' ? 'Svrha troška' : 'Napomena (opciono)'} maxLength={500} value={draft.description} error={errors.description} onChange={event => patch({ description: event.target.value })} required={kind === 'expense'} />}
      <TextField id="amount" label={kind === 'assessment' ? 'Stopa (KM/m²)' : 'Iznos (KM)'} inputMode="decimal" value={draft.amount} error={errors.amount} onChange={event => patch({ amount: event.target.value })} required hint={kind === 'assessment' ? 'Demo pretpostavka: 0,50 KM/m².' : 'Primjer: 120,00. Bez razdjelnika hiljada.'} />
      {kind === 'expense' && <SelectField id="workId" label="Povezani rad (opciono)" value={draft.workId} error={errors.workId} onChange={value => patch({ workId: value })} options={tenant.works.map(work => [work.id, work.title])} optional />}
      {kind !== 'assessment' && <div className="space-y-3">
        <TextField id="attachment" label="Lokalni prilog (opciono)" type="file" accept="application/pdf,image/jpeg,image/png,image/webp" error={errors.attachment} hint="PDF, JPEG, PNG ili WebP do 5 MB. Demo ograničenje; nema uploada." onChange={event => patch({ attachment: event.target.files?.[0] ?? null })} />
        {draft.attachment && <><AttachmentPreview key={`${draft.attachment.name}-${draft.attachment.lastModified}`} file={draft.attachment} /><Button variant="secondary" onClick={() => { patch({ attachment: null }); const input = document.getElementById('attachment') as HTMLInputElement | null; if (input) input.value = ''; }}>Ukloni prilog</Button></>}
      </div>}
      {reviewed && <DemoSection id="potvrda-unosa" title="Pregled prije potvrde">
        {kind === 'assessment' ? <><p>Mjesec: {draft.month} · Rok: {draft.dueDate}</p><ul className="divide-y divide-line">{rows.map(row => <li key={row.id} className="flex flex-wrap justify-between gap-2 py-3"><span>{row.label} · {row.areaM2} m² {row.existing ? '· Već obračunato' : '· Novo zaduženje'}</span><span>{formatDemoMoney(row.amountCents)}</span></li>)}</ul><p className="font-semibold">Ukupno novih zaduženja: {formatDemoMoney(total)}</p><p className="text-sm text-muted">Postojeći obračun ostaje sa izvornom stopom i rokom. Sredstva zgrade se ne mijenjaju.</p></> : <><p className="font-semibold">{titles[kind]}: {formatDemoMoney(parseCents(draft.amount) ?? 0)}</p><p>Datum: {draft.date}</p><p>{kind === 'expense' ? draft.description : tenant.units.find(unit => unit.id === draft.unitId)?.label}</p><p className="text-sm text-muted">{kind === 'expense' ? 'Smanjuje sredstva jednom.' : 'Povećava sredstva jednom i umanjuje obavezu kartice.'} Ovo je lokalna simulacija.</p></>}
      </DemoSection>}
      <div className="flex flex-wrap gap-3">
        <Button type="submit">{reviewed ? kind === 'assessment' ? 'Primijeni obračun u demou' : kind === 'expense' ? 'Dodaj trošak u demo' : 'Evidentiraj uplatu u demo' : 'Pregledaj unos'}</Button>
        <LinkButton href="/demo/finansije" variant="secondary">Odustani</LinkButton>
      </div>
    </form>
  </div>;
}

function SelectField({ id, label, value, options, error, onChange, optional = false }: { id: string; label: string; value: string; options: readonly (readonly string[])[]; error?: string; onChange: (value: string) => void; optional?: boolean }) {
  return <div><label htmlFor={id} className="font-semibold">{label}</label><Select id={id} className="mt-2" value={value} onValueChange={onChange} required={!optional} aria-invalid={!!error} aria-describedby={error ? `${id}-greska` : undefined} options={[{ value: '', label: optional ? 'Bez povezivanja' : 'Izaberite' }, ...options.map(([value, label]) => ({ value, label }))]} />{error && <p id={`${id}-greska`} className="mt-2 text-sm text-danger">{error}</p>}</div>;
}

export function DeniedFinance() {
  return <div className="space-y-5"><PageHeading eyebrow="Demo prava" title="Prikaz nije dostupan">Aktivni demo profil nema pristup ovom zapisu ili radnji u izabranom ZEV-u.</PageHeading><LinkButton href="/demo/finansije" variant="secondary">Vrati se na finansije</LinkButton></div>;
}
