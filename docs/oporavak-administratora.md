# Kontrolisani oporavak administratorskog pristupa

Datum: 17. oktobar 2026. (Europe/Belgrade). DEV-03-D: razrađena lokalna operativa. Prije stvarnog pilota treba imenovati odgovorne osobe, nezavisnog odobravaoca, sigurno skladište dokaza i tajni, potvrditi SMTP/HTTPS i uvježbati postupak na izdvojenom stagingu. Ovo ne tvrdi da je stvarni identitet provjeren ili udaljeni pristup odobren.

## Zajedničke kontrole

1. Otvoriti incident sa jedinstvenom oznakom, vremenom, ciljnim Auth UUID-jem i razlogom. Dokaze identiteta i ovlašćenja čuvati u ograničenoj operativnoj evidenciji; u audit baze samo referencu, bez dokumenata, lozinki ili tokena. Zahtjev sa novog emaila nije dovoljan dokaz.
2. Identitet potvrditi preko ranije nezavisno evidentiranog kanala i, gdje je potrebno, ličnom provjerom. Za ovlašćenje administratora ZEV-a provjeriti ovlašćenu osobu i odgovarajući akt ZEV-a. Za globalnog administratora provjeriti ovlašćenog vlasnika/operatora platforme. Druga odgovorna osoba provjerava dokaze i pisano odobrava privilegovani oporavak; izvršilac ne odobrava sam sebi.
3. Zabilježiti izvršioca, odobravaoca, cilj, prethodno i novo stanje, tačne korake i ishod. Koristiti zaseban operativni nalog/tajnu iz sigurnog skladišta; ne dijeliti servisni ključ sa korisnikom ili browserom. Lokalni fixture nalozi nisu stvarni administratori.
4. Prije promjene provjeriti ciljnu lokalnu instancu i napraviti/potvrditi raspoloživ oporavljiv backup. Ne resetovati bazu, ne brisati audit i ne mijenjati stare migracije.
5. Poslije promjene provjeriti prijavu, minimalna potrebna prava i opoziv starog pristupa, obavijestiti osobu preko potvrđenog kanala, zatvoriti incident uz nezavisni pregled. Obavještavanje je operativni korak; D nije slao poruke stvarnim osobama.

## Lozinka i gubitak emaila

Uz kontrolu postojećeg emaila koristi se standardni `/oporavak` → jednokratna veza → `/lozinka`. Bez te kontrole nema samouslužnog zaobilaženja. Tenant administrator ne mijenja globalni prijavni email.

Nakon kontrola iznad sistemski administrator i ovlašćeni tehnički izvršilac koriste Supabase Auth Admin `updateUserById` nad istim potvrđenim UUID-jem. Ne kreirati zamjenski nalog pa nekontrolisano kopirati članstva. Prije izmjene provjeriti stari i novi email i da novi nije zauzet; vlasništvo novog emaila dokazati zasebnom jednokratnom potvrdom/izazovom, bez izlaganja recovery linka operaterima ili logovima. Admin izmjena zaobilazi redovnu potvrdu, zato `email_confirm` nije dokaz sam po sebi.

Voditi incident kroz stanja: odobreno → Auth promjena → opoziv starih sesija → nova korisnička potvrda/prijava → završeno. Auth i SQL nisu jedna transakcija; ne prikazati djelimičan ishod kao završen. Ne postavljati poznatu zajedničku ili privremenu lozinku u dokumentaciju. Koristiti novu sigurnu lozinku kroz kontrolisani Auth tok, zatim opoziv starih sesija prema postupku ispod. Auth opoziv refresh sesija ne garantuje trenutno odbijanje ranije izdatog access JWT-a; za kompromitovan nalog dodatno opozvati relevantna DB članstva/globalne grantove i kartične grantove, uz prethodnu administratorsku zamjenu. D ne uvodi trajnu denylistu Auth identiteta; ne obećava trenutno ukidanje svih Auth tokena. Prije ponovnog davanja prava sačekati maksimalno trajanje starog access tokena i potvrditi opoziv refresh sesija. Do tada držati prava opozvana.

Ne koristiti raw SQL nad `auth.users` za email/lozinku; koristiti zvanični Auth Admin API i ponovo provjeriti stvarno stanje nakon greške. Evidencija reference incidenta povezuje Auth operaciju sa DB auditom; tajne se ne upisuju u `operation_reasons`.

## Prvi globalni administrator

Kontrolisani izvršilac kreira/potvrđuje Auth identitet kroz Admin API, provjeri UUID/profil i poziva postojeći servisni `bootstrap_system_admin(p_user,p_basis)` sa referencom odobrenog incidenta. Funkcija radi samo kada nikada nije bilo globalne dodjele. Ne birati prvog prijavljenog korisnika. Odmah dodati drugog nezavisnog administratora kroz `set_system_admin`, provjeriti oba pristupa, a privremenu operativnu tajnu ukloniti/rotirati prema politici skladišta. Zaseban oporavak ispod ne koristi ponovo bootstrap.

## Gubitak jednog ili svih globalnih administratora

Ako postoji dostupan globalni administrator, on nakon provjere identiteta dodaje zamjenu kroz postojeći RPC, provjerava prijavu i tek zatim opoziva izgubljeni/kompromitovani grant. Za posljednjeg tenant administratora globalni administrator prvo dodaje zamjensko članstvo i tenant rolu, pa opoziva staru dodjelu.

Ako nijedan globalni administrator nema pristup, stanje grantova ne dokazuje da li su osobe dostupne. Nema javnog rescue endpointa niti servisnog RPC-a koji bi vjerovao toj tvrdnji. Potreban je privilegovani DB operator sa odobrenjem druge odgovorne osobe i incidentom. Ako je izgubljen i DB/hosting pristup, nastavak zavisi od vlasnika infrastrukture i njegovog recovery procesa; ne zaobilaziti ga ili kreirati novu bazu sa izgubljenom istorijom.

Kontrolisani DB postupak (ručno, u transakciji, uz prethodnu provjeru cilja):

1. Kreirati/potvrditi novi Auth identitet zvaničnim Admin API-jem, van DB transakcije. Ne mijenjati grantove dok taj korak nije potvrđen. Izvršilac bilježi provjeren UUID i referencu incidenta.
2. `BEGIN`; pozvati `private.lock_authorization()` kao DB operator. Provjeriti `auth.users` i `profiles` za cilj i potvrđen email. Pozvati `private.require_basis` sa referencom incidenta, izvršiocem i odobravaocem. Ove privatne funkcije nisu dostupne aplikacionim rolama.
3. U `system_admin_grants` dodati novu aktivnu dodjelu sa `basis` incidenta i `granted_by` NULL (privilegovani oporavak nema Auth autora). Ne lažirati `auth.uid()`. Automatski audit bilježi DB aktera, prethodno/novo stanje i transakciju; razlog u `private.operation_reasons` povezuje operativne dokaze. Ako cilj već ima aktivan grant, ne duplirati ga.
4. U istoj transakciji opozvati isključivo prethodno odobrene izgubljene/kompromitovane grantove, sa provjerom da nova dodjela ostaje aktivna i bez automatskog isteka. Pozvati `private.check_last_admin()`; provjeriti audit i razlog. `COMMIT` samo nakon provjere; inače `ROLLBACK`. Sačuvati izvod bez tajni uz incident. Ne isključivati triggere/RLS niti mijenjati bootstrap uslov.
5. Globalno opozvati stare Auth refresh sesije prema postupku ispod i postupiti sa starim JWT-ovima kao iznad. Provjeriti novog administratora stvarnom prijavom i `my_permissions`. Dodati drugu potvrđenu globalnu zamjenu redovnim RPC-jem i potvrditi pristup prije zatvaranja incidenta. Pregledati ostale grantove, pozive i tragove mogućeg incidenta.

Ovaj postupak razrađuje recovery granicu povjerenja; nije samouslužni automatizam. Lokalna SQL proba se izvršava rollbackom, bez stvarne izmjene emaila ili ukidanja postojećih administratora. Stvarni postupak i ljudska provjera identiteta ostaju preduslov pilota.

## Tačan put opoziva sesija u lokalnoj verziji

Instalirani `auth.admin.signOut(jwt, 'global')` prima korisnički access JWT, ne UUID korisnika. Servisni ključ ne smije se proslijediti kao taj korisnički JWT. Kada postoji odgovarajući potvrđeni korisnički token, koristiti taj API i provjeriti ishod. Kod gubitka svih sesija ili kompromitovanog naloga izvršilac ne može pretpostaviti da ima taj token.

Za lokalni hitni slučaj bez tokena privilegovani DB operator nakon odobrenja incidenta, uz već opozvana DB ovlašćenja i prethodnu zamjenu administratora, radi posebnu transakciju: `BEGIN`, `private.require_basis` sa referencom incidenta; evidentira broj ciljanih sesija bez sadržaja tokena; `UPDATE auth.refresh_tokens SET revoked=true WHERE user_id=<provjeren UUID kao tekst>`; `DELETE FROM auth.sessions WHERE user_id=<provjeren UUID>`; provjeri nula sesija i nula neopozvanih refresh tokena za taj UUID; `COMMIT` samo nakon provjere. Lokalna šema ima FK `refresh_tokens.session_id → sessions.id ON DELETE CASCADE`; bez tog potvrđenog modela zaustaviti postupak. Audit incidenta bilježi cilj i broj opozvanih sesija, ne tajne. Ovo je verzijski osjetljiva izuzetna DB operativa, nije javni aplikacioni tok. Ne mijenja `auth.users`, email ili hash lozinke. Prije udaljene primjene potvrditi podržani postupak sa operatorom/Auth dobavljačem i zasebno ga uvježbati.

Lokalna rollback proba potvrđuje DB posljedice ovog postupka i vraćanje početnog broja sesija. Ne tvrdi da je stvarni HTTP refresh opozvan, jer rollback ne objavljuje promjenu drugim konekcijama. Stari access JWT ostaje vremenski ograničen rizik; DB prava ostaju opozvana do njegovog isteka.

Tehnički izvori: [Auth Admin izmjena korisnika](https://supabase.com/docs/reference/javascript/auth-admin-updateuserbyid), [sesije i ograničenja opoziva JWT-a](https://supabase.com/docs/guides/auth/sessions). Verzijski API potpis provjeriti u instaliranom SDK-u prije izvršavanja operativne radnje.
