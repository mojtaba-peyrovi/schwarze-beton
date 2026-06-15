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
| P3 | Next | Homepage sections |

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

## Design rules (never break)

- Zero `border-radius` everywhere
- No `#ffffff` — use `--parchment` (`#e4ddd3`) for light text
- Red (`--schrei` `#b8301f`) only on CTAs, prices, hover states
- Fonts: **Cinzel Decorative** (display) · **Cinzel** (UI) · **Barlow** (body)
- All content dynamic via Shopify Liquid — nothing hardcoded
