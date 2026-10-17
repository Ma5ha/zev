# Živo dvorište — design QA

17. oktobar 2026. (Europe/Belgrade). DEV-02-J-E: tehnička i vizuelna provjera, ne korisnikovo prihvatanje.

## Izvor i poređenje

- Izvor vizuelne istine: `docs/dizajn/zivo-dvoriste-referenca.png`, 1487×1058 px. Prikazuje dva zasebna ekrana za poređenje; nije jedan viewport aplikacije.
- Implementacija: `docs/dizajn/provjera/pregled-1280.png`, 1280×1630 px full-page iz viewporta 1280×1000 CSS px; `kartica-1280.png`, 1280×1296 px; `pregled-320.png` mobilni full-page iz 320×850 CSS px; `landing.png` iz 1280×720 CSS px. Dodatni privremeni dokazi: `/tmp/zev-j-360.png`, `/tmp/zev-j-768.png`, `/tmp/zev-j-200-finance.png`.
- Referenca, završni pregled i kartica otvoreni zajedno u istom vizuelnom pregledu. Poređenje sadržajnih regija pri 1 screenshot px po CSS px; izvor nije rastegnut na dva spojena ekrana aplikacije. Izvor nema dokazanu CSS gustinu; nije tvrdnja o pixel-perfect identičnosti.
- Stanje: Javor/vlasnik, početnih 1.000 KM i dug A 20 KM. Kartica je zasebna ruta. Nove oktobarske obaveze su 0 KM prije obračuna, bez preuzimanja pogrešnog broja sa mockupa.

## Nalazi i istorija korekcija

- [P1, ispravljeno] Prva browser slika pokazala je bijeli tekst na svijetlom aktivnom nav redu. Tailwind utility je nadjačao komponentni stil. Uklonjene konfliktne utility klase; završni screenshot i očitana boja `rgb(40,86,90)` potvrđuju tamnu aktivnu površinu. Kontrast bijelog teksta 8,17:1.
- [P2, ispravljeno] Iznos lične kartice prvobitno je imao težinu običnog reda. Povećan na 24px, uz zadržan naziv Dug/Avans/Saldo; završni pregled pokazuje jasnu sekundarnu finansijsku hijerarhiju. Dodata Tabler ikona sredstava.
- Nema preostalih uočenih P0/P1/P2 nalaza u provjerenom obimu.

## Pet površina vjernosti

| Površina | Ishod |
|---|---|
| Font i tipografija | Sistemski sans prema planu, naslovi pregleda 36/48px, detalji 30px, sredstva i saldo 36/48px, tabularne cifre; čitljivi pomoćni tekst i prirodno prelamanje. Izvorni font nije utvrđen, sistemski font je eksplicitno dogovoren. |
| Razmaci i raspored | Tamna 240px navigacija, krem platno, hero sa zasebnom ilustracijom, mint sredstva i kajsija kartica. Kartica je posebna stranica. Kontrole/pojašnjenja zauzimaju više visine nego mockup jer čuvaju privremeni karakter demoa, datum osnove i postojeće sadržaje. To je planirano prilagođavanje funkcionalnom demou. |
| Boje i tokeni | Paleta iz izvedbenog plana, bez starih plavih tokena. Tekst najmanje 5,61:1 za provjerene pomoćne kombinacije, kontrola najmanje 3,40:1; fokus na svijetloj/tamnoj površini. Puni brojevi u evidenciji. |
| Slike i ikone | Lokalna samostalna slikarska ilustracija 1400×850 WebP, bez teksta i bez mockupa kao UI pozadine. Čist prikaz i odgovarajući odnos stranica. Detaljnija i manje plošna nego original — prihvatljiva interpretacija iste scene za ovaj pregled. Pet standardnih MIT Tabler ikona uz vidljive nazive. ZEV brend zadržan. |
| Tekst i podaci | Srpska latinica, postojeći formateri, stvarne demo vrijednosti i statusi. Nema nove stranice svih aktivnosti, novih grafikona, izmišljene lokacije ili stvarnih naloga. Početni dug nije novo oktobarsko zaduženje. |

Fokusirane regije pregledane su kroz screenshot kartice i browser prikaze nav reda, iznosa, native datuma/fokusa i obrazaca. Full-page dokaz služi odnosima regija, a ne zamjeni za pregled čitljivosti.

## Interakcije i granice

Ručni prolaz u ugrađenom browseru: pet cjelina, tri profila, dva ZEV-a; kartica A i prikaz C/500 KM u Lipi; korisnik prostora bez kartica; finansijska validacija i pregled/potvrda troška 120 KM; povezani rad sa plaćeno 120 KM i promjena statusa; objava; očuvanje nacrta poslije Escape pri promjeni tenanta; prijava sa lokalnim WebP pregledom; odgovor ankete i zatvaranje sa rezultatom 0/1; obračun 0,50 KM/m² daje A 50/B 20 uz sredstva 1.000; potvrđeni reset vraća Javor/vlasnik i početne iznose. Konzola provjerenog taba nema zabilježenih error poruka.

Normalan pregled na 320/360/768/1280 CSS px ima širinu dokumenta jednaku viewportu. Privremeni build sa `html {font-size:200%}` potvrđuje 32px font i bez horizontalnog širenja na pregledu, finansijama, kartici i radovima pri 320px; pravilo uklonjeno prije završnog builda. Meni se otvara Enterom, Escape vraća fokus na Meni; native potvrde fokusiraju Odustani, reset potvrđen Enterom. Landing, prava i /ui vizuelno pregledani.

Granice: nije ponovljen čitav H skup nakon svake CSS dorade. Ponovljeni obračun, sve uplate, svi PDF/foto formati, direktno otvaranje zabranjenih ruta, dugi nazivi/ekstremni iznosi i svi ekrani pri 200% nisu ponovo iscrpno ručno provjereni; postojeća finansijska/permission logika nije mijenjana i H ostaje raniji dokaz. Pokušaj ponavljanja obračuna zaustavljen prije potvrde zbog pogrešnog segmentnog unosa datuma kroz browser alat; potvrđena validacija i potom reset, bez duplog upisa. Nema novih testova, frameworka, screen-reader audita, drugih engine-a ili potpune WCAG sertifikacije.

## Implementacioni popis

- Tokeni, komponente, ilustracija i ikone — provjereno.
- Okvir, pregled, kartica i ostale cjeline/landing — implementirano i pregledano u navedenom obimu.
- Node 22.22.1 / Corepack pnpm: završni lint, typecheck i build prolaze; git diff --check prolazi.
- Lokalni demo na 127.0.0.1:3000 ostaje za korisnikov pregled; backend i objavljivanje nisu odobreni.
- Korisnikovo prihvatanje ostaje otvoreno kao J-E.

## Dodatno poliranje

[P3] Ako korisnik želi bližu plošnu ilustraciju ili kompaktnije finansijske površine, doraditi nakon njegovog pregleda. Izostavljeni dekorativni biljni znakovi i novi logo iz mockupa prema dogovorenoj granici brenda.

final result: passed
