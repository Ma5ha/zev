# Specifikacija pilota — DEV-01

Datum: 16. oktobar 2026. (Europe/Belgrade).

Status: **U TOKU — nacrt za dogovor**. Polazište su [minimalni plan](minimalni-plan.md) i [razvojni plan](razvojni-plan.md). Prijedlozi u ovom dokumentu nisu potvrđene odluke zgrade, pravno tumačenje ili implementirane funkcionalnosti.

## 1. Potvrđeni obim i otvorene odluke

Ranije je dogovoren pilot jedne zgrade sa pet cjelina minimalnog plana. Korisnik je sada odobrio sljedeći korak, DEV-01. Korisnik je potvrdio pripremu demoa sa izmišljenim podacima, obračun po metru kvadratnom i ručni unos roka plaćanja. Konkretna pilot zgrada još nije odabrana. Korisnik je potom potvrdio prvo web primjer sa landing stranicom i aplikacijom iza nje, zasebne mobilne aplikacije, tenant pristup i uloge prema pravilima ZEV-a. Način prijave ostaje otvoren. Stvarni podaci stanara, adrese, lozinke i pristupni tokeni ne unose se u ovaj dokument.

| ID | Odluka / početni prijedlog | Status | Ko razrješava i kada |
|---|---|---|---|
| PIL-01 | Prvo web sa landing stranicom i aplikacijom, zatim posebne mobilne aplikacije; PWA nije uslov | POTVRĐENO | Korisnik razjasnio smjer |
| PIL-02 | Demo sa izmišljenim podacima; konkretna zgrada još nije odabrana | POTVRĐENO ZA DEMO | Korisnik potvrdio; zgrada i ovlašćeni operater potrebni prije stvarnog pilota |
| PIL-03 | Način prijave i uključivanja u tenant: email pozivi nisu potvrđeni | OTVORENO | Korisnik, prije DEV-03; povezano sa PIL-01 |
| PIL-04 | Ovlašćenje za karticu dodjeljuje se izričito; zakupac nema automatski pristup kartici vlasnika | PRIJEDLOG | Korisnik i ovlašćena osoba pilota, prije DEV-03/04 |
| PIL-05 | Početni mjesec, stanje računa i pojedinačna početna dugovanja/avansi | ČEKA PODATKE | Ovlašćena osoba pilota preko korisnika, prije DEV-04 i unosa stvarnih podataka |
| PIL-06 | Mjesečna obaveza po m²; rok plaćanja unosi se ručno uz obračun | POTVRĐEN OSNOV; STOPA OTVORENA | Korisnik potvrdio model; stopa i početni mjesec demoa još nisu potvrđeni, stvarni osnov zgrade potreban prije pilota |
| PIL-07 | Ručno pokretanje mjesečnog obračuna uz pregled; raspored uplata prvo na najstarije dospjele obaveze, ostatak kao avans | PRIJEDLOG | Korisnik i ovlašćena osoba pilota, prije DEV-04 |
| PIL-08 | Računanje u cijelim feningima; pri množenju stopom/površinom zaokruživanje po zaduženju na dvije decimale, pola naviše; bez automatskih kamata | PRIJEDLOG | Korisnik i ovlašćena osoba pilota, prije DEV-04 |
| PIL-09 | Ispravka finansijskog zapisa korektivnim zapisom sa razlogom i vezom na original; bez brisanja istorije | DIO MINIMALNOG PLANA / RAZRADA ZA POTVRDU | Korisnik potvrđuje konkretan postupak prije DEV-04 |
| PIL-10 | Prijavu vidi autor i predsjednik; zajedničke objave/radove vide članovi; prilozi uplata prate ovlašćenje za karticu | PRIJEDLOG | Korisnik, prije DEV-03/06 |
| PIL-11 | Informativna anketa: jedan odgovor po aktivnom članstvu, izmjena do zatvaranja, zbirni rezultati nakon zatvaranja bez javnog imenika odgovora | PRIJEDLOG | Korisnik, prije DEV-07; bez formalnog glasanja |
| PIL-12 | Hosting, region baze, trošak i odgovorna osoba za uslugu | OTVORENO | Korisnik, prije kreiranja udaljenih resursa |
| PIL-13 | Rokovi čuvanja, kopije baze i dokumenata, obnova i podrška | OTVORENO | Korisnik i operater pilota, prije DEV-09/10 |

| PIL-14 | Tenant pristup, sa odvojenim članstvima i podacima | POTVRĐEN SMJER | Jedan ZEV po tenantu je radna pretpostavka; korisnik potvrđuje granicu prije DEV-03 |
| PIL-15 | Uloge u skladu sa pravilima ZEV-a, odvojene od dozvola aplikacije | POTVRĐEN ZAHTJEV; MATRICA OTVORENA | Razraditi prije DEV-03, prema funkcijama i dokumentima konkretnog ZEV-a |

Čekanje na odgovore nije odobrenje prijedloga. Ako se odabere demo, njegove vrijednosti ostaju sintetičke; taj izbor ne potvrđuje spremnost za stvarni pilot. Otvorene pravne provjere iz [istraživanja](istrazivanje-zev-rs.md) ostaju otvorene i ovim dokumentom se ne uvode nove tvrdnje o propisima.

## 2. Prijedlog modela korisnika i ovlašćenja

- Nalog predstavlja osobu; članstvo određuje pristup jednoj zgradi i ima period važenja. Aplikaciona uloga „predsjednik“ dodjeljuje se osobi sa potvrđenim ovlašćenjem za evidenciju; naziv u aplikaciji nije dokaz pravnog zastupanja.
- Poseban dio i vlasnička veza vode se odvojeno od naloga. Jedna osoba može imati više jedinica; jedna jedinica može imati više suvlasnika. Ovlašćenja ne proizlaze iz samog broja stana ili poznavanja email adrese.
- Suvlasnik dobija pristup samo potvrđenim karticama i periodima; prikaz i raspodjela obaveza među suvlasnicima moraju se dogovoriti prije obračuna. Ne generisati isto zaduženje za svakog suvlasnika.
- Promjena vlasništva zatvara prethodnu vezu i otvara novu. Prethodni dug, avans i istorija ne prenose se novom vlasniku automatski. Pristup ranijem vlasniku i dozvoljeni istorijski periodi moraju se posebno potvrditi prije implementacije.
- Zakupac može dobiti članstvo za zajedničke sadržaje; pristup pojedinačnoj kartici zahtijeva posebno potvrđeno ovlašćenje. Opoziv članstva ukida dalji pristup internim sadržajima i prilozima.

## 3. Matrica pristupa za potvrdu

Tabela ispod je raniji operativni nacrt za dvije pojednostavljene uloge. Nakon zahtjeva za ZEV uloge služi kao spisak radnji i podataka; ne predstavlja konačnu dodjelu svih prava predsjedniku skupštine ili bilo kojoj drugoj funkciji. Konačna matrica mora razdvojiti funkcije iz odjeljka 6 prije DEV-03.

| Podatak / radnja | Predsjednik svoje zgrade | Aktivni član | Neprijavljen / opozvan član |
|---|---|---|---|
| Zajedničke finansije | Pregled i upis | Pregled bez tuđih dugovanja i ličnih podataka | Bez pristupa |
| Pojedinačna kartica i prilog uplate | Sve kartice zgrade | Samo izričito ovlašćena kartica i period | Bez pristupa |
| Jedinice, vlasničke veze i članstva | Upravljanje uz trag promjene | Bez opšteg imenika i izmjena ovlašćenja | Bez pristupa |
| Zajednički radovi, ponude i obavještenja | Pregled i upis | Pregled dozvoljenih podataka | Bez pristupa |
| Prijava problema i fotografija | Pregled i obrada | Slanje i pregled sopstvene prijave | Bez pristupa |
| Ankete | Kreiranje i zatvaranje; učešće po istom pravilu | Odgovor do zatvaranja, zbir nakon zatvaranja | Bez pristupa |
| Istorija izmjena | U okviru prava na izvorni podatak | U okviru prava na izvorni podatak | Bez pristupa |

Pravo na dokument prati namjenu dokumenta. Prilog zajedničkog rashoda mora prije dijeljenja biti provjeren zbog ličnih podataka. Audit istorija i direktan URL dokumenta ne smiju zaobići ista ograničenja. Izolacija zgrada važi i za predsjednika.

## 4. Sintetički mjesečni primjer za provjeru dogovora

Ovo je isključivo primjer računanja, bez tvrdnje da je stopa ili iznos primjenjiv na pilot zgradu. Primjer prati potvrđeni model po m²: dvije izmišljene jedinice A i B imaju po 60 m². Ilustrativna stopa je 0,50 KM/m², pa je mjesečno zaduženje svake 60 × 0,50 = 30,00 KM. Stopa i površine služe isključivo primjeru i nisu korisnikova potvrđena tarifa. Rok plaćanja unosi se ručno uz obračun; za ovaj aritmetički primjer konkretan datum nije potreban. Postupak kad rok nije unesen, kao i izmjena roka poslije potvrde obračuna, razrađuje se prije DEV-04.

Početak: na računu je 1.000,00 KM; kartica A duguje 20,00 KM, kartica B ima avans 10,00 KM. Početni saldi kartica nisu novi prihod na računu.

| Događaj | Kartica A | Kartica B | Sredstva na računu |
|---|---|---|---|
| Početno stanje | Dug 20,00 | Avans 10,00 | 1.000,00 |
| Mjesečno zaduženje +30,00 za A i B | Dug 50,00 | Dug 20,00 | 1.000,00 |
| A uplaćuje 40,00 | Dug 10,00 | Dug 20,00 | 1.040,00 |
| B uplaćuje 25,00 | Dug 10,00 | Avans 5,00 | 1.065,00 |
| Plaćen zajednički rashod 120,00 | Dug 10,00 | Avans 5,00 | 945,00 |

Očekivani rezultat: sredstva 945,00 KM, potraživanje od A 10,00 KM i avans B 5,00 KM, prikazani odvojeno. Obračun: 1.000,00 + 40,00 + 25,00 − 120,00 = 945,00. Raspored uplate A po prijedlogu zatvara stari dug 20,00 i dio tekuće obaveze 20,00. Preostalih 10,00 je tekući dug. B koristi početni avans 10,00, a uplata 25,00 zatvara ostatak obaveze 20,00 i ostavlja avans 5,00.

Po predloženom postupku ispravke, ako je rashod stvarno bio 110,00 KM, original od 120,00 se stornira i veže za ispravni zapis 110,00 uz razlog. Završna sredstva tada su 955,00 KM. Obična ispravka opisa ne mijenja novac. Nijedna od ovih vrijednosti nije rezultat izvršavanja aplikacije.

## 5. Uslov završetka DEV-01

- Potvrđeni su smjer web sa landing stranicom, zatim mobilne aplikacije, pilot ili eksplicitni demo cilj i odgovorna osoba za otvorene podatke.
- Dogovoreni su način pristupa, vlasnički model i matrica pristupa; otvorene specifičnosti imaju odgovornu osobu i fazu koju blokiraju.
- Primjer obračuna je prihvaćen ili zamijenjen stvarnim pravilima bez unošenja ličnih podataka u repozitorijum.
- Odluke i ograničenja upisani su u evidenciju. DEV-02 demo može početi sa potvrđenim demo obimom i označenim pretpostavkama. Preostale odluke rješavaju se prije zavisnog koraka DEV-03/04; puna DEV-01 faza time nije završena.

Trenutno su pripremljeni nacrt, matrica i aritmetički primjer. Potvrđeni su demo, osnov obračuna po m² i ručni rok. Platforma je razjašnjena; izbor prijave, razrada dozvola za ZEV uloge i potvrda preostalih prijedloga još nedostaju. Nisu generisani aplikacija, baza ili testovi, niti su kreirani udaljeni resursi.

## 6. Tenant i uloge — dopuna prema korisnikovoj instrukciji

Tenant predstavlja odvojeni organizacioni prostor. Radna pretpostavka je jedan ZEV po tenantu, sa jednom zgradom u demou. Ako ZEV obuhvata više zgrada, granicu potvrditi prije šeme baze. Članstvo je veza korisnika i tenanta; vlasništvo je posebna veza sa jedinicom. Isti korisnik može imati različite funkcije i dozvole u različitim tenantima.

Zakonski nazivi ispod oslanjaju se na čl. 24–32 [Zakona o održavanju zgrada, NSRS](https://www.narodnaskupstinars.net/la/akti/usvojeni-zakoni/zakon-o-odrzavanju-zgrada) i lokalni izvod teksta iz istraživanja. Javna NSRS evidencija provjerena je 16. oktobra 2026; ovo nije nova potpuna konsolidacija propisa. Softverske dozvole su prijedlog i moraju pratiti konkretan osnivački akt, odluke, mandat i registrovana ovlašćenja.

| Funkcija / odnos | Značenje za model | Dozvole aplikacije za razradu |
|---|---|---|
| Etažni vlasnik / član skupštine | Vlasnička veza i članstvo u skupštini; suvlasništvo se vodi posebno | Zajednički sadržaji i sopstvena ovlašćena kartica; bez automatskog finansijskog unosa |
| Predsjednik skupštine | Posebna funkcija sa mandatom | Rad sa obavještenjima i evidencijom u okviru dodijeljenog ovlašćenja; ne poistovjećivati sa zastupnikom ili predsjednikom odbora |
| Član upravnog odbora | Posebna funkcija ako odbor postoji | Pregled i radnje prema dokumentovanoj raspodjeli poslova; članstvo u odboru samo ne daje sve kartice i administraciju |
| Predsjednik upravnog odbora | Odvojena funkcija i mandat | Dodijeljene operativne radnje; zastupanje se evidentira prema stvarnom osnovu |
| Upravnik | Funkcija kada je primjenjiva organizaciji ZEV-a | Radnje prema utvrđenom ovlašćenju, bez prećutnog izjednačavanja sa drugim funkcijama |
| Registrovani zastupnik | Podatak o potvrđenom zastupanju; može se preklapati sa drugom funkcijom | Evidentirati osnov i period; sam naziv nije neograničen tehnički pristup |
| Zakupac / drugi ovlašćeni korisnik | Korisnik prostora sa zasebnim članstvom i osnovom pristupa | Dozvoljeni zajednički sadržaji; prava vlasnika se ne dodjeljuju automatski |
| Operater evidencije | Aplikaciono ovlašćenje za unos, nije novi zakonski organ | Finansije, radovi ili drugi moduli samo po konkretnoj dodjeli |
| Administrator platforme | Tehnička funkcija izvan organa ZEV-a | Bez podrazumijevanog pristupa sadržaju svih tenanata; podršku i eventualni izuzetan pristup zasebno definisati |

Jedna osoba može imati više funkcija. Dodjela bilježi tenant, osnov, period, autora i promjene; opoziv mora važiti i za aktivne sesije. Kada odbor ne postoji, ne izmišljati njegove članove radi zadovoljavanja softverske šeme. Informativne ankete ostaju odvojene od formalnih odluka skupštine.

Tenant ograničenje obuhvata upise, čitanje, priloge, audit istoriju, pretragu i keš. Veza između npr. isplate i rada mora biti unutar istog tenanta. Serverske provjere i RLS provjeravaju aktivno članstvo i konkretnu dozvolu; promjena URL-a, slug-a ili ID-a ne daje pristup. Sintetički drugi tenant planirati za ručnu provjeru izolacije u DEV-03.

## 7. Tok landing → demo / interna aplikacija

Prijedlog ruta unutar `apps/web`: `/` za landing, `/demo` za sintetički primjer, `/prijava` za budući odabrani način prijave i `/app` za internu aplikaciju. Konačni nazivi ruta mogu se prilagoditi implementaciji.

- Landing objašnjava svrhu i osnovne cjeline. Primarna radnja je „Pogledaj demo“, a „Prijava“ je zaseban ulaz za članove.
- Demo prikazuje označene izmišljene podatke i primjer uloga. Promjena demo uloge služi demonstraciji; nije mehanizam dodjele stvarnih ovlašćenja.
- Poslije stvarne prijave otvara se dozvoljeni tenant. Ako korisnik ima više članstava, bira samo među tenantima kojima pripada; bez članstva vidi objašnjenje i put za traženje pristupa prema naknadno odabranom postupku.
- Naziv aktivnog ZEV-a i korisnikove funkcije daju kontekst. Nedovoljan pristup ne otkriva tuđe podatke; greška ili opoziv članstva ne vraćaju ranije zaštićen sadržaj.

Ovo je specifikacija toka. Dizajn ekrana, sadržaj landing stranice i funkcionalna implementacija još nisu izrađeni niti vizuelno provjereni.

## 8. Demo bez baze — dogovoreni redoslijed

Po korisnikovoj instrukciji plan sada izričito odvaja interaktivni demo od backend implementacije. Naredni rezultat za pregled je DEV-02: landing i aplikacija sa lokalnim izmišljenim podacima, simuliranim tenant/role prikazom i privremenim izmjenama kroz forme. Ne inicijalizuju se baza, Supabase projekat, Auth, RLS ili Storage; nema stvarne prijave i slanja email poziva.

Demo izmjene ostaju u memoriji; reset i osvježavanje vraćaju početno stanje. Primjeri obračuna, rasporeda uplata i dozvola koji nisu potvrđeni nose oznaku demo pretpostavke. Korisnik kroz konkretne ekrane može predložiti izmjene i razriješiti otvorene odluke; ne moraju se prethodno izmišljati stvarna pilot zgrada i njeni podaci.

Poslije izrade slijede tehničke i ručne provjere, zatim korisnikov pregled i dorade. Pregled ne odobrava automatski backend: za DEV-03 potrebni su instrukcija korisnika i razriješeni preduslovi prijave, tenant granice i dozvola. Provjereni demo ne završava produkcione faze DEV-03–DEV-10. Detaljan obim i kriterijumi su u [razvojnom planu](razvojni-plan.md).
