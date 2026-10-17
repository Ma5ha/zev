'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DemoControls } from './demo-controls';
import { DesktopNavigation, MobileNavigation } from './demo-navigation';
import { useDemo } from './demo-provider';
import { FinanceNavigationGuard } from './finances/navigation-guard';

export function DemoFrame({ children }: { children: ReactNode }) {
  const { message } = useDemo();
  const pathname = usePathname();
  return <FinanceNavigationGuard><div className="mx-auto min-h-dvh max-w-[100rem] lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
    <DesktopNavigation />
    <div className="min-w-0 space-y-6 px-4 py-5 sm:px-8 lg:px-10 lg:py-6">
      <header className="space-y-4 border-b border-line pb-5">
        <MobileNavigation />
        <DemoControls />
        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2">
          <p className="rounded-full bg-balance-surface px-3 py-2 text-sm text-ink">Izmišljeni podaci · Privremene izmjene nestaju nakon osvježavanja.</p>
          <Link href="/demo/prava" aria-current={pathname === '/demo/prava' ? 'page' : undefined} className="inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4">Demo prava</Link>
        </div>
      </header>
      <p role="status" className="text-sm text-success empty:hidden">{message}</p>
      <main id="sadrzaj" tabIndex={-1}>{children}</main>
      <footer className="border-t border-line py-5 text-sm leading-relaxed text-muted">Izbor profila simulira prikaz. Ne predstavlja stvarnu prijavu ili zaštitu podataka. Demo prava su privremene pretpostavke.</footer>
    </div>
  </div></FinanceNavigationGuard>;
}
