# Evidencija napretka — ZEV

Posljednje ažuriranje: 16. oktobar 2026. (Europe/Belgrade).

## Trenutno stanje

Postavljena je Nx/pnpm monorepo osnova u glavnom folderu repozitorijuma, prema novoj instrukciji korisnika. Aplikacije i poslovne funkcionalnosti još nisu generisane. Minimalni plan cilja pilot jedne zgrade. Prihvaćeni stack je zapisan u [stack.md](stack.md), a komande su u `../README.md`.

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

## Sljedeći koraci

- Sačekati korisnikovu instrukciju za generisanje aplikacija. Predloženi naredni tehnički korak je Next.js projekat u `apps/web`.
- Pri dodavanju framework paketa provjeriti njihove kompatibilne verzije, uz Nx dodatke na istoj verziji kao `nx`.
- Udaljeni, ranije započeti Sites projekat i dalje nije potvrđeno uklonjen (ZEV-006).

## Istorija rada

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
