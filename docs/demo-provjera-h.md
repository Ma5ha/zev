# Provjera povezanog demoa — DEV-02-H

Datum: 17. oktobar 2026. (Europe/Belgrade). Status: ZAVRŠENO u obimu ispod. DEV-02 kao cjelina ostaje U TOKU, a korisnikov pregled DEV-02-I je PLANIRANO.

Provjera je obavljena na lokalnom produkcionom Next.js buildu, u ugrađenom browseru, sa sintetičkim podacima. Korišćeni su pregled koda, ručne UI radnje, screenshotovi, očitavanje DOM širine/fokusa i izračun kontrasta. Nisu dodani testovi, testni alati ili zavisnosti. Raniji dokazi E–G ostaju u [evidenciji](napredak.md); H ne predstavlja svaku njihovu provjeru kao ponovljenu.

## Scenariji i ishod

| Scenario | Provjera u H i rezultat |
|---|---|
| SC-01 | Landing → demo, svih pet cjelina i detalji kroz veze. Početni Javor/Vlasnik, stalna demo napomena, aktivna navigacija. Pregled povezuje finansije, karticu, radove, posljednji trošak, objave i prijave. |
| SC-02 | Vlasnik vidi samo A; direktna ruta B daje nedostupan prikaz bez sadržaja. Korisnik prostora nema karticu ni operaterske forme. Zajednički detalj uplate B skriva privatnu napomenu i jedinicu. Pregled koda `publicEntry`/selektora potvrđuje uklanjanje privatnog priloga prije zajedničkog renderovanja; nije nova potpuna provjera svih tipova priloga. |
| SC-03 | Unosi Javora ostaju uz Javor, Lipa ostaje 500 KM/C i prazni moduli. Promjena konteksta vraća pregled. Nacrt + promjena ZEV-a otvara potvrdu; Escape čuva tekst. |
| SC-04/05 | Trošak 120, obračun oktobra 60, uplate A 40/B 25 daju 945 KM, dug A 10 i avans B 5. Trošak je u H unesen prije obračuna, što je dokumentovana varijacija redoslijeda. Zasebno ponovljen obračun istog mjeseca daje 0 novih zaduženja, A 50/B 20 i sredstva 1.000. Datum osnove ostaje 1. oktobar. |
| SC-06/07 | Rad sa ponudama 1.050/1.150, izabrani Servis B, ugovoreno 1.150. Promjena na U toku i povezani trošak 600: na radu plaćeno 600, u finansijama sredstva 400. Veza stavka → rad vraća isti zapis, bez druge isplate. |
| SC-08 | Nova objava se pojavljuje na tabli i pregledu. Početne i nove objave imaju otvaranje sadržaja kroz native details. Skrivanje operaterske forme i tenant granica dodatno pregledani u kodu i kroz promjene konteksta; cijeli tok nove objave kroz sve profile nije ponavljan poslije svake CSS dorade. |
| SC-09 | Vlasnička prijava sa lokalnim sintetičkim PNG-om ima pregled i čuvanje. Drugo članstvo je ne vidi; operater je vidi i mijenja na U obradi. Nema udaljenog uploada. Validacija JPEG/PNG/WebP i 5 MB, uklanjanje i nečitljiv fajl pregledani u kodu i oslonjeni na raniju G provjeru; H nije ponovio svaku veličinu/format. |
| SC-10 | Odgovor vlasnika pa izmjena sa prve na drugu opciju; operatersko zatvaranje daje ukupno 1, raspored 0/1, bez nove forme odgovora. Vremensko zatvaranje i validacija novog roka pregledani u kodu; nije čekan sedmodnevni rok. Kreiranje nove ankete i duple opcije imaju raniji G dokaz. |
| SC-11 | Prazna finansijska forma daje povezane greške i fokusiran sažetak. Prazan naslov i opis daju fokusiranu, programski povezanu community grešku uz očuvan nacrt. Negativni iznosi, nedozvoljena fotografija i svi rubni parser ulazi nisu ponovo ručno iscrpljeni u H; raniji E/G rezultati i pregled čistih validatora ostaju osnova. |
| SC-12 | Lipa: prazan pregled radova/objava i anketa/prijava; Javor: filter Režije bez stavki nudi poništavanje. Razlikuju se odsustvo sadržaja, rezultat filtera i nedostupan pristup. |
| SC-13 | Potvrda reseta vraća Javor/Vlasnik i početne podatke. Osvježavanje poslije više promjena vraća početnu sesiju bez prijave/fotografije/odgovora; potvrđen i normalan font poslije privremene provjere. Skladište i mrežni upload nisu uvedeni. |
| SC-14 | Meni i veza aktivirani Enterom, Escape vraća fokus na Meni. Native dijalozi ograničavaju fokus; Escape čuva nacrt, reset prihvata Enter. Finansijska i community validacija vode fokus na grešku. Vidljiv focus outline potvrđen screenshotom i CSS-om. Ovo je ručna provjera ključnih radnji, ne iscrpan prolaz svake kontrole čitačem ekrana. |

## Ispravke

- Landing je najavljivao radove i community unose kao buduće, iako postoje; tekst sada opisuje dostupan demo.
- Finansijski filteri pri 320 px i osnovnom fontu 32 px širili su dokument na 433 px. Eksplicitna jedna grid kolona sa minimalnom širinom 0 prije širih breakpointa uklanja preliv; isti rasporedi primijenjeni u povezanim prikazima.
- Dugi tekst/kontrole imaju prelamanje i ograničenje širine; mobilna zaglavlja mogu prebaciti kontrolu u novi red.
- Potvrde odbacivanja/resetovanja imaju maksimalnu visinu i unutrašnji vertikalni skrol.
- Community validator daje polje i poruku kroz čistu funkciju; forma povezuje poruku sa poljem i fokusira sažetak. Kad poruke nema, ne ostaje referenca na nepostojeći element.
- Community forme dobijaju ključ tenant/profil da lokalna greška i stanje čitanja fotografije ne ostaju iz prethodnog konteksta. Postojeća zaštita asinhronog čitanja ostaje.
- Dugmad ankete na telefonu mogu preći u novi red bez dodatne bočne margine.

## Prikaz, kontrast i tehnička provjera

Provjereni su reprezentativni prikazi na 320, 360, 768 i 1280 CSS px, uz screenshot i DOM širinu. Na 320 px sa osnovnim fontom 32 px ponovo su pregledani landing, pregled, finansije/filteri, detalj rada, tabla, ankete/prijave i operaterski finansijski obrazac: širina dokumenta ostaje 320 px. Dijalog pri povećanom tekstu skroluje vertikalno do radnji. Posljednja mala dorada prelamanja zaglavlja provjerena je u normalnom završnom buildu, ne novim kompletnim ciklusom 200%.

Ugrađeni browser nije reagovao na zoom prečicu. Zato je 200% provjeren privremenim lokalnim pravilom `html { font-size: 200%; }` (očitano 32 px). Pravilo je uklonjeno i završni browser očitava 16 px. Ovo je stroža provjera rem rasporeda, ali nije provjera svih browser text-only/page zoom implementacija. Native select može prikaz skratiti prema browseru; nazivi su dostupni u otvorenom izboru. Pri izrazito uskom prikazu i povećanom tekstu pojedine riječi se prelamaju.

Kontrast stvarnih CSS tokena izračunat je formulom relativne luminanse: ink 16,22/15,00; muted 6,42/5,94; accent/focus 5,99/5,54; danger 6,57/6,08; success 5,69/5,26; warning 6,79/6,28 (surface/canvas). Bijelo na accent 5,99, hover 8,17. Granica control 3,94/3,65. Dekorativni line nije korišćen kao jedina granica inputa. Native browser radio/date/select detalji nisu zasebno sertifikovani.

Node 22.22.1 iz `.nvmrc`, Corepack pnpm: konačni `lint`, `typecheck` i `build` prolaze, bez keša za konačne kodne dorade. Nx socket EPERM u sandboxu riješen odobrenim izvršavanjem postojećih komandi izvan sandboxa. `git diff --check` prolazi. Završni screenshot je `/tmp/zev-dev02h.png` (privremeni lokalni dokaz, nije repo asset).

## Granice i naredni korak

Nema baze, Supabase-a, stvarnih naloga, udaljenog uploada ili objavljivanja. Tenant/role simulacija nad sintetičkim podacima nije produkciona zaštita. Nisu izvršeni screen-reader audit, fizički mobilni uređaji, više browser engine-a, potpuna WCAG sertifikacija, stvarni offline/mrežni kvarovi ili sva moguća kombinovanja polja i fajlova. H potvrđuje povezani demo u navedenom obimu, ne produkcionu spremnost.

Naredni korak je korisnikov pregled DEV-02-I na novu instrukciju. Backend i objavljivanje nisu odobreni. Sve postojeće Git izmjene su očuvane; H izmjene nisu komitovane.
