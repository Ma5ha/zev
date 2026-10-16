# ZEV

Nx monorepo za buduću web i mobilnu aplikaciju za zajednice etažnih vlasnika.

## Trenutni obim

Postavljena je monorepo osnova. Aplikacije još nisu generisane. Prihvaćeni stack je Nx, pnpm, TypeScript, Next.js/React, Tailwind CSS, React Native/Expo i Supabase/PostgreSQL. Framework paketi dodaju se pri kreiranju odgovarajuće aplikacije.

## Pokretanje

Koristi Node.js iz `.nvmrc` i Corepack koji je dostupan uz trenutno korišćeni Node 22.

```sh
nvm use
corepack pnpm install --frozen-lockfile
corepack pnpm report
corepack pnpm projects
```

`packageManager` zaključava pnpm na 10.34.7, a `pnpm-lock.yaml` zaključava zavisnosti. Ako je pnpm već omogućen kroz Corepack, umjesto `corepack pnpm` može se koristiti `pnpm`.

```sh
corepack pnpm nx --version
corepack pnpm graph
```

Nx je alat za upravljanje projektima i zadacima. Trenutno nema aplikacije ni razvojnog servera za pokretanje; `projects` prikazuje samo korijenski projekat `@zev/workspace`, bez izvršnih targeta. Komanda `graph` otvara prikaz zavisnosti projekata. Nx Cloud nije povezan.

## Organizacija

```text
apps/                 # buduće aplikacije: web, mobile i druge po potrebi
libs/                 # zajedničke biblioteke
docs/                 # plan, stack, istraživanje i napredak
nx.json               # Nx podešavanja
pnpm-workspace.yaml   # aplikacije i paketi obuhvaćeni workspace-om
```

Nx dodatke `@nx/*` držati na istoj verziji kao paket `nx`. Sledeći tehnički korak je dodavanje Next.js aplikacije u `apps/web`, kada korisnik to zatraži.

## Dokumentacija

- [Glavne upute agentima](AGENTS.md)
- [Minimalni plan](docs/minimalni-plan.md)
- [Prihvaćeni stack](docs/stack.md)
- [Napredak](docs/napredak.md)
- [Istraživanje ZEV RS](docs/istrazivanje-zev-rs.md)
