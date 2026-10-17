import { assessmentPreview, validateFinanceDraft, parseCents, type FinanceDraft } from './finance';
import { createDemoState } from './fixtures';
import type { DemoState, ProfileId, TenantId } from './model';
import { demoPermissions } from './selectors';

export type DemoAction =
  | { type: 'finance-draft'; draft: FinanceDraft | null }
  | { type: 'finance-save' }
  | { type: 'context'; tenantId: TenantId; profileId: ProfileId }
  | { type: 'draft-note'; value: string }
  | { type: 'save-note' }
  | { type: 'discard-note' }
  | { type: 'reset'; startedAt: string };

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
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
      return { ...state, tenantId: action.tenantId, profileId: action.profileId, draftNote: null, financeDraft: null, message: 'Demo kontekst je promijenjen.' };
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
