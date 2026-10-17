import { validateCommunity, pollClosed, issueStatuses, type CommunityDraft } from './community';
import { assessmentPreview, validateFinanceDraft, parseCents, type FinanceDraft } from './finance';
import { createDemoState } from './fixtures';
import type { DemoState, ProfileId, TenantId } from './model';
import { demoPermissions } from './selectors';

export type DemoAction =
  | { type: 'community-draft'; draft: CommunityDraft | null }
  | { type: 'community-save'; now: string }
  | { type: 'community-photo'; tenantId: TenantId; profileId: ProfileId; photo: NonNullable<CommunityDraft['photo']> }
  | { type: 'issue-status'; id: string; status: typeof issueStatuses[number] }
  | { type: 'poll-answer'; id: string; option: number; now: string }
  | { type: 'poll-close'; id: string }

  | { type: 'finance-draft'; draft: FinanceDraft | null }
  | { type: 'finance-save' }
  | { type: 'work-status'; workId: string; status: 'Priprema' | 'U toku' | 'Završeno' }
  | { type: 'context'; tenantId: TenantId; profileId: ProfileId }
  | { type: 'draft-note'; value: string }
  | { type: 'save-note' }
  | { type: 'discard-note' }
  | { type: 'reset'; startedAt: string };

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'community-photo':
      return state.tenantId === action.tenantId && state.profileId === action.profileId && state.communityDraft?.kind === 'issue'
        ? { ...state, communityDraft: { ...state.communityDraft, photo: action.photo } } : state;
    case 'community-draft': return { ...state, communityDraft: action.draft, message: '' };
    case 'community-save': {
      const draft = state.communityDraft;
      if (!draft || validateCommunity(draft, action.now) || (draft.kind !== 'issue' && state.profileId !== 'operator')) return state;
      const tenant = state.tenants[state.tenantId];
      const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Belgrade' }).format(new Date(action.now));
      const id = `${tenant.id}-${draft.kind}-${action.now}`;
      const updated = draft.kind === 'announcement' ? { ...tenant, announcements: [{ id, title: draft.title.trim(), body: draft.body.trim(), date }, ...tenant.announcements] }
        : draft.kind === 'issue' ? { ...tenant, issues: [...tenant.issues, { id, description: draft.body.trim(), date, photo: draft.photo, authorMembershipId: `${tenant.id}:${state.profileId}`, status: 'Zaprimljeno' as const }] }
        : { ...tenant, polls: [...tenant.polls, { id, question: draft.title.trim(), options: draft.options.split('\n').map(value => value.trim()).filter(Boolean), closesAt: new Date(draft.closesAt).toISOString() }] };
      return { ...state, communityDraft: null, message: draft.kind === 'issue' ? 'Prijava je dodata u demo.' : draft.kind === 'poll' ? 'Informativna anketa je dodata u demo.' : 'Obavještenje je objavljeno u demou.', tenants: { ...state.tenants, [tenant.id]: updated } };
    }
    case 'issue-status': {
      if (state.profileId !== 'operator' || !issueStatuses.includes(action.status)) return state;
      const tenant = state.tenants[state.tenantId];
      return { ...state, message: 'Status prijave je promijenjen u demou.', tenants: { ...state.tenants, [tenant.id]: { ...tenant, issues: tenant.issues.map(issue => issue.id === action.id ? { ...issue, status: action.status } : issue) } } };
    }
    case 'poll-close':
    case 'poll-answer': {
      const tenant = state.tenants[state.tenantId];
      const poll = tenant.polls.find(item => item.id === action.id);
      if (!poll || (action.type === 'poll-close' ? state.profileId !== 'operator' : pollClosed(poll, action.now) || !Number.isInteger(action.option) || !poll.options[action.option])) return state;
      const updated = action.type === 'poll-close' ? { ...poll, closed: true } : { ...poll, answers: { ...poll.answers, [`${tenant.id}:${state.profileId}`]: action.option } };
      return { ...state, message: action.type === 'poll-close' ? 'Anketa je zatvorena u demou.' : 'Odgovor je sačuvan u demou.', tenants: { ...state.tenants, [tenant.id]: { ...tenant, polls: tenant.polls.map(item => item.id === poll.id ? updated : item) } } };
    }
    case 'work-status': {
      const tenant = state.tenants[state.tenantId];
      const work = tenant.works.find(item => item.id === action.workId);
      if (!demoPermissions(state.profileId).canManageWorks || !work || work.status === action.status || !['Priprema', 'U toku', 'Završeno'].includes(action.status)) return state;
      return { ...state, message: `Status rada u demou: ${action.status}.`, tenants: {
        ...state.tenants, [tenant.id]: { ...tenant, works: tenant.works.map(item => item.id === work.id
          ? { ...item, status: action.status, statusHistory: [...item.statusHistory, { from: item.status, to: action.status }] } : item) },
      } };
    }
    case 'finance-draft':
      return demoPermissions(state.profileId).canWriteFinances
        ? { ...state, financeDraft: action.draft, message: '' } : state;
    case 'finance-save': {
      const draft = state.financeDraft;
      const tenant = state.tenants[state.tenantId];
      if (!demoPermissions(state.profileId).canWriteFinances || !draft || Object.keys(validateFinanceDraft(draft, tenant)).length) return state;
      if (draft.kind === 'assessment') {
        const rows = assessmentPreview(tenant, draft);
        const additions = rows.filter(row => !row.existing).map(row => ({
          id: `${tenant.id}:${row.id}:${draft.month}`, unitId: row.id,
          month: draft.month, dueDate: draft.dueDate, amountCents: row.amountCents, rateCents: parseCents(draft.amount)!,
        }));
        return { ...state, financeDraft: null,
          message: additions.length ? 'Mjesečni obračun je primijenjen u demou.' : 'Obračun već postoji. Nije dodato novo zaduženje.',
          tenants: { ...state.tenants, [tenant.id]: { ...tenant, assessments: [...tenant.assessments, ...additions] } } };
      }
      const entry = {
        id: `${tenant.id}-stavka-${tenant.entries.length + 1}`, kind: draft.kind,
        date: draft.date, amountCents: parseCents(draft.amount)!,
        description: draft.description.trim(), category: draft.kind === 'payment' ? 'Uplate održavanja' : draft.category,
        unitId: draft.kind === 'payment' ? draft.unitId : undefined,
        workId: draft.kind === 'expense' ? draft.workId || undefined : undefined,
        attachment: draft.attachment, author: 'Operater evidencije — demo',
      };
      return { ...state, financeDraft: null,
        message: draft.kind === 'expense' ? 'Trošak je dodat u demo.' : 'Uplata je evidentirana u demou.',
        tenants: { ...state.tenants, [tenant.id]: { ...tenant, entries: [...tenant.entries, entry] } } };
    }
    case 'context':
      return { ...state, tenantId: action.tenantId, profileId: action.profileId, draftNote: null, financeDraft: null, communityDraft: null, message: 'Demo kontekst je promijenjen.' };
    case 'draft-note':
      return demoPermissions(state.profileId).canEditNote
        ? { ...state, draftNote: action.value.slice(0, 200), message: '' } : state;
    case 'discard-note':
      return { ...state, draftNote: null, message: 'Nepotvrđeni unos je odbačen.' };
    case 'save-note': {
      if (!demoPermissions(state.profileId).canEditNote || state.draftNote === null) return state;
      const tenant = state.tenants[state.tenantId];
      return {
        ...state, draftNote: null, message: 'Radna bilješka je sačuvana samo u memoriji demoa.',
        tenants: { ...state.tenants, [state.tenantId]: { ...tenant, note: state.draftNote.trim() } },
      };
    }
    case 'reset':
      return { ...createDemoState(action.startedAt), message: 'Oba demo ZEV-a vraćena su na početne podatke. Aktivan je Javor / Vlasnik.' };
  }
}
