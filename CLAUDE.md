# CLAUDE.md — deblandeau.com

Project instructions for Claude Code. Read this before every session.

## Business
**Deblandeau Medical Aesthetic and Wellness, PLLC** — NP-owned medical weight loss
& aesthetics. Provider: **Daphnee Matthew, NP**. Near Boston, MA.
- Always use the FULL legal name **with the comma**: "Deblandeau Medical Aesthetic and Wellness, PLLC"
  in titles, footers, copyright, schema, and legal text.
- Live URL: https://deblandeau.com
- Repo: https://github.com/stivensp44-star/deblandeau (branch: `main`)

## Live contact details (do not placeholder these again)
- Address: 90 Chesterfield St, Hyde Park, MA 02136
- Phone: (617) 433-7246  → `tel:+16174337246`
- Email: deblandeaumed@gmail.com

## Tech & deploy
- Pure HTML / CSS / JS — zero frameworks. Flat file structure, all pages at root.
- One stylesheet (`style.css`), one script (`main.js`). No exceptions.
- Deploy: `git push origin main` → Hostinger auto-deploys.
- Hostinger CDN: hPanel "purge" is unreliable for edge cache. If a CSS/JS/asset
  change doesn't appear, bump a versioned URL (e.g. `?v=YYYYMMDD`) rather than
  trusting a purge.

## Iron build rules
1. **CSS variables only** — never hardcode a color. All colors live in `:root`.
   For translucent shadows/borders/overlays use `rgba(var(--accent-rgb), …)` or
   `rgba(var(--dark-rgb), …)`.
2. **GitHub is the source of truth.** Commit after every session.
3. Stop and confirm before any git push (this session was explicitly authorized).

## Current palette — Natural Wellness Luxury (in `:root`)
Updated June 17, 2026 — client-approved color rebrand. Real token names below
(do NOT rename to `--color-*`); fonts unchanged (Cormorant Garamond + Inter).
```
--bg #F6F2EC (Warm Ivory)   --surface #FFFFFF (White)   --white #FFFFFF
--dark #2C2F33 (Charcoal)   --dark-light #3D4147 (Charcoal, lighter)
--accent #C9A66A (Brushed Gold)   --accent-soft rgba(201,166,106,0.12) (Gold tint)
--accent-deep #8FA18F (Sage Leaf)
--text #2C2F33 (Charcoal)   --text-muted #B9AA97 (Taupe)   --text-light #FFFFFF
--border #E4DDD3 (Light Taupe)   --shadow rgba(44,47,51,0.08)
--accent-rgb 201,166,106   --dark-rgb 44,47,51
```
Typography: Cormorant Garamond (display) + Inter (body), loaded via
`<link rel="preload"/stylesheet">` in each `<head>` — NOT `@import` in CSS.

## Forms (booking.html + contact.html)
- POST to Web3Forms via `fetch` in `main.js`; honeypot field `botcheck` for spam.
- **TO ACTIVATE:** replace `REPLACE-WITH-WEB3FORMS-ACCESS-KEY` in both files with a
  real key from https://web3forms.com. Until then forms show a graceful
  "email/call us" message.

## Pending from Daphnee (content still placeholdered)
- About bio (3 paragraphs) + credentials/training
- Real testimonials (names, locations)
- Business hours (footer, contact, booking)
- Professional photos → `assets/images/` (filenames already referenced in HTML)
- Pricing stance; Instagram/Facebook links
- Aesthetics service list (services.html `[Service 1/2/3]`)

## See also
`README.md` — fuller file map, color/content checklist, and embed instructions.
