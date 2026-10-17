'use client';

import { CommunityForm, CommunityIssues, CommunityPolls } from './community-ui';
import { PageHeading } from '@/components/ui/page-heading';
import { useDemo } from './demo-provider';
import { AnnouncementList, DemoSection, WorkList } from './demo-sections';

export function DemoWorks() {
  const { view } = useDemo();
  return <div className="space-y-6"><PageHeading eyebrow="Održavanje zgrade" title="Radovi">Otvorite rad za poređenje ponuda, status i povezane isplate.</PageHeading><DemoSection id="radovi-lista" title="Aktivni radovi"><WorkList works={view.works.filter(work => work.status !== 'Završeno')} /></DemoSection><DemoSection id="zavrseni-radovi" title="Završeni radovi"><WorkList works={view.works.filter(work => work.status === 'Završeno')} /></DemoSection></div>;
}

export function DemoAnnouncements() {
  const { view } = useDemo();
  return <div className="space-y-6"><PageHeading eyebrow="Informacije za zajednicu" title="Oglasna tabla">Obavještenja aktivnog demo ZEV-a.</PageHeading><CommunityForm kind="announcement" /><DemoSection id="objave-lista" title="Obavještenja"><AnnouncementList announcements={view.announcements} /></DemoSection></div>;
}

export function DemoPollsAndIssues() {
  return <div className="space-y-6"><PageHeading eyebrow="Mišljenja i održavanje" title="Ankete i prijave">Informativne ankete i prijave dostupne vašem demo profilu.</PageHeading><CommunityPolls /><CommunityIssues /></div>;
}
