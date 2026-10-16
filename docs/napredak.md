# Evidencija napretka — ZEV

Posljednje ažuriranje: 16. oktobar 2026. (Europe/Belgrade).

## Trenutno stanje

Postavljena je Nx/pnpm monorepo osnova u glavnom folderu repozitorijuma. Aplikacije i poslovne funkcionalnosti još nisu generisane. Minimalni plan cilja pilot jedne zgrade; faze i kriterijumi implementacije razrađeni su u [razvojnom planu](razvojni-plan.md). Projektni [UI skill](../skills/zev-ui-design/SKILL.md) sa smjernicama i primjerima obavezan je za UI zadatke prema `AGENTS.md`. Prihvaćeni stack je zapisan u [stack.md](stack.md), a komande su u `../README.md`.

## Koraci

| ID | Korak | Status | Rezultat / napomena |
|---|---|---|---|
| ZEV-001 | Inicijalizovati Git repozitorijum | ZAVRŠENO | Repozitorijum postoji u glavnom folderu projekta. |
| ZEV-002 | Istražiti pravila i potrebe ZEV-a u RS | ZAVRŠENO | [Istraživanje](istrazivanje-zev-rs.md) i tekstovi propisa u `izvori/`; otvorene pravne provjere navedene su u istraživanju. |
| ZEV-003 | Definisati minimalni plan za pilot jedne zgrade | ZAVRŠENO | [Minimalni plan](minimalni-plan.md) sa ulogama, funkcionalnostima i poslovnim modelom. |
| ZEV-004 | Izraditi aplikaciju | PAUZIRANO | Početni projekat postavljen je u `aplikacija/`; korisnik je zaustavio izradu. Funkcionalna aplikacija nije završena niti objavljena. |
| ZEV-005 | Ukloniti ranije započetu lokalnu aplikaciju | ZAVRŠENO | Nova provjera potvrdila je da folder `aplikacija/` više ne postoji. Raniji pokušaj agenta bio je odbijen; agent u ovom zadatku nije izvršavao brisanje niti je utvrđeno ko je folder uklonio. |
| ZEV-006 | Ukloniti privatni, neobjavljeni Sites projekat | BLOKIRANO | Projekat „Komšijski — ZEV pilot“, ID `appgprj_6ad27d479cc08191a87f5a3fb1cae8e7`, ranije je kreiran. Dostupni Sites alati nisu nudili brisanje; udaljeni projekat nije uklonjen. |
| ZEV-007 | Uvesti glavne upute i evidenciju napretka | ZAVRŠENO | Kreirani `../AGENTS.md` i ovaj dokument; provjereno postojanje fajlova i sadržaj uputa. |
| ZEV-008 | Napraviti početni commit dokumentacije | ZAVRŠENO | Kreiran početni commit za `AGENTS.md` i `docs/`; identifikator je dostupan u Git istoriji. |
| ZEV-009 | Zapisati prihvaćeni stack sa Nx-om | ZAVRŠENO | Kreiran `stack.md`, usklađeni minimalni plan i glavne upute; provjerene reference i diff. Razvoj nije nastavljen. |
| ZEV-010 | Inicijalizovati Nx i pnpm workspace | ZAVRŠENO | Nx 23.3.0, pnpm 10.34.7, workspace konfiguracija, lockfile, `apps/`, `libs/` i README; prošle provjere verzije, izvještaja, projekata, grafa i frozen instalacije. |
| ZEV-011 | Dodati pravila pisanja koda i testova | ZAVRŠENO | U `AGENTS.md` dodati zabrana pisanja/generisanja testova bez naloga, prednost čistim funkcijama, minimalan `useEffect`, male komponente, grupisanje logike i custom hookovi. Pregled izmjena i `git diff --check` prošli. |
| ZEV-012 | Napraviti razvojni plan na osnovu minimalnog plana | ZAVRŠENO | Kreiran `razvojni-plan.md` sa deset faza, zavisnostima, kriterijumima završetka i otvorenim odlukama. Provjereni obim, lokalni linkovi i diff; implementacija nije započeta. |
| ZEV-013 | Obavezati agente da prate razvojni plan | ZAVRŠENO | U `AGENTS.md` dodati obavezno čitanje plana, praćenje DEV faza, zavisnosti i kriterijuma te povezivanje sa evidencijom. Pregled diff-a, referenca i `git diff --check` prošli. |
| ZEV-014 | Kreirati UI skill i smjernice iz Appleove filozofije | ZAVRŠENO | Kreiran projektni `zev-ui-design` sa smjernicama, primjerima i izvorima; povezan kroz `AGENTS.md`, README i razvojni plan. YAML i lokalni linkovi provjereni alternativnim alatima; zvanični validator nije radio zbog nedostajućeg PyYAML-a. UI nije implementiran. |

## Sljedeći koraci

- Sačekati korisnikovu instrukciju za nastavak prema `razvojni-plan.md`: DEV-01 potvrđuje pravila pilota, zatim DEV-02 generiše Next.js projekat u `apps/web`.
- Pri dodavanju framework paketa provjeriti njihove kompatibilne verzije, uz Nx dodatke na istoj verziji kao `nx`.
- Udaljeni, ranije započeti Sites projekat i dalje nije potvrđeno uklonjen (ZEV-006).

## Istorija rada

### 16. oktobar 2026. — UI skill: početak

- Zahtjev: pretvoriti istraženu Appleovu UI filozofiju u odgovarajući skill, napisati smjernice i primjere te obavezati agenta da ga koristi.
- Koraci ZEV-014: pregled izvora i postojećih odluka; izrada skilla i pratećih smjernica; povezivanje sa glavnim uputama i razvojnim planom; validacija strukture, linkova i sadržaja; završna evidencija.
- Skill se čuva uz projekat u `skills/zev-ui-design/`; `AGENTS.md` nalaže direktno čitanje pri UI zadacima. Globalna instalacija i prikaz u katalogu aplikacije nisu dio ovog koraka.
- Postojeće nekomitovane izmjene ostaju sačuvane. Zadatak priprema upute za DEV-02–DEV-09; ne započinje implementaciju tih faza.

### 16. oktobar 2026. — UI skill: sadržaj i povezivanje

- Kreirani `skills/zev-ui-design/SKILL.md`, `agents/openai.yaml` i reference `guidelines.md`, `examples.md`, `sources.md`. Skill pokriva izbor UI strukture, vizuelne tokene, forme, stanja, pristupačnost, finansijsku jasnoću i privatnost.
- Dodati originalni sintetički primjeri pregleda zgrade, unosa troška sa semantičkim HTML poljem, poređenja ponuda, kartice/ispravke, prijave, ankete i praznih stanja. Nisu kreirani aplikacija, testovi ili UI zavisnosti.
- `AGENTS.md` nalaže korišćenje skilla pri UI zadacima preko projektne putanje; dodati linkovi iz `README.md` i `docs/razvojni-plan.md`. Globalna instalacija nije izvršena.
- Pregledom sadržaja razdvojeni su Appleovi principi, W3C kriterijumi i lokalne preporuke. Slijede strukturna validacija, provjera referenci i završni pregled primjenjivosti.

### 16. oktobar 2026. — UI skill: završna provjera

- ZEV-014 završen. Inicijalizacija skilla izvršena je bundled `init_skill.py` alatom; sva početna placeholder polja su zamijenjena.
- `quick_validate.py` je pokušan sistemskim i bundled Pythonom; oba pokušaja zaustavljena su zbog nedostajućeg modula `yaml` (PyYAML). Nisu instalirane nove zavisnosti. Ova konkretna provjera nije prošla i ne prikazuje se kao izvršena validacija.
- Alternativno je Ruby/Psych parserom potvrđena ispravnost YAML frontmatter-a i UI metapodataka, imena, dozvoljenih polja, dužine opisa i reference na skill u promptu. Provjereni su lokalni Markdown linkovi iz sedam dokumenata, odsustvo placeholdera i završnih razmaka u skill fajlovima; `git diff --check` prolazi.
- Ručnim pregledom primjenjivosti provjereno je da specifikacija ekrana ne pokreće implementaciju, izmjena forme ostaje u obimu zadatka, a finansijski primjer ne uvodi nova obračunska pravila. Ovo je pregled uputa, ne izvršavanje skilla u drugoj sesiji ili provjera runnable UI-ja.
- Promijenjeni fajlovi ovog zadatka: `AGENTS.md`, `README.md`, `docs/razvojni-plan.md`, `docs/napredak.md` i pet fajlova u `skills/zev-ui-design/`. Sve ranije izmjene ostaju sačuvane.
- Nisu pisani testovi, generisane aplikacije, preuzimani Appleovi asseti niti vršena globalna instalacija ili objavljivanje. Skill se koristi direktno preko `AGENTS.md`; automatsko pojavljivanje u katalogu aplikacije nije provjereno. Commit nije napravljen.
- Sljedeće: pri narednom odobrenom UI zadatku primijeniti skill, konkretan prikaz ručno provjeriti i prema nalazima dopuniti smjernice. DEV faze ostaju PLANIRANO.

### 16. oktobar 2026. — Praćenje razvojnog plana: početak

- Zahtjev: dodati u glavne upute obavezu praćenja razvojnog plana.
- Koraci ZEV-013: pregled postojećih dokumenata i Git stanja; dodavanje obaveznog čitanja, redoslijeda, zavisnosti i kriterijuma završetka; provjera i završno ažuriranje evidencije.
- Zatečene izmjene iz prethodnog zadatka u `README.md`, planovima i evidenciji ostaju sačuvane. Razvoj aplikacije nije pokrenut.

### 16. oktobar 2026. — Praćenje razvojnog plana: završetak

- Rezultat ZEV-013: `AGENTS.md` zahtijeva čitanje `docs/razvojni-plan.md`, praćenje faza DEV-01–DEV-10 i njihovih zavisnosti, provjeru kriterijuma završetka te povezivanje zadataka sa DEV oznakama u evidenciji. Odstupanja se obrazlažu i usklađuju sa uputama korisnika.
- Provjera: pregledan diff uputa, potvrđeno postojanje referenciranog plana i izvršen `git diff --check`, bez grešaka. Testovi nisu pisani ni pokretani; promijenjeni su samo `AGENTS.md` i ova evidencija.
- Preostalo: naredna korisnikova instrukcija za razvoj. Aplikacija nije generisana niti objavljena; commit nije napravljen.

### 16. oktobar 2026. — Razvojni plan: početak

- Zahtjev: na osnovu `docs/minimalni-plan.md` napraviti development plan.
- Koraci ZEV-012: pregled stvarnog stanja; razrada razvojnog plana; provjera pokrivenosti minimalnog obima, zavisnosti i linkova; završno usklađivanje evidencije.
- Provjera prije rada: Git status je čist; `apps/` i `libs/` imaju samo `.gitkeep` fajlove. Nx/pnpm osnova postoji, aplikacioni kod još nije generisan.
- U toku: izrada dokumenta `docs/razvojni-plan.md`. Zahtjev se odnosi na planiranje; implementacija i objavljivanje nisu započeti.

### 16. oktobar 2026. — Razvojni plan: dokument izrađen

- Rezultat koraka ZEV-012: kreiran `docs/razvojni-plan.md` sa deset faza DEV-01–DEV-10, zavisnostima, konkretnim koracima, kriterijumima završetka, matricom pristupa, otvorenim odlukama i načinom praćenja pilota.
- Dodate reference iz `README.md` i `docs/minimalni-plan.md`. Minimalni obim nije proširen; razvojni prijedlozi i preostale odluke su označeni.
- Pregledom sadržaja potvrđeno da plan obuhvata pet cjelina, sopstvene kartice, istoriju izmjena, ručno usaglašavanje, privatnost priloga i informativni karakter anketa. Slijedi završna provjera lokalnih referenci i diff-a.

### 16. oktobar 2026. — Razvojni plan: završna provjera

- ZEV-012 završen: provjereno postojanje lokalnih Markdown odredišta i detaljne razrade svih deset faza; `git diff --check` prolazi. Pregledan je i novi, još nepraćeni dokument `docs/razvojni-plan.md`.
- Promijenjeni fajlovi: `docs/razvojni-plan.md`, `docs/minimalni-plan.md`, `docs/napredak.md` i `README.md`.
- Nisu pisani/generisani testovi niti pokretani aplikacioni lint/typecheck/build: izmijenjena je samo dokumentacija, a aplikacioni projekti ne postoje.
- Preostalo: korisnikova instrukcija za nastavak; DEV-01 potvrđuje pravila i otvorene odluke, a DEV-02 je naredna tehnička faza. Sve razvojne faze ostaju PLANIRANO; aplikacija nije implementirana niti objavljena. Commit nije napravljen.

### 16. oktobar 2026. — Početni pregled stanja

- Git repozitorijum inicijalizovan je na grani `master`.
- Istraživanje je sačuvano u `docs/istrazivanje-zev-rs.md`; lokalni izvodi zvaničnih tekstova nalaze se u `docs/izvori/`.
- Za pilot je izabrana jedna zgrada.
- Izrada je započeta postavljanjem početnog projekta i kreiranjem privatnog Sites projekta, a zatim zaustavljena na korisnikov zahtjev. Instalacioni proces završen je kodom 130.
- Plan je sačuvan u `docs/minimalni-plan.md`.
- Pokušaj brisanja lokalnog foldera odbijen je; udaljeni projekat nije obrisan jer dostupni alati nisu nudili tu operaciju.

### 16. oktobar 2026. — Upute za praćenje rada

- Zahtjev: napraviti glavni Markdown fajl koji obavezuje agente da prate i zapisuju završene korake.
- Urađeno: kreiran `AGENTS.md` sa obaveznim čitanjem plana i evidencije, statusima koraka i pravilima ažuriranja tokom rada i prije završetka zadatka.
- Urađeno: kreiran `docs/napredak.md` sa početnim stanjem, završenim koracima i preostalim preprekama.
- Provjera: pregledani plan i Git status prije izmjena; nakon upisa provjereni novi fajlovi i njihove reference. Nisu pokretani testovi aplikacije jer ovaj zadatak mijenja samo dokumentaciju.
- Sljedeće: čekati korisnikovu instrukciju; razvoj ostaje pauziran.

### 16. oktobar 2026. — Početni commit dokumentacije

- Zahtjev: komitovati trenutni rad.
- Obuhvat: glavne upute agentima, minimalni plan, istraživanje, izvodi propisa i evidencija napretka.
- Provjera prije commita: pregledani Git status, spisak dokumentacije i upute; repozitorijum još nema commitova.
- Razvoj aplikacije nije nastavljen; kod aplikacije nije dio ovog commita.
- Rezultat: početni commit uspješno kreiran; ovaj zapis o završenom koraku uključen je dopunom istog commita.
- Provjera: Markdown fajlovi prolaze `git diff --cached --check`; izvorni TXT prepisi sadrže razmake iz konverzije zvaničnih dokumenata, koji su namjerno sačuvani.

### 16. oktobar 2026. — Prihvaćeni tehnološki stack

- Zahtjev: koristiti Nx i zapisati prihvaćeni stack iz prethodne preporuke.
- Rezultat: `docs/stack.md` dokumentuje Nx, pnpm, TypeScript, Next.js/React, Tailwind CSS, React Native/Expo i Supabase sa PostgreSQL-om, Auth-om i Storage-om. Dodatne serverske operacije planirane su kroz Next.js Route Handlers.
- Usklađeni su `docs/minimalni-plan.md` i upute za čitanje u `AGENTS.md`.
- Provjera: `git diff --check` prolazi; provjereni su postojanje novog dokumenta i reference iz plana i uputa. Testovi aplikacije nisu pokretani jer su mijenjani samo dokumenti.
- Sljedeće: potvrditi detalje implementacije kada korisnik zatraži nastavak. Izrada i objavljivanje ostaju pauzirani.

### 16. oktobar 2026. — Nx/pnpm osnova

- Zahtjev: pokrenuti postavljanje Nx-a. Odobrenje je primijenjeno na monorepo osnovu, bez generisanja aplikacija ili objavljivanja.
- Provjera prije rada: pročitane glavne upute, plan, stack i postojeća evidencija. Folder `aplikacija/` nije prisutan; ZEV-005 je usklađen sa zatečenim stanjem, uz očuvan istorijski zapis odbijenog brisanja.
- Kreirani su `package.json`, `nx.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `.npmrc`, `.nvmrc`, `.gitignore`, `README.md` i prazni folderi `apps/` i `libs/` sa `.gitkeep` fajlovima.
- Instalirani su Nx 23.3.0 i zavisnosti pomoću Corepack/pnpm 10.34.7 na Node.js 22.22.1. Verzije su zaključane; Nx Cloud nije povezan. Zavisnosti, Nx generisani podaci i lokalne tajne isključeni su iz Git-a.
- Zvanična Nx Node kompatibilnost potvrđuje podršku za Node ^22.12.0 u Nx 23: https://nx.dev/docs/technologies/node/introduction.
- Provjere koje su prošle: `corepack pnpm nx --version`, `corepack pnpm report`, `corepack pnpm projects --json`, izvoz grafa u `.nx/project-graph.json`, `corepack pnpm install --frozen-lockfile`, provjera `.gitignore` i `git diff --check`.
- Nx analiza u sandboxu je prijavila nedozvoljene Unix socket-e; završna provjera je uspješno ponovljena uz odobrene dozvole i `NX_DAEMON=false`, bez izmjene globalnih sandbox podešavanja.
- Rezultat: Nx prepoznaje `@zev/workspace` sa praznim skupom targeta; web i mobilni projekti još ne postoje. Nema aplikacionog builda ni testova jer aplikacija nije generisana.
- Sljedeće: dodati aplikaciju kada korisnik to zatraži. Ovaj zadatak nije napravio commit niti pokrenuo objavljivanje.

### 16. oktobar 2026. — Pravila pisanja koda i testova

- Zahtjev: dopuniti glavne upute pravilima o testovima, čistim funkcijama, `useEffect` pozivima, malim komponentama, organizaciji logike i custom hookovima.
- Rezultat: u `AGENTS.md` dodate sekcije „Testovi“ i „Stil i organizacija koda“. Testovi i njihovo automatsko generisanje nisu dozvoljeni bez izričitog naloga korisnika.
- Provjera: pregledan diff i izvršen `git diff --check`, bez grešaka. Nisu pisani ni pokretani testovi; mijenjana je samo dokumentacija.
- Sljedeće: primjenjivati ova pravila pri narednom odobrenom razvoju. Commit nije napravljen.
