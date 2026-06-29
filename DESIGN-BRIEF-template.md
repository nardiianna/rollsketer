# Design Brief — `<theme-name>`

> **Who fills this:** the designer/marketer driving Claude Design (typically Chiara at Syfer).
> **When:** after the visual direction is locked in Claude Design and before handing off to Claude Code.
> **What it produces:** the structured input for Gate 1 (Intake) of `docs/prompt-library.md`.
>
> **How to fill it:** copy this file as `docs/brief-<theme-name>.md`, work through each section. You can write content in Italian or English — Claude Code reads both. Keep field **labels** in English (they're parsed). When in doubt, write more rather than less: extra context never hurts, missing context costs days.
>
> **Sign-off path:** Chiara fills sections 1–14, marks ready in 15. Raoul reviews and approves in 15. Only then does work move to Claude Code Gate 1.

---

## 1. Project metadata

| Field | Value |
|---|---|
| Theme working name | `<e.g., Aurora — placeholder, can change at submission>` |
| Project type | `Theme Store submission` / `Single client install` |
| Single client (if applicable) | `<client name>` |
| Target submission date | `YYYY-MM-DD` |
| Estimated build time | `<N weeks>` |
| Brief author | `<name>` |
| Brief completion date | `YYYY-MM-DD` |
| Brief version | `v1` |

> ⚠ **Project type matters.** Theme Store rules are stricter (Skeleton base only, no custom fonts, no app dependencies, etc.). Single-client builds can break those rules. If you're not sure, ask Raoul before continuing.

---

## 2. Source materials

### 2.1 Primary visual source

- [ ] Figma Make export
  - **Link / file path:** `<URL or path>`
  - **Notes:** `<any context Chiara wants the dev to know about the export>`

- [ ] Existing Shopify theme as inspiration (NOT to copy)
  - **Reference URLs:** `<theme.shopify.com/... links>`
  - **What to draw from each:** `<e.g., Theme A: navigation pattern. Theme B: product card density.>`
  - **What NOT to copy:** `<e.g., Theme A's hero — too similar to ours would fail uniqueness>`

- [ ] Other (screenshots, sketches, brand book)
  - **Files attached at:** `<path>`

### 2.2 Brand assets (if existing brand)

| Asset | Provided? | Location |
|---|---|---|
| Logo (vector + raster) | Y / N | `<path>` |
| Brand palette | Y / N | `<path or hex list>` |
| Typography pair | Y / N | `<font names + license proof>` |
| Photography style guide | Y / N | `<path>` |
| Voice & tone document | Y / N | `<path>` |

### 2.3 Mood references

> Pinterest boards, dribbble shots, magazine spreads, anything that captures the vibe. List 3–8 references with one-line description of what each contributes.

- `<reference 1 URL>` — `<what it contributes>`
- `<reference 2 URL>` — `<what it contributes>`
- `<reference 3 URL>` — `<what it contributes>`

### 2.4 Anti-references

> Themes / sites that look like what we DON'T want, even if superficially similar. Helps the dev avoid lazy convergence.

- `<URL>` — `<why we want to be different from this>`

---

## 3. Target merchant profile

| Field | Value |
|---|---|
| Specific industry | `<e.g., artisan ceramics, not "home goods">` |
| Sub-niche | `<e.g., functional tableware for modern dining>` |
| Catalog size | `Small (≤50)` / `Medium (50–500)` / `Large (500+)` |
| Average price point | `<e.g., €40–€180>` |
| SKU complexity | `<simple / variants by size / variants by size+color / configurable>` |
| Customer demographic | `<e.g., 28–45, design-conscious, urban, repeat-buyer profile>` |
| Brand voice | `<3 adjectives, e.g., "warm, considered, unfussy">` |
| Primary shopping use case | `<gift / self-purchase / replenishment / considered purchase / impulse>` |
| Geographies at launch | `<e.g., Italy, EU, UK>` |
| Sells B2B as well? | Y / N — `<details if yes>` |

---

## 4. Architectural angle (uniqueness)

> ⚠ **This is the field that determines Theme Store eligibility.** Cosmetic differentiation (colors, fonts, spacing, gradients, animations) is automatically rejected by Shopify review. Your theme must be **structurally** different — meaning a competitor couldn't replicate it by adjusting another theme's settings.

### 4.1 What makes this theme structurally unique

> Write 1–2 paragraphs. Be specific. Examples of valid structural angles:
> - "Persistent off-canvas mega-menu that becomes a contextual filter on collection pages"
> - "Story-driven product page where editorial blocks alternate with commerce blocks in a single scroll"
> - "Catalog-first homepage where the hero IS a live filtered grid, not a static banner"
> - "Compositional cart that becomes a 3-step journey on mobile with persistent summary"

`<your unique architectural angle here>`

### 4.2 What this theme is NOT

> Useful to write down explicitly to avoid drift during the build.

- This theme is NOT another `<existing theme>`-clone with different colors
- This theme does NOT use `<pattern X>` because `<reason>`
- ...

### 4.3 Why a merchant in `<industry>` would choose this over existing Theme Store options

`<2–3 sentences. Specific, not generic.>`

---

## 5. Visual direction

### 5.1 Mood keywords

> 3–5 words that capture the feeling. Be evocative, not generic. Avoid "modern, clean, minimal" (too vague).

`<e.g., "quiet, weighty, hand-made, slightly imperfect, earthy">`

### 5.2 Color philosophy

| Aspect | Direction |
|---|---|
| Palette character | `<warm-neutral / cool-neutral / saturated / pastel / earthy / monochrome>` |
| Light/dark behavior | `<light-only / dark-only / both with parity>` |
| Accent color usage | `<sparingly only on CTAs / liberally for hierarchy / accent-free>` |
| Forbidden colors | `<e.g., no pure black #000, no neon>` |

### 5.3 Typography philosophy

| Aspect | Direction |
|---|---|
| Heading character | `<serif / sans-serif / display / mono>` |
| Body character | `<serif / sans-serif>` |
| Pairing logic | `<contrast / harmony / mono-family with weight contrast>` |
| Type sizes | `<conservative / dramatic / fluid>` |
| Weight philosophy | `<bold-heavy / light-heavy / balanced>` |

> **Theme Store constraint:** custom fonts are not allowed. Final font choices must come from the [Shopify font library](https://shopify.dev/docs/storefronts/themes/architecture/settings/fonts). If your Figma Make uses a custom font, name the Shopify-library substitute here.

| Role | Figma Make font | Shopify-library substitute |
|---|---|---|
| Heading | `<font>` | `<shopify font>` |
| Body | `<font>` | `<shopify font>` |
| Accent (if used) | `<font>` | `<shopify font>` |

### 5.4 Imagery direction

| Aspect | Direction |
|---|---|
| Photography style | `<editorial / catalog / lifestyle / studio-clean / mixed>` |
| Image treatments | `<none / duotone / grain / vignette / cropped tight>` |
| Aspect ratios | `<e.g., product 4:5, lifestyle 16:9, banner 21:9>` |
| Use of illustrations / icons | `<none / minimal / decorative / functional>` |

### 5.5 Animation philosophy

| Aspect | Direction |
|---|---|
| Page transitions | `<none / subtle fade / scroll-triggered fade-up>` |
| Hover states | `<minimal / moderate / playful>` |
| Loading states | `<skeletons / spinners / progressive blur>` |
| Reduced-motion behavior | `<all animation removed / decorative removed, functional kept>` |

> **Required:** all animations must respect `prefers-reduced-motion`. Specify what stays vs goes when the user has reduced-motion on.

### 5.6 Avoid list

> Things you've seen in other themes that you specifically don't want. Negative space is as important as positive direction.

- `<e.g., parallax scrolling — feels dated>`
- `<e.g., "Add to cart" toast notifications — prefer drawer expansion>`
- ...

---

## 6. Design system tokens

### 6.1 Color schemes (minimum 4)

| Scheme | Background | Text | Heading | Accent | Border | Use case |
|---|---|---|---|---|---|---|
| Primary | `#______` | `#______` | `#______` | `#______` | `#______` | `<e.g., default site>` |
| Inverse | `#______` | `#______` | `#______` | `#______` | `#______` | `<e.g., footer, hero overlay>` |
| Accent 1 | `#______` | `#______` | `#______` | `#______` | `#______` | `<e.g., promo sections>` |
| Accent 2 | `#______` | `#______` | `#______` | `#______` | `#______` | `<e.g., editorial blocks>` |

> ⚠ **Theme Store rule:** every background color setting must have a paired foreground. Body text contrast ≥ 4.5:1. Large text and UI elements ≥ 3:1. Verify in Claude Design before locking — the dev will not chase contrast fixes after handoff.

### 6.2 Typography scale

| Token | Size (mobile) | Size (desktop) | Weight | Line-height | Use |
|---|---|---|---|---|---|
| `display` | | | | | hero headlines |
| `h1` | | | | | page titles |
| `h2` | | | | | section headings |
| `h3` | | | | | subsections |
| `body` | | | | | paragraphs |
| `small` | | | | | captions, meta |
| `eyebrow` | | | | | labels above headings |

### 6.3 Spacing, radius, shadow

| Token | Value | Use |
|---|---|---|
| `space-1` | `<e.g., 4px>` | tight |
| `space-2` | `<e.g., 8px>` | inline |
| `space-3` | `<e.g., 12px>` | between related elements |
| `space-4` | `<e.g., 16px>` | within components |
| `space-5` | `<e.g., 24px>` | between components |
| `space-6` | `<e.g., 32px>` | between sections (mobile) |
| `space-7` | `<e.g., 48px>` | between sections (tablet) |
| `space-8` | `<e.g., 64px>` | between sections (desktop) |
| `radius-sm` | `<e.g., 4px>` | inputs, small cards |
| `radius-md` | `<e.g., 8px>` | buttons, cards |
| `radius-lg` | `<e.g., 16px>` | hero cards, modals |
| `radius-full` | `9999px` | pills, avatars |
| `shadow-sm` | `<CSS value>` | subtle elevation |
| `shadow-md` | `<CSS value>` | dropdowns, cards on hover |
| `shadow-lg` | `<CSS value>` | modals, drawers |

---

## 7. Homepage section inventory

> List the homepage sections in the order they should appear. For each, write what it does, not what it looks like (the dev will get the visuals from Figma Make).

### 7.1 Above-fold strategy

> What's the first thing the visitor sees on mobile, in 1 sentence? `<e.g., "A full-bleed lifestyle hero with one clear CTA, plus a sticky announcement bar above.">`

### 7.2 Section list

| Order | Section name | Purpose | Block types | App block? | Notes |
|---|---|---|---|---|---|
| 1 | `<e.g., announcement-bar>` | `<promote shipping/promo>` | `<text, link>` | Y | `<dismissible>` |
| 2 | `<e.g., header>` | `<navigation, search, cart>` | `<menu, search, cart-icon>` | N | `<sticky on scroll>` |
| 3 | `<e.g., hero-banner>` | `<brand statement + primary CTA>` | `<heading, subheading, button, image>` | N | `<full-bleed mobile, contained desktop>` |
| 4 | ... | | | | |

### 7.3 Special sections worth calling out

> Anything that's unusual or central to the architectural angle. Worth a paragraph each.

`<section name>`: `<what it does, what makes it special, any data/feature dependencies>`

---

## 8. Product page approach

### 8.1 Layout

| Field | Value |
|---|---|
| Gallery position (desktop) | `<left / right / above / split>` |
| Gallery type | `<thumbnails-side / carousel / scrollytelling / grid>` |
| Gallery position (mobile) | `<above / carousel / accordion>` |
| Sticky info column? | Y / N |
| Sticky add-to-cart bar (mobile)? | Y / N |
| Quick view from collection? | Y / N |
| Quick add from collection? | Y / N |

### 8.2 Block order (main product section, top to bottom)

> Theme Store requires every meaningful element to be its own block. List them in order. Add `(custom liquid)` and `(@app)` slots where they should be available.

1. `<e.g., vendor>`
2. `<e.g., title>`
3. `<e.g., rating placeholder (@app slot)>`
4. `<e.g., price>`
5. `<e.g., installments banner — Shop Pay>`
6. `<e.g., variant picker>`
7. `<e.g., quantity selector>`
8. `<e.g., buy buttons>`
9. `<e.g., accelerated checkout buttons>`
10. `<e.g., pickup availability>`
11. `<e.g., short description>`
12. `<e.g., expandable accordion: details, shipping, returns>`
13. `<e.g., share>`
14. `(custom liquid)`
15. `(@app)`

### 8.3 Special product page features

> Industry-specific features that aren't covered by Shopify defaults. The dev needs to know about these early.

- `<e.g., size guide modal — required for fashion>`
- `<e.g., ingredient list with allergen highlights — required for food>`
- `<e.g., 360° viewer — required for furniture>`
- `<e.g., color swatch with hex AND image fallback>`

---

## 9. Other key templates

### 9.1 Collection page

| Field | Value |
|---|---|
| Default grid columns (mobile) | 1 / 2 |
| Default grid columns (desktop) | 2 / 3 / 4 |
| Filter position | `<sidebar / drawer / horizontal pills>` |
| Filter behavior | `<reload / async via Section Rendering API>` |
| Sort options shown | `<list, e.g., featured, price ↑, price ↓, newest>` |
| Pagination type | `<numbered / infinite / load more>` |
| Empty state design notes | `<what to show when filter returns 0>` |

### 9.2 Cart

| Field | Value |
|---|---|
| Cart type | `Drawer` / `Page` / `Modal` |
| Add-to-cart UX | `<drawer slides in / page navigation / toast + drawer>` |
| Editable quantities? | Y / N |
| Cart notes? | Y / N |
| Discount code field? | Y / N (in cart, optional) |
| Free shipping progress bar? | Y / N |
| Cross-sell / upsell? | Y / N — `<rule>` |

### 9.3 Search

| Field | Value |
|---|---|
| Predictive search trigger | `<focus / 2 chars / 3 chars>` |
| Predictive search content | `<products / products + collections / products + collections + articles + pages>` |
| Predictive search layout | `<dropdown / drawer / fullscreen>` |
| Search results page layout | `<grid / list / mixed by object_type>` |

### 9.4 Article / blog

| Field | Value |
|---|---|
| Blog list layout | `<grid / list / featured + grid>` |
| Article layout | `<full-width / contained / contained with sidebar>` |
| Author bio shown? | Y / N |
| Related articles? | Y / N |
| Comments? | Y (Shopify native) / N |

### 9.5 404 / password / gift card

| Template | Notes |
|---|---|
| 404 | `<copy direction, what to link to>` |
| Password page | `<is the merchant in pre-launch mode? what does it look like?>` |
| Gift card | `<note: must include QR code ≥120×120, Apple Wallet support, shop logo>` |

---

## 10. Required Theme Store features — visibility check

> For each, mark whether it's already represented in your Claude Design source, or if it needs to be added during the dev build.

| # | Feature | In source? | Notes |
|---|---|---|---|
| D1 | Discounts (line + order) | ✅ / ❌ | |
| D2 | Accelerated checkout (product + cart) | ✅ / ❌ | |
| D3 | Faceted search filtering | ✅ / ❌ | |
| D4 | Image focal points | ✅ / ❌ | |
| D5 | Social sharing image | ✅ / ❌ | |
| D6 | Country selector | ✅ / ❌ | `<expected markets>` |
| D7 | Language selector | ✅ / ❌ | `<expected languages>` |
| D8 | Multi-level menus | ✅ / ❌ | `<max depth shown>` |
| D9 | Newsletter signup | ✅ / ❌ | |
| D10 | Pickup availability | ✅ / ❌ | |
| D11 | Related products | ✅ / ❌ | |
| D12 | Complementary products | ✅ / ❌ | |
| D13 | Rich product media (3D, video) | ✅ / ❌ | |
| D14 | Predictive search | ✅ / ❌ | |
| D15 | Selling plans (subscriptions) | ✅ / ❌ | |
| D16 | Shop Pay Installments banner | ✅ / ❌ | |
| D17 | Unit pricing | ✅ / ❌ | |
| D18 | Variant images | ✅ / ❌ | |
| D19 | Follow on Shop button | ✅ / ❌ | |
| D20 | Swatches (hex + image) | ✅ / ❌ | |
| D21 | Tax-inclusive indication | ✅ / ❌ | |
| D22 | Sale badge | ✅ / ❌ | |
| D23 | Sort options on collection | ✅ / ❌ | |
| D24 | Pagination/lazy load | ✅ / ❌ | |
| D25 | Empty collection message | ✅ / ❌ | |

> ❌ doesn't mean we drop the feature — it means the dev has to design it during the build using Theme Store conventions. Flag it so it's not forgotten.

---

## 11. Localization plan

| Field | Value |
|---|---|
| Languages at launch | `<e.g., en, it>` |
| Languages added later | `<e.g., fr, de in v1.1>` |
| RTL support needed? | Y / N |
| Currencies expected | `<e.g., EUR, USD, GBP>` |
| Country selector default | `<e.g., shop's primary>` |
| Language selector default | `<e.g., browser locale>` |
| Date format preference | `<DD/MM/YYYY / MM/DD/YYYY / locale-driven>` |

---

## 12. Demo store narrative

> The demo store is what merchants see when they consider buying the theme. Theme Store rejects demos with Lorem Ipsum or generic placeholder content, so we plan it now.

| Field | Value |
|---|---|
| Fictional brand name | `<e.g., Terra & Forma>` |
| Brand backstory (2–3 sentences) | `<...>` |
| Brand voice (3 adjectives) | `<...>` |
| Number of products | `<8–15 small / 30–50 medium / 100+ large>` |
| Number of collections | `<...>` |
| Product imagery source | `<Shopify Burst / client-licensed / commissioned / Unsplash with attribution check>` |
| Number of blog articles | `<3–5>` |
| Number of info pages | `<About, Contact, Shipping, Returns, FAQ>` |

> The dev (or you) will write the actual product/article/page copy at Gate 8. This section is the brief for that work, not the work itself.

---

## 13. Open questions / risks

> Things you ran into during Claude Design that you couldn't decide on. Listing them here gets them addressed before the dev starts building.

- `<e.g., "I'm torn between sticky add-to-cart and fixed buy bar on mobile — need Raoul's call">`
- `<e.g., "Custom font in Figma Make has no perfect Shopify substitute — need to choose between Inter and Assistant">`
- `<e.g., "The hero animation might hurt LCP — need dev to validate feasibility within Lighthouse budget">`

---

## 14. Handoff package contents

> Everything Claude Code needs at Gate 1, listed explicitly so nothing is missed.

| File / asset | Location | Notes |
|---|---|---|
| This brief | `docs/brief-<theme-name>.md` | |
| Claude Design handoff bundle | `<path>` | Exported from Claude Design via "Handoff" → "Bundle" |
| Claude Design URL (for live reference) | `<URL>` | Read access for the dev |
| Figma Make export (if separate) | `<path>` | |
| Brand assets bundle | `<path>` | Logo SVG/PNG, color tokens, font licenses |
| Reference theme links | (in §2.1) | Inspiration only — never to copy |
| Mood references | (in §2.3) | |
| Industry research notes | `<path or N/A>` | |

---

## 15. Sign-off

### 15.1 Designer ready for handoff

- [ ] All sections filled to the best of my knowledge
- [ ] Open questions documented in §13
- [ ] Handoff package files all exist at the listed paths
- [ ] I've reviewed the architectural angle (§4) and confirm it's structural, not cosmetic
- [ ] Theme Store features (§10) all marked

**Designer:** `<name>`
**Date:** `YYYY-MM-DD`
**Status:** 🚧 Drafting / 🟡 Ready for review / 🟢 Ready for handoff

### 15.2 Lead approval

- [ ] Architectural angle is genuinely unique (not at risk of Theme Store uniqueness rejection)
- [ ] Open questions either answered or punted to a clear later gate
- [ ] Scope is realistic vs target submission date
- [ ] Cleared to start Claude Code Gate 1

**Approver:** `<name>`
**Date:** `YYYY-MM-DD`
**Status:** ⛔ Blocked / 🟡 Conditional / 🟢 Approved
**Conditions / notes:** `<...>`

---

## Appendix — quick reminders for Chiara

> Things that get forgotten and cause rework.

- **Don't copy a Theme Store theme structurally.** Inspiration ≠ replication. Section 4 is the gate for this.
- **Custom fonts won't ship.** If your Figma Make uses one, pick the closest Shopify-library substitute now (§5.3) — don't leave it for the dev to guess.
- **Every background color needs a paired foreground.** And the contrast must be ≥ 4.5:1 for body text. Check in Claude Design before locking the palette.
- **App-like features need a Shopify-native plan.** Wishlist, Instagram feed, fake countdowns, fake stock counters — all auto-rejected. If you saw one in a reference theme, it was probably an installed app, not the theme.
- **Demo content is part of the theme.** Real product names, real descriptions, real imagery rights. Plan it in §12 — don't wait until submission week.
- **Open questions are not weakness.** Listing them in §13 is faster than guessing wrong and rebuilding later.
