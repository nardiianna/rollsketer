# CLAUDE.md — Shopify Theme Store Converter (Syfer)

## 1. Project mission

This repository converts visual designs (from Figma Make exports, screenshots, or Shopify Theme Store reference links) into **Shopify Theme Store–compliant themes**, ready for submission and resale to merchants.

Two non-negotiable goals drive every decision:

1. **Theme Store eligibility** — every output must pass Shopify's 22 requirement categories on first submission.
2. **Merchant autonomy** — the theme buyer must be able to fully customize the storefront from the theme editor, with **zero code editing** and **zero required apps**.

Anything that compromises either goal is rejected, regardless of how nice it looks.

---

## 2. Critical rules (read first, every time)

### 2.1 Codebase base

- **Use Shopify Skeleton Theme** as the starting codebase. It is the only Shopify-approved base for new Theme Store submissions.
- **Do NOT fork Dawn or Horizon.** Themes derived from Dawn or Horizon are explicitly ineligible.
- Skeleton repo: `https://github.com/shopify/skeleton-theme`
- Initialize with: `shopify theme init --clone-url=https://github.com/Shopify/skeleton-theme`

### 2.2 Uniqueness gate

Before writing any code, confirm with Raoul that the planned theme is **architecturally unique** — not a re-skin. Cosmetic differences (color/typography swaps, spacing tweaks, gradients, shape dividers, animation tweaks) are explicitly insufficient. Reproducing the experience must require structural changes, not setting tweaks.

### 2.3 No app dependencies

The theme must work standalone. No wishlist, no Instagram feed, no appointment booking, no cart-level discount codes that need an external API. If the design Chiara provides shows app-like features, flag it and propose a Shopify-native alternative or remove it.

### 2.4 No deceptive UX

No fake urgency: no fictitious countdown timers, fake stock levels, fake viewer counts, fake "X people just bought this." Auto-rejection from Theme Store.

### 2.5 No external code references

No designer credits in code, no affiliate links, no links to syfer.it or any agency site, no `// Built by` comments. Theme Store submissions must be clean.

---

## 3. Workflow (approval-gate, incremental)

Every conversion follows this sequence. **Stop at each gate** and wait for Raoul's confirmation before proceeding.

### Gate 1 — Input intake
- Identify input type:
  - Figma Make export (URL or zipped code)
  - Existing Shopify Theme Store URL (reference only — never copy code or assets)
  - Static screenshots + brief
- Read brand system: `/.brand/design-tokens.json` if present, otherwise ask
- Output: `docs/intake-{theme-name}.md` summarizing input, target merchant industry, primary visual direction

### Gate 2 — Architecture plan
- Decide unique architectural angle (per Rule 2.2)
- Map design to required template list (see §4)
- Identify section/block decomposition for the main product page (must be block-based)
- Plan section groups for header and footer
- Output: `docs/arch-{theme-name}.md` with template/section/block tree

### Gate 3 — Tokens and design system
- Extract colors from input → minimum 4-color palette (each with foreground)
- Extract typography → map to Shopify font library (no custom fonts)
- Extract spacing scale, radius, shadow → CSS custom properties
- Output: `assets/theme.css` token block + `config/settings_schema.json` color and font settings

### Gate 4 — Skeleton scaffolding
- Generate all required templates (see §4) as JSON with empty section references
- Generate `theme.liquid` layout with section groups for header/footer
- Generate locales (`en.default.json` minimum, `it.json` if requested)
- Run Theme Check, expect 0 errors
- Gate: theme installs on dev store and renders without crashes

### Gate 5 — Section-by-section build
- For each section: build Liquid + schema + preset + locale strings
- After each section: Theme Check + visual diff vs source
- After every 5 sections: Lighthouse audit on the dev store
- Never bulk-generate sections — one at a time, each reviewed

### Gate 6 — Feature completeness pass
- Walk through §5 checklist explicitly
- Each feature: implemented, tested in dev store, ticked off in `docs/checklist-{theme-name}.md`

### Gate 7 — Performance + accessibility audit
- Lighthouse on home, collection, product (desktop + mobile, 6 runs total)
- Required averages: Performance ≥60, Accessibility ≥90
- Theme Check clean
- HTML validation clean

### Gate 8 — Demo store seed
- Real product data, real copy in target industry — no Lorem Ipsum, no "Onboarding Product"
- Bogus Gateway enabled
- All settings configured to match the install state

### Gate 9 — Submission package
- Export theme zip via Shopify CLI
- Generate release notes
- Verify naming rules (1–2 words, <30 chars, no agency name, no "Performance"/"Mobile"/"Sales"/industry names)
- Hand off to Raoul for Partner Dashboard submission

---

## 4. Required file structure

Skeleton scaffolding must produce exactly this layout. Missing any of these = rejected submission.

```
theme/
├── assets/
│   ├── theme.css                  # tokens + base styles, NO Sass
│   └── theme.js                   # ES6, NOT pre-minified
├── config/
│   ├── settings_data.json
│   └── settings_schema.json       # MUST include theme_info section
├── layout/
│   ├── theme.liquid               # uses {{ content_for_header }}, lang attribute
│   └── password.liquid
├── locales/
│   ├── en.default.json
│   ├── en.default.schema.json
│   └── it.json (optional)
├── sections/
│   ├── header.liquid              # rendered via section_group
│   ├── footer.liquid              # rendered via section_group
│   ├── main-product.liquid        # MUST be block-based
│   ├── main-collection.liquid
│   ├── main-cart.liquid
│   ├── main-search.liquid
│   ├── main-blog.liquid
│   ├── main-article.liquid
│   ├── main-page.liquid
│   ├── main-list-collections.liquid
│   ├── main-404.liquid
│   ├── custom-liquid.liquid       # REQUIRED on all section-supporting templates
│   └── ... (homepage sections: featured-collection, image-banner, etc.)
├── snippets/
│   ├── meta-tags.liquid           # REQUIRED: title + meta desc + canonical
│   ├── product-card.liquid
│   ├── icon-{name}.liquid
│   └── ...
├── templates/
│   ├── 404.json                   # REQUIRED
│   ├── article.json               # REQUIRED
│   ├── blog.json                  # REQUIRED
│   ├── cart.json                  # REQUIRED
│   ├── collection.json            # REQUIRED
│   ├── index.json                 # REQUIRED
│   ├── list-collections.json      # REQUIRED
│   ├── page.json                  # REQUIRED
│   ├── page.contact.json          # REQUIRED (alternate template)
│   ├── password.json              # REQUIRED
│   ├── product.json               # REQUIRED
│   ├── search.json                # REQUIRED
│   ├── gift_card.liquid           # REQUIRED (Liquid, not JSON)
│   └── customers/
│       ├── account.json
│       ├── login.json
│       ├── register.json
│       ├── reset_password.json
│       ├── addresses.json
│       └── order.json
├── sections/
│   ├── header-group.json          # section group for header
│   └── footer-group.json          # section group for footer
└── release-notes.md
```

**Do NOT include**: `config/markets.json`, `robots.txt.liquid`, any `.scss` or `.scss.liquid` file, any pre-minified `.css` or `.js`.

---

## 5. Required features checklist

Every theme MUST implement all of these. Tick each in `docs/checklist-{theme-name}.md`.

- [ ] **Sections Everywhere** — every page template uses JSON, sections are reorderable in editor
- [ ] **Custom Liquid section** available on every section-supporting template
- [ ] **Custom Liquid block** available in homepage and main product sections
- [ ] **Header & footer** as section groups (`sections/header-group.json`, `sections/footer-group.json`)
- [ ] **Discounts** displayed in cart, checkout, order (line-item and order-level)
- [ ] **Accelerated checkout buttons** on product + cart pages, enabled by default, brand colors unmodified
- [ ] **Faceted search filtering** on collection + search pages (availability, price, type, vendor, variants)
- [ ] **Gift cards** — `gift_card.liquid` template with QR code (≥120×120px), shop name/logo, Apple Wallet support
- [ ] **Image focal points** — supported via `image_picker` setting
- [ ] **Open Graph + Twitter card tags** + `page_image` for social sharing
- [ ] **Country selector** — multi-currency support per UX guidelines
- [ ] **Language selector** — multi-language support per UX guidelines
- [ ] **Multi-level menus** — nested dropdowns from `linklists`
- [ ] **Newsletter signup form** — uses `customer` form type with marketing consent
- [ ] **Pickup availability** on product page
- [ ] **Related product recommendations** on product page
- [ ] **Complementary product recommendations** on product page
- [ ] **Rich product media** — 3D models, video, YouTube/Vimeo on product template + featured product + quick view
- [ ] **Predictive search** in header search box, plus `templates/search.json`
- [ ] **Selling plans (subscriptions)** — visible in cart and customer order pages
- [ ] **Shop Pay Installments banner** on product page
- [ ] **Unit pricing** on collection, product, cart, customer pages
- [ ] **Variant images** — switching variant updates image
- [ ] **Follow on Shop button** via `login_button` Liquid filter, brand colors unmodified
- [ ] **Swatches** — both hex and image swatches via `swatch.color` and `swatch.image`
- [ ] **`@app` blocks** in main product section and featured product section
- [ ] **Block-based main product section** — title, price, vendor, description, etc. each as separate blocks
- [ ] **Tax-inclusive indication** via `cart.taxes_included` on product and cart pages

---

## 6. Coding standards

### 6.1 Liquid

- Use `{{ routes.root_url }}`, never hardcode `/`
- Use `{{ request.locale.iso_code }}` for `<html lang>`
- Use `{{ canonical_url }}` and the meta-tags snippet for SEO head
- Never modify or parse `{{ content_for_header }}`
- Never hardcode strings — every UI string goes through `{{ 'group.key' | t }}`
- Use `{% liquid %}` tags for multi-line logic to keep templates readable
- Use LiquidDoc comments (`{% doc %} ... {% enddoc %}`) on every snippet and section to document params

### 6.2 CSS

- **No Sass.** Native CSS only. No `.scss` or `.scss.liquid` files.
- Use CSS custom properties for all tokens, declared at `:root` in `assets/theme.css`
- Scope component styles with class prefixes (`.product-card__image`, BEM-style)
- Color references in CSS use `var(--color-foreground)`, never hex literals (the only place hex appears is `settings_schema.json` defaults)
- Use `clamp()` for fluid typography
- Container queries preferred over media queries when supported
- **Do not pre-minify.** Shopify minifies on serve. Pre-minified CSS is rejected (exception: third-party libs).

### 6.3 JavaScript

- ES6 modules, no transpilation, no bundler
- Web Components (custom elements) for interactive UI — no React, Vue, or framework runtime
- Defer all scripts: `<script src="..." defer></script>` or `type="module"`
- Use Shopify's Section Rendering API for cart/variant/filter updates — no manual full-page reloads
- Listen for `shopify:section:load` and `shopify:section:select` events for theme editor compatibility
- **Do not pre-minify ES6.** Shopify minifies ES5 automatically; ES6 is served as-is. Manual minification breaks debugging without speedup.

### 6.4 Images

- Always use `image_url` filter with `width:` parameter and `image_tag` filter for output
- Provide `widths:` array for responsive `srcset`
- Set `sizes` attribute appropriate to layout
- `loading="lazy"` on every below-fold image; first hero image gets `fetchpriority="high"` and no lazy
- Always include `alt` from `image.alt` or merchant-provided value
- Use `image.presentation.focal_point` to honor merchant focal points

Example pattern:
```liquid
{{ product.featured_image | image_url: width: 1500 | image_tag:
   loading: 'lazy',
   widths: '300, 600, 900, 1200, 1500',
   sizes: '(min-width: 768px) 50vw, 100vw',
   alt: product.featured_image.alt
}}
```

### 6.5 Forms

- Always use Shopify's `{% form %}` tags — never manual `<form action>`
- Every input has unique `id`, every label has matching `for`
- Use `aria-describedby` for error messages
- Honor `form.errors` rendering for all form types

---

## 7. Settings schema rules

### 7.1 settings_schema.json structure

Required top-level groups in order:
1. `theme_info` (name, version, author, theme_documentation_url, theme_support_url)
2. Logo & favicon (favicon REQUIRED)
3. Colors (minimum 4 schemes, each with background + foreground pair)
4. Typography (`font_picker` for headings + body, with `font_modify` for variants)
5. Layout (page width, spacing scale)
6. Buttons
7. Cards
8. Inputs
9. Media (border radius, ratio defaults)
10. Animations
11. Social media (placeholders left empty)

### 7.2 Color system

- Minimum 4 schemes
- Every background setting paired with foreground setting in same scheme
- All `type: color`
- Default values must achieve 4.5:1 contrast for body, 3:1 for large text and non-text

### 7.3 Font picker

```json
{
  "type": "font_picker",
  "id": "type_body_font",
  "default": "assistant_n4",
  "label": "t:settings_schema.typography.body_font.label"
}
```

Then in CSS via Liquid:
```liquid
{{ settings.type_body_font | font_face: font_display: 'swap' }}
{{ settings.type_body_font | font_modify: 'weight', 'bold' | font_face: font_display: 'swap' }}
```

Custom fonts are rejected. Use only the [Shopify font library](https://shopify.dev/docs/storefronts/themes/architecture/settings/fonts).

---

## 8. Terminology and copy rules

These are auto-rejection triggers in review. Hardcoded into our locale files.

### 8.1 Use these terms (not the alternatives)

| Use | Don't use |
|---|---|
| home page | homepage |
| top bar | meta-nav, search bar |
| bottom bar | below footer, legal |
| slideshow | slider |
| heading | title |
| subheading | sub-heading |
| body text | main text |
| signup | sign-up, sign up |
| favicon | shortcut icon |
| sidebar | side bar |
| button label | button name |
| social media | social, social sharing |
| social media icons | social media buttons |
| navigation | menus, menu |
| main menu | navigation, menu |
| cart type (drawer/page/modal) | Ajax, Ajaxify |
| .png | PNG, png, .PNG |

### 8.2 Verb conventions

- **use** — for actions with a next step (e.g., upload). "Use a custom logo"
- **show** — for show/hide of basic elements. "Show vendor"
- **enable** — for apps/plugins or significant layout changes. "Enable predictive search"

### 8.3 Style

- Sentence case for all labels, presets, section names
- American English (color, customize, organize, gray, catalog, dialog)
- No ampersands (`&`)
- Declarative, not interrogative ("Use a custom logo", not "Use a custom logo?")
- Active voice
- Buttons start with verbs
- Image size format: `1200 x 300px .jpg recommended`

---

## 9. Performance budget

Required Lighthouse averages across home, collection, product, on desktop AND mobile, against benchmark dataset:

- **Performance ≥ 60**
- **Accessibility ≥ 90**

To stay above these in real Shopify conditions:

- Critical CSS inline in `theme.liquid` `<head>` (extract from `assets/theme.css` for above-fold)
- All other CSS via `{{ 'theme.css' | asset_url | stylesheet_tag: preload: true }}`
- JS deferred or `type="module"`, never blocking
- No web fonts beyond what `font_picker` produces (Shopify-served fonts are pre-optimized)
- Hero image: `fetchpriority="high"`, no lazy, explicit width/height to prevent CLS
- Below-fold images: `loading="lazy"`, explicit width/height
- No layout-shift inducing animations on first paint
- Predictive search results lazy-loaded via Section Rendering API
- Filter changes use Section Rendering API, not full page reload
- Carousel libraries: only Splide or Embla — never jQuery-based, never Slick
- Total external script budget: 0 (apart from Shopify-provided)

After every 5 sections built, run:
```bash
shopify theme dev --store={dev-store}
# Then in another terminal:
npx lighthouse https://{dev-store}.myshopify.com --view --preset=desktop
npx lighthouse https://{dev-store}.myshopify.com --view --form-factor=mobile
```

---

## 10. Accessibility budget

WCAG 2.2 AA, validated by Lighthouse a11y ≥ 90 AND manual checks:

- Every page fully keyboard-navigable, including dropdowns and modals
- Visible focus state on every focusable element (`:focus-visible` styled, never `outline: none` without replacement)
- Focus order matches DOM order (top→bottom, left→right)
- Touch targets ≥ 24×24 CSS pixels
- All images have `alt` (decorative: `alt=""`)
- All form inputs have associated `<label for="">` matching `id`
- All headings `h1`–`h6` visually distinct
- Body contrast 4.5:1; large text and UI elements 3:1
- Valid HTML (run `html-validate` in CI)
- ARIA used only when native HTML insufficient — prefer native `<button>`, `<dialog>`, `<details>`
- Skip-to-content link as first focusable element
- Live regions (`aria-live="polite"`) for cart updates and form errors

---

## 11. SEO requirements

- `snippets/meta-tags.liquid` outputs title, meta description, canonical for every template
- Schema.org Product structured data on product pages (Shopify rich snippets format)
- Schema.org BreadcrumbList on collection and product pages
- Schema.org Organization in layout
- Open Graph tags: `og:title`, `og:description`, `og:image` (from `page_image`), `og:url`, `og:type`
- Twitter card tags: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- **Never include `templates/robots.txt.liquid`** — Shopify handles robots.txt at platform level
- `<html lang="{{ request.locale.iso_code }}">`
- Canonical URLs use `{{ canonical_url }}`
- Pagination uses `rel="prev"` and `rel="next"` headers via `paginate` tag

---

## 12. Localization

- All UI strings in `locales/en.default.json` (required)
- Schema labels in `locales/en.default.schema.json` (required)
- Italian translations in `locales/it.json` if Chiara provides
- Reference in Liquid: `{{ 'sections.cart.title' | t }}`
- Reference in schema: `"label": "t:settings_schema.colors.label"`
- Country and language selectors use `localization.available_countries` and `localization.available_languages`

---

## 13. Anti-patterns (instant rejection)

Things that will get the theme rejected from Theme Store review or fail merchant autonomy:

- ❌ Forking Dawn or Horizon
- ❌ Sass / SCSS files
- ❌ Pre-minified CSS or non-third-party JS
- ❌ Inline styles in Liquid templates (use class + CSS var)
- ❌ Hardcoded colors, fonts, or strings
- ❌ jQuery or any framework runtime
- ❌ `localStorage` or `sessionStorage` for cart state — use Shopify cart API
- ❌ External scripts (no Google Fonts, no CDN libraries except approved ones)
- ❌ App-dependent features (wishlist, IG feed, etc.)
- ❌ Fake urgency UI (countdown timers without real data, fake stock counts)
- ❌ Hardcoded shop name or merchant content in Liquid (always via settings or `shop` object)
- ❌ Designer credits, agency links, affiliate links
- ❌ `robots.txt.liquid`
- ❌ `config/markets.json` in submission
- ❌ Custom fonts (only Shopify font library)
- ❌ JS that interferes with theme editor or Shopify admin
- ❌ Lorem Ipsum or onboarding placeholder text in defaults
- ❌ Numbered options ("Option 1, Option 2") instead of descriptive labels
- ❌ Long preset/theme names (>30 chars, >2 words, includes industry name)

---

## 14. Prompt templates for Claude Code

Use these as the starting prompt for each Gate. Customize in angle brackets.

### 14.1 Section conversion (Gate 5)

```
Build the section `<section-id>.liquid` for this theme.

Source: <screenshot path or Figma Make node id>
Visual reference: <reference URL or attached image>
Target merchant industry: <industry>

Constraints:
- Skeleton-based architecture, Online Store 2.0
- Must support `@app` blocks if applicable per CLAUDE.md §5
- All copy via locales (`{{ '...' | t }}`)
- Schema must include: name (sentence case), tag, class, blocks (typed), settings, presets, default
- Custom Liquid block must be supported
- Default values descriptive, no Lorem Ipsum
- CSS scoped via class prefix `.section-<id>__*`, only CSS custom properties for colors
- ES6 web component if interactivity needed, file at `assets/<id>.js`, deferred load
- After build: run Theme Check, list any warnings, do NOT auto-fix without approval

Output format:
1. `sections/<id>.liquid`
2. `locales/en.default.schema.json` additions
3. `locales/en.default.json` additions
4. `assets/<id>.js` if needed
5. CSS additions to `assets/theme.css`
6. Theme Check report
7. Stop and wait for approval before next section.
```

### 14.2 Performance audit (Gate 7)

```
Run a Lighthouse audit checklist on the current dev store at <store-url>.

For home, collection, product (desktop + mobile):
1. Identify any LCP element with no fetchpriority or that is lazy-loaded
2. Identify any render-blocking script or stylesheet
3. Identify any image without explicit width/height
4. Identify any animation that triggers layout
5. Identify CLS contributors

For each finding:
- File + line reference
- Proposed fix in 1-2 sentences
- Expected delta on Lighthouse score (rough estimate)

Do NOT apply fixes. Output a report at `docs/perf-audit-{date}.md` and stop.
```

### 14.3 Theme Store pre-submission audit

```
Walk the Theme Store requirements checklist in CLAUDE.md §5 and §13.

For each item:
- Status: ✅ implemented / ⚠ partial / ❌ missing
- Evidence: file path or template reference
- For ⚠ and ❌: blocker severity (P0 = rejection / P1 = should fix / P2 = nice to have)

Also verify:
- All required templates exist (§4)
- No anti-patterns (§13)
- Terminology compliance (§8) — grep locales for forbidden terms
- No hardcoded strings outside locales — grep .liquid for non-translation literal strings >3 words

Output: `docs/pre-submission-{theme-name}.md`. Do NOT auto-fix. Stop.
```

---

## 15. Tooling

Required local setup:

```bash
# Shopify CLI (theme dev, push, pull, init)
npm install -g @shopify/cli @shopify/theme

# Theme Check (linter)
# bundled with CLI; run via:
shopify theme check

# Liquid Prettier plugin
npm install --save-dev prettier @shopify/prettier-plugin-liquid

# HTML validate (a11y prerequisite)
npm install --save-dev html-validate

# Lighthouse
npm install --save-dev lighthouse
```

VS Code extensions:
- Shopify Liquid (`Shopify.theme-check-vscode`)
- Liquid (`sissel.shopify-liquid`)

CI must run on every PR:
1. `shopify theme check` (zero errors required)
2. `prettier --check '**/*.liquid'`
3. `html-validate <rendered-pages>`
4. Lighthouse CI against the Theme Store benchmark dataset

---

## 16. Naming conventions

### 16.1 Theme name

- 1–2 words
- < 30 characters
- Noun-based, easy to spell and pronounce
- NOT: "Performance", "Mobile", "Sales", "Fashion", "Electronics" (industry/benefit names rejected)
- NOT: "Syfer", "Vicsam" (company name rejected)
- NOT: "Shopify", "Polaris", "Unite" (Shopify product names rejected)

### 16.2 File and ID naming

- Sections: kebab-case, descriptive purpose: `featured-collection.liquid`, `image-banner.liquid`
- Snippets: kebab-case, prefix with type: `icon-cart.liquid`, `card-product.liquid`
- Block types: snake_case in schema, e.g., `"type": "product_title"`
- CSS classes: BEM with section prefix, e.g., `.featured-collection__title`
- JS web components: kebab-case custom element, prefix with theme name: `<{theme}-cart-drawer>`

---

## 17. Decision log

Append every architectural decision to `docs/decisions.md` with date, decision, alternatives considered, rationale. This protects against rebuilds when team members iterate later.

Template:
```
## YYYY-MM-DD — <decision title>
**Decision:** <one sentence>
**Context:** <why now>
**Alternatives considered:** <bullet list>
**Rationale:** <why this option>
**Consequences:** <expected and accepted trade-offs>
```

---

## 18. References

- Shopify Themes overview: https://shopify.dev/docs/storefronts/themes
- Theme Store requirements: https://shopify.dev/docs/storefronts/themes/store/requirements
- Skeleton theme: https://github.com/Shopify/skeleton-theme
- Liquid reference: https://shopify.dev/docs/api/liquid
- Theme architecture: https://shopify.dev/docs/storefronts/themes/architecture
- Best practices: https://shopify.dev/docs/storefronts/themes/best-practices
- Section Rendering API: https://shopify.dev/docs/api/ajax/section-rendering
- Performance best practices: https://shopify.dev/docs/storefronts/themes/best-practices/performance
- Accessibility best practices: https://shopify.dev/docs/storefronts/themes/best-practices/accessibility
- Available fonts: https://shopify.dev/docs/storefronts/themes/architecture/settings/fonts
- Liquid code examples: https://shopify.github.io/liquid-code-examples/

---

## 19. Open questions for Raoul

Whenever any of these is unclear at start of a project, **stop and ask** before scaffolding:

1. Is this theme intended for Theme Store submission, or for a single client install?
   (Different rules. Single-client allows Dawn/Horizon fork, custom fonts, app dependencies.)
2. Target merchant industry and catalog size (small / medium / large)?
3. One preset or multiple presets in the same theme?
4. Languages required at launch (en only, en+it, more)?
5. Reference Theme Store theme link from Chiara — is it inspiration only, or is there a specific feature to replicate? (Replicating wholesale will fail uniqueness review.)
6. Brand system source: existing Syfer tokens, client-provided, or extracted from Figma Make?
