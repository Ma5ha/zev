'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export const DEMO_DESTINATIONS = [
  { href: '/demo', label: 'Pregled' },
  { href: '/demo/finansije', label: 'Finansije' },
  { href: '/demo/radovi', label: 'Radovi' },
  { href: '/demo/obavjestenja', label: 'Oglasna tabla' },
  { href: '/demo/ankete-i-prijave', label: 'Ankete i prijave' },
] as const;

function NavigationLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return <nav aria-label="Glavne cjeline"><ul className="space-y-2">
    {DEMO_DESTINATIONS.map(item => <li key={item.href}>
      <Link href={item.href} onClick={onNavigate} aria-current={pathname === item.href || (item.href !== '/demo' && pathname.startsWith(`${item.href}/`)) ? 'page' : undefined}
        className="flex min-h-11 items-center rounded-lg px-4 py-3 font-semibold hover:bg-canvas aria-[current=page]:bg-accent aria-[current=page]:text-white">{item.label}</Link>
    </li>)}
  </ul></nav>;
}

export function DesktopNavigation() {
  return <aside className="hidden border-r border-line bg-surface p-5 lg:block"><p className="mb-6 px-4 text-xl font-semibold">ZEV<span className="text-accent">.</span></p><NavigationLinks /></aside>;
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
