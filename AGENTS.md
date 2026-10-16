# Glavne upute za agente — ZEV

## Svrha projekta

Razvijati jednostavnu aplikaciju za transparentno upravljanje zajednicom etažnih vlasnika u Republici Srpskoj. Početni pilot obuhvata jednu zgradu. Funkcionalnosti širiti postepeno, prema uputama korisnika i rezultatima pilota.

## Obavezno čitanje prije rada

Prije svakog zadatka pročitaj:

1. Ovaj fajl — `AGENTS.md`.
2. [Evidenciju napretka](docs/napredak.md) — šta je urađeno, trenutno stanje i sljedeći koraci.
3. [Minimalni plan](docs/minimalni-plan.md) — obim prve verzije.
   Pri tehničkom radu pročitaj i [prihvaćeni stack](docs/stack.md): Nx, pnpm, TypeScript, Next.js, Expo i Supabase. Nx zamjenjuje raniji prijedlog Turborepo-a.
4. [Razvojni plan](docs/razvojni-plan.md) — faze razvoja, zavisnosti, konkretni koraci, kriterijumi završetka i otvorene odluke.
5. [Istraživanje ZEV RS](docs/istrazivanje-zev-rs.md), kada zadatak uključuje pravila poslovanja, finansije, glasanje ili prava pristupa.

Provjeri stvarno stanje relevantnih fajlova i Git izmjena. Evidencija može biti nepotpuna nakon prekida; ne pretpostavljaj da zapisano ili planirano znači i implementirano.

## Obavezni skill za UI dizajn

Pri planiranju, implementaciji ili pregledu ekrana, komponenti, navigacije, formi, UI teksta, responzivnosti i pristupačnosti ZEV-a obavezno pročitaj i primijeni projektni skill [zev-ui-design](skills/zev-ui-design/SKILL.md). Koristi ga i kada ga korisnik ne navede izričito. Skill se učitava direktno preko ove putanje; ne oslanjaj se na to da se pojavljuje u globalnom katalogu skillova.

- Prati njegove [UI smjernice](skills/zev-ui-design/references/guidelines.md) i čitaj relevantne [primjere](skills/zev-ui-design/references/examples.md) prema zadatku. Appleovi principi služe jasnoći, kontroli i povjerenju, uz prilagođavanje web/PWA i kasnijim platformama.
- Razlikuj zvanične principe i standarde od lokalnih ZEV preporuka; konkretne boje, dimenzije i primjeri nisu Appleova obavezna pravila. Postojeći potvrđeni dizajn i posljednje upute korisnika imaju prednost.
- UI rezultat provjeri u odgovarajućem obimu i evidentiraj granice provjere. Čisto serverske, bazne ili infrastrukturne izmjene bez uticaja na UI ne zahtijevaju ovaj skill.

## Obavezno praćenje koraka

`docs/napredak.md` je centralna evidencija rada. Ažuriraj je u sklopu svakog zadatka koji mijenja projekat, dokumentaciju, odluke ili status rada.

- **Prije rada:** zabilježi zadatak, njegove konkretne korake i šta je trenutno u toku.
- **Nakon svakog značajnog koraka:** upiši rezultat, promijenjene fajlove i način provjere. Ne čekaj kraj dugog zadatka.
- **Prije završnog odgovora:** uskladi evidenciju sa stvarnim stanjem, navedi preostalo i sljedeći korak.
- **Nakon prekida ili greške:** pri nastavku provjeri djelimično izvršene radnje i popravi status prije daljeg rada.
- **Ako je rad blokiran:** napiši razlog i šta je potrebno za nastavak. Ne prikazuj pokušaj kao završen rezultat.

Koristi sljedeće statuse:

| Status | Značenje |
|---|---|
| PLANIRANO | Korak još nije započet |
| U TOKU | Rad je započet, ali rezultat nije završen |
| ZAVRŠENO | Rezultat postoji i provjeren je u odgovarajućem obimu |
| BLOKIRANO | Nastavak zavisi od konkretne dozvole, informacije ili spoljnog uslova |
| PAUZIRANO | Korisnik je zatražio zaustavljanje rada |
| OTKAZANO | Korak je napušten ili zamijenjen; razlog je zabilježen |

Svaki korak treba imati stabilnu oznaku, opis, status i napomenu o rezultatu ili prepreci. Nove korake dodaj bez prepisivanja istorije ranijih odluka.

## Šta upisivati u evidenciju

Za svaku značajnu promjenu zabilježi:

- Datum prema vremenskoj zoni Europe/Belgrade.
- Šta je traženo i šta je stvarno urađeno.
- Relevantne fajlove ili spoljne resurse.
- Izvršene provjere i njihov ishod; ako provjera nije izvršena, to jasno napiši.
- Nedovršene stavke, prepreke i sljedeći korak.

U istoriju dodaj novi zapis; ne briši prethodne zapise da bi promijenio prikaz napretka. Ispravke netačnog podatka označi kao ispravke. Ne upisuj lozinke, tokene, lične podatke stanara ili druge tajne.

## Pravila rada

- Prati posljednje upute korisnika i dogovoreni minimalni obim.
- Razvoj vodi prema `docs/razvojni-plan.md`: prati redoslijed faza DEV-01–DEV-10, njihove zavisnosti i kriterijume završetka. Prije početka odredi kojoj fazi zadatak pripada i provjeri stvarno stanje preduslova.
- U `docs/napredak.md` poveži razvojni zadatak sa oznakom odgovarajuće DEV faze i evidentiraj njen stvarni status, rezultate i provjere. Fazu označi završenom tek kada su ispunjeni njeni kriterijumi; djelimičan rezultat i preostale stavke navedi izričito.
- Otvorene odluke razriješi prije zavisnog koraka. Odstupanje od razvojnog plana obrazloži i uskladi plan i evidenciju prema posljednjim uputama korisnika; postojanje plana samo po sebi ne odobrava nastavak pauzirane izrade ili objavljivanje.
- Planiranje, implementaciju, provjeru i objavljivanje evidentiraj kao odvojene rezultate.
- Sama instalacija zavisnosti ili postavljanje početnog projekta ne znači da je aplikacija izrađena.
- Ne označavaj funkcionalnost kao završenu dok nije provjereno da radi; navedi granice provjere.
- Ne ponavljaj završene korake bez razloga. Ako ih ponavljaš zbog nove izmjene ili greške, zabilježi razlog.
- Ako se obim promijeni, ažuriraj plan i evidenciju tako da ostane jasno šta je dogovoreno, a šta samo predloženo.
- Ne nastavljaj pauziranu izradu niti objavljuj aplikaciju na osnovu same stavke „sljedeći korak“. Potrebna je instrukcija korisnika za nastavak.
- Završni odgovor treba kratko navesti rezultat, važna ograničenja i link do ažurirane evidencije kada je relevantna.

## Testovi

- Ne piši, ne generiši i ne dodaj testove dok korisnik to izričito ne naredi. Ovo važi za unit, integration, end-to-end i snapshot testove, kao i za automatsko generisanje testova pri kreiranju aplikacija ili biblioteka.
- Pri korišćenju generatora isključi generisanje testova gdje god je podržano. Ne dodaj testni framework ili testnu infrastrukturu bez izričitog naloga korisnika.
- Provjeru izmjena obavljaj pregledom koda, provjerom tipova, postojećim lint/build komandama i ručnom provjerom, prema zadatku. U evidenciji jasno navedi šta je provjereno; ove provjere ne predstavljaj kao napisane testove.

## Stil i organizacija koda

- Prednost daj čistim (pure) funkcijama: isti ulaz daje isti izlaz, bez mutiranja ulaznih podataka ili skrivenih sporednih efekata. Izračune, validaciju i transformacije podataka izdvajaj iz UI komponenti.
- Sporedne efekte, poput mrežnih zahtjeva, pristupa skladištu i izmjena baze, jasno odvoji od čistih poslovnih pravila.
- Koristi što manje `useEffect` poziva. Izvedene vrijednosti izračunavaj tokom renderovanja, a radnje nastale korisničkom interakcijom obrađuj u event handlerima. Efekte koristi kada je potrebna sinhronizacija sa spoljnim sistemom, uz ispravne zavisnosti i cleanup gdje je potreban.
- Piši male, granularne komponente sa jasnom odgovornošću i razumljivim props interfejsom. Veće ekrane sastavljaj od takvih komponenti; izbjegavaj komponente koje istovremeno upravljaju prikazom, obračunima, mrežom i svim stanjem ekrana.
- Grupisanje logike prilagodi funkcionalnosti: povezani kod drži zajedno, a po potrebi razdvoji domenska pravila, pristup podacima, validaciju, stanje i prikaz u odgovarajuće module ili Nx biblioteke. Ne uvodi apstrakcije samo radi povećanja broja fajlova.
- Koristi custom hookove za izdvajanje povezanog React stanja, ponašanja i ponovljive React logike. Obične izračune i transformacije ostavi u čistim funkcijama; hook koristi kada su potrebni React hookovi ili životni ciklus.
- Custom hookovi takođe treba da imaju jasnu odgovornost. Nemoj samo premjestiti veliku komponentu u jedan veliki hook niti skrivati nepotrebne `useEffect` pozive iza hooka.

## Trenutno ograničenje

Korisnik je nakon faze planiranja odobrio postavljanje Nx i pnpm workspace-a. Osnova je inicijalizovana u glavnom folderu repozitorijuma; komande su u `README.md`. Generisanje aplikacija, implementacija funkcionalnosti i objavljivanje čekaju narednu instrukciju korisnika. Za status ranije započetog projekta pogledaj `docs/napredak.md`.
