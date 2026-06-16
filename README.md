# Schwarze Beton — House of Steam Shopify Theme

Custom Shopify theme for [houseofsteam.store](https://houseofsteam.store).  
Built on Dawn (Online Store 2.0). Design system: `branding/DESIGN-SYSTEM.md`.

---

## Local development

```bash
cd schwarze-beton
shopify theme dev --theme 201484534105
```

## Push to draft theme

```bash
shopify theme push --theme 201484534105
```

Never publish — the theme stays as a **Draft** until Task 15 QA passes.

---

## Build phases

| Phase | Status | Description |
|---|---|---|
| P0 | Done | Design tokens, fonts, favicon |
| P1 | Done | Header, sticky nav, footer |
| P2 | Done | Mega menu + in-menu promo tiles |
| P3 | Done | Homepage sections |
| P11 | Done | Before/After comparison slider |

---

## How to add a mega menu promo tile

A promo tile is an image + heading + CTA button that appears as the rightmost column inside any mega menu panel. It is configured entirely in the Shopify Theme Editor — no code needed.

**Steps:**

1. Go to **Shopify Admin → Online Store → Themes → schwarze-beton → Customize**.
2. Click **Header** in the section list on the left.
3. Scroll down to the **Blocks** area and click **Add block**.
4. Choose **Mega menu promo tile**.
5. Fill in the block settings:

   | Field | What to enter |
   |---|---|
   | **Parent menu handle** | The handle of the top-level nav item this promo belongs to. Find it in **Admin → Navigation → Main menu** — hover over a menu item and copy the slug from the URL, e.g. `dresses` or `new-arrivals`. It must match exactly (lowercase, hyphens). |
   | **Promo image** | Upload or select an image. Recommended size: 480 × 600 px. |
   | **Promo heading** | Short headline shown below the image, e.g. `Neue Kollektion`. |
   | **CTA button label** | Button text, e.g. `Jetzt ansehen`. |
   | **Promo link** | URL the entire tile links to (collection, product, or page). |

6. Click **Save**.

The tile will appear the next time a visitor hovers over that top-level nav item on desktop.

**Notes:**
- Each top-level menu item can have at most one promo tile. If you add two blocks pointing to the same handle, only the first one renders.
- On mobile the mega menu is hidden — the slide-in drawer is used instead, so the promo tile does not appear on mobile.
- Leave the **Promo image** field empty to hide the tile without deleting the block.

---

## How to use the Before / After comparison slider

A Prestige-style draggable slider that reveals a "Vorher" (before) and "Nachher" (after) image side by side. The divider is draggable by mouse and touch, and moveable by keyboard arrow keys.

### Image requirements

| Property | Recommended |
|---|---|
| **Size** | 1600 × 900 px (16:9) |
| **Minimum** | 800 × 450 px |
| **Format** | JPEG, 80–85% quality |
| **Critical** | Both images must be the **same dimensions and crop** — otherwise the subject shifts when dragging |

### Option A — Standalone homepage section

1. Go to **Shopify Admin → Online Store → Themes → Customize**.
2. Make sure the **Home page** template is selected (top dropdown).
3. In the left sidebar click **+ Add section**.
4. Search for **Before / After** and click it.
5. Configure the block settings:

   | Field | Description |
   |---|---|
   | **Eyebrow text** | Small label above the heading, e.g. `Vergleich` |
   | **Heading** | Optional section heading |
   | **Before image (Vorher)** | The "before" image — appears on the left of the divider |
   | **After image (Nachher)** | The "after" image — appears on the right of the divider |
   | **Before label** | Text shown in the bottom-left corner, default `Vorher` |
   | **After label** | Text shown in the bottom-right corner, default `Nachher` |
   | **Initial divider position** | Where the divider starts (10–90%), default 50% |

6. Click **Save**. Drag the divider in the customizer preview to test it.

### Option B — Block on the product page (PDP)

1. Go to **Shopify Admin → Online Store → Themes → Customize**.
2. Navigate to any **Product** page.
3. Click **Product** in the section list on the left.
4. Scroll to **Blocks** and click **Add block → Before / After Slider**.
5. Upload your before and after images (same settings as above).
6. Click **Save**.

**Metaobject shortcut:** If a product has a `hos.before_after` metafield referencing a metaobject with `before_image` and `after_image` fields, the slider will use those automatically — no block image upload needed.

### Files

| File | Purpose |
|---|---|
| `sections/before-after.liquid` | Standalone homepage section |
| `snippets/before-after-slider.liquid` | Shared slider HTML (used by both contexts) |
| `assets/before-after.js` | Drag, touch, and keyboard interaction |
| `assets/section-before-after.css` | Slider styles |

---

## Design rules (never break)

- Zero `border-radius` everywhere
- No `#ffffff` — use `--parchment` (`#e4ddd3`) for light text
- Red (`--schrei` `#b8301f`) only on CTAs, prices, hover states
- Fonts: **Cinzel Decorative** (display) · **Cinzel** (UI) · **Barlow** (body)
- All content dynamic via Shopify Liquid — nothing hardcoded
