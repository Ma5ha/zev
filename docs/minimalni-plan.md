# Minimalni plan — ZEV aplikacija

## Cilj

Napraviti biznis oko jednostavne aplikacije za transparentno upravljanje zajednicom etažnih vlasnika u Republici Srpskoj. Početi pilotom za jednu zgradu, provjeriti vrijednost u stvarnoj upotrebi i postepeno širiti proizvod.

Prva verzija treba predsjedniku ZEV-a olakšati evidenciju, a stanarima omogućiti razumljiv pregled novca, radova i dešavanja u zgradi.

## 1. Korisnici, funkcije i tenant pristup

Korisnik je potvrdio tenant pristup i uloge u skladu sa pravilima ZEV-a. Početni model je jedan tenant po ZEV-u, uz jednu demo zgradu; to je radna pretpostavka za granicu podataka, a ne potvrđeno pravilo o grupisanju više zgrada.

- Evidentirati vlasnika/člana skupštine, predsjednika skupštine, predsjednika i člana upravnog odbora, upravnika i registrovanog zastupnika gdje su primjenjivi, prema dokumentima ZEV-a.
- Odvojiti te funkcije od dozvola aplikacije: pregled zajedničkih podataka, pristup sopstvenoj kartici, finansijski unos, objave i upravljanje članstvima. Raniji naziv „predsjednik“ predstavljao je pojednostavljenu ulogu za unos; konačna prava traže razradu.
- Zakupac i drugi korisnik prostora nemaju automatski prava vlasnika. Ovlašćenje, osnov i period važenja vode se zasebno.
- Jedan nalog može imati članstva i različita ovlašćenja u više tenanata; podaci ostaju odvojeni. Tenant ovdje znači organizacioni prostor ZEV-a, ne zakupca.

Detaljan nacrt i otvorena pitanja su u [specifikaciji pilota](pilot-specifikacija.md). Formalno elektronsko odlučivanje ostaje izvan početnog obima.

## 2. Minimalna aplikacija — pet cjelina

| Cjelina | Sadržaj prve verzije |
|---|---|
| Pregled zgrade | Trenutno stanje sredstava, posljednji troškovi, aktivni radovi i obavještenja |
| Finansije | Prihodi i rashodi, datum, kategorija, iznos i priložen račun; stanar vidi svoje zaduženje i uplate |
| Radovi i ponude | Opis posla, rok za ponude, primljene ponude, izabrani izvođač, dogovorena cijena, napredak i isplate |
| Oglasna tabla | Obavještenja o kvarovima, sastancima, isključenjima i drugim dešavanjima |
| Ankete i prijave | Jednostavna anketa sa rezultatima i prijava problema sa fotografijom i statusom |

Ponude za radove u početku predsjednik unosi ili prilaže, a stanari ih prate i porede. Portal na kojem izvođači sami konkurišu dolazi kasnije.

## 3. Pravila transparentnosti

- Svaki trošak ima iznos, svrhu, datum i podatak ko ga je unio, uz mogućnost prilaganja računa.
- Izmjene ostavljaju istoriju.
- Kod radova se odvojeno vide ponuđena cijena, ugovoreni iznos i stvarno plaćeno.
- Stanje računa vodi se ručno, uz jasno prikazan datum posljednjeg usaglašavanja sa bankom.
- Pojedinačna dugovanja dostupna su predsjedniku i vlasniku na kojeg se odnose.
- Ankete su informativne; formalno odlučivanje skupštine razrađuje se posebno.

## 4. Web i mobilni pristup

Potvrđeni smjer je prvo web primjer sa javnom landing stranicom i aplikacijom iza nje, sa izmišljenim podacima. Landing objašnjava proizvod i vodi do demoa ili prijave. Interni podaci stvarnog ZEV-a zahtijevaju prijavu i provjeru članstva/ovlašćenja u tenant prostoru.

Prva isporuka za pregled je interaktivni demo **bez inicijalizacije baze i Supabase-a**: lokalni izmišljeni podaci, simulacija tenant/role prikaza i forme koje privremeno mijenjaju demo u memoriji. Reset ili osvježavanje vraća početne podatke. Korisnik pregleda demo i daje povratne informacije prije dogovora o povezivanju sa backendom. Demo nije stvarni pilot sa stanarima.

Za Android i iOS planirane su posebne mobilne aplikacije. Web ostaje responzivan; PWA instalacija više nije kriterijum prve verzije.

Prihvaćeni stack je Nx + pnpm + TypeScript, Next.js/React i Tailwind CSS za web, React Native/Expo za Android i iOS, te Supabase/PostgreSQL. Detalji su u [stacku](stack.md). Početni prijedlog je landing i app u istom `apps/web` projektu, bez posebnog prodajnog projekta.

## 5. Poslovni model

Početni model je mjesečna pretplata po zgradi koju plaća ZEV. Pilot prvo potvrđuje vrijednost i spremnost na plaćanje; cijena se određuje nakon razgovora sa nekoliko predsjednika ZEV-a.

## 6. Pilot i provjera vrijednosti

Pilot traje najmanje jedan puni mjesečni obračun i obuhvata jedan stvarni posao održavanja.

Pratiti:

- Koliko stanara koristi aplikaciju.
- Koliko vremena predsjednik troši na evidenciju.
- Koliko pitanja stanara o novcu i radovima aplikacija rješava.
- Da li su troškovi i priloženi dokumenti razumljivi stanarima.
- Da li je ZEV spreman plaćati nastavak korišćenja.

## 7. Kasnije faze

- Automatsko povezivanje sa bankama.
- Online plaćanja.
- Portal izvođača i samostalno dostavljanje ponuda.
- Prošireno upravljanje većim brojem zgrada; tenant izolacija planira se od početka.
- Posebne Android i iOS aplikacije.

## Status

Faze implementacije, zavisnosti i kriterijumi završetka razrađeni su u [razvojnom planu](razvojni-plan.md).

Ovaj dokument predstavlja plan. Korisnik je odobrio i izvršeno je postavljanje Nx/pnpm monorepo osnove. Naknadno su završeni specifikacija demoa DEV-02-A i web osnova DEV-02-B. DEV-02-C sada ima sintetičke podatke i stanje u memoriji sa izborom ZEV-a/profila i resetom. DEV-02-D dodaje landing, responzivnu navigaciju pet cjelina i početne preglede. DEV-02-E dodaje lokalni finansijski demo. DEV-02-F dodaje demo radova i ponuda. DEV-02-G dodaje lokalne objave, prijave i informativne ankete. DEV-02-H je provjeren u dokumentovanim granicama, a korisnik je 17. oktobra 2026. pregledao demo i potvrdio „za sada je ok“, bez trenutno traženih dorada. DEV-02 i I su završeni u demo obimu; backend čeka novu instrukciju i zavisne odluke.

### Naknadno odobren lokalni staging

17. oktobar 2026: korisnik odobrava DEV-03-A, lokalnu Supabase staging bazu sa kasnijim prenosom na udaljeni projekat. Time je razriješeno ranije čekanje instrukcije za taj ograničeni obim. Demo ostaje zaseban u memoriji; puna prijava, prava pristupa i produkcioni moduli preostaju. Udaljeni resursi i objavljivanje nisu odobreni. Operativni detalji i provjere su u [uputstvu](lokalni-staging.md) i [evidenciji](napredak.md).

## Lokalni pristup DEV-03-C

17. oktobar 2026: korisnik je odobrio C kroz predaju u novi chat. Lokalni web ima stvarnu prijavu, sesije, pozive i administraciju osnove; [rezultat i granice](web-pristup-c.md). Demo poslovnih modula ostaje sintetički i odvojen. DEV-03 kao cjelina još nije završen; nema udaljenih resursa ili objavljivanja.
