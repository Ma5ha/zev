'use client';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/text-field';
import { useDemo } from './demo-provider';

export function DemoNote() {
  const { view, draftNote, dispatch, hasUnsavedChanges } = useDemo();
  if (!view.permissions.canEditNote) return null;
  return (
    <section aria-labelledby="biljeska-naslov" className="space-y-4 rounded-xl border border-line bg-surface p-5 sm:p-6">
      <h2 id="biljeska-naslov" className="text-xl font-semibold">Radna bilješka demoa</h2>
      <p className="text-sm leading-relaxed text-muted">Služi provjeri privremenih izmjena po ZEV-u. Vidi je samo demo operater; ovo nije obavještenje stanarima.</p>
      <form className="space-y-4" onSubmit={event => { event.preventDefault(); dispatch({ type: 'save-note' }); }}>
        <TextField id="demo-biljeska" label="Bilješka" value={draftNote} maxLength={200}
          hint="Najviše 200 znakova. Sačuvana bilješka nestaje nakon reseta ili osvježavanja."
          onChange={event => dispatch({ type: 'draft-note', value: event.target.value })} />
        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={!hasUnsavedChanges}>Sačuvaj u demou</Button>
          <Button variant="secondary" disabled={!hasUnsavedChanges} onClick={() => dispatch({ type: 'discard-note' })}>Odbaci unos</Button>
        </div>
        <p className="text-sm text-muted">{hasUnsavedChanges ? 'Postoje nepotvrđene izmjene.' : 'Nema nepotvrđenih izmjena.'}</p>
      </form>
    </section>
  );
}
