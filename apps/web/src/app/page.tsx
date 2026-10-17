import Link from 'next/link';
import Image from 'next/image';
import { LinkButton } from '@/components/ui/button';
import { Notice } from '@/components/ui/notice';

const features = [
  ['01', 'Pregled zgrade', 'Najvažnije informacije o novcu, radovima i dešavanjima na jednom mjestu.'],
  ['02', 'Finansije', 'Zajednički prihodi i troškovi, uz odvojen pristup sopstvenoj kartici.'],
  ['03', 'Radovi i ponude', 'Pratite posao i uporedite ponude, ugovoreni iznos i isplate.'],
  ['04', 'Oglasna tabla', 'Obavještenja o sastancima, održavanju i svakodnevnom životu zgrade.'],
  ['05', 'Ankete i prijave', 'Podijelite mišljenje kroz informativne ankete i prijavite problem.'],
];

export default function HomePage() {
  return <div className="mx-auto max-w-6xl px-4 sm:px-8">
    <header className="flex min-h-24 flex-wrap items-center justify-between gap-4 border-b border-line py-5">
      <span className="text-2xl font-semibold tracking-tight">ZEV<span className="text-accent">.</span></span>
      <nav aria-label="Javna navigacija" className="flex flex-wrap items-center gap-5"><Link href="#mogucnosti" className="inline-flex min-h-11 items-center font-semibold text-muted hover:underline">Mogućnosti</Link><LinkButton href="/prijava" variant="secondary">Prijava</LinkButton><LinkButton href="/demo">Pogledaj demo</LinkButton></nav>
    </header>
    <main id="sadrzaj" tabIndex={-1}>
      <section className="grid grid-cols-1 items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.25fr_1fr]">
        <div className="space-y-6"><p className="text-sm font-semibold text-accent">Za zajednice etažnih vlasnika</p><h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Zajedno za<br />ljepše dvorište.</h1><p className="max-w-xl text-lg leading-relaxed text-muted">Pratite zajednički novac, radove i obavještenja. Jednostavan pregled za stanare i lakša evidencija za ljude koji brinu o zgradi.</p><LinkButton href="/demo">Pogledaj demo <span aria-hidden="true">→</span></LinkButton><p className="text-sm text-muted">Bez registracije · Izmišljeni podaci · Privremene izmjene</p></div>
        <Image src="/images/courtyard.webp" alt="" width={1200} height={800} priority className="courtyard-image" />
      </section>
      <section id="mogucnosti" aria-labelledby="mogucnosti-naslov" className="border-t border-line py-12 sm:py-16"><p className="text-sm font-semibold text-accent">Pet povezanih cjelina</p><h2 id="mogucnosti-naslov" className="mt-3 text-3xl font-semibold tracking-tight">Manje traženja. Više preglednosti.</h2><div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">{features.map(([number, title, body]) => <article key={number} className="border-t border-line pt-5"><p aria-hidden="true" className="text-sm font-semibold text-accent">{number}</p><h3 className="mt-3 text-xl font-semibold">{title}</h3><p className="mt-3 leading-relaxed text-muted">{body}</p></article>)}</div></section>
      <section aria-labelledby="demo-naslov" className="space-y-5 border-t border-line py-12 sm:py-16"><h2 id="demo-naslov" className="text-3xl font-semibold">Upoznajte ZEV kroz demo.</h2><p className="max-w-2xl leading-relaxed text-muted">Isprobajte povezane preglede, izbor ZEV-a i profila, finansije, radove i ponude, objave, prijave problema i informativne ankete.</p><Notice>Demo koristi izmišljene podatke. Izmjene su privremene i nestaju nakon osvježavanja. Lokalni portal sa prijavom i članstvima dostupan je odvojeno od demoa.</Notice><LinkButton href="/demo">Pogledaj demo</LinkButton></section>
    </main>
    <footer className="flex flex-wrap justify-between gap-3 border-t border-line py-6 text-sm text-muted"><span>ZEV · Transparentno upravljanje zajednicom</span><span>Web demo u razvoju</span></footer>
  </div>;
}
