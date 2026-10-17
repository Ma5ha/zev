'use client';

import { createContext, useContext, useReducer, type ReactNode } from 'react';
import { createDemoState } from './fixtures';
import { demoReducer } from './reducer';
import { hasDemoChanges, hasUnsavedNote, selectDemoView } from './selectors';

function useDemoState(startedAt: string) {
  const [state, dispatch] = useReducer(demoReducer, startedAt, createDemoState);
  const view = selectDemoView(state);
  return {
    view, dispatch,
    financeDraft: state.financeDraft,
    hasUnsavedNote: hasUnsavedNote(state),
    draftNote: state.draftNote ?? view.note ?? '',
    hasUnsavedChanges: hasUnsavedNote(state) || state.financeDraft !== null,
    hasChanges: hasDemoChanges(state),
    message: state.message,
  };
}

const DemoContext = createContext<ReturnType<typeof useDemoState> | null>(null);

export function DemoProvider({ startedAt, children }: { startedAt: string; children: ReactNode }) {
  const value = useDemoState(startedAt);
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error('Demo context requires DemoProvider.');
  return context;
}
