# Finansijske odluke prije DEV-04

Datum: 17. oktobar 2026. (Europe/Belgrade). Priprema DEV-03-E; **osnovna pravila FIN-03–05 djelimično su potvrđena odgovorom korisnika; ostali detalji su prijedlozi**. Korisnik odlučuje o ponašanju proizvoda; ovlašćena osoba ZEV-a obezbjeđuje stvarni osnov i podatke prije pilota. Ne unositi lične podatke, izvode ili kredencijale u repozitorijum/chat.

Potvrđeno: obračun po m², ručni rok plaćanja, zajednička kartica suvlasnika bez dupliranja, novi vlasnik vidi svoj period, stari dug/avans se ne prenosi automatski, istorija se čuva. Detalji su u [specifikaciji](pilot-specifikacija.md). Ovdje se traže produktne odluke, ne daje pravno ili računovodstveno mišljenje.

| ID / veza | Konkretno pitanje za odluku | Predloženo ponašanje / potreban podatak | Ko i zavisnost |
|---|---|---|---|
| FIN-01 / PIL-05 | Koji je početni datum/mjesec i kako se potvrđuje početno stanje? | Odvojeno evidentirati novac na računu na presjeku i dug/avans po ovlašćenom periodu kartice; početni dug nije novi novčani prihod. Za lokalnu izradu posebno potvrditi sintetički skup, za pilot ovjereni izvor stanja | Korisnik + operater pilota; prije DEV-04 modela početnih stanja |
| FIN-02 / PIL-06 | Koja stopa, površina i pravilo važe za koju vrstu jedinice i od kada? | Zabilježiti osnov odluke, važenje, stambenu/poslovnu namjenu i potrebne izuzetke. Stopa 0,50 iz primjera nije potvrđena. Ne svesti garaže ili poslovne prostore na pretpostavku bez podataka/osnova | Korisnik potvrđuje model; ovlašćena osoba osnov; prije obračuna |
| FIN-03 / PIL-07 | Da li obračun ručno pokreće ovlašćeni operater uz pregled prije potvrde? | Jedan obračun po jedinici/periodu, bez dupliranja po suvlasniku ili ponovljenom zahtjevu; nedostajući rok blokira potvrdu. Izmjena potvrđenog roka samo uz razlog i istoriju — potvrditi i ovo pravilo | Korisnik; prije DEV-04 |
| FIN-04 / PIL-07 | Kako se raspoređuje uplata i koristi postojeći avans? | Prvo najstarije dospjele obaveze, kod istog dospijeća stabilan red po periodu pa ID-ju; ostatak avans. POTVRĐENO: postojeći avans automatski pokriva naredno zaduženje bez novog priliva. Odlučiti da li operater smije dokumentovano promijeniti raspored | Korisnik; prije knjiženja i rasporeda |
| FIN-05 / PIL-08 | Da li prihvatamo feninge, pola naviše po zaduženju i bez automatskih kamata? | Površina × važeća stopa precizno, konačno zaduženje zaokruženo jednom; npr. 10,005 KM → 10,01 KM. Ne zaokruživati binarnim floating-point izračunom | Korisnik; prije izračuna |
| FIN-06 / PIL-09 | Da li pogrešan novčani zapis ispravljamo stornom + novim ispravnim zapisom? | Original ostaje, obavezni razlog, autor/vrijeme i veza; povezani rasporedi se ispravljaju zajedno. Promjena opisa ima istoriju bez pomjeranja novca. Nema tihog prepisivanja ili brisanja | Korisnik; prije korekcija |
| FIN-07 / promjena vlasništva | Kako dijelimo mjesec promjene i evidentiramo zakašnjelu uplatu? | POTVRĐENO: podjela po kalendarskim danima vlasništva; datum promjene pripada novom vlasniku. Ostatak feninga otvoren. POTVRĐENO: zakašnjela uplata za prethodni dug zatvara dug prethodnog vlasnika, bez promjene kartice novog vlasnika. Datum prijema i period obaveze vode se odvojeno. Bez automatskog prenosa duga/avansa | Korisnik i ovlašćena osoba; prije modela perioda finansija |
| FIN-08 / promjena vlasništva | Da li u prvoj verziji uopšte dozvoljavamo dokumentovani prenos salda? | POTVRĐENO: prva verzija nema prenos duga ili avansa između prethodnog i novog vlasnika; svako zadržava svoj saldo. Eventualna kasnija podrška zahtijeva novi dogovor | Korisnik; prije eventualnog prenosa |
| FIN-09 / povrat | Kako vraćamo avans i obrađujemo neidentifikovanu uplatu? | POTVRĐENO: povrat do raspoloživog avansa uz evidentiran razlog; isplata istovremeno smanjuje novac ZEV-a i avans vlasnika. POTVRĐENO: neidentifikovana uplata povećava sredstva jednom, ostaje neraspoređena do potvrde kartice od operatera; naknadni raspored ne povećava sredstva ponovo. Ne daje pristup kartici | Korisnik; prije povrata/rasporeda |
| FIN-10 / usaglašavanje | Kako se evidentira razlika prema banci i ko je potvrđuje? | POTVRĐENO: datum, stanje sa bankovnog izvoda i razlika prema aplikaciji; razliku razjasniti bez automatskog prihoda/rashoda radi izjednačavanja. Potvrditi kategorije prihoda/rashoda, da li je blagajna izvan obima i ko radi periodični pregled | Korisnik + operater; prije usaglašavanja |
| FIN-11 / PIL-10 | Koji dokument ide zajednici, a koji samo kartici i periodu? | POTVRĐENO: zajednički račun dostupan članovima nakon provjere i uklanjanja nepotrebnih ličnih podataka; prilog pojedinačne uplate prati prava konkretne kartice i perioda. Dokument više vlasničkih perioda razdvojiti; FK i opseg iz roditeljskog zapisa, bez slobodnog biranja opsega priloga | Korisnik potvrđuje tok; izrada u DEV-04 |

Pitanja ostaju otvorena izuzev izričitih potvrda navedenih ispod. Odgovor na sažeto pitanje FIN-03–05 ne potvrđuje preostale detalje poput promjene roka, ručnog izuzetka rasporeda ili modela vlasničke promjene. Stvarni početni iznosi i tarifa potrebni su prije stvarnog obračuna; korisnik može zasebno odobriti sintetičke vrijednosti za lokalnu implementaciju, što ne potvrđuje pilot podatke.

## Primjer za prihvatanje pravila

Sintetički podaci iz specifikacije, bez produkcionog knjiženja: račun 1.000,00 KM; A dug 20,00, B avans 10,00; po 60 m² × ilustrativnih 0,50 KM = 30,00 KM.

| Korak | A | B | Novac |
|---|---|---|---|
| Početak | Dug 20,00 | Avans 10,00 | 1.000,00 |
| Obračun +30,00 po jedinici | Dug 50,00 | Dug 20,00 | 1.000,00 |
| Uplata A 40,00; B 25,00 | Dug 10,00 | Avans 5,00 | 1.065,00 |
| Rashod 120,00 | Dug 10,00 | Avans 5,00 | 945,00 |
| Storno pogrešnog rashoda i ispravan rashod 110,00 | Dug 10,00 | Avans 5,00 | 955,00 |
| Povrat cijelog avansa B 5,00 | Dug 10,00 | Saldo 0,00 | 950,00 |

Računska provjera: 1.000 + 40 + 25 − 110 − 5 = 950. Zaduženja i rasporedi uplata ne mijenjaju novac drugi put. Povrat je dodatni prijedlog za odluku, ne već prihvaćeno pravilo.

Posebno treba odgovor za primjer promjene vlasnika 16. u mjesecu: ko dobija koje zaduženje, kako se knjiži uplata za raniji dug primljena 20. i koji privatni dokument vidi koja osoba. Ne biramo pravni prenos duga na osnovu softverske pretpostavke.

## Način odgovora

Moguće je potvrditi pojedinačne FIN oznake i navesti izmjene za ostale. Prioritet su obračun/raspored/preciznost, zatim korekcije i promjena vlasništva; stvarne podatke prikupljati odvojeno u ograničenoj evidenciji. Potvrda pravila sama ne odobrava izradu DEV-04. Status i primljene odluke vode se u [napretku](napredak.md).

## Potvrda osnovnih pravila — 17. oktobar 2026.

Korisnik je na tri konkretno navedena pravila odgovorio „Da“:

- FIN-03: ovlašćeni operater ručno pokreće mjesečni obračun uz pregled prije potvrde.
- FIN-04: uplata prvo zatvara najstarije dospjele obaveze; ostatak je avans.
- FIN-05: računanje u feningima, zaokruživanje pola naviše, bez automatskih kamata.

To nije potvrda svih detalja redova FIN-03–05: postupanje bez roka/promjena roka, redoslijed jednakih dospijeća, ručni izuzetak rasporeda, automatska upotreba postojećeg avansa i tačan nivo zaokruživanja po zaduženju ostaju za razradu. FIN-01/02 i FIN-07–11 ostaju otvoreni; FIN-06 je naknadno potvrđen u obimu ispod. Nema odobrenja implementacije DEV-04 ili prihvatanja C/D.

## Potvrda korekcija — 17. oktobar 2026.

Korisnik potvrđuje FIN-06/PIL-09: pogrešan iznos ispravlja se stornom i novim ispravnim zapisom uz obavezan razlog, autora i vrijeme; original ostaje sačuvan. Detalji korekcije povezanih rasporeda i promjene opisa nisu obuhvaćeni tim pitanjem. Sljedeća odluka je obračun mjeseca u kojem se mijenja vlasnik (FIN-07); nema odobrenja DEV-04.

## Potvrda podjele mjeseca — 17. oktobar 2026.

Korisnik potvrđuje FIN-07 u dijelu mjesečnog zaduženja: srazmjerna podjela prema broju dana vlasništva, uz stvarni broj dana konkretnog mjeseca. Datum promjene je prvi dan novog vlasnika; prethodni period završava dan ranije. Primjer promjene 16. aprila: po 15 dana prethodnom i novom vlasniku. Ne duplirati mjesečno zaduženje jedinice po osobama.

Pravilo dodjele eventualnog ostatka feninga pri podjeli, zakašnjele uplate i FIN-08 prenos salda ostaju otvoreni. Ranije pitanje o izboru cijelog mjeseca ili podjele razriješeno je ovom potvrdom. Nema implementacije DEV-04.

## Potvrda zakašnjele uplate — 17. oktobar 2026.

Korisnik potvrđuje drugi dio FIN-07: uplata za dug prethodnog vlasnika, primljena poslije promjene vlasništva, zatvara njegov stari dug bez uticaja na karticu novog vlasnika. Potrebno je identifikovati na čiji dug se uplata odnosi; sam datum prijema nije osnov rasporeda novom vlasniku. Priliv novca evidentira se jednom, odvojeno od rasporeda.

FIN-07 sada ima potvrđene podjelu mjeseca po danima i zakašnjelu uplatu; pravilo eventualnog ostatka feninga još nije odabrano. Neidentifikovane uplate, višak/povrat i FIN-08 dokumentovani prenos salda ostaju zasebna pitanja. Nema implementacije DEV-04.

## Potvrda bez prenosa salda — 17. oktobar 2026.

Korisnik potvrđuje FIN-08: u prvoj verziji nema prenosa duga ili avansa između prethodnog i novog vlasnika. Svako zadržava svoj saldo; nema ni posebne operacije dokumentovanog prenosa u početnom obimu. Raniji otvoreni prijedlog FIN-08 time je razriješen za prvu verziju. Povrat avansa, neidentifikovane uplate i ostatak feninga ostaju za odluku. Nema implementacije DEV-04.

## Potvrda povrata avansa — 17. oktobar 2026.

Korisnik potvrđuje dio FIN-09: povrat je dozvoljen do iznosa raspoloživog avansa, uz evidentiran razlog. Stvarna isplata istovremeno smanjuje sredstva ZEV-a i avans vlasnika. Povrat ne znači brisanje originalne uplate niti prenos avansa drugom vlasniku. Dio FIN-09 o neidentifikovanim uplatama ostaje otvoren. Nema implementacije DEV-04.

## Potvrda neidentifikovane uplate — 17. oktobar 2026.

Korisnik potvrđuje drugi osnovni dio FIN-09: neidentifikovana uplata povećava sredstva ZEV-a jednom, a ostaje neraspoređena dok operater ne potvrdi kojoj kartici pripada. Naknadni raspored ne povećava sredstva ponovo. Neidentifikovana uplata nije osnov pristupa kartici ili promjene vlasništva. FIN-09 sada ima potvrđene osnove povrata i neraspoređenog priliva; nema implementacije DEV-04.

## Potvrda usaglašavanja sa bankom — 17. oktobar 2026.

Korisnik potvrđuje osnov FIN-10: evidentirati datum, stanje sa bankovnog izvoda i razliku prema aplikaciji. Razliku razjasniti bez automatskog dodavanja prihoda ili rashoda radi izjednačavanja. Odgovorna osoba/učestalost, kategorije i obim blagajne ostaju otvoreni. Ovo nije implementacija DEV-04.

## Potvrda privatnosti finansijskih priloga — 17. oktobar 2026.

Korisnik potvrđuje FIN-11/PIL-10 u dijelu vidljivosti: zajednički računi dostupni su članovima nakon provjere i uklanjanja nepotrebnih ličnih podataka. Prilozi pojedinačnih uplata prate prava pristupa konkretnoj kartici i periodu, uključujući već potvrđene ovlašćene administrativne/finansijske role. Nema proširenja pristupa tuđim karticama kroz zajednički dokument.

Ovo potvrđuje pravilo proizvoda; operativni način provjere/redakcije i implementacija roditeljskih veza ostaju za zavisni modul. DEV-04 nije odobren za izradu.

## Potvrda korišćenja avansa — 17. oktobar 2026.

Korisnik potvrđuje dopunu FIN-04: postojeći avans automatski pokriva naredno zaduženje bez novog priliva sredstava. Avans 10 KM i naredno zaduženje 30 KM daju dug 20 KM; novac ZEV-a se ne mijenja. To važi u istoj evidenciji, bez prenosa avansa između prethodnog i novog vlasnika. Redoslijed jednakih dospijeća i eventualni ručni izuzeci rasporeda ostaju otvoreni. Nema implementacije DEV-04.

### Aktuelni opseg potvrda

Potvrđeni su osnovi FIN-03–05, korekcije FIN-06, podjela mjeseca i zakašnjela uplata FIN-07, izostavljanje prenosa salda FIN-08, oba osnovna dijela FIN-09, osnov usaglašavanja FIN-10 i vidljivost FIN-11. Naknadne potvrde imaju prednost nad ranijim zapisima otvorenih pitanja. Preostaju početni podaci/tarifa FIN-01/02, rok i izmjena roka, jednaka dospijeća/izuzeci rasporeda, nivo zaokruživanja i ostatak feninga pri podjeli, detalji korekcije rasporeda/opisa, kategorije/blagajna/odgovornost pregleda i operativni postupak redakcije. Stvarni C/D pregled odložen je, DEV-04 nije odobren.

## Važeće odluke po delegiranom ovlašćenju — 18. oktobar 2026.

Korisnik je prepustio agentu izbor preostalih finansijskih pravila. Ovaj odjeljak zamjenjuje ranije oznake otvorenih produktnih pitanja FIN-01–11; prethodni zapisi ostaju istorija. Pravila nisu implementirana. Promjene važe unaprijed uz verziju i datum; već potvrđena knjiženja mijenjaju se korekcijom, bez ponovnog računanja istorije.

| Oblast | Odluka prve verzije |
|---|---|
| FIN-01 — početak | Početak je prvi dan odabranog mjeseca. Odvojeni početni novac i dug/avans svakog vlasničkog perioda, uz izvor, datum i potvrdu ovlašćenog operatera. Početni dug nije prihod. Za buduću lokalnu izradu izabrani su isključivo sintetički oktobar 2026, novac 1.000 KM, dvije jedinice po 60 m², dug A 20 KM i avans B 10 KM. Stvarni podaci ostaju uslov prije pilota. |
| FIN-02 — tarifa | Verzije stope i površine sa datumom važenja i osnovom; bez retroaktivnog prepisivanja potvrđenih obračuna. Lokalni sintetički primjer: stambena stopa 0,50 KM/m². Stvarna stopa, namjena i izuzeci preuzimaju se iz provjerenog osnova ZEV-a. Nepoznata namjena, površina ili tarifa blokira obračun te jedinice; garažama se ne dodjeljuje proizvoljna stopa. Promjena tarife unutar mjeseca dijeli ga na segmente važenja. |
| FIN-03 — obračun i rok | Ručno pokretanje, pregled i jedna transakciona potvrda bez dupliranja po jedinici/mjesecu. Rok je obavezan, unosi se ručno i čuva uz zapis; aplikacija ga ne proglašava zakonski ispravnim. Naknadna izmjena roka zahtijeva razlog i audit, bez izmjene iznosa i bez automatskog prerasporeda ranijih uplata. |
| FIN-04 — raspored | Najstarija dospjela obaveza po datumu dospijeća, zatim periodu obaveze i stabilnom ID-ju. Ostatak je avans istog vlasničkog perioda. Avans automatski pokriva novo zaduženje; neraspoređeni višak pokriva obavezu i kada dospije, bez novog priliva. Nema ručnog preskakanja obaveza u prvoj verziji. Pogrešna kartica rješava se kontrolisanom korekcijom rasporeda uz razlog, bez novog priliva i bez prenosa vlasničkog salda. |
| FIN-05/07 — preciznost | Precizna decimalna aritmetika, knjiženje u cijelim feningima, pola naviše na ukupnom mjesečnom iznosu jedinice. Kod više tarifa sabrati nezaokružene dnevne segmente pa zaokružiti jednom. Iznos dijeliti vlasničkim periodima metodom najvećeg ostatka: svakom donji cijeli broj feninga njegovog preciznog udjela, preostale feninge redom najvećeg razlomka, kod jednakog ostatka raniji početak perioda pa ID. Zbir dijelova mora biti jednak ukupnom zaduženju. Datum promjene pripada novom vlasniku. |
| FIN-06 — korekcije | Storno i zamjenski zapis u jednoj transakciji, povezani sa originalom, uz razlog/autora/vrijeme. Povezani rasporedi se poništavaju i ponovo računaju deterministički nad preostalim važećim zapisima iste kartice; ako postoji zavisni povrat ili nedostupan iznos, odbiti djelimičnu korekciju i zahtijevati razrješenje zavisnih zapisa. Opis/kategorija mijenjaju se uz istoriju, bez promjene novca; iznos, kartica i datum novčanog događaja zahtijevaju korektivni tok. |
| FIN-08/09 — saldo i prilivi | Zadržana potvrđena pravila: bez prenosa među vlasnicima, zakašnjela uplata starom dugu, povrat najviše raspoloživog avansa uz razlog i jedan priliv za neidentifikovanu uplatu. Identifikovanje kartice i raspored ne povećavaju novac drugi put. |
| FIN-10 — novac i pregled | Prva verzija vodi jedan bankovni račun po ZEV-u, bez blagajne, gotovine, više valuta ili automatskog bankovnog uvoza. Kategorije prihoda: uplate vlasnika, ostali prihodi; rashoda: održavanje, čišćenje, zajednička struja/voda, bankarske naknade, administracija i ostalo. Povrat avansa je zaseban odlazni događaj, ne trošak održavanja. Neraspoređena uplata je status priliva. Finansijski operater usaglašava mjesečno po izvodu; administrator ZEV-a pregleda i evidentira potvrdu, uz označavanje kada je ista osoba obavila oba koraka. Razlika ostaje vidljiva do dokumentovanog razrješenja, bez izmišljenog knjiženja. |
| FIN-11 — dokumenti | Novi dokument prvo ima privatni status na čekanju. Finansijski operater ili administrator provjerava sadržaj i postavlja redigovanu verziju za zajednicu; original ostaje ograničen ovlašćenim finansijskim/administrativnim rolama. Evidentirati provjeravaoca/vrijeme. Dokument sa više privatnih kartica/perioda razdvojiti prije dijeljenja; blokirati objavu dok nije razdvojen. Pristup i tenant/kartica/period izvode se iz stvarnog roditeljskog zapisa. Novi original zahtijeva novu provjeru. |

Ručna aritmetička provjera: ukupno 10,01 KM, dva jednaka udjela → 5,01 KM ranijem i 5,00 KM kasnijem periodu; zbir 10,01 KM. Za april, promjena 16. i ukupno 30 KM → 15 + 15 KM. Sintetički novčani primjer iznad ostaje 950 KM nakon ispravke rashoda i povrata. Ovo su produktna pravila pomoćne evidencije; stvarni pravni osnov tarife i roka provjerava se prije pilota, a potpuni računovodstveni sistem nije obuhvaćen ovim izborom.

Preostali uslovi: stvarni podaci i ovlašćenja prije pilota, korisnikov odloženi pregled C/D i zaseban nalog za DEV-04. Delegiranje odluka ne odobrava implementaciju ili objavljivanje.
