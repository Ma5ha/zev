import type { Metadata } from 'next';
import { LinkButton } from '@/components/ui/button';
import { Notice } from '@/components/ui/notice';
import { PageHeading } from '@/components/ui/page-heading';
import { ComponentExample } from './component-example';

export const metadata: Metadata = { title: 'Osnovne komponente' };

export default function ComponentsPage() {
  return (
    <main id="sadrzaj" tabIndex={-1} className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-8 sm:py-16">
      <LinkButton href="/" variant="secondary">← Početna stranica</LinkButton>
      <PageHeading eyebrow="UI osnova · DEV-02-B" title="Osnovne komponente">
        Radni pregled dugmadi, polja i poruka za provjeru izgleda i pristupačnosti.
      </PageHeading>
      <section aria-labelledby="unos-naslov" className="space-y-6 rounded-xl border border-line bg-surface p-5 sm:p-8">
        <h2 id="unos-naslov" className="text-xl font-semibold">Polje i potvrda radnje</h2>
        <ComponentExample />
      </section>
      <section aria-labelledby="poruke-naslov" className="space-y-4">
        <h2 id="poruke-naslov" className="text-xl font-semibold">Poruke i statusi</h2>
        <Notice>Informacija: ovaj prikaz služi pregledu komponenti.</Notice>
        <Notice tone="success">Uspjeh: primjer jasno označene potvrde.</Notice>
        <Notice tone="warning">Napomena: uneseni primjer se ne čuva nakon osvježavanja.</Notice>
      </section>
    </main>
  );
}
