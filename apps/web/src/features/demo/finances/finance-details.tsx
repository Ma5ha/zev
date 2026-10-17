'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { LinkButton } from '@/components/ui/button';
import { PageHeading } from '@/components/ui/page-heading';
import { DemoSection, formatDemoDate } from '../demo-sections';
import { useDemo } from '../demo-provider';
import { formatDemoMoney } from '../selectors';
import { cardAllocations } from '../finance';
import { DeniedFinance } from './finance-form';
import { AttachmentPreview } from './attachment-preview';

export function FinanceEntryDetail({ entryId }: { entryId: string }) {
  const { view } = useDemo();
  const params = useSearchParams();
  const entry = view.entries.find(item => item.id === entryId);
  if (!entry) return <DeniedFinance />;
  const backQuery = new URLSearchParams({ ...(params.get('period') ? { period: params.get('period')! } : {}), ...(params.get('category') ? { category: params.get('category')! } : {}) }).toString();
  return <div className="space-y-6">
    <PageHeading eyebrow="Demo finansijska stavka" title={entry.kind === 'expense' ? entry.description : 'Uplata održavanja'}>Lokalna evidencija aktivnog demo ZEV-a.</PageHeading>
    <DemoSection id="stavka" title="Detalji stavke">
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2"><div><dt className="text-sm text-muted">{entry.kind === 'expense' ? 'Rashod' : 'Prihod'}</dt><dd className="mt-1 text-2xl font-semibold tabular-nums">{formatDemoMoney(entry.amountCents)}</dd></div><div><dt className="text-sm text-muted">Datum</dt><dd>{formatDemoDate(entry.date)}</dd></div><div><dt className="text-sm text-muted">Kategorija</dt><dd>{entry.category}</dd></div>{entry.author && <div><dt className="text-sm text-muted">Unio</dt><dd>{entry.author}</dd></div>}</dl>
      {entry.kind === 'payment' && view.permissions.canWriteFinances && <><p>Jedinica: {view.cards.find(unit => unit.id === entry.unitId)?.label}</p><p className="text-muted">Napomena: {entry.description || 'Nije navedena.'}</p></>}
      {entry.workId && <p>Povezani rad: <Link className="inline-flex min-h-11 items-center text-accent underline" href={`/demo/radovi/${entry.workId}`}>{view.works.find(work => work.id === entry.workId)?.title}</Link></p>}
      {entry.attachment && <AttachmentPreview file={entry.attachment} />}
      {entry.kind === 'payment' && !view.permissions.canWriteFinances && <p className="text-sm text-muted">Privatni podaci uplate dostupni su kroz dozvoljenu karticu.</p>}
      <p className="text-sm text-muted">Originalni demo unos. Ispravke i storno biće razrađeni u backend fazi; finansijska istorija se ovdje ne briše.</p>
    </DemoSection>
    <LinkButton href={`/demo/finansije${backQuery ? `?${backQuery}` : ''}`} variant="secondary">Vrati se na finansije</LinkButton>
  </div>;
}

export function FinanceCard({ unitId }: { unitId: string }) {
  const { view } = useDemo();
  const [period, setPeriod] = useState('');
  const card = view.cards.find(item => item.id === unitId);
  if (!card) return <DeniedFinance />;
  const charges = card.charges.filter(item => !period || item.month === period);
  const payments = card.payments.filter(item => !period || item.date.startsWith(period));
  const history = [
    { id: 'opening', date: '2026-10-01', label: 'Početno stanje prije oktobra 2026.', delta: card.openingBalanceCents, payment: null },
    ...card.charges.map(item => ({ id: item.id, date: `${item.month}-01`, label: `Zaduženje ${item.month} · Rok ${item.dueDate}`, delta: item.amountCents, payment: null })),
    ...card.payments.map(item => ({ id: item.id, date: item.date, label: 'Uplata', delta: -item.amountCents, payment: item })),
  ].toSorted((a, b) => a.date.localeCompare(b.date) || (a.id === 'opening' ? -1 : b.id === 'opening' ? 1 : a.id.localeCompare(b.id)));
  return <div className="space-y-6">
    <PageHeading eyebrow="Ovlašćeni prikaz kartice" title={card.label}>{card.areaM2} m² · {view.tenantName}. Stanje kartice je odvojeno od zajedničkih sredstava.</PageHeading>
    <DemoSection id="kartica-saldo" title="Trenutno stanje kartice">
      <p className="text-3xl font-semibold tabular-nums">{card.balanceCents > 0 ? 'Dug' : card.balanceCents < 0 ? 'Avans' : 'Saldo'}: {formatDemoMoney(Math.abs(card.balanceCents))}</p>
      <p className="text-sm text-muted">Ukupno stanje uključuje početni saldo i sve demo unose, nezavisno od filtera.</p>
      <div><label htmlFor="card-period" className="font-semibold">Period stavki</label><input id="card-period" type="month" value={period} onChange={event => setPeriod(event.target.value)} className="mt-2 block min-h-11 w-full max-w-sm rounded-lg border border-control bg-surface px-3" /></div>
      <p>Zaduženo {period || '(svi periodi)'}: {formatDemoMoney(charges.reduce((sum, item) => sum + item.amountCents, 0))}</p>
      <p>Uplaćeno {period || '(svi periodi)'}: {formatDemoMoney(payments.reduce((sum, item) => sum + item.amountCents, 0))}</p>
      <ul className="divide-y divide-line">{history.filter(item => !period || item.date.startsWith(period)).map(item => <li key={item.id} className="space-y-3 py-4"><p className="font-semibold">{item.label}</p><p className="text-sm text-muted">{formatDemoDate(item.date)} · {item.delta < 0 ? 'Umanjenje / avans' : 'Zaduženje'}: {formatDemoMoney(Math.abs(item.delta))}</p>{item.payment && <><p className="text-sm text-muted">{item.payment.description || 'Bez napomene.'} · Unio: {item.payment.author}</p>{item.payment.attachment && <AttachmentPreview file={item.payment.attachment} />}</>}</li>)}</ul>
      {!history.some(item => !period || item.date.startsWith(period)) && <p className="text-muted">Nema stavki u ovom periodu.</p>}
      {period && <button type="button" className="action action-secondary" onClick={() => setPeriod('')}>Poništi period</button>}
    </DemoSection>
    <DemoSection id="raspored" title="Raspored uplata i početnog avansa">
      <p className="text-sm text-muted">Demo pretpostavka: najstarija obaveza prva. Neiskorišćen kredit ostaje avans i pokriva kasnija zaduženja. Prikazan je trenutni zbirni raspored, bez novog prihoda.</p>
      <ul className="divide-y divide-line">{cardAllocations(card).map(item => <li key={item.id} className="space-y-1 py-3"><p className="font-semibold">{item.month} · Rok {item.dueDate}</p><p>Pokriveno: {formatDemoMoney(item.allocated)} · Preostalo: {formatDemoMoney(item.remaining)}</p></li>)}</ul>
      {card.balanceCents < 0 && <p>Preostali avans: {formatDemoMoney(-card.balanceCents)}</p>}
      {!cardAllocations(card).length && card.balanceCents === 0 && <p className="text-muted">Nema obaveza ni avansa.</p>}
    </DemoSection>
    {view.permissions.canWriteFinances && <LinkButton href="/demo/finansije/uplata">Evidentiraj uplatu</LinkButton>}
    <LinkButton href="/demo/finansije#kartice" variant="secondary">Vrati se na kartice</LinkButton>
  </div>;
}
