# Primjeri primjene na ZEV

Svi podaci i nazivi poslova su izmišljeni. Ovo su originalni projektni primjeri inspirisani principima iz [izvora](sources.md), bez kopiranja Appleovih ekrana. Opisuju mogući prikaz; ne mijenjaju dogovorena poslovna pravila, ovlašćenja ili raspored DEV faza.

## 1. Pregled zgrade — DEV-08

**Slabije:** četiri identične kartice „Novac“, „Dug“, „Prihod“, „Saldo“ bez perioda, uz šareni grafikon i šest jednako istaknutih dugmadi.

**Predloženi prikaz za stanara:**

```text
Pregled zgrade

Sredstva na računu
4.280,50 KM
Usaglašeno sa bankom: 15. oktobar 2026.

Kartica za koju imaš ovlašćenje
Preostalo za uplatu: 30,00 KM       [Otvori karticu]

Aktivni radovi
Popravka ulaznih vrata · U toku    [Detalji rada]

Posljednji troškovi
Servis interfona · 12. oktobar       85,00 KM

Obavještenja
Sastanak stanara · 20. oktobar      [Pročitaj]
```

Predsjednikov prikaz može dodati kontekstualne radnje i ovlašćeni pregled kartica; ne prenosi ih automatski u stanarski prikaz. „Preostalo za uplatu“ postoji samo uz poznat saldo. Ako zahtjev ne uspije, prikazuje se nedostupnost i ponovni pokušaj, bez lažne nule. Uskladi ove nazive sa stvarno potvrđenom razlikom između salda evidencije i usaglašenog bankovnog stanja.

**Razlog:** najvažniji iznos ima ime i datum; sopstvena obaveza se razlikuje od zajedničkih sredstava; dodatni detalji su dostupni bez pretrpavanja pregleda.

## 2. Unos troška — DEV-04

**Slabije:** modal „Nova transakcija“ sa nedefinisanim tipom, placeholderima umjesto labela i dugmetom „OK“.

**Predloženo:** ekran ili odgovarajući dijalog „Dodaj trošak“, sa jasno označenim poljima Svrha, Datum, Kategorija, Iznos (KM) i Račun (opciono). Dodatno povezivanje sa radom prikazati kada je relevantno.

| Trenutak | Poruka / ponašanje |
|---|---|
| Unos | Pomoćni primjer: „125,50“ ispod polja iznosa |
| Neispravan iznos | „Unesi iznos veći od nule, sa najviše dvije decimale.“ |
| Slanje | „Čuvanje…“; spriječeno ponovno slanje; unos ostaje sačuvan u formi |
| Potvrđen upis | „Trošak je sačuvan.“ i ažuriran relevantan pregled |
| Potvrđeno odbijanje upisa | Objašnjenje servera i mogućnost ispravke |
| Prekid veze bez poznatog ishoda | „Potvrda nije stigla. Provjeri da li je trošak sačuvan prije ponovnog slanja.“ |

Način ponavljanja zahtjeva mora sarađivati sa serverskom zaštitom od dupliranja. UI tekst sam ne rješava taj problem. Zatvaranje neposlate forme može tražiti odluku o odbacivanju izmjena kada unos postoji; prazan obrazac ne zahtijeva nepotrebnu potvrdu.

### Semantički web obrazac polja

Ovo je primjer povezivanja naziva, jedinice i greške. Nije kompletna forma, parser ili dokaz pristupačnosti aplikacije. Prikaz greške pretpostavlja da je validacija već utvrdila problem.

```html
<label for="expense-amount">Iznos (KM)</label>
<input
  id="expense-amount"
  name="amount"
  type="text"
  inputmode="decimal"
  required
  aria-invalid="true"
  aria-describedby="amount-hint amount-error"
/>
<p id="amount-hint">Primjer: 125,50</p>
<p id="amount-error">Unesi iznos veći od nule, sa najviše dvije decimale.</p>
```

Kada greške nema, ukloni `aria-invalid="true"` i referencu na nepostojeći `amount-error`. Ne pretvaraj lokalizovani decimalni unos direktno u binarni floating-point obračun. Vizuelne klase i poslovna validacija pripadaju stvarnoj implementaciji.

## 3. Rad i poređenje ponuda — DEV-05

**Slabije:** jedan iznos „Cijena: 1.150 KM“ za rad koji ima više ponuda i djelimičnu isplatu.

**Predloženi sadržaj detalja:**

```text
Popravka ulaznih vrata
Status: U toku
Rok za ponude: 10. oktobar 2026.

Ponude
Servis A     1.050,00 KM    Rok izvođenja 7 dana
Servis B     1.150,00 KM    Rok izvođenja 3 dana    Izabrano

Ugovoreno    1.150,00 KM
Plaćeno        600,00 KM   [Pogledaj povezane isplate]

Napredak
14. oktobar: nabavljen materijal
```

Naziv „Izabrano“ dopunjava vizuelni naglasak. „Ugovoreno“ ne nastaje automatski iz najjeftinije ponude. Plaćeno dolazi iz povezanih finansijskih zapisa, bez drugog ručnog unosa istog novca. Na telefonu prikaži uporedive redove sa istim oznakama; na desktopu tabela može biti preglednija. Ako uslovi uključuju porez, garanciju ili obuhvat radova, prikaži poznate uslove i „Nije navedeno“ za nedostajuće podatke, bez izmišljanja.

## 4. Kartica i dokumentovana ispravka — DEV-04

**Slabije:** negativan broj bez objašnjenja i dugme „Obriši uplatu“.

**Predloženo:** naznači period i odvojene iznose „Zaduženo“, „Uplaćeno“, „Preostali dug“ ili „Avans“ prema stvarnom stanju. Korekcija sadrži razlog, datum i vezu na originalni zapis u okviru prava pristupa. Predsjednik pokreće dozvoljenu ispravku konkretnim nazivom radnje; stanar pregledava ovlašćenu istoriju.

**Razlog:** vlasnik razumije šta duguje, a transparentnost ostaje očuvana. Izbor semantike salda i početnih stavki zavisi od DEV-01, ne od vizuelnog primjera.

## 5. Prijava problema — DEV-06

**Slabije:** obavezna registracija dodatnih podataka, obavezna fotografija i poruka „Intervencija je zakazana“ odmah poslije slanja.

**Predloženo:** opis problema i opciona fotografija, sa jasno naznačenim dozvoljenim fajlovima i veličinom. Moguć pregled i uklanjanje odabrane fotografije prije slanja. Poslije potvrde: „Prijava je poslata. Status: Zaprimljeno.“ Zakazivanje intervencije prikaži tek kada je stvarno evidentirano.

Statusi poput „Zaprimljeno“, „U obradi“ i „Riješeno“ imaju tekstualnu oznaku. Pri neuspjelom prilaganju sačuvaj opis i omogući ponovni pokušaj. Kratka poruka za hitnost može glasiti: „Za hitnu opasnost odmah kontaktiraj nadležnu službu ili odgovornu osobu.“ Ne izmišljaj broj telefona ili vrijeme odziva.

## 6. Informativna anketa — DEV-07

**Predloženo:** „Koji termin sastanka ti odgovara?“ uz oznaku „Informativna anketa“, jasan rok i radio opcije sa vidljivim labelama. Dugme „Pošalji odgovor“; nakon uspjeha „Odgovor je sačuvan“.

Prikaži broj odgovora i rezultate prema potvrđenim pravilima vidljivosti. Pobjedničku opciju označi kao „Najviše odgovora“, uz stvarne brojeve. Izbjegni „Odluka je usvojena“. Ako nije dozvoljena izmjena nakon zatvaranja, objasni stanje bez praznog neaktivnog dugmeta.

## 7. Oglasna tabla i prazna stanja — DEV-06

Predsjednik: „Još nema obavještenja. Objavi informacije o sastanku, radovima ili isključenjima.“ uz „Objavi obavještenje“.

Stanar: „Još nema obavještenja. Objavljena obavještenja zgrade prikazivaće se ovdje.“ Bez radnje za koju nema ovlašćenje.

Filter: „Nema obavještenja za izabrani period.“ uz „Poništi filtere“. Prazna baza i prazan rezultat pretrage imaju različita objašnjenja.

## 8. Primjeri zadataka za korišćenje skilla

- „Koristi $zev-ui-design da razradiš mobilni pregled finansija za DEV-04, bez implementacije.“ Očekivanje: hijerarhija, ovlašćenja, relevantna stanja i obrazloženje; ne generisati aplikaciju.
- „Koristi $zev-ui-design da popraviš postojeću formu troška.“ Očekivanje: pregled postojećeg koda i uska izmjena uz očuvan unos, pristupačne labele i istinit rezultat servera; ne redizajnirati cijelu aplikaciju.
- „Koristi $zev-ui-design da pregledaš poređenje ponuda.“ Očekivanje: uporedivi uslovi, jasna razlika ponuđeno/ugovoreno/plaćeno i konkretne provjere; bez ocjene na osnovu zamišljenog ekrana.
