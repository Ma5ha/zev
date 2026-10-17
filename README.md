# ZEV

Nx monorepo za web i buduću mobilnu aplikaciju za zajednice etažnih vlasnika.

## Trenutni obim

Next.js web demo u `apps/web` koristi TypeScript, Tailwind CSS i zajedničke UI tokene. `/` je javni landing, `/demo` pregled zgrade, a responzivna navigacija vodi na Finansije, Radove, Oglasnu tablu i Ankete i prijave. `/demo/prava` objašnjava tri demo profila, dok `/ui` ostaje razvojni pregled osnovnih komponenti. DEV-02-D dodaje landing, navigaciju i početne prikaze; DEV-02-E dodaje lokalni finansijski demo. DEV-02-F dodaje detalje radova, poređenje ponuda, status i povezane isplate. Unosi G još nisu dostupni.

Za pokretanje nisu potrebni `.env`, backend ključevi, Supabase projekat ili baza. Mobilna aplikacija još nije generisana. Nema stvarne prijave, trajne pohrane ili objavljivanja.

## Pokretanje

Koristi Node.js iz `.nvmrc` i Corepack koji je dostupan uz trenutno korišćeni Node 22.

```sh
nvm use
corepack pnpm install --frozen-lockfile
corepack pnpm report
corepack pnpm projects
corepack pnpm dev
```

`packageManager` zaključava pnpm na 10.34.7, a `pnpm-lock.yaml` zaključava zavisnosti. Ako je pnpm već omogućen kroz Corepack, umjesto `corepack pnpm` može se koristiti `pnpm`.

```sh
corepack pnpm nx --version
corepack pnpm graph
```

`dev` pokreće `web` na [localhost:3000](http://localhost:3000). Za provjereno lokalno vezivanje samo na ovaj računar:

```sh
corepack pnpm nx dev web --hostname=127.0.0.1 --port=3000
```

Pregled komponenti je na [localhost:3000/ui](http://localhost:3000/ui). Prazna potvrda prikazuje grešku i fokusira polje; unos i potvrda daju lokalnu poruku; „Poništi unos“ prazni polje. Osvježavanje vraća početno stanje. Ovaj primjer nije prijava problema niti finansijski upis.

## Demo podaci i memorija

Na [localhost:3000/demo](http://localhost:3000/demo) početni kontekst je Javor / Vlasnik. Izbor ZEV-a i profila mijenja prikazane podatke; „Demo prava“ opisuje privremene dozvole. Operater može sačuvati radnu bilješku zasebno za svaki demo ZEV. To je provjera stanja, bez objavljivanja obavještenja.

Sačuvane bilješke ostaju pri promjeni ZEV-a i navigaciji kroz demo. Nepotvrđen unos pri promjeni konteksta traži potvrdu odbacivanja. Reset vraća oba ZEV-a i početni profil; osvježavanje ili izlazak i ponovni ulaz takođe započinju početno stanje. Nema localStorage-a, baze ili API-ja. „Demo prava“ su simulacija prikaza nad sintetičkim podacima, a ne kontrola pristupa stvarnim podacima.

`src/features/demo` odvaja tipove, sintetičke podatke, čisti reducer i selektore od React stanja i prikaza. Podaci ankete dobijaju rok sedam dana od početnog zahtjeva/reset radnje; rok se ne pomjera kroz navigaciju iste sesije.

## Finansijski demo — DEV-02-E

Na `/demo/finansije` operater može unijeti trošak, uplatu i mjesečni obračun. Unos prvo pregledati, zatim potvrditi. Obrasci podržavaju datum, iznos u KM, svrhu/kategoriju ili jedinicu i opcioni lokalni PDF/sliku do 5 MB. Prilozi žive u memoriji; nema uploada. Filteri zajedničkog prometa su u URL-u, uz povrat sa detalja.

Ručni scenario: Javor / Operater → obračun oktobra 2026. po 0,50 KM/m², rok 15. oktobar → uplata A 40 KM → uplata B 25 KM → trošak 120 KM. Rezultat: sredstva 945 KM, dug A 10 KM, avans B 5 KM. Ponovljeni obračun ne dodaje zaduženja. Vlasnik vidi samo A, a korisnik prostora nema kartice. Zajednički prikaz uplate skriva privatnu napomenu, jedinicu i prilog; dozvoljena kartica ih prikazuje.

Reset i osvježavanje vraćaju početne finansije. Napuštanje nepotvrđenog obrasca kroz veze u aplikaciji, promjena konteksta i reset traže potvrdu. Browser istorija može zadržati nepotvrđeni nacrt u demo kontekstu; nije zamjena za trajno čuvanje. Raspored je demo pretpostavka: najstarije obaveze prvo, neiskorišćen avans pokriva kasnija zaduženja. Ovo nije stvarno knjiženje ili potvrda stanja banke.

## Provjere i produkciono pokretanje

```sh
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm build
corepack pnpm start
```

`typecheck` prvo generiše Next.js tipove ruta, zatim izvršava TypeScript bez emitovanja aplikacionog koda, pa radi i prije prvog builda. `start` pokreće lokalni produkcioni server; ne objavljuje aplikaciju. Zaustavljanje servera: Ctrl+C. Tokom provjere produkcionog builda zaustaviti razvojni server istog projekta jer oba koriste `.next` folder.

Nema generisanih testova ili testnog frameworka. Nx generator podrazumijevano ima isključene unit i E2E testove; to pravilo primijeniti i pri budućem generisanju. `projects` prikazuje `web` i korijenski projekat; `graph` prikazuje zavisnosti. Nx Cloud nije povezan.

Ako izolovano okruženje odbije Nx lokalne sockete ili postojeće pnpm skladište izvan projekta, potrebno je odobrenje za odgovarajuću komandu. Ne mijenjati globalna podešavanja računara ili skladište kao dio običnog pokretanja.

## Organizacija

```text
apps/web/             # Next.js App Router, početna stranica i UI osnova
  src/app/            # rute, layout i Tailwind tokeni
  src/components/ui/  # dugmad/linkovi, polje, poruka i naslov
libs/                 # zajedničke biblioteke
docs/                 # plan, stack, istraživanje i napredak
nx.json               # Nx podešavanja
pnpm-workspace.yaml   # aplikacije i paketi obuhvaćeni workspace-om
```

Nx dodatke `@nx/*` držati na istoj verziji kao paket `nx` (23.3.0). Postavljeni su Next.js 16.4.2, React 19.3.1 i Tailwind 4.3.3; tačno instalirane verzije ostalih zavisnosti vodi lockfile. Sljedeći razvojni korak je DEV-02-G: obavještenja, prijave i ankete, nakon korisnikove instrukcije.

## Dokumentacija

- [Glavne upute agentima](AGENTS.md)
- [Minimalni plan](docs/minimalni-plan.md)
- [Razvojni plan](docs/razvojni-plan.md)
- [Specifikacija demoa](docs/demo-specifikacija.md)
- [UI dizajn skill](skills/zev-ui-design/SKILL.md) i [UI smjernice](skills/zev-ui-design/references/guidelines.md)
- [Prihvaćeni stack](docs/stack.md)
- [Napredak](docs/napredak.md)
- [Istraživanje ZEV RS](docs/istrazivanje-zev-rs.md)
