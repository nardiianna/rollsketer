# Checklist pre go-live — `<cliente>`

> Copia questo file all'inizio di ogni progetto cliente: `cp docs/checklist-template.md docs/checklist-<cliente>.md`
> Spunta ogni voce mentre viene implementata. Non si va live finché ogni voce P0 non è ✅.
>
> **Cliente:** `<compilare>`
> **Iniziato:** `YYYY-MM-DD`
> **Go-live target:** `YYYY-MM-DD`
> **Stato:** 🚧 Build / 🧪 UAT / ✅ Live / 🛟 Post-launch monitoring

---

## A. Fondamenti tecnici (P0)

- [ ] **A1.** Base theme scelto e loggato in decisions.md (Dawn / Horizon / fork)
- [ ] **A2.** README.md di progetto compilato (cliente, repo, dev store, live store, integrazioni, gotcha)
- [ ] **A3.** Niente file Sass / SCSS
- [ ] **A4.** Niente CSS/JS pre-minificati (eccetto librerie terze parti)
- [ ] **A5.** Niente jQuery / runtime framework
- [ ] **A6.** Niente `localStorage`/`sessionStorage` per stato carrello (solo Cart API Shopify)
- [ ] **A7.** Niente credenziali / API key hardcoded nel repo
- [ ] **A8.** Tutte le stringhe UI tramite locale (no hardcoded)
- [ ] **A9.** Tutti i colori tramite CSS variabili / setting (no literal hex in CSS)

---

## B. Template essenziali (P0)

- [ ] **B1.** `layout/theme.liquid` — `<html lang>`, `{{ content_for_header }}`, skip-to-content
- [ ] **B2.** `templates/index.json` — homepage configurata
- [ ] **B3.** `templates/product.json` — pagina prodotto block-based
- [ ] **B4.** `templates/collection.json` — con filtri faceted
- [ ] **B5.** `templates/cart.json` — drawer o page secondo brief
- [ ] **B6.** `templates/search.json` — risultati ricerca
- [ ] **B7.** `templates/page.json` + `page.contact.json` — pagine info + contatti
- [ ] **B8.** `templates/blog.json` + `templates/article.json`
- [ ] **B9.** `templates/404.json` — fallback con link utili
- [ ] **B10.** `templates/password.json` — se cliente in pre-launch
- [ ] **B11.** `templates/gift_card.liquid` — se cliente vende gift card
- [ ] **B12.** Customer templates (account, login, register, reset_password, addresses, order)
- [ ] **B13.** `config/settings_data.json` — riflette config finale go-live
- [ ] **B14.** `config/settings_schema.json` — adattato al brand cliente

---

## C. Architettura sezioni (P0)

- [ ] **C1.** Header come section group
- [ ] **C2.** Footer come section group
- [ ] **C3.** Custom Liquid section disponibile su template che supportano sezioni
- [ ] **C4.** Main product section block-based
- [ ] **C5.** `snippets/meta-tags.liquid` produce title + meta + canonical su ogni template

---

## D. Feature funzionali (P0/P1 secondo brief)

> Spunta solo quelle richieste dal brief. Le altre non sono necessarie.

- [ ] **D1.** Sale badge / `compare_at_price` mostrato quando applicabile
- [ ] **D2.** Variant images (cambio variante = cambio immagine)
- [ ] **D3.** Predictive search nell'header
- [ ] **D4.** Faceted search filtering su collection
- [ ] **D5.** Sort options su collection
- [ ] **D6.** Paginazione/lazy load su collection e search
- [ ] **D7.** Empty state collection (messaggio quando filtri restituiscono 0)
- [ ] **D8.** Cart drawer / page (secondo brief)
- [ ] **D9.** Free shipping progress bar (se brief lo richiede)
- [ ] **D10.** Cross-sell / upsell in cart (se brief)
- [ ] **D11.** Selettore lingua / paese (se multi-market)
- [ ] **D12.** Menu multi-livello (se brief)
- [ ] **D13.** Newsletter signup form
- [ ] **D14.** Pickup availability (se cliente ha negozi fisici)
- [ ] **D15.** Prodotti correlati su pagina prodotto
- [ ] **D16.** Banner installments (Klarna/Scalapay) se cliente li ha attivi
- [ ] **D17.** Quick view / quick add (se brief)
- [ ] **D18.** Wishlist (se brief — di norma plugin Shopify)
- [ ] **D19.** Reviews (se brief — di norma plugin Shopify)
- [ ] **D20.** Banner annuncio configurabile

---

## E. Integrazioni cliente (P0)

> Spunta dopo aver verificato funzionamento end-to-end sul dev store.

- [ ] **E1.** Poleepo / connector marketplace (se applicabile)
- [ ] **E2.** ERP cliente (se applicabile)
- [ ] **E3.** CRM / email marketing (Klaviyo, Mailchimp, ecc.)
- [ ] **E4.** Plugin reviews
- [ ] **E5.** Plugin wishlist
- [ ] **E6.** Payment alternativi (Klarna, Scalapay)
- [ ] **E7.** Apple Pay / Google Pay attivati
- [ ] **E8.** Tracking spedizione
- [ ] **E9.** Fatturazione elettronica B2B (se applicabile)
- [ ] **E10.** Multi-currency (se applicabile)
- [ ] **E11.** Search avanzato (se applicabile)
- [ ] **E12.** Live chat (se applicabile)
- [ ] **E13.** Analytics aggiuntivo (se applicabile)
- [ ] **E14.** Email transazionali testate (welcome, order confirmation, shipping, refund)

---

## F. Performance (P0)

Target Syfer: P ≥ 70, BP ≥ 90, SEO ≥ 90 su home / collection / product, desktop + mobile.

- [ ] **F1.** Home — desktop P: `__/100`
- [ ] **F2.** Home — mobile P: `__/100`
- [ ] **F3.** Collection — desktop P: `__/100`
- [ ] **F4.** Collection — mobile P: `__/100`
- [ ] **F5.** Product — desktop P: `__/100`
- [ ] **F6.** Product — mobile P: `__/100`
- [ ] **F7.** **Performance media ≥ 70**
- [ ] **F8.** LCP image: fetchpriority="high", NO lazy, dimensioni esplicite
- [ ] **F9.** CSS critico inline above-fold
- [ ] **F10.** JS in defer/module, mai render-blocking
- [ ] **F11.** Immagini sotto fold con loading="lazy"
- [ ] **F12.** Width/height espliciti su tutte le immagini
- [ ] **F13.** Font custom con font-display: swap, preload, subset Latin Extended

---

## G. Accessibilità (P0)

Target Syfer: A ≥ 90 + checks manuali.

- [ ] **G1.** Home A: `__/100`
- [ ] **G2.** Collection A: `__/100`
- [ ] **G3.** Product A: `__/100`
- [ ] **G4.** **Accessibility media ≥ 90**
- [ ] **G5.** Tastiera: tutto navigabile
- [ ] **G6.** Focus visibile su ogni elemento focusabile
- [ ] **G7.** Tap target ≥ 24×24 px CSS su mobile
- [ ] **G8.** Tutte le immagini hanno alt (decorative: alt="")
- [ ] **G9.** Tutti i form input hanno label associate
- [ ] **G10.** Contrasto body ≥ 4.5:1
- [ ] **G11.** Contrasto large text + UI ≥ 3:1
- [ ] **G12.** HTML valido (html-validate pulito)
- [ ] **G13.** Skip-to-content come primo focusabile

---

## H. Compatibilità browser (P1)

Test purchase flow completo (home → collection → product → add to cart → checkout completion):

- [ ] **H1.** Safari (ultime 2, Mac)
- [ ] **H2.** Chrome (ultima, Mac/PC)
- [ ] **H3.** Firefox (ultima, Mac/PC)
- [ ] **H4.** Edge (ultima, PC)
- [ ] **H5.** Mobile Safari (ultima, iOS)
- [ ] **H6.** Chrome Mobile (ultima, Android)
- [ ] **H7.** Browser in-app Instagram (iOS+Android) — solo se cliente fa social commerce

---

## I. SEO (P0)

- [ ] **I1.** Meta tag su ogni template (title, description, canonical)
- [ ] **I2.** Schema.org Product su pagine prodotto
- [ ] **I3.** Schema.org BreadcrumbList su collection/product
- [ ] **I4.** Schema.org Organization in layout
- [ ] **I5.** Open Graph + Twitter card
- [ ] **I6.** `<html lang>` corretto
- [ ] **I7.** Paginazione con rel="prev"/"next"
- [ ] **I8.** Sitemap.xml accessibile (Shopify lo genera)
- [ ] **I9.** robots.txt corretto (Shopify lo gestisce — verifica che non sia esposto se in pre-launch)

### Solo per redesign

- [ ] **I10.** Lista URL del vecchio sito (top 100 organico) esportata
- [ ] **I11.** Mapping URL old → new completato
- [ ] **I12.** Redirect 301 caricati su Shopify (Online Store → Navigation → URL redirects)
- [ ] **I13.** Sitemap submittata a Google Search Console
- [ ] **I14.** Sitemap submittata a Bing Webmaster
- [ ] **I15.** Verifica meta title/description preservati per top URL

---

## J. Migrazione contenuti (solo per redesign / migration)

- [ ] **J1.** Prodotti importati e verificati (count match)
- [ ] **J2.** Variants importate
- [ ] **J3.** Immagini prodotto importate
- [ ] **J4.** Metafield custom importati
- [ ] **J5.** Collection importate
- [ ] **J6.** Pagine importate
- [ ] **J7.** Articoli blog importati
- [ ] **J8.** Customer importati (con storico ordini se richiesto)
- [ ] **J9.** Recensioni importate (se plugin lo permette)
- [ ] **J10.** Email transazionali aggiornate (se cambio template)
- [ ] **J11.** Discount code attivi importati
- [ ] **J12.** Gift card attive importate

---

## K. Configurazione admin Shopify (P0)

- [ ] **K1.** Generale: nome shop, indirizzo, valuta, fuso orario
- [ ] **K2.** Pagamenti: gateway attivati e testati
- [ ] **K3.** Spedizioni: profili spedizione, zone, tariffe
- [ ] **K4.** Tasse: configurate per geografie target
- [ ] **K5.** Checkout: lingua, campi richiesti, abandoned cart, marketing consent
- [ ] **K6.** Notifications: email transazionali (sender, branding)
- [ ] **K7.** Domini: dominio principale collegato + SSL attivo
- [ ] **K8.** Markets: configurati se multi-market
- [ ] **K9.** Locations: locations attivate (se cliente ha magazzino + retail)
- [ ] **K10.** App: solo le app strettamente necessarie installate

---

## L. Pre-launch + UAT (P0)

- [ ] **L1.** Dev store popolato con contenuti reali (no Lorem Ipsum)
- [ ] **L2.** Demo cliente fatta
- [ ] **L3.** Lista feedback UAT consolidata
- [ ] **L4.** P0 di feedback risolti
- [ ] **L5.** P1 di feedback: risolti o esplicitamente rimandati a v1.1
- [ ] **L6.** Sign-off cliente ricevuto (anche solo via email — riferimento qui)
- [ ] **L7.** Test checkout reale completato (con ordine vero o test mode finale)
- [ ] **L8.** Backup live store attuale fatto (se redesign)
- [ ] **L9.** Window di go-live concordato (data + ora + durata stimata)
- [ ] **L10.** Persona Syfer di guardia per le 2 ore post-pubblicazione

---

## M. Training cliente (P0)

- [ ] **M1.** Loom walkthrough theme editor (15-30 min) registrato
- [ ] **M2.** PDF "Come modificare X" per le 5-7 cose più comuni
- [ ] **M3.** Sessione live di training programmata (1-2 ore)
- [ ] **M4.** Documento checklist post-go-live cliente (cosa monitorare nei primi 30 giorni)
- [ ] **M5.** Persone cliente identificate per training: marketing, ops, commerciale
- [ ] **M6.** Permessi admin assegnati corretti (chi può fare cosa)

---

## N. Post go-live (primi 30 giorni)

- [ ] **N1.** Monitoring quotidiano errori (primi 7 giorni)
- [ ] **N2.** Monitoring quotidiano analytics (primi 7 giorni)
- [ ] **N3.** Check-in cliente +24h dopo go-live
- [ ] **N4.** Check-in cliente +7 giorni
- [ ] **N5.** Check-in cliente +30 giorni
- [ ] **N6.** Hotfix list aggiornata e prioritizzata
- [ ] **N7.** Postmortem fatto se ci sono stati issue P0/P1
- [ ] **N8.** Lessons learned documentate per il prossimo progetto

---

## Riassunto stato

| Categoria | Stato |
|---|---|
| A. Fondamenti tecnici | ⬜ |
| B. Template essenziali | ⬜ |
| C. Architettura sezioni | ⬜ |
| D. Feature funzionali | ⬜ |
| E. Integrazioni cliente | ⬜ |
| F. Performance | ⬜ |
| G. Accessibilità | ⬜ |
| H. Compatibilità browser | ⬜ |
| I. SEO | ⬜ |
| J. Migrazione contenuti | ⬜ N/A se nuovo store |
| K. Configurazione admin | ⬜ |
| L. Pre-launch + UAT | ⬜ |
| M. Training cliente | ⬜ |
| N. Post go-live | 🛟 in monitoring |

**Sblocco go-live:** A-I + K-M devono essere ✅ (J solo se redesign). N è di monitoraggio post-launch.

---

## Note progetto

> Diario libero per cose che capitano lungo la strada. Decisioni minori, escalation cliente, bug rivisti.

| Data | Evento | Note |
|---|---|---|
| | | |
