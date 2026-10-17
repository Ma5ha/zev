import type { Metadata } from 'next';
import { Button, LinkButton } from '@/components/ui/button';
import { Notice } from '@/components/ui/notice';
import { PageHeading } from '@/components/ui/page-heading';
import { ComponentExample } from './component-example';

export const metadata: Metadata = { title: 'Osnovne komponente' };

export default function ComponentsPage() {
  return (
    <main id="sadrzaj" tabIndex={-1} className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-8 sm:py-16">
      <LinkButton href="/" variant="secondary">← Početna stranica</LinkButton>
      <PageHeading eyebrow="UI revizija · DEV-02-K-B" title="Osnovne komponente">
        Radni pregled dugmadi, polja i poruka za provjeru izgleda i pristupačnosti.
      </PageHeading>
      <section aria-labelledby="unos-naslov" className="demo-section space-y-6 p-4 sm:p-6">
        <h2 id="unos-naslov" className="text-xl font-semibold">Polje i potvrda radnje</h2>
        <ComponentExample />
      </section>
      <section aria-labelledby="povrsine-naslov" className="demo-section space-y-6 p-4 sm:p-6">
        <h2 id="povrsine-naslov" className="text-xl font-semibold">Slate and Sand površine</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-funds-surface p-6"><p>Sredstva · primjer</p><p className="money-display mt-2">1.000,00 KM</p></div>
          <div className="rounded-2xl bg-balance-surface p-6"><p>Početni dug · primjer</p><p className="money-display mt-2">20,00 KM</p></div>
        </div>
        <div className="flex flex-wrap gap-3"><Button>Primarna radnja</Button><Button variant="secondary">Sekundarna radnja</Button><Button disabled>Nedostupna radnja</Button></div>
        <div className="demo-sidebar rounded-2xl p-6"><p className="mb-4">Navigacija · primjer</p><LinkButton href="/demo" className="bg-sidebar-active text-white hover:bg-accent-hover">Otvori demo</LinkButton></div>
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
