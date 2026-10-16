# Evidencija napretka — ZEV

Posljednje ažuriranje: 16. oktobar 2026. (Europe/Belgrade).

## Trenutno stanje

Projekat je u fazi planiranja i dokumentacije. Izrada aplikacije je pauzirana na zahtjev korisnika. Minimalni plan cilja pilot jedne zgrade; konačna tehnička odluka još nije donesena.

## Koraci

| ID | Korak | Status | Rezultat / napomena |
|---|---|---|---|
| ZEV-001 | Inicijalizovati Git repozitorijum | ZAVRŠENO | Repozitorijum postoji u glavnom folderu projekta. |
| ZEV-002 | Istražiti pravila i potrebe ZEV-a u RS | ZAVRŠENO | [Istraživanje](istrazivanje-zev-rs.md) i tekstovi propisa u `izvori/`; otvorene pravne provjere navedene su u istraživanju. |
| ZEV-003 | Definisati minimalni plan za pilot jedne zgrade | ZAVRŠENO | [Minimalni plan](minimalni-plan.md) sa ulogama, funkcionalnostima i poslovnim modelom. |
| ZEV-004 | Izraditi aplikaciju | PAUZIRANO | Početni projekat postavljen je u `aplikacija/`; korisnik je zaustavio izradu. Funkcionalna aplikacija nije završena niti objavljena. |
| ZEV-005 | Ukloniti ranije započetu lokalnu aplikaciju | BLOKIRANO | Korisnik je zatražio uklanjanje. Poziv za brisanje foldera `aplikacija/` odbijen je u potvrdi alata; folder je nakon toga potvrđeno ostao. Ne ponavljati odbijenu radnju bez nove autorizacije. |
| ZEV-006 | Ukloniti privatni, neobjavljeni Sites projekat | BLOKIRANO | Projekat „Komšijski — ZEV pilot“, ID `appgprj_6ad27d479cc08191a87f5a3fb1cae8e7`, ranije je kreiran. Dostupni Sites alati nisu nudili brisanje; udaljeni projekat nije uklonjen. |
| ZEV-007 | Uvesti glavne upute i evidenciju napretka | ZAVRŠENO | Kreirani `../AGENTS.md` i ovaj dokument; provjereno postojanje fajlova i sadržaj uputa. |
| ZEV-008 | Napraviti početni commit dokumentacije | ZAVRŠENO | Kreiran početni commit za `AGENTS.md` i `docs/`; identifikator je dostupan u Git istoriji. |

## Sljedeći koraci

- Sačekati korisnikovu instrukciju za dalju razradu plana ili nastavak razvoja.
- Prije razvoja dogovoriti konačni obim prve verzije i tehnički pristup.
- Ako korisnik ponovo odobri uklanjanje početnog projekta, riješiti preostale stavke ZEV-005 i ZEV-006 i zabilježiti stvarni ishod svake radnje.

## Istorija rada

### 16. oktobar 2026. — Početni pregled stanja

- Git repozitorijum inicijalizovan je na grani `master`.
- Istraživanje je sačuvano u `docs/istrazivanje-zev-rs.md`; lokalni izvodi zvaničnih tekstova nalaze se u `docs/izvori/`.
- Za pilot je izabrana jedna zgrada.
- Izrada je započeta postavljanjem početnog projekta i kreiranjem privatnog Sites projekta, a zatim zaustavljena na korisnikov zahtjev. Instalacioni proces završen je kodom 130.
- Plan je sačuvan u `docs/minimalni-plan.md`.
- Pokušaj brisanja lokalnog foldera odbijen je; udaljeni projekat nije obrisan jer dostupni alati nisu nudili tu operaciju.

### 16. oktobar 2026. — Upute za praćenje rada

- Zahtjev: napraviti glavni Markdown fajl koji obavezuje agente da prate i zapisuju završene korake.
- Urađeno: kreiran `AGENTS.md` sa obaveznim čitanjem plana i evidencije, statusima koraka i pravilima ažuriranja tokom rada i prije završetka zadatka.
- Urađeno: kreiran `docs/napredak.md` sa početnim stanjem, završenim koracima i preostalim preprekama.
- Provjera: pregledani plan i Git status prije izmjena; nakon upisa provjereni novi fajlovi i njihove reference. Nisu pokretani testovi aplikacije jer ovaj zadatak mijenja samo dokumentaciju.
- Sljedeće: čekati korisnikovu instrukciju; razvoj ostaje pauziran.

### 16. oktobar 2026. — Početni commit dokumentacije

- Zahtjev: komitovati trenutni rad.
- Obuhvat: glavne upute agentima, minimalni plan, istraživanje, izvodi propisa i evidencija napretka.
- Provjera prije commita: pregledani Git status, spisak dokumentacije i upute; repozitorijum još nema commitova.
- Razvoj aplikacije nije nastavljen; kod aplikacije nije dio ovog commita.
- Rezultat: početni commit uspješno kreiran; ovaj zapis o završenom koraku uključen je dopunom istog commita.
- Provjera: Markdown fajlovi prolaze `git diff --cached --check`; izvorni TXT prepisi sadrže razmake iz konverzije zvaničnih dokumenata, koji su namjerno sačuvani.
