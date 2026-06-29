# Client Brief — Tema Shopify per `<nome-cliente>`

> **Chi compila:** Chiara (con input da account/Raoul su parte commerciale e tecnica)
> **Quando:** dopo il kickoff cliente, prima dell'inizio sviluppo
> **Cosa produce:** input strutturato per Gate 1 (Intake) di Claude Code
>
> **Sign-off path:** Chiara compila §1–13, Raoul approva §14, cliente firma §15 (anche solo via email).

---

## 1. Metadati progetto

| Campo | Valore |
|---|---|
| Nome cliente | `<es. Della Fonte Calzature>` |
| Settore cliente | `<es. fashion / calzature donna>` |
| Sito attuale (se redesign) | `<URL o "nuovo store">` |
| Tipo progetto | `Nuovo store` / `Redesign su store esistente` / `Migrazione da altra piattaforma` |
| Piattaforma di partenza (se migrazione) | `<es. Magento, WooCommerce, Prestashop>` |
| Data target go-live | `YYYY-MM-DD` |
| Data scadenza vincolante? | Y / N — `<motivo se sì, es. "lancio campagna ADV", "fine contratto vecchio host">` |
| Tempo build stimato | `<N settimane>` |
| Account manager Syfer | `<es. Giulio>` |
| Lead dev | `<Raoul / Niko>` |
| Designer Syfer | `<Chiara>` |
| Compilato il | `YYYY-MM-DD` |
| Versione brief | `v1` |

---

## 2. Lato commerciale

| Campo | Valore |
|---|---|
| Budget approvato | `<€>` |
| Pacchetto Syfer | `<es. setup + retainer 10h/mese>` |
| Retainer post-go-live | Y / N — `<ore/mese, durata>` |
| Scope esplicitamente fuori | `<es. campagne ADV, gestione magazzino — non Syfer>` |
| Penali / SLA | `<es. nessuna / go-live + 7gg massimo / SLA uptime>` |
| Riferimento contratto | `<numero / link al PDF in Drive>` |

---

## 3. Profilo cliente e business

| Campo | Valore |
|---|---|
| Industria specifica | `<es. calzature donna premium>` |
| Dimensione catalogo | `<N SKU>` |
| Dimensione team operativo cliente | `<N persone marketing, ops, commerciale>` |
| Volume ordini medio | `<N ordini/mese>` |
| AOV medio | `<€>` |
| Geografie attuali | `<es. solo IT>` |
| Geografie nuove (target) | `<es. EU>` |
| Canali di vendita | `<solo online / online + retail / online + B2B / multicanale Amazon-eBay-Poleepo>` |
| Stagionalità | `<es. picco SS marzo-giugno, FW settembre-dicembre>` |
| Eventi traffico critici | `<es. Black Friday, Saldi, drop limited edition>` |

---

## 4. Sito attuale (solo se redesign)

| Campo | Valore |
|---|---|
| URL | `<...>` |
| Tema attuale | `<es. Dawn 12.0 / Prestige / fork custom>` |
| Cosa funziona e va preservato | `<bullet list>` |
| Cosa NON funziona | `<bullet list>` |
| Performance Lighthouse attuale | `<P=__ A=__ BP=__ SEO=__>` |
| URL pattern attuali | `<es. /products/{handle}, /collections/{handle}>` |
| Posizionamento SEO da preservare | `<top keyword + URL chiave>` |
| Volume traffico organico mensile | `<N visite>` |
| Pagine top organico (top 20) | `<lista in Sheet linkato qui>` |
| Numero redirect 301 attesi | `<N stimato>` |

---

## 5. Sorgenti design

| Sorgente | Link / path | Note |
|---|---|---|
| Figma Make | `<URL>` | `<note>` |
| Claude Design | `<URL>` | `<note>` |
| Brand book cliente | `<path>` | |
| Logo cliente (vettoriale) | `<path>` | |
| Photoshoot cliente | `<path o "non ancora fatto">` | |
| Riferimenti che il cliente ama | `<URL siti / temi>` | |
| Riferimenti che il cliente NON vuole | `<URL>` | |

---

## 6. Direzione visiva

### 6.1 Mood e tono

`<3-5 keyword del brand cliente, es. "premium, elegante, minimal, contemporaneo">`

### 6.2 Palette colore

| Schema | Background | Text | Heading | Accent | Border | Use case |
|---|---|---|---|---|---|---|
| Primary | `#______` | `#______` | `#______` | `#______` | `#______` | default |
| Inverse | `#______` | `#______` | `#______` | `#______` | `#______` | hero / footer |
| Accent 1 | `#______` | `#______` | `#______` | `#______` | `#______` | promo |
| Accent 2 | `#______` | `#______` | `#______` | `#______` | `#______` | editoriale |

Verifiche obbligatorie:
- [ ] Contrasto body ≥ 4.5:1
- [ ] Contrasto headline grande ≥ 3:1
- [ ] Contrasto button ≥ 3:1

### 6.3 Tipografia

| Ruolo | Font | Licenza | Self-hosted? |
|---|---|---|---|
| Heading | `<font>` | `<licenza cliente / Google Fonts / Adobe>` | Y / N |
| Body | `<font>` | `<...>` | Y / N |
| Accent | `<font o N/A>` | `<...>` | Y / N |

> Se font custom: chiedere prova licenza al cliente PRIMA di lockare. Self-hosted preferito per GDPR e performance.

### 6.4 Spaziature, raggi, ombre

| Token | Valore |
|---|---|
| `space-1` → `space-8` | `4, 8, 12, 16, 24, 32, 48, 64` (default Syfer, modificare se serve) |
| `radius-sm/md/lg/full` | `<es. 4, 8, 16, 9999>` |
| `shadow-sm/md/lg` | `<valori>` |

---

## 7. Inventario sezioni homepage

| Ordine | Sezione | Scopo | Block | Note |
|---|---|---|---|---|
| 1 | `<es. announcement-bar>` | `<spedizione gratis sopra X€>` | `<text, link>` | dismissible |
| 2 | `<es. header>` | `<nav, search, cart>` | | sticky |
| 3 | `<es. hero>` | `<brand statement>` | `<heading, button, image/video>` | |
| 4 | ... | | | |

---

## 8. Pagina prodotto

| Campo | Valore |
|---|---|
| Layout (desktop) | `<gallery left / right / above>` |
| Tipo gallery | `<thumbnail laterali / carousel / griglia>` |
| Layout (mobile) | `<gallery above / carousel>` |
| Sticky info column? | Y / N |
| Sticky add-to-cart bar mobile? | Y / N |
| Quick view? | Y / N |
| Quick add da collection? | Y / N |
| Block ordine | `<lista, top→bottom>` |

### Feature speciali per industria

- [ ] Guida taglie (per fashion)
- [ ] Swatch colore con immagine fallback
- [ ] Lista ingredienti (per food/beauty)
- [ ] Banner installments (Klarna/Scalapay)
- [ ] Reviews (quale plugin?)
- [ ] Wishlist (quale plugin? — o feature nativa?)
- [ ] Comparatore prodotti
- [ ] Configuratore (per prodotti su misura)
- [ ] Banner spedizione/resi
- [ ] Pickup availability se cliente ha negozi fisici
- [ ] B2B prezzo nascosto se non logged in

---

## 9. Altri template chiave

### 9.1 Collection

- Colonne griglia desktop: `2 / 3 / 4`
- Colonne griglia mobile: `1 / 2`
- Filtri: `<sidebar / drawer / pill orizzontali>`
- Comportamento filtri: `<reload / Section Rendering API>`
- Sort: `<lista opzioni>`
- Paginazione: `<numerata / infinita / load more>`

### 9.2 Cart

- Tipo: `Drawer` / `Page`
- Add-to-cart UX: `<drawer slide / toast + drawer / page>`
- Cross-sell? Y / N
- Free shipping progress bar? Y / N
- Codice sconto in cart? Y / N (oppure solo in checkout)
- Note carrello? Y / N

### 9.3 Search

- Trigger predictive: `<focus / 2 chars / 3 chars>`
- Contenuto predictive: `<solo prodotti / + collection / + articoli>`
- Layout pagina risultati: `<griglia / lista mixed>`

### 9.4 Blog/article

- Layout lista blog: `<griglia / lista / featured + griglia>`
- Layout articolo: `<full-width / contained>`
- Bio autore? Y / N
- Articoli correlati? Y / N

---

## 10. Integrazioni cliente

> Per ognuna che si applica: nome plugin/servizio, chi setta (Syfer / cliente / fornitore terzo), prerequisiti.

| Tipo | Servizio | Status | Owner setup | Note |
|---|---|---|---|---|
| Marketplace connector | `<es. Poleepo>` | `<già attivo / da attivare>` | `<Syfer / cliente>` | |
| ERP | `<es. Mago>` | | | |
| CRM / email | `<es. Klaviyo>` | | | |
| Reviews | `<es. Yotpo>` | | | |
| Wishlist | `<es. Wishlist Plus>` | | | |
| Payment alternativi | `<Klarna / Scalapay / ApplePay>` | | | |
| Spedizioni tracking | `<BRT / GLS / SDA>` | | | |
| Fatturazione elettronica | `<plugin XYZ>` | | | |
| Multi-currency | `<Shopify Markets>` | | | |
| Search avanzato | `<es. Searchanise / Algolia>` | | | |
| Live chat | `<es. Tidio / Intercom>` | | | |
| Analytics aggiuntivo | `<oltre Shopify Analytics>` | | | |

---

## 11. Localizzazione

| Campo | Valore |
|---|---|
| Lingue al go-live | `<es. it>` |
| Lingue post-go-live | `<es. en in v1.1>` |
| Valute | `<es. EUR>` |
| Multi-market? | Y / N |
| RTL necessario? | Y / N |

---

## 12. Migrazione contenuti (solo se redesign)

| Cosa | Da migrare? | Volume | Note |
|---|---|---|---|
| Prodotti | Y / N | `<N>` | tutti i campi compresi metafield custom? |
| Collection | Y / N | `<N>` | manuali o automatiche? |
| Blog/articoli | Y / N | `<N>` | |
| Pagine | Y / N | `<N>` | |
| Clienti | Y / N | `<N>` | con storico acquisti? |
| Recensioni | Y / N | `<N>` | dipende dal plugin |
| URL pattern | Da preservare | | quali da redirect 301? |
| Robots/sitemap | Da preservare | | |

---

## 13. Domande aperte

> Cose ancora da chiarire al cliente o internamente.

- `<...>`
- `<...>`

---

## 14. Approvazione interna Syfer

- [ ] Brief completo
- [ ] Stima ore realistica vs deadline
- [ ] Integrazioni mappate, owner setup chiari
- [ ] Direzione visiva approvata da account manager
- [ ] Eventuali rischi tecnici noti documentati

**Approva:** `<Raoul>`
**Data:** `YYYY-MM-DD`
**Stato:** ⛔ Bloccato / 🟡 Condizionale / 🟢 Approvato
**Condizioni:** `<...>`

---

## 15. Sign-off cliente

> Anche solo via email è ok, l'importante è scritta che dia copertura su scope concordato.

- [ ] Cliente ha visto direzione visiva
- [ ] Cliente ha confermato deadline
- [ ] Cliente ha fornito asset di brand
- [ ] Cliente ha confermato chi farà UAT

**Cliente:** `<nome referente>`
**Data:** `YYYY-MM-DD`
**Modalità conferma:** `Email / WhatsApp / Firma contratto`
**Riferimento conferma:** `<thread / messaggio / contratto>`
