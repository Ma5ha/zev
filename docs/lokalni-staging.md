# Lokalni staging — DEV-03-A

Datum: 17. oktobar 2026. Staging u ovom koraku znači izolovani lokalni Supabase za sintetičke podatke, ne javno staging izdanje aplikacije.

## Pokretanje i pristup

Preduslovi: Node prema `.nvmrc`, Corepack/pnpm i pokrenut Docker Desktop. CLI je projektna dev zavisnost zaključana na 2.121.0. Instalaciona skripta Supabase paketa je dozvoljena u `pnpm-workspace.yaml`; ranije preskočene SWC/unrs skripte nisu dodatno odobrene.

Iz glavnog foldera:

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm db:network # samo prvi put, ako mreža još ne postoji
corepack pnpm db:start
corepack pnpm db:status
corepack pnpm db:migrate
corepack pnpm db:lint
corepack pnpm db:stop
```

`db:start` pokreće kontejnere, primjenjuje nove migracije i pri prvom stvaranju baze učitava seed. `db:migrate` primjenjuje nove lokalne migracije bez resetovanja podataka. `db:stop` čuva lokalne podatke; ponovni `db:start` ih koristi. Ne koristiti `stop --no-backup` ili `db reset` bez namjernog brisanja lokalnog sadržaja i prethodne kopije potrebnih podataka.

Mreža `zev-staging-local` ima Docker bridge opciju `host_binding_ipv4=127.0.0.1`; `db:start` koristi njen `--network-id`. `db:network` pokrenuti samo pri prvom postavljanju; postojeća mreža ostaje za naredna pokretanja.

Servisi imaju project ID `zev-staging`: Studio `http://127.0.0.1:54323`, API `http://127.0.0.1:54321`, PostgreSQL port `54322`, lokalni pregled emaila `http://127.0.0.1:54324`. Konekcione podatke uzeti iz lokalnog `db:status`; ne upisivati ih u repozitorijum ili razgovor. Root pristup Studio/SQL-u je razvojni pristup sa punim baznim ovlašćenjima, nije provjera aplikacione role.

## Šta je u bazi

Migracija `20261017000100_identity_foundation.sql` kreira:

- `profiles` vezan za Supabase `auth.users` bez sopstvene tabele lozinki.
- `tenants`, `buildings`, `units` sa kompozitnim vezama koje ne dopuštaju jedinicu u zgradi drugog ZEV-a.
- `memberships`, pet tenant rola u `tenant_role_grants` i globalni `system_admin_grants` odvojeno od članstava.
- `ownerships` i vremenske `card_access_grants` kao osnovu za buduće kartice i istorijski pristup; datum kraja je isključiv. Posebni finansijski ledger još ne postoji.
- Interni `private.audit_events` i triggere za promjene osnove, sa baznim akterom i Auth akterom kada postoji. Seed/SQL administracija nemaju Auth korisnika; to se ne predstavlja kao identitet stanara.

Seed dodaje dva sintetička ZEV-a Javor/Lipa, po jednu zgradu i jedinice A/B/C. Ne kreira korisnike, lozinke, administratore, finansijske salde ili stvarne lične podatke. Korisnički nalozi i kontrolisano prvo postavljanje administratora dolaze pri narednoj DEV-03 podfazi.

RLS je uključen na svih devet aplikacionih tabela, a prava `anon`/`authenticated` su opozvana. **Aplikacioni pristup je zatvoren** dok ne postoje provjerene politike i serverske radnje. Pun model šest rola, zabrana uklanjanja posljednjeg administratora, automatski prestanak delegacije i ograničenja vlasničkih perioda još nisu sprovedeni izvršivim pravilima. Obični SQL pristup `postgres` te politike zaobilazi; koristiti samo sintetičke podatke.

Auth servis postoji kao dio lokalnog Supabase-a; javna registracija je isključena. Web demo i dalje koristi svoje stanje u memoriji. Nema UI povezivanja, Auth ekrana, API ruta aplikacije ili završenih produkcionih modula. Storage servis nije konfigurisan kao poslovna arhiva i nema kreiranih poslovnih bucket-a. Realtime, Edge runtime i analytics su isključeni jer nisu potrebni za ovu osnovu.

## Kasniji prelazak na udaljeni Supabase

Migracije su izvor šeme; nova izmjena dobija novi fajl, već primijenjeni fajl se ne prepisuje. Ova inicijalna migracija pretpostavlja Supabase Postgres sa `auth.users`, baznim rolama i `auth.uid()`, pa nije samostalna migracija za običan PostgreSQL bez Supabase-a.

Prije udaljenih radnji potvrditi projekat, region, trošak, pristupe i izdanje. Povezivanje/objavljivanje nije izvršeno ovim zadatkom. Ciljni PostgreSQL treba uskladiti sa lokalnom glavnom verzijom 17. Tada se CLI lokalni folder povezuje s konkretnim projektom i pregleda plan migracija prije `db push`. CLI tajne i remote ID ne čuvati u verzionisanim fajlovima. Auth/SMTP/redirect i Storage podešavanja zahtijevaju zasebnu provjeru; SQL migracije same ne prenose sva platformska podešavanja.

Sintetički `seed.sql` služi samo lokalnom stagingu; ne slati ga kao pilot podatke i ne koristiti `--include-seed` na udaljenom projektu. Prelazak migracija ne prenosi automatski korisnike, lozinke, lokalne izmjene, Storage objekte ili tajne. Ako tada bude potrebno prenijeti sadržaj, dogovoriti poseban export/restore sa provjerom i kopijom. Za sada nema stvarnih podataka za migraciju.

Izvori: [Supabase lokalni CLI](https://supabase.com/docs/guides/local-development/cli/getting-started), [verzionisane migracije](https://supabase.com/docs/guides/local-development/database-migrations).

## Zabilježena prepreka pri prvom pokretanju

Docker Desktop credential helper se zaglavio pri preuzimanju javnih ECR slika. Preuzimanje je nastavljeno sa privremenom konfiguracijom `/private/tmp/zev-docker-public/config.json` bez prijavnih podataka, uz isti Docker socket. Korisnička konfiguracija nije mijenjana. Ako se pri budućem `db:start` ponovi isti problem, koristi ovu privremenu konfiguraciju za javne slike ili riješi Docker helper; ne briši postojeće korisničke kredencijale. Privremeni folder nije dio repozitorijuma.

Komanda korišćena za pokretanje u ovoj sesiji (folder prethodno kreiran sa praznim `auths`):

```sh
DOCKER_CONFIG=/private/tmp/zev-docker-public DOCKER_HOST=unix:///Users/mladenblagovcanin/.docker/run/docker.sock corepack pnpm db:start
```

Socket putanja je lokalna za ovaj računar; na drugom koristiti sopstveni Docker context/socket. Kod kasnijeg rada sa privatnim slikama ne koristiti ovu javnu konfiguraciju.

## Rezultat provjere — 17. oktobar 2026.

Lokalni staging je pokrenut i ostavljen za rad. Docker servisi sa zdravstvenom provjerom su healthy; svi objavljeni portovi vezani su za `127.0.0.1`. PostgreSQL 17.11 je primijenio migraciju `20261017000100`; seed daje dva tenanta, dvije zgrade, tri jedinice i sedam početnih audit događaja. Podaci su opstali kroz `stop` sa backupom i ponovni `start` na lokalnoj mreži.

Ručne SQL provjere: devet aplikacionih tabela ima RLS; nema table grantova za `anon`/`authenticated`; oba klijentska pokušaja SELECT-a odbijena su sa permission denied. Pokušaj vezivanja jedinice na zgradu drugog tenanta odbijen je kompozitnim FK-om. Privremena izmjena tenanta kreirala je audit UPDATE događaj i poništena je rollbackom; baza je ostala na tri jedinice i sedam seed audit događaja. Očekivane greške ovih negativnih provjera nisu greške migracije. Nisu dodati testni fajlovi ili infrastruktura.

`db:lint` prolazi bez grešaka šeme; ponovljeni `db:migrate` ne primjenjuje ništa (migracije su ažurne). Frozen instalacija, postojeći web lint i typecheck prolaze; lint ima četiri postojeća non-null upozorenja u demo kodu. Build i vizuelna provjera nisu ponavljani jer UI i njegove runtime zavisnosti nisu mijenjani. Studio daje HTTP odgovor; ovo nije vizuelna provjera njegovog interfejsa.

Provjera dokazuje baznu strukturu, sintetički seed, audit i trenutno zatvoren pristup. Ne dokazuje produkcionu tenant/globalnu matricu dozvola, prijavu korisnika, posljednjeg administratora, prestanak delegacija ili periodnu privatnost — to zahtijeva narednu DEV-03 implementaciju i provjere. Stvarni korisnici, udaljeni resursi i poslovni bucket-i nisu kreirani.
