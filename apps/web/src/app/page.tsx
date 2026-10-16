import { LinkButton } from '@/components/ui/button';
import { Notice } from '@/components/ui/notice';
import { PageHeading } from '@/components/ui/page-heading';

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-5xl flex-col px-4 sm:px-8">
      <header className="flex min-h-24 flex-wrap items-center justify-between gap-4 border-b border-line py-5">
        <span className="text-xl font-semibold tracking-tight">ZEV<span className="text-accent">.</span></span>
        <span className="text-sm text-muted">Zajednica etažnih vlasnika</span>
      </header>
      <main id="sadrzaj" tabIndex={-1} className="flex-1 space-y-8 py-12 sm:py-20">
        <PageHeading eyebrow="Web demo u pripremi" title="Jasan pregled života vaše zgrade.">
          Novac, radovi i obavještenja na jednom mjestu, sa informacijama koje je lako razumjeti.
        </PageHeading>
        <Notice>Interaktivni demo još nije dostupan. Trenutno je pripremljena web osnova za naredne korake.</Notice>
        <LinkButton href="/ui">Pregled osnovnih komponenti <span aria-hidden="true">→</span></LinkButton>
      </main>
      <footer className="border-t border-line py-6 text-sm text-muted">ZEV · Transparentno upravljanje zajednicom</footer>
    </div>
  );
}
