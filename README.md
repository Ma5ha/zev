# ZEV

Nx monorepo za web i buduću mobilnu aplikaciju za zajednice etažnih vlasnika.

## Trenutni obim

DEV-02-B postavlja Next.js web osnovu u `apps/web`: TypeScript, Tailwind CSS, zajedničke UI tokene i početne komponente. `/` je privremena početna stranica, a `/ui` razvojni pregled dugmadi, tekstualnog polja, validacije i poruka. Interaktivni ZEV demo, landing i poslovni moduli dolaze kroz DEV-02-C–DEV-02-I.

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

Nx dodatke `@nx/*` držati na istoj verziji kao paket `nx` (23.3.0). Postavljeni su Next.js 16.4.2, React 19.3.1 i Tailwind 4.3.3; tačno instalirane verzije ostalih zavisnosti vodi lockfile. Sljedeći razvojni korak je DEV-02-C: sintetički podaci, demo kontekst i stanje.

## Dokumentacija

- [Glavne upute agentima](AGENTS.md)
- [Minimalni plan](docs/minimalni-plan.md)
- [Razvojni plan](docs/razvojni-plan.md)
- [Specifikacija demoa](docs/demo-specifikacija.md)
- [UI dizajn skill](skills/zev-ui-design/SKILL.md) i [UI smjernice](skills/zev-ui-design/references/guidelines.md)
- [Prihvaćeni stack](docs/stack.md)
- [Napredak](docs/napredak.md)
- [Istraživanje ZEV RS](docs/istrazivanje-zev-rs.md)
