import type { DemoState } from './model';

// The timestamp comes from the request or reset event, never from a hidden clock here.
export function createDemoState(startedAt: string): DemoState {
  const closesAt = new Date(new Date(startedAt).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
  return {
    tenantId: 'javor', profileId: 'owner', draftNote: null, financeDraft: null, message: '',
    tenants: {
      javor: {
        id: 'javor', name: 'ZEV Javor — demo', openingFundsCents: 100000,
        reconciledOn: '2026-10-01', ownerUnitId: 'javor-a', note: '', entries: [], assessments: [],
        units: [
          { id: 'javor-a', label: 'Jedinica A', areaM2: 60, openingBalanceCents: 2000 },
          { id: 'javor-b', label: 'Jedinica B', areaM2: 60, openingBalanceCents: -1000 },
        ],
        works: [{
          id: 'javor-vrata', title: 'Popravka ulaznih vrata', status: 'Priprema',
          offerDeadline: '2026-10-10', selectedOfferId: 'ponuda-b', contractedCents: 115000,
          offers: [
            { id: 'ponuda-a', contractor: 'Servis A', amountCents: 105000 },
            { id: 'ponuda-b', contractor: 'Servis B', amountCents: 115000 },
          ],
        }],
        announcements: [{ id: 'javor-sastanak', title: 'Razgovor o održavanju ulaza', body: 'Izmišljeno obavještenje za pregled demoa.', date: '2026-10-02' }],
        issues: [
          { id: 'javor-svjetlo', authorMembershipId: 'javor:owner', description: 'Rasvjeta na ulazu povremeno ne radi.', status: 'Zaprimljeno' },
          { id: 'javor-interfon', authorMembershipId: 'javor:resident', description: 'Interfon se slabo čuje.', status: 'U obradi' },
        ],
        polls: [{ id: 'javor-termin', question: 'Koji termin sastanka ti odgovara?', options: ['Radni dan uveče', 'Subota prijepodne'], closesAt }],
      },
      lipa: {
        id: 'lipa', name: 'ZEV Lipa — demo', openingFundsCents: 50000,
        reconciledOn: '2026-10-01', ownerUnitId: 'lipa-c', note: '', entries: [], assessments: [],
        units: [{ id: 'lipa-c', label: 'Jedinica C', areaM2: 50, openingBalanceCents: 0 }],
        works: [], announcements: [], issues: [], polls: [],
      },
    },
  };
}
