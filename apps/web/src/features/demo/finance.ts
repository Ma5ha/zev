import type { DemoTenant, DemoUnit } from './model';

export const EXPENSE_CATEGORIES = ['Održavanje', 'Režije', 'Čišćenje', 'Ostalo'] as const;
export type FinanceKind = 'expense' | 'payment' | 'assessment';
export type FinanceDraft = Readonly<{
  kind: FinanceKind; date: string; amount: string; description: string;
  category: string; unitId: string; workId: string; month: string; dueDate: string;
  attachment: File | null;
}>;
export type FinanceEntry = Readonly<{
  id: string; kind: 'expense' | 'payment'; date: string; amountCents: number;
  description: string; category: string; unitId?: string; workId?: string;
  attachment: File | null; author: string;
}>;
export type Assessment = Readonly<{
  id: string; unitId: string; month: string; dueDate: string; amountCents: number; rateCents: number;
}>;
export type FinanceErrors = Partial<Record<keyof FinanceDraft, string>>;

export function initialFinanceDraft(kind: FinanceKind, date: string): FinanceDraft {
  return { kind, date, amount: kind === 'assessment' ? '0,50' : '', description: '',
    category: '', unitId: '', workId: '', month: '2026-10', dueDate: '', attachment: null };
}

// Parse decimal text without floating point money or implicit thousands separators.
export function parseCents(value: string): number | null {
  if (!/^\d{1,9}([,.]\d{1,2})?$/.test(value.trim())) return null;
  const [whole, fraction = ''] = value.trim().replace(',', '.').split('.');
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  return cents > 0 && Number.isSafeInteger(cents) ? cents : null;
}

export function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value < '1900-01-01' || value > '2100-12-31') return false;
  const date = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function attachmentError(file: File | null) {
  if (!file) return undefined;
  if (!['application/pdf', 'image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return 'Izaberite PDF, JPEG, PNG ili WebP fajl.';
  if (file.size === 0 || file.size > 5 * 1024 * 1024) return 'Fajl mora imati sadržaj i biti veličine do 5 MB.';
  return undefined;
}

export function validateFinanceDraft(draft: FinanceDraft, tenant: Pick<DemoTenant, 'units' | 'works'>): FinanceErrors {
  const errors: FinanceErrors = {};
  if (parseCents(draft.amount) === null) errors.amount = 'Unesite iznos veći od nule, sa najviše dvije decimale (do 999.999.999,99 KM).';
  if (draft.kind === 'assessment') {
    if (!/^20\d{2}-(0[1-9]|1[0-2])$/.test(draft.month)) errors.month = 'Izaberite ispravan mjesec od 2000. do 2099.';
    if (!validDate(draft.dueDate)) errors.dueDate = 'Unesite ispravan rok plaćanja.';
  } else {
    if (!validDate(draft.date)) errors.date = 'Unesite ispravan datum od 1900. do 2100.';
    if (draft.kind === 'expense') {
      if (!draft.description.trim()) errors.description = 'Unesite svrhu troška.';
      if (!EXPENSE_CATEGORIES.some(category => category === draft.category)) errors.category = 'Izaberite kategoriju.';
      if (draft.workId && !tenant.works.some(work => work.id === draft.workId)) errors.workId = 'Izaberite rad iz aktivnog ZEV-a.';
    } else if (!tenant.units.some(unit => unit.id === draft.unitId)) errors.unitId = 'Izaberite dozvoljenu jedinicu.';
    const error = attachmentError(draft.attachment);
    if (error) errors.attachment = error;
  }
  if (draft.description.length > 500) errors.description = 'Najviše 500 znakova.';
  return errors;
}

export function assessedCents(unit: DemoUnit, rateCents: number) {
  // Surface is represented in hundredths; round half up per unit.
  const areaHundredths = BigInt(Math.round(unit.areaM2 * 100));
  return Number((areaHundredths * BigInt(rateCents) + 50n) / 100n);
}

export function assessmentPreview(tenant: DemoTenant, draft: FinanceDraft) {
  const rate = parseCents(draft.amount);
  return tenant.units.map(unit => {
    const existing = tenant.assessments.find(item => item.unitId === unit.id && item.month === draft.month);
    return { ...unit, existing, amountCents: existing?.amountCents ?? (rate ? assessedCents(unit, rate) : 0) };
  });
}

export function currentFunds(tenant: DemoTenant) {
  return tenant.openingFundsCents + tenant.entries.reduce((sum, item) => sum + (item.kind === 'payment' ? item.amountCents : -item.amountCents), 0);
}

export function cardSummary(tenant: DemoTenant, unit: DemoUnit) {
  const charges = tenant.assessments.filter(item => item.unitId === unit.id);
  const payments = tenant.entries.filter(item => item.kind === 'payment' && item.unitId === unit.id);
  const assessed = charges.reduce((sum, item) => sum + item.amountCents, 0);
  const paid = payments.reduce((sum, item) => sum + item.amountCents, 0);
  return { ...unit, balanceCents: unit.openingBalanceCents + assessed - paid, assessed, paid, charges, payments };
}

// The opening balance is before October 2026. Credit is allocated to oldest
// due obligations first; unused credit is advance and offsets later charges.
export function cardAllocations(card: ReturnType<typeof cardSummary>) {
  let credit = Math.max(-card.openingBalanceCents, 0) + card.paid;
  const obligations = [
    ...(card.openingBalanceCents > 0 ? [{ id: 'opening', month: 'Početni dug', dueDate: '2026-09-30', amountCents: card.openingBalanceCents }] : []),
    ...card.charges.toSorted((a, b) => a.dueDate.localeCompare(b.dueDate) || a.month.localeCompare(b.month)),
  ];
  return obligations.map(item => {
    const allocated = Math.min(item.amountCents, credit);
    credit -= allocated;
    return { ...item, allocated, remaining: item.amountCents - allocated };
  });
}

export function publicEntry(entry: FinanceEntry, operator: boolean) {
  return entry.kind === 'payment' && !operator
    ? { ...entry, description: 'Uplata održavanja', unitId: undefined, attachment: null, author: '', workId: undefined }
    : entry;
}
