# DEV-03-D — privatni prilozi i administratorski oporavak

Datum: 17. oktobar 2026. (Europe/Belgrade). Lokalna infrastrukturna podfaza; cijeli DEV-03 nije završen. Korisnikov pregled C nije potvrđen. Nema novih ekrana ili produkcionih poslovnih modula.

## Model preuzimanja

Migracije 010–014 kreira privatni bucket `zev-private` i tabelu `attachments`. Putanja je isključivo `<tenant UUID>/<attachment UUID>`; nazivi osoba i originalni nazivi fajlova ne ulaze u URL. Podaci su nepromjenjivi iz aplikacije; nema UPDATE/DELETE prava ni zamjene postojećeg objekta. Metadata upis ide kroz `reserve_attachment`, audit bilježi autora/vrijeme/opseg. INSERT objekta dozvoljen je autoru rezervacije 15 minuta, uz ponovnu provjeru trenutne role. Bucket ograničava stvarnu veličinu i dozvoljene MIME tipove; serversko preuzimanje dodatno traži poklapanje sa rezervisanim MIME-om/veličinom. Prazni i fajlovi preko 5 MiB nisu dozvoljeni. PDF, PNG, JPEG i obični tekst su dozvoljeni; MIME nije dokaz bezbjednosti sadržaja.

Normalni upload je jedina dozvoljena Storage INSERT operacija (`storage.allow_only_operation`, naziv potvrđen u instaliranom Storage API-ju). Potpisani upload tokeni i alternativni S3/TUS/copy upisi nisu otvoreni; time upload ne dobija nezavisan bearer token koji nadživljava opoziv.

Storage nema SELECT politiku za korisnike: direktno preuzimanje, listanje i kreiranje signed URL-a nisu dozvoljeni. Serverski `GET /api/prilozi/[id]` provjerava Auth korisnika i SELECT RLS metapodataka, tek potom privatnim serverskim klijentom preuzima objekat. Poslije preuzimanja ponovo provjerava RLS prije slanja bafera. Odgovori su `private, no-store`, bez redirecta, `nosniff` i `Content-Disposition: attachment`; nedostupan ID i neovlašćen korisnik dobijaju isti 404.

[Supabase dokumentacija](https://supabase.com/docs/guides/storage/serving/downloads) opisuje signed URL kao vremenski ograničen pristup. D ga ne izdaje, jer bi ranije izdata veza omogućavala nove zahtjeve do isteka bez nove provjere članstva. Ne postoji endpoint koji browseru daje servisni ključ.

Opoziv važi za nove zahtjeve nakon DB commita, uključujući postojeću sesiju. Ne može povući već isporučene bajtove, preuzetu kopiju ili zaustaviti slanje odobreno neposredno prije opoziva. Bafer do 5 MiB ograničava memoriju po zahtjevu; opterećenje, kvote i antivirus/karantin treba razraditi prije stvarnih dokumenata.

## Opsezi

| Opseg | Čitanje | Rezervacija/upload |
|---|---|---|
| `common_finance` | Sistem, tenant admin, finansijski operater/pregled, član | Sistem, tenant admin, finansijski operater |
| `content` | Sistem, tenant admin, operater sadržaja, član | Sistem, tenant admin, operater sadržaja |
| `card` | `can_read_card` za konkretnu jedinicu i datum | Sistem, tenant admin, finansijski operater |
| `report` | Sistem, tenant admin, operater sadržaja; autor uz aktivno članstvo | Autor uz aktivno članstvo, uključujući sistemskog administratora |

Sve tenant role provjeravaju aktuelno članstvo i rokove iz baze. Kartica nasljeđuje postojeću provjeru vlasništva/delegacije i istorijskog perioda. Bivši vlasnik ima samo izričito posebno istorijsko ovlašćenje; njegov poseban opoziv ukida pristup. Opoziv članstva sam po sebi ne ukida namjerno nezavisno istorijsko ovlašćenje bivšeg vlasnika. Jedan datum znači prilog jednog dana, ne dokument više privatnih perioda; takve dokumente razdvojiti ili u narednom modulu provjeriti cijeli opseg.

Ovo nisu računi, ledger, radovi ili prijave iz produkcionog modula. Trenutni infrastrukturalni RPC prima opseg od ovlašćenog operatera; budući modul mora izvesti tenant, autora, jedinicu i period iz stvarnog roditeljskog zapisa, vezati prilog FK-om i onemogućiti samostalno proširenje opsega. Nije dozvoljeno koristiti slobodnu metadata rezervaciju kao zamjenu za buduću autorizaciju roditelja. Nema korisničke upload forme. Rezervacija pa upload nisu jedna transakcija: neuspjeli upload ostavlja auditovan metadata zapis bez objekta, čije preuzimanje vraća 404. Ne vrši se automatsko brisanje podataka; operativna kontrola napuštenih rezervacija tek prije pilota.

## Provjera

Završni lint, eksplicitni typecheck, produkcioni build i SQL lint prolaze. Migracije 010–014 primijenjene su lokalno bez reseta. Jednokratne ručne provjere:

| Provjera | Rezultat |
|---|---|
| Upload pet osnovnih sintetičkih priloga | Uspješan korisničkim Storage INSERT-om |
| Direktni download / signed download URL / signed upload token / overwrite / metadata UPDATE | Odbijeni |
| Drugi tenant, bez članstva, anonimni GET | 404 bez sadržaja |
| Globalni/tenant administrator | Svi sintetički opsezi dostupni |
| Finansijski operater/pregled | Finansijski i kartični opsezi; tuđa prijava odbijena |
| Operater sadržaja | Zajednički sadržaji preko dodatne članske role i prijave; kartice odbijene |
| Vlasnik/suvlasnik | Njihova kartica i dozvoljeni dan; 2020. dan prije vlasništva odbijen |
| Prijava | Autor je vidi, drugi obični član ne vidi |
| Opoziv članstva, ista aktivna sesija | 200 → opoziv/commit → 404 → kontrolisana zamjena članstva/role → 200 |
| SQL delegacija / istek / bivši vlasnik / opoziv istorijskog granta | Očekivani dozvoljeni/odbijeni ishodi, sve promjene rollbackovane |
| Pogrešna tenant putanja, HTML i prevelika rezervacija | Odbijeni |
| Stvarni MIME različit od rezervacije | Upload moguć za tip iz bucket liste, ali preuzimanje uskraćeno sa 404 |
| Produkcioni MIME i keš | Validni tekst 200, `private, no-store`, osnovni tip normalizovan od charset parametra |
| Servisni ključ u `.next/static` | Nula poklapanja; ključ nije ispisivan |
| Globalni recovery SQL / session recovery SQL | Zamjena/audit i opoziv sesija potvrđeni u transakciji, zatim rollback |

U bazi ostaju sintetički prilozi i dvije rezervacije iz neuspjelog uploada; dodatne probe normalnog uploada i MIME neslaganja ostaju kao sintetička operativna istorija. Staro članstvo sintetičkog delegata je opozvano i zamijenjeno aktivnim članstvom/osnovnom rolom kroz RPC; ranija istorija nije brisana. Prvi RLS helper/preflight pokušaji i prvi MIME check nisu računati kao prolaz. Rezultati i korekcije detaljno su navedeni u evidenciji. Nema novih testnih fajlova ili infrastrukture. UI nije mijenjan pa nema nove vizuelne provjere. Udaljeni Storage/CDN, konkurentno opterećenje i produkciona bezbjednost nisu provjereni. Operativni postupci su u [oporavak-administratora.md](oporavak-administratora.md).
