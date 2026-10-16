'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Notice } from '@/components/ui/notice';
import { DemoControls } from './demo-controls';
import { useDemo } from './demo-provider';
import { DEMO_PROFILES } from './model';

export function DemoFrame({ children }: { children: ReactNode }) {
  const { view, message } = useDemo();
  const pathname = usePathname();
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-8 sm:py-10">
      <header className="space-y-5">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-accent">ZEV · Demo okruženje</p>
          <p className="text-xl font-semibold">{view.tenantName}</p>
          <p className="text-muted">{DEMO_PROFILES.find(profile => profile.id === view.profileId)?.label}</p>
        </div>
        <Notice>Demo sa izmišljenim podacima. Izmjene su privremene i nestaju nakon osvježavanja.</Notice>
        <DemoControls />
        <nav aria-label="Demo okruženje" className="flex flex-wrap gap-6 border-b border-line">
          <Link href="/demo" aria-current={pathname === '/demo' ? 'page' : undefined} className="inline-flex min-h-11 items-center font-semibold text-accent underline-offset-4 hover:underline aria-[current=page]:underline">Demo podaci</Link>
          <Link href="/demo/prava" aria-current={pathname === '/demo/prava' ? 'page' : undefined} className="inline-flex min-h-11 items-center font-semibold text-accent underline-offset-4 hover:underline aria-[current=page]:underline">Demo prava</Link>
        </nav>
      </header>
      <p role="status" className="text-sm text-success">{message}</p>
      <main id="sadrzaj" tabIndex={-1}>{children}</main>
      <footer className="border-t border-line pt-5 text-sm leading-relaxed text-muted">Izbor profila simulira prikaz. Ne predstavlja stvarnu prijavu ili zaštitu podataka. Demo prava su privremene pretpostavke.</footer>
    </div>
  );
}
