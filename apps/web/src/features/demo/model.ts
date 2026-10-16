export type TenantId = 'javor' | 'lipa';
export type ProfileId = 'owner' | 'operator' | 'resident';

export type DemoUnit = Readonly<{
  id: string;
  label: string;
  areaM2: number;
  openingBalanceCents: number; // Positive means debt; negative means advance.
}>;

export type DemoTenant = Readonly<{
  id: TenantId;
  name: string;
  openingFundsCents: number;
  reconciledOn: string;
  units: readonly DemoUnit[];
  ownerUnitId: string;
  note: string;
  works: readonly Readonly<{
    id: string;
    title: string;
    status: 'Priprema' | 'U toku' | 'Završeno';
    offerDeadline: string;
    offers: readonly Readonly<{ id: string; contractor: string; amountCents: number }>[];
    selectedOfferId: string;
    contractedCents: number;
  }>[];
  announcements: readonly Readonly<{ id: string; title: string; body: string; date: string }>[];
  issues: readonly Readonly<{ id: string; authorMembershipId: string; description: string; status: 'Zaprimljeno' | 'U obradi' | 'Riješeno' }>[];
  polls: readonly Readonly<{ id: string; question: string; options: readonly string[]; closesAt: string }>[];
}>;

export type DemoState = Readonly<{
  tenants: Readonly<Record<TenantId, DemoTenant>>;
  tenantId: TenantId;
  profileId: ProfileId;
  draftNote: string | null;
  message: string;
}>;

export const DEMO_PROFILES: readonly Readonly<{ id: ProfileId; label: string }>[] = [
  { id: 'owner', label: 'Vlasnik — demo' },
  { id: 'operator', label: 'Operater evidencije — demo' },
  { id: 'resident', label: 'Ovlašćeni korisnik prostora — demo' },
];

export const DEMO_TENANTS: readonly Readonly<{ id: TenantId; label: string }>[] = [
  { id: 'javor', label: 'ZEV Javor — demo' },
  { id: 'lipa', label: 'ZEV Lipa — demo' },
];
