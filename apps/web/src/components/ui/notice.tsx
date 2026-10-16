import type { ReactNode } from 'react';

export function Notice({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'success' | 'warning' }) {
  const color = { neutral: 'border-control text-muted', success: 'border-success text-success', warning: 'border-warning text-warning' }[tone];
  return <p className={`rounded-lg border-l-4 bg-surface px-4 py-3 text-sm leading-relaxed ${color}`}>{children}</p>;
}
