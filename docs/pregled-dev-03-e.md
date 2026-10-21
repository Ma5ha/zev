# DEV-03-E — pregled lokalne osnove i uslova nastavka

Datum: 17. oktobar 2026. (Europe/Belgrade).

**Zaključak:** A–D imaju implementiranu lokalnu osnovu i dokumentovane provjere. DEV-03 ostaje **U TOKU**: korisnikov pregled C/D nije potvrđen, stvarna operativna spremnost nije dokazana. E završava nezavisni dokumentacioni pregled, ne prihvatanje korisnika ili spremnost za pilot. DEV-04 nije odobren.

Naknadna instrukcija korisnika, 17. oktobar 2026: trenutno nije u prilici za pregled C/D i odlaže ga za kasnije. Pregled je PAUZIRAN, bez prihvatanja i bez određenog roka. Osnovna pravila FIN-03–05 naknadno su potvrđena u navedenom obimu; preostala finansijska pitanja su otvorena; odlaganje samo ne odobrava DEV-04 ili zatvaranje DEV-03.

## E-1 — kriterijumi i dokazi

Polazište je [razvojni plan](razvojni-plan.md#dev-03--podaci-identitet-i-pristup). „Predsjednik“ u izvornom kriterijumu znači potvrđena aplikaciona prava administratora ZEV-a; naziv funkcije sam ne daje prava.

| Kriterijum / korak DEV-03 | Lokalni dokaz | Granica / preostalo |
|---|---|---|
| Šema tenant/zgrada/jedinica/vlasništva/članstava | Migracije 001–006; [A](lokalni-staging.md), [B](pristup-bazi-b.md) | Sintetički podaci; stvarni pilot i dokumenti ovlašćenja nisu uneseni |
| Prijava, odjava, poziv, obnova i oporavak sesije | Migracije 007–009, `features/access`, `proxy.ts`; [C](web-pristup-c.md) | Browser prijava/odjava/poziv, HTTP obnova/oporavak; promjena lozinke nije završena browserom. SMTP je lokalni Mailpit |
| Administracija zgrade/jedinica/članstava i trag promjene | C forme/server actions i B RPC-i; upisi i vraćanje vrijednosti evidentirani u C | Vlasništvo/delegacije imaju RPC osnovu bez C ekrana; korisnikov pregled administracije nedostaje |
| Administrator i najmanje dva stanarska identiteta imaju očekivan pristup | B: deset sintetičkih prijava, vlasnik/suvlasnik i periodi; C: osam profila; D: vlasnik/suvlasnik i prilozi | Ovo je zajednički dokaz ranijih pojedinačnih provjera, nije nova cjelovita browser proba dva stanara |
| Anonimni korisnik nema interne podatke | B odbijena anonimna čitanja; C portal 307; D anonimni prilog 404 | Nema poslovnih finansijskih/sadržajnih zapisa koje bi ova provjera mogla potvrditi |
| URL/direktni zahtjev ne otvara drugi tenant ili tuđu karticu | B RLS/RPC i periodi; C browser drugi tenant; D HTTP opsezi | Finansijski ledger i buduće roditeljske tabele zahtijevaju svoje provjere |
| Opoziv važi u postojećoj sesiji za naredne zahtjeve | B odmah izmijenjena prava; D prilog 200 → opoziv → 404 u istoj sesiji | Posebno istorijsko ovlašćenje bivšeg vlasnika je nezavisan osnov i opoziva se zasebno; već preuzeti bajtovi se ne povlače |
| Privatni Storage i serverske tajne | Migracije 010–014 i `app/api/prilozi/[id]/route.ts`; [D](prilozi-d.md) | Nema signed URL-a; provjera RLS prije i poslije baferovanja. Nema korisničke upload forme ili roditeljskih poslovnih zapisa |
| Audit: autor/vrijeme/prethodno/novo/razlog | `private.audit_events`, `operation_reasons`, B/D recovery atribucija | Audit aplikacioni čitač nije izgrađen; ne prikazivati raw snapshotove koji bi otkrili privatne podatke |
| Kontrolisan oporavak administratora | [Postupak](oporavak-administratora.md), SQL rollback probe D | Nema stvarne ljudske provjere identiteta ili kompletne recovery vježbe; rollback ne dokazuje HTTP opoziv refresh sesije |

U E su pregledani kod Auth/server/proxy sloja, tenant portal, metadata/RLS migracija 010 i naknadna zabrana alternativnih upload operacija 014 te endpoint preuzimanja. Nisu ponavljani raniji SQL/HTTP/browser scenariji ni lint/typecheck/build: mijenja se samo dokumentacija. Tabela koristi prethodno evidentirane ishode C/D/B, ne tvrdi da su ponovo izvršeni ili da je cijela aplikacija bez grešaka. HEAD pri preuzimanju: `0d70694`.

## E-2 — konkretan korisnikov pregled

Pregled je lokalni; `/demo` ima privremene sintetičke finansije, dok `/portal` koristi bazu. Ne očekivati finansijske kartice ili upload poslovnih dokumenata u portalu.

1. Otvoriti [prijavu](http://127.0.0.1:3000/prijava). Koristiti postojeći sintetički nalog iz ignorisanog `supabase/.temp/local-identities.json` na svom računaru; ne slati sadržaj fajla u chat. Ne pokretati ponovni seed radi pristupa jer mijenja lozinke.
2. Kao administrator Javora otvoriti „Moj pristup“ pa ZEV: da li su jasni nazivi, zgrade/jedinice, aktivna članstva, odvojena dodjela role i opoziv cijelog članstva? Za prihvatanje prikaza nije potrebna izmjena baze. [Raniji snimak C](dizajn/dev-03-c-administracija.png) je pomoć, ne zamjena za lični pregled.
3. Odjaviti se pa otvoriti `/portal`: očekuje se prijava. Prijaviti običnog člana: očekuju se njegova prava i poruka da poslovni moduli još nisu povezani; nema administratorskih formi.
4. Za D pročitati [opsege i granice priloga](prilozi-d.md) i [oporavak](oporavak-administratora.md). Nema nove D stranice za pregled. Provjeriti da li odgovara model: svaki novi download ponovo provjerava pravo, izgubljeni email traži ljudsku provjeru, posljednji administrator traži zamjenu.
5. Ishod navesti kao: „Pregledao i prihvatam lokalni C/D“ ili navesti ekran/postupak, očekivanje i primjedbu. Sam nalog da se nastavi E ne znači prihvatanje.

Ovo je uputstvo za pregled, nije izvršena nova UI provjera. C već navodi pregled 788/1280 CSS px i osnovnu tastaturu; 320 px, 200% tekst, čitač ekrana i puna browser matrica ostaju nepokriveni. Skill `zev-ui-design` primijenjen je na jasnoću zadataka i razdvajanje stvarnih/demonstracionih ishoda; K-B–K-E ostaju pauzirani.

## Operativni uslovi i trenutak kada su potrebni

| Uslov | Stanje | Ko / kada razrješava |
|---|---|---|
| Prihvatanje lokalnog C/D | PAUZIRANO — korisnik odložio za kasnije | Korisnik, prije zaključka DEV-03 |
| Prva/dvije globalne odgovorne osobe i nezavisni odobravalac oporavka | Postupak postoji, osobe nisu imenovane | Korisnik/operator, prije stvarnih naloga i recovery upotrebe |
| Dokazi identiteta, sigurno čuvanje tajni i incidenta, primopredaja | Opisani, stvarni postupak nije uvježban | Operator i nezavisni odobravalac, prije stvarne upotrebe |
| Hosting/region/trošak/odgovornost (PIL-12), HTTPS i Secure cookie, SMTP i ograničenja poziva | Udaljeno nije odobreno ni provjereno; kod namjerno prihvata samo lokalne URL-ove | Korisnik/operator, prije udaljenih resursa i stvarnih poziva |
| Backup/restore baze zajedno sa Storage objektima, čuvanje i podrška (PIL-13) | Lokalni A restart nije potpuna restore vježba; D je nije završio | Operator, prije pilot izdanja DEV-09/10 |
| Kvote, opasni dokumenti/karantin, napuštene rezervacije i opterećenje | D ograničava MIME/veličinu; ostalo otvoreno | Korisnik/operator, prije stvarnih dokumenata |
| Roditeljski zapis svakog poslovnog priloga | Planirano, još ne postoje moduli | Izrada DEV-04–07: FK i izvedeni tenant/jedinica/period/autor iz roditelja, transakciono usklađivanje i provjera prava |
| Uski ekran, povećani tekst i preostala pristupačnost C | Nije nova provjera u E | Uključiti u posebno odobreni nastavak provjere, prije pilot izdanja; ne nastavljati pauzirani K bez naloga |

Nedostatak finansijskih/sadržajnih roditelja nije kvar lokalne D infrastrukture. Njihovo vezivanje je obavezna zavisnost budućeg modula, a ne razlog da se u E implementira DEV-04. Za završni zaključak DEV-03 korisnik mora pregledati lokalni rezultat, a preostale operativne uslove treba ispuniti ili izričito rasporediti prije stvarne upotrebe uz sačuvane granice. Ovaj dokument ih sam ne odlaže niti zatvara fazu.

## E-3 — odluke prije DEV-04

[Upitnik za finansije](odluke-finansije.md) odvaja potvrđeni model od prijedloga PIL-05–09, donosi rubne slučajeve i sintetički primjer za prihvatanje. Naknadno su potvrđeni osnovi FIN-03–05; tačan opseg i preostala pitanja navodi finansijski upitnik. Nema novih pravnih tvrdnji ili potvrde tarife zgrade; ranije otvorene provjere [istraživanja](istrazivanje-zev-rs.md) ostaju otvorene.

## Sljedeći korak

Primiti korisnikov ishod C/D i odgovore o finansijskim pravilima, evidentirati stvarne odluke i tek potom zaključiti preostale kriterijume DEV-03. Implementacija DEV-04, udaljeni resursi i objavljivanje traže novi nalog. Nema commita/pusha ili promjene lokalnih podataka u E.

## Delegirane finansijske odluke — 18. oktobar 2026.

Korisnik je ovlastio agenta da donese preostale finansijske odluke. Važeća pravila FIN-01–11 su u [finansijskim odlukama](odluke-finansije.md#važeće-odluke-po-delegiranom-ovlašćenju--18-oktobar-2026) i imaju prednost nad ranijim navodima otvorenih produktnih pitanja: početna stanja i verzije tarifa, obavezan rok i audit izmjene, deterministički raspored, zaokruživanje i podjela ostatka, korekcije, bankovni obim i pregled te redakcija priloga. Sintetički parametri su izabrani za buduću lokalnu izradu; stvarna tarifa, početna stanja i dokumenti ostaju uslov prije pilota. Finansijske odluke više ne čekaju pojedinačne odgovore korisnika. Pregled C/D ostaje odložen, DEV-03 nije zaključen, a DEV-04 i objavljivanje nisu odobreni. Odluke nisu implementacija.
