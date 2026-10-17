import type { DemoTenant } from './model';
export type CommunityDraft = { kind: 'announcement' | 'issue' | 'poll'; title: string; body: string; options: string; closesAt: string; photo?: { name: string; data: string } };
export const issueStatuses = ['Zaprimljeno', 'U obradi', 'Riješeno'] as const;
export function communityValidation(draft: CommunityDraft, now: string): { field: 'title' | 'body' | 'options' | 'closesAt'; message: string } | null {
  if (draft.kind === 'issue') return draft.body.trim() ? null : { field: 'body', message: 'Unesite opis problema.' };
  if (!draft.title.trim()) return { field: 'title', message: draft.kind === 'poll' ? 'Unesite pitanje.' : 'Unesite naslov.' };
  if (draft.kind === 'announcement') return draft.body.trim() ? null : { field: 'body', message: 'Unesite sadržaj.' };
  const options = draft.options.split('\n').map(value => value.trim()).filter(Boolean);
  if (options.length < 2 || new Set(options).size !== options.length) return { field: 'options', message: 'Unesite najmanje dvije različite opcije, svaku u novi red.' };
  return Number.isFinite(Date.parse(draft.closesAt)) && Date.parse(draft.closesAt) > Date.parse(now) ? null : { field: 'closesAt', message: 'Izaberite budući rok.' };
}
export function validateCommunity(draft: CommunityDraft, now: string) {
  return communityValidation(draft, now)?.message ?? '';
}
export function pollClosed(poll: DemoTenant['polls'][number], now: string) { return poll.closed || Date.parse(poll.closesAt) <= Date.parse(now); }
