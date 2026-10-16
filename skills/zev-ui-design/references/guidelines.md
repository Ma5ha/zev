# UI smjernice za ZEV

## Status i porijeklo

Ovo je projektna primjena Appleovih principa, pripremljena 16. oktobra 2026. Osnova i zvanični linkovi su u [izvorima](sources.md). Brojčani tokeni, boje i rasporedi ispod su početne **ZEV preporuke**, a ne Appleov propisani dizajn ili završen dizajn sistem. Primjenjuj ih dok stvarni korisnici, postojeći sistem ili konkretan zadatak ne pokažu bolji izbor; promjenu dokumentuj.

Sadržaj: principi; raspored i navigacija; tipografija; boje i površine; forme i stanja; kretanje i pristupačnost; finansije i privatnost; ručna provjera.

## 1. Principi kao kriterijumi odluke

Sažeta projektna interpretacija Appleovih principa:

| Princip | Pitanje za ZEV ekran |
|---|---|
| Svrha | Da li ovo pomaže razumijevanju evidencije ili završavanju konkretne radnje? |
| Kontrola | Može li korisnik izaći, sačuvati svoj rad i razumjeti posljedicu potvrde? |
| Odgovornost | Jesu li stanje podataka i pristup pošteno predstavljeni? |
| Poznatost | Koristimo li obrasce i nazive koje korisnik već razumije? |
| Prilagodljivost | Radi li tok na telefonu, tastaturi i uz povećan tekst? |
| Jednostavnost | Koliko razmišljanja i traženja zahtijeva zadatak? |
| Pažnja prema detaljima | Jesu li prazna stanja, validacija i poravnanje jednako dobro obrađeni? |
| Zadovoljstvo | Da li završetak radnje pruža mir i sigurnost? |

Za ZEV je odgovarajući emocionalni ton smiren, pouzdan i neposredan. Uspješan finansijski unos potvrdi kratko; nepotrebna slavlja i dramatične animacije odvlače pažnju.

## 2. Raspored i navigacija

Počni hijerarhijom informacija, zatim biraj površine. Naslov objašnjava gdje se korisnik nalazi; najvažniji podatak ima jasan naziv; radnje stoje uz sadržaj na koji se odnose. Povezane informacije grupiši razmakom i poravnanjem. Koristi umjerene razdjelnike prije uvođenja dubokog ugnježđivanja kartica.

Za širok prikaz razmotri stabilnu bočnu navigaciju. Za uzak prikaz koristi vidljive, označene glavne destinacije; ako ih ima previše za traku, smisleno ih grupiši ili ponudi pristupačan meni. Broj i nazivi destinacija proizlaze iz tokova, a ne iz broja modula u planu. „Dodaj trošak“ je radnja u finansijama; nije glavna navigaciona destinacija.

Kada se korisnik vrati sa detalja, zadrži razumljiv kontekst, filter i položaj kad je to izvodljivo. Aktivna destinacija treba biti vidljiva i programski označena. Hover ne smije biti jedini način otkrivanja važne radnje. Fiksna navigacija i dugmad ne smiju prekrivati posljednji red, fokus ili unos kada se otvori tastatura.

### Početne mjere za web

| Namjena | Preporučeni početak |
|---|---|
| Skala razmaka | 4, 8, 12, 16, 24, 32, 48 CSS px |
| Bočni razmak na telefonu | Oko 16 CSS px, uz prilagođavanje širini |
| Forma | Čitljiva kolona, približno 36–44 rem maksimalne širine |
| Gornja granica širokog sadržaja | Oko 72–80 rem; tabele mogu zahtijevati drugi raspored |
| Zaobljenje | Oko 8–12 CSS px za kontrole i 12–16 za grupisane površine |
| Važna dodirna kontrola | Najmanje približno 44 × 44 CSS px u ZEV webu |

Ovo nisu obavezni breakpointi niti direktne konverzije iOS tačaka. Biraj breakpoint prema trenutku kada se sadržaj lomi. Pregledaj oko 360 px, srednju i široku širinu, uz provjeru pristupačnog reflow-a na 320 CSS px. Dvodimenzionalna tabela može imati sopstveno horizontalno skrolovanje; ostatak stranice treba ostati upotrebljiv.

## 3. Tipografija i brojevi

Koristi sistemski font stack, npr. `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. Ne preuzimaj SF font fajlove samo radi oponašanja Applea.

Početna skala za web je 16–18 px za osnovni tekst, 14 px za pomoćni tekst i 24–32 px za naslov stranice, izražena kroz relativne jedinice gdje je prikladno. Broj nivoa drži malim. Regular i semibold težine obično daju dovoljnu hijerarhiju; sitan tekst ne kombinuj sa tankim fontom ili slabim kontrastom. Pomoćni tekst koji je ključan za odluku mora ostati lako čitljiv.

Omogući prelamanje naslova, dužih imena fajlova i opisa. Visina tekstualnog kontejnera ne smije odsjeći sadržaj pri povećanju teksta. U tabeli koristi desno poravnate iznose i tabularne cifre kada font to podržava. Važne iznose ne skraćuj na „1,2k“ ako korisnik treba provjeriti tačan saldo.

Formatiraj datum, decimalni zapis i valutu centralno prema potvrđenom lokalitetu. Primjer prikaza je `1.245,50 KM`; prikaz je odvojen od preciznog čuvanja i obračuna. Nula, nepoznat iznos i nedostupan podatak imaju različita značenja.

## 4. Boje, površine i tokeni

Tokene imenuj po namjeni: `canvas`, `surface`, `text-primary`, `text-secondary`, `border`, `accent`, `danger`, `success`, `warning`, `focus`. Ne vezuj poslovno značenje za konkretan heksadecimalni zapis unutar svake komponente.

Početni svijetli smjer, koji treba provjeriti u stvarnim kombinacijama:

| Token | Primjer vrijednosti | Namjena |
|---|---|---|
| canvas | `#F5F6F8` | Mirna pozadina aplikacije |
| surface | `#FFFFFF` | Forma, lista ili grupisana cjelina |
| text-primary | `#17212F` | Glavni sadržaj |
| text-secondary | `#526071` | Sekundarni sadržaj |
| border | `#D5DAE1` | Nenametljivo grupisanje; nije automatski dovoljan za granicu inputa |
| accent | `#175CD3` | Glavna radnja i linkovi |
| danger | `#B42318` | Greška ili destruktivna radnja |
| success | `#067647` | Potvrđeno uspješno stanje |
| warning | `#8A4B08` | Stanje koje traži pažnju |
| focus | `#175CD3` | Vidljiv fokus, sa razmakom od elementa |

Ovi tokeni nisu unaprijed provjereni za svaki par. Izmjeri stvarni foreground/background kontrast, uključujući hover, fokus, selected, statusne bedževe i tekst na akcentnoj boji. Za input odaberi dovoljno jasnu granicu ili površinu; dekorativni razdjelnik i identifikacija interaktivne kontrole imaju različite potrebe.

Za tekst ciljaj najmanje 4,5:1; za veliki tekst najmanje 3:1 prema WCAG definiciji velikog teksta: najmanje 24 CSS px regular ili približno 18,67 CSS px bold. Za potrebne vizuelne granice aktivnih kontrola i značajne grafičke elemente provjeri primjenjivi kriterijum netekstualnog kontrasta 3:1. Boja nije jedini nosilac statusa.

Tamni prikaz koristi iste semantičke uloge sa zasebnim provjerenim vrijednostima. Ne pravi ga prostom inverzijom i ne prikazuj prekidač dok izgled nije završen. Ako trenutni zadatak ne uključuje tamnu temu, zabilježi ograničenje bez proširenja obima.

### Materijali i Liquid Glass

Appleov materijal razdvaja sloj kontrola/navigacije od sadržaja. Za ZEV je praktična primjena stabilna neprozirna podloga ispod finansija, dokumenata i formi. Eventualna providnost navigacije ostaje diskretna i mora imati čitljivu neprozirnu alternativu kada zamućenje nije podržano ili korisniku ne odgovara. Bez zamućenja značenje i funkcionalnost ostaju isti.

Ne uvodi Liquid Glass zavisnost ili skup animacija radi dekoracije. Različiti nivoi površine, razmaci i blagi razdjelnici često dovoljno jasno pokazuju strukturu.

## 5. Komponente, forme i stanja

**Dugmad:** naziv opisuje posljedicu: „Sačuvaj trošak“, „Objavi obavještenje“, „Pošalji prijavu“. Ikona može dopuniti tekst. Samostalna ikona ima pristupačan naziv i objašnjenje kada značenje nije očigledno. Link otvara destinaciju; button izvršava radnju. Korišćenje lokalnog jezika podrazumijeva njegove pravopisne navike, bez kopiranja engleskog Title Case stila.

**Forme:** label ostaje vidljiv i poslije unosa; placeholder je primjer, ne zamjena za label. Jasno navedi valutu, obavezna polja i format. Odaberi odgovarajuću tastaturu kroz `inputMode`, ali zadrži pouzdanu obradu decimalnog unosa. Sačuvaj unos pri validacionoj/mrežnoj grešci. Grešku veži za polje; kod više grešaka daj kratak pregled i vodi fokus do smislenog mjesta.

**Dijalozi:** koristi ih za ograničen zadatak ili važnu odluku. Omogući logičan fokus, tastaturu, povrat fokusa i jasno odustajanje. Rutinsko čitanje detalja ne zahtijeva modal. Potvrdu posljedice formuliši konkretnom radnjom; ne postavljaj potvrdu na svaki bezopasan klik.

**Liste i tabele:** na telefonu očuvaj svrhu, iznos, datum i pristup detalju. Na širokom ekranu tabele olakšavaju poređenje. Koristi semantička zaglavlja i nazive sortiranja. Izbjegni zamršen red koji je istovremeno link i sadrži druge aktivne kontrole; ponudi jasan link na detalj.

| Stanje | Šta korisnik vidi / može uraditi |
|---|---|
| Učitavanje | Jasan napredak bez lažne nule ili izmišljene sume |
| Prazan sadržaj | Šta nedostaje i radnja dostupna toj ulozi |
| Nema rezultata filtera | Objašnjenje i poništavanje filtera |
| Čuvanje | Radnja u toku, zaštita od ponovnog slanja, očuvan fokus |
| Uspjeh | Istinita potvrda i ažuriran relevantan podatak |
| Greška | Šta nije uspjelo, očuvan unos i smislen naredni pokušaj |
| Prekinuta veza | Jasno da promjena nije potvrđena; bez tvrdnje o offline upisu |
| Neizvjestan ishod zahtjeva | Provjera postojećeg rezultata prije ponavljanja finansijskog upisa |
| Nedovoljan pristup | Ne otkrivaj zaštićeni sadržaj kroz naslov, opis ili stari keš |

Za potvrde statusa koje ne traže fokus koristi odgovarajuće živo obavještenje čitaču ekrana. `role="alert"` čuvaj za dovoljno važnu neposrednu poruku. Toast nije jedino mjesto važnog podatka ili greške.

## 6. Pokret i pristupačnost

ZEV početna preporuka je oko 120–200 ms za manje prelaze i 200–300 ms za promjenu panela, uz prilagođavanje zadatku. Ovo nisu Appleove propisane vrijednosti. Ne odlaži interakciju radi završetka animacije; prati `prefers-reduced-motion` i obezbijedi jednako razumljivu alternativu.

Koristi semantičke naslove, landmark elemente, native kontrole, vidljiv fokus i logičan redoslijed. Ne uklanjaj browser outline bez jasne zamjene. Vodi računa o fokusu poslije navigacije i zatvaranja dijaloga. Sticky header/footer ne smije prekriti fokus.

Projektni cilj za važne dodirne površine je približno 44 × 44 CSS px ili veće. Appleova preporuka 44 × 44 pt za iOS nije ista jedinica. WCAG 2.2 minimum 24 × 24 CSS px ima posebna pravila razmaka i izuzetke; ne koristi taj minimum kao podrazumijevani cilj za ZEV telefon.

Provjeri povećanje teksta na 200%, reflow i korisnike sa različitim sposobnostima vida i motorike. Fotografija problema ima smislen opis kada je potrebna za razumijevanje; dekorativna slika ne opterećuje čitač ekrana. Prepoznatljiva ikona ne garantuje pristupačan naziv.

## 7. Finansije, povjerenje i privatnost

Na pregledu odvoji sredstva na računu, datum posljednjeg usaglašavanja i sopstvenu karticu. Ne sabiraj potraživanja u sredstva. Za karticu koristi jasne pojmove zaduženje, uplaćeno, preostali dug i avans, uz potvrđenu poslovnu definiciju. Za radove odvoji ponuđeno, ugovoreno i plaćeno.

Finansijska ispravka se prikazuje uz original i razlog, prema domenskim pravilima; opšti „Undo“ ne smije obrisati istoriju. Ne obećavaj trenutni povrat novca kada UI samo evidentira korekciju.

Uloga određuje sadržaj, ne samo dugmad. Sintetički primjer predsjednika može prikazivati više kartica; stanarski prikaz samo ovlašćene podatke. Zaštita mora važiti za server, priloge, pretragu, istoriju i keš. Greška i prazan prikaz ne smiju otkriti da tuđi privatni zapis postoji.

Ankete dosljedno nazivaj informativnim. Ne prikazuj „odluka je usvojena“ ili zakonski kvorum bez zasebno definisane funkcionalnosti. Prijava problema ne smije sugerisati da zamjenjuje hitni kontakt.

## 8. Ručna provjera prije označavanja rezultata

Provjeri samo obim pogođen zadatkom, ali uključi relevantna stanja:

- Telefon, širok ekran i povećan tekst: čitljivi nazivi, iznosi, fokus i kontrole.
- Tastatura: dostižne radnje, redoslijed i povrat fokusa; nema zamke u modalu.
- Čitač ekrana kada je dostupan: naziv kontrole, opis greške i potvrda statusa.
- Stvarni parovi boja i odabrani prikazi; screenshot je vizuelni dokaz, ne mjerenje kontrasta.
- Učitavanje, prazan rezultat, neuspjela radnja i oporavak bez gubitka unosa.
- Za finansije: neizvjestan odgovor i ponovni pokušaj bez duplog upisa.
- Za promjene uloga: stanarski/predsjednički prikaz bez curenja podataka.

U evidenciji navedi uređaj ili širinu, scenarije i ishod. Ako nema runnable UI-ja, provjera je pregled specifikacije; izvršene interakcije se ne mogu tvrditi. Automatizovani testovi se ne dodaju bez korisnikovog naloga.
