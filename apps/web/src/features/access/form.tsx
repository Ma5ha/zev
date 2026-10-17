'use client';
import { useActionState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
export type FormState = { error?: string; success?: string };
export function AccessForm({ action, children, submit = 'Sačuvaj', initialState = {} }: {
  action: (state: FormState, data: FormData) => Promise<FormState>;
  children: ReactNode; submit?: string; initialState?: FormState;
}) {
  const [state, formAction, pending] = useActionState(async (state: FormState, data: FormData) => {
    try { return await action(state, data); }
    catch (error) {
      if (error && typeof error === 'object' && 'digest' in error && String(error.digest).startsWith('NEXT_REDIRECT')) throw error;
      return { error: 'Zahtjev nije potvrđen. Provjerite vezu i osvježite podatke prije ponavljanja.' };
    }
  }, initialState);
  return <form action={formAction} className="space-y-4">
    {children}
    {state.error && <p role="alert" className="text-danger">{state.error}</p>}
    {state.success && <p role="status" className="text-success">{state.success}</p>}
    <Button type="submit" disabled={pending}>{pending ? 'Obrada…' : submit}</Button>
  </form>;
}
