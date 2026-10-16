import { createDemoState } from './fixtures';
import type { DemoState, ProfileId, TenantId } from './model';
import { demoPermissions } from './selectors';

export type DemoAction =
  | { type: 'context'; tenantId: TenantId; profileId: ProfileId }
  | { type: 'draft-note'; value: string }
  | { type: 'save-note' }
  | { type: 'discard-note' }
  | { type: 'reset'; startedAt: string };

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'context':
      return { ...state, tenantId: action.tenantId, profileId: action.profileId, draftNote: null, message: 'Demo kontekst je promijenjen.' };
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
