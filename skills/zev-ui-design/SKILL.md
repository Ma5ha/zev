---
name: zev-ui-design
description: "Oblikuj, implementiraj i pregledaj ZEV ekrane, komponente, navigaciju, forme i UI tekst prema Appleovim principima jasnoće, kontrole, dosljednosti i pristupačnosti. Koristi za UI/UX zadatke u ZEV-u; nije potreban za čisto serverske, bazne ili infrastrukturne izmjene bez uticaja na interfejs."
---

# ZEV UI dizajn

Primijeni Appleovu filozofiju na responzivni ZEV web/PWA: korisnik razumije novac, radove i narednu radnju bez posebne obuke. Smjernice podržavaju postojeći minimalni obim i DEV fazu; same ne pokreću implementaciju, objavljivanje ili kupovinu resursa.

## Prije odluke o interfejsu

- Pročitaj projektni `AGENTS.md` i tražene planove. Utvrdi ulogu, cilj zadatka, dozvoljene podatke i stvarno stanje komponenti. Koristi postojeći vizuelni sistem ako već postoji.
- Za novi ekran, promjenu rasporeda ili implementaciju pročitaj [UI smjernice](references/guidelines.md). Za pojedinačnu komponentu čitaj relevantne odjeljke, bez redizajna ostatka aplikacije.
- Za finansije, radove, prijave, ankete i tekst pročitaj odgovarajući primjer u [primjerima](references/examples.md). Primjeri su sintetički i ne određuju poslovna pravila ili stvarne podatke.
- Izvori i razlika između Appleovih principa, web standarda i lokalnih preporuka nalaze se u [izvorima](references/sources.md). Provjeri zvaničan izvor kada odluka zavisi od aktuelnog platformskog detalja. Ne preuzimaj čitave priručnike u kontekst.

## Način rada

1. Odredi šta korisnik treba saznati ili uraditi. Za novi ekran kratko zapiši glavnu informaciju, najvažniju radnju i sporedne mogućnosti; sitna izmjena ne zahtijeva zaseban dokument.
2. Poredaj sadržaj po važnosti i grupiši povezano. Razdvoji navigaciju kroz cjeline od radnji nad sadržajem. Izaberi listu, tabelu ili formu prema zadatku i širini prikaza.
3. Koristi dosljedne semantičke tokene, tipografiju i male komponente. Za web koristi semantički HTML i mogućnosti browsera; ne pokušavaj vjerno simulirati iOS na Androidu ili desktopu.
4. Obradi stanja relevantna za tok: učitavanje, prazan sadržaj, nema rezultata, greška, čuvanje, uspjeh, nedovoljan pristup i izgubljena veza. Sačuvaj unos nakon ispravljive greške. Nikad ne potvrđuj finansijski upis prije potvrde servera.
5. Provjeri prikaz i interakciju u raspoloživom okruženju. Ako aplikacija postoji, koristi screenshot za vizuelnu provjeru, tastaturu i odgovarajuće ručne scenarije; pokreni postojeće lint/typecheck/build komande prema obimu izmjene. Ne dodaj testove ili zavisnosti samo radi ovog skilla.
6. U evidenciji zapiši rezultat, DEV fazu, šta je provjereno i ograničenja. Ako je isporučena samo specifikacija, nemoj je označiti kao implementiran i provjeren ekran.

## Pravila koja mijenjaju dizajnersku odluku

- Jasnoća finansija ima prednost nad dekoracijom: sredstva, dug i avans su odvojeni pojmovi; svaka važna suma ima naziv i kontekst perioda/datuma.
- UI poštuje već dogovorena ovlašćenja. Skrivanje kontrole nije zaštita podataka; prikaz, prilozi i istorija ne smiju odavati tuđu karticu.
- Jednostavnost procjenjuj prema izvršenju zadatka. Ne skrivaj česte radnje i ne zamjenjuj razumljive nazive nepoznatim ikonama radi praznijeg ekrana.
- Istakni najvažniju radnju u lokalnom kontekstu. Ne uvodi kruto pravilo „samo jedno dugme na cijelom ekranu“.
- Tekst, razmaci i poravnanje stvaraju hijerarhiju. Karticu koristi za povezanu cjelinu, bez automatskog stavljanja svakog podatka u zasebnu karticu.
- Status prenesi tekstom uz boju; ikone koje samostalno djeluju imaju pristupačan naziv. Čuvaj vidljiv fokus i logičan redoslijed tastature.
- Animacija objašnjava promjenu i poštuje smanjen pokret. Zamućenje je opciono, sa neprozirnom čitljivom alternativom. Finansijske tabele i forme imaju stabilne površine.
- Poništavanje uskladi sa domenom: odustajanje od nepredatog obrasca i dokumentovana ispravka knjiženja imaju različite posljedice. Skill ne odobrava brisanje finansijske istorije.
- Novi vizuelni izbor mora imati razlog vezan za korisnika; ne kopiraj Appleov brend, logotipe ili resurse koji nisu namijenjeni toj upotrebi. Koristi postojeće/licencno odgovarajuće ikone i sistemski font stack.

## Završni pregled

Za pogođeni dio interfejsa provjeri:

- Može li korisnik brzo razumjeti sadržaj i pronaći narednu radnju?
- Da li su navigacija, nazivi, iznosi i statusi dosljedni ostatku proizvoda?
- Da li raspored radi na uskom ekranu i sa povećanim tekstom, bez odsijecanja važnih podataka?
- Mogu li se radnje izvršiti tastaturom, uz vidljiv fokus i razumljive nazive?
- Jesu li greška, napredak i rezultat radnje istiniti i razumljivi?
- Jesu li kontrast, dodirne površine i smanjen pokret provjereni u obimu promjene?

Nedostajuća provjera ostaje eksplicitno navedena; vizuelno dopadljiv prikaz nije dokaz pristupačnosti ili poslovne ispravnosti.
