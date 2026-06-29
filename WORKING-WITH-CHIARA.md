# Guida operativa — Lavorare con Chiara sui temi Shopify cliente

> **Audience:** Raoul (lead), Niko (dev full-stack), Chiara (designer/marketing).
> **Scopo:** workflow per consegnare temi cliente di qualità senza interruzioni continue, con cliente coinvolto al momento giusto.
> **Versione:** v1 — review dopo i primi 2 progetti consegnati.

---

## 1. Cosa cambia rispetto al Theme Store

I temi cliente sono diversi dai temi Theme Store su tre dimensioni:

| | Theme Store | Cliente |
|---|---|---|
| Chi giudica la qualità | Review team Shopify (regole pubbliche) | Cliente (criteri soggettivi + uso reale) |
| Tempo build | 6-10 settimane | 2-5 settimane |
| Rigore review | Pass/fail oggettivo | Iterativo con feedback |
| Cosa va bene | "Conforme alle regole" | "Funziona per il loro business" |
| Stakeholder | 1 (review team) | 2-5 (account, marketing cliente, ops, commerciale) |
| Rischio principale | Rigetto submission | Slippage deadline / scope creep |

Il workflow di base resta simile (gate sequenziali, async-first, brief strutturato), ma:
- **C'è il cliente**: aggiunge stakeholder, feedback non sempre coerente, deadline vincolanti
- **C'è l'urgenza**: i clienti pagano per andare live, non per perfezione astratta
- **C'è il post-launch**: il lavoro non finisce al deploy, comincia il monitoring

---

## 2. Divisione del lavoro

### 2.1 Cosa fa Chiara

| Fase | Output |
|---|---|
| Discovery cliente (con account manager) | Brief sezione 3 |
| Adattamento direzione visiva al brand cliente | Esplorazione Claude Design |
| Compilazione brief | Brief completo §1-13 |
| QA visivo durante il build | Issue visual-diff |
| Demo al cliente in UAT | Walkthrough delle sezioni |
| Materiali training cliente | Loom + PDF guide rapide |
| Listing prodotto cliente (se serve copy/visual) | Copy editoriale |

### 2.2 Cosa fa Niko (o il dev assegnato)

| Fase | Output |
|---|---|
| Tutta la build tecnica | Codice |
| Setup integrazioni | Plugin + custom code |
| Migrazione contenuti (se redesign) | Import + mapping |
| Audit performance + a11y | Report |
| Fix bug pre-launch | PR |
| Go-live | Deploy + monitoring |
| Hotfix post-launch | PR + comunicazione cliente |

### 2.3 Cosa fa Raoul (lead/escalation)

| Fase | Output |
|---|---|
| Approvazione brief + scope | Sign-off interno |
| Decisioni architetturali critiche | Entry in `decisions.md` |
| Escalation con cliente (problemi, scope creep) | Comunicazione |
| Code review su PR critiche | Review |
| Decisione finale go-live | Approvazione |

### 2.4 Cosa fa l'account manager Syfer (Giulio)

> Punto di contatto primario con il cliente. Il dev e Chiara non parlano direttamente al cliente per questioni operative — passa tutto da account.

| Fase | Output |
|---|---|
| Kickoff cliente | Setup contratto, raccolta materiali, allineamento aspettative |
| Comunicazione settimanale stato | Email/call con cliente |
| Triage feedback cliente | Filtra cosa è bug / cosa è scope creep / cosa è preferenza personale |
| Negoziazione scope | Quando il cliente chiede cose fuori contratto |
| Recupero materiali mancanti | Foto, copy, asset cliente |
| Sign-off finale cliente | Email di approvazione UAT + go-live |

### 2.5 Confini netti

- **Chiara non parla direttamente al cliente per questioni operative.** Passa per Giulio. Eccezione: durante demo/UAT, può rispondere a domande tecniche/visive sul momento.
- **Il dev (Niko/Raoul) non parla direttamente al cliente.** Passa per Giulio. Eccezione: durante go-live + 48h, il dev di guardia è raggiungibile dal cliente per emergenze.
- **Giulio non decide architettura tecnica.** Se il cliente chiede una feature complessa, Giulio non promette nulla — chiede al dev se è fattibile e con che tempo.
- **Nessuno promette deadline al cliente senza confermarlo con il dev.** "Per quando?" è una domanda che aspetta sempre la risposta del dev.

---

## 3. Workflow tipico (4 settimane — accelerato)

Adattato per progetti urgenti. Per progetti più larghi, scala proporzionalmente.

### Settimana 1 — Kickoff + brief + scaffolding

| Giorno | Chiara | Niko/Raoul | Giulio |
|---|---|---|---|
| Lun | Esplorazione visiva in Claude Design | Setup repo, dev store, base theme (Dawn) | Kickoff con cliente, raccolta brand assets |
| Mar | Brief §1-6 (metadata, commerciale, profilo, sito attuale, sorgenti, direzione visiva) | Lettura brief in parallelo | Follow-up con cliente per asset mancanti |
| Mer | Brief §7-9 (sezioni, product page, altri template) | Gate 1 + Gate 2 + Gate 3 | |
| Gio | **Call 30 min** con Niko/Raoul per risolvere domande aperte | Stessa call | Aggiornamento cliente su stato |
| Ven | Sign-off brief | Gate 4 (scaffolding base) | |

### Settimana 2 — Build sezioni (Gate 5 ripetuto)

| Giorno | Chiara | Niko/Raoul | Giulio |
|---|---|---|---|
| Lun-Ven | Review quotidiana sezioni costruite, apre issue per discrepanze visive | Build sezioni con prompt Gate 5, una alla volta | Aggiornamento settimanale cliente con dev store URL |

### Settimana 3 — Integrazioni + audit + UAT prep

| Giorno | Chiara | Niko/Raoul | Giulio |
|---|---|---|---|
| Lun-Mar | QA testuale, prepara materiali training | Gate 6 (integrazioni cliente) | Programma data UAT con cliente |
| Mer | Demo content / popolamento dev store | Gate 7 (audit) + chiusura P0 | |
| Gio | Continua training material | Gate 8 (migrazione) se redesign | |
| Ven | Materiali training pronti | Gate 9 (UAT prep) | Demo UAT con cliente programmata |

### Settimana 4 — UAT + fix + go-live

| Giorno | Chiara | Niko/Raoul | Giulio |
|---|---|---|---|
| Lun | Partecipa a demo UAT | Demo UAT con cliente | Mediazione demo |
| Mar | Triage feedback con account | Triage feedback (cosa è bug, cosa è scope creep) | Negozia con cliente cosa va in v1 vs v1.1 |
| Mer-Gio | — | Fix dei P0 di feedback UAT | Comunica a cliente piano fix |
| Ven | — | Gate 10 (go-live) in window concordato | Notifica cliente + supporto primi minuti post-launch |

### Settimana 5 — Post go-live monitoring

Routine quotidiana primi 7 giorni:
- Niko/Raoul: check errori + analytics ogni mattina
- Giulio: check-in cliente +1g, +3g, +7g
- Chiara: disponibile per micro-aggiustamenti visivi se cliente segnala

A +30 giorni: postmortem se ci sono stati issue P0/P1, lessons learned in `docs/decisions.md`.

---

## 4. Punti di check obbligatori

5 call obbligatorie per progetto cliente (più del Theme Store, perché c'è il cliente).

### 4.1 Kickoff cliente
- **Quando:** giorno 1
- **Durata:** 60-90 min
- **Partecipanti:** Giulio, cliente, opzionale Chiara
- **Output:** brief raccolto, deadline confermata, asset trasferiti, persone cliente identificate

### 4.2 Call interna risoluzione brief
- **Quando:** giovedì settimana 1
- **Durata:** 30 min
- **Partecipanti:** Chiara, Niko/Raoul (no cliente, no Giulio se non rilevante)
- **Output:** sign-off interno brief, partenza Gate 4

### 4.3 Update settimanale cliente
- **Quando:** ogni venerdì
- **Durata:** 15-30 min
- **Partecipanti:** Giulio + cliente, opzionale 5 min Chiara/Niko se serve mostrare qualcosa
- **Output:** cliente sa dove siamo, cosa abbiamo fatto, cosa è la prossima settimana

### 4.4 Demo UAT
- **Quando:** lunedì settimana 4
- **Durata:** 60-90 min
- **Partecipanti:** Giulio, Chiara, cliente (referente principale + opzionale 1-2 stakeholder)
- **Output:** lista feedback consolidata, classificata in P0/P1/P2

### 4.5 Go-live
- **Quando:** giovedì o venerdì settimana 4 (mai venerdì pomeriggio)
- **Durata:** 30 min ufficiali + 2 ore di standby
- **Partecipanti:** Niko/Raoul, Giulio, opzionale cliente per il momento del deploy
- **Output:** tema live, monitoring attivo, cliente notificato

---

## 5. Comunicazione async

### 5.1 Canali

| Canale | Per cosa |
|---|---|
| Slack `#syfer-themes` | Comunicazione team interna |
| Slack `#cliente-<nome>` | Discussione specifica progetto cliente (canale per ogni progetto) |
| Email/WhatsApp/Slack cliente | Comunicazione con cliente — sempre via Giulio |
| GitHub Issue | Bug, discrepanze, decisioni |
| GitHub PR | Tutto il codice |
| Loom | Walkthrough quando il testo non basta |
| `docs/decisions.md` | Decisioni architetturali |
| `docs/postmortems-<cliente>.md` | Postmortem post go-live |

### 5.2 Regole

- Niente ping diretti al cliente da Niko/Raoul/Chiara senza coordinamento con Giulio
- Tutti i feedback cliente → consolidati da Giulio in 1 documento per UAT (no email sparse)
- Update settimanale cliente: scritto, anche se c'è la call. Lascia traccia.
- Decisioni che cambiano scope → documentate ed esplicitamente accettate dal cliente PRIMA di implementare

### 5.3 Template di comunicazione

#### Update settimanale cliente (template Giulio)

```
Ciao <cliente>,

Update settimana <N> sul progetto <nome>:

✅ Fatto questa settimana:
- <bullet 1>
- <bullet 2>

🚧 In corso:
- <bullet>

📋 Settimana prossima:
- <bullet>

🛑 Dipendenze da te:
- <es. mancano foto prodotti per la collection X>
- <es. devi confermare il copy per la pagina About>

Dev store URL aggiornato: <link>
Riassunto progresso: <%>

Disponibile per call mer/gio se serve.

Giulio
```

#### Issue: discrepanza visiva (apre Chiara)

```
Titolo: [<cliente>] [<sezione>] discrepanza visiva
Label: visual-diff, <severity>

## Cosa
<descrizione 1-2 frasi>

## Atteso (Claude Design)
<screenshot>

## Attuale (dev store)
<screenshot>

## Severità
P0 / P1 / P2

## Note
<contesto>
```

#### Issue: feedback cliente UAT (apre Giulio dopo demo)

```
Titolo: [<cliente>] [UAT] <riassunto feedback>
Label: client-feedback, <severity>

## Cliente ha detto
<verbatim, in italiano se cliente parla italiano>

## Interpretazione (Giulio)
<cosa significa in pratica, è bug / preferenza / scope creep?>

## Severità proposta
P0 / P1 / P2

## Da fare
- <bullet>

## Stima dev
<S/M/L>

## Decisione finale (post-triage)
v1 / v1.1 / scope creep no go
```

---

## 6. Anti-pattern di collaborazione

### 6.1 Per Chiara

- ❌ Non parlare direttamente al cliente per richieste operative — passa per Giulio
- ❌ Non promettere modifiche al cliente durante demo UAT — di' "prendiamo nota e ti risponde Giulio entro 24h"
- ❌ Non cambiare il brief dopo Gate 4 — apri issue con label `scope-change` e si decide insieme
- ❌ Non scrivere "Lorem Ipsum" sui contenuti finali — chiedi a Giulio di chiedere al cliente
- ❌ Non aprire PR sul codice

### 6.2 Per Niko/Raoul

- ❌ Non implementare feature non nel brief senza issue + approvazione — è scope creep
- ❌ Non parlare direttamente al cliente per stati operativi — passa per Giulio
- ❌ Non andare live con P0 aperti, anche se il cliente è impaziente
- ❌ Non andare live di venerdì pomeriggio
- ❌ Non chiudere ticket bug senza scriverne il root cause

### 6.3 Per Giulio (account)

- ❌ Non promettere deadline al cliente senza conferma del dev
- ❌ Non promettere feature al cliente senza conferma del dev
- ❌ Non passare al dev "feedback raw" del cliente — fai triage prima (è bug? scope creep? preferenza?)
- ❌ Non saltare update settimanale anche se "non c'è niente di nuovo"
- ❌ Non far partecipare il dev a tutte le call cliente — usa il suo tempo solo quando serve

---

## 7. Cosa fare quando le cose non vanno

### 7.1 Cliente in ritardo con asset

> Es: dev store popolato a metà perché mancano foto prodotti

1. Giulio invia reminder formale via email con lista asset mancanti
2. Se non arrivano entro 3 giorni: secondo reminder con notifica che la deadline scivola
3. Se non arrivano entro 7 giorni: si ferma il lavoro, si comunica nuovo go-live al cliente
4. Si registra in `docs/decisions.md`: "Go-live spostato da X a Y per ritardo asset cliente"

### 7.2 Cliente cambia scope durante UAT

> Es: in demo UAT chiede una feature non prevista

Sul momento (Chiara o Giulio):
> "Buona idea, prendiamo nota. Vediamo se è fattibile per il go-live o se va in v1.1, ti rispondiamo entro 24h."

Dopo demo:
1. Giulio apre issue `client-feedback` + label `scope-change`
2. Triage interno (Niko/Raoul stimano sforzo)
3. Decisione: in scope (gratis se piccolo) / costo aggiuntivo (preventivo) / fuori scope (v1.1 se cliente accetta)
4. Giulio comunica decisione al cliente per iscritto
5. Se aggiungono ore: amend al contratto via email

### 7.3 Bug critico post go-live

1. Niko di guardia (primi 7 giorni): risposta entro 30 min in business hours, entro 2 ore fuori
2. Apre issue con label `prod-blocker`
3. Decide hotfix vs dev+redeploy (vedi prompt Recovery — Bug post go-live)
4. Comunica al cliente:
   ```
   Salve <cliente>,
   abbiamo identificato il problema con <X>. La causa è <Y>.
   ETA fix: <Z>. Vi tengo aggiornati ogni 30 min.
   ```
5. Risolve, comunica risoluzione, fa postmortem

### 7.4 Performance al di sotto target

1. Apri prompt Recovery — Lighthouse
2. Identifica root cause
3. Se tempo permette prima del go-live: fix
4. Se tempo NON permette: comunica al cliente che il sito andrà live a P=X (sotto target Syfer ma above 50), con piano di ottimizzazione in v1.1
5. Documenta in `docs/decisions.md` come "tech debt accettato per rispettare deadline"

### 7.5 Conflitto tra cliente marketing e cliente ops

> Es: marketing vuole hero animato, ops dice "rallenta tutto"

Giulio si fa carico:
1. Convoca call con entrambi (15-20 min)
2. Spiega trade-off (es. animazione = -10 punti Lighthouse = -X% conversion stimato)
3. Propone alternativa (es. animazione solo desktop, statico mobile)
4. Lascia decidere al cliente — l'agenzia non sceglie tra stakeholder cliente
5. Logga decisione in `decisions.md` con razionale "scelto da <persona> in qualità di <ruolo>"

---

## 8. Onboarding di Chiara su questo workflow (3 giorni)

### Giorno 1 — Lettura (3 ore)
- `CLAUDE.md` (questa è la versione cliente, non Theme Store)
- Questa guida
- `CLIENT-BRIEF-template.md`
- Esempio di brief compilato di un progetto recente Syfer

### Giorno 2 — Hands-on (4 ore)
- Aprire un dev store Syfer di un progetto chiuso, navigarlo
- Aprire Claude Design, esplorare un tema fittizio per un cliente fittizio
- Compilare un mock brief

### Giorno 3 — Walkthrough con Raoul (2 ore)
- Andare insieme su un progetto cliente attivo
- Vedere il flusso di issue + PR + deploy
- Vedere il theme editor lato cliente

---

## 9. Metriche di successo

Ogni 2 progetti consegnati, retro di 30 min.

| Metrica | Buono | Ottimo |
|---|---|---|
| Brief→sign-off interno | ≤ 5 giorni | ≤ 3 giorni |
| Tempo totale brief→go-live | ≤ 5 settimane | ≤ 4 settimane |
| Numero P0 in UAT | ≤ 5 | ≤ 2 |
| Slippage deadline | 0 giorni | 0 giorni |
| Bug critici primi 7 giorni post go-live | ≤ 1 | 0 |
| Soddisfazione cliente NPS | ≥ 8 | ≥ 9 |
| Soddisfazione team Syfer (1-10) | ≥ 7 | ≥ 9 |
| Scope creep accettato senza preventivo | ≤ 5% del lavoro | ≤ 0% |

---

## 10. Quando questa guida va aggiornata

- Dopo i primi 2 progetti cliente consegnati con questo workflow
- Quando entra Niko in modo strutturato (oggi è già nel team — adatta i suoi compiti)
- Quando si aggiunge un nuovo dev/designer
- Quando un postmortem identifica un anti-pattern non documentato

---

## Changelog

- **v1 — 2026-04-28** — versione iniziale, adattata da WORKING-WITH-CHIARA Theme Store version
