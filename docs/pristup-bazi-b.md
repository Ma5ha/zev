# DEV-03-B — serverske operacije i pristup

Datum: 17. oktobar 2026. (Europe/Belgrade). Status: **ZAVRŠENO u obimu postojeće bazne osnove**. [Matrica](matrica-prava.md) određuje dogovorena prava; poslovne tabele DEV-04–07, Storage pravila i web prijava još nisu implementirani.

## Implementacija

Migracije 002–006 nadograđuju postojeću 001 bez brisanja podataka:

| Migracija | Rezultat |
|---|---|
| `20261017000200_access_operations.sql` | Aktuelne provjere rola/članstva, SELECT RLS, uski RPC-i, kreiranje profila nakon Auth korisnika, jednokratni bootstrap i audit razloga |
| `20261017000300_ownership_access_boundary.sql` | Zatvaranje vlasničkog perioda, istorijski pristup i prestanak članskog pristupa bez drugih osnova |
| `20261017000400_delegation_source.sql` | Delegacija ne može proširiti ili nadživjeti izvorno ovlašćenje vlasnika; period drugog vlasništva mora početi do granice promjene |
| `20261017000500_administration_serialization.sql` | Zaključavanje reda za administratorske promjene; zastarjeli repeatable-read upis se odbija umjesto gubitka posljednjeg administratora |
| `20261017000600_business_date_timezone.sql` | Kalendarske vlasničke/delegirane granice fiksirane na Europe/Belgrade |

Prijavljeni klijent ima SELECT samo uz RLS. Nema direktnog INSERT/UPDATE/DELETE nad osnovnim tabelama. Sve aplikacione izmjene idu kroz funkcije sa provjerom `auth.uid()`, `security definer` i praznim `search_path`; autor izmjene nije korisnički parametar. Anonimni pozivalac nema ni pristup podacima ni izvršavanje RPC-a. Pomoćne funkcije su u neizloženoj `private` šemi, uz pojedinačno ograničen EXECUTE.

Role se čitaju iz baze, ne iz korisničkih metadata ili sačuvanih JWT role oznaka. Opozvano/isteklo članstvo ili dodjela se ponovo provjeravaju pri narednom zahtjevu sa istim identitetom. Globalni administrator ima izričitu globalnu dodjelu. Tenant administrator ne može dodijeliti globalnu rolu niti upravljati drugim ZEV-om ili tuđim profilom.

`my_permissions` odgovara samo za pozivaoca. `finance_read` označava pregled svih kartica, a članski pregled budućih zajedničkih izvještaja dolazi iz `member`; nije pravo čitanja tuđih kartica. `finance_write` i `content_write` pripremaju centralnu provjeru za kasnije module. Sam odgovor nije zamjena za buduće RLS/serverske provjere u tim modulima.

## RPC interfejs

| Grupa | Funkcije | Ko može |
|---|---|---|
| Profil | `update_profile` | Sopstveni profil; sistemski administrator i tuđi |
| Prvo postavljanje | `bootstrap_system_admin` | Samo servisna rola, jednom dok nema nijedne globalne dodjele |
| Globalne role | `set_system_admin` | Administrator sistema |
| Tenant | `create_tenant`, `update_tenant` | Kreiranje samo sistemski; izmjena i administrator svog ZEV-a |
| Zgrade/jedinice | `save_building`, `save_unit` | Sistemski ili administrator tog ZEV-a |
| Članstva/role | `add_membership`, `set_tenant_role`, `revoke_membership` | Sistemski ili administrator tog ZEV-a |
| Vlasništvo | `add_ownership`, `end_ownership` | Sistemski ili administrator tog ZEV-a |
| Kartični pristup | `delegate_card`, `revoke_card_access` | Sistemski ili administrator tog ZEV-a, uz evidentiran osnov/zahtjev vlasnika |
| Provjere | `my_permissions`, `can_read_card` | Prijavljeni pozivalac, samo sopstvena prava |

Tačne tipizirane parametre određuju SQL potpisi u migracijama. Nedostupan cilj daje generičku grešku; ne vraća tuđe podatke. `add_membership` vraća postojeće aktivno članstvo ili kreira novo; ne uređuje neprimjetno datum isteka postojećeg. Grantovi se opozivaju, ne brišu. `save_*` ne premještaju zapis između tenanata. Izmjena emaila/lozinke i slanje poziva nisu ove SQL funkcije — pripadaju narednom Auth/server koraku.

Razlog dodjele/opoziva čuva se u `private.operation_reasons`, povezan preko transakcije sa audit snapshotima; čuvaju se stvarni Auth autor, vrijeme i ciljni zapisi. Ne čuva se SQL zahtjev ili lozinka. Direktni audit pristup iz aplikacije je zatvoren; filtriran interfejs istorije tek treba dodati gdje ga modul zahtijeva. Stari audit događaji iz 001 imaju transakcionu oznaku naknadne migracije, a novi originalnu transakciju operacije.

## Granice i primopredaja

Administratorske promjene koriste jedan kontrolni red. Posljednji aktivni sistemski ili tenant administrator ne može biti opozvan, niti njegovo članstvo ukinuto, bez prethodne zamjene. Administratorske dodjele kroz RPC nemaju automatski istek; tenant administrator zahtijeva članstvo bez automatskog isteka. Time zaštita ne zavisi od zakazanog posla. Pri konfliktu `40001` budući server treba bezbjedno ponoviti cijelu transakciju; ne prikazivati upis uspješnim unaprijed.

Za prvi sistemski nalog kontrolisana servisna procedura prvo kreira Auth korisnika, a zatim poziva jednokratni bootstrap. Nema automatskog pretvaranja prvog prijavljenog korisnika u administratora. Lokalni seed ispod služi samo sintetičkom stagingu. Stvarni bootstrap i oporavak gubitka svih administratora zahtijevaju operativnu potvrdu osobe/identiteta i postupak prije stvarnog pilota.

## Vlasništvo i delegiranje

`add_ownership` kreira vlasničku vezu i pristup jedinici; isti korisnik ne dobija preklapajuću vezu za istu jedinicu. Različiti suvlasnici mogu dijeliti jedinicu/karticu. Ne kreira se finansijsko zaduženje — ledger ne postoji.

`end_ownership` zatvara period i ostavlja bivšem vlasniku posebno istorijsko ovlašćenje. Novi period nije dostupan. Ako nema drugog vlasničkog osnova, delegacije ili posebne operaterske/administratorske role, prestaje i njegovo aktuelno članstvo: odmah kod već nastale promjene, ili istekom na granici budućeg datuma. Zasebna ovlašćenja ostaju nezavisna. Ovo ne prenosi dug/avans i ne razrješava obračun mjeseca promjene (DEV-04).

Delegacija zahtijeva aktivnu vlasničku vezu i izvorno kartično ovlašćenje vlasnika, aktivno članstvo zakupca, određeni period pregleda i vrijeme isteka. Osnov sadrži evidentirani zahtjev vlasnika; elektronski workflow zahtjeva još ne postoji. Opoziv, istek, promjena vlasnika ili prestanak izvornog ovlašćenja zatvara naredni pristup. Datumi perioda su `[od, do)`; vremenske provjere koriste DB vrijeme, a funkcije sa kalendarskim granicama imaju fiksiran `timezone=Europe/Belgrade`, nezavisno od zone pozivaoca. Timestamptz vrijednosti ostaju apsolutni trenuci; budući UI mora prikazati istu poslovnu zonu.

`can_read_card` sada samo odgovara na pitanje pristupa konkretnog pozivaoca jedinici/danu. Budući finansijski i Storage moduli moraju ga primijeniti na datum stvarnog zapisa/priloga i ne smiju vratiti zbir ili privatni dokument prethodnika preko novog perioda. Pozivanje ove provjere samo po sebi ne stvara finansijsku ili dokumentnu zaštitu još nepostojećih modula.

## Lokalni sintetički korisnici

```sh
corepack pnpm db:seed-users
```

`scripts/seed-local-identities.mjs` čita isključivo lokalni CLI status i odbija API URL različit od `http://127.0.0.1:54321`. Kreira deset rezervisanih sintetičkih naloga, poziva jednokratni servisni bootstrap i ostale operacije preko stvarnog Auth tokena. Nasumične lozinke su samo u ignorisanom `supabase/.temp/local-identities.json` sa dozvolama `0600`; ne kopirati ih u dokumentaciju, commit ili udaljeni seed. Ponovno pokretanje mijenja njihove lozinke i idempotentno popunjava početne aktivne dodjele; nije reset cijele baze i ne treba ga pokretati nad izmijenjenim poslovnim fixture-ima bez pregleda.

Pripremljeni su sistemski administrator, administratori Javora i Lipe, finansijski operater, operater sadržaja, finansijski pregled, vlasnik, suvlasnik, zakupac i korisnik bez članstva. Operateri/pregled dodatno imaju osnovnu člansku rolu. Početno stanje: 10 profila, 8 aktivnih članstava, 13 aktivnih tenant dodjela, 1 globalna dodjela i 2 suvlasničke veze sa 2 vlasnička ovlašćenja. Zakupac početno nema delegaciju. Ručne promjene primopredaje ostaju u istoriji, zato ukupan broj grantova može biti veći od broja aktivnih.

## Izvršene provjere

Provjere su jednokratne ručne HTTP/SQL radnje, bez dodavanja testnih fajlova ili infrastrukture.

| Provjera | Ishod |
|---|---|
| Stvarna Auth prijava deset korisnika | HTTP 200 za sve; tokeni nisu zapisani u izvještaj |
| Javna registracija | HTTP 422 `signup_disabled`; globalni signup isključen, email provider uključen |
| Sistemski / Javor / Lipa / bez članstva | 2 / 1 / 1 / 0 vidljivih tenant prostora |
| Šest rola i privatne vlasničke veze | Prava odgovaraju osnovnoj matrici; obični vlasnik vidi samo svoju vezu, content nema tuđe kartice, finansijski pregled nema upis |
| HTTP eskalacija / pogrešni upisi | Tenant admin→globalna rola, finansijski/pregled→tenant izmjena i bootstrap kao običan korisnik: HTTP 403/42501 |
| Anonimno čitanje | HTTP 401/42501, bez podataka |
| Direktni DML i tuđi profil/tenant | Odbijeni; sopstveni profil dozvoljen, audit bilježi ispravnog autora |
| Posljednji admin / opoziv njegovog članstva | Odbijeno; nakon dodjele zamjene opoziv je dozvoljen |
| Istovremeni opozivi / repeatable read | Jedna sesija upisala, druga dobila serialization failure; ostao jedan admin, početne role vraćene kroz RPC |
| Opoziv finansijske role | Isti identitet odmah dobija `finance_write=false` |
| Suvlasništvo i granice perioda | Vlasnik ne vidi dan prije početka ili drugu jedinicu; drugi suvlasnik zadržava pristup |
| Promjena vlasništva | Stari vlasnik: 0 aktuelnih tenanata, raniji dan dozvoljen, novi dan odbijen; delegat odbijen |
| Delegacija / istek / opoziv / opoziv izvora | Dozvoljeni pregled pa odbijanje nakon prestanka; nova delegacija iz opozvanog izvora odbijena |
| Ponovljeno postavljanje fixture-a | Nema duplih aktivnih članstava/rola/vlasništava |
| Migracije i SQL lint | Primijenjene 001–006; lint bez grešaka |

Probne SQL promjene profila, perioda i grantova poništene su rollbackom. Konkurentna primopredaja upisana je radi dviju sesija, a zatim vraćena kroz autorizovane RPC-e uz očuvanje istorije. Nisu izvršeni testovi opterećenja, puni audit čitača, UI/E2E, udaljeni deployment ili provjera još nepostojećih finansijskih/priložnih modula. SQL privilegovani `postgres` i servisni ključevi su operativni trust boundary, ne krajnji korisnici; ne izlagati ih browseru.

Sljedeće: DEV-03-C — web Auth/server integracija, prijava/odjava, pozivi, sesija i administrativni UI; prije tih UI izmjena primijeniti projektni UI skill. Cijeli DEV-03 ostaje U TOKU.

Tehnički izvori: [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [funkcije i prava izvršavanja](https://supabase.com/docs/guides/database/functions).

## Nastavak C

Lokalna web integracija i migracije 007–009 implementirane su u DEV-03-C; [izvještaj C](web-pristup-c.md) dopunjuje raniji opis bez web Auth-a. Postojeći B RPC-i ostaju put upisa osnovnih evidencija.
