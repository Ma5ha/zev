import Link from 'next/link';
import type { ReactNode } from 'react';
export function AccessFrame({ title, children }: { title: string; children: ReactNode }) {
  return <main id="sadrzaj" className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-8">
    <Link href="/" className="font-semibold text-accent">ZEV · Početna</Link>
    <h1 className="text-3xl font-semibold">{title}</h1>{children}
  </main>;
}
