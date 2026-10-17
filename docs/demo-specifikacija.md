# Specifikacija web demoa — DEV-02-A

Datum: 16. oktobar 2026. (Europe/Belgrade).

Status: specifikacija za implementaciju DEV-02-B–DEV-02-I. Naknadno su implementirani web osnova B, demo podaci/kontekst C sa opisom prava i landing/navigacija/početni pregledi D; kompletni poslovni ekrani i scenariji još nisu završeni. Izvršene provjere i granice vodi evidencija. Osnova su [razvojni plan](razvojni-plan.md), [minimalni plan](minimalni-plan.md), [specifikacija pilota](pilot-specifikacija.md) i projektni [UI skill](../skills/zev-ui-design/SKILL.md).

## 1. Cilj i granice

Korisnik ulazi kroz javnu landing stranicu i isprobava pet cjelina proizvoda sa izmišljenim podacima. Može mijenjati demo kontekst i izvršavati lokalne radnje, a povezani pregledi prikazuju njihove posljedice.

Potvrđeni su web prije mobilnih aplikacija, landing, demo bez baze, obračun po m² i ručni rok plaćanja. Vrijednosti, privremene dozvole i pravila označeni ispod kao demo pretpostavke služe izradi primjera; ne zatvaraju otvorene odluke PIL-01–PIL-15 za backend ili stvarni pilot.

Nema Supabase inicijalizacije, stvarne prijave, email poziva, udaljenog uploada ili trajne pohrane. Podaci i izmjene žive u memoriji aplikacije. Navigacija unutar demoa čuva stanje, a osvježavanje, zatvaranje aplikacije i „Vrati početni demo“ odbacuju izmjene. Podaci se ne upisuju u localStorage ili IndexedDB. Objavljivanje i backend imaju zasebne uslove.

## 2. Demo kontekst i privremena prava

### Podaci za početak

| Primjer | Početni sadržaj | Namjena |
|---|---|---|
| ZEV Javor — demo | Jedinice A i B, svaka 60 m²; oktobar 2026; sredstva 1.000,00 KM; dug A 20,00 KM; avans B 10,00 KM | Glavni povezani finansijski scenario |
| ZEV Lipa — demo | Jedinica C, 50 m²; sredstva 500,00 KM; kartica bez duga ili avansa; prazni radovi i obavještenja | Različit kontekst i prazna stanja, bez UI-ja za administriranje više zgrada |

Oba naziva, jedinice i svi zapisi su izmišljeni. Početno usaglašavanje prikazati kao „Demo stanje na dan 1. oktobra 2026.“; kasniji lokalni unosi mijenjaju saldo evidencije, ali ne pomjeraju automatski datum usaglašavanja. Ne tvrditi da su sredstva provjerena u banci.

### Profili za demonstraciju

Funkcija u zajednici i dozvole imaju odvojene oznake. Profil „Operater evidencije“ predstavlja dodijeljena demo ovlašćenja, bez tvrdnje da predsjednik skupštine ili druga funkcija automatski ima ta prava. Prikazati vezu „Demo prava“ sa matricom ispod. Konačne funkcije i dodjele iz specifikacije pilota ostaju za DEV-03.

| Podatak ili radnja | Operater evidencije — demo | Vlasnik — demo | Ovlašćeni korisnik prostora — demo |
|---|---|---|---|
| Pregled zajedničkih finansija, radova, ponuda i objava | Da | Da | Da |
| Kartice | Sve u aktivnom demo ZEV-u | Samo A u Javoru, odnosno C u Lipi | Bez pristupa kartici |
| Trošak, uplata i mjesečno zaduženje | Lokalni unos | Bez unosa | Bez unosa |
| Promjena statusa rada i objava obavještenja | Da | Bez izmjena | Bez izmjena |
| Prijave problema | Pregled i status svih u aktivnom ZEV-u | Slanje i pregled sopstvenih | Slanje i pregled sopstvenih |
| Informativne ankete | Otvaranje/zatvaranje i jedan odgovor svog demo članstva | Jedan odgovor svog demo članstva | Jedan odgovor svog demo članstva |
| Članstva i dodjela stvarnih prava | Nema | Nema | Nema |

Sve ćelije su **demo pretpostavke**. Nema javnog imenika dugovanja u vlasničkom prikazu. Zajednički prihod prikazuje anonimizovanu stavku „Uplata održavanja“; jedinica, platilac, raspored i privatni prilog dostupni su samo kroz dozvoljenu karticu i operaterski prikaz. Isto važi za pretragu, detalje i istoriju.

Početni izbor je Javor / Vlasnik. Izbor ZEV-a ili profila zatvara detalje i vraća na pregled; napuštanje popunjene forme traži odluku o odbacivanju unosa. Sačuvane demo promjene ostaju uz svoj tenant do reseta. Nepotvrđeni unos se ne prenosi u drugi kontekst. Nedozvoljena direktna demo ruta prikazuje objašnjenje bez sadržaja zapisa. Ovo je simulacija prikaza; svi ugrađeni podaci su sintetički i klijent nije sigurnosna granica.

## 3. Navigacija i raspored

Javni ulaz je `/`, a demo početak `/demo`. Predložene rute unutar demo prostora:

| Glavna destinacija | Ruta | Podređeni prikazi |
|---|---|---|
| Pregled | `/demo` | Sažeci i veze na izvorne module |
| Finansije | `/demo/finansije` | Kartica, detalj stavke, trošak, uplata, mjesečni obračun |
| Radovi | `/demo/radovi` | Detalj rada, ponude i status |
| Oglasna tabla | `/demo/obavjestenja` | Detalj i nova objava |
| Ankete i prijave | `/demo/ankete-i-prijave` | Odvojene označene kartice „Ankete“ i „Prijave“, detalji i forme |

„Moja kartica“ je vidljiva prečica na pregledu i u finansijama za ovlašćenog vlasnika; operater ima „Kartice“. Nije šesta glavna destinacija. Kontrole „Demo ZEV“, „Demo profil“, „Demo prava“ i reset pripadaju okviru demoa.

Na širokom ekranu koristiti bočnu navigaciju i zaglavlje sa aktivnim ZEV-om i profilom. Na telefonu koristiti označeno dugme „Meni“ koje otvara svih pet destinacija; aktivna destinacija i naziv ZEV-a ostaju vidljivi. Meni se zatvara nakon izbora, podržava Escape i vraća fokus. Ne oslanjati navigaciju samo na ikone.

Stalna napomena glasi: „Demo sa izmišljenim podacima. Izmjene su privremene i nestaju nakon osvježavanja.“ Povratak na landing ne glumi odjavu. Pri izlasku iz demoa objasniti da se lokalne izmjene mogu izgubiti; ponovni ulaz započinje početni demo. Povratak sa detalja u modul čuva filter gdje je izvodljivo.

## 4. Ekrani i glavne radnje

| ID / ekran | Glavna informacija i redoslijed | Primarna radnja | Sporedne mogućnosti |
|---|---|---|---|
| UI-01 Landing | Svrha proizvoda, kome pomaže, pet cjelina, granice demoa | Pogledaj demo | Sidra do opisa funkcija; kratko objašnjenje budućeg pristupa po članstvu |
| UI-02 Pregled zgrade | Saldo evidencije sa datumom početnog demo usaglašavanja; sopstvena kartica kada je dozvoljena; aktivni radovi; posljednji troškovi; obavještenja | Vlasnik: Otvori moju karticu; operater: Dodaj trošak; korisnik prostora: Prijavi problem | Otvori povezane module i detalje |
| UI-03 Finansije | Period i filter kategorije; saldo evidencije; zajednički prihodi/rashodi; detalji stavke | Operater: Dodaj trošak; ostali: Otvori detalje stavke | Operater: Evidentiraj uplatu, Mjesečni obračun, Kartice; vlasnik: Moja kartica |
| UI-04 Kartica | Jedinica i period; zaduženo, uplaćeno, dug ili avans; hronološke stavke i dozvoljeni detalji | Operater: Evidentiraj uplatu; vlasnik: Otvori stavku | Operater bira karticu unutar aktivnog ZEV-a; filter perioda |
| UI-05 Trošak / uplata | Jasno odvojeni obrasci; iznos, datum i svrha, uz relevantna polja ispod | Dodaj trošak u demo / Evidentiraj uplatu u demo | Odustani, lokalni pregled priloga |
| UI-06 Mjesečni obračun | Mjesec, stopa, ručni rok, površine i pregled svakog zaduženja, ukupan iznos | Primijeni obračun u demou | Izmijeni prije potvrde, Odustani |
| UI-07 Radovi | Opis i status aktivnih radova | Otvori rad | Pregled završenih primjera |
| UI-08 Detalj rada | Opis, rok za ponude, uporedive ponude, izabrani izvođač, ugovoreno, plaćeno, napredak | Operater: Promijeni status; ostali: Pogledaj ponude | Povezane isplate i dozvoljeni primjeri priloga |
| UI-09 Oglasna tabla i objava | Naslov, datum, sadržaj; lista vodi na detalj | Operater: Objavi obavještenje; ostali: Pročitaj | Odustani od forme, povratak na listu |
| UI-10 Prijave i detalj | Opis, opciona fotografija, datum i tekstualni status | Član: Prijavi problem; operater na detalju: Promijeni status | Pregled sopstvenih / dozvoljenih prijava |
| UI-11 Ankete i detalj | Oznaka „Informativna anketa“, pitanje, rok, opcije i status | Pošalji odgovor u demo | Izmijeni odgovor do zatvaranja; operater: Nova anketa / Zatvori anketu |
| UI-12 Demo prava / nedostupan prikaz | Aktivni profil i dozvole, odnosno objašnjenje nedostupnosti | Vrati se na pregled | Izbor drugog demo profila kroz okvir |

Prijava nije aktivna funkcionalnost DEV-02. Na landingu ne prikazivati dugme koje obećava stvarnu prijavu; informativni tekst može objasniti da dolazi nakon pregleda demoa. Rute `/prijava` i `/app` ostaju budući prijedlog iz specifikacije pilota.

### Obrasci i demo pravila

- Trošak: datum, kategorija, svrha i iznos u KM su obavezni; primjer računa ili lokalni fajl je opcioni. Datum mora biti ispravan, svrha neprazna, iznos veći od nule sa najviše dvije decimale. Opciono povezivanje sa radom dozvoljeno je samo iz aktivnog ZEV-a.
- Uplata: operater bira dozvoljenu jedinicu, datum i iznos; napomena i lokalni prilog su opcioni. Uplata povećava novac jednom. Raspored prvo na najstariju dospjelu obavezu, ostatak kao avans, predstavlja demo pretpostavku PIL-07.
- Obračun: demo stopa 0,50 KM/m²; mjesec oktobar 2026; ručno unesen obavezni rok. Za glavni scenario koristi se 15. oktobar 2026. Ovo je sintetički datum, bez automatizacije pravnih rokova. Prikazati „Demo pretpostavka“ uz stopu i pravila zaokruživanja; koristiti cijele feninge i pravilo iz nacrta PIL-08. Ponovni obračun istog mjeseca za istu jedinicu ne pravi novu obavezu; pokaže postojeći zapis. Izmjena već primijenjenog obračuna nije dio ovog demoa.
- Obavještenje: obavezan naslov i sadržaj, datum nastaje iz demo radnje; nakon potvrde je dostupno članovima aktivnog demo ZEV-a.
- Prijava: obavezan opis; opciona JPEG/PNG/WebP fotografija do 5 MB je lokalni primjer, uz pregled i uklanjanje prije potvrde. Ovo ograničenje je demo izbor. Neodgovarajući fajl daje grešku uz očuvan opis. Statusi: Zaprimljeno, U obradi, Riješeno. Nema automatskog zakazivanja intervencije.
- Anketa: obavezno pitanje, najmanje dvije različite neprazne opcije i budući rok za novu anketu. Jedan odgovor po demo članstvu, izmjenjiv do zatvaranja; zbirni rezultati tek nakon zatvaranja, bez imenika odgovora. To su pretpostavke PIL-11. Nakon prvog odgovora pitanje i opcije su zaključani. Operater može zatvoriti anketu prije roka; poslije roka je zatvorena bez novih odgovora.

Potvrde navode posljedicu i demo: „Trošak je dodat u demo“, „Prijava je dodata u demo“, „Odgovor je sačuvan u demou“. Finansijski unos je lokalna simulacija. Ne prikazivati obećanje stvarnog knjiženja ili slanja prijave službi.

## 5. Sintetički scenariji i očekivani ishodi

Ovo su specifikacije budućih ručnih provjera, ne izvršene provjere ili automatizovani testovi. Svaki scenario počinje resetom osim kada izričito nastavlja prethodni.

| ID | Tok | Očekivani ishod |
|---|---|---|
| SC-01 | Landing → Pogledaj demo → svih pet destinacija | Početni Javor / Vlasnik, stalna demo napomena, ispravno označena aktivna destinacija i funkcionalan povratak na pregled |
| SC-02 | Vlasnik otvara sopstvenu karticu; pokušava direktni detalj B; bira korisnika prostora | Vidi A i dug 20,00 KM; B nije prikazan kroz detalje, pretragu ili istoriju; korisnik prostora nema karticu ni finansijski unos |
| SC-03 | Operater unosi trošak Javoru; mijenja na Lipu pa nazad | Lipa ostaje na 500,00 KM bez Javorovih zapisa; povratak čuva Javorovu promjenu; nepredat unos traži odbacivanje prije promjene konteksta |
| SC-04 | Operater obračunava oktobar: 60 × 0,50 za A i B, rok 15. oktobar; ponavlja istu potvrdu | A duguje 50,00 KM, B duguje 20,00 KM; ukupno novo zaduženje 60,00 KM; sredstva ostaju 1.000,00 KM; ponavljanje ne duplira obaveze |
| SC-05 | Nastavak SC-04: uplata A 40,00; uplata B 25,00; trošak 120,00 | Sredstva 945,00 KM; dug A 10,00 KM; avans B 5,00 KM; pregled i kartice odgovaraju izvorima; datum demo usaglašavanja ostaje 1. oktobar |
| SC-06 | Reset; otvoriti rad „Popravka ulaznih vrata“: ponude 1.050,00 i 1.150,00 KM; izabrana druga, ugovoreno 1.150,00; status promijeniti u U toku | Jasno su odvojeni ponude, ugovoreno i plaćeno; status se mijenja na detalju, listi i pregledu |
| SC-07 | Nastavak SC-06: dodati rashod 600,00 KM povezan sa radom | Plaćeno 600,00 KM, ugovoreno ostaje 1.150,00; sredstva padaju sa 1.000,00 na 400,00 KM; povezivanje ne knjiži drugi rashod |
| SC-08 | Operater objavljuje obavještenje; vlasnik ga otvara; zatim bira Lipu | Objava se vidi na tabli i pregledu Javora, bez operaterske forme u vlasničkom prikazu; u Lipi je nema |
| SC-09 | Vlasnik šalje prijavu sa fotografijom; operater mijenja status u U obradi | Autor vidi prijavu i novi status; drugi demo član je ne vidi; operater vidi prijave aktivnog ZEV-a; nema udaljenog uploada |
| SC-10 | Vlasnik odgovara na otvorenu informativnu anketu i mijenja odgovor; operater je zatvara | Broj odgovora istog članstva ostaje jedan; zbir poslije zatvaranja prati posljednji odgovor; novo slanje nije dozvoljeno; nema teksta o usvojenoj odluci |
| SC-11 | Unijeti negativan iznos, prazan naslov ili nedozvoljenu fotografiju | Greška uz relevantno polje, očuvan ostali unos; nije nastala promjena podataka ni lažna potvrda |
| SC-12 | U Lipi otvoriti prazne radove/obavještenja; primijeniti filter bez rezultata u Javoru | Prazan modul objašnjava nedostatak sadržaja; prazan filter nudi poništavanje; radnje prate profil |
| SC-13 | Poslije više promjena izabrati Vrati početni demo; ponoviti sa osvježavanjem | Reset uz upozorenje na gubitak izmjena vraća oba tenanta i početni profil; osvježavanje takođe vraća početno stanje; nema trajno sačuvanih priloga |
| SC-14 | Proći landing, navigaciju, finansijsku formu, prijavu i anketu tastaturom, na uskom i širokom prikazu | Logičan fokus i povrat iz dijaloga, bez odsijecanja važnih iznosa ili kontrola; provjera prema odjeljku 6 |

Za SC-06 početni rad ima dvije ponude i nema isplata; sintetički izvođači su „Servis A“ i „Servis B“. Početna anketa ima relativni budući rok u odnosu na otvaranje nove demo sesije, kako kasnije pokretanje ne bi dalo nenamjerno zatvoren primjer. Već sačuvani rok se ne pomjera tokom iste sesije. Opis fotografije, nazivi priloga i poruke koriste izmišljene podatke.

## 6. UI smjernice i relevantna stanja

- Hijerarhija pregleda: novac sa jasnim nazivom i datumom, sopstvena obaveza kada postoji pravo, zatim radovi, troškovi i obavještenja. Dug i avans se ne sabiraju u novac na računu. Brojevi se prikazuju dosljedno, npr. `1.245,50 KM`.
- Koristiti semantički HTML, vidljive labele, tekstualne statuse, sistemski font, zajedničke tokene i male komponente. Smjernice skilla su lokalni početni izbor, a ne potvrđen konačan vizuelni dizajn.
- Pri implementaciji provjeriti širine oko 360, 768 i 1280 CSS px, reflow na 320 CSS px i povećanje teksta 200%. Široke tabele mogu imati sopstveni horizontalni skrol, uz očuvane oznake i kontekst.
- Provjeriti tastaturu, vidljiv fokus, vraćanje fokusa, Escape za dijaloge/meni, nazive kontrola i povezivanje grešaka sa poljima. Mjeriti stvarne parove boja prema kriterijumima skilla; screenshot sam ne potvrđuje kontrast.
- Prazno stanje, odsustvo rezultata filtera, validaciona greška, nedovoljan demo pristup i uspješna lokalna promjena moraju imati različite poruke. Nakon potvrde relevantni pregled se ažurira iz istog stanja, bez paralelnih ručno održavanih zbirnih vrijednosti.
- Lokalna sinhrona promjena ne zahtijeva izmišljeno čekanje ili lažni mrežni spinner. Greška učitavanja lokalnog priloga nudi ponovni izbor uz očuvan tekst. Kada nema veze, napomena objašnjava da radnje mijenjaju samo lokalni demo; ne prikazuje se nepostojeća sinhronizacija. Stvarni prekid serverskog upisa provjerava se tek uz backend.
- Reset sa postojećim izmjenama ima konkretnu potvrdu „Odbaci demo izmjene i vrati početne podatke?“. Odustajanje čuva trenutno stanje. Lokalni pregledi fajlova oslobađaju se pri uklanjanju, resetu i izlasku iz demo prostora.
- Prijava problema ima napomenu da za hitnu opasnost treba odmah kontaktirati nadležnu službu ili odgovornu osobu; ne izmišljati broj ili vrijeme odziva.

## 7. Predaja narednim podfazama

| Podfaza | Ulaz iz ove specifikacije |
|---|---|
| DEV-02-B | Web osnova, UI tokeni i minimalne komponente prema odjeljcima 3, 4 i 6; framework verzije provjeriti pri instalaciji |
| DEV-02-C | Demo kontekst, matrica, početni podaci i životni ciklus stanja iz odjeljaka 1 i 2 |
| DEV-02-D | UI-01–UI-03 okvir i početni pregled; SC-01, SC-02 i SC-12 u dostupnom obimu |
| DEV-02-E | UI-03–UI-06 i SC-04/05; validacija i privatnost relevantnih prikaza |
| DEV-02-F | UI-07/08 i SC-06/07 |
| DEV-02-G | UI-09–UI-11 i SC-08–SC-10 |
| DEV-02-H | Povezana cjelina SC-01–SC-14, tehničke provjere i zabilježena ograničenja |
| DEV-02-I | Korisnikov pregled, povratne informacije i ishod dogovorenih dorada |

DEV-02-A je završen kada su pregledani popis ekrana, glavne/sporedne radnje, navigacija, privremena prava, pretpostavke i očekivani ishodi. To ne potvrđuje izgled, pristupačnost ili izvršavanje buduće aplikacije. Preostale produkcione odluke vodi [specifikacija pilota](pilot-specifikacija.md); ovaj dokument ih ne zamjenjuje.

## 8. Implementaciona dopuna DEV-02-C

Za provjeru lokalnog stanja dodata je operaterska radna bilješka do 200 znakova, odvojena po ZEV-u i dostupna samo demo operateru. Ovo nije nova funkcionalnost pilota ili objava obavještenja. Kontrole i djelimični prikaz žive na `/demo`, a opis aktivnih privremenih prava na `/demo/prava`. Sačuvana bilješka opstaje kroz ove dvije rute; reset, osvježavanje i novi ulaz vraćaju početne podatke. Puna navigacija pet cjelina dodata je u DEV-02-D.

## 9. Implementaciona dopuna DEV-02-D

Landing na `/` vodi na pregled `/demo`. Okvir demoa ima pet destinacija iz odjeljka 3, bočnu navigaciju na širokom prikazu i označen native dialog meni na uskom. Demo kontrole i opis prava ostaju odvojeni od glavne navigacije. Sve cjeline prikazuju aktivni ZEV/profil i stalnu napomenu o privremenim izmjenama.

Pregled prikazuje početna sredstva, dozvoljene kartice, aktivne radove, prazno stanje troškova i objave iz istog konteksta. Finansije prikazuju početne kartice, radovi sažetak, tabla postojeće objave, a ankete i prijave pitanja i dozvoljene prijave. Poslovni detalji i unosi ostaju za E–G; ne prikazuju se lažna aktivna dugmad za te radnje. Zato operaterova glavna prečica trenutno glasi „Otvori finansije“, a korisnika prostora „Otvori prijave“. Vlasnička prečica otvara početnu karticu u finansijama; puna istorija dolazi u E. Nema novih finansijskih zapisa: početna sredstva nisu prikazana kao prihod, a odsustvo troška nije izmišljeni iznos.

## 10. Implementaciona dopuna DEV-02-E

Finansije sada imaju rute `/demo/finansije/trosak`, `/uplata` i `/obracun`, pod tim istim finansijskim prefiksom. Kartice su `/demo/finansije/kartice/[unitId]`, a zajednički detalji `/demo/finansije/stavke/[entryId]`. Direktni nedozvoljeni prikaz daje objašnjenje bez podataka. Period/kategorija zajedničkog prometa ostaju u URL-u i vraćaju se iz detalja; filter kartice mijenja samo prikazane stavke, dok je saldo jasno označen kao ukupan.

Svaki unos ima pregled prije potvrde; zaduženja po jedinici/mjesecu se ne dupliraju. Iznosi se parsiraju iz decimalnog teksta u feninge, a množenje površine i stope koristi cijele vrijednosti uz pola naviše. Sintetičke površine imaju najviše dvije decimale. Neiskorišćeni kredit umanjuje kasnija zaduženja; raspored je trenutni zbirni demo prikaz, nije istorija pojedinačnih alokacija. Početni saldo kartice predstavlja stanje prije oktobra 2026. Novi promet ažurira sredstva i pregled bez promjene početnog datuma usaglašavanja.

Lokalni prilog prihvata PDF, JPEG, PNG ili WebP do 5 MB (demo izbor), sa pregledom slike i preuzimanjem lokalnog fajla. Blob URL se oslobađa pri uklanjanju prikaza/resetu/navigaciji; sam File ostaje samo uz dozvoljen zapis u memoriji do reseta ili izlaska. Privatni prilozi i napomene uplata uklanjaju se iz zajedničkog prikaza prije renderovanja; dostupni su kroz dozvoljenu karticu ili operateru. MIME provjera ovdje nije serverska provjera dokumenta.

Kontrole unosa imaju sažetak i greške uz polja, uz očuvan nacrt. Interna veza za odlazak, promjena ZEV-a/profila i reset traže potvrdu za nepotvrđen unos; Escape čuva unos. Osvježavanje nepotvrđenog obrasca koristi browser upozorenje kada ga browser podržava. Browser back/forward može zadržati nacrt u layoutu umjesto dijaloga; sačuvani podaci ostaju u istom demo kontekstu. Stvarne mrežne greške, storno, audit i sigurno knjiženje ostaju backend faze.


## 11. Implementaciona dopuna DEV-02-F

Detalj `/demo/radovi/[workId]` prikazuje opis, rok, dvije uporedive sintetičke ponude, izabrani Servis B, ugovoreno i zbir povezanih rashoda iz finansija. Operater mijenja status Priprema/U toku/Završeno; lokalni slijed promjena nestaje pri resetu. Završeni radovi imaju zasebnu listu. Vlasnik i korisnik prostora čitaju zajedničke radove bez izmjena. Nedostajući rad u aktivnom ZEV-u ne otkriva sadržaj drugog ZEV-a.

Povezani trošak unosi se postojećom finansijskom formom uz izbor rada; linkovi povezuju detalj rada i finansijsku stavku. Ne postoji drugi upis isplate niti ručni zbir plaćenog. Izbor ponude/ugovoreni iznos ostaju početni demo podaci; uređivanje ugovora i unos radova/ponuda pripadaju produkcionoj razradi DEV-05. Ovo nije formalna odluka niti stvarni audit.
