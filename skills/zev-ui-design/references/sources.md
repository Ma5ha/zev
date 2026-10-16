# Izvori i granice primjene

Datum pripreme: 16. oktobar 2026. Smjernice su autorska sinteza zvaničnih izvora pregledanih tokom istraživanja u ovom chatu. Nisu Appleov dokument, odobrenje proizvoda ili kopija njihovog UI kita. Za kasniju odluku koja zavisi od aktuelne verzije platforme ponovo provjeri relevantnu zvaničnu stranicu.

## Appleovi izvori

| Izvor | Za šta ga koristiti |
|---|---|
| [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) | Polazna tačka za platforme, obrasce i komponente |
| [Design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles/) | Svrha, kontrola, odgovornost, poznatost, prilagodljivost, jednostavnost, kvalitet detalja i zadovoljstvo |
| [Principles of great design — WWDC26](https://developer.apple.com/videos/play/wwdc2026/250/) | Razlika između vizuelnog minimalizma i jednostavnosti zadatka |
| [Layout](https://developer.apple.com/design/human-interface-guidelines/layout) | Hijerarhija, poravnanje, grupisanje i prilagodljivost |
| [Color](https://developer.apple.com/design/human-interface-guidelines/color) | Dosljedna semantika boje, različiti prikazi i značenje uz tekst/simbol |
| [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) | Uvećanje teksta, različiti načini interakcije, kontrast i dimenzije kontrola po platformi |
| [Materials](https://developer.apple.com/design/human-interface-guidelines/materials) | Ograničena upotreba Liquid Glass sloja za navigaciju i kontrole |
| [Motion](https://developer.apple.com/design/human-interface-guidelines/motion) | Svrha pokreta, kratka povratna informacija i kontrola korisnika |
| [Feedback](https://developer.apple.com/design/human-interface-guidelines/feedback) | Prikaz stanja i ishoda, primjeren važnosti događaja |
| [Writing](https://developer.apple.com/design/human-interface-guidelines/writing) | Jasni nazivi radnji, greške i prazna stanja |
| [Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars) i [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars) | Razlika glavnih destinacija i radnji nad sadržajem |
| [Meet Liquid Glass — WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/) | Kontekst savremenog vizuelnog jezika |
| [Apple Design Resources](https://developer.apple.com/design/resources/) | Referentni materijali za Apple platforme; provjeriti uslove konkretnih resursa prije korišćenja |

## Web pristupačnost

Za web koristi CSS mjere i W3C kriterijume; iOS pt vrijednosti nisu automatski CSS px pravila.

- [W3C: Contrast minimum](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum) — 4,5:1 za običan tekst i 3:1 za veliki tekst, uz definisane izuzetke.
- [W3C: G145](https://www.w3.org/WAI/WCAG22/Techniques/general/G145) — pragovi za veliki tekst i odnos CSS pt/px.
- [W3C: Non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) — primjenjivi zahtjevi za kontrole i značajnu grafiku.
- [W3C: Target size minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum) — 24 × 24 CSS px, pravila razmaka i izuzeci; lokalni cilj za dodir može biti veći.
- [W3C: Resize text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) i [Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) — povećanje teksta i uzak prikaz, uz definisane izuzetke.

Ove stranice služe provjeri konkretnih kriterijuma. Njihova djelimična primjena ne dokazuje ukupnu WCAG usklađenost.

## Šta je lokalna ZEV preporuka

Paleta, nazivi tokena, razmaci, zaobljenja, veličine naslova, trajanja prelaza, web cilj 44 CSS px i primjeri ekrana su projektni početni izbori. Ne predstavljati ih kao Appleove obavezne vrijednosti. Nisu instalirani fontovi, preuzeti Appleovi asseti, odabrana nova biblioteka komponenti ili uvedena nova platforma.

Finansijska pravila, ovlašćenja i karakter anketa dolaze iz projektnih planova, ne iz HIG-a. Ovaj skill ne daje novo pravno tumačenje. Potvrđene poslovne odluke i posljednje upute korisnika imaju prednost nad ilustrativnim primjerima.
