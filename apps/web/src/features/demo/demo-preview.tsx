'use client';

import { LinkButton } from '@/components/ui/button';
import Image from 'next/image';
import { useDemo } from './demo-provider';
import { TransactionList } from './finances/finance-list';
import { DemoNote } from './demo-note';
import { AnnouncementList, DemoSection, FundsSummary, UnitCards, WorkList } from './demo-sections';

export function DemoPreview() {
  const { view } = useDemo();
  const primary = view.profileId === 'owner'
    ? { href: view.cards[0] ? `/demo/finansije/kartice/${view.cards[0].id}` : '/demo/finansije#kartice', label: 'Otvori moju karticu' }
    : view.profileId === 'operator'
      ? { href: '/demo/finansije/trosak', label: 'Dodaj trošak' }
      : { href: '/demo/ankete-i-prijave#prijave', label: 'Otvori prijave' };
  return <div className="space-y-6">
    <section className="courtyard-hero" aria-labelledby="pregled-naslov">
      <div className="space-y-5 py-4"><p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">Dobro došli u {view.tenantName}</p><h1 id="pregled-naslov">Zajedno za<br />ljepše dvorište.</h1><p className="max-w-sm text-lg leading-relaxed text-muted">Održavamo našu zgradu, naš dom i dobar komšiluk.</p><LinkButton href={primary.href} className={view.profileId === 'owner' ? 'border border-warm-action-surface bg-warm-action-surface text-ink hover:bg-balance-surface' : ''}>{primary.label}</LinkButton></div>
      <Image src="/images/courtyard.webp" alt="" width={1200} height={800} priority className="courtyard-image" />
    </section>
    <div className="space-y-4">
      <DemoSection id="sredstva" title="Zajednička sredstva" href="/demo/finansije" linkLabel="Finansije"><FundsSummary cents={view.fundsCents} reconciledOn={view.reconciledOn} /></DemoSection>
      {view.permissions.cards !== 'none' ? <DemoSection id="kartica-pregled" title={view.profileId === 'owner' ? 'Moja kartica' : 'Kartice'} href="/demo/finansije#kartice" linkLabel={view.profileId === 'owner' ? 'Otvori moju karticu' : 'Otvori kartice'}><p className="text-sm text-muted">Trenutno stanje kartica.</p><UnitCards cards={view.cards} linkToCards /></DemoSection> : <DemoSection id="prijave-pregled" title="Vaše prijave" href="/demo/ankete-i-prijave#prijave" linkLabel="Otvori prijave"><p className="text-muted">Prijave vidljive vašem profilu: {view.issues.length}. Status i opis dostupni su u cjelini Ankete i prijave.</p></DemoSection>}
    </div>
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <DemoSection id="radovi-pregled" title="Aktivni radovi" href="/demo/radovi"><WorkList works={view.works.filter(work => work.status !== 'Završeno')} /></DemoSection>
      <DemoSection id="troskovi-pregled" title="Posljednji troškovi" href="/demo/finansije" linkLabel="Otvori finansije"><TransactionList entries={view.entries.filter(entry => entry.kind === 'expense').slice(-3)} />{!view.entries.some(entry => entry.kind === 'expense') && <p className="text-muted">Još nema evidentiranih troškova u ovom demou.</p>}</DemoSection>
    </div>
    <DemoSection id="objave-pregled" title="Obavještenja" href="/demo/obavjestenja" linkLabel="Otvori oglasnu tablu"><AnnouncementList announcements={view.announcements} /></DemoSection>
    <DemoNote />
  </div>;
}
