# Glavne upute za agente — ZEV

## Svrha projekta

Razvijati jednostavnu aplikaciju za transparentno upravljanje zajednicom etažnih vlasnika u Republici Srpskoj. Početni pilot obuhvata jednu zgradu. Funkcionalnosti širiti postepeno, prema uputama korisnika i rezultatima pilota.

## Obavezno čitanje prije rada

Prije svakog zadatka pročitaj:

1. Ovaj fajl — `AGENTS.md`.
2. [Evidenciju napretka](docs/napredak.md) — šta je urađeno, trenutno stanje i sljedeći koraci.
3. [Minimalni plan](docs/minimalni-plan.md) — obim prve verzije.
4. [Istraživanje ZEV RS](docs/istrazivanje-zev-rs.md), kada zadatak uključuje pravila poslovanja, finansije, glasanje ili prava pristupa.

Provjeri stvarno stanje relevantnih fajlova i Git izmjena. Evidencija može biti nepotpuna nakon prekida; ne pretpostavljaj da zapisano ili planirano znači i implementirano.

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
- Planiranje, implementaciju, provjeru i objavljivanje evidentiraj kao odvojene rezultate.
- Sama instalacija zavisnosti ili postavljanje početnog projekta ne znači da je aplikacija izrađena.
- Ne označavaj funkcionalnost kao završenu dok nije provjereno da radi; navedi granice provjere.
- Ne ponavljaj završene korake bez razloga. Ako ih ponavljaš zbog nove izmjene ili greške, zabilježi razlog.
- Ako se obim promijeni, ažuriraj plan i evidenciju tako da ostane jasno šta je dogovoreno, a šta samo predloženo.
- Ne nastavljaj pauziranu izradu niti objavljuj aplikaciju na osnovu same stavke „sljedeći korak“. Potrebna je instrukcija korisnika za nastavak.
- Završni odgovor treba kratko navesti rezultat, važna ograničenja i link do ažurirane evidencije kada je relevantna.

## Trenutno ograničenje

Korisnik je zaustavio izradu aplikacije i zatražio planiranje i dokumentaciju. Kreiranje ovog fajla nije dozvola za nastavak razvoja ili objavljivanje. Za status ranije započetog projekta pogledaj `docs/napredak.md`.
