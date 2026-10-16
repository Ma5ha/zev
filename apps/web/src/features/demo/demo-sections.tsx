import type { ReactNode } from 'react';
import Link from 'next/link';
import type { DemoTenant, DemoUnit } from './model';
import { formatDemoMoney } from './selectors';

export function DemoSection({ id, title, href, linkLabel, children }: { id: string; title: string; href?: string; linkLabel?: string; children: ReactNode }) {
  return <section id={id} aria-labelledby={`${id}-naslov`} className="min-w-0 space-y-4 rounded-xl border border-line bg-surface p-5 sm:p-6">
    <div className="flex flex-wrap items-center justify-between gap-3"><h2 id={`${id}-naslov`} className="text-xl font-semibold">{title}</h2>{href && <Link href={href} className="inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4">{linkLabel ?? 'Pogledaj sve'}</Link>}</div>
    {children}
  </section>;
}

export function FundsSummary({ cents, reconciledOn }: { cents: number; reconciledOn: string }) {
  return <div><p className="text-sm text-muted">Saldo evidencije</p><p className="mt-2 text-4xl font-semibold tracking-tight tabular-nums">{formatDemoMoney(cents)}</p><p className="mt-3 text-sm leading-relaxed text-muted">Demo stanje na dan {formatDemoDate(reconciledOn)} Podaci nisu provjereni u banci.</p><p className="mt-2 text-sm text-muted">Dug i avans pojedinačnih kartica nisu dio ovog iznosa.</p></div>;
}

export function UnitCards({ cards }: { cards: readonly DemoUnit[] }) {
  return cards.length ? <ul className="divide-y divide-line">{cards.map(unit => <li key={unit.id} className="flex flex-wrap justify-between gap-3 py-3"><span>{unit.label} · {unit.areaM2} m²</span><span className="font-semibold tabular-nums">{unit.openingBalanceCents > 0 ? 'Dug' : unit.openingBalanceCents < 0 ? 'Avans' : 'Saldo'}: {formatDemoMoney(Math.abs(unit.openingBalanceCents))}</span></li>)}</ul> : <p className="leading-relaxed text-muted">Ovaj demo profil nema pristup pojedinačnim karticama.</p>;
}

export function WorkList({ works }: { works: DemoTenant['works'] }) {
  return works.length ? <ul className="divide-y divide-line">{works.map(work => <li key={work.id} className="space-y-2 py-3"><h3 className="font-semibold">{work.title}</h3><p className="text-sm text-muted">Status: {work.status}</p><p className="text-sm text-muted">Primljene ponude: {work.offers.length} · Ugovoreno: <span className="tabular-nums">{formatDemoMoney(work.contractedCents)}</span></p></li>)}</ul> : <p className="leading-relaxed text-muted">Trenutno nema aktivnih radova. Radovi ove zgrade prikazivaće se ovdje.</p>;
}

export function AnnouncementList({ announcements }: { announcements: DemoTenant['announcements'] }) {
  return announcements.length ? <ul className="divide-y divide-line">{announcements.map(item => <li key={item.id} className="space-y-2 py-3"><p className="text-sm text-muted"><time dateTime={item.date}>{formatDemoDate(item.date)}</time></p><h3 className="font-semibold">{item.title}</h3><p className="leading-relaxed text-muted">{item.body}</p></li>)}</ul> : <p className="leading-relaxed text-muted">Još nema obavještenja. Objavljena obavještenja zgrade prikazivaće se ovdje.</p>;
}

export function formatDemoDate(date: string) {
  return new Intl.DateTimeFormat('sr-Latn-BA', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Belgrade' }).format(new Date(`${date}T12:00:00Z`));
}
