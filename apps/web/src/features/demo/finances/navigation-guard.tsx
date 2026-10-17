'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useDemo } from '../demo-provider';

export function FinanceNavigationGuard({ children }: { children: ReactNode }) {
  const { financeDraft, dispatch } = useDemo();
  const router = useRouter();
  const hasDraft = financeDraft !== null;
  const dialog = useRef<HTMLDialogElement>(null);
  const [destination, setDestination] = useState('');
  useEffect(() => {
    if (!hasDraft) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [hasDraft]);
  return <div onClickCapture={event => {
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!financeDraft || !link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0 || link.hasAttribute('download') || link.getAttribute('target') === '_blank') return;
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('/')) return;
    event.preventDefault();
    setDestination(href);
    dialog.current?.showModal();
  }}>
    {children}
    <dialog ref={dialog} aria-labelledby="finansije-odlazak" className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-lg rounded-xl border border-line bg-surface p-6 text-ink backdrop:bg-black/40">
      <h2 id="finansije-odlazak" className="text-xl font-semibold">Odbaciti nepotvrđeni unos?</h2>
      <p className="mt-3 text-muted">Finansijski obrazac nije potvrđen. Nastavak odbacuje unos i lokalni prilog.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant="secondary" onClick={() => dialog.current?.close()}>Ostani u obrascu</Button>
        <Button onClick={() => { dispatch({ type: 'finance-draft', draft: null }); dialog.current?.close(); router.push(destination); }}>Odbaci i nastavi</Button>
      </div>
    </dialog>
  </div>;
}
