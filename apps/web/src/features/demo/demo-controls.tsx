'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useDemo } from './demo-provider';
import { DEMO_PROFILES, DEMO_TENANTS } from './model';
import type { DemoAction } from './reducer';

export function DemoControls() {
  const { view, dispatch, hasUnsavedChanges, hasChanges } = useDemo();
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const [pending, setPending] = useState<DemoAction | 'exit' | null>(null);

  function apply(action: DemoAction | 'exit') {
    if (action === 'exit') { router.push('/'); return; }
    dispatch(action);
    if (action.type === 'context' || action.type === 'reset') router.push('/demo');
  }

  function request(action: DemoAction | 'exit') {
    const needsConfirmation = action === 'exit' ? hasChanges
      : action.type === 'reset' ? hasChanges : hasUnsavedChanges;
    if (!needsConfirmation) { apply(action); return; }
    setPending(action);
    dialog.current?.showModal();
  }

  function close() { dialog.current?.close(); setPending(null); }

  return (
    <div>
      <div className="demo-controls">
        <div className="demo-context-field"><label htmlFor="demo-tenant" className="font-semibold">Demo ZEV</label>
          <Select id="demo-tenant" className="mt-2" value={view.tenantId} options={DEMO_TENANTS.map(tenant => ({ value: tenant.id, label: tenant.label }))}
            onValueChange={value => { const tenant = DEMO_TENANTS.find(item => item.id === value); if (tenant) request({ type: 'context', tenantId: tenant.id, profileId: view.profileId }); }} />
        </div>
        <div className="demo-context-field"><label htmlFor="demo-profile" className="font-semibold">Demo profil</label>
          <Select id="demo-profile" className="mt-2" value={view.profileId} options={DEMO_PROFILES.map(profile => ({ value: profile.id, label: profile.label }))}
            onValueChange={value => { const profile = DEMO_PROFILES.find(item => item.id === value); if (profile) request({ type: 'context', tenantId: view.tenantId, profileId: profile.id }); }} />
        </div>
      <div className="demo-actions">
        <Button variant="secondary" onClick={() => request({ type: 'reset', startedAt: new Date().toISOString() })}>Vrati početni demo</Button>
        <Button variant="secondary" onClick={() => request('exit')}>Izađi iz demoa</Button>
      </div>
      </div>
      <dialog ref={dialog} aria-labelledby="potvrda-naslov" onCancel={() => setPending(null)}
        className="fixed inset-0 m-auto max-h-[90dvh] overflow-y-auto w-[calc(100%-2rem)] max-w-lg rounded-xl border border-line bg-surface p-6 text-ink shadow-xl backdrop:bg-black/40">
        <h2 id="potvrda-naslov" className="text-xl font-semibold">{pending === 'exit' ? 'Izaći iz demoa?' : pending?.type === 'reset' ? 'Vratiti početne podatke?' : 'Odbaciti nepotvrđeni unos?'}</h2>
        <p className="mt-3 leading-relaxed text-muted">{pending === 'exit' ? 'Lokalne izmjene će biti izgubljene. Ponovni ulaz započinje početni demo.' : pending?.type === 'reset' ? 'Odbaci demo izmjene u oba ZEV-a i vrati Javor / Vlasnik.' : 'Nepotvrđeni unos će biti odbačen. Sačuvane demo izmjene ostaju u svom ZEV-u.'}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="secondary" onClick={close}>Odustani</Button>
          <Button onClick={() => { if (pending) apply(pending); close(); }}>Potvrdi</Button>
        </div>
      </dialog>
    </div>
  );
}
