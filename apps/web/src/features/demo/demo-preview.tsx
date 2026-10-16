'use client';

import { useDemo } from './demo-provider';
import { DemoNote } from './demo-note';
import { formatDemoMoney } from './selectors';

export function DemoPreview() {
  const { view } = useDemo();
  return (
    <div className="space-y-6">
      <section aria-labelledby="podaci-naslov" className="space-y-4 rounded-xl border border-line bg-surface p-5 sm:p-6">
        <h2 id="podaci-naslov" className="text-xl font-semibold">Početni podaci · {view.tenantName}</h2>
        <div>
          <p className="text-sm text-muted">Početna sredstva demoa</p>
          <p className="mt-1 text-3xl font-semibold tabular-nums">{formatDemoMoney(view.openingFundsCents)}</p>
          <p className="mt-2 text-sm text-muted">Demo stanje na dan 1. oktobra 2026. Podaci nisu provjereni u banci.</p>
        </div>
        <h3 className="font-semibold">Kartice dostupne ovom profilu</h3>
        {view.cards.length ? <ul className="divide-y divide-line">
          {view.cards.map(unit => <li key={unit.id} className="flex flex-wrap justify-between gap-2 py-3">
            <span>{unit.label} · {unit.areaM2} m²</span>
            <span className="font-semibold tabular-nums">{unit.openingBalanceCents > 0 ? 'Dug' : unit.openingBalanceCents < 0 ? 'Avans' : 'Saldo'}: {formatDemoMoney(Math.abs(unit.openingBalanceCents))}</span>
          </li>)}
        </ul> : <p className="text-muted">Ovaj demo profil nema pristup pojedinačnim karticama.</p>}
      </section>
      <section aria-labelledby="sadrzaj-naslov" className="space-y-4 rounded-xl border border-line bg-surface p-5 sm:p-6">
        <h2 id="sadrzaj-naslov" className="text-xl font-semibold">Sadržaj aktivnog ZEV-a</h2>
        <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2">
          <dt>Radovi</dt><dd>{view.works.length}</dd>
          <dt>Obavještenja</dt><dd>{view.announcements.length}</dd>
          <dt>Informativne ankete</dt><dd>{view.polls.length}</dd>
          <dt>Prijave vidljive profilu</dt><dd>{view.issues.length}</dd>
        </dl>
        {view.issues.length > 0 && <ul className="space-y-2 border-t border-line pt-4">
          {view.issues.map(issue => <li key={issue.id} className="text-sm leading-relaxed">{issue.description} <span className="font-semibold">{issue.status}</span></li>)}
        </ul>}
        <p className="text-sm leading-relaxed text-muted">Ovo je početni prikaz za provjeru podataka i dozvola. Navigacija kroz poslovne cjeline slijedi u narednom koraku.</p>
      </section>
      <DemoNote />
    </div>
  );
}
