# Log delle decisioni architetturali

Questo file è la fonte di verità unica per il **perché** il codebase ha l'aspetto che ha. Ogni decisione architetturale (struttura cartelle, pattern di componenti, scelta di libreria, deviazione da Skeleton, convenzione di naming, ecc.) ottiene un'entry qui.

## Regole

- **Append-only.** Mai editare o cancellare un'entry passata. Se una decisione viene rovesciata, scrivi una nuova entry che supera la vecchia e la referenzia.
- **Più recenti prima.** Le entry più nuove in cima al file (sotto questo header), le più vecchie in fondo.
- **Decisione prima del codice.** Apri l'entry *prima* di scrivere l'implementazione. Se sei tentato di scrivere prima codice e documentare dopo, fermati — significa che non sei sicuro della decisione.
- **Una entry per decisione.** Non raggruppare. "Abbiamo scelto X per gli slider e Y per i form" = due entry.
- **Linka dal codice.** Quando la decisione affligge un file specifico, aggiungi un commento: `<!-- Vedi docs/decisions.md#YYYY-MM-DD -->` o `/* Vedi docs/decisions.md#YYYY-MM-DD */`.

## Template

Copia questo blocco per iniziare una nuova entry. Sostituisci i placeholder. Formato data: `YYYY-MM-DD`.

```markdown
## YYYY-MM-DD — <Titolo imperativo breve>

**Stato:** Accettata | Superata da <data> | Deprecata

**Decisione:** <Affermazione di una frase di cosa stiamo facendo.>

**Contesto:** <2–4 frasi. Quale problema stiamo risolvendo? Quali forze sono in gioco? Quali vincoli (tempo, regole Theme Store, performance, autonomia merchant) modellano questa decisione?>

**Alternative considerate:**
- **<Opzione A>** — <riassunto di una frase>. Rifiutata perché <motivo>.
- **<Opzione B>** — <riassunto di una frase>. Rifiutata perché <motivo>.
- **<Opzione scelta>** — <riassunto di una frase>.

**Razionale:** <Perché l'opzione scelta vince sulle alternative. Lega agli obiettivi di progetto: idoneità Theme Store, autonomia merchant, budget performance, budget accessibilità, carico di supporto.>

**Conseguenze:**
- ✅ <Conseguenza positiva>
- ✅ <Conseguenza positiva>
- ⚠ <Trade-off che accettiamo>
- ⚠ <Trade-off che accettiamo>

**Riferimenti:**
- <Link a sezione doc Shopify>
- <Link a sezione CLAUDE.md rilevante>
- <Link a PR o commit se l'implementazione esiste già>
```

---

## Entry

<!-- Le entry più nuove vanno direttamente sotto questa riga -->

## 2026-01-15 — Usare Embla invece di Splide per le sezioni carousel (ENTRY ESEMPIO)

**Stato:** Accettata

**Decisione:** Tutte le sezioni carousel e slideshow usano Embla Carousel come engine sottostante, caricato come modulo ES6 per ogni sezione che lo necessita.

**Contesto:** Più sezioni nel tema necessitano di carousel scrollabili orizzontalmente (image-banner-carousel, featured-collection, testimonials, logo-list). Ci serve una singola libreria che tutte le sezioni possano condividere per tenere il bundle piccolo. Il Theme Store richiede zero runtime di framework e solo ES6. Il budget di performance richiede Lighthouse Performance ≥60 su mobile, quindi il carousel non può bloccare il primo paint.

**Alternative considerate:**
- **Splide** — Maturo, accessibile, ben documentato. Rifiutato perché il bundle è ~24 KB minified-gzipped, che è pesante quando già lo carichiamo lazy; include anche feature (drag multi-slide, slide virtuali) che non ci servono.
- **Swiper** — Il più feature-completo nello spazio dei carousel JS. Rifiutato perché il bundle è ~40 KB+ minified-gzipped e l'API surface è molto più grande di quanto ci serva, aumentando il carico di supporto.
- **CSS scroll-snap puro** — Zero JS. Rifiutato perché ci servono next/prev programmatici per i pulsanti freccia e dot di paginazione indicizzati; CSS-only li perde.
- **Embla Carousel** — Headless, ~10 KB minified-gzipped, ES6-nativo, niente runtime framework, plugin di accessibilità disponibile separatamente.

**Razionale:** Il bundle piccolo di Embla ci tiene dentro il budget di performance su mobile. L'API headless significa che possediamo markup e styling, il che rende l'accessibilità (gestione focus, ARIA) più facile da fare bene rispetto a una libreria fully-styled. La distribuzione come modulo ES6 si sposa con la gestione automatica di `defer` e module loading di Shopify.

**Conseguenze:**
- ✅ Payload JS per pagina piccolo (~10 KB dopo gzip)
- ✅ Markup interamente nostro — accessibilità testata da capo a fondo
- ✅ Una sola dipendenza per tutte le sezioni carousel
- ⚠ Scriviamo i nostri pulsanti freccia, dot e wiring ARIA (Splide li dà gratis)
- ⚠ Quando Embla rilascia breaking change, aggiorniamo su più sezioni

**Riferimenti:**
- Embla Carousel: https://www.embla-carousel.com/
- CLAUDE.md §6.3 (vincoli JavaScript)
- CLAUDE.md §9 (budget performance)

---

<!-- Aggiungi nuove entry sopra questa riga. Le entry più vecchie continuano sotto man mano che si accumulano. -->
