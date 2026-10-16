# Razvojni plan — ZEV pilot

Datum: 16. oktobar 2026. (Europe/Belgrade).

Status: razrađen prijedlog izvođenja na osnovu [minimalnog plana](minimalni-plan.md), [prihvaćenog stacka](stack.md) i [istraživanja](istrazivanje-zev-rs.md). Izrada ovog dokumenta ne pokreće implementaciju ili objavljivanje. Stvarni status izvršavanja vodi se u [evidenciji napretka](napredak.md).

## 1. Cilj i granice prve verzije

Isporučiti responzivnu web aplikaciju sa PWA pristupom za jednu zgradu. Predsjednik vodi evidenciju, a stanari imaju pregled zajedničkih finansija, dokumenata, radova i obavještenja, pristup sopstvenoj kartici, informativnim anketama i prijavama problema.

Web/PWA prije Expo aplikacije je predloženi redoslijed iz minimalnog plana, koji treba potvrditi pri početku implementacije. PWA instalacija ne podrazumijeva offline finansijske izmjene ili push obavještenja; oni nisu dio početnog obima.

Obavezno obuhvatiti svih pet cjelina minimalnog plana. U pilot ne ulaze bankovne integracije, online plaćanja, portal izvođača, upravljanje većim brojem zgrada kroz UI, naplata pretplate kroz aplikaciju, prodajni sajt i posebne Android/iOS aplikacije. Ankete nemaju dejstvo formalnih odluka skupštine. Aplikacija vodi operativnu evidenciju; zvanična računovodstvena predaja nije planirana.

## 2. Polazno stanje i način rada

- Nx/pnpm workspace je postavljen; `apps/` i `libs/` sadrže samo `.gitkeep` fajlove. Ne ponavljati inicijalizaciju workspace-a.
- Prihvaćeni su TypeScript, Next.js/React, Tailwind CSS i Supabase/PostgreSQL/Auth/Storage; Expo ostaje za kasnije.
- Verzije framework paketa, PWA rješenje, validaciona biblioteka, hosting, region baze i plan rezervnih kopija još nisu odabrani. Provjeriti aktuelnu kompatibilnost pri implementaciji; `@nx/*` držati usklađenim sa `nx`.
- Razvijati kompletne tokove od baze do ekrana, uz kontrolu pristupa u svakoj fazi. Ne ostavljati zaštitu podataka za kraj.
- Za UI zadatke primjenjivati projektni [zev-ui-design skill](../skills/zev-ui-design/SKILL.md), njegove smjernice i relevantne primjere. Konkretni vizuelni tokeni su početne ZEV preporuke; ne mijenjaju poslovni obim ili status DEV faza.
- Poslovne izračune i validaciju izdvajati u čiste funkcije; mrežu i upise odvojiti od prikaza. Koristiti male komponente i custom hookove jasne odgovornosti, uz minimalan `useEffect`.
- Ne pisati ili generisati testove, testni framework ili testnu infrastrukturu bez izričitog naloga korisnika. Provjere u ovom planu znače pregled koda, provjeru tipova, lint/build i ručne scenarije.
- Svaku fazu evidentirati u `napredak.md`: početak, značajni međurezultati, provjere, ograničenja i sljedeći korak. Planiranje, implementacija, provjera i objavljivanje imaju odvojene zapise.

## 3. Redoslijed i zavisnosti

Sve faze ispod imaju status **PLANIRANO**; nijedna nije započeta ovim zadatkom. Zavisnost znači da prethodni rezultat mora biti provjeren prije nastavka. Osnova workspace-a je već završena kao ZEV-010.

| ID | Faza / rezultat | Zavisnosti | Status |
|---|---|---|---|
| DEV-01 | Potvrđen pilot i specifikacija otvorenih pravila | Minimalni plan i postojeća dokumentacija | PLANIRANO |
| DEV-02 | Next.js aplikacija i razvojno okruženje | DEV-01 | PLANIRANO |
| DEV-03 | Baza, prijava, članstva i kontrola pristupa | DEV-02 | PLANIRANO |
| DEV-04 | Finansijska evidencija i sopstvena kartica | DEV-03 | PLANIRANO |
| DEV-05 | Radovi, ponude, napredak i povezane isplate | DEV-04 | PLANIRANO |
| DEV-06 | Oglasna tabla i prijave problema | DEV-03; povezivanje sa radovima nakon DEV-05 | PLANIRANO |
| DEV-07 | Informativne ankete i rezultati | DEV-03 | PLANIRANO |
| DEV-08 | Pregled zgrade, mobilni prikaz i PWA | DEV-04 do DEV-07 | PLANIRANO |
| DEV-09 | Završna provjera i priprema pilot izdanja | DEV-08 | PLANIRANO |
| DEV-10 | Odobreno objavljivanje, pilot i odluka o nastavku | DEV-09 i korisnikova instrukcija za objavljivanje | PLANIRANO |

Preporučeni radni redoslijed je DEV-01 → DEV-10. DEV-06 i DEV-07 nemaju tehničku zavisnost od finansija, ali se rade nakon osnovnog toka novca i radova kako bi se prvo provjerila glavna vrijednost proizvoda. Ova mogućnost ne podrazumijeva delegiranje ili paralelan rad agenata.

## 4. Razrada faza

### DEV-01 — Dogovor pravila pilota

**Koraci:**

1. Potvrditi jednu pilot zgradu, osobu koja vodi evidenciju i web/PWA redoslijed.
2. Definisati vezu korisnika, vlasnika i posebnog dijela, uključujući suvlasnike, više jedinica istog vlasnika, promjenu vlasništva i pristup zakupca. Uloga „stanar“ sama ne daje pristup finansijskoj kartici vlasnika.
3. Dogovoriti način prijave i pozivanja korisnika. Predloženi početak je pristup po pozivu, bez javnog učlanjenja u zgradu i bez samostalnog dodjeljivanja predsjedničke uloge.
4. Zapisati početni datum evidencije, stanje sredstava, početna dugovanja/avans, način mjesečnog zaduživanja, dospijeće, raspored uplata, zaokruživanje i postupak ispravke. Koristiti potvrđene odluke pilot ZEV-a; ne ugrađivati nepotvrđena pravna tumačenja.
5. Potvrditi pravila vidljivosti priloga, prijava i anketa, te operativne uslove hostinga i čuvanja podataka iz odjeljka 7.

**Kriterijum završetka:** odluke su zapisane, postoji matrica pristupa i primjer jednog mjesečnog obračuna sa očekivanim saldom. Otvoreno pitanje ima odgovornu osobu i označava fazu koju blokira. Planiranje drugih dijelova može se nastaviti, ali se zavisna funkcionalnost ne predstavlja kao spremna za pilot.

### DEV-02 — Web osnova

**Koraci:** generisati `apps/web` kroz odgovarajući Nx dodatak, uz isključeno generisanje testova; uključiti TypeScript i Tailwind CSS; postaviti osnovni raspored, navigaciju, forme i prikaze učitavanja, praznog stanja i greške. Dodati primjer konfiguracije bez tajni i dokumentovati lokalno pokretanje. Uvesti samo potrebne biblioteke i postojeće lint/typecheck/build targete prilagoditi aplikaciji.

**Kriterijum završetka:** web se lokalno pokreće, osnovna navigacija radi na telefonu i računaru, prolaze dostupni lint/typecheck/build targeti. Ovo je tehnička osnova, bez tvrdnje da poslovne funkcionalnosti rade.

### DEV-03 — Podaci, identitet i pristup

**Koraci:**

1. Kreirati Supabase migracije i sintetičke razvojne podatke za zgradu, posebne dijelove, vlasničke veze i članstva.
2. Implementirati prijavu, odjavu, prihvatanje poziva, istek/obnovu sesije i oporavak pristupa prema odabranom načinu prijave.
3. Omogućiti predsjedniku unos i ispravku podataka pilot zgrade, jedinica i ovlašćenih članstava; početnog predsjednika postavlja kontrolisana serverska/operativna procedura. Promjene ovlašćenja ostavljaju trag.
4. Uvesti RLS i serverske provjere vezane za zgradu i ulogu, te privatno skladište sa pravilima pristupa prilozima. Serverske tajne ostaju izvan klijentskog koda.
5. Postaviti obrazac audit evidencije za kasnije module: ko, kada i šta je promijenio, prethodna/nova vrijednost i razlog ispravke kada je potreban. Običan korisnik ne može mijenjati istoriju.

**Kriterijum završetka:** predsjednik i dva stanarska naloga imaju očekivani pristup; neprijavljeni korisnik nema pristup internim podacima; izmjena URL-a ili direktan zahtjev ne otvara tuđe podatke. Sintetička druga zgrada služi provjeri izolacije bez uvođenja upravljanja više zgrada u UI. Opozvano članstvo više ne omogućava čitanje podataka ni preuzimanje novih priloga.

### DEV-04 — Finansije

**Koraci:**

1. Napraviti unos i pregled prihoda/rashoda: datum, kategorija, svrha, iznos, autor i opcioni račun. Dodati filtere po periodu i kategoriji.
2. Uvesti početno stanje i ručno usaglašavanje sa bankom. Prikazati datum posljednjeg usaglašavanja i razliku, ako postoji; potraživanja prema vlasnicima ne računati kao novac na računu.
3. Implementirati zaduženja, uplate i raspored uplata na obaveze prema DEV-01. Za pilot predložiti ručno pokretanje mjesečnih zaduženja sa pregledom prije potvrde; ponavljanje potvrde ne smije duplirati obračun.
4. Prikazati sopstvenu karticu ovlašćenom vlasniku i sve kartice predsjedniku. Zajednički pregled i prilozi ne smiju posredno otkrivati pojedinačna dugovanja ili tuđe lične podatke.
5. Ispravke evidentirati storno/korektivnim zapisima sa razlogom i vezom na original, uz istoriju drugih izmjena. Novac čuvati precizno; upise i povezane izračune potvrđivati na serveru/u baznoj transakciji.

**Kriterijum završetka:** ručno provjeren primjer početnog stanja, mjesečnog zaduženja, djelimične i pune uplate, avansa, povrata, rashoda i ispravke daje dogovorene rezultate. Uplata vlasnika povećava sredstva jednom; raspored te uplate i zaduženje ne stvaraju dodatni prihod. Ponovljen zahtjev ne duplira finansijski upis, a stanar ne može upisivati transakcije ni čitati tuđu karticu ili njen prilog.

### DEV-05 — Radovi i ponude

**Koraci:** predsjednik otvara posao sa opisom i rokom za ponude, unosi/prilaže primljene ponude i evidentira izbor izvođača i ugovorenu cijenu. Dodati statuse rada, bilješke o napretku i veze na isplate iz finansija. Predloženi statusi su priprema, prikupljanje ponuda, ugovoreno, u toku, završeno i otkazano; potvrditi ih pri razradi ekrana.

**Kriterijum završetka:** stanar može uporediti ponude, vidjeti izabranog izvođača i napredak. Ponuđena cijena, ugovoreno i stvarno plaćeno prikazani su odvojeno. Dvije djelimične isplate daju tačan zbir iz finansijske evidencije bez ponovnog ručnog knjiženja. Izbor ponude i promjena ugovorenog iznosa imaju istoriju.

### DEV-06 — Oglasna tabla i prijave

**Koraci:** omogućiti predsjedniku objavu, izmjenu i arhiviranje obavještenja; stanaru pregled. Omogućiti prijavu problema sa opisom i opcionom fotografijom, pregled dozvoljenih prijava i promjenu statusa od strane predsjednika. Predloženi statusi su zaprimljeno, u obradi i riješeno. Ako prijava dovede do rada, povezati postojeće zapise. Provjeravati tip i veličinu priloga i omogućiti razumljiv ponovni pokušaj neuspjelog slanja.

**Kriterijum završetka:** objava se vidi ovlašćenim stanarima, a prijava prolazi od unosa fotografije do rješenja. Privatni prilozi i kontakt podaci prate dogovorenu vidljivost; prijava kvara nije prikazana kao zamjena za hitno kontaktiranje nadležne osobe.

### DEV-07 — Informativne ankete

**Koraci:** predsjednik otvara i zatvara anketu sa pitanjem, opcijama i rokom; stanar šalje odgovor i vidi dozvoljene rezultate. U DEV-01 odabrati pravilo učestvovanja i trenutak vidljivosti rezultata. Predloženi pilot je jedan odgovor po aktivnom korisničkom članstvu u zgradi, uz izmjenu do zatvaranja; to pravilo nije zakonski glas vlasnika. Pitanje/opcije zaključati nakon prvog odgovora ili anketu zamijeniti novom uz očuvanje istorije.

**Kriterijum završetka:** nema duplih odgovora istog učesnika, nakon zatvaranja nema novih izmjena, zbir odgovara evidentiranim odgovorima. Na anketi i rezultatima jasno piše da je informativna; ne prikazuju se pravni kvorum ili usvojena odluka skupštine.

### DEV-08 — Pregled zgrade i PWA

**Koraci:** povezati stanje sredstava i datum usaglašavanja, posljednje troškove, aktivne radove i obavještenja na početnom ekranu. Dodati pristup sopstvenoj kartici bez otkrivanja tuđih podataka. Dovršiti responzivni prikaz, navigaciju tastaturom, oznake formi, čitljivost i stanja greške. Dodati manifest, ikone i odabranu PWA implementaciju.

**Kriterijum završetka:** zbirni podaci odgovaraju izvornim modulima; osnovni tokovi su upotrebljivi na telefonu i računaru. Instalacija se ručno provjerava na dogovorenim Android/iOS uređajima i podržanim browserima, uz zabilježena ograničenja. Pri prekidu veze korisnik vidi jasno stanje, bez lažne potvrde upisa; osjetljivi odgovori i dokumenti ne ostaju dostupni sljedećem korisniku kroz PWA keš nakon odjave.

### DEV-09 — Provjera i priprema izdanja

**Koraci:** proći cjelovit mjesečni scenario sa sintetičkim podacima i jedan posao od ponude do isplate; ponoviti matricu pristupa na stvarnim modulima i prilozima. Izvršiti lint/typecheck/build, pregledati migracije i serverske tajne, provjeriti greške i duple zahtjeve. Dokumentovati uvoz početnih podataka, rezervne kopije baze i fajlova, obnovu, podršku i povratak na prethodno izdanje. U odvojenom okruženju provjeriti migracije i obnovu kopije; pripremiti kratka uputstva za obje uloge.

**Kriterijum završetka:** svih pet cjelina ima zapis o ručnoj provjeri; nema poznate greške koja otkriva tuđe podatke ili narušava saldo. Provjeren je povrat baze i pripadajućih dokumenata u odgovarajućem obimu. Postoje spisak ograničenja, operativni postupak i konkretno izdanje spremno za korisnikov pregled. Rezultat ove faze je pripremljeno izdanje; aplikacija još nije objavljena za pilot.

### DEV-10 — Objavljivanje i pilot

**Koraci:** nakon korisnikove instrukcije objaviti provjereno izdanje na dogovorenom hostingu, provjeriti produkcionu konfiguraciju i pristup, unijeti potvrđene početne podatke te pozvati pilot korisnike. Provjeriti ključne tokove u objavljenom izdanju. Voditi pilot najmanje jedan puni mjesečni obračun i jedan stvarni posao održavanja. Evidentirati podršku, greške i povratne informacije bez unošenja ličnih podataka u repozitorijum.

**Kriterijum završetka:** predsjednik je završio mjesečnu evidenciju i usaglašavanje; stanari su mogli provjeriti svoja zaduženja/uplate, zajedničke troškove i radove; stvarni posao ima ponude, ugovoreni iznos i isplate. Zabilježeni su nalazi i odluka šta popraviti, nastaviti ili odložiti. Samo postavljanje aplikacije ne znači završen pilot.

## 5. Predložena tehnička podjela

| Lokacija | Odgovornost |
|---|---|
| `apps/web` | Next.js ekrani, mali UI moduli, web sesija i Route Handlers za potrebne serverske operacije |
| `libs/domain` | Čiste funkcije za novac, kartice, obračun i dozvoljene prelaze statusa |
| `libs/contracts` | Zajednički tipovi i validacija granica sistema |
| `libs/api-client` | Zajednički pristup API-ju kada postoji stvarna potreba za izdvajanjem |
| `libs/config` | Zajednička razvojna podešavanja kada su potrebna |
| `supabase/migrations` | Verzionisana šema, ograničenja, RLS i bazne operacije |
| `docs` | Odluke, razvojni plan, ručni scenariji i evidencija rezultata |

Biblioteke nastaju postepeno, kada ih konkretan tok zahtijeva. Ne kreirati prazne aplikacije `mobile`, `website` ili `admin`. Klijentske biblioteke ne smiju izvoziti serverske tajne ili privilegovani pristup bazi.

Predložene grupe podataka za razradu šeme su: zgrade i jedinice; vlasničke veze i članstva sa periodom važenja; zaduženja, uplate, raspored uplata, transakcije i usaglašavanja; radovi, ponude i veze na isplate; obavještenja; prijave; ankete, opcije i odgovori; prilozi i istorija promjena. Ovo nije završena šema. Početne vrijednosti i prikaz istorije pri promjeni vlasnika moraju biti definisani prije unosa stvarnih podataka.

## 6. Minimalna matrica pristupa za razradu

| Podatak / radnja | Predsjednik svoje zgrade | Stanar sa aktivnim članstvom |
|---|---|---|
| Zajedničke finansije i dozvoljeni prilozi | Pregled i upis | Pregled |
| Pojedinačne kartice i privatni prilozi uplata | Sve kartice zgrade | Samo kartice za koje ima potvrđeno ovlašćenje |
| Jedinice i članstva | Upravljanje u okviru dozvoljenog ovlašćenja | Bez upravljanja i opšteg imenika ličnih podataka |
| Radovi i ponude | Pregled i upis | Pregled dozvoljenih podataka |
| Obavještenja | Objavljivanje i izmjene | Pregled |
| Prijave problema | Pregled i obrada | Slanje i pregled sopstvenih; zajednički pregled samo ako se dogovori |
| Ankete | Kreiranje/zatvaranje i dozvoljeno učestvovanje | Učestvovanje i dozvoljeni rezultati |
| Istorija promjena | Pregled u okviru postojećih prava | Samo istorija podataka kojima već ima pristup |

Ni predsjednik nema pristup drugoj zgradi bez odgovarajućeg članstva. Audit zapis ne smije zaobići privatnost tako što prethodne vrijednosti tuđe kartice postanu vidljive. Pravo na pristup prilogu provjerava se prema njegovoj namjeni, a ne samo prema prijavljenoj sesiji.

## 7. Otvorene odluke i uslovi

| Odluka | Kada mora biti riješena | Početni prijedlog / ograničenje |
|---|---|---|
| Redoslijed web/PWA → Expo | Prije DEV-02 | Prvo potvrditi web pilot; Expo poslije ocjene pilota |
| Prijava i dodjela ovlašćenja | Prije završetka DEV-03 | Poziv i kontrolisana dodjela članstva; potvrditi email i oporavak pristupa |
| Vlasnici, suvlasnici, zakupci i promjene vlasništva | Prije završetka DEV-03/04 | Evidentirati period i ovlašćenje; pristup ne zaključivati iz broja stana |
| Obračun i početni saldi | Prije DEV-04 | Primjeri iz potvrđenih podataka i odluka zgrade; pravne/računovodstvene nedoumice posebno provjeriti |
| Vidljivost dokumenata, prijava i rezultata anketa | Prije odgovarajućeg modula | Privatni prilozi; najmanji potreban pristup |
| Framework verzije, validacija i PWA rješenje | Pri DEV-02 i DEV-08 | Provjeriti zvaničnu dokumentaciju i kompatibilnost pri izboru |
| Hosting, region baze, trošak i operativni pristupi | Prije kreiranja odgovarajućih udaljenih resursa | Zapisati izbor i odgovornu osobu; ne pretpostavljati kupovinu usluga |
| Čuvanje podataka, kopije, obnova i podrška | Prije DEV-09/10 | Obuhvatiti bazu i Storage, prihvatljiv gubitak podataka i rok oporavka |
| Instrukcija za implementaciju / objavljivanje | Prije početka izrade / DEV-10 | Ovaj zahtjev odobrava razvojni plan; dalji rad čeka instrukciju |

Postojeće istraživanje je ulaz u specifikaciju, a njegove otvorene pravne provjere ostaju otvorene. Plan ne proširuje obim na formalno glasanje, automatsku zakonsku raspodjelu ili zvanično računovodstvo.

## 8. Procjena i praćenje vrijednosti

Kalendarski rok se ne zaključava dok DEV-01 ne razriješi pravila obračuna, pristup i operativne uslove. Najveće tehničke neizvjesnosti su finansijske korekcije i početna stanja, vlasnički pristup i privatnost priloga. Nakon DEV-01/02 procijeniti trud po fazama, a nakon DEV-04 ažurirati procjenu prema stvarno završenom toku.

Na početku i na kraju pilota prikupiti uporedive podatke: broj aktivnih korisnika u odnosu na pozvane, vrijeme predsjednika za mjesečnu evidenciju, broj pitanja o novcu/radovima, razumljivost troškova i dokumenata i spremnost ZEV-a da plaća nastavak. Metod i ciljne vrijednosti dogovoriti sa pilot zgradom; ne pretpostavljati uspjeh samo zato što je aplikacija dostupna.

Nakon pilota prvo riješiti utvrđene probleme. Cijenu i nastavak pretplate potvrditi razgovorima; širenje na druge zgrade, Expo i ostale kasnije funkcionalnosti planirati zasebno prema rezultatima.

## 9. Sljedeći konkretan korak

Kada korisnik zatraži nastavak, početi sa DEV-01: potvrditi otvorena pravila i zapisati odluke. Zatim generisati `apps/web` u DEV-02, bez testova. Do tada je rezultat ovog zadatka razvojni plan, bez promjene aplikacionog koda i bez objavljivanja.
