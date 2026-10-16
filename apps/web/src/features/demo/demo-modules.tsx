'use client';

import { Notice } from '@/components/ui/notice';
import { PageHeading } from '@/components/ui/page-heading';
import { useDemo } from './demo-provider';
import { AnnouncementList, DemoSection, FundsSummary, UnitCards, WorkList } from './demo-sections';

export function DemoFinances() {
  const { view } = useDemo();
  return <div className="space-y-6"><PageHeading eyebrow="Zajednička evidencija" title="Finansije">Početna sredstva zgrade i kartice dostupne aktivnom demo profilu.</PageHeading><DemoSection id="finansije-sredstva" title="Zajednička sredstva"><FundsSummary cents={view.openingFundsCents} reconciledOn={view.reconciledOn} /></DemoSection><DemoSection id="kartice" title={view.profileId === 'owner' ? 'Moja kartica' : 'Kartice'}><p className="text-sm text-muted">Početno stanje · oktobar 2026.</p><UnitCards cards={view.cards} /></DemoSection><DemoSection id="promet" title="Prihodi i rashodi"><p className="text-muted">Još nema evidentiranih prihoda ili rashoda. Početna sredstva nisu nova uplata.</p></DemoSection><Notice>Ovo je početni finansijski pregled. Detalji kartice i stavki dolaze u narednom koraku.{view.permissions.canWriteFinances ? ' Unos troška, uplate i mjesečni obračun još nisu dostupni.' : ''}</Notice></div>;
}

export function DemoWorks() {
  const { view } = useDemo();
  return <div className="space-y-6"><PageHeading eyebrow="Održavanje zgrade" title="Radovi">Početni pregled radova i njihovih statusa.</PageHeading><DemoSection id="radovi-lista" title="Aktivni radovi"><WorkList works={view.works.filter(work => work.status !== 'Završeno')} /></DemoSection><Notice>Detalji radova, poređenje ponuda i povezane isplate dolaze u narednim koracima.{view.permissions.canManageWorks ? ' Promjena statusa još nije dostupna.' : ''}</Notice></div>;
}

export function DemoAnnouncements() {
  const { view } = useDemo();
  return <div className="space-y-6"><PageHeading eyebrow="Informacije za zajednicu" title="Oglasna tabla">Obavještenja aktivnog demo ZEV-a.</PageHeading><DemoSection id="objave-lista" title="Obavještenja"><AnnouncementList announcements={view.announcements} /></DemoSection>{view.permissions.canPublish && <Notice>Objavljivanje novih obavještenja dolazi u narednim koracima.</Notice>}</div>;
}

export function DemoPollsAndIssues() {
  const { view } = useDemo();
  return <div className="space-y-6"><PageHeading eyebrow="Mišljenja i održavanje" title="Ankete i prijave">Informativne ankete i prijave dostupne vašem demo profilu.</PageHeading><DemoSection id="ankete" title="Informativne ankete">{view.polls.length ? <ul className="space-y-4">{view.polls.map(poll => <li key={poll.id} className="space-y-2"><h3 className="font-semibold">{poll.question}</h3><p className="text-sm text-muted">Informativna anketa · nije formalno odlučivanje skupštine.</p></li>)}</ul> : <p className="text-muted">Još nema informativnih anketa u ovoj zgradi.</p>}</DemoSection><DemoSection id="prijave" title={view.permissions.canManageIssues ? 'Prijave aktivnog ZEV-a' : 'Moje prijave'}>{view.issues.length ? <ul className="divide-y divide-line">{view.issues.map(issue => <li key={issue.id} className="space-y-2 py-3"><h3 className="font-semibold">{issue.description}</h3><p className="text-sm text-muted">Status: {issue.status}</p></li>)}</ul> : <p className="text-muted">Nema prijava dostupnih ovom profilu u aktivnom ZEV-u.</p>}<p className="text-sm leading-relaxed text-muted">Za hitnu opasnost odmah kontaktirajte nadležnu službu ili odgovornu osobu.</p></DemoSection><Notice>Slanje prijave i odgovaranje na ankete dolaze u narednim koracima.</Notice></div>;
}
