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

Nx i pnpm osnova je inicijalizovana u glavnom folderu repozitorijuma. Nx je zaključan na 23.3.0, pnpm na 10.34.7, a `.nvmrc` navodi korišćeni Node.js 22.22.1. U DEV-02-B generisan je `apps/web` sa Next.js 16.4.2, Reactom 19.3.1, Tailwindom 4.3.3, TypeScriptom 6.0.3 i ESLint konfiguracijom. Web ima početni placeholder, razvojni pregled UI komponenti i osnovu demo konteksta iz DEV-02-C (dva sintetička ZEV-a, tri profila, podaci i stanje u memoriji). Poslovni unosi i puni moduli još nisu izrađeni. `libs/` još sadrži samo `.gitkeep`; Expo i Supabase nisu inicijalizovani. Ostali paketi dodaju se kada budu potrebni odgovarajućoj fazi.

Predložena ciljna struktura:

```text
apps/
  web/                 # javni landing i aplikacija ZEV-a
  mobile/              # Expo aplikacija, u kasnijoj fazi
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

## Demo prije backenda

DEV-02 koristi Next.js/React sa lokalnim sintetičkim podacima i stanjem u memoriji. Za pokretanje nisu potrebni baza, Supabase projekat, Auth, Storage, migracije ili backend ključevi. Izmjene su privremene, uz reset; osvježavanje vraća početno stanje. Demo pristup podacima odvojen je od prikaza radi kasnijeg povezivanja.

Supabase ostaje prihvaćeni backend za naredne faze. Njegova inicijalizacija počinje tek u DEV-03, nakon korisnikovog pregleda demoa, instrukcije za backend i razrješenja zavisnih odluka. Simulacija uloga i tenant prikaza ne predstavlja autentifikaciju ili RLS.

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

Korisnik je potvrdio prvo web primjer sa landing stranicom i aplikacijom iza nje, zatim posebne mobilne aplikacije kroz Expo. PWA instalacija nije uslov prve verzije. Za početak se predlaže jedan `apps/web` projekat sa odvojenim javnim, demo i internim rutama.

Potvrđeni su tenant pristup i uloge prema pravilima ZEV-a. Radna granica tenanta je jedan ZEV. Identitet korisnika, tenant članstvo, funkcija u zajednici i dozvole aplikacije vode se odvojeno. Svi poslovni podaci, prilozi, istorija, serverske provjere i keš moraju poštovati tenant granicu i prava nad konkretnim podatkom. URL ili klijentski tenant ID nisu dokaz ovlašćenja. Konkretna šema i matrica dozvola razrađuju se u DEV-03.

Verzije framework paketa, biblioteka za validaciju, alati za testiranje, hosting web aplikacije, region baze i operativni plan rezervnih kopija još nisu izabrani. Pri dodavanju Next.js-a i Expo-a provjeriti njihove kompatibilne verzije sa Nx-om. Ne uvoditi dodatne tehnologije kao prihvaćene odluke bez dogovora ili jasnog obrazloženja u evidenciji.

## Zvanična dokumentacija

- [Nx — kontrola zavisnosti modula](https://nx.dev/docs/features/enforce-module-boundaries)
- [pnpm workspaces](https://pnpm.io/workspaces)
- [Next.js Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers)
- [Expo — monorepo projekti](https://docs.expo.dev/guides/monorepos/)
- [Supabase — zaštita podataka](https://supabase.com/docs/guides/database/secure-data)
- [Supabase — kontrola pristupa dokumentima](https://supabase.com/docs/guides/storage/security/access-control)
