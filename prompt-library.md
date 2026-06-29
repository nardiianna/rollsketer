# Libreria prompt — Tema Shopify custom cliente

Prompt copia-incolla per Claude Code. Presuppongono `CLAUDE.md` nella root del repo.

**Come si usa:** trova il prompt del Gate corrente, sostituisci i `<placeholder>`, incolla in Claude Code, premi invio. Ogni prompt termina con stop forzato — Claude Code attende approvazione esplicita prima di procedere.

---

## Indice

1. [Gate 1 — Intake e scelta tecnologica](#gate-1--intake-e-scelta-tecnologica)
2. [Gate 2 — Piano architetturale](#gate-2--piano-architetturale)
3. [Gate 3 — Token e design system](#gate-3--token-e-design-system)
4. [Gate 4 — Scaffolding base](#gate-4--scaffolding-base)
5. [Gate 5 — Build sezione](#gate-5--build-sezione)
6. [Gate 5b — Refactor sezione](#gate-5b--refactor-sezione)
7. [Gate 6 — Integrazioni cliente](#gate-6--integrazioni-cliente)
8. [Gate 7 — Audit performance + a11y](#gate-7--audit-performance--a11y)
9. [Gate 8 — Migrazione contenuti](#gate-8--migrazione-contenuti)
10. [Gate 9 — Preparazione UAT](#gate-9--preparazione-uat)
11. [Gate 10 — Go-live](#gate-10--go-live)
12. [Recovery — Errori Theme Check](#recovery--errori-theme-check)
13. [Recovery — Fallimenti Lighthouse](#recovery--fallimenti-lighthouse)
14. [Recovery — Bug post go-live](#recovery--bug-post-go-live)

---

## Gate 1 — Intake e scelta tecnologica

```
Leggi CLAUDE.md. Stiamo iniziando un nuovo tema cliente.

Input:
- Cliente: <nome>
- Tipo progetto: <new_store | redesign | migration_from_other_platform>
- Brief: docs/brief-<cliente>.md
- Sito attuale (se redesign): <URL>
- Piattaforma di partenza (se migration): <es. Magento, Woo, Prestashop>
- Deadline go-live: <YYYY-MM-DD>
- Budget ore stimato: <N>

Task:
1. Leggi tutto il brief.
2. Decidi base theme. Default: Dawn versione corrente.
   Considera Horizon SOLO se il cliente ha bisogno di flessibilità content modeling estrema.
   Considera fork del tema esistente SOLO se è un redesign incrementale dove preserviamo molta logica.
   Logga la decisione (con razionale) in `docs/decisions.md`.
3. Identifica le integrazioni cliente dal brief (§10) e per ognuna: prerequisiti, plugin/app store o codice custom, owner setup.
4. Identifica i rischi del progetto:
   - Deadline aggressiva?
   - Integrazioni con API cliente non documentate?
   - Migrazione contenuti grossa?
   - Vincoli SEO da preservare?
5. Scrivi `docs/intake-<cliente>.md` con:
   - Riassunto del brief
   - Scelta base theme + razionale
   - Lista integrazioni con priorità
   - Risk register
   - Domande aperte per Raoul/cliente

Stop. Non iniziare l'architettura.
```

---

## Gate 2 — Piano architetturale

```
Leggi CLAUDE.md, docs/intake-<cliente>.md, docs/brief-<cliente>.md. Apri Gate 2.

Task:
1. Mappa ogni schermata/sezione del design ai template Shopify (CLAUDE.md §4).
2. Per ogni sezione homepage: nome file, block type, eventuale JS necessario, eventuale dipendenza da app cliente.
3. Decompose la pagina prodotto in section/block. Lista esplicita dell'ordine block.
4. Pianifica section group header (announcement bar, header, mega-menu se serve).
5. Pianifica section group footer.
6. Decidi cosa deriviamo direttamente da Dawn (o base scelta) senza modifiche e cosa rifacciamo da zero.
7. Decidi quali feature richiedono codice custom vs plugin Shopify Store vs configurazione.

Output `docs/arch-<cliente>.md` con:
- Mappa schermata→template
- Albero section/block (markdown indentato)
- Sezioni "as-is da Dawn" vs "custom Syfer"
- Lista app/plugin Shopify Store da installare
- Domande aperte

Aggiungi entry decisione in `docs/decisions.md` per l'angolo architetturale chiave (es. "cart drawer vs cart page", "filter sidebar vs drawer").

Stop. Non iniziare scaffolding.
```

---

## Gate 3 — Token e design system

```
Leggi CLAUDE.md, docs/intake-<cliente>.md, docs/arch-<cliente>.md, docs/brief-<cliente>.md (specialmente §6).

Task:
1. Estrai dal brief:
   - Schemi colore (minimo 2, target 4 per flessibilità marketing). Verifica contrasto.
   - Tipografia. Se font custom: verifica che la prova licenza sia in `assets/fonts/LICENSE.md` o linkata nel brief. Setup self-hosted con `font-display: swap`.
   - Scala spaziature, raggi, ombre.

2. Scrivi/aggiorna il blocco token in `assets/theme.css` a `:root`:
   - Variabili colore guidate da Liquid dai setting
   - Altri token come variabili statiche

3. Adatta `config/settings_schema.json` partendo dal default Dawn:
   - Block `theme_info` con autore "Syfer"
   - Schemi colore (minimo 2, default 4)
   - Tipografia (font_picker se font Shopify-library, oppure setting custom_font con upload se cliente ha licenza)
   - Layout, pulsanti, card, animazioni

4. Aggiorna locale: italiano default se cliente italiano (`locales/it.json`), eventuale `en.json` se richiesto.

Output:
- `assets/theme.css` (blocco token aggiornato)
- `config/settings_schema.json` (adattato)
- `locales/it.json` o `<lingua>.json` con label tradotte

Stop. Esegui `shopify theme check`. Non scaffoldare i template ancora.
```

---

## Gate 4 — Scaffolding base

```
Leggi CLAUDE.md.

Task:
1. Inizializza il tema dalla base scelta:
   - Dawn: `shopify theme init --clone-url=https://github.com/Shopify/dawn`
   - Horizon: `shopify theme init --clone-url=https://github.com/Shopify/horizon`
   - Fork esistente: clona dal repo cliente o esporta tema corrente
2. Verifica che il tema base si installi e renderizzi sul dev store cliente.
3. Adatta `layout/theme.liquid`:
   - `<html lang="{{ request.locale.iso_code }}">`
   - Tag preconnect/preload se font custom
   - Skip-to-content link
4. Mantieni i template Dawn esistenti per ora — li adatteremo al Gate 5 sezione per sezione.
5. Crea `docs/README.md` (1 pagina, vedi CLAUDE.md §17): cliente, repo, dev store, live store, base theme, lingue, integrazioni, credenziali, deploy, gotcha, contatti.

Output:
- Tema scaffolded sul dev store cliente
- `docs/README.md` compilato
- Theme Check pulito

Stop. Presenta dev store URL e attendi approvazione visiva da Chiara prima di iniziare il Gate 5.
```

---

## Gate 5 — Build sezione

Una sezione per turno.

```
Leggi CLAUDE.md.

Costruisci/adatta la sezione `<section-id>.liquid`.

Input:
- Sorgente: <screenshot Figma | URL Claude Design | nodo>
- Template target: <es. index.json, page.json>
- Block type: <es. heading, button, image, custom_liquid>
- Comportamento JS: <none | carousel | accordion | filter | quick-add>
- Gruppo locale: <es. sections.image_banner>
- Base: <stiamo modificando una sezione Dawn esistente / creando da zero / forking di sezione esistente>

Vincoli:
- CLAUDE.md §6 per standard codice
- Schema con name (sentence case), settings raggruppati, presets ≥ 1 con copy realistico cliente
- Stringhe via `{{ 'sections.<group>.<key>' | t }}`
- Colori via `var(--color-...)`
- CSS scopato `.syfer-<id>__*` (per sezioni nuove Syfer) oppure pattern Dawn (per modifiche a sezioni Dawn)
- Web component ES6 in `assets/<id>.js` se interattivo
- Theme Check dopo la build

Deliverable:
1. `sections/<section-id>.liquid`
2. Nuove key in `locales/it.json` (o lingua principale)
3. Nuove key in `locales/it.schema.json`
4. CSS in `assets/theme.css` o `assets/section-<id>.css`
5. JS se applicabile
6. Report Theme Check
7. URL dev store con sezione attiva

Stop. Attendi approvazione visiva da Chiara prima della prossima sezione.
```

---

## Gate 5b — Refactor sezione

```
Leggi CLAUDE.md.

Refactor la sezione `<section-id>.liquid`. Stato attuale in `sections/<section-id>.liquid`.

Modifiche richieste:
- <bullet list di modifiche specifiche>

Vincoli:
- Schema backward-compatible: preset esistenti caricano ancora, nessun ID setting rimosso (i deprecated possono essere nascosti via `visible_if` ma non cancellati)
- Tutte le key locale risolvono ancora
- Theme Check continua a passare
- Se modifiche al CSS impattano altre sezioni, segnalami prima di procedere

Processo:
1. Mostrami piano diff (file che cambiano e cosa cambia) PRIMA di editare.
2. Attendi approvazione.
3. Applica le modifiche.
4. Theme Check.
5. URL dev store aggiornato.

Stop dopo step 1.
```

---

## Gate 6 — Integrazioni cliente

```
Leggi CLAUDE.md, docs/brief-<cliente>.md §10 (integrazioni), docs/arch-<cliente>.md.

Implementiamo l'integrazione `<nome integrazione>`.

Tipo: <plugin Shopify App Store | API custom cliente | webhook | metafield-based feature>

Per ognuna:

Se è plugin Shopify App Store:
1. Installa l'app sul dev store cliente
2. Verifica lo slot di integrazione previsto (es. block @app nella main product section)
3. Configura le impostazioni minime per il go-live (le configurazioni di marketing le farà il cliente o l'account)
4. Documenta in docs/integrations-<cliente>.md: nome plugin, URL admin del plugin, credenziali (NON le password, solo il nome del campo dove sono in 1Password), training necessario per il cliente

Se è API custom cliente:
1. Verifica documentazione API cliente (chiedi a Raoul se manca)
2. Decidi pattern di integrazione: server-side (proxy via Shopify Functions / Carrier Service) vs client-side (fetch da JS)
3. Setup credenziali in `shop.metafields` cliente (NON hardcoded, NON in env del repo)
4. Implementa con error handling visibile (cosa succede se API offline?)
5. Test end-to-end del flusso

Se è webhook:
1. Setup endpoint Syfer per ricevere webhook (di norma fuori repo tema)
2. Verifica firma webhook
3. Logga eventi per debugging futuro

Output:
- Codice integrazione
- `docs/integrations-<cliente>.md` aggiornato
- Test risultato (passato/fallito + screenshot/log)

Stop dopo ogni integrazione.
```

---

## Gate 7 — Audit performance + a11y

```
Leggi CLAUDE.md §9 (performance) e §10 (a11y). Stato attuale del tema.

Esegui audit Lighthouse sul dev store cliente all'<URL>.

Per home, collection, product (desktop AND mobile, 6 run totali):
- Performance score
- Accessibility score
- Best Practices score
- SEO score

Identifica:

**Problemi LCP**
- Elemento LCP, fetchpriority, lazy state, dimensioni esplicite

**Render-blocking**
- Stylesheet senza preload
- Script senza defer/module
- Web font non ottimizzati

**Immagini**
- Lazy/eager corretto, srcset, alt

**Layout shift**
- Animazioni inducono CLS, dimensioni mancanti

**Esecuzione JS**
- Long task, reflow forzati

**Accessibility**
- Contrasti, alt mancanti, label form, focus state, tap target, HTML invalido

Per ogni finding:
- Pagina/e affette
- File + riga
- Severità: P0 (blocca soglia Syfer P≥70 / A≥90) / P1 / P2
- Fix proposto in 1-2 frasi
- Delta stimato

Target Syfer:
- Performance ≥ 70
- Accessibility ≥ 90
- Best Practices ≥ 90
- SEO ≥ 90

NON applicare fix. Output `docs/audit-<data>.md` e stop.

Dopo report, prioritizziamo P0 e affrontiamo uno alla volta con Gate 5b.
```

---

## Gate 8 — Migrazione contenuti

Solo per progetti redesign su store esistente.

```
Leggi CLAUDE.md, docs/brief-<cliente>.md §12 (migrazione), docs/intake-<cliente>.md.

Task migrazione contenuti dal vecchio store (`<old-store>`) al nuovo (`<new-store>`):

1. Audit contenuti da migrare:
   - Prodotti: <N>
   - Collection: <N>
   - Pagine: <N>
   - Blog/articoli: <N>
   - Customer (con storico ordini): <N>
   - Metafield custom: <lista>

2. Plan migrazione (per ogni tipo):
   - Strumento: <Shopify CLI export+import / Matrixify / API custom / manuale>
   - Trasformazioni necessarie: <es. campo "size" da text a list_of_swatch>
   - Verifica post-import: <quanti record / quanto matching>

3. Setup redirect 301:
   - Lista URL da redirectare (export da Search Console o sitemap vecchia)
   - Pattern URL old → new
   - Implementazione: `Online Store → Navigation → URL redirects` o bulk import CSV

4. Verifica SEO post-migrazione:
   - Sitemap.xml accessibile
   - Robots.txt corretto
   - Canonical URL preservato
   - Schema.org Product preservato
   - Meta title/description preservati

5. Output:
   - Report migrazione: <N records esportati / importati / falliti>
   - Lista redirect 301 attivi
   - Lista discrepanze da risolvere manualmente con cliente

Stop dopo il report.
```

---

## Gate 9 — Preparazione UAT

```
Leggi CLAUDE.md, docs/checklist-<cliente>.md.

Prepariamo l'UAT cliente.

Task:
1. Esegui sweep finale checklist (`docs/checklist-<cliente>.md`):
   - Tutte le voci ✅?
   - Voci ⚠ residue: documenta e classifica per severità
   - Voci ❌: blocker o accettabili per UAT?

2. Prepara dev store per demo cliente:
   - Tutti i contenuti reali popolati (no Lorem Ipsum)
   - Tutte le sezioni configurate come al go-live
   - Test order del checkout completato (Bogus Gateway o test mode)
   - Email transazionali testate (welcome, order confirmation, shipping)

3. Prepara documento UAT per cliente:
   - Lista funzionalità da testare
   - Casi d'uso suggeriti (anonimo browse, customer login, add to cart, checkout, account customer, ecc.)
   - Form/canale per il cliente per inviare feedback (suggerito: shared doc con tabella structure, NO email sparse)

4. Prepara training package (per la sessione di go-live):
   - 1 video Loom di 15-30 min di walkthrough theme editor
   - 1 PDF "Come modificare X" per le 5-7 cose più comuni
   - Checklist post-go-live per il cliente

Output:
- `docs/uat-<cliente>.md` con piano test
- `docs/training-<cliente>/` con materiali (Loom URL, PDF, checklist)
- Dev store URL da condividere con cliente

Stop. Programma demo call con cliente prima di chiudere il gate.
```

---

## Gate 10 — Go-live

```
Leggi CLAUDE.md.

Eseguiamo il go-live di `<cliente>`.

Pre-requisiti:
- [ ] UAT firmato dal cliente (anche solo email)
- [ ] Tutti i feedback UAT P0 risolti
- [ ] Backup completo del live store attuale (se redesign)
- [ ] Window di go-live concordato con cliente (orario di basso traffico, mai venerdì pomeriggio)
- [ ] Persona del cliente disponibile sui canali per i primi 60 minuti post-pubblicazione

Task:
1. Pubblica il tema nuovo come "active" sul live store cliente
2. Verifica live (entro 5 min):
   - Homepage carica
   - Almeno 3 prodotti caricano correttamente
   - Almeno 1 collection carica
   - Search funziona
   - Cart drawer si apre
   - Checkout iniziale (entrata) funziona — NON completare ordine reale
3. Attiva monitoring:
   - Plausible/GA tracking attivo
   - Error tracking (Sentry o equiv) se previsto
   - Uptime monitor se previsto
4. Notifica cliente: tema live, link, persona Syfer reperibile per le prossime ore
5. Compila `docs/handoff-<cliente>.md` con:
   - Data go-live
   - Versione tema deployata
   - URL live store
   - Lista feature attive
   - Lista feature ancora in backlog (se ce ne sono)
   - Contatti supporto Syfer
   - Credenziali admin trasferite al cliente (chi ha cosa)
   - Piano monitoring primi 30 giorni

Output:
- Tema live
- Notifica cliente inviata
- `docs/handoff-<cliente>.md` completo

Post go-live (primi 7 giorni):
- Check quotidiano analytics
- Check quotidiano error tracking
- Hotfix list aggiornata se emergono bug

Stop dopo handoff.
```

---

## Recovery — Errori Theme Check

```
Leggi CLAUDE.md.

`shopify theme check` riporta errori:

<incolla output>

Task:
1. Raggruppa errori per categoria (parser, undefined object, schema, performance, deprecation).
2. Per ogni errore: file + riga, perché è errore, fix più piccolo possibile.
3. Proponi ordine fix (più bloccanti per primi).
4. Mostrami piano fix come tabella PRIMA di editare.

Attendi approvazione. Poi applica fix uno alla volta, ri-eseguendo Theme Check dopo ognuno.
```

---

## Recovery — Fallimenti Lighthouse

```
Leggi CLAUDE.md §9.

Lighthouse sotto soglia Syfer:
- <pagina> <desktop|mobile>: P __ A __ BP __ SEO __

Output:
<incolla finding>

Task:
1. Triage finding per impatto (target P ≥ 70, A ≥ 90).
2. Per finding ad alto impatto: causa root, fix, delta stimato, rischio regressione.
3. Proponi ordine fix (impatto alto / rischio basso per primi).
4. Mostrami piano PRIMA di editare.

Attendi approvazione. Poi applica un fix, ri-esegui Lighthouse, segnala. Itera.
```

---

## Recovery — Bug post go-live

```
Leggi CLAUDE.md, docs/handoff-<cliente>.md.

Bug riportato dal cliente post go-live.

Input:
- Cliente segnalazione (verbatim): <incolla>
- Severità riportata dal cliente: <P0 = store rotto / P1 = feature critica rotta / P2 = bug minore>
- Quando è iniziato: <subito post go-live / dopo X giorni>
- Replicabile: <sempre / a volte / non riusciamo>

Task:
1. Riproduci il bug sul live store. Se non riproducibile: chiedi step-by-step esatti al cliente.
2. Identifica root cause:
   - Codice nostro nuovo (tema)
   - Codice nostro nuovo (integrazione)
   - Plugin Shopify aggiornato
   - Cambio comportamento Shopify platform
   - Errore di configurazione
3. Decidi se hotfix sul live (rischio rompere altro) o fix in dev e re-deploy.
4. Per hotfix: backup, applica fix, testa subito post-fix, documenta.
5. Per dev + redeploy: replica issue su dev store, fix, test, deploy in window di basso traffico.
6. Comunica al cliente: cosa abbiamo trovato, cosa abbiamo fatto, quando è risolto.
7. Aggiungi entry a `docs/postmortems-<cliente>.md`: bug, root cause, fix, lezione per il prossimo progetto.

Stop dopo step 1 (riproduzione) e attendi approvazione su strategia hotfix vs dev+redeploy.
```

---

## Riferimento veloce

| Situazione | Prompt |
|---|---|
| Nuovo cliente, brief firmato | Gate 1 |
| Intake fatto, pianificazione | Gate 2 |
| Architettura approvata, token | Gate 3 |
| Scaffolding del base theme | Gate 4 |
| Build di una sezione | Gate 5 |
| Modifica sezione esistente | Gate 5b |
| Setup integrazione cliente | Gate 6 |
| Audit performance / a11y | Gate 7 |
| Migrazione contenuti (redesign) | Gate 8 |
| Preparazione UAT cliente | Gate 9 |
| Go-live | Gate 10 |
| Theme Check non passa | Recovery — Theme Check |
| Lighthouse sotto soglia | Recovery — Lighthouse |
| Bug post go-live | Recovery — Bug post go-live |
