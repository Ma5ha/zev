# Konsolidovana matrica prava — ZEV

Datum: 17. oktobar 2026. (Europe/Belgrade). Veza: DEV-01-B; priprema DEV-03.

Status: **ZAVRŠENO — dokumentaciona konsolidacija potvrđenih odluka**. Prava nisu implementirana ili provjerena na backendu. Izvor potvrda su odjeljci 10–22 [specifikacije](pilot-specifikacija.md). Ovaj dokument zamjenjuje ranije dvoulogne i nepotvrđene matrice u dijelu potvrđenih prava; istorija ostaje sačuvana.

## Opseg i kombinovanje

Jedan tenant predstavlja jedan ZEV. Nalog predstavlja osobu; tenant članstvo, funkcija ZEV-a, aplikaciona rola, vlasnička veza i ovlašćenje za karticu vode se odvojeno. Funkcija predsjednika, člana odbora, upravnika ili zastupnika ne dodjeljuje prava automatski.

Administrator sistema ima globalnu dodjelu i puni pristup svim tenantima, bez posebnih članstava. Sve druge role važe u konkretnom ZEV-u uz aktivno članstvo. Osoba može kombinovati role i imati različita prava u različitim ZEV-ovima. Zasebno istorijsko ovlašćenje bivšeg vlasnika omogućava samo pregled njegovog ranijeg perioda.

## Matrica potvrđenih rola

„Pregled“ ne uključuje izmjenu. „Upravljanje“ uključuje dozvoljeni unos i izmjene uz istoriju. „Nema“ znači da ta rola ne daje pravo; zasebna dodatna rola ga može dati. Opseg svakog podatka uključuje njegove priloge i istoriju u okviru istih prava.

| Podatak / radnja | Administrator sistema | Administrator ZEV-a | Finansijski operater | Operater sadržaja | Član | Finansijski pregled |
|---|---|---|---|---|---|---|
| Tenant prostori | Upravljanje svim tenantima | Podešavanja svog ZEV-a | Nema | Nema | Nema | Nema |
| Jedinice, vlasničke veze i članstva | Upravljanje globalno | Upravljanje svojim ZEV-om | Bez upravljanja | Bez upravljanja | Bez upravljanja | Bez upravljanja |
| Pozivi i tenant role | Upravljanje globalno | Dodjela/opoziv svog ZEV-a | Nema | Nema | Nema | Nema |
| Globalna rola administratora sistema | Dodjela/opoziv uz zamjenu posljednjeg | Nema | Nema | Nema | Nema | Nema |
| Tuđi globalni profil i nalog | Ispravke uz istoriju | Nema | Nema | Nema | Nema | Nema |
| Zajedničke finansije | Upravljanje globalno | Upravljanje svojim ZEV-om | Upravljanje svojim ZEV-om | Članski pregled uz osnovnu rolu | Pregled | Pregled |
| Sve kartice i privatni finansijski prilozi | Upravljanje globalno | Pregled/upis svog ZEV-a, unos za sada uz kasniji pregled | Pregled/upis svog ZEV-a | Nema kroz ovu rolu | Samo izričito ovlašćene kartice/periode | Pregled svog ZEV-a |
| Obračun, uplate, troškovi i usaglašavanje | Upravljanje globalno | Upravljanje svojim ZEV-om | Upravljanje svojim ZEV-om | Nema | Nema | Bez upisa |
| Radovi, ponude i statusi | Upravljanje globalno | Upravljanje svojim ZEV-om | Bez upravljanja | Upravljanje svojim ZEV-om | Pregled | Bez upravljanja |
| Obavještenja | Upravljanje globalno | Upravljanje svojim ZEV-om | Bez upravljanja | Upravljanje svojim ZEV-om | Pregled | Bez upravljanja |
| Obrada prijava i fotografija | Upravljanje globalno | Obrada svog ZEV-a | Nema kroz ovu rolu | Obrada svog ZEV-a | Slanje/pregled sopstvenih | Nema kroz ovu rolu |
| Upravljanje informativnim anketama | Upravljanje globalno | Upravljanje svojim ZEV-om | Nema | Upravljanje svojim ZEV-om | Učešće prema pravilima ankete | Nema |

Svaki korisnik uređuje sopstveni profil; to ne mijenja njegove role, vlasništvo ili članstva. Za operatere i finansijski pregled koji treba da koriste i zajedničke članske sadržaje, dodjeljuje se i osnovna rola člana. Sam administratorski pristup ne određuje dodatni glas u anketi ili pravo mijenjanja tuđeg odgovora; pravila učestvovanja još su PIL-11.

Finansijske ispravke čuvaju original i koriste korektivne zapise. Puni edit ne daje brisanje istorije. Evidentiranje ugovorenog iznosa pripada radu; knjiženje isplate pripada finansijama. Administrator ZEV-a ne mijenja globalni profil osobe niti njena članstva u drugim tenantima.

## Kartice, suvlasništvo i periodi

- Vlasnik vidi izričito povezane kartice. Više potvrđenih suvlasnika može vidjeti istu karticu; zaduženje se obračunava jednom za jedinicu.
- Evidentira se datum promjene vlasništva. Novi vlasnik vidi svoju evidenciju od tog datuma bez privatnih podataka prethodnika. Dug i avans ne prenose se automatski.
- Bivši vlasnik zadržava samo istorijski pregled svog perioda kroz posebno ovlašćenje; time ne dobija nove zajedničke sadržaje ili pravo unosa. Opoziv tog ovlašćenja ukida dalji pristup.
- Vlasnik traži ovlašćenje zakupcu, administrator ZEV-a ga evidentira za konkretnu karticu i period. Zakupac ima samo pregled. Vlasnik može tražiti opoziv koji administrator evidentira; ovlašćenje prestaje istekom ili promjenom vlasnika. Novi vlasnik po potrebi traži novu dodjelu.
- Prilozi i istorija poštuju isti period i opseg, uključujući direktne zahtjeve za dokument. Stara delegacija zakupcu ne zadržava istorijski pristup poslije prestanka.

## Dodjela, opoziv i oporavak

Administrator sistema postavlja prvog administratora ZEV-a. Administrator ZEV-a upravlja tenant rolama, uključujući druge administratore svog ZEV-a. Posljednji administrator ne uklanja se bez prethodne zamjene. Globalnog administratora postavlja postojeći administrator sistema uz isto pravilo posljednjeg administratora.

Svaka promjena prava čuva autora i vrijeme, ciljnog korisnika/tenant i prethodnu/novu dodjelu. Opoziv/istek mora vrijediti za naredne zahtjeve iz aktivne sesije. Korisnik obnavlja lozinku emailom; pri gubitku emaila administrator sistema pokreće oporavak nakon provjere identiteta uz evidenciju. Konkretan postupak provjere, prvo postavljanje i oporavak svih globalnih administratora ostaju operativna priprema prije upotrebe.

## Pregled preduslova DEV-03

| ID | Preduslov / odluka | Stvarno stanje i sljedeća radnja |
|---|---|---|
| PRE-01 | Korisnikov pregled demoa | Završen I; naknadni K-B–K-E pauzirani na zahtjev. To nije potpuna provjera novog UI-ja. |
| PRE-02 | Prijava, tenant granica, role i osnovna matrica | Potvrđeni i objedinjeni ovdje; izuzeci za lične podatke i periode imaju prednost nad opštim editom. |
| PRE-03 | Instrukcija za backend | Odobrena lokalna staging baza DEV-03-A; UI/puna prijava nisu dio ovog koraka. |
| PRE-04 | Lokalni ili udaljeni početak DEV-03 | Izabran lokalni Supabase; migracije ostaju prenosive na kasniji udaljeni projekat. Provjere i granice u [uputstvu](lokalni-staging.md). |
| PRE-05 | Hosting, region, trošak i odgovorna osoba | PIL-12 otvoren; riješiti prije kreiranja udaljenih resursa. SMTP/email isporuku razraditi prije stvarnih poziva i oporavka. |
| PRE-06 | Prvi globalni administrator i oporavak | Definisati kontrolisanu proceduru i provjeru identiteta prije upotrebe; ne pretpostaviti početni nalog ili čuvati tajne ovdje. |
| PRE-07 | Finansijski detalji | PIL-05–09 i obračun/uplate pri promjeni vlasništva prije DEV-04; potvrđena prava ne potvrđuju sve poslovne izračune. |
| PRE-08 | Ankete | PIL-11 prije DEV-07: učesnici, izmjena odgovora i vidljivost rezultata nisu potvrđeni prihvatanjem role. |
| PRE-09 | Stvarni pilot i operativa | Zgrada i ovlašćene osobe prije stvarnih podataka; PIL-13 prije DEV-09/10; objavljivanje posebno odobrenje. |

Pregled fajlova i zavisnosti potvrđuje postojeći Next.js demo i odsustvo verzionisanog Supabase projekta/migracija i Auth integracije. Ovo nije provjera udaljenih naloga ili resursa, Docker dostupnosti, RLS-a ili produkcione izolacije. Nove tehničke biblioteke i alati nisu odabrani niti instalirani.

Sljedeći implementacioni pravac, kada korisnik odobri DEV-03: prvo definisati šemu identiteta/članstava/globalnih i tenant dodjela/vlasničkih perioda, zatim migracije i serverske provjere/RLS, pa prijavu i administrativne tokove prema razvojnom planu. Sintetički drugi tenant služi provjeri izolacije. Ne pisati testove bez izričitog naloga; postojeći lint/typecheck/build i ručne provjere evidentirati kada postoji implementacija.
