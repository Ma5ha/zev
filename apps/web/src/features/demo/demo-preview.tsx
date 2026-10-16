'use client';

import { LinkButton } from '@/components/ui/button';
import { PageHeading } from '@/components/ui/page-heading';
import { useDemo } from './demo-provider';
import { DemoNote } from './demo-note';
import { AnnouncementList, DemoSection, FundsSummary, UnitCards, WorkList } from './demo-sections';

export function DemoPreview() {
  const { view } = useDemo();
  const primary = view.profileId === 'owner'
    ? { href: '/demo/finansije#kartice', label: 'Otvori moju karticu' }
    : view.profileId === 'operator'
      ? { href: '/demo/finansije', label: 'Otvori finansije' }
      : { href: '/demo/ankete-i-prijave#prijave', label: 'Otvori prijave' };
  return <div className="space-y-6">
    <div className="flex flex-wrap items-start justify-between gap-5"><PageHeading eyebrow="Vaša zgrada na jednom mjestu" title="Pregled zgrade">Novac, održavanje i najnovije informacije aktivnog demo ZEV-a.</PageHeading><LinkButton href={primary.href}>{primary.label}</LinkButton></div>
    <div className="grid gap-6 xl:grid-cols-2">
      <DemoSection id="sredstva" title="Zajednička sredstva" href="/demo/finansije" linkLabel="Finansije"><FundsSummary cents={view.openingFundsCents} reconciledOn={view.reconciledOn} /></DemoSection>
      {view.permissions.cards !== 'none' ? <DemoSection id="kartica-pregled" title={view.profileId === 'owner' ? 'Moja kartica' : 'Kartice'} href="/demo/finansije#kartice" linkLabel={view.profileId === 'owner' ? 'Otvori moju karticu' : 'Otvori kartice'}><p className="text-sm text-muted">Početno stanje · oktobar 2026.</p><UnitCards cards={view.cards} /></DemoSection> : <DemoSection id="prijave-pregled" title="Vaše prijave" href="/demo/ankete-i-prijave#prijave" linkLabel="Otvori prijave"><p className="text-muted">Prijave vidljive vašem profilu: {view.issues.length}. Status i opis dostupni su u cjelini Ankete i prijave.</p></DemoSection>}
      <DemoSection id="radovi-pregled" title="Aktivni radovi" href="/demo/radovi"><WorkList works={view.works.filter(work => work.status !== 'Završeno')} /></DemoSection>
      <DemoSection id="troskovi-pregled" title="Posljednji troškovi" href="/demo/finansije" linkLabel="Otvori finansije"><p className="leading-relaxed text-muted">Još nema evidentiranih troškova u ovom demou. Početna sredstva su odvojena od budućih prihoda i rashoda.</p></DemoSection>
    </div>
    <DemoSection id="objave-pregled" title="Obavještenja" href="/demo/obavjestenja" linkLabel="Otvori oglasnu tablu"><AnnouncementList announcements={view.announcements} /></DemoSection>
    <DemoNote />
  </div>;
}
