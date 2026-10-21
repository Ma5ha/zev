# Razvojni plan — ZEV pilot

Datum: 16. oktobar 2026. (Europe/Belgrade).

Status: razrađen prijedlog izvođenja na osnovu [minimalnog plana](minimalni-plan.md), [prihvaćenog stacka](stack.md) i [istraživanja](istrazivanje-zev-rs.md). Izrada ovog dokumenta ne pokreće implementaciju ili objavljivanje. Stvarni status izvršavanja vodi se u [evidenciji napretka](napredak.md).

## 1. Cilj i granice prve verzije

Prvo pripremiti interaktivni responzivni web demo sa javnom landing stranicom i aplikacijom sa sintetičkim podacima, bez inicijalizacije baze, Supabase projekta ili stvarne prijave. Nakon korisnikovog pregleda demoa slijede odluka o nastavku, backend i stvarni pilot jedne zgrade. Predsjednik vodi evidenciju, a stanari imaju pregled zajedničkih finansija, dokumenata, radova i obavještenja, pristup sopstvenoj kartici, informativnim anketama i prijavama problema.

Korisnik je potvrdio prvo web sa landing stranicom, zatim zasebne Android/iOS aplikacije kroz Expo. PWA instalacija nije kriterijum prve verzije. Potvrđeni su tenant pristup i uloge prema pravilima ZEV-a; radni model je jedan ZEV po tenantu, uz odvojena članstva, funkcije i dozvole.

Obavezno obuhvatiti svih pet cjelina minimalnog plana. U pilot ne ulaze bankovne integracije, online plaćanja, portal izvođača, upravljanje većim brojem zgrada kroz UI, naplata pretplate kroz aplikaciju i posebne Android/iOS aplikacije. Ankete nemaju dejstvo formalnih odluka skupštine. Aplikacija vodi operativnu evidenciju; zvanična računovodstvena predaja nije planirana.

## 2. Polazno stanje i način rada

- Nx/pnpm workspace je postavljen; `apps/web` sada sadrži tehničku web osnovu DEV-02-B, dok `libs/` još sadrži samo `.gitkeep`. Ne ponavljati inicijalizaciju workspace-a.
- Prihvaćeni su TypeScript, Next.js/React, Tailwind CSS i Supabase/PostgreSQL/Auth/Storage; Expo ostaje za kasnije.
- Verzije framework paketa, validaciona biblioteka, hosting, region baze i plan rezervnih kopija još nisu odabrani. Provjeriti aktuelnu kompatibilnost pri implementaciji; `@nx/*` držati usklađenim sa `nx`.
- DEV-02 prvo razvija lokalne demo tokove bez baze. Od DEV-03 razvijati kompletne tokove od baze do ekrana, uz kontrolu pristupa u svakoj fazi. Demo prikazi uloga ne dokazuju zaštitu stvarnih podataka.
- Za UI zadatke primjenjivati projektni [zev-ui-design skill](../skills/zev-ui-design/SKILL.md), njegove smjernice i relevantne primjere. Konkretni vizuelni tokeni su početne ZEV preporuke; ne mijenjaju poslovni obim ili status DEV faza.
- Poslovne izračune i validaciju izdvajati u čiste funkcije; mrežu i upise odvojiti od prikaza. Koristiti male komponente i custom hookove jasne odgovornosti, uz minimalan `useEffect`.
- Ne pisati ili generisati testove, testni framework ili testnu infrastrukturu bez izričitog naloga korisnika. Provjere u ovom planu znače pregled koda, provjeru tipova, lint/build i ručne scenarije.
- Svaku fazu evidentirati u `napredak.md`: početak, značajni međurezultati, provjere, ograničenja i sljedeći korak. Planiranje, implementacija, provjera i objavljivanje imaju odvojene zapise.

## 3. Redoslijed i zavisnosti

Odluke i prijedlozi DEV-01 vode se u [specifikaciji pilota](pilot-specifikacija.md). Potvrđeni su sintetički demo, obračun po m² i ručni unos roka plaćanja. Platforma je potvrđena: web sa landing stranicom, zatim mobilne aplikacije. Korisnik navodi završen DEV-01; dokumentacija još ostavlja prijavu i detaljnu matricu ZEV uloga za backend. DEV-02 ima završene specifikaciju A, web osnovu B i demo kontekst C; DEV-03–DEV-10 su **PLANIRANO**. Zavisnost znači da prethodni rezultat mora biti provjeren prije nastavka. Osnova workspace-a je već završena kao ZEV-010.

| ID | Faza / rezultat | Zavisnosti | Status |
|---|---|---|---|
| DEV-01 | Potvrđen pilot i specifikacija otvorenih pravila | Minimalni plan i postojeća dokumentacija | U TOKU |
| DEV-02 | Interaktivni web demo bez baze i korisnikov pregled | Potvrđen demo obim iz DEV-01 | U TOKU — A–I završeni u demo obimu; naknadne vizuelne dorade nezaključene, preostali K-B–K-E pauzirani na korisnikov zahtjev. |
| DEV-03 | Baza, prijava, članstva i kontrola pristupa | Pregledan demo i potvrđene osnovne odluke; odobren lokalni početak | U TOKU — A–D lokalno provjereni; E pregled kriterijuma, korisnikov ishod C/D i operativni uslovi otvoreni |
| DEV-04 | Finansijska evidencija i sopstvena kartica | DEV-03 | PLANIRANO |
| DEV-05 | Radovi, ponude, napredak i povezane isplate | DEV-04 | PLANIRANO |
| DEV-06 | Oglasna tabla i prijave problema | DEV-03; povezivanje sa radovima nakon DEV-05 | PLANIRANO |
| DEV-07 | Informativne ankete i rezultati | DEV-03 | PLANIRANO |
| DEV-08 | Pregled zgrade i responzivni web prikaz | DEV-04 do DEV-07 | PLANIRANO |
| DEV-09 | Završna provjera i priprema pilot izdanja | DEV-08 | PLANIRANO |
| DEV-10 | Odobreno objavljivanje, pilot i odluka o nastavku | DEV-09 i korisnikova instrukcija za objavljivanje | PLANIRANO |

Redoslijed je: potvrđeni demo obim DEV-01 → DEV-02 demo bez baze → korisnikov pregled i dorade → preostale odluke DEV-01 → odobreni DEV-03 → DEV-04–DEV-10. Ovo je namjerna izmjena ranije pune zavisnosti DEV-02 od DEV-01: odluke o stvarnoj prijavi, pravima i pilot zgradi razrađuju se kroz pregled demoa i rješavaju prije zavisnog backend koraka. DEV-01 ostaje U TOKU dok njegovi kriterijumi nisu ispunjeni. DEV-06 i DEV-07 nemaju tehničku zavisnost od finansija, ali se rade nakon osnovnog toka novca i radova kako bi se prvo provjerila glavna vrijednost proizvoda. Ova mogućnost ne podrazumijeva delegiranje ili paralelan rad agenata.

## 4. Razrada faza

### DEV-01 — Dogovor pravila pilota

**Koraci:**

1. Potvrditi jednu pilot zgradu, osobu koja vodi evidenciju i web → mobilne aplikacije redoslijed.
2. Definisati vezu korisnika, vlasnika i posebnog dijela, uključujući suvlasnike, više jedinica istog vlasnika, promjenu vlasništva i pristup zakupca. Uloga „stanar“ sama ne daje pristup finansijskoj kartici vlasnika.
3. Dogovoriti način prijave i pozivanja korisnika. Predloženi početak je pristup po pozivu, bez javnog učlanjenja u zgradu i bez samostalnog dodjeljivanja predsjedničke uloge.
4. Zapisati početni datum evidencije, stanje sredstava, početna dugovanja/avans, način mjesečnog zaduživanja, dospijeće, raspored uplata, zaokruživanje i postupak ispravke. Koristiti potvrđene odluke pilot ZEV-a; ne ugrađivati nepotvrđena pravna tumačenja.
5. Potvrditi pravila vidljivosti priloga, prijava i anketa, te operativne uslove hostinga i čuvanja podataka iz odjeljka 7.

**Kriterijum završetka:** odluke su zapisane, postoji matrica pristupa i primjer jednog mjesečnog obračuna sa očekivanim saldom. Otvoreno pitanje ima odgovornu osobu i označava fazu koju blokira. Planiranje drugih dijelova može se nastaviti, ali se zavisna funkcionalnost ne predstavlja kao spremna za pilot.

### DEV-02 — Interaktivni web demo bez baze

**Cilj:** korisnik može lokalno pregledati i isprobati kako proizvod izgleda i kako su cjeline povezane, prije postavljanja backend infrastrukture.

**Koraci:**

1. Generisati `apps/web` odgovarajućim Nx dodatkom, sa TypeScriptom i Tailwind CSS-om, uz isključeno generisanje testova. Dokumentovati lokalno pokretanje bez backend ključeva.
2. Izraditi landing stranicu i ulaz u jasno označeni demo. Pripremiti navigaciju kroz svih pet cjelina: pregled zgrade, finansije/kartica, radovi/ponude, obavještenja, ankete/prijave.
3. Pripremiti lokalne sintetičke podatke i dva demo tenant primjera za poređenje konteksta, bez proširenog upravljanja više zgrada. Dodati izbor demo uloge/funkcije sa eksplicitno opisanim privremenim dozvolama. Neriješena prava iz DEV-01 ne prikazivati kao potvrđena pravila.
4. Omogućiti lokalno isprobavanje ključnih radnji: trošak ili uplata sa promjenom pregleda, primjer zaduženja po m² sa ručnim rokom, pregled ponuda i promjena statusa rada, objava obavještenja, odgovor na informativnu anketu i prijava problema. Prilozi su primjeri ili lokalni pregled fajla, bez uploada na udaljeni servis.
5. Demo izmjene čuvati u memoriji sesije aplikacije; osvježavanje vraća početne podatke. Dodati radnju vraćanja početnog demoa i jasno objašnjenje trajanja izmjena. Za ovaj korak nije potrebna trajna lokalna pohrana.
6. Izdvojiti sintetičke podatke i demo pristup podacima od prikaza; poslovne izračune držati u čistim funkcijama. Pripremiti jednostavnu granicu za kasniji stvarni pristup podacima, bez prerane implementacije backend sloja.
7. Primijeniti `zev-ui-design`: responzivni raspored, tastatura, označene forme, prazna stanja, validacija i prikaz greške. Potvrda radnje navodi da je izmijenjen demo, bez obećanja stvarnog knjiženja, prijave ili slanja.
8. Izvršiti postojeće/dostupne lint, typecheck i build provjere, ručno pregledati telefon i računar te evidentirati ograničenja. Pripremiti korisniku demo za pregled, zabilježiti povratne informacije i potrebne dorade.

**Granice:** ne inicijalizovati bazu, Supabase lokalno ili udaljeno okruženje, migracije, Auth, RLS ili Storage. Nema stvarnih naloga, email poziva, ličnih podataka ili produkcionih upisa. Tenant i role prekidači služe simulaciji prikaza; stvarna autorizacija je DEV-03. Ne dodavati testove bez korisnikovog izričitog naloga.

**Kriterijumi implementacije i provjere:** landing otvara demo; svih pet cjelina je dostupno; navedene lokalne radnje ažuriraju odgovarajući demo prikaz; promjena demo tenanta ne miješa njegove sintetičke zapise; uloge imaju razumljiv simulirani prikaz; reset i osvježavanje vraćaju početno stanje. Demo se pokreće bez baze, backend ključeva i backend mrežnih poziva. Prolaze dostupne lint/typecheck/build provjere; ručni pregled dokumentuje širine, scenarije i ograničenja. To je provjeren demo, bez tvrdnje da produkcione funkcionalnosti ili zaštita rade.

**Kriterijum završetka faze:** implementacija i navedene provjere postoje, korisnik je pregledao demo, povratne informacije i ishod su evidentirani. Dostavljanje demoa samo po sebi ne znači korisnikovo prihvatanje ili instrukciju za DEV-03. Backend se pokreće nakon eksplicitne instrukcije korisnika i razrješenja njegovih preduslova; objavljivanje se odobrava zasebno.

#### Predložene podfaze DEV-02

Podjela od 16. oktobra 2026, prihvaćena korisnikovom instrukcijom za nastavak sa DEV-02-A. Podfaze razrađuju postojeći obim; A je specifikacija, a B–I obuhvataju izradu, provjeru i pregled. Rezultat A vodi se u [specifikaciji demoa](demo-specifikacija.md), a statusi i provjere u [evidenciji](napredak.md). A–F su završene; G–I slijede prema evidenciji i korisnikovoj instrukciji. Oznake DEV-03–DEV-10 ostaju nepromijenjene.

| ID | Podfaza | Rezultat i kriterijum završetka | Zavisnost |
|---|---|---|---|
| DEV-02-A | Specifikacija ekrana i demo scenarija | Popis ekrana, glavnih radnji, navigacije i privremenih dozvola; označene demo pretpostavke i očekivani ishodi. Pregledano prema UI skillu i postojećem obimu. | Potvrđeni demo obim DEV-01 |
| DEV-02-B | Tehnička web osnova | `apps/web` sa Next.js, TypeScriptom i Tailwindom, osnovnim UI tokenima i komponentama. Lokalno pokretanje, dostupne lint/typecheck/build provjere i README rade bez backend ključeva; testovi se ne generišu. | A |
| DEV-02-C | Demo podaci, kontekst i stanje | Dva sintetička tenanta, izbor demo uloge/funkcije, opis privremenih dozvola i podaci odvojeni od prikaza. Ručno provjereni promjena konteksta bez miješanja prikaza, lokalna promjena, reset i osvježavanje na početno stanje. | B |
| DEV-02-D | Landing, navigacija i početni pregled | Landing vodi do jasno označenog demoa; svih pet cjelina dostupno kroz responzivni okvir. Početni pregled čita zajedničke demo podatke, uz kasnije povezivanje radnji iz E–G. Ručno provjereni ulaz, navigacija i vidljiv tenant/role kontekst. | C |
| DEV-02-E | Finansijski demo | Trošak, uplata, kartica i primjer zaduženja po m² sa ručnim rokom. Čisti izračuni i promjene u memoriji osvježavaju pregled; ručno provjeren sintetički mjesečni primjer, odvojena sredstva/dug/avans i prikaz prema demo dozvolama. | D |
| DEV-02-F | Demo radova i ponuda | Pregled i poređenje ponuda, izabrani izvođač, ugovoreni iznos, promjena statusa i prikaz povezanih demo isplata. Ručno provjeren tok i odvojeni iznosi ponuđeno/ugovoreno/plaćeno. | E |
| DEV-02-G | Obavještenja, prijave i ankete | Lokalna objava obavještenja, prijava problema sa opcionim lokalnim pregledom fotografije i odgovor na informativnu anketu. Ručno provjerene promjene i relevantna validaciona/prazna stanja; bez udaljenog uploada i formalnog glasanja. | F, radi dogovorenog redoslijeda |
| DEV-02-H | Cjelovita provjera i dorade | Pregled povezan sa svim modulima; provjereni ključni tokovi, reset, uloge/tenanti, uski i široki prikaz, tastatura, fokus, povećan tekst, kontrast i relevantna stanja. Izvršene dostupne lint/typecheck/build komande; nalazi, ispravke i granice provjere zapisani. | E–G |
| DEV-02-I | Korisnikov pregled i zaključak | Demo i kratki scenariji dostavljeni korisniku; nakon stvarnog pregleda evidentirani povratne informacije, dogovorene dorade i njihov ishod. DEV-02 se završava prema kriterijumu iznad. | H |

Responzivnost, pristupačnost i provjera svakog toka rade se kroz B–G; H provjerava povezanu cjelinu. Kontrolne tačke za pregled su D (izgled i navigacija), E (novac i kartica) i I (cijeli demo). Tehničko postavljanje B nije završen demo. Podfaze E–G prikazuju lokalne simulacije i ne završavaju produkcione DEV-04–DEV-08. Za DEV-03 i objavljivanje ostaju postojeći odvojeni uslovi.

### DEV-03 — Podaci, identitet i pristup

**Preduslov:** korisnik je pregledao demo DEV-02 i dao instrukciju za backend; potvrđeni su način prijave, tenant granica i potrebna matrica dozvola iz DEV-01.

**Koraci:**

1. Kreirati Supabase migracije i sintetičke razvojne podatke za tenant, zgradu, posebne dijelove, vlasničke veze i članstva. Razdvojiti funkcije ZEV-a od dozvola aplikacije prema odjeljku 6 specifikacije pilota; konačnu matricu potvrditi prije dodjele prava.
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

### DEV-08 — Pregled zgrade i responzivni web

**Koraci:** povezati stanje sredstava i datum usaglašavanja, posljednje troškove, aktivne radove i obavještenja na početnom ekranu. Dodati pristup sopstvenoj kartici bez otkrivanja tuđih podataka. Dovršiti responzivni prikaz, navigaciju tastaturom, oznake formi, čitljivost i stanja greške. Provjeriti dosljedan kontekst aktivnog tenanta i uloge u internim tokovima.

**Kriterijum završetka:** zbirni podaci odgovaraju izvornim modulima; osnovni tokovi su upotrebljivi na telefonu i računaru. Web prikaz se ručno provjerava na dogovorenim širinama i podržanim browserima, uz zabilježena ograničenja; instalacija posebnih mobilnih aplikacija pripada kasnijoj fazi. Pri prekidu veze korisnik vidi jasno stanje, bez lažne potvrde upisa; osjetljivi odgovori i dokumenti ne ostaju dostupni sljedećem korisniku kroz keš nakon odjave.

### DEV-09 — Provjera i priprema izdanja

**Koraci:** proći cjelovit mjesečni scenario sa sintetičkim podacima i jedan posao od ponude do isplate; ponoviti matricu pristupa na stvarnim modulima i prilozima. Izvršiti lint/typecheck/build, pregledati migracije i serverske tajne, provjeriti greške i duple zahtjeve. Dokumentovati uvoz početnih podataka, rezervne kopije baze i fajlova, obnovu, podršku i povratak na prethodno izdanje. U odvojenom okruženju provjeriti migracije i obnovu kopije; pripremiti kratka uputstva za obje uloge.

**Kriterijum završetka:** svih pet cjelina ima zapis o ručnoj provjeri; nema poznate greške koja otkriva tuđe podatke ili narušava saldo. Provjeren je povrat baze i pripadajućih dokumenata u odgovarajućem obimu. Postoje spisak ograničenja, operativni postupak i konkretno izdanje spremno za korisnikov pregled. Rezultat ove faze je pripremljeno izdanje; aplikacija još nije objavljena za pilot.

### DEV-10 — Objavljivanje i pilot

**Koraci:** nakon korisnikove instrukcije objaviti provjereno izdanje na dogovorenom hostingu, provjeriti produkcionu konfiguraciju i pristup, unijeti potvrđene početne podatke te pozvati pilot korisnike. Provjeriti ključne tokove u objavljenom izdanju. Voditi pilot najmanje jedan puni mjesečni obračun i jedan stvarni posao održavanja. Evidentirati podršku, greške i povratne informacije bez unošenja ličnih podataka u repozitorijum.

**Kriterijum završetka:** predsjednik je završio mjesečnu evidenciju i usaglašavanje; stanari su mogli provjeriti svoja zaduženja/uplate, zajedničke troškove i radove; stvarni posao ima ponude, ugovoreni iznos i isplate. Zabilježeni su nalazi i odluka šta popraviti, nastaviti ili odložiti. Samo postavljanje aplikacije ne znači završen pilot.

## 5. Predložena tehnička podjela

| Lokacija | Odgovornost |
|---|---|
| `apps/web` | Javna landing stranica, sintetički demo, Next.js ekrani, mali UI moduli, web sesija i Route Handlers za potrebne serverske operacije |
| `libs/domain` | Čiste funkcije za novac, kartice, obračun i dozvoljene prelaze statusa |
| `libs/contracts` | Zajednički tipovi i validacija granica sistema |
| `libs/api-client` | Zajednički pristup API-ju kada postoji stvarna potreba za izdvajanjem |
| `libs/config` | Zajednička razvojna podešavanja kada su potrebna |
| `supabase/migrations` | Verzionisana šema, ograničenja, RLS i bazne operacije |
| `docs` | Odluke, razvojni plan, ručni scenariji i evidencija rezultata |

U DEV-02 demo podaci i lokalne promjene ostaju odvojeni od UI-ja; `supabase/migrations` i stvarni API nastaju tek od DEV-03. Demo ekrani se mogu ponovo koristiti, ali njihovo postojanje ne završava DEV-04–DEV-08. Biblioteke nastaju postepeno, kada ih konkretan tok zahtijeva. Landing i app za početak držati u `apps/web`. Ne kreirati prazne aplikacije `mobile`, `website` ili `admin`. Klijentske biblioteke ne smiju izvoziti serverske tajne ili privilegovani pristup bazi.

Predložene grupe podataka za razradu šeme su: zgrade i jedinice; vlasničke veze i članstva sa periodom važenja; zaduženja, uplate, raspored uplata, transakcije i usaglašavanja; radovi, ponude i veze na isplate; obavještenja; prijave; ankete, opcije i odgovori; prilozi i istorija promjena. Ovo nije završena šema. Početne vrijednosti i prikaz istorije pri promjeni vlasnika moraju biti definisani prije unosa stvarnih podataka.

## 6. Minimalna matrica pristupa za razradu

Ranija podjela predsjednik/stanar ispod je operativni nacrt. Prema naknadnoj korisnikovoj instrukciji konačna matrica mora odvojiti funkcije vlasnika/člana skupštine, predsjednika skupštine, članova i predsjednika upravnog odbora, upravnika i zastupnika od konkretnih dozvola. Detalji i granice su u [specifikaciji](pilot-specifikacija.md); naziv funkcije ne dodjeljuje automatski sve dozvole prvog stupca.

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
| Redoslijed web → Expo i landing | Potvrđeno u DEV-01 | Prvo web primjer sa landing stranicom i aplikacijom; posebne mobilne aplikacije kasnije |
| Prijava i dodjela ovlašćenja | Prije zavisnog koraka DEV-03; ne blokira DEV-02 demo | Poziv i kontrolisana dodjela članstva; potvrditi email i oporavak pristupa |
| Vlasnici, suvlasnici, zakupci i promjene vlasništva | Prije završetka DEV-03/04 | Evidentirati period i ovlašćenje; pristup ne zaključivati iz broja stana |
| Obračun i početni saldi | Prije DEV-04 | Primjeri iz potvrđenih podataka i odluka zgrade; pravne/računovodstvene nedoumice posebno provjeriti |
| Vidljivost dokumenata, prijava i rezultata anketa | Prije odgovarajućeg modula | Privatni prilozi; najmanji potreban pristup |
| Framework verzije i validacija | Pri DEV-02 i DEV-08 | Provjeriti zvaničnu dokumentaciju i kompatibilnost pri izboru |
| Hosting, region baze, trošak i operativni pristupi | Prije kreiranja odgovarajućih udaljenih resursa | Zapisati izbor i odgovornu osobu; ne pretpostavljati kupovinu usluga |
| Čuvanje podataka, kopije, obnova i podrška | Prije DEV-09/10 | Obuhvatiti bazu i Storage, prihvatljiv gubitak podataka i rok oporavka |
| Pregled demoa i instrukcija za backend | Između DEV-02 i DEV-03 | Evidentirati korisnikov pregled, dorade i eksplicitnu instrukciju prije inicijalizacije baze |
| Instrukcija za implementaciju / objavljivanje | Prije početka izrade / DEV-10 | Ovaj zahtjev ažurira plan; ne pokreće izradu ili objavljivanje |

Postojeće istraživanje je ulaz u specifikaciju, a njegove otvorene pravne provjere ostaju otvorene. Plan ne proširuje obim na formalno glasanje, automatsku zakonsku raspodjelu ili zvanično računovodstvo.

## 8. Procjena i praćenje vrijednosti

Kalendarski rok se ne zaključava dok DEV-01 ne razriješi pravila obračuna, pristup i operativne uslove. Najveće tehničke neizvjesnosti su finansijske korekcije i početna stanja, vlasnički pristup i privatnost priloga. Nakon DEV-01/02 procijeniti trud po fazama, a nakon DEV-04 ažurirati procjenu prema stvarno završenom toku.

Na početku i na kraju pilota prikupiti uporedive podatke: broj aktivnih korisnika u odnosu na pozvane, vrijeme predsjednika za mjesečnu evidenciju, broj pitanja o novcu/radovima, razumljivost troškova i dokumenata i spremnost ZEV-a da plaća nastavak. Metod i ciljne vrijednosti dogovoriti sa pilot zgradom; ne pretpostavljati uspjeh samo zato što je aplikacija dostupna.

Nakon pilota prvo riješiti utvrđene probleme. Cijenu i nastavak pretplate potvrditi razgovorima; širenje na druge zgrade, Expo i ostale kasnije funkcionalnosti planirati zasebno prema rezultatima.

## 9. Sljedeći konkretan korak

DEV-02-A je pripremio [specifikaciju demoa](demo-specifikacija.md), a DEV-02-B provjerenu tehničku web osnovu sa početnim UI komponentama. DEV-02-C dodaje sintetičke podatke, demo kontekst i stanje sa resetom. DEV-02-D dodaje landing, responzivni okvir pet cjelina i početne preglede iz zajedničkog demo stanja. DEV-02-E dodaje provjeren lokalni finansijski demo. DEV-02-F dodaje provjeren detalj rada, ponude, status i povezane isplate. DEV-02-G dodaje provjerene lokalne objave, prijave i informativne ankete. DEV-02-H je završen u obimu [izvještaja provjere](demo-provjera-h.md). Korisnik je 17. oktobra 2026. potvrdio pregled i „za sada je ok“, bez trenutno traženih dorada; DEV-02-I i DEV-02 su završeni u demo obimu. Naredno je razrješenje zavisnih odluka DEV-01; DEV-03 zahtijeva novu instrukciju. Otvorena pitanja stvarne prijave i pilot podataka ne blokiraju demo: koriste se jasno označene sintetičke vrijednosti i simulirana prava. Nakon izrade, provjera i korisnikovog pregleda demoa razriješiti preostale odluke DEV-01, pa na korisnikovu instrukciju preći na DEV-03. Objavljivanje je zaseban korak.

## Naknadna vizuelna dorada — DEV-02-J

17. oktobar 2026: nakon prihvatanja funkcionalnog demoa korisnik traži topliji i življi ukupni dizajn. Odobren vizuelni prijedlog Pregleda zgrade i finansijske kartice: tri slikovna pravca, izbor korisnika, zatim implementacija i provjera odabranog smjera u postojećem demo projektu. DEV-02 ponovo U TOKU zbog ove dopune; prethodni rezultati A–I ostaju sačuvani. Nema promjene poslovnog obima, backenda ili odobrenja za objavljivanje.

Korisnik je odabrao drugu prikazanu verziju „Živo dvorište“. Konkretni [stil i plan primjene](dizajn/zivo-dvoriste.md) definišu J-A (stil/plan), J-B (tokeni/resursi), J-C (okvir/pregled/kartica), J-D (ostale cjeline) i J-E (provjera/pregled). J-A je dokumentacioni rezultat; izvedba J-B–J-E ostaje planirana prema narednoj instrukciji.

## Dodatna UI revizija — DEV-02-K

17. oktobar 2026: korisnik traži plan prema novoj priloženoj referenci, sa istim osjećajem zaobljenih panela i dotjeranih kontrola, bez kopiranja palete, uz moderne selecte. [Plan revizije](dizajn/ui-revizija-paneli-select.md) zadržava paletu „Živo dvorište“ i razrađuje K-A (plan), K-B (tokeni/komponente), K-C (select), K-D (ekrani) i K-E (provjera/pregled). Odobreno je samo planiranje K-A; izvedba ostaje PLANIRANO prema narednoj instrukciji. Prethodni J rezultati i nedovršene provjere ostaju evidentirani zasebno. Nema promjene funkcionalnog obima, backenda ili objavljivanja.

### DEV-02-K — potvrđeni vizuelni izbor i spremna izvedbena specifikacija

17. oktobar 2026: korisnik bira **drugu sliku posljednje serije**, `dizajn/ui-revizija-varijacije/dashboard-2.png` (Slate and Sand), i traži ažuriran plan spreman za izvedbu. [Aktuelni plan](dizajn/ui-revizija-paneli-select.md) sada definiše novu paletu, asimetričan desktop raspored, desni sažetak vlasničke kartice (puna kartica ostaje zasebna ruta), prikaze ostalih profila, mobilni redoslijed, mapu fajlova i ispravke generisanih podataka. Ovo zamjenjuje raniju pretpostavku nepromijenjene tople palete; J dokument ostaje istorija. K-A je završen dokumentacioni rezultat, K-B–K-E ostaju PLANIRANO; ovaj nalog priprema plan, bez izvedbe. Prvi izvedbeni korak je K-B, zatim K-C, K-D i K-E. Select primitive se bira i provjerava na početku K-C; ostale dizajnerske odluke su dovoljno razrađene za početak.

## Odlaganje UI revizije — 17. oktobar 2026.

Korisnik je naložio preskakanje preostalih DEV-02-K-B–K-E uz kasniji povratak. Zbirni K i te podfaze su **PAUZIRANO**; postojeći rezultati i granice provjera ostaju sačuvani u [evidenciji](napredak.md). Nisu završeni niti otkazani. DEV-02 ostaje U TOKU zbog nezaključenih vizuelnih dorada. Sljedeća tema su preostale odluke DEV-01 o prijavi i dozvolama; odlaganje UI rada ne odobrava backend ili objavljivanje.

## Dopuna modela rola — administrator sistema

17. oktobar 2026: potvrđena je zasebna najviša globalna rola **administrator sistema**, sa opsegom svih tenanata i bez obaveze pojedinačnog članstva u svakom ZEV-u. Administrator ZEV-a ostaje tenant rola. Naknadno je potvrđen puni pregled i edit svih modula, finansijskih kartica, privatnih priloga, korisnika i rola u svim tenantima, bez pojedinačnog članstva ili odobrenja tenant administratora. Istorija i korektivni finansijski zapisi ostaju obavezni. Prije DEV-03 dogovoriti postupak dodjele globalne role i oporavak; [specifikacija, odjeljak 11](pilot-specifikacija.md#11-administrator-sistema--potvrđena-globalna-rola) odvaja potvrdu od prijedloga. Serverski model mora razlikovati globalnu dodjelu i tenant dozvole, uz evidentiranje autora i ciljnog tenanta. Ovo nije početak implementacije.

### Potvrda administratora ZEV-a

17. oktobar 2026: administrator ZEV-a ima puni pregled i edit svih modula i podataka svog ZEV-a, uključujući finansije, privatne priloge, članstva i tenant role. Ne zahtijeva dodatne operaterske role. Može imenovati drugog administratora istog ZEV-a, ali ne dodjeljuje globalnu rolu niti mijenja globalni identitet ili članstva u drugim ZEV-ovima. Administrator sistema ima globalni opseg. Detalji i preostali postupci primopredaje/oporavka su u [specifikaciji](pilot-specifikacija.md#12-administrator-zev-a--potvrđen-puni-tenant-pristup).

Naknadno pojašnjenje 17. oktobra 2026: za administratora ZEV-a privremeno je potvrđen unos zaduženja/uplata na kartice vlasnika svog ZEV-a, uz kasniji korisnikov pregled toka. Pravo izmjene tuđih ličnih podataka ostaje otvoreno i ima prednost nad ranijom opštom formulacijom punog tenant edita. Ovaj unos ne mijenja pravila istorije i korektivnih finansijskih zapisa; nije odobrenje implementacije DEV-03.

### Potvrda finansijskog operatera

17. oktobar 2026: potvrđena zasebna tenant rola finansijskog operatera — sve kartice i finansijski prilozi svog ZEV-a, unos zaduženja/uplata/troškova, usaglašavanje i korektivne ispravke uz istoriju. Bez upravljanja članovima, rolama ili drugim modulima. Detalji u [specifikaciji](pilot-specifikacija.md#13-finansijski-operater--potvrđena-rola); ovo je dogovor ovlašćenja, bez početka implementacije.

### Potvrda operatera sadržaja

17. oktobar 2026: potvrđeno upravljanje radovima/ponudama/statusima, obavještenjima, prijavama/statusima i informativnim anketama svog ZEV-a. Bez finansijskog upisa, tuđih kartica i upravljanja članovima/rolama. Detalji u [specifikaciji](pilot-specifikacija.md#14-operater-sadržaja--potvrđena-rola); implementacija nije započeta.

### Potvrda osnovne role člana

17. oktobar 2026: potvrđen pregled zajedničkih finansija, radova/ponuda, obavještenja, sopstvene prijave i učešće u informativnim anketama. Vlasnik vidi svoje kartice; zakupac samo uz posebno ovlašćenje. Bez izmjene zajedničkih podataka i tuđih kartica. Detalji i otvorena pravila perioda/suvlasništva su u [specifikaciji](pilot-specifikacija.md#15-član--potvrđena-osnovna-rola). Implementacija nije započeta.

### Potvrda finansijskog pregleda

17. oktobar 2026: uključena zasebna tenant rola finansijskog pregleda — sve kartice i finansijski prilozi svog ZEV-a, bez unosa ili izmjena. Dodjeljuje se izričito, nezavisno od funkcije/zanimanja. Detalji u [specifikaciji](pilot-specifikacija.md#16-finansijski-pregled--potvrđena-rola). Osnovne role su dogovorene; preostaju detalji pristupa, lični podaci i postupci dodjele/primopredaje/oporavka prije zavisne implementacije.

### Potvrda dodjele i ukidanja prava

17. oktobar 2026: administrator sistema postavlja prvog administratora ZEV-a; administrator ZEV-a upravlja tenant rolama, uključujući druge administratore svog ZEV-a. Posljednji administrator ne uklanja se bez prethodne zamjene. Promjene prava čuvaju autora i vrijeme. Detalji u [specifikaciji](pilot-specifikacija.md#17-dodjela-i-ukidanje-prava--potvrđena-pravila). Preostaju lični podaci, periodi/suvlasništvo i operativni oporavak/globalna primopredaja.

### Potvrda prava nad ličnim podacima

17. oktobar 2026: korisnik uređuje svoj profil; administrator ZEV-a uređuje jedinice, vlasničke veze, članstva i prava svog ZEV-a, bez izmjene tuđeg profila/prijavnih podataka; administrator sistema može ispraviti podatke uz istoriju. Ovo razrješava ranije otvoreno pitanje ličnih podataka i ima prednost nad opštim tenant editom. Detalji i preostali postupci u [specifikaciji](pilot-specifikacija.md#18-lični-podaci--potvrđena-podjela-prava).

### Potvrda suvlasništva

17. oktobar 2026: više potvrđenih suvlasnika može pregledati istu karticu jedinice; zaduženje nastaje jednom po jedinici, bez dupliranja po suvlasniku. Detalji u [specifikaciji](pilot-specifikacija.md#19-suvlasništvo--potvrđen-zajednički-pregled-kartice). Periodi pristupa pri promjeni vlasništva i delegiranje zakupcu još nisu razriješeni.

### Potvrda promjene vlasništva

17. oktobar 2026: potvrđeni datum promjene, nova evidencija od tog datuma bez privatnih podataka prethodnika, bez automatskog prenosa starog duga/avansa i istorijski pregled prethodnog vlasnika samo za njegov period. Vremensko ovlašćenje i privatni prilozi moraju pratiti period; zajednička kartica suvlasnika ne smije otvoriti tuđi period. Detalji i preostala finansijska pravila su u [specifikaciji](pilot-specifikacija.md#20-promjena-vlasništva--potvrđen-model-evidencije-i-pristupa).

### Potvrda delegiranja zakupcu

17. oktobar 2026: vlasnik traži, a administrator ZEV-a evidentira pristup zakupca konkretnoj kartici i periodu, samo za pregled. Ovlašćenje se može opozvati i prestaje istekom perioda. Detalji i preostali rubni slučajevi su u [specifikaciji](pilot-specifikacija.md#21-ovlašćenje-zakupca-za-karticu--potvrđeno-pravilo). Bez početka implementacije.

Dopuna delegiranja, 17. oktobar 2026: potvrđeno da vlasnik može tražiti opoziv koji administrator evidentira; promjena vlasnika gasi ovlašćenja prethodnog vlasnika zakupcu, a novi vlasnik po potrebi traži novu dodjelu. Time su razriješeni ti rubni slučajevi iz odjeljka 21 specifikacije.

### Potvrda oporavka i globalne primopredaje

17. oktobar 2026: potvrđeni oporavak lozinke emailom, pomoć administratora sistema kod gubitka emaila nakon provjere identiteta uz evidenciju i dodjela novog administratora sistema od postojećeg, bez uklanjanja posljednjeg prije zamjene. Detalji u [specifikaciji](pilot-specifikacija.md#22-oporavak-pristupa-i-administrator-sistema--potvrđena-pravila). Sljedeće je konsolidacija potvrđenih odluka/matrice i pregled preduslova DEV-03; operativno prvo postavljanje i oporavak svih globalnih administratora treba razraditi prije upotrebe. DEV-03 i udaljeni resursi nisu odobreni ovom potvrdom.

## Konsolidovana prava i preduslovi DEV-03

17. oktobar 2026: [matrica prava](matrica-prava.md) je aktuelni objedinjeni izvor šest potvrđenih rola i vremenskih ovlašćenja. Zamjenjuje raniju operativnu dvoulognu matricu iz odjeljka 6 u dijelu konkretnih prava; ostaje sačuvana kao nacrt istorije. Odjeljci 10–22 specifikacije sadrže potvrde. PRE-01–PRE-09 odvajaju ispunjene preduslove od otvorenih odluka i kasnijih faza. Sljedeće je korisnikova instrukcija za DEV-03 i izbor lokalnog ili udaljenog početka; hosting/region/trošak i odgovorna osoba prije udaljenih resursa, procedure globalne administracije prije upotrebe. Finansijske odluke ostaju prije DEV-04, ankete prije DEV-07. Konsolidacija ne inicijalizuje backend.

## Odobren lokalni staging — DEV-03-A

17. oktobar 2026: korisnik odobrava lokalni Supabase staging i kasniji prenos na udaljeni. DEV-03 je U TOKU kroz podfazu A: konfiguracija/CLI, prenosiva migracija osnove identiteta/tenanata, sintetički seed, pokretanje i SQL provjera, uputstvo prenosa. Ovo odstupa od prethodnog čekanja instrukcije jer je lokalni obim sada izričito odobren. UI, stvarna prijava, mutacioni RPC-i i puna tenant/globalna RLS pravila dolaze u narednim podfazama. Za udaljene resurse i dalje potvrditi PIL-12; [uputstvo lokalnog staginga](lokalni-staging.md) navodi granice. Ne označavati DEV-03 završenim na osnovu baze.

## DEV-03-B — lokalne serverske operacije i prava

17. oktobar 2026: korisnik odobrava B nakon pregleda lokalne baze A. Migracije 002–006, lokalni seed identiteta, RLS osnovnih tabela i kontrolisani RPC-i implementiraju tenant/globalnu administraciju, vlasničke periode i delegiranje; [izvještaj](pristup-bazi-b.md) navodi ručne SQL/HTTP provjere i granice. B ne implementira finansijske/sadržajne tabele DEV-04–07 ili poslovni Storage. DEV-03-C je naredni planirani korak web Auth/server integracije i administrativnog UI-ja. DEV-03 ostaje U TOKU dok se ne ispune svi njegovi kriterijumi. Udaljeni resursi i objavljivanje nisu odobreni.

## DEV-03-C — lokalna web integracija

17. oktobar 2026: nastavak C odobren predajom u novi chat. Lokalna prijava/odjava, sesije i obnova, email pozivi/prihvatanje/oporavak i administrativni UI osnove imaju rezultat i ručne provjere u [izvještaju C](web-pristup-c.md). Migracije 007–009 nadograđuju B; postojeći demo ostaje odvojen. C se odnosi na Auth i osnovu administracije, bez poslovnog Storage-a i modula. DEV-03 ostaje U TOKU zbog preostalih kriterijuma, naročito privatnih priloga i operativnih postupaka prije stvarne upotrebe. Sljedeća implementaciona podfaza zahtijeva narednu instrukciju; K-B–K-E ostaju pauzirani, udaljeni resursi i objavljivanje nisu odobreni.

## DEV-03-D — odobrena lokalna infrastruktura priloga i recovery operativa

17. oktobar 2026: korisnik je naložio nastavak u narednom chatu nakon prijedloga D. To odobrava lokalni D bez tvrdnje da je korisnikov pregled C izvršen. Koraci su D-1 privatni bucket/metadata/RPC/RLS, D-2 serversko preuzimanje sa ponovnom provjerom prava bez signed URL-a, D-3 kontrolisani operativni oporavak i D-4 lokalne ručne/tehničke provjere. [Izvještaj D](prilozi-d.md) i [recovery postupak](oporavak-administratora.md) preciziraju granice.

D koristi sintetičke priloge kao provjeru infrastrukture; ne uvodi produkcione poslovne module DEV-04–07. Prije njihove upotrebe vezati opseg priloga za stvarni roditeljski zapis i njegove periode. Prije stvarnog pilota potvrditi odgovorne osobe, dokaze identiteta, operativne tajne, SMTP/HTTPS, backup/restore baze i objekata, kvote i postupak za opasne dokumente. Zasebno pregledati cijeli DEV-03 prema kriterijumima iznad i potvrditi preostale poslovne odluke; D nije automatski završetak cijele faze. K-B–K-E ostaju pauzirani; udaljeni resursi i objavljivanje traže zaseban nalog.

## DEV-03-E — pregled kriterijuma i odluka prije finansija

17. oktobar 2026: po korisnikovom nalogu preuzet završni lokalni pregled. [Pregled E](pregled-dev-03-e.md) povezuje svaki kriterijum sa dokazima B/C/D, daje uputstvo korisnikovog pregleda i odvaja uslove stvarnog pilota od budućih poslovnih modula. Ovo je aktuelni pregled naspram istorijskih opisa bez Auth-a ili Storage-a iznad. A–D završeni su u svojim dokumentovanim granicama; cijeli DEV-03 ostaje U TOKU, bez izmišljenog korisnikovog prihvatanja.

[Finansijske odluke](odluke-finansije.md) konkretizuju PIL-05–09 i rubne slučajeve vlasništva, povrata, usaglašavanja i privatnosti. Odluke nisu potvrđene pripremom dokumenta. Zavisnosti DEV-04 ostaju kriterijumi DEV-03, razriješene zavisne odluke i novi nalog za izradu. Roditeljske veze priloga implementiraju se i provjeravaju sa odgovarajućim modulom; njihovo odsustvo sada nije kvar D. Udaljeni resursi/objavljivanje nisu odobreni; K-B–K-E ostaju pauzirani.

### Potvrda osnovnih finansijskih pravila

17. oktobar 2026: potvrđeni su ručni mjesečni obračun sa pregledom prije potvrde, raspored uplata na najstarije dospjele obaveze pa avans i računanje u feningima uz zaokruživanje pola naviše bez automatskih kamata. [Finansijske odluke](odluke-finansije.md) razdvajaju ovu potvrdu od preostalih detalja, korekcija i promjene vlasnika. DEV-04 ostaje PLANIRANO bez odobrenja izrade; pregled C/D odložen je za kasnije.

### Potvrda finansijskih korekcija

17. oktobar 2026: korisnik potvrđuje storno pogrešnog iznosa i novi ispravan zapis, uz razlog, autora/vrijeme i očuvanje originala (PIL-09/FIN-06). Preostali detalji i promjena vlasnika ostaju otvoreni u [finansijskim odlukama](odluke-finansije.md); implementacija DEV-04 nije odobrena.

### Potvrda podjele mjeseca pri promjeni vlasnika

17. oktobar 2026: potvrđena podjela mjesečnog zaduženja prema kalendarskim danima vlasništva; dan promjene pripada novom vlasniku. FIN-07 ostaje djelimično otvoren zbog ostatka feninga i zakašnjelih uplata; [finansijske odluke](odluke-finansije.md). Ova odluka ne odobrava izradu DEV-04.

### Potvrda zakašnjele uplate nakon promjene vlasnika

17. oktobar 2026: potvrđeno da uplata za dug prethodnog vlasnika primljena nakon promjene zatvara njegov stari dug bez uticaja na karticu novog vlasnika. FIN-07 ima potvrđena oba osnovna pravila; preostaje ostatak feninga pri podjeli. Ostale odluke su u [finansijskom upitniku](odluke-finansije.md); DEV-04 nije odobren.

### Potvrda prve verzije bez prenosa salda

17. oktobar 2026: FIN-08 potvrđen — nema prenosa duga/avansa između prethodnog i novog vlasnika u prvoj verziji; svako zadržava svoj saldo. To uključuje izostavljanje posebne operacije dokumentovanog prenosa. Ostala pitanja ostaju u [finansijskim odlukama](odluke-finansije.md); nema naloga za izradu DEV-04.

### Potvrda povrata avansa

17. oktobar 2026: potvrđen povrat do raspoloživog avansa uz razlog, sa istovremenim smanjenjem sredstava ZEV-a i avansa vlasnika. FIN-09 ostaje djelimično otvoren zbog neidentifikovanih uplata; [finansijske odluke](odluke-finansije.md). Izrada DEV-04 nije odobrena.

### Potvrda neidentifikovane uplate

17. oktobar 2026: potvrđena neidentifikovana uplata kao jedan priliv sredstava, neraspoređena do potvrde kartice od operatera; raspored ne stvara novi priliv. FIN-09 ima potvrđena oba osnovna dijela; [finansijske odluke](odluke-finansije.md). DEV-04 ostaje bez naloga za izradu.

### Potvrda usaglašavanja sa bankom

17. oktobar 2026: potvrđena evidencija datuma, stanja izvoda i razlike prema aplikaciji, bez automatskog prihoda/rashoda radi izjednačavanja. Preostali detalji FIN-10 su u [finansijskim odlukama](odluke-finansije.md). DEV-04 ostaje bez naloga za izradu.

### Potvrda privatnosti finansijskih priloga

17. oktobar 2026: potvrđena vidljivost zajedničkih računa članovima nakon provjere i uklanjanja nepotrebnih ličnih podataka; prilozi pojedinačnih uplata prate ovlašćenu karticu i period. FIN-11/PIL-10 usklađeni; postupak redakcije i roditeljske veze izvesti uz modul. Nema naloga za izradu DEV-04.

### Potvrda automatskog korišćenja avansa

17. oktobar 2026: postojeći avans automatski pokriva naredno zaduženje bez novog priliva (FIN-04/PIL-07). Primjer 10 KM avansa i 30 KM zaduženja daje dug 20 KM. Ostali detalji ostaju u [finansijskim odlukama](odluke-finansije.md); izrada DEV-04 nije odobrena.

## Delegirane finansijske odluke — 18. oktobar 2026.

Korisnik je ovlastio agenta da donese preostale finansijske odluke. Važeća pravila FIN-01–11 su u [finansijskim odlukama](odluke-finansije.md#važeće-odluke-po-delegiranom-ovlašćenju--18-oktobar-2026) i imaju prednost nad ranijim navodima otvorenih produktnih pitanja: početna stanja i verzije tarifa, obavezan rok i audit izmjene, deterministički raspored, zaokruživanje i podjela ostatka, korekcije, bankovni obim i pregled te redakcija priloga. Sintetički parametri su izabrani za buduću lokalnu izradu; stvarna tarifa, početna stanja i dokumenti ostaju uslov prije pilota. Finansijske odluke više ne čekaju pojedinačne odgovore korisnika. Pregled C/D ostaje odložen, DEV-03 nije zaključen, a DEV-04 i objavljivanje nisu odobreni. Odluke nisu implementacija.
