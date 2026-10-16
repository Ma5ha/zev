# Prihvaćeni tehnološki stack — ZEV

Datum odluke: 16. oktobar 2026.

Status: korisnik je prihvatio predloženi stack uz izbor **Nx-a umjesto Turborepo-a**. Ovaj dokument evidentira izbor tehnologija; ne pokreće izradu aplikacije.

## Tehnologije

| Oblast | Izbor | Namjena |
|---|---|---|
| Monorepo | **Nx** | Organizacija više aplikacija i zajedničkih biblioteka, izvršavanje zadataka i pravila zavisnosti |
| Upravljanje paketima | **pnpm workspaces** | Zavisnosti i povezivanje lokalnih paketa u jednom repozitorijumu |
| Jezik | **TypeScript** | Web, mobilna aplikacija i zajednički kod |
| Web aplikacija | **Next.js + React** | Portal stanara i predsjednika ZEV-a, prilagođen računaru i telefonu |
| Web stilovi | **Tailwind CSS** | Stilizacija web interfejsa |
| Mobilna aplikacija | **React Native + Expo** | Android i iOS aplikacija |
| Backend usluge | **Supabase** | Baza, autentifikacija i čuvanje dokumenata |
| Baza podataka | **PostgreSQL** u Supabase-u | Zgrade, stanovi, članstva, transakcije, radovi, ponude, objave i ankete |
| Prijava korisnika | **Supabase Auth** | Identitet i korisničke sesije; članstva i ovlašćenja modeluju se posebno |
| Dokumenti i fotografije | **Supabase Storage** | Računi, ponude, fotografije kvarova i prilozi sa kontrolisanim pristupom |
| Kontrola pristupa | **PostgreSQL RLS i serverske provjere** | Pristup prema članstvu u zgradi i ulozi korisnika |
| Dodatni HTTP API | **Next.js Route Handlers** | Zajedničke serverske operacije za web i mobilnu aplikaciju |

## Organizacija aplikacija i zajedničkog koda

Nx i pnpm osnova je inicijalizovana u glavnom folderu repozitorijuma. Nx je zaključan na 23.3.0, pnpm na 10.34.7, a `.nvmrc` navodi korišćeni Node.js 22.22.1. `apps/` i `libs/` postoje kao prazni folderi; aplikacije i biblioteke još nisu generisane. Ostali paketi iz stacka dodaju se kada bude odobrena izrada odgovarajućih dijelova.

Predložena ciljna struktura:

```text
apps/
  web/                 # portal stanara i predsjednika
  mobile/              # Expo aplikacija, u kasnijoj fazi
  website/             # budući prodajni sajt
  admin/               # buduća administracija poslovanja platforme

libs/
  domain/              # zajednička poslovna pravila i obračuni
  contracts/           # tipovi i validacija ulaznih/izlaznih podataka
  api-client/          # zajednički pristup backendu
  config/              # razvojna podešavanja

supabase/
  migrations/          # verzionisane promjene baze i pravila pristupa

docs/
AGENTS.md
```

Za pilot se kreiraju samo potrebne aplikacije i biblioteke. Web i mobilna aplikacija dijele poslovna pravila, tipove i pristup API-ju. Njihovi ekrani i UI komponente mogu biti odvojeni i prilagođeni platformi. Serverski kod i tajne ne smiju se izvoziti kroz biblioteke dostupne klijentima.

## Pristup backendu

- Supabase pokriva prijavu, PostgreSQL bazu i skladištenje dokumenata.
- Next.js Route Handlers pokrivaju složenije operacije koje koriste i web i mobilna aplikacija.
- Finansijske promjene moraju se provjeravati i izvršavati na serveru odnosno u baznim transakcijama; klijentska validacija služi korisničkom iskustvu.
- Serverska poslovna pravila ostaju odvojena od web ekrana kako bi ih kasnije koristila mobilna aplikacija.
- Članstvo i uloga vezuju se za konkretnu zgradu. Jedan korisnik može imati različite uloge u različitim zgradama.
- Izolacija podataka zgrada ugrađuje se od početka, iako pilot obuhvata samo jednu zgradu.
- Finansijski iznosi čuvaju se u cijelim feningima ili preciznom decimalnom tipu, uz istoriju izmjena i dokumentovane ispravke.
- Dokumenti zahtijevaju zasebna pravila pristupa, a ne samo provjeru prijave korisnika.

## Redoslijed i preostale odluke

Početni prijedlog ostaje web aplikacija sa PWA mogućnostima, pa zasebna Expo aplikacija nakon provjere osnovnih tokova u pilotu. Tačan raspored razvoja weba i mobilne aplikacije treba potvrditi prije implementacije.

Verzije framework paketa, konkretna PWA implementacija, biblioteka za validaciju, alati za testiranje, hosting web aplikacije, region baze i operativni plan rezervnih kopija još nisu izabrani. Pri dodavanju Next.js-a i Expo-a provjeriti njihove kompatibilne verzije sa Nx-om. Ne uvoditi dodatne tehnologije kao prihvaćene odluke bez dogovora ili jasnog obrazloženja u evidenciji.

## Zvanična dokumentacija

- [Nx — kontrola zavisnosti modula](https://nx.dev/docs/features/enforce-module-boundaries)
- [pnpm workspaces](https://pnpm.io/workspaces)
- [Next.js Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers)
- [Expo — monorepo projekti](https://docs.expo.dev/guides/monorepos/)
- [Supabase — zaštita podataka](https://supabase.com/docs/guides/database/secure-data)
- [Supabase — kontrola pristupa dokumentima](https://supabase.com/docs/guides/storage/security/access-control)
