'use client';

import Link from 'next/link';
import { Button, LinkButton } from '@/components/ui/button';
import { PageHeading } from '@/components/ui/page-heading';
import { Notice } from '@/components/ui/notice';
import { useDemo } from './demo-provider';
import { DemoSection, formatDemoDate } from './demo-sections';
import { formatDemoMoney } from './selectors';
import { workPayments } from './works';

export function WorkDetail({ workId }: { workId: string }) {
  const { view, dispatch } = useDemo();
  const work = view.works.find(item => item.id === workId);
  if (!work) return <div className="space-y-5"><PageHeading eyebrow="Demo radovi" title="Rad nije dostupan">U aktivnom demo ZEV-u nema ovog rada.</PageHeading><LinkButton href="/demo/radovi" variant="secondary">Vrati se na radove</LinkButton></div>;
  const selected = work.offers.find(offer => offer.id === work.selectedOfferId);
  const { payments, paidCents } = workPayments(view.entries, work.id);
  return <div className="space-y-6">
    <PageHeading eyebrow="Održavanje · demo" title={work.title}>{work.description}</PageHeading>
    <DemoSection id="rad-status" title="Napredak rada">
      <p className="font-semibold">Status: {work.status}</p>
      {view.permissions.canManageWorks && <div className="space-y-3"><p className="text-sm text-muted">Izaberite novi status. Promjena se odmah primjenjuje samo u demou.</p><div className="flex flex-wrap gap-3">{(['Priprema', 'U toku', 'Završeno'] as const).filter(status => status !== work.status).map(status => <Button key={status} variant="secondary" onClick={() => dispatch({ type: 'work-status', workId: work.id, status })}>Postavi: {status}</Button>)}</div></div>}
      <p>Rok za ponude: <time dateTime={work.offerDeadline}>{formatDemoDate(work.offerDeadline)}</time></p>
      {work.statusHistory.length > 0 && <ol className="list-inside list-decimal space-y-2 text-sm text-muted" aria-label="Promjene statusa u ovoj demo sesiji">{work.statusHistory.map((change, index) => <li key={index}>{change.from} → {change.to} · Operater evidencije — demo</li>)}</ol>}
    </DemoSection>
    <DemoSection id="ponude" title="Poređenje ponuda">
      <p className="text-sm text-muted">Izmišljene ponude za isti opis rada. Izbor izvođača je početni demo podatak; nije odluka skupštine.</p>
      <ul className="divide-y divide-line">{work.offers.map(offer => <li key={offer.id} className="flex flex-wrap justify-between gap-3 py-4"><div><h3 className="font-semibold">{offer.contractor}</h3><p className="text-sm text-muted">{offer.id === work.selectedOfferId ? 'Izabrana ponuda' : 'Druga primljena ponuda'}</p></div><p className="tabular-nums">Ponuđeno: {formatDemoMoney(offer.amountCents)}</p></li>)}</ul>
      {!work.offers.length && <p className="text-muted">Još nema primljenih ponuda.</p>}
    </DemoSection>
    <DemoSection id="ugovor-isplate" title="Ugovor i isplate">
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3"><div><dt className="text-sm text-muted">Izabrani izvođač</dt><dd className="font-semibold">{selected?.contractor ?? 'Nije izabran'}</dd></div><div><dt className="text-sm text-muted">Ugovoreno</dt><dd className="font-semibold tabular-nums">{formatDemoMoney(work.contractedCents)}</dd></div><div><dt className="text-sm text-muted">Plaćeno iz finansija</dt><dd className="font-semibold tabular-nums">{formatDemoMoney(paidCents)}</dd></div></dl>
      <p className="text-sm text-muted">Plaćeno je zbir samo povezanih rashoda. Status rada ne mijenja novac; povezivanje ne knjiži dodatni trošak.</p>
      {paidCents > work.contractedCents && <Notice>Povezane isplate premašuju ugovoreni iznos. Provjerite demo evidenciju.</Notice>}
      {payments.length ? <ul className="divide-y divide-line">{payments.map(entry => <li key={entry.id} className="space-y-2 py-3"><Link className="inline-flex min-h-11 items-center font-semibold text-accent underline" href={`/demo/finansije/stavke/${entry.id}`}>{entry.description}</Link><p>{formatDemoDate(entry.date)} · {formatDemoMoney(entry.amountCents)}</p></li>)}</ul> : <p className="text-muted">Još nema povezanih isplata.</p>}
      {view.permissions.canWriteFinances && <><LinkButton href="/demo/finansije/trosak">Dodaj povezani trošak</LinkButton><p className="text-sm text-muted">U finansijskoj formi izaberite ovaj rad u polju „Povezani rad“.</p></>}
    </DemoSection>
    <LinkButton href="/demo/radovi" variant="secondary">Vrati se na radove</LinkButton>
  </div>;
}
