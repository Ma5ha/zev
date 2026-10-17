import type { ReactNode } from 'react';
import Link from 'next/link';
import { IconCoins } from '@tabler/icons-react';
import type { DemoTenant, DemoUnit } from './model';
import { formatDemoMoney } from './selectors';

export function DemoSection({ id, title, href, linkLabel, children }: { id: string; title: string; href?: string; linkLabel?: string; children: ReactNode }) {
  return <section id={id} aria-labelledby={`${id}-naslov`} className="demo-section min-w-0 space-y-4 p-5 sm:p-6">
    <div className="flex flex-wrap items-center justify-between gap-3"><h2 id={`${id}-naslov`} className="text-xl font-semibold">{title}</h2>{href && <Link href={href} className="inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4">{linkLabel ?? 'Pogledaj sve'}</Link>}</div>
    {children}
  </section>;
}

export function FundsSummary({ cents, reconciledOn }: { cents: number; reconciledOn: string }) {
  return <div className="flex items-start gap-5"><span className="hidden rounded-full bg-white/70 p-5 sm:block"><IconCoins size={40} stroke={1.5} aria-hidden="true" /></span><div className="min-w-0"><p className="text-sm text-muted">Saldo evidencije</p><p className="mt-2 money-display">{formatDemoMoney(cents)}</p><p className="mt-3 text-sm leading-relaxed text-muted">Početna osnova: demo stanje na dan {formatDemoDate(reconciledOn)} Datum ostaje isti pri lokalnim unosima. Podaci nisu provjereni u banci.</p><p className="mt-2 text-sm text-muted">Dug i avans pojedinačnih kartica nisu dio ovog iznosa.</p></div></div>;
}

export function UnitCards({ cards, linkToCards = false }: { cards: readonly (DemoUnit & { balanceCents?: number })[]; linkToCards?: boolean }) {
  return cards.length ? <ul className="divide-y divide-line">{cards.map(unit => <li key={unit.id} className="flex flex-wrap justify-between gap-3 py-3"><span>{linkToCards ? <Link className="inline-flex min-h-11 items-center font-semibold text-accent underline" href={`/demo/finansije/kartice/${unit.id}`}>{unit.label}</Link> : unit.label} · {unit.areaM2} m²</span><span className="font-semibold tabular-nums">{(unit.balanceCents ?? unit.openingBalanceCents) > 0 ? 'Dug' : (unit.balanceCents ?? unit.openingBalanceCents) < 0 ? 'Avans' : 'Saldo'}: {formatDemoMoney(Math.abs((unit.balanceCents ?? unit.openingBalanceCents)))}</span></li>)}</ul> : <p className="leading-relaxed text-muted">Ovaj demo profil nema pristup pojedinačnim karticama.</p>;
}

export function WorkList({ works }: { works: DemoTenant['works'] }) {
  return works.length ? <ul className="divide-y divide-line">{works.map(work => <li key={work.id} className="space-y-2 py-3"><h3 className="font-semibold"><Link className="inline-flex min-h-11 items-center text-accent underline underline-offset-4" href={`/demo/radovi/${work.id}`}>{work.title}</Link></h3><p><span className="status-badge">{work.status}</span></p><p className="text-sm text-muted">Primljene ponude: {work.offers.length} · Ugovoreno: <span className="tabular-nums">{formatDemoMoney(work.contractedCents)}</span></p></li>)}</ul> : <p className="leading-relaxed text-muted">Nema radova u ovom prikazu.</p>;
}

export function AnnouncementList({ announcements }: { announcements: DemoTenant['announcements'] }) {
  return announcements.length ? <ul className="divide-y divide-line">{announcements.map(item => <li key={item.id} className="space-y-2 py-3"><p className="text-sm text-muted"><time dateTime={item.date}>{formatDemoDate(item.date)}</time></p><details><summary className="min-h-11 cursor-pointer break-words font-semibold">{item.title}</summary><p className="whitespace-pre-wrap break-words leading-relaxed text-muted">{item.body}</p></details></li>)}</ul> : <p className="leading-relaxed text-muted">Još nema obavještenja. Objavljena obavještenja zgrade prikazivaće se ovdje.</p>;
}

export function formatDemoDate(date: string) {
  return new Intl.DateTimeFormat('sr-Latn-BA', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Belgrade' }).format(new Date(`${date}T12:00:00Z`));
}
