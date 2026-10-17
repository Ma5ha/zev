'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconHome, IconCoins, IconTool, IconClipboard, IconChartBar } from '@tabler/icons-react';
import { useDemo } from './demo-provider';
import { Button } from '@/components/ui/button';

export const DEMO_DESTINATIONS = [
  { href: '/demo', label: 'Pregled', icon: IconHome },
  { href: '/demo/finansije', label: 'Finansije', icon: IconCoins },
  { href: '/demo/radovi', label: 'Radovi', icon: IconTool },
  { href: '/demo/obavjestenja', label: 'Oglasna tabla', icon: IconClipboard },
  { href: '/demo/ankete-i-prijave', label: 'Ankete i prijave', icon: IconChartBar },
] as const;

function NavigationLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return <nav aria-label="Glavne cjeline"><ul className="space-y-2">
    {DEMO_DESTINATIONS.map(item => <li key={item.href}>
      <Link href={item.href} onClick={onNavigate} aria-current={pathname === item.href || (item.href !== '/demo' && pathname.startsWith(`${item.href}/`)) ? 'page' : undefined}
        className="flex min-h-12 items-center gap-3 rounded-xl px-3 py-3 font-medium navigation-link"><item.icon size={23} stroke={1.6} className="shrink-0" aria-hidden="true" />{item.label}</Link>
    </li>)}
  </ul></nav>;
}

export function DesktopNavigation() {
  const { view } = useDemo();
  return <aside className="demo-sidebar hidden p-4 lg:block"><div className="sticky top-8 flex min-h-[calc(100dvh-4rem)] flex-col"><div className="mb-10 px-3"><p className="text-2xl font-semibold tracking-tight">ZEV<span className="text-warm-action-surface">.</span></p><p className="mt-1 text-sm text-white/80">{view.tenantName}</p></div><NavigationLinks /><div className="mt-auto px-3 pt-16"><p className="text-xl font-medium text-warm-action-surface">Dobar komšiluk<br />počinje povjerenjem.</p><p className="mt-3 text-sm leading-relaxed text-white/80">Naša zgrada. Naš zajednički dom.</p></div></div></aside>;
}

export function MobileNavigation() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const active = DEMO_DESTINATIONS.find(item => item.href === pathname || (item.href !== '/demo' && pathname.startsWith(`${item.href}/`)))?.label ?? 'Demo prava';
  function close() { dialog.current?.close(); setOpen(false); }
  return <div className="lg:hidden">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
      <p className="font-semibold">{active}</p>
      <Button variant="secondary" aria-haspopup="dialog" aria-expanded={open} aria-controls="demo-meni" onClick={() => { dialog.current?.showModal(); setOpen(true); }}>Meni</Button>
    </div>
    <dialog id="demo-meni" ref={dialog} aria-labelledby="meni-naslov" onClose={() => setOpen(false)}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-xl border border-line bg-surface p-5 text-ink shadow-xl backdrop:bg-black/40">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><h2 id="meni-naslov" className="text-xl font-semibold">Meni zgrade</h2><Button variant="secondary" onClick={close}>Zatvori</Button></div>
      <NavigationLinks onNavigate={close} />
    </dialog>
  </div>;
}
