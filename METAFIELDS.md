# House of Steam — Metafield & Metaobject Reference

All metafields used across the Schwarze Beton theme. Set these up in **Shopify Admin → Settings → Custom data** before publishing.

---

## Product Metafields

| Namespace.Key | Type | Purpose | Required |
|---|---|---|---|
| `hos.before_after` | Metaobject reference (`hos_before_after`) | Links to a Before/After comparison metaobject used on the PDP slider block | Optional |
| `reviews.rating` | Rating | Star rating value (scale 1–5). Rendered on PDP and product cards. Populated by a reviews app (e.g. Okendo, Judge.me) | Optional |
| `reviews.rating_count` | Integer | Number of reviews. Shown alongside rating stars | Optional |
| `swatches.[color-slug]` | Color | Hex/named colour for a specific variant option slug. Overrides CSS named colours for swatch display | Optional |
| `swatch_images.[color-slug]` | File reference (image) | Swatch image for a variant option slug. Falls back to `swatches.[slug]` colour | Optional |

---

## Customer Metafields

| Namespace.Key | Type | Purpose | Required |
|---|---|---|---|
| `hos.avatar` | File reference (image) | Customer profile avatar shown on the My Account page | Optional |
| `hos.username` | Single-line text | Display name / handle shown on the My Account page | Optional |
| `hos.sizes` | JSON / multi-line text | Saved size preferences for the customer | Optional |
| `hos.location` | Single-line text | Customer's location shown on the My Account page | Optional |

---

## Metaobjects

### `hos_before_after`

Used by the Before/After slider block on the PDP (`sections/main-product.liquid`).

| Field Key | Type | Purpose |
|---|---|---|
| `before_image` | File reference (image) | "Before" state image |
| `after_image` | File reference (image) | "After" state image |

Create entries in **Shopify Admin → Content → Metaobjects → hos_before_after**, then reference each from the relevant product's `hos.before_after` metafield.

---

## Shopify App Metafields (Third-Party)

These are written by app integrations, not set manually:

| Namespace.Key | Source | Notes |
|---|---|---|
| `reviews.rating` | Reviews app (Okendo / Judge.me) | Auto-populated when reviews are submitted |
| `reviews.rating_count` | Reviews app | Auto-populated |

---

## Required Shopify Menus

Set up in **Shopify Admin → Online Store → Navigation**:

| Menu handle | Purpose | Expected top-level items |
|---|---|---|
| `main-menu` | Primary navigation in header | Collections, Lookbook, About, Journal |
| `footer-shop` | Footer — shop links column | All categories / collections |
| `footer-info` | Footer — info column | About, Sustainability, Size Guide, FAQ |
| `footer-legal` | Footer — legal column | Privacy Policy, Terms of Service, Imprint |

---

*Last updated: Phase 14 — generated from theme source scan (2026-06-16).*
