import type { ReactNode } from 'react';

export function PageHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="max-w-2xl space-y-4">
      <p className="text-sm font-semibold tracking-wide text-accent">{eyebrow}</p>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      {children && <p className="text-lg leading-relaxed text-muted">{children}</p>}
    </div>
  );
}
