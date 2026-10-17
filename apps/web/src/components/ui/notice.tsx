import type { ReactNode } from 'react';

export function Notice({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'success' | 'warning' }) {
  const color = { neutral: 'border-control bg-funds-surface text-muted', success: 'border-success text-success', warning: 'border-warning text-warning' }[tone];
  return <p className={`rounded-xl border-l-4 px-4 py-3 text-sm leading-relaxed ${color}`}>{children}</p>;
}
