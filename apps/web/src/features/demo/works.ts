import type { FinanceEntry } from './finance';

// A link to a work never creates another financial entry.
export function workPayments(entries: readonly FinanceEntry[], workId: string) {
  const payments = entries.filter(entry => entry.kind === 'expense' && entry.workId === workId);
  return { payments, paidCents: payments.reduce((sum, entry) => sum + entry.amountCents, 0) };
}
