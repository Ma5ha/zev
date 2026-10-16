'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Notice } from '@/components/ui/notice';
import { DemoControls } from './demo-controls';
import { DesktopNavigation, MobileNavigation } from './demo-navigation';
import { useDemo } from './demo-provider';
import { DEMO_PROFILES } from './model';

export function DemoFrame({ children }: { children: ReactNode }) {
  const { view, message } = useDemo();
  const pathname = usePathname();
  return <div className="mx-auto min-h-dvh max-w-[90rem] lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
    <DesktopNavigation />
    <div className="min-w-0 space-y-6 px-4 py-5 sm:px-8 lg:px-10 lg:py-8">
      <header className="space-y-5">
        <MobileNavigation />
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1"><p className="text-sm font-semibold text-accent">Demo okruženje</p><p className="text-xl font-semibold">{view.tenantName}</p><p className="text-sm text-muted">{DEMO_PROFILES.find(profile => profile.id === view.profileId)?.label}</p></div>
          <Link href="/demo/prava" aria-current={pathname === '/demo/prava' ? 'page' : undefined} className="inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4">Demo prava</Link>
        </div>
        <Notice>Demo sa izmišljenim podacima. Izmjene su privremene i nestaju nakon osvježavanja.</Notice>
        <DemoControls />
      </header>
      <p role="status" className="text-sm text-success">{message}</p>
      <main id="sadrzaj" tabIndex={-1}>{children}</main>
      <footer className="border-t border-line py-5 text-sm leading-relaxed text-muted">Izbor profila simulira prikaz. Ne predstavlja stvarnu prijavu ili zaštitu podataka. Demo prava su privremene pretpostavke.</footer>
    </div>
  </div>;
}
