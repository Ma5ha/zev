import { cardSummary, currentFunds, publicEntry } from './finance';
import type { DemoState, ProfileId } from './model';

export function demoPermissions(profileId: ProfileId) {
  const isOperator = profileId === 'operator';
  return {
    canWriteFinances: isOperator,
    canManageWorks: isOperator,
    canPublish: isOperator,
    canManagePolls: isOperator,
    canManageIssues: isOperator,
    canEditNote: isOperator,
    cards: isOperator ? 'all' as const : profileId === 'owner' ? 'own' as const : 'none' as const,
  };
}

// Every consumer receives only the active tenant and profile's display data.
// This is a presentation boundary for synthetic data, not authorization.
export function selectDemoView(state: DemoState) {
  const tenant = state.tenants[state.tenantId];
  const permissions = demoPermissions(state.profileId);
  const membershipId = `${state.tenantId}:${state.profileId}`;
  return {
    tenantId: tenant.id,
    tenantName: tenant.name,
    profileId: state.profileId,
    openingFundsCents: tenant.openingFundsCents,
    fundsCents: currentFunds(tenant),
    entries: tenant.entries.map(entry => publicEntry(entry, permissions.canWriteFinances)),
    financeTenant: permissions.canWriteFinances ? tenant : null,
    reconciledOn: tenant.reconciledOn,
    cards: tenant.units.filter(unit => permissions.cards === 'all' || (permissions.cards === 'own' && unit.id === tenant.ownerUnitId)).map(unit => cardSummary(tenant, unit)),
    works: tenant.works,
    announcements: tenant.announcements,
    issues: tenant.issues.filter(issue => permissions.canManageIssues || issue.authorMembershipId === membershipId),
    polls: tenant.polls,
    note: permissions.canEditNote ? tenant.note : null,
    permissions,
  };
}

export function hasUnsavedNote(state: DemoState) {
  return state.draftNote !== null && state.draftNote !== state.tenants[state.tenantId].note;
}

export function hasDemoChanges(state: DemoState) {
  return hasUnsavedNote(state) || state.financeDraft !== null || Object.values(state.tenants).some(tenant => tenant.note !== '' || tenant.entries.length > 0 || tenant.assessments.length > 0);
}

export function formatDemoMoney(cents: number) {
  return `${new Intl.NumberFormat('sr-Latn-BA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(cents / 100)} KM`;
}
