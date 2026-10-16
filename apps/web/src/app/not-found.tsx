import { LinkButton } from '@/components/ui/button';
import { PageHeading } from '@/components/ui/page-heading';

export default function NotFound() {
  return (
    <main id="sadrzaj" tabIndex={-1} className="mx-auto max-w-3xl space-y-8 px-4 py-16 sm:px-8">
      <PageHeading eyebrow="Stranica nije pronađena" title="Ova stranica nije dostupna.">
        Provjeri adresu ili se vrati na početnu stranicu.
      </PageHeading>
      <LinkButton href="/">Vrati se na početnu</LinkButton>
    </main>
  );
}
