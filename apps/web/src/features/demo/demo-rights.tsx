'use client';

import { useDemo } from './demo-provider';

export function DemoRights() {
  const { view } = useDemo();
  const permissions = view.permissions;
  const rows = [
    ['Zajedničke finansije, radovi, ponude i objave', 'Pregled'],
    ['Pojedinačne kartice', permissions.cards === 'all' ? 'Sve u aktivnom demo ZEV-u' : permissions.cards === 'own' ? 'Samo sopstvena ovlašćena kartica' : 'Bez pristupa'],
    ['Finansijski unos', permissions.canWriteFinances ? 'Dozvoljen u budućem demo modulu' : 'Bez unosa'],
    ['Radovi i obavještenja', permissions.canPublish ? 'Pregled i izmjene u budućim demo modulima' : 'Samo pregled'],
    ['Prijave problema', permissions.canManageIssues ? 'Sve prijave aktivnog ZEV-a i promjena statusa' : 'Slanje i pregled sopstvenih'],
    ['Informativne ankete', permissions.canManagePolls ? 'Otvaranje, zatvaranje i odgovor svog članstva' : 'Odgovor svog članstva'],
    ['Članstva i stvarna ovlašćenja', 'Bez upravljanja'],
    ['Radna bilješka demoa', permissions.canEditNote ? 'Privremeni unos za provjeru memorije' : 'Bez pristupa'],
  ];
  return (
    <dl className="divide-y divide-line rounded-xl border border-line bg-surface px-5 sm:px-6">
      {rows.map(([label, value]) => <div key={label} className="grid gap-2 py-5 sm:grid-cols-2 sm:gap-6">
        <dt className="font-semibold">{label}</dt><dd className="leading-relaxed text-muted">{value}</dd>
      </div>)}
    </dl>
  );
}
