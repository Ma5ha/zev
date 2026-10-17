# Specifikacija pilota — DEV-01

Datum: 16. oktobar 2026. (Europe/Belgrade).

Status: **U TOKU — potvrđene odluke i preostali prijedlozi**. Aktuelna [konsolidovana matrica prava](matrica-prava.md) objedinjuje potvrde iz odjeljaka 10–22; raniji nacrti ispod ostaju istorija i nemaju prednost nad tim potvrdama. Polazište su [minimalni plan](minimalni-plan.md) i [razvojni plan](razvojni-plan.md). Prijedlozi u ovom dokumentu nisu potvrđene odluke zgrade, pravno tumačenje ili implementirane funkcionalnosti.

## 1. Potvrđeni obim i otvorene odluke

Ranije je dogovoren pilot jedne zgrade sa pet cjelina minimalnog plana. Korisnik je sada odobrio sljedeći korak, DEV-01. Korisnik je potvrdio pripremu demoa sa izmišljenim podacima, obračun po metru kvadratnom i ručni unos roka plaćanja. Konkretna pilot zgrada još nije odabrana. Korisnik je potom potvrdio prvo web primjer sa landing stranicom i aplikacijom iza nje, zasebne mobilne aplikacije, tenant pristup i uloge prema pravilima ZEV-a. Potvrđeni su email/lozinka i pristup putem poziva; detalji potvrda su u odjeljcima 10–22. Stvarni podaci stanara, adrese, lozinke i pristupni tokeni ne unose se u ovaj dokument.

| ID | Odluka / početni prijedlog | Status | Ko razrješava i kada |
|---|---|---|---|
| PIL-01 | Prvo web sa landing stranicom i aplikacijom, zatim posebne mobilne aplikacije; PWA nije uslov | POTVRĐENO | Korisnik razjasnio smjer |
| PIL-02 | Demo sa izmišljenim podacima; konkretna zgrada još nije odabrana | POTVRĐENO ZA DEMO | Korisnik potvrdio; zgrada i ovlašćeni operater potrebni prije stvarnog pilota |
| PIL-03 | Email i lozinka, pristup ZEV-u putem poziva, oporavak emailom i pomoć sistemskog administratora nakon provjere identiteta | POTVRĐENO | §10, §22; operativni postupak prije upotrebe |
| PIL-04 | Izričito ovlašćene kartice/periodi, zajednička kartica suvlasnika bez dupliranja; zakupac po zahtjevu vlasnika i evidentiranju administratora | POTVRĐENO | §15, §19–21; finansijski detalji promjene prije DEV-04 |
| PIL-05 | Početni mjesec, stanje računa i pojedinačna početna dugovanja/avansi | ČEKA PODATKE | Ovlašćena osoba pilota preko korisnika, prije DEV-04 i unosa stvarnih podataka |
| PIL-06 | Mjesečna obaveza po m²; rok plaćanja unosi se ručno uz obračun | POTVRĐEN OSNOV; STOPA OTVORENA | Korisnik potvrdio model; stopa i početni mjesec demoa još nisu potvrđeni, stvarni osnov zgrade potreban prije pilota |
| PIL-07 | Ručno pokretanje mjesečnog obračuna uz pregled; raspored uplata prvo na najstarije dospjele obaveze, ostatak kao avans | PRIJEDLOG | Korisnik i ovlašćena osoba pilota, prije DEV-04 |
| PIL-08 | Računanje u cijelim feningima; pri množenju stopom/površinom zaokruživanje po zaduženju na dvije decimale, pola naviše; bez automatskih kamata | PRIJEDLOG | Korisnik i ovlašćena osoba pilota, prije DEV-04 |
| PIL-09 | Ispravka finansijskog zapisa korektivnim zapisom sa razlogom i vezom na original; bez brisanja istorije | DIO MINIMALNOG PLANA / RAZRADA ZA POTVRDU | Korisnik potvrđuje konkretan postupak prije DEV-04 |
| PIL-10 | Član vidi sopstvene prijave; sadržaj obrađuju operater sadržaja i administratori; privatni finansijski prilozi prate karticu/period | POTVRĐEN OSNOV PRISTUPA | §11–16, §20–21; obrada/redakcija zajedničkih dokumenata prije odgovarajućeg modula |
| PIL-11 | Informativna anketa: jedan odgovor po aktivnom članstvu, izmjena do zatvaranja, zbirni rezultati nakon zatvaranja bez javnog imenika odgovora | PRIJEDLOG | Korisnik, prije DEV-07; bez formalnog glasanja |
| PIL-12 | Hosting, region baze, trošak i odgovorna osoba za uslugu | OTVORENO | Korisnik, prije kreiranja udaljenih resursa |
| PIL-13 | Rokovi čuvanja, kopije baze i dokumenata, obnova i podrška | OTVORENO | Korisnik i operater pilota, prije DEV-09/10 |
| PIL-14 | Jedan ZEV po tenantu, odvojena članstva/podaci; administrator sistema ima izričitu globalnu dodjelu | POTVRĐENO | §10–12; više zgrada unutar ZEV-a razraditi prije takve upotrebe |
| PIL-15 | Šest aplikacionih rola odvojeno od funkcija ZEV-a, uz dogovorene dodjele/ukidanje i zaštitu posljednjeg administratora | POTVRĐENA OSNOVNA MATRICA | [Matrica prava](matrica-prava.md), §10–22; procedure prvog postavljanja/oporavka prije upotrebe |

Čekanje na odgovore nije odobrenje prijedloga. Ako se odabere demo, njegove vrijednosti ostaju sintetičke; taj izbor ne potvrđuje spremnost za stvarni pilot. Otvorene pravne provjere iz [istraživanja](istrazivanje-zev-rs.md) ostaju otvorene i ovim dokumentom se ne uvode nove tvrdnje o propisima.

## 2. Prijedlog modela korisnika i ovlašćenja

Istorijski nacrt; potvrđeni model i razriješena pitanja vidjeti u [matrici prava](matrica-prava.md).

- Nalog predstavlja osobu; članstvo određuje pristup jednoj zgradi i ima period važenja. Aplikaciona uloga „predsjednik“ dodjeljuje se osobi sa potvrđenim ovlašćenjem za evidenciju; naziv u aplikaciji nije dokaz pravnog zastupanja.
- Poseban dio i vlasnička veza vode se odvojeno od naloga. Jedna osoba može imati više jedinica; jedna jedinica može imati više suvlasnika. Ovlašćenja ne proizlaze iz samog broja stana ili poznavanja email adrese.
- Suvlasnik dobija pristup samo potvrđenim karticama i periodima; prikaz i raspodjela obaveza među suvlasnicima moraju se dogovoriti prije obračuna. Ne generisati isto zaduženje za svakog suvlasnika.
- Promjena vlasništva zatvara prethodnu vezu i otvara novu. Prethodni dug, avans i istorija ne prenose se novom vlasniku automatski. Pristup ranijem vlasniku i dozvoljeni istorijski periodi moraju se posebno potvrditi prije implementacije.
- Zakupac može dobiti članstvo za zajedničke sadržaje; pristup pojedinačnoj kartici zahtijeva posebno potvrđeno ovlašćenje. Opoziv članstva ukida dalji pristup internim sadržajima i prilozima.

## 3. Ranija matrica pristupa — istorijski nacrt

Aktuelna je [konsolidovana matrica šest rola](matrica-prava.md); dvoulogna tabela ispod nije implementacioni izvor prava.

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
| Administrator sistema | Globalna, najviša aplikaciona rola izvan organa ZEV-a | Važi za sve tenante, odvojeno od administratora ZEV-a; potvrđeno naknadnom instrukcijom, detalji u odjeljku 11 |

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

## 9. Konkretan prijedlog pristupa — 17. oktobar 2026.

**Status: PRIJEDLOG ZA POTVRDU (DEV-01-B), bez implementacije.** Ne zamjenjuje ranije potvrde niti automatski odobrava DEV-03. Ovo su pravila proizvoda, ne nova tumačenja propisa.

| Odluka | Predloženo pravilo | Alternativa / otvoreno |
|---|---|---|
| PIL-03 — prijava | Email i lozinka; prvi pristup putem poziva, korisnik sam postavlja lozinku; oporavak preko emaila | Kod na email pri svakoj prijavi, bez lozinke |
| PIL-03 — uključivanje | Članove poziva ovlašćeni administrator svog ZEV-a; nema javnog samostalnog pristupanja ZEV-u | Potvrditi ko dobija administraciju |
| PIL-14 — granica | Jedan tenant predstavlja jedan ZEV; pilot ima jednu zgradu. Nalog može imati odvojena članstva u više ZEV-ova | Više zgrada unutar istog ZEV-a zahtijeva razradu prije takve upotrebe |
| PIL-15 — početna administracija | Prvog administratora ZEV-a postavlja kontrolisana operativna procedura nakon potvrde ovlašćenja; on poziva članove i dodjeljuje konkretne dozvole | Funkcija predsjednika, upravnika ili zastupnika sama ne daje aplikaciona prava |
| PIL-04 — vlasnik i suvlasnik | Vidi zajedničke sadržaje i izričito povezane kartice za dozvoljeni period. Više suvlasnika može vidjeti istu karticu bez dupliranja zaduženja | Potvrditi pravilo perioda pri promjeni vlasništva prije zavisne šeme |
| PIL-04 — zakupac | Zajednički sadržaji i sopstvene prijave; kartica samo po posebnom evidentiranom ovlašćenju | Bez automatskog prava na karticu vlasnika |
| PIL-10 — prijave i prilozi | Prijavu i fotografiju vide autor i ovlašćeni obrađivač; prilozi uplata prate karticu, zajednički dokumenti prate dozvoljeni zajednički sadržaj | Potvrditi ovaj obim |

Predložena dodjela dozvola je odvojena od funkcija ZEV-a:

| Skup dozvola | Obim |
|---|---|
| Član | Zajednički sadržaji, sopstvene prijave i informativne ankete prema njihovim pravilima |
| Ovlašćenje za karticu | Pregled izričito povezanih kartica i dozvoljenih perioda, uključujući njihove privatne priloge |
| Finansijski operater | Pregled kartica ZEV-a i finansijski unos/ispravke uz istoriju; bez automatskog upravljanja članstvima |
| Operater sadržaja | Radovi/ponude, objave, obrada prijava i upravljanje anketama; pojedinačne dozvole mogu se dodijeliti zasebno |
| Administrator ZEV-a | Jedinice, članstva, pozivi i dozvole u sopstvenom ZEV-u; poslovni sadržaj samo uz dodatna konkretna prava |

Jedna osoba može dobiti više skupova. Dodjela i opoziv bilježe osnov, autora i period; korisnik ne dodjeljuje prava koja nema ovlašćenje da dodjeljuje. Potrebno je posebno potvrditi ko upravlja drugim administratorima i kako se vrši primopredaja. Platformska podrška nema podrazumijevani pristup podacima svih ZEV-ova.

Prijedlog za početni pilot je jedna ovlašćena osoba sa administracijom, finansijama i sadržajem, uz mogućnost kasnije podjele poslova. To ne izjednačava njenu pravnu funkciju sa ovim dozvolama.

Prije DEV-03 potvrditi izbor prijave, tenant granicu, dodjelu/primopredaju administratorskih prava i tačnu matricu, uključujući period pristupa pri promjeni vlasništva. Hosting/region/trošak ostaju odluke prije kreiranja udaljenih resursa; finansijski prijedlozi PIL-07–09 i ankete PIL-11 ostaju za odgovarajuće faze.

Tehnička izvodljivost prijave provjerena u zvaničnoj Supabase dokumentaciji: [email i lozinka / oporavak](https://supabase.com/docs/guides/auth/passwords), [prijava email kodom ili linkom](https://supabase.com/docs/guides/auth/auth-email-passwordless). Izbor email i lozinke je lokalni prijedlog za dogovor, ne zahtjev dokumentacije. Za stvarno slanje poziva i oporavka potrebno je prije upotrebe podesiti email isporuku; ovaj zadatak ne kreira usluge i ne šalje pozive.

## 10. Potvrda početnog modela i razrada rola — 17. oktobar 2026.

Korisnik je prihvatio početni model iz prethodnog razgovora: email i lozinka, pozivi za pristup, jedan ZEV po tenantu uz odvojena članstva, početna ovlašćena osoba za administraciju/finansije/sadržaj, vlasnikov pristup svojim karticama i zakupčev pristup kartici samo uz posebno ovlašćenje. Funkcije ZEV-a vode se odvojeno od dozvola. Ovo ažurira ranije otvoreni PIL-03 i granicu PIL-14; detaljna matrica PIL-15 ostaje za dogovor. Ne potvrđuje sve detalje odjeljka 9 koji nisu bili navedeni u pitanju, posebno privatnost prijava, suvlasničke periode i primopredaju administratora.

### Aplikacione role — potvrde i preostali prijedlozi

Role su skupovi dozvola unutar jednog ZEV-a. Osoba može kombinovati više rola; status vlasnika i ovlašćenje za određenu karticu vode se zasebno. Predsjednik skupštine, predsjednik/član odbora, upravnik i registrovani zastupnik ostaju funkcije sa osnovom i periodom; dodijeljena aplikaciona rola određuje radnje.

| Rola | Pregled | Upis i upravljanje | Granica |
|---|---|---|---|
| Član — POTVRĐENO | Zajedničke finansije, radovi/ponude, obavještenja i sopstvene prijave | Slanje sopstvenih prijava i učešće u informativnim anketama | Vlasnik vidi svoje kartice; zakupac samo uz posebno ovlašćenje. Bez izmjene zajedničkih podataka ili pristupa tuđim karticama |
| Administrator ZEV-a — POTVRĐENO | Svi podaci i prilozi svog ZEV-a, uključujući sve kartice | Puni upis svih modula, pozivi, jedinice, članstva i tenant role, uključujući druge administratore svog ZEV-a | Isključivo svoj ZEV; bez dodjele globalne role. Detalji u odjeljku 12 |
| Finansijski operater — POTVRĐENO | Zajedničke finansije, sve kartice svog ZEV-a i finansijski prilozi | Zaduženja, uplate, rashodi, usaglašavanje i korektivni zapisi uz istoriju | Bez upravljanja članstvima, rolama ili drugim modulima |
| Operater sadržaja — POTVRĐENO | Radovi, ponude, objave, prijave i ankete svog ZEV-a | Upravljanje radovima/ponudama/statusima, objavama, prijavama/statusima i informativnim anketama | Bez finansijskog upisa, tuđih kartica, upravljanja članovima ili rolama |
| Finansijski pregled — POTVRĐENO | Sve kartice i finansijski prilozi svog ZEV-a | Bez unosa ili izmjena | Posebno dodijeljena rola; članstvo u odboru ili status računovođe je ne dodjeljuju automatski |

Sve tenant role zahtijevaju aktivno članstvo; pristup kartici i prilogu obuhvata samo dozvoljeni period. Opoziv uklanja naredni pristup i kroz aktivnu sesiju, a prethodne radnje ostaju u istoriji. Administrator sistema je zasebna globalna rola za sve tenante prema naknadnoj potvrdi u odjeljku 11; nije uslovljena pojedinačnim članstvom u svakom ZEV-u.

### Odluke za sljedeći odgovor korisnika

1. Ko u pilotu dobija kombinaciju administrator + finansijski operater + operater sadržaja: potvrđeni zastupnik, druga ovlašćena osoba ili više osoba sa podijeljenim poslovima?
2. Da li samo kontrolisana procedura platforme postavlja/mijenja administratore ZEV-a, dok administrator ZEV-a dodjeljuje ostale role; ili administrator ZEV-a može imenovati i drugog administratora? U oba slučaja potrebni su osnov, istorija i pravilo primopredaje bez gubitka posljednjeg administratora.
3. Da li sada uključiti zasebnu rolu finansijskog pregleda za računovođu/ovlašćenog člana odbora, ili je ostaviti za kasnije?

Nakon ovog izbora potvrditi privatnost prijava/priloga, prava suvlasnika i period nakon promjene vlasništva. Konkretne potvrde upisati prije zavisne šeme DEV-03. Ova matrica je prijedlog proizvoda i ne utvrđuje zakonska ovlašćenja.

## 11. Administrator sistema — potvrđena globalna rola

17. oktobar 2026: korisnik izričito potvrđuje zasebnog **administratora sistema**, vezanog za sve tenante i najvišeg u hijerarhiji. Ovo zamjenjuje raniji nacrt ograničenog administratora platforme iz odjeljka 6. Ograničenja obične platformske podrške ne odnose se automatski na ovu rolu.

| Rola | Opseg | Status |
|---|---|---|
| Administrator sistema | Cijela platforma i svi tenant prostori; globalna dodjela nezavisna od pojedinačnih članstava | POTVRĐENO |
| Administrator ZEV-a | Puni pregled i edit u ZEV-u u kojem ima dodijeljeno ovlašćenje | POTVRĐENO — odjeljak 12 |
| Ostale aplikacione role | Konkretni moduli i podaci u okviru svog članstva i ovlašćenja | Detaljna matrica još se dogovara |

Naknadna potvrda 17. oktobra 2026: korisnik traži **apsolutan edit po potrebi**. Administrator sistema ima puni pregled, kreiranje i izmjene svih poslovnih podataka i podešavanja u svim tenantima: tenant prostori, jedinice, vlasničke veze, članstva, korisnici i role, finansije i sve kartice, radovi/ponude, objave, prijave, ankete i privatni prilozi. Može postavljati i mijenjati administratore ZEV-a i upravljati globalnim dodjelama rola. Za ove radnje nije potrebna dodatna tenant rola ili članstvo, niti odobrenje administratora pojedinačnog ZEV-a. Konkretni postupci dodjele globalne role, primopredaje i oporavka još se dogovaraju. Privremeno delegiranje pristupa podršci nije automatski odobreno ovom potvrdom.

Postojeća pravila istorije i finansijskih ispravki ostaju važeća i uz puni edit. Predložena razrada zaštite integriteta: administrator ZEV-a ne može dodijeliti globalnu rolu; svaka radnja administratora sistema bilježi stvarnog autora i ciljni tenant; finansijske ispravke i dalje idu korektivnim zapisom; globalni administrator ne briše tragove izmjena. O dodjeli globalne role, zaštiti posljednjeg administratora sistema i oporavku pristupa dogovoriti postupak prije implementacije. Ne podrazumijevati neprimjetno predstavljanje kao drugi korisnik.

Ovo je dokumentovana odluka o modelu rola. Globalni nalog, serverske provjere i pristup tenantima još nisu implementirani; DEV-03 nije započet.

### Evidencija naknadne potvrde punog pristupa

17. oktobar 2026: puni edit administratora sistema je POTVRĐENO, a raniji zahtjev za potvrdu pregleda naspram izmjena je razriješen. To je poslovno ovlašćenje za sve module; ne mijenja raniji dogovor o korektivnim finansijskim zapisima i očuvanju istorije. Implementacija i provjera tih prava pripadaju DEV-03 i narednim modulima.

## 12. Administrator ZEV-a — potvrđen puni tenant pristup

17. oktobar 2026: korisnik potvrđuje puni pregled i edit administratora ZEV-a, isključivo unutar njegovog ZEV-a. Time se zamjenjuje raniji prijedlog odvojenih administratorskih i operaterskih prava za ovu rolu iz odjeljaka 9–10. Ti prijedlozi ostaju istorija i osnova za zasebne ograničene operaterske role.

Administrator ZEV-a može pregledati, kreirati i mijenjati sve poslovne podatke i podešavanja svog ZEV-a: jedinice, vlasničke veze, članstva, pozive, tenant role, finansije i sve kartice, privatne priloge, radove/ponude, objave, prijave i ankete. Nisu potrebne dodatne role finansijskog operatera ili operatera sadržaja. Puno upravljanje tenant rolama obuhvata postavljanje i opoziv drugog administratora istog ZEV-a; ta radnja se evidentira. Prvog administratora može postaviti administrator sistema.

Ova rola ne daje pristup drugim ZEV-ovima, upravljanje globalnim nalozima ili dodjelu administratora sistema. Pri radu sa korisnikom koji ima više članstava mijenja samo vezu/prava tog korisnika u svom ZEV-u; globalni identitet i tuđa članstva ostaju u nadležnosti administratora sistema. Ista osoba može biti administrator više ZEV-ova samo uz odgovarajuću zasebnu dodjelu u svakom.

Puni edit zadržava istoriju autora i izmjena i postojeći postupak korektivnih finansijskih zapisa. Pravilo primopredaje, zaštita posljednjeg administratora i oporavak pristupa još se dogovaraju. Administratorska rola nije dokaz pravne funkcije ili zastupanja ZEV-a. Ovo je potvrda specifikacije; implementacija nije započeta.

### Naknadno pojašnjenje — privremena dozvola finansijskog unosa

17. oktobar 2026: nakon primjedbe da administrator ZEV-a ne može mijenjati tuđe podatke, korisnik za sada odobrava unos zaduženja i uplata na kartice drugih vlasnika **u njegovom ZEV-u**, uz kasniji pregled kako to funkcioniše. Status: **POTVRĐENO ZA SADA — PONOVO PREGLEDATI**. Ova potvrda se odnosi na unos, a ne predstavlja novu potvrdu proizvoljnog prepisivanja prethodnih finansijskih zapisa; za ispravke ostaju korektivni zapisi i istorija.

Konkretno pravo izmjene ličnih podataka drugih korisnika ostaje **OTVORENO**, zbog ove naknadne primjedbe; ranija opšta formulacija punog tenant edita ne smije se koristiti kao razriješeno ovlašćenje za tu radnju. Globalni identitet/nalozi i podaci drugih ZEV-ova ostaju izvan tenant administracije. Prije implementacije izmjene tuđih ličnih podataka potrebno je razriješiti taj obim. Nakon dostupnosti stvarnog toka finansijskog unosa zakazati korisnikov pregled kroz dogovor u razgovoru; ovim zapisom nije kreirano automatsko podsjećanje niti odobren backend.

## 13. Finansijski operater — potvrđena rola

17. oktobar 2026: korisnik potvrđuje pregled svih kartica i finansijskih priloga svog ZEV-a, unos zaduženja, uplata i troškova, usaglašavanje i ispravke uz istoriju promjena. Finansijske ispravke koriste postojeći dogovor o korektivnim zapisima i vezi na original.

Rola važi samo u ZEV-u u kojem je dodijeljena i uz aktivno članstvo. Ne daje upravljanje članovima, rolama ili drugim modulima, niti pristup drugim tenantima. Ako osoba treba operativno raditi u drugim modulima, potrebna joj je odgovarajuća dodatna rola. Dodjeljuju je administrator ZEV-a u svom ZEV-u ili administrator sistema. Svaka finansijska radnja čuva autora i ciljni ZEV.

Ovo potvrđuje ovlašćenja u specifikaciji; nisu implementirani backend ili produkciona finansijska evidencija. Sljedeći dogovor je operater sadržaja, zatim preostale role i otvorena pravila pristupa/primopredaje.

## 14. Operater sadržaja — potvrđena rola

17. oktobar 2026: korisnik potvrđuje upravljanje radovima, ponudama i statusima, obavještenjima, prijavama problema i njihovim statusima te informativnim anketama u svom ZEV-u. Pravo obrade prijava uključuje pregled njihovog sadržaja i povezanih fotografija potrebnih za obradu.

Rola ne daje finansijski upis, pristup tuđim karticama ili njihovim privatnim finansijskim prilozima, upravljanje članovima/rolama ili pristup drugim tenantima. Evidentiranje ponude i ugovorenog iznosa pripada radu; knjiženje povezane isplate pripada finansijskom operateru ili ovlašćenom administratoru. Kombinovanje sa drugom rolom moguće je zasebnom dodjelom.

Rola zahtijeva aktivno članstvo i dodjelu u konkretnom ZEV-u od administratora tog ZEV-a ili administratora sistema. Izmjene čuvaju autora i istoriju. Ovo je potvrda specifikacije, bez implementacije. Preostaje dogovor osnovnog člana/vlasnika/zakupca, opcione role finansijskog pregleda i otvorenih pravila pristupa/primopredaje.

## 15. Član — potvrđena osnovna rola

17. oktobar 2026: korisnik potvrđuje pregled zajedničkih finansija, radova, ponuda i obavještenja, slanje i pregled sopstvenih prijava problema i učešće u informativnim anketama. Rola važi uz aktivno članstvo u konkretnom ZEV-u i ne daje izmjenu zajedničkih podataka, finansijski upis, upravljanje članovima/rolama ili pristup tuđim karticama i njihovim privatnim prilozima.

Vlasnik dobija pristup svojim izričito povezanim karticama; zakupac pristup kartici dobija samo uz posebno ovlašćenje. Članstvo i vlasnička veza vode se odvojeno. Prijave i fotografije drugih članova nisu dostupne kroz osnovnu rolu. Operater sadržaja i administratori obrađuju prijave prema svojim pravima.

Ovom potvrdom nisu razriješeni period pristupa pri promjeni vlasništva, detalji suvlasništva ili delegiranja zakupcu, niti pravilo učestvovanja/vidljivosti rezultata anketa iz PIL-11. Te detalje potvrditi prije zavisne implementacije. Preostaje izbor opcione role finansijskog pregleda, zatim otvorena pravila dodjele/primopredaje i ličnih podataka. Ovo je potvrda specifikacije, bez implementacije.

## 16. Finansijski pregled — potvrđena rola

17. oktobar 2026: korisnik potvrđuje uključivanje role sada, sa pregledom svih kartica i finansijskih priloga svog ZEV-a, bez unosa ili izmjene. Namijenjena je osobi sa izričitim ovlašćenjem za finansijski pregled, na primjer računovođi ili ovlašćenom članu odbora; funkcija ili zanimanje ne dodjeljuju je automatski.

Rola važi uz aktivno članstvo i dodjelu u konkretnom ZEV-u. Ne dozvoljava finansijske upise/ispravke, upravljanje drugim modulima, članovima ili rolama i ne daje pristup drugim tenantima. Dodjeljuje je administrator svog ZEV-a ili administrator sistema. Može se kombinovati sa drugim rolama; tada dodatna prava dolaze iz tih dodjela.

Sada su potvrđene osnovne aplikacione role: administrator sistema, administrator ZEV-a (uz zabilježeno naknadno pojašnjenje), finansijski operater, operater sadržaja, član i finansijski pregled. Otvoreni ostaju konkretni postupci dodjele/primopredaje/oporavka, izmjene ličnih podataka, periodi/suvlasništvo i ostala zavisna pravila. DEV-01 nije time završen; implementacija nije započeta.

## 17. Dodjela i ukidanje prava — potvrđena pravila

17. oktobar 2026: korisnik potvrđuje:

1. Administrator sistema postavlja prvog administratora ZEV-a.
2. Administrator ZEV-a dodjeljuje i ukida tenant role, uključujući druge administratore svog ZEV-a. Globalnu rolu ne može dodijeliti.
3. Posljednji administrator ne može biti uklonjen bez prethodne zamjene. To uključuje uklanjanje njegove role ili članstva koje bi ZEV ostavilo bez administratora; primopredaja se završava prije ukidanja prethodnog prava.
4. Svaka promjena prava čuva autora i vrijeme, uz ciljnog korisnika, ZEV i prethodnu/novu dodjelu radi razumljive istorije.

Ovo razrješava ranije otvorenu tenant dodjelu/primopredaju u odjeljcima 9–12 i 16. Globalni administrator zadržava potvrđeni opseg upravljanja; oporavak u slučaju gubitka pristupa i početno postavljanje/globalna primopredaja administratora sistema zahtijevaju poseban operativni postupak. Potvrda ne odobrava zaobilaženje istorije promjena niti započinje implementaciju.

Sljedeća odluka: ko može mijenjati lične podatke korisnika. Predloženi model za potvrdu: korisnik mijenja sopstveni profil; administrator ZEV-a vodi podatke jedinice, vlasničke veze, članstva i ovlašćenja svog ZEV-a, ali ne mijenja globalni profil ili prijavne podatke druge osobe; administrator sistema može ispraviti podatke uz istoriju. Promjene emaila/lozinke i oporavak moraju imati poseban potvrđen postupak. Taj model još nije potvrđen.

## 18. Lični podaci — potvrđena podjela prava

17. oktobar 2026: korisnik potvrđuje:

- Korisnik uređuje svoj profil.
- Administrator ZEV-a uređuje jedinice, vlasničke veze, članstva i prava u svom ZEV-u, ali ne mijenja profil ili prijavne podatke drugih korisnika.
- Administrator sistema može ispraviti podatke uz istoriju promjene.

Ovim se razrješava otvoreno pitanje iz odjeljaka 12 i 17. Ova konkretna podjela ima prednost nad ranijom opštom formulacijom punog tenant edita. Uređivanje sopstvenog profila ne omogućava promjenu sopstvenih rola, vlasničkih veza ili ovlašćenja za kartice. Tenant evidencija se vodi odvojeno od globalnog identiteta osobe.

Pravo sistemske ispravke ne podrazumijeva čitanje postojeće lozinke. Postupak promjene emaila/lozinke, oporavak pristupa i globalna primopredaja još zahtijevaju operativnu razradu. Preostaje dogovor perioda pristupa pri promjeni vlasništva, suvlasništva i delegiranja pristupa zakupcu. Ovo je potvrda specifikacije; implementacija nije započeta.

## 19. Suvlasništvo — potvrđen zajednički pregled kartice

17. oktobar 2026: korisnik potvrđuje da više potvrđenih suvlasnika može vidjeti istu karticu jedinice. Zaduženje se obračunava jednom za jedinicu, bez dupliranja po suvlasniku.

Svaki suvlasnik ima svoj nalog, potvrđenu vezu sa jedinicom i odgovarajuće članstvo/ovlašćenje; nalozi se ne dijele. Pristup istoj kartici sam po sebi ne daje finansijski upis ili upravljanje pravima drugih suvlasnika. Posebna podjela jednog zaduženja na više ličnih kartica nije dogovorena ovom potvrdom.

Ovo razrješava raniji prijedlog zajedničke kartice iz odjeljaka 2, 9 i 15. Period pristupa pri promjeni vlasništva, postupak evidentiranja promjene i delegiranje zakupcu ostaju za dogovor. Potvrda je pravilo proizvoda za evidenciju i ne određuje pravni prenos duga ili prava formalnog glasanja. Implementacija nije započeta.

## 20. Promjena vlasništva — potvrđen model evidencije i pristupa

17. oktobar 2026: korisnik potvrđuje:

- Evidentira se datum promjene vlasništva.
- Novi vlasnik vidi svoju evidenciju od tog datuma, bez privatnih podataka prethodnog vlasnika.
- Prethodni dug i avans ne prenose se automatski.
- Pristup starog vlasnika ostaje ograničen na njegov raniji period.

Vlasnička veza i ovlašćenje za karticu zato moraju imati vremenski obuhvat; promjena ne prepisuje prethodnog vlasnika u istorijskim zapisima. Pravilo zajedničkog pregleda suvlasnika iz odjeljka 19 važi samo za njihove dozvoljene periode. Novi vlasnik ne dobija stare privatne priloge ili istoriju prethodnika posredno kroz karticu, audit zapis ili vezu na dokument.

Zadržani pregled ranijeg perioda je posebno istorijsko ovlašćenje, a ne nastavak aktivne članske role ili prava unosa. Opoziv tog ovlašćenja mora ukinuti dalji pristup; promjena vlasništva sama po sebi ne daje starom vlasniku pristup novim zajedničkim sadržajima. Ovo dopunjuje ranije opšte pravilo aktivnog članstva za taj ograničeni istorijski pregled.

Potvrđen je model proizvoda, ne pravni prenos potraživanja. Prije DEV-04 razraditi postupanje sa uplatom nakon promjene, eventualni dokumentovani prenos salda i obračun mjeseca u kojem se vlasništvo mijenja; oni nisu određeni ovom potvrdom. Preostaje delegiranje pristupa zakupcu i operativni postupci pristupa/oporavka. Implementacija nije započeta.

## 21. Ovlašćenje zakupca za karticu — potvrđeno pravilo

17. oktobar 2026: korisnik potvrđuje:

- Vlasnik traži dodjelu, a administrator ZEV-a evidentira ovlašćenje.
- Ovlašćenje određuje konkretnu karticu i period pregleda.
- Zakupac može pregledati dozvoljene podatke, bez finansijskog unosa.
- Ovlašćenje se može opozvati i prestaje istekom perioda.

Ovlašćenje se veže za zakupčev zaseban nalog i članstvo u tom ZEV-u; ne dijele se vlasnikovi pristupni podaci. Vodi se osnov, vlasnik koji traži dodjelu, administrator koji je evidentira, kartica i period; dodjela/opoziv čuvaju istoriju. Vlasnik ne može delegirati period ili karticu kojima sam nema pristup. Prilozi i istorija prikazuju se samo u dozvoljenom obimu kartice i perioda, bez privatnih podataka prethodnih vlasnika.

Ovo ovlašćenje samo po sebi ne dodjeljuje finansijsku ili administratorsku rolu. Opoziv ili istek ukida naredni pristup kartici i njenim privatnim prilozima, uključujući zahtjeve iz već aktivne sesije. Ne ukida automatski druga nezavisna prava člana. Postupak zahtjeva za opoziv i slučaj promjene vlasnika tokom važenja delegacije razraditi prije zavisne implementacije; ovom potvrdom se ne pretpostavlja da delegacija prelazi na novog vlasnika.

Ovim je potvrđen osnovni model delegiranja iz PIL-04 i prethodnih odjeljaka. Preostaju operativni postupci pristupa/oporavka i globalne primopredaje te navedeni rubni slučajevi i finansijske odluke za kasnije faze. Implementacija nije započeta.

### Dopuna odjeljka 21 — opoziv i promjena vlasnika

17. oktobar 2026: korisnik dodatno potvrđuje:

- Vlasnik može zatražiti opoziv ovlašćenja zakupcu; administrator ZEV-a ga evidentira.
- Promjenom vlasnika prestaju ovlašćenja zakupcu koja je dao prethodni vlasnik.
- Novi vlasnik po potrebi traži novo ovlašćenje.

Ovim se razrješavaju prethodno otvoreni opoziv i promjena vlasnika tokom delegacije. Prestanak prati evidentirani datum promjene vlasništva; stara delegacija ne daje zakupcu nastavak istorijskog pregleda kartice. Istorija same dodjele/opoziva ostaje sačuvana za ovlašćene osobe. Druga nezavisna članstva ili role zakupca nisu automatski opozvani ovom radnjom.

Preostali operativni dogovor: oporavak izgubljenog pristupa, prvo postavljanje i primopredaja administratora sistema. Finansijska pravila promjene vlasništva ostaju za DEV-04. Ovo je dopuna specifikacije, bez implementacije.

## 22. Oporavak pristupa i administrator sistema — potvrđena pravila

17. oktobar 2026: korisnik potvrđuje:

- Korisnik obnavlja lozinku putem svog emaila.
- Ako izgubi pristup emailu, administrator sistema pokreće oporavak nakon provjere identiteta, uz evidenciju.
- Novog administratora sistema postavlja postojeći; posljednji se ne može ukloniti bez zamjene.

Ovo razrješava raniji dogovoreni izbor načina oporavka i globalne primopredaje. Oporavak ne dodjeljuje nove tenant role ili vlasnička prava; služi vraćanju pristupa potvrđenoj osobi. Implementacioni postupak mora definisati provjeru identiteta i trag oporavka bez čuvanja lozinki/tajni u dokumentaciji. Prvo postavljanje administratora sistema i slučaj gubitka pristupa svim sistemskim administratorima zahtijevaju kontrolisanu operativnu proceduru prije upotrebe; korisnik ovom potvrdom nije imenovao početnu osobu ili način provjere.

### Aktuelni zaključak dogovora rola

Dogovoreno je svih šest aplikacionih rola, njihovi osnovni opsezi, upravljanje tenant rolama, podjela ličnih podataka, suvlasnička kartica, period pristupa pri promjeni vlasništva, delegiranje zakupcu/opoziv i osnovni oporavak/globalna primopredaja. Odjeljci 10–22 imaju prednost nad ranijim nacrtima u dijelu koji izričito razrješavaju.

Preostalo je konsolidovati početnu tabelu PIL odluka i matricu prema ovim potvrdama i provjeriti preduslove DEV-03. To je dokumentacioni/tehnički pripremni korak, ne odobrenje backenda. Prije udaljenih resursa potrebno je odabrati hosting, region, trošak i odgovornu osobu (PIL-12); prije stvarnog oporavka definisati gore navedene operativne procedure. Finansijske odluke PIL-05–09 i detalji obračuna promjene vlasništva razrješavaju se prije DEV-04; detalji anketa PIL-11 prije DEV-07. DEV-01 kao cjelina još nije proglašen završenim. Izrada i provjera produkcionih prava još nisu započete.

## 23. Konsolidacija i pregled preduslova — 17. oktobar 2026.

Objedinjene su potvrde u [matrici prava](matrica-prava.md), usklađene PIL-03/04/10/14/15 i odvojeni kasniji finansijski, anketni i operativni dogovori. Potvrđena prava nisu implementirana. Instrukcija za backend i izbor lokalnog/udaljenog početka ostaju za sljedeći dogovor; PIL-12 mora biti riješen prije udaljenih resursa. DEV-01 ostaje U TOKU zbog preostalih odluka sa navedenim fazama.

## 24. Lokalni staging — odobren DEV-03-A

17. oktobar 2026: korisnik nalaže lokalnu bazu za staging i kasniji prelazak na udaljenu. Lokalna osnova identiteta/tenant modela, migracija i sintetički seed pripadaju ovom zadatku; stvarna prijava, pun model RLS/RPC-a i UI povezivanje nisu završeni niti uključeni u ovu isporuku. PIL-12 ostaje uslov prije udaljenih resursa, a operativne procedure globalnog pristupa prije stvarnih naloga. [Uputstvo](lokalni-staging.md) i [evidencija](napredak.md) određuju stvarni rezultat provjere.
