'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { LinkButton } from '@/components/ui/button';
import { PageHeading } from '@/components/ui/page-heading';
import { Button } from '@/components/ui/button';
import { DemoSection, FundsSummary, UnitCards, formatDemoDate } from '../demo-sections';
import { useDemo } from '../demo-provider';
import { formatDemoMoney } from '../selectors';
import { EXPENSE_CATEGORIES, type FinanceEntry } from '../finance';

export function DemoFinances() {
  const { view } = useDemo();
  const params = useSearchParams();
  const router = useRouter();
  const period = params.get('period') ?? '';
  const category = params.get('category') ?? '';
  const entries = view.entries.filter(entry => (!period || entry.date.startsWith(period)) && (!category || entry.category === category));
  const query = new URLSearchParams({ ...(period ? { period } : {}), ...(category ? { category } : {}) }).toString();
  function filter(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    router.replace(`/demo/finansije?${next}`, { scroll: false });
  }
  return <div className="space-y-6">
    <PageHeading eyebrow="Zajednička evidencija" title="Finansije">Sredstva zgrade, prihodi i rashodi. Dug i avans pratite odvojeno na dozvoljenim karticama.</PageHeading>
    {view.permissions.canWriteFinances && <div className="flex flex-wrap gap-3"><LinkButton href="/demo/finansije/trosak">Dodaj trošak</LinkButton><LinkButton href="/demo/finansije/uplata" variant="secondary">Evidentiraj uplatu</LinkButton><LinkButton href="/demo/finansije/obracun" variant="secondary">Mjesečni obračun</LinkButton></div>}
    <DemoSection id="finansije-sredstva" title="Zajednička sredstva"><FundsSummary cents={view.fundsCents} reconciledOn={view.reconciledOn} /></DemoSection>
    <DemoSection id="kartice" title={view.profileId === 'owner' ? 'Moja kartica' : 'Kartice'}><p className="text-sm text-muted">Trenutno stanje iz svih demo zaduženja i uplata.</p><UnitCards cards={view.cards} linkToCards /></DemoSection>
    <DemoSection id="promet" title="Prihodi i rashodi">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="period" className="font-semibold">Period</label><input id="period" type="month" value={period} onChange={event => filter('period', event.target.value)} className="mt-2 block min-h-11 w-full rounded-lg border border-control bg-surface px-3" /><p className="mt-2 text-sm text-muted">Prazan period prikazuje sve stavke.</p></div>
        <div><label htmlFor="filter-category" className="font-semibold">Kategorija</label><select id="filter-category" value={category} onChange={event => filter('category', event.target.value)} className="mt-2 block min-h-11 w-full rounded-lg border border-control bg-surface px-3"><option value="">Sve kategorije</option>{[...EXPENSE_CATEGORIES, 'Uplate održavanja'].map(item => <option key={item}>{item}</option>)}</select></div>
      </div>
      {entries.length ? <TransactionList entries={entries} query={query} /> : <p className="text-muted">{view.entries.length ? 'Nema stavki za izabrane filtere.' : 'Još nema evidentiranih prihoda ili rashoda. Početna sredstva nisu nova uplata.'}</p>}
      {(period || category) && <Button variant="secondary" onClick={() => router.replace('/demo/finansije', { scroll: false })}>Poništi filtere</Button>}
      <p className="text-sm text-muted">Uplate održavanja su u zajedničkom pregledu bez jedinice, privatne napomene i priloga. Demo operater ima dodatni pristup.</p>
    </DemoSection>
  </div>;
}

export function TransactionList({ entries, query = '' }: { entries: readonly FinanceEntry[]; query?: string }) {
  return <ul className="divide-y divide-line">{entries.toSorted((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id, undefined, { numeric: true })).map(entry => <li key={entry.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
    <div className="min-w-0"><Link href={`/demo/finansije/stavke/${entry.id}${query ? `?${query}` : ''}`} className="inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4">{entry.kind === 'payment' ? 'Uplata održavanja' : entry.description}</Link><p className="text-sm text-muted"><time dateTime={entry.date}>{formatDemoDate(entry.date)}</time> · {entry.category}</p></div>
    <p className="font-semibold tabular-nums">{entry.kind === 'expense' ? 'Rashod' : 'Prihod'}: {formatDemoMoney(entry.amountCents)}</p>
  </li>)}</ul>;
}
