# CLAUDE.md — deblandeau.com

Project instructions for Claude Code. Read this before every session.

## Business
**DeBlandeau Medical Aesthetic and Wellness, PLLC** — NP-owned medical weight loss
& aesthetics. Provider: **Daphne Matthews, NP**. Near Boston, MA.
- Always use the FULL legal name **with the comma**: "DeBlandeau Medical Aesthetic and Wellness, PLLC"
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
- **Stylesheet cache-bust:** all 8 pages link `style.css?v=20260820b`. This is a
  manual version — **bump the date suffix on every `style.css` change** (across
  all pages) so the CDN serves fresh CSS. `main.js` and `assets/favicon.svg`
  are versioned the same way (currently `?v=20260820c` / `?v=20260820b`).
- HTML pages are NOT versioned — if a user reports stale content that the repo
  and live server both show as correct, it's their browser cache (Ctrl+F5).

## Iron build rules
1. **CSS variables only** — never hardcode a color. All colors live in `:root`.
   For translucent shadows/borders/overlays use `rgba(var(--accent-rgb), …)` or
   `rgba(var(--dark-rgb), …)`.
2. **GitHub is the source of truth.** Commit after every session.
3. Stop and confirm before any git push — every push needs explicit user
   approval (push = live deploy).

## Current palette — Natural Wellness Luxury (in `:root`)
Updated June 17, 2026 — client-approved color rebrand. Real token names below
(do NOT rename to `--color-*`); fonts unchanged (Cormorant Garamond + Inter).
```
--bg #F6F2EC (Warm Ivory)   --surface #FFFFFF (White)   --white #FFFFFF
--dark #2C2F33 (Charcoal)   --dark-light #3D4147 (Charcoal, lighter)
--accent #D4AF37 (Bright Gold — revalued 2026-08-20 from board #C9A66A for contrast)
--accent-soft rgba(var(--accent-rgb),0.12) (Gold tint)   --accent-deep #8FA18F (Sage Leaf)
--accent-ink #8C6522 (Bronze Gold — gold TEXT on light bgs: 4.71:1 on --bg)
--accent-text var(--accent-ink) (cascading: dark containers re-set it to --accent)
--text #2C2F33 (Charcoal)   --text-muted #56595D (Charcoal +42/channel)   --text-light #FFFFFF (unused)
--border #E4DDD3 (Light Taupe)   --taupe #B9AA97 (Taupe — decorative/border only, never text)
--shadow rgba(44,47,51,0.08)   --accent-rgb 212,175,55   --dark-rgb 44,47,51
```
Contrast repair 2026-08-20 (owner-approved): `--text-muted` revalued Taupe→#56595D
(Taupe was 2.03:1 on --bg; #56595D is 6.31:1 on --bg / 7.04:1 on --surface, WCAG AA).
Taupe stays in the palette as `--taupe` for decorative/border use — never body text.
Button text on gold/sage (`.btn-primary`, its hover, `.btn-outline:hover`) is
`var(--dark)`, not white (white on gold was 2.30:1). The five brand-board swatches
themselves are unchanged.
Typography: Cormorant Garamond (display) + Inter (body), loaded via
`<link rel="preload"/stylesheet">` in each `<head>` — NOT `@import` in CSS.

Palette source of truth: the client brand board (IMG_5753.jpeg, board tagline
"Refined Care. Elevated Confidence."). Its five swatches ARE the tokens above —
never re-derive or re-swap colors from it.

## Logo & wordmark lockup (applied 2026-07-04, live @ 4c6c51b)
- The brand mark (brushed-gold serif "D" + 6-leaf sage sprig) is an **inline
  SVG recreation** of the brand-board monogram, using `var(--accent)` /
  `var(--accent-deep)`. It appears in all 14 lockups (8 navbars + 6 footer
  brands) and in `assets/favicon.svg` (hardcoded hexes there — favicon is a
  standalone file, the one allowed exception to the no-hardcoding rule).
- **`<span class="logo-name">eblandeau</span>` is INTENTIONAL, not a typo.**
  The SVG mark is the "D"; CSS uppercases the rest so the lockup reads
  DEBLANDEAU as one word. Full business name lives in each anchor's
  `aria-label` for assistive tech. Never "fix" this text.
- Lockup mechanics (style.css): `.nav-logo` uses `align-items: baseline`;
  `.logo-mark` is 48px (nav) / 56px (footer) with `margin-right: -0.35rem`
  (D glyph stops short of its viewBox edge) and `position: relative;
  top: 10px/11px` (= 13/64 of height, the gap between the D-glyph baseline
  y=51 and the svg bottom) so the D's foot sits on EBLANDEAU's baseline.
  Hover pops the mark to `scale(1.15)`.
- If the client ever sends an official vector logo export, it replaces the
  recreated mark as a straight swap.

## Forms (booking.html + contact.html)
- POST to Formspree via `fetch` in `main.js` (AJAX — user stays on the page);
  success check is Formspree's `data.ok`. Hidden `_subject` per form tells
  enquiries apart. Honeypot field is Formspree's `_gotcha`.
- **LIVE endpoint: `https://formspree.io/f/xzepodjv`** — both form `action`s
  (booking.html + contact.html), FIX 18 2026-08-21. Supersedes `xykqvdaw`,
  which is YEV's LIVE event-submission form in the same Formspree account
  ("A New Form" in the dashboard, pending rename to "YEV") — never reuse it.
  Same account pattern as refynme.com, but its OWN form endpoint, never
  RefynMe's. Notifications currently route to **stivensp44@gmail.com
  (TEMP)** pending the client destination swap to deblandeaumed@gmail.com —
  that swap happens in the Formspree DASHBOARD, not code. If the endpoint
  is unreachable, the main.js guard shows a graceful "email/call us"
  message.
- booking.html is an ENQUIRY page (reframed 2026-08-20, FIX 12) — it does NOT
  book appointments. Real scheduling = future HIPAA-compliant platform in
  `#booking-embed-slot`; site-wide "Book a Consultation" CTAs get repointed
  only when that platform is live.

## Pending from Daphne (slots cleaned 2026-07-04 — no visible placeholders)
- About bio (3 paragraphs) + credential tags (empty tags were deleted; restore
  markers are HTML comments in index.html + about.html)
- Real testimonials → the whole #testimonials section in index.html is
  commented out; re-enable it only when real names/locations exist
- Business hours — interim copy everywhere is "By appointment only"; per-day
  rows are preserved as an HTML comment in booking.html
- Professional photos → `assets/images/` is EMPTY on purpose (filenames already
  referenced in HTML; owner decision: NO stock photos)
- Aesthetics service list (services.html — comment marks the slot)
- Pricing stance; Instagram/Facebook links (social anchors were removed as
  dead — restore markers are comments in each footer)
- Formspree destination swap — notifications currently go to
  stivensp44@gmail.com (TEMP); switch the `xzepodjv` form's destination to
  deblandeaumed@gmail.com in the Formspree dashboard AFTER verifying that
  address actually receives mail (a previous gmail address bounced 550;
  swept 2026-07-04) — then live-test BOTH forms on the new endpoint and
  confirm receipt before calling it done

## See also
`README.md` — fuller file map, color/content checklist, and embed instructions.
