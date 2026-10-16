# Evidencija napretka — ZEV

Posljednje ažuriranje: 16. oktobar 2026. (Europe/Belgrade).

## Trenutno stanje

Postavljeni su Nx/pnpm monorepo i Next.js web osnova u `apps/web`, sa TypeScriptom, Tailwindom i osnovnim UI komponentama. DEV-02-C dodaje sintetičke podatke i demo kontekst sa stanjem u memoriji; puni poslovni moduli još nisu izrađeni. Minimalni plan cilja pilot jedne zgrade; faze i kriterijumi implementacije razrađeni su u [razvojnom planu](razvojni-plan.md). Projektni [UI skill](../skills/zev-ui-design/SKILL.md) sa smjernicama i primjerima obavezan je za UI zadatke prema `AGENTS.md`. Prihvaćeni stack je zapisan u [stack.md](stack.md), a komande su u `../README.md`.

Pripremljena je [specifikacija pilota](pilot-specifikacija.md). Korisnik navodi završen DEV-01; u dokumentaciji prijava i konkretna matrica dozvola još ostaju otvorene za backend. Potvrđeni su demo sa izmišljenim podacima, obračun po m², ručni rok, prvo web sa landing stranicom, kasnije mobilne aplikacije, tenant pristup i ZEV uloge. DEV-02 je U TOKU; DEV-02-A je ZAVRŠENO kao pregledana [specifikacija demoa](demo-specifikacija.md), DEV-02-B kao provjerena web osnova sa početnim placeholderom i `/ui` pregledom, a DEV-02-C kao demo podaci, profili i stanje sa resetom. Poslije implementacije slijede provjere i korisnikov pregled, pa odvojeno odobreni DEV-03.

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
| ZEV-015 | DEV-01 — dogovor pravila i specifikacija demoa/pilota | U TOKU | Nacrt, matrica pristupa i sintetički obračun pripremljeni; demo, obračun po m² i ručni rok potvrđeni. Platforma, landing, tenant smjer i ZEV uloge su potvrđeni; prijava i detaljne dozvole ostaju otvorene. |
| DEV-01-A | Pripremiti nacrt pravila pilota | ZAVRŠENO | `pilot-specifikacija.md` odvaja potvrđene odluke, prijedloge i otvorena pitanja. |
| DEV-01-B | Usaglasiti odluke sa korisnikom | U TOKU | Potvrđeni demo, obračun, web sa landingom, kasnije mobilne aplikacije, tenant smjer i ZEV uloge; prijava i detaljna prava još nisu potvrđeni. |
| DEV-01-C | Provjeriti specifikaciju i kriterijume završetka | ZAVRŠENO | Pregledani nacrt i kriterijumi; lokalni linkovi, aritmetika i diff provjereni. Kriterijumi cijele DEV-01 još nisu ispunjeni; nova provjera nakon odluka. |
| DEV-01-D | Uskladiti platforme, landing, tenant i ZEV uloge | ZAVRŠENO | Ažurirani planovi, stack i specifikacija; pregledana dosljednost i reference. Rezultat je dokumentacija, bez implementacije. |

| ZEV-016 | Uvrstiti interaktivni demo bez baze u plan | ZAVRŠENO | DEV-02 razrađen kao demo bez Supabase-a, sa pregledom prije DEV-03; usklađeni planovi, specifikacija, stack i upute. Implementacija nije pokrenuta. |
| DEV-02-A | Specifikacija ekrana i demo scenarija | ZAVRŠENO | `demo-specifikacija.md`: ekrani, navigacija, demo prava, podaci i očekivani ishodi; pregled dokumentacije i aritmetike završen. UI nije implementiran. |
| DEV-02-B | Tehnička web osnova i osnovne komponente | ZAVRŠENO | `apps/web`: Next.js/React, TypeScript, Tailwind, UI tokeni i komponente; frozen instalacija, lint, eksplicitni typecheck, build i lokalni dev/produkcioni pregled prošli. Poslovni demo nije izrađen. |
| DEV-02-C | Sintetički podaci, demo kontekst i stanje | ZAVRŠENO | Dva tenanta, tri profila, selektori dozvoljenog prikaza, lokalna bilješka i reset. Lint/typecheck/build i ručni scenariji konteksta/memorije prošli; opis prava nije stvarna zaštita. |

## Sljedeći koraci

- Slijedi DEV-02-D: landing, navigacija pet cjelina i početni pregled zgrade. Ovaj zadatak završio je DEV-02-C; D nije započet.
- DEV-02-D–DEV-02-I ostaju PLANIRANO: lokalni interaktivni demo, provjere i korisnikov pregled. Demo simulira tenant/role prikaze i privremene izmjene; reset ili osvježavanje vraća početne podatke.
- Prije DEV-03 razriješiti zavisne odluke DEV-01 o prijavi, tenant granici i dozvolama; backend počinje tek na korisnikovu instrukciju. DEV-02 je U TOKU; DEV-03–DEV-10 ostaju PLANIRANO. Raniji zapisi o statusima ostaju istorija.
- Pri dodavanju framework paketa provjeriti njihove kompatibilne verzije, uz Nx dodatke na istoj verziji kao `nx`.
- Udaljeni, ranije započeti Sites projekat i dalje nije potvrđeno uklonjen (ZEV-006).

## Istorija rada

### 16. oktobar 2026. — DEV-02-C: početak demo podataka i konteksta

- Korisnik je naložio nastavak nakon B. DEV-02-C-1 — pregled preduslova: ZAVRŠENO; Git stablo je čisto, postoje web osnova i specifikacija A, pročitani obavezni dokumenti, UI skill i relevantni bundled Next vodič.
- DEV-02-C-2 — sintetički skupovi, čista pravila prikaza i stanje u memoriji: ZAVRŠENO. `features/demo/` sadrži tipove, determinističku fabriku podataka sa eksplicitnim vremenom početka, čisti reducer i selektore, te uski React context/hook. Javor: A/B, sredstva 1.000 KM, dug 20/avans 10; Lipa: C i 500 KM. Pripremljeni sintetički rad/ponude, objava, prijave i anketa; puni moduli još ne postoje. Relativni rok ankete dolazi iz vremena zahtjeva/reset radnje i ostaje fiksan u sesiji.
- DEV-02-C-3 — kontrole ZEV/profil, demo prava, provjera lokalne izmjene, promjene konteksta i reseta: ZAVRŠENO. Kreirani `/demo`, `/demo/prava`, selektori, opis aktivnih prava i native dijalog za reset/odbacivanje/izlaz. Mala operaterska radna bilješka služi provjeri memorije i tenant granice; nije novo poslovno obavještenje. Stanje živi u demo layoutu, bez localStorage, efekata ili backend upisa. Pregled kroz profile koristi samo dozvoljene kartice i prijave.
- DEV-02-C-4 — lint/typecheck/build, ručni browser pregled, dokumentacija i granice: ZAVRŠENO. Sva tri tehnička targeta su prošla; provjeren build razlikuje statičke osnovne rute od `/demo` i `/demo/prava` koje dobijaju početno vrijeme na zahtjev. Prethodni lokalni server zaustavljen; ažurirani produkcioni server radi na `127.0.0.1:3000`.
- Ručna provjera u ugrađenom browseru: početni Javor/Vlasnik i samo A/20 KM duga, operater sa A/B i dvije prijave, korisnik prostora bez kartice i samo sopstvena prijava. Lipa prikazuje C/50 m², 500 KM i prazne module. Bilješka Javora ne prelazi u Lipu i ostaje pri povratku i navigaciji `/demo` → `/demo/prava` → `/demo`. Nepotvrđena bilješka u Lipi ostaje poslije Escape; potvrda promjene odbacuje je bez prenosa. Sačuvane bilješke u oba ZEV-a nestaju poslije potvrđenog reseta, uz povratak Javor/Vlasnik. Potvrđen izlazak i ponovni ulaz, te osvježavanje, vraćaju početni kontekst i podatke.
- UI provjera: screenshot i mjerenje na 320 i 1280 CSS px bez horizontalnog prelijevanja; native dijalog ima naziv, fokus na Odustani i Escape zatvaranje. Postojeći semantički tokeni nisu mijenjani. Puni čitač ekrana, 200% tekst, svi browseri i još neizrađeni poslovni tokovi nisu provjereni. Ovo dokazuje lokalni demo prikaz, ne autentifikaciju, RLS ili produkcionu izolaciju.
- Izmjene: novi `apps/web/src/features/demo/` i `src/app/demo/`, ulaz u demo na početnom placeholderu, README i statusi u glavnim uputama, minimalnom/razvojnom planu, stacku, specifikaciji demoa i evidenciji. Nema novih paketa, testova, baze, udaljenih resursa, commita ili objavljivanja. Screenshot: `/private/tmp/zev-dev-02-c-demo.jpg`. DEV-02-C ZAVRŠENO; cijela DEV-02 ostaje U TOKU. Sljedeći korak DEV-02-D.
- Završni pregled dokumentacije: `git diff --check`, lokalne reference sedam dokumenata i završni razmaci novih izvornih fajlova prolaze. Provjera nije dodala testne fajlove ili infrastrukturu.
- Obim je osnova demoa sa jednostavnim prikazom radi provjere konteksta. Landing i puni pregled zgrade pripadaju D, a poslovni unosi E–G. Ne dodavati testove, backend ili trajnu pohranu.

### 16. oktobar 2026. — DEV-02-B: početak web osnove

- Korisnik je naložio nastavak nakon DEV-02-A. Obim: `apps/web`, TypeScript, Tailwind, osnovni UI tokeni i komponente, lokalno pokretanje i tehničke provjere, bez demo poslovnih funkcionalnosti C–I.
- DEV-02-B-1 — pregled preduslova i kompatibilnosti: ZAVRŠENO. Pročitani obavezni dokumenti i UI skill; izmjene A u dokumentaciji i novi `demo-specifikacija.md` su sačuvani. Nx dodatak 23.3.0 usklađen sa workspace-om; podržani Next 16 potvrđen kroz [Nx dokumentaciju](https://nx.dev/docs/technologies/react/next/introduction). Stabilne verzije provjerene u registru: Next 16.4.2, React 19.3.1, Tailwind 4.3.3. [Tailwind PostCSS integracija](https://tailwindcss.com/docs/installation/framework-guides/nextjs) primijenjena u app projektu.
- DEV-02-B-2 — generisanje bez testova i priprema UI osnove: ZAVRŠENO. Nx generator izvršen sa `unitTestRunner=none` i `e2eTestRunner=none`; postavljeni i podrazumijevani izbori za naredno generisanje. Generator je napisao fajlove, ali završna instalacija nije našla direktni `pnpm` u PATH-u; završena zasebno preko Corepacka. Kreirani TypeScript/ESLint/PostCSS konfiguracija, semantički tokeni, Button/LinkButton, TextField, Notice, PageHeading, početni placeholder, razvojni `/ui` pregled i 404. Uklonjeni generisani welcome sadržaj, favicon i primjer API rute. Nema poslovnih demo podataka ili backenda.
- DEV-02-B-3 — lint/typecheck/build, lokalno pokretanje, vizuelna provjera i README: ZAVRŠENO. Sandbox je odbio pnpm skladište izvan projekta i Nx sockete; relevantne komande ponovljene uz odobrenu eskalaciju. Instalacija prijavila deprecated ESLint 9 iz generatora i preskočene instalacione skripte `@swc/core` i `unrs-resolver`; konkretne lint/typecheck/build i runtime provjere prolaze bez odobravanja dodatnih skripti. Upozorenja ostaju zabilježena.
- Međurezultat provjere: prvi lint/build prošli; `typecheck` target nije bio automatski generisan, dodat eksplicitni `next typegen` + `tsc --noEmit` i prošao. Uključeni Next preporučeni/core-web-vitals lint kriterijumi, tipovi ruta i zajednički ulazi Nx keša; nakon tih izmjena slijedi nova završna provjera. README sada opisuje komande, dostupne rute i obim. ESLint 9 zadržan zbog peer opsega React lint dodataka koje generator koristi; deprecation ostaje poznato razvojno ograničenje.
- Ručni pregled lokalnog dev servera u ugrađenom browseru: `/`, `/ui`, greška praznog unosa sa fokusom na polju, unos, potvrda Tab/Enter, poništavanje, navigacija i 404. Screenshot pregled na 320, 360, 768 i 1280 CSS px; na 320/360 nema horizontalnog prelijevanja. Vidljiv fokus potvrđen. Stvarni CSS tokeni izmjereni prema bijeloj površini: glavni tekst 16,22:1, sekundarni 6,42:1, akcent 5,99:1, hover 8,17:1, greška 6,57:1, uspjeh 5,69:1, upozorenje 6,79:1, granica inputa 3,94:1. Puni čitač ekrana, 200% tekst i drugi browseri još nisu provjereni; poslovni scenariji pripadaju kasnijim podfazama.
- Završna provjera: `corepack pnpm install --frozen-lockfile` sa postojećim skladištem prolazi; `nx run-many -t lint typecheck build -p web --parallel=1 --output-style=static` izvršio sva tri targeta bez grešaka. Build generiše `/`, `/ui` i 404. Dev server zaustavljen prije produkcione provjere; `nx start web --hostname=127.0.0.1 --port=3000` radi, a potvrda i reset osvježavanjem provjereni u produkcionom buildu. Browser tab poslije prekida dev servera zahtijevao je ponovno otvaranje; nije mijenjana browser zaštita ili mrežna konfiguracija.
- Fajlovi: `apps/web/`, `package.json`, `pnpm-lock.yaml`, `nx.json`, `tsconfig*.json`, `eslint.config.mjs`, `.gitignore`, README i statusi u `AGENTS.md`, `docs/stack.md`, `docs/minimalni-plan.md`, `docs/razvojni-plan.md`, ovoj evidenciji. Next.js je tokom dev pokretanja automatski dodao lokalni `apps/web/AGENTS.md`; pročitan je zajedno sa relevantnim bundled Next vodičima, zadržan u projektu. Generisani `next-env.d.ts` se ignoriše i obnavlja kroz typegen/dev/build.
- DEV-02-B ZAVRŠENO; DEV-02 ostaje U TOKU. Sačuvan screenshot komponenti `/private/tmp/zev-dev-02-b-ui.jpg`. Lokalni produkcioni server ostavljen je na `127.0.0.1:3000` radi pregleda; nije objavljen. Testovi, Supabase, udaljeni resursi i poslovne funkcionalnosti nisu dodavani; commit nije napravljen. Sljedeći korak je DEV-02-C.
- Završni pregled dokumentacije i konfiguracije: `git diff --check`, parsiranje šest JSON konfiguracija, lokalni linkovi u sedam dokumenata, usklađenost root/app runtime zavisnosti i odsustvo dodatih testnih fajlova/frameworka prošli.

### 16. oktobar 2026. — DEV-02-A: početak specifikacije demoa

- Korisnik je prihvatio podjelu DEV-02 i naložio sljedeći korak: DEV-02-A, specifikaciju ekrana i demo scenarija.
- DEV-02-A-1 — pregled preduslova: ZAVRŠENO. Pročitani obavezni dokumenti i UI skill sa smjernicama i primjerima; Git stablo je čisto, `apps/` i `libs/` imaju samo `.gitkeep`. Otvorene produkcione odluke ne blokiraju ovaj korak.
- DEV-02-A-2 — ekrani, navigacija, privremene dozvole i sintetički scenariji: ZAVRŠENO. Kreiran `docs/demo-specifikacija.md`: 12 ekrana/grupa prikaza, pet destinacija, tri demo profila, dva tenanta i 14 scenarija sa očekivanim ishodima. Označene pretpostavke, granice lokalnog stanja, finansijska privatnost, obrasci i relevantna UI stanja.
- DEV-02-A-3 — pregled pokrivenosti, aritmetike, lokalnih referenci i statusa: ZAVRŠENO. Pregledano svih pet cjelina i pokrivenost podfaza B–I; lokalne Markdown reference u tri dokumenta, jedinstvenost oznaka UI-01–UI-12 i SC-01–SC-14, finansijska aritmetika i `git diff --check` prolaze. Korišćena je jednokratna provjera dokumentacije, bez dodavanja testova ili infrastrukture. Usklađeni `docs/razvojni-plan.md` i ova evidencija. Nema izvršivog UI-ja: scenariji, širine, tastatura, kontrast i aplikacioni lint/typecheck/build nisu izvršeni. DEV-02-A ZAVRŠENO; sljedeći korak DEV-02-B. Nisu instalirane zavisnosti, kreirani udaljeni resursi ili izvršeni commit/objavljivanje.
- Ovaj zadatak ne generiše aplikaciju; DEV-02-B i kasnije podfaze još nisu započete.

### 16. oktobar 2026. — DEV-02: početak razrade podfaza

- Zahtjev: korisnik navodi da je završio DEV-01 i želi prijedlog podjele DEV-02 na manje faze. Ovaj zadatak razrađuje plan, bez generisanja aplikacije.
- ZEV-017-A — pregled plana i stvarnog stanja: ZAVRŠENO. Radno stablo je bilo čisto; `apps/` i `libs/` sadrže samo `.gitkeep`. Pregledani obavezni dokumenti, specifikacija i projektni UI skill sa smjernicama i primjerima.
- ZEV-017-B — pripremiti podfaze sa rezultatima, zavisnostima i kriterijumima: ZAVRŠENO. U `docs/razvojni-plan.md` dodat prijedlog DEV-02-A–DEV-02-I, od specifikacije do korisnikovog pregleda, uz odvojene tehničku osnovu, interaktivne module i završnu provjeru. Sve implementacione podfaze su PLANIRANO.
- ZEV-017-C — provjeriti obim, reference i diff, te uskladiti evidenciju: ZAVRŠENO. Pregledom potvrđeno da podfaze pokrivaju postojeće korake DEV-02 i zadržavaju uslove za DEV-03; provjeren cilj nove reference i `git diff --check`, bez grešaka. Izmijenjeni samo `docs/razvojni-plan.md` i `docs/napredak.md`; aplikacioni lint/typecheck/build i vizuelna provjera nisu primjenjivi jer aplikacija ne postoji. Testovi nisu pisani. Sljedeće: korisnikov izbor nastavka, počevši od DEV-02-A; izrada i objavljivanje nisu pokrenuti.
- Razlika u statusu: korisnik prijavljuje završen DEV-01, dok postojeća dokumentacija još navodi otvorenu prijavu i matricu dozvola. Nove odluke nisu dostavljene ovim zahtjevom; potvrde se ne izmišljaju. Potvrđeni demo obim dovoljan je za planiranje DEV-02, a zavisna pitanja ostaju evidentirana prije DEV-03/04.

### 16. oktobar 2026. — Plan demoa bez baze: početak

- Zahtjev: eksplicitno uvrstiti interaktivni demo bez inicijalizacije baze u plan. Ovo je izmjena plana, bez početka implementacije.
- Koraci ZEV-016: pregledati postojeći obim i zavisnosti; razraditi DEV-02 kao demo bez baze i korisnikov pregled prije DEV-03; uskladiti specifikaciju, minimalni plan, stack i glavne upute; provjeriti reference, diff i status.
- Pregledani obavezni dokumenti i projektni UI skill. Stvarno stanje: aplikacije nisu generisane; zatečene izmjene dokumentacije ostaju sačuvane. ZEV-016 je U TOKU.

### 16. oktobar 2026. — DEV-01: razjašnjenje platformi i tenant pristupa, početak

- Korisnik je razjasnio smjer: prvo web primjer sa landing stranicom i aplikacijom iza nje; za mobilni pristup posebne mobilne aplikacije. Traži tenant vrstu pristupa.
- Koraci DEV-01-D: uskladiti minimalni plan, stack i razvojni plan; dopuniti specifikaciju tenant granicama i javnim/demo/internim pristupom; provjeriti reference i dosljednost statusa.
- Rad je U TOKU. Tenant se u nacrtu tumači kao jedan ZEV sa svojim članstvima i podacima; grupisanje više zgrada pod jednim tenantom nije potvrđeno. Način prijave još nije odabran.
- Primjenjuje se projektni `zev-ui-design` pri planiranju ulaska kroz landing stranicu. Nema runnable UI-ja za vizuelnu provjeru. Ranije izmjene dokumentacije ostaju sačuvane.

### 16. oktobar 2026. — DEV-01: početak dogovora pilota

- Zahtjev: odraditi sljedeći korak nakon pregleda stanja; započet DEV-01 prema razvojnom planu. Korisnikova instrukcija odobrava ovaj korak, bez objavljivanja aplikacije.
- Provjereni dokumentacija, konfiguracija i Git stanje: radno stablo je čisto, `apps/` i `libs/` sadrže samo `.gitkeep`.
- Koraci: DEV-01-A pripremiti specifikaciju sa odvojenim prijedlozima i potvrdama; DEV-01-B usaglasiti podatke pilota, pristup i obračun sa korisnikom; DEV-01-C provjeriti matricu pristupa, sintetički primjer i reference te evidentirati preostale odluke.
- U toku DEV-01-A; poslana pitanja o web/PWA pristupu, pilot zgradi i obračunu. Dok odgovori ne stignu, zavisne odluke se ne smatraju potvrđenim.

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

### 16. oktobar 2026. — DEV-01: nacrt i prvi odgovori

- Kreiran `docs/pilot-specifikacija.md`: registar odluka PIL-01–PIL-13, prijedlog modela vlasničkih veza i članstva, matrica pristupa i sintetički mjesečni primjer.
- Korisnik je potvrdio demo bez stvarne zgrade, obračun po m² i ručni unos roka. Odgovor „Želim drugačiji pristup“ na objedinjeno pitanje o platformi i email pozivima nije protumačen kao izbor određene tehnologije; poslano je dopunsko pitanje.
- Primjer koristi dvije jedinice po 60 m² i ilustrativnu stopu 0,50 KM/m²; stopa nije potvrđena odluka. Račun daje 945,00 KM, dug A 10,00 KM i avans B 5,00 KM; ispravka rashoda na 110,00 daje 955,00 KM.
- DEV-01 ostaje U TOKU; preostaju razjašnjenje platforme/prijave i dogovor ostalih pravila. Nisu generisani aplikacija, baza ili testovi, niti su kreirani udaljeni resursi.

### 16. oktobar 2026. — DEV-01: provjera nacrta

- Pregledana nova specifikacija i usklađen razvojni plan: DEV-01 U TOKU, DEV-02–DEV-10 PLANIRANO. Potvrde korisnika odvojene su od prijedloga i ilustrativnih iznosa.
- Provjereni lokalni Markdown linkovi iz tri promijenjena dokumenta i aritmetika primjera; `git diff --check` prolazi. Nisu pisani testovi ni pokretani aplikacioni build/lint/typecheck jer aplikacioni kod ne postoji.
- Fajlovi: novi `docs/pilot-specifikacija.md`, ažurirani `docs/napredak.md` i `docs/razvojni-plan.md`. Commit nije napravljen. Sljedeće je odgovor korisnika o željenom pristupu, zatim potvrda preostalih pravila; DEV-01 nije označen završenim.

### 16. oktobar 2026. — DEV-01: platforme, tenant i uloge, rezultat

- Korisnik je dodatno zatražio uloge u skladu sa ZEV pravilima. Nacrt razlikuje vlasnički odnos, zakonsku funkciju, tenant članstvo i dozvole aplikacije. Dodati su predsjednik skupštine, član/predsjednik upravnog odbora, upravnik i registrovani zastupnik, uz odvojene operativne i tehničke dozvole. Konačna matrica nije potvrđena; ranija tabela predsjednik/stanar označena je kao pojednostavljen nacrt.
- Usklađeni `docs/minimalni-plan.md`, `docs/stack.md`, `docs/razvojni-plan.md` i `docs/pilot-specifikacija.md`: prvo web sa javnim landingom i sintetičkim demoom, posebne mobilne aplikacije kasnije, bez PWA instalacije kao kriterijuma. Landing je proširenje ranijeg obima po direktnoj korisnikovoj instrukciji.
- Tenant smjer je potvrđen; jedan ZEV po tenantu je eksplicitna radna pretpostavka. Dokumentovani su odvojeni podaci, članstva, dozvole, prilozi i istorija, bez implicitnog pristupa administratora platforme svim tenantima. Demo i stvarni interni podaci imaju odvojene tokove.
- Provjera izvora: javna NSRS stranica Zakona o održavanju zgrada 101/11 i lokalni izvod čl. 24–32; nije izvršena nova potpuna pravna konsolidacija. Funkcije se provjeravaju prema dokumentima stvarnog ZEV-a prije pilota.
- UI skill primijenjen na specifikaciju javnog/demo/internog ulaza i jasnog tenant/role konteksta; runnable UI i vizuelna provjera ne postoje. Nisu pisani testovi ili generisani projekti. DEV-01 ostaje U TOKU, DEV-02–DEV-10 PLANIRANO.

- Završna provjera dopune DEV-01-D: pregledani promijenjeni dokumenti i novi nepraćeni `pilot-specifikacija.md`, lokalni Markdown linkovi prolaze, `git diff --check` prolazi. Provjera obuhvata dokumentaciju; nije provjeren izvršivi UI, RLS ili stvarna dodjela prava. Commit nije napravljen.

### 16. oktobar 2026. — Plan demoa bez baze: usklađivanje

- ZEV-016: DEV-02 proširen sa web osnove na interaktivni demo svih pet cjelina. Dodati lokalni izmišljeni podaci, promjena demo uloge/tenanta, ključne forme i privremene promjene u memoriji, reset i osvježavanje na početno stanje.
- Izričito isključeni inicijalizacija baze/Supabase-a, Auth, RLS, Storage, migracije i stvarni nalozi u DEV-02. Supabase ostaje prihvaćeni backend za DEV-03 nakon korisnikovog pregleda i instrukcije.
- Promijenjena zavisnost: potvrđeni demo obim iz DEV-01 dovoljan je za DEV-02; otvorena produkciona pitanja ne blokiraju demo. Puna DEV-01 ostaje U TOKU i zavisna pitanja se rješavaju prije backend koraka. Brojevi DEV faza ostaju stabilni, a demo ne završava produkcione module.
- Usklađeni `AGENTS.md`, `docs/minimalni-plan.md`, `docs/stack.md`, `docs/razvojni-plan.md`, `docs/pilot-specifikacija.md` i ova evidencija. Projektni UI skill primijenjen pri planiranju demo stanja i istinitih potvrda lokalnih radnji.
- Izmijenjen je samo plan: nisu generisani aplikacija, baza ili testovi, nisu instalirane zavisnosti niti vršeno objavljivanje. Sljedeće je implementacija DEV-02 kada je korisnik naloži.

### 16. oktobar 2026. — Plan demoa bez baze: završna provjera

- ZEV-016 ZAVRŠENO: pregledani obim DEV-02, kriterijumi provjere i korisnikovog pregleda, granica prije DEV-03 i izuzetak od pune DEV-01 zavisnosti. Provjereni lokalni Markdown linkovi u šest izmijenjenih dokumenata, uključujući novi `pilot-specifikacija.md`; `git diff --check` prolazi.
- Nisu pokretani aplikacioni lint/typecheck/build jer aplikacija ne postoji; nisu pisani testovi. Ovo je provjera dokumentacije, bez vizuelne ili funkcionalne provjere demoa. Commit nije napravljen; ranije izmjene su sačuvane.
