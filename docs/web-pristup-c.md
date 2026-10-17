# DEV-03-C — lokalna web prijava i administracija

Datum: 17. oktobar 2026. (Europe/Belgrade). Rezultat: lokalna Auth/server/UI integracija, uz granice provjere ispod. DEV-03 kao cjelina ostaje U TOKU; poslovni moduli, poslovni Storage, operativni postupci stvarnog pilota i udaljeni resursi nisu završeni ovim korakom.

## Pokretanje

Uz pokrenut Docker i postojeći lokalni staging:

```sh
corepack pnpm db:start
corepack pnpm db:migrate
corepack pnpm web:configure-local
corepack pnpm dev -- --hostname 127.0.0.1
```

Otvoriti `http://127.0.0.1:3000/prijava`. Za pregled produkcionog builda prvo zaustaviti razvojni server, pa `corepack pnpm build` i `corepack pnpm start -- --hostname 127.0.0.1`. Novi email predlošci iz `supabase/config.toml` zahtijevaju ponovno pokretanje lokalnog Supabase-a ako je već radio: `db:stop` čuva podatke, zatim `db:start`.

`web:configure-local` čita lokalni CLI status, odbija drugi API URL i generiše ignorisani `apps/web/.env.local` sa dozvolama 0600. Ponovno pokretanje namjerno obnavlja taj fajl; restartovati web nakon izmjene. Primjer bez tajni je `apps/web/.env.example`. Nema `NEXT_PUBLIC_` servisnog ključa. `accessConfig` trenutno prihvata samo lokalni API `127.0.0.1:54321` i origin `127.0.0.1:3000`; `localhost` nije zamjena za isti cookie origin.

Postojeći sintetički nalozi su u ignorisanom `supabase/.temp/local-identities.json`; ne prepisivati lozinke u dokumentaciju/razgovor i ne pokretati seed samo radi prijave, jer mijenja lozinke. Novi sintetički pozvani nalog korišćen u C provjeri ima odvojenu ignorisanu datoteku `supabase/.temp/web-c-identity.json` (0600). Sve je lokalno; nema slanja stvarnim korisnicima.

## Rute i sesije

- `/prijava`: email/lozinka, generička greška bez potvrđivanja postojanja naloga.
- `/oporavak`: zahtjev za email vezu; odgovor ne otkriva postojanje naloga niti obećava potvrđenu dostavu.
- `/auth/potvrda`: prihvata samo `invite`/`recovery` token hash; GET prikazuje potvrdu, POST troši jednokratnu vezu i vodi na lozinku.
- `/lozinka`: prijavljeni identitet, najmanje 12 znakova i jednaka potvrda; serverski Auth upis, pa potvrda rezultata.
- `/portal`: stvarni identitet, dostupni ZEV-ovi iz RLS-a, sopstveni pozivi/profil i odjava. Sistemski administrator ima zasebne forme za novi ZEV/prvog administratora i globalnu rolu.
- `/portal/[tenant]`: RLS provjera dostupnosti ZEV-a i svježi `my_permissions`; administratori vide forme zgrada, jedinica, članstava i pet tenant rola. Ostali vide svoja prava i granicu još neizrađenih poslovnih modula.

`@supabase/ssr` 0.12.7 i `@supabase/supabase-js` 2.118.0 koriste serverske HttpOnly, SameSite=Lax cookie-je. Secure je isključen samo zbog lokalnog HTTP-a, uz hard guard lokalnog URL-a. Next proxy obnavlja sesiju i kopira nove cookie-je u zahtjev/odgovor. `getUser` provjerava identitet; `getSession` ili JWT metadata ne služe autorizaciji. Neprijavljene zaštićene rute preusmjeravaju na prijavu. Svaka mutaciona radnja ponovo provjerava identitet i odgovarajuća prava, a RPC/RLS ostaju konačna zaštita. Korisničke rute su dinamičke i imaju privatni no-store odgovor.

Demo `/demo` ostaje odvojen, sa sintetičkim podacima u memoriji. Produkcioni finansijski i sadržajni podaci se ne prikazuju kao da su implementirani. UI revizija K-B–K-E nije nastavljena.

## Pozivi i prava

Migracija 007 dodaje `invitations`, SELECT RLS, audit i RPC-e `record_invitation`, `accept_invitation`, `revoke_invitation`. Poziv važi sedam dana i daje samo osnovnu rolu člana pri prihvatanju. Email token ima sopstveni, kraći Auth rok. Korisnik mora dokazati pozvani Auth identitet/potvrđeni email; poznati ID poziva sam po sebi ne daje pristup. Pri prihvatanju se ponovo provjerava da pozivalac još ima sistemsku ili odgovarajuću tenant administratorsku rolu. Opozvan/istekao/već prihvaćen poziv se odbija. Prihvatanje članstva, role i statusa poziva je jedna DB transakcija.

Slanje novom korisniku zahtijeva provjerenu tenant administraciju prije uskog servisnog Auth poziva. Podaci ZEV-a se i dalje čitaju/pišu klijentom stvarnog pozivaoca. Auth email slanje i SQL nisu jedna transakcija: ako je poruka/nalog kreiran, a SQL evidencija ne uspije, UI izričito prikazuje djelimičan ishod i ne daje članstvo. Administrator može evidentirati poziv postojećem potvrđenom korisničkom ID-ju; korisnik ga vidi pri prijavi. Postojeći nalog se ne otkriva preko javne pretrage emaila. Za istek email veze korisnik traži oporavak; za istek/opoziv ZEV poziva administrator evidentira novi poziv.

Migracija 008 daje administratoru samo imena osoba povezanih sa članstvima/pozivima izabranog ZEV-a, bez opšteg imenika ili izmjene tuđeg profila. Migracija 009 prikazuje primaocu naziv pozvanog ZEV-a prije članstva i usklađuje redoslijed zaključavanja opoziva/prihvatanja. Već primijenjene migracije nisu prepisivane.

Forme koriste postojeće semantičke tokene, TextField/Button/Radix Select, nazive i potvrde na lokalnom jeziku. Kontrolisana polja čuvaju ispravljivi unos; pending stanje sprečava ponovni klik dok odgovor traje. Opoziv članstva je odvojen od dodjele pojedinačne role i traži razlog. UUID se prikazuje samo kao operativni identifikator potvrđenog naloga, uz ime u listi.

## Izvršene provjere

Jednokratne ručne browser/HTTP radnje; nisu dodati testni fajlovi ili testna infrastruktura.

| Provjera | Rezultat |
|---|---|
| Lint / TypeScript / produkcioni build | Prolaze nakon završnih izmjena |
| Migracije 007–009 / SQL lint | Primijenjene lokalno; bez grešaka šeme |
| Prijava osam profila i sistemski prikaz | Admin, član, finansije, sadržaj, pregled, Lipa, bez članstva i sistem imaju očekivana prava; globalni panel samo sistemskom |
| Browser prijava/odjava | Stvarna cookie sesija i povrat na prijavu nakon odjave |
| Neprijavljeni portal | HTTP 307 na `/prijava` |
| Izmjena URL-a na drugi ZEV | Administrator Javora se u browseru vraća na svoj portal sa generičkom porukom; podaci Lipe nisu prikazani |
| Istek sesije | Namjerno istekao potpisani lokalni access token sa važećim refresh tokenom obnovljen; HTTP 200 i nova cookie sesija |
| Zgrada i jedinica | Browser upis promijenio naslov/površinu; originali vraćeni i potvrđeni čitanjem baze |
| Poziv/prihvatanje | Email u lokalnom Mailpit-u, bez članstva prije prihvatanja; potvrda emaila i browser prihvatanje daju jedan ZEV i rolu člana |
| Tuđi/opozvani poziv | Pogrešan identitet i prihvatanje nakon opoziva odbijeni sa 42501 |
| Oporavak | Email predložak, recovery OTP i stvarna serverska promjena lozinke provjereni HTTP-om; prijava novom lozinkom uspijeva; ponovna upotreba veze se odbija |
| Lozinka/validacija | HTTP poziv iste serverske radnje odbija nejednake vrijednosti; browser prikazuje označena polja. Sama promjena lozinke nije izvršavana kroz browser |
| Role | Web serverska radnja dodjeljuje/opoziva content rolu; isti korisnički token odmah vidi true/false |
| Posljednji administrator | Tenant opoziv članstva i globalni opoziv posljednjeg administratora odbijeni |
| Neovlašćeni upis / imenik | Članski zahtjev ne mijenja zgradu; imenik imena odbijen sa 42501 |
| Profil i tastatura | Browser izmjena sintetičkog imena potvrđena, Tab/Enter slanje forme radi |
| Produkciono pokretanje | Landing, demo, prijava, portal i članski ekran daju HTTP 200; korisničke rute private/no-store, browser prijava i administracija potvrđeni |
| Tajne | Env/fixture fajlovi ignorisani; servisni ključ nije pronađen u `.next/static` browser artefaktima |

Prva ručna HTTP proba imala je pogrešan React multipart redoslijed/prefiks, pa nije bila dokaz rada oporavka. Ispravljena proba sa stvarnim poljima završila je tok uspješno; prethodni pokušaj se ne računa kao prolaz. Prilikom razvoja su kratko viđene generičke greške prije primjene novih RPC migracija; nakon primjene ponovljeni zahtjevi uspijevaju.

U bazi ostaju sintetički pozvani član, prihvaćen poziv, opozvan poziv za postojeći sintetički nalog i audit svih ručnih promjena. Dodatna content rola je opozvana; naziv zgrade i površina su vraćeni. Nije brisana istorija.

## Granice i naredni korak

Snimak administracije: [produkcioni prikaz](dizajn/dev-03-c-administracija.png). Vizuelno su pregledani prijava, profil, članski pristup i administracija na dostupnoj širini ugrađenog browsera (788 i 1280 CSS px), uz pristupačna imena kontrola i osnovnu tastaturu. Nije završen poseban prikaz na 320 px, 200% tekst, kompletan čitač ekrana, svi browseri, offline scenariji, opterećenje ili puna matrica konkurentnih Auth zahtjeva. Novi ekrani koriste postojeće provjerene tokene; novi numerički kontrast audit nije ponavljan. To nije tvrdnja o punoj pristupačnosti.

Udaljeni SMTP/isporuka i produkcioni Secure cookie/HTTPS, limiti poziva, kontrola stvarnog identiteta pri gubitku emaila, globalni bootstrap/oporavak svih administratora i operativno čuvanje tajni moraju se potvrditi prije stvarne upotrebe. Gubitak emaila trenutno upućuje na administratora sistema; nema automatizovane promjene tuđeg prijavnog emaila. Vlasničke/delegirane operacije B ostaju RPC osnova, bez novih C ekrana. Poslovni Storage/prilozi nisu implementirani. Zbog toga cijeli DEV-03 ostaje U TOKU.

Sljedeće je korisnikov pregled lokalnog C rezultata i odluka o narednoj DEV-03 podfazi/preostalim kriterijumima. Finansije/sadržaj, udaljeni resursi i objavljivanje nisu pokrenuti. Commit/push nisu izvršeni.

Tehnički oslonac: [Supabase SSR klijent](https://supabase.com/docs/guides/auth/server-side/creating-a-client), [Next/Supabase email token hash](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs), lokalni Next 16.4.2 vodiči `use-server` i `proxy` iz instaliranog paketa.
