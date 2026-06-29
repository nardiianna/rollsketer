# Setup primo progetto — Redesign cliente da zero

> **Scenario coperto:** redesign di store Shopify esistente del cliente, partendo da zero tecnico (no repo, no dev store), per cliente reale con deadline urgente.
> **Tempo stimato totale:** 4-5 ore da chi esegue (te o Niko), spalmate su 1 giornata.
> **Prerequisiti:** Mac/PC con accesso admin, account GitHub Syfer attivo, account Shopify Partner attivo, contratto cliente firmato.
>
> **Per altri scenari** (nuovo store, migrazione da altra piattaforma) le fasi 4 e 5 cambiano sostanzialmente. Le fasi 1-3 e 6-7 sono identiche.

---

## Indice fasi

| Fase | Cosa | Tempo |
|---|---|---|
| 1 | Prerequisiti e tool locali | 30 min |
| 2 | Accessi cliente e partner | 30 min |
| 3 | Repo GitHub | 20 min |
| 4 | Tema base e push iniziale | 30 min |
| 5 | CI e secret GitHub | 20 min |
| 6 | Audit dello store live esistente | 60-90 min |
| 7 | Kickoff brief con Chiara | 60 min |
| 8 | Gate 1 di Claude Code | 30 min |

---

## Fase 1 — Prerequisiti e tool locali (30 min)

> Da fare una volta sola sul Mac. Se sono già installati, salti i comandi e vai a verificare.

### Step 1.1 — Verifica Node.js 20+

```bash
node --version
# Atteso: v20.x.x o superiore
```

Se mancante o vecchia, installa con nvm:

```bash
# Installa nvm se non c'è
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.zshrc

# Installa Node 20 LTS
nvm install 20
nvm use 20
nvm alias default 20
```

### Step 1.2 — Installa Shopify CLI

```bash
npm install -g @shopify/cli @shopify/theme

# Verifica
shopify version
# Atteso: versione 3.x recente
```

### Step 1.3 — Installa tool di qualità

```bash
# Globali (utili per ogni progetto)
npm install -g lighthouse @lhci/cli

# Verifica
lighthouse --version
lhci --version
```

### Step 1.4 — Configura Git locale (se non l'hai già fatto)

```bash
git config --global user.name "Raoul Cuppone"
git config --global user.email "raoul@syfer.it"
git config --global init.defaultBranch main
```

### Step 1.5 — Verifica accesso GitHub

```bash
ssh -T git@github.com
# Atteso: "Hi <username>! You've successfully authenticated..."
```

Se errori SSH: setup chiave SSH ([guida ufficiale GitHub](https://docs.github.com/authentication/connecting-to-github-with-ssh)).

### Step 1.6 — Login Shopify CLI

```bash
shopify auth login
```

Apre browser, fai login con account Partner Syfer.

---

## Fase 2 — Accessi cliente e partner (30 min)

> Questo è il pezzo che dipende dal cliente, può richiedere ore di attesa che lui clicchi sull'invito email. Inizialo subito così procede in parallelo.

### Step 2.1 — Crea client transfer store nel Partner Dashboard

> Nota: per un redesign useremo principalmente il LIVE store del cliente (con accesso collaborator) come ambiente di lavoro. Il client transfer store ti serve come backup/sandbox per esperimenti che non vuoi rischiare sul live.

1. Vai su [Partner Dashboard](https://partners.shopify.com)
2. **Stores** → **Add store** → **Development store**
3. Compila:
   - Store name: `<cliente>-syfer-dev`
   - Country: Italy
   - **Generate test data:** ✅ (popola con prodotti finti, utile per testare)
   - Plan: il piano di default va bene
4. Salva. Ti darà un URL tipo `<cliente>-syfer-dev.myshopify.com`
5. Annota in 1Password: URL, owner email, eventuale password admin temporanea

### Step 2.2 — Richiedi collaborator access al live store del cliente

1. Sempre dal Partner Dashboard: **Stores** → **Add store** → **Request access to a store**
2. Inserisci il dominio del cliente: `<cliente-live>.myshopify.com` o il dominio custom
3. **Permessions necessari** (ticka solo questi, non chiedere full admin):
   - ✅ **Themes** (modificare temi)
   - ✅ **Online Store** (vedere e modificare)
   - ✅ **Apps** (vedere quali app sono installate)
   - ✅ **Reports & Analytics** (per audit baseline)
   - ✅ **Settings** (vedere config, NON modificare general settings)
   - ❌ Customers, Orders, Products → non li tocchiamo dal lato dev
4. **Request reason:** "Redesign tema Shopify per <cliente> — accesso necessario per pull tema corrente, build nuovo tema, test su catalogo reale"
5. Click **Send request**

Il cliente riceve un'email da Shopify, deve cliccare **Approve**. Comunicagli che lo stiamo facendo, così non lo cancella pensando che sia spam.

### Step 2.3 — Crea Theme Access app sul dev store (per CI)

> Serve per dare a GitHub Actions l'accesso al dev store senza usare le tue credenziali personali.

1. Sul dev store appena creato: **Apps** → **Apps and sales channels** → **Develop apps** → **Allow custom app development** (devi accettare un disclaimer)
2. **Create an app**, nome: `Syfer CI`
3. **Configuration** → **Admin API integration** → **Configure**
4. Permissions necessari:
   - `read_themes`, `write_themes`
   - `read_content`, `read_products` (per html-validate render check)
5. **Save** → **Install app**
6. **API credentials** → copia il **Admin API access token** (inizia con `shpat_`)
7. **Salvalo subito in 1Password** come "Syfer CI Theme Access — `<cliente>`"

> Ripeterai questo step più tardi sul live store cliente, dopo che ti ha approvato. Per ora il dev store basta per far partire la CI.

---

## Fase 3 — Repo GitHub (20 min)

### Step 3.1 — Crea repo nell'org Syfer

1. Vai su [github.com/syfer-it](https://github.com/syfer-it) (o l'org corretta)
2. **New repository**
3. Compila:
   - Nome: `theme-<cliente>` (es. `theme-dellafonte`)
   - Description: `Tema Shopify custom per <cliente> — redesign 2026`
   - Visibility: **Private**
   - **Initialize with README:** ❌ (lo creiamo noi localmente)
   - License: nessuna
4. **Create repository**

### Step 3.2 — Inizializza il repo localmente

Apri terminale, vai dove tieni i progetti (es. `~/Code/`):

```bash
cd ~/Code
mkdir theme-<cliente>
cd theme-<cliente>
git init
git remote add origin git@github.com:syfer-it/theme-<cliente>.git
```

### Step 3.3 — Applica il bundle starter Syfer

Copia i file dal bundle `shopify-custom-client-bundle-it/` nella radice del progetto:

```bash
# Adatta il path alla posizione dove hai salvato il bundle
BUNDLE=~/Downloads/shopify-custom-client-bundle-it

cp $BUNDLE/CLAUDE.md .
cp $BUNDLE/CLIENT-BRIEF-template.md .
cp $BUNDLE/WORKING-WITH-CHIARA.md .
cp $BUNDLE/.lighthouserc.json .

mkdir -p docs
cp $BUNDLE/docs/decisions.md docs/
cp $BUNDLE/docs/checklist-template.md docs/
cp $BUNDLE/docs/prompt-library.md docs/

mkdir -p .github/workflows
cp $BUNDLE/.github/workflows/theme-check.yml .github/workflows/
```

### Step 3.4 — Crea il README di progetto

```bash
cat > docs/README.md <<'EOF'
# Tema <cliente> — README progetto

## Cliente
- Nome: <cliente>
- Sito attuale: <URL live>
- Settore: <industria>

## Repo
- GitHub: https://github.com/syfer-it/theme-<cliente>
- Branch principale: main

## Store
- Live store: <cliente-live>.myshopify.com
- Dev store: <cliente>-syfer-dev.myshopify.com

## Base theme
- Dawn vN.M (versione corrente al <data>)

## Lingue al go-live
- it (default)

## Integrazioni attive (da compilare al Gate 1)
- TBD

## Credenziali (nomi, NON valori — i valori sono in 1Password)
- Theme Access token CI (dev store): `Syfer CI Theme Access — <cliente> dev`
- Theme Access token CI (live store): `Syfer CI Theme Access — <cliente> live` (TBD post-collaborator approval)

## Deploy
- CI/CD: GitHub Actions, push su main → Theme Check + Lighthouse
- Deploy manuale: `shopify theme push --store=<cliente-live>.myshopify.com --unpublished`
- Pubblicazione: `shopify theme publish` o admin Shopify in window di basso traffico

## Gotcha specifici
- TBD post Gate 1

## Contatti cliente
- Referente principale: TBD
- Marketing: TBD
- IT/Tecnico: TBD

## Contatti Syfer
- Account manager: Giulio Marzano
- Lead dev: Raoul Cuppone
- Designer: Chiara Camposeo
EOF
```

Sostituisci tutti i `<placeholder>` con i valori reali.

### Step 3.5 — Aggiungi .gitignore

```bash
cat > .gitignore <<'EOF'
# Dependencies
node_modules/
package-lock.json

# Shopify CLI cache
.shopify/

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# CI artifacts
.ci/
.lighthouseci/

# Environment files
.env
.env.local

# Logs
*.log

# Theme dev cache
.theme-check-config-cache.json
EOF
```

### Step 3.6 — Crea package.json minimo

```bash
cat > package.json <<'EOF'
{
  "name": "theme-<cliente>",
  "version": "0.1.0",
  "private": true,
  "description": "Tema Shopify custom per <cliente> — Syfer",
  "scripts": {
    "dev": "shopify theme dev",
    "check": "shopify theme check",
    "format": "prettier --write '**/*.{liquid,json,css,js}'",
    "format:check": "prettier --check '**/*.{liquid,json,css,js}'",
    "validate": "html-validate '.ci/html/*.html'",
    "lighthouse": "lhci autorun --config=.lighthouserc.json"
  },
  "devDependencies": {
    "@shopify/prettier-plugin-liquid": "^1.4.0",
    "html-validate": "^9.0.0",
    "prettier": "^3.3.0"
  }
}
EOF

npm install
```

### Step 3.7 — Primo commit (vuoto, solo bundle Syfer)

```bash
git add .
git commit -m "chore: initial Syfer bundle setup

- CLAUDE.md (project constitution)
- CLIENT-BRIEF-template.md
- WORKING-WITH-CHIARA.md
- docs/ (decisions, checklist, prompt-library)
- .github/workflows/theme-check.yml
- .lighthouserc.json
- package.json, .gitignore"

git push -u origin main
```

Verifica su GitHub che i file siano arrivati.

---

## Fase 4 — Tema base e push iniziale (30 min)

### Step 4.1 — Aspetta che il cliente approvi il collaborator request

> Se non l'ha ancora fatto, mandagli un WhatsApp veloce: "Ti è arrivata un'email da Shopify per dare accesso a Syfer al tuo store. Conferma quando lo hai fatto, grazie."

Quando approva, vedi il suo store nella lista del Partner Dashboard.

### Step 4.2 — Pull del tema attuale del cliente come riferimento

> Importante: questo NON sarà la nostra base. Lo prendiamo solo come riferimento per capire cosa c'è oggi, quali setting usa, come sono strutturate le sezioni esistenti.

```bash
mkdir -p reference
cd reference
shopify theme pull --store=<cliente-live>.myshopify.com --live
cd ..
```

Scegli il numero del tema "live" quando te lo chiede. Pull dura 30-60 secondi.

Aggiungi `reference/` al `.gitignore` (è solo per consultazione, non lo pushiamo):

```bash
echo "reference/" >> .gitignore
git add .gitignore
git commit -m "chore: ignore reference/ folder (current theme pulled for reference only)"
git push
```

### Step 4.3 — Inizializza Dawn come base del nuovo tema

```bash
shopify theme init --clone-url=https://github.com/Shopify/dawn theme-source
```

Questo crea la cartella `theme-source/` con Dawn. Spostiamo i contenuti nella root del repo:

```bash
# IMPORTANTE: non sovrascrivere i file Syfer che hai già messo
# Mantieni: CLAUDE.md, CLIENT-BRIEF-template.md, WORKING-WITH-CHIARA.md, docs/, .github/, .lighthouserc.json, package.json, .gitignore
# Sposta da theme-source: assets/, config/, layout/, locales/, sections/, snippets/, templates/

mv theme-source/assets ./
mv theme-source/config ./
mv theme-source/layout ./
mv theme-source/locales ./
mv theme-source/sections ./
mv theme-source/snippets ./
mv theme-source/templates ./

# Rimuovi la cartella vuota
rm -rf theme-source
```

### Step 4.4 — Adatta i locale all'italiano come default

> Dawn arriva con `en.default.json`. Per cliente italiano, vogliamo che italiano sia il default.

```bash
cd locales
# Rinomina en.default.json → en.json (resta come fallback)
mv en.default.json en.json
mv en.default.schema.json en.schema.json

# Verifica se esiste it.json di Dawn
ls -la it.json
```

Se `it.json` esiste, rinominalo come default:
```bash
mv it.json it.default.json

# Stessa cosa per lo schema se c'è
[ -f it.schema.json ] && mv it.schema.json it.default.schema.json
cd ..
```

Se `it.json` NON esiste, dovrai tradurre tu stesso `en.json` → `it.default.json` durante il Gate 5. Per ora puoi lasciarlo così, l'importante è che almeno una `<lingua>.default.json` esista.

> **Nota:** dalle versioni recenti di Dawn (15.x+) i locale italiani sono inclusi. Se sei su una versione che non ce l'ha, usa Dawn dal repo ufficiale Shopify che include più lingue.

### Step 4.5 — Theme Check sul tema appena scaffolded

```bash
shopify theme check
```

Atteso: 0 errori, eventuali warning su sezioni Dawn note (sono accettabili). Se ci sono errori, vediamo insieme prima di proseguire.

### Step 4.6 — Push del tema su dev store

```bash
shopify theme push --store=<cliente>-syfer-dev.myshopify.com --unpublished
```

Quando ti chiede il nome del tema: `Syfer Dawn Base — v0.1.0`.

Apri il preview URL che ti restituisce. Verifica:
- Homepage carica
- Header e footer presenti
- Almeno un prodotto carica (ti hanno generato test data al setup)
- Cart drawer si apre
- Theme editor funziona

### Step 4.7 — Commit del codice base

```bash
git add .
git commit -m "feat: Dawn base theme initialized

- Dawn v<N.M> as starting codebase
- Italian locale set as default
- Theme Check pulito"

git push
```

---

## Fase 5 — CI e secret GitHub (20 min)

### Step 5.1 — Aggiungi i secret al repo GitHub

1. Vai su `github.com/syfer-it/theme-<cliente>/settings/secrets/actions`
2. **New repository secret** per ognuno:

| Nome secret | Valore |
|---|---|
| `SHOPIFY_CLI_THEME_TOKEN` | Il token `shpat_...` creato allo Step 2.3 |
| `SHOPIFY_FLAG_STORE` | `<cliente>-syfer-dev.myshopify.com` |
| `LHCI_GITHUB_APP_TOKEN` | (opzionale, registra Lighthouse CI app su GitHub se vuoi commenti automatici nei PR — [istruzioni](https://github.com/apps/lighthouse-ci)) |

### Step 5.2 — Trigger primo run CI

```bash
git commit --allow-empty -m "ci: trigger first CI run to validate setup"
git push
```

Vai su `github.com/syfer-it/theme-<cliente>/actions` e guarda il run.

**Se tutto verde:** ottimo, hai i 6 job che girano automaticamente a ogni PR.

**Se qualche job fallisce:** la causa più comune al primo run è:
- Token non valido → ricontrolla Step 2.3
- Store domain sbagliato → rifai Step 5.1
- Lighthouse fallisce per soglia → su tema Dawn vergine appena pushato dovrebbe passare; se fallisce, c'è un'issue di environment, dimmelo

### Step 5.3 — Configura branch protection (opzionale ma consigliato)

1. Settings → Branches → Add rule
2. Branch name pattern: `main`
3. ✅ **Require a pull request before merging**
4. ✅ **Require status checks to pass before merging**
   - Cerca e seleziona: `CI passed (required)` (è il job finale del workflow)
5. **Save**

Ora nessuno (incluso te per sbaglio) può pushare direttamente su main senza CI verde.

---

## Fase 6 — Audit dello store live esistente (60-90 min)

> Questo è il pezzo che spesso si salta e poi si paga caro al go-live. Fallo subito mentre Chiara sta facendo il brief in parallelo.

### Step 6.1 — Lighthouse baseline del sito attuale

```bash
mkdir -p docs/audit-baseline
cd docs/audit-baseline

# Home
lighthouse https://<dominio-cliente> --output=html --output-path=./baseline-home-desktop.html --preset=desktop
lighthouse https://<dominio-cliente> --output=html --output-path=./baseline-home-mobile.html --form-factor=mobile

# Una collection
lighthouse https://<dominio-cliente>/collections/<slug> --output=html --output-path=./baseline-collection-desktop.html --preset=desktop

# Un prodotto
lighthouse https://<dominio-cliente>/products/<slug> --output=html --output-path=./baseline-product-desktop.html --preset=desktop

cd ../..
```

Annota i punteggi P/A/BP/SEO in `docs/brief-<cliente>.md` § 4 (Sito attuale). Sono il benchmark da battere al go-live.

### Step 6.2 — Esporta lista URL top organico

Idealmente dal Search Console del cliente, ma se non hai accesso usa un crawler veloce:

```bash
# Installa screaming frog CLI o usa un crawler online
# Alternativa veloce: scarica la sitemap.xml
curl -o docs/audit-baseline/sitemap.xml https://<dominio-cliente>/sitemap.xml
```

Se cliente ti dà accesso a Search Console:
1. **Performance → Pages** → ordina per click discendenti
2. Esporta CSV top 100
3. Salva in `docs/audit-baseline/top-urls.csv`

Queste sono le URL che NON puoi rompere al go-live. I redirect 301 le coprono tutte.

### Step 6.3 — Inventario integrazioni cliente

Vai sull'admin del live store del cliente:
1. **Apps and sales channels** → fai screenshot di tutte le app installate
2. **Online Store → Themes → Customize** sul tema corrente → guarda quali setting sono compilati (logo, social, payment icons, ecc.)
3. **Settings → Payments** → annota i gateway attivi (Klarna? Scalapay? PayPal?)
4. **Settings → Shipping and delivery** → annota i profili di spedizione
5. **Settings → Notifications** → guarda se ci sono email custom

Salva tutto in `docs/audit-baseline/inventory.md`:

```markdown
# Inventario stato attuale store cliente

## Tema attuale
- Nome: <es. Prestige 8.4.0>
- Acquistato il: <data se sai>
- Ha modifiche custom? Y / N

## App installate
| Nome app | Funzione | Mantenere nel nuovo tema? |
|---|---|---|
| Klaviyo | Email marketing | Sì |
| Yotpo | Reviews | Sì |
| ... | ... | ... |

## Payment gateway
- ...

## Profili spedizione
- ...

## Email transazionali custom
- ...

## Configurazioni admin notabili
- ...
```

### Step 6.4 — Inventario contenuti

```bash
# Conta prodotti via API (richiede shopify CLI loggato come collaborator)
shopify theme info --store=<cliente-live>.myshopify.com
```

Per il count esatto di prodotti/collection/pagine/articoli, vai sull'admin:
- **Products** → conta totale
- **Collections** → conta totale
- **Online Store → Pages** → conta
- **Online Store → Blog posts** → conta
- **Customers** → conta

Annota in `docs/audit-baseline/inventory.md`. Decideremo al Gate 8 cosa migrare e come.

---

## Fase 7 — Kickoff brief con Chiara (60 min)

> Questo è dove inizia il lavoro di Chiara. Tu hai la parte tecnica già impalcata, lei può lavorare in parallelo da ora in poi.

### Step 7.1 — Setup il brief vuoto

```bash
cp CLIENT-BRIEF-template.md docs/brief-<cliente>.md
git add docs/brief-<cliente>.md
git commit -m "docs: initialize brief for <cliente>"
git push
```

### Step 7.2 — Compila tu le sezioni 1, 2, 4 del brief

> Sezione 1 (metadati), Sezione 2 (commerciale), Sezione 4 (sito attuale) le compili tu adesso, perché sono dati che hai dal contratto + dall'audit appena fatto.

Sezioni che lascerai a Chiara:
- §3 Profilo cliente e business (lei completa con info da kickoff cliente)
- §5 Sorgenti design
- §6 Direzione visiva
- §7-9 Inventario sezioni e template
- §10 Integrazioni (compilate insieme — lei sa cosa il cliente USERÀ, tu sai come INTEGRARLO)
- §11 Localizzazione
- §12 Migrazione contenuti (basata sull'audit fatto)
- §13 Domande aperte

### Step 7.3 — Setup call con Chiara per kickoff

Programma una call di 60-90 min entro 24h. Agenda:

1. **Tu (10 min):** mostri lo stato — repo, dev store con Dawn vergine, baseline performance del live, inventario integrazioni
2. **Insieme (20 min):** decidete approccio di alto livello — quanto stiamo cambiando rispetto al tema attuale del cliente? Same-but-better, o redesign radicale?
3. **Tu (10 min):** mostri a Chiara come funzionano Claude Design + il brief template, se è la prima volta
4. **Chiara (resto):** inizia a esplorare in Claude Design, tu rispondi a domande tecniche puntuali

Da qui Chiara va in autonomia per 3-5 giorni e ti consegna il brief completo.

### Step 7.4 — Set up canale Slack progetto

```
#cliente-<cliente>
```

Aggiungi: te, Chiara, Niko, Giulio (account). NON il cliente — quello è canale separato gestito da Giulio.

Pin nel canale:
- Link al repo GitHub
- URL dev store + credenziali (NO password — link a 1Password entry)
- URL live store cliente
- Link al brief in compilazione
- Link a questa guida (`SETUP-FIRST-PROJECT.md`) per riferimento futuro

---

## Fase 8 — Gate 1 di Claude Code (30 min)

> Quando il brief è pronto e firmato (ci vorranno 2-5 giorni di lavoro Chiara), apri Claude Code e parti.

### Step 8.1 — Apri Claude Code nel repo

```bash
cd ~/Code/theme-<cliente>
claude
```

> Se non hai ancora installato Claude Code: `npm install -g @anthropic-ai/claude-code`

### Step 8.2 — Lancia il prompt Gate 1

Apri `docs/prompt-library.md`, copia il prompt **Gate 1 — Intake e scelta tecnologica**, sostituisci i placeholder con i tuoi valori, incolla in Claude Code.

I valori che ti servono:
- `<nome>` — nome cliente
- `<new_store | redesign | migration>` → `redesign`
- `docs/brief-<cliente>.md` → path al brief compilato da Chiara
- `<URL>` — URL del live store
- `<YYYY-MM-DD>` — data target go-live
- `<N>` — ore stimate (dal contratto)

### Step 8.3 — Review output Claude Code

Claude Code produrrà `docs/intake-<cliente>.md`. Controlla:
- Riassunto brief è accurato?
- Scelta base theme è Dawn (default per redesign)? Se ha proposto Horizon o fork, valuta razionale.
- Lista integrazioni copre tutto quello che hai visto nell'audit?
- Risk register identifica i 2-3 rischi reali (deadline, integrazioni, migrazione)?

Se OK, commit:
```bash
git add docs/intake-<cliente>.md
git commit -m "docs: Gate 1 intake completed"
git push
```

### Step 8.4 — Procedi al Gate 2

Stessa modalità: prompt Gate 2 da `prompt-library.md`, Claude Code, review output, commit.

E così via per i gate successivi (3, 4, 5, ...) seguendo il workflow di `WORKING-WITH-CHIARA.md` per coordinazione con Chiara e cliente.

---

## Checklist completamento setup

Quando hai completato tutte le fasi 1-8:

- [ ] Tool locali installati e funzionanti
- [ ] Dev store creato e con tema Dawn pushato
- [ ] Collaborator access al live store cliente ottenuto e verificato
- [ ] Theme Access app creata e token salvato
- [ ] Repo GitHub creato e popolato con bundle Syfer + Dawn
- [ ] Primo commit + push su GitHub fatto
- [ ] CI verde sul primo run
- [ ] Branch protection attiva su main
- [ ] Audit baseline performance del live salvato
- [ ] Inventario integrazioni cliente documentato
- [ ] Inventario contenuti cliente documentato
- [ ] Top URL organici esportati per piano redirect
- [ ] Brief inizializzato, sezioni tue compilate
- [ ] Canale Slack progetto creato e popolato
- [ ] Kickoff con Chiara fatto
- [ ] Claude Code aperto e Gate 1 completato

Se tutte ✅, sei pronto per la build vera. Le settimane 2-4 del workflow sono Gate 5 (build sezioni) ripetuto.

---

## Cosa fare se ti blocchi

| Situazione | Soluzione |
|---|---|
| Cliente non approva collaborator dopo 48h | Telefonata di Giulio. Non bloccare il setup tecnico — fasi 1, 3, 5 puoi farle senza |
| Theme Check fallisce su Dawn vergine | Versione Dawn vecchia. Pulla l'ultima da `https://github.com/Shopify/dawn` |
| Lighthouse CI fallisce su Dawn vergine | Soglia troppo alta per il dev store con test data fittizi. Ammorbidisci temporaneamente `.lighthouserc.json` a P≥50, alza dopo Gate 5 |
| Token `shpat_` non funziona in CI | Ricrealo: l'app Theme Access scade dopo cambi di permessi. Ri-installa l'app, nuovo token |
| Conflitto in `git push` da `theme-source` | Hai dimenticato di rimuovere la cartella. `rm -rf theme-source` e riprova |
| Niko deve essere onboardato sul progetto | Aggiungilo come collaborator del repo GitHub (write access), aggiungilo allo Slack `#cliente-<X>`, fagli leggere `CLAUDE.md` + `WORKING-WITH-CHIARA.md`, mostragli `SETUP-FIRST-PROJECT.md` |

---

## Tempo totale stimato

| Fase | Min | Max |
|---|---|---|
| Fase 1 | 10 min | 30 min |
| Fase 2 | 20 min | 60 min (dipende dal cliente) |
| Fase 3 | 20 min | 30 min |
| Fase 4 | 30 min | 45 min |
| Fase 5 | 15 min | 30 min |
| Fase 6 | 60 min | 90 min |
| Fase 7 | 60 min | 90 min |
| Fase 8 | 30 min | 60 min |
| **Totale attivo** | **3h 45min** | **7h 15min** |

Da spalmare su 1-2 giornate. La Fase 2 ha tempi di attesa cliente non eliminabili.
