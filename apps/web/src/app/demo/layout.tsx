import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { connection } from 'next/server';
import { DemoProvider } from '@/features/demo/demo-provider';
import { DemoFrame } from '@/features/demo/demo-frame';

export const metadata: Metadata = { title: 'Demo okruženje' };

export default async function DemoLayout({ children }: { children: ReactNode }) {
  // Supply a stable hydration seed with a relative poll deadline for each request.
  await connection();
  return (
    <DemoProvider startedAt={new Date().toISOString()}>
      <DemoFrame>{children}</DemoFrame>
    </DemoProvider>
  );
}
