# CLAUDE.md — deblandeau.com

Project instructions for Claude Code. Read this IN FULL before every session,
before touching any file. Every prompt must name the tier of every file it edits.

## Business
**DeBlandeau Medical Aesthetic and Wellness, PLLC** — NP-owned medical weight loss
& aesthetics. Provider: **Daphne Matthews, NP**. Near Boston, MA.
- Always use the FULL legal name **with the comma**: "DeBlandeau Medical Aesthetic and Wellness, PLLC"
  in titles, footers, copyright, schema, and legal text.
- Live URL: https://deblandeau.com
- Repo: https://github.com/stivensp44-star/deblandeau (branch: `main`)
- Local working copy: `C:\Users\Administrator\Documents\deblandeau`

## Live contact details (do not placeholder these again)
- Address: Boston, MA — city-only, site-wide (street address withheld until a
  definitive location is set; client request, Sep 2026). The contact.html map
  iframe is removed with a restore-marker comment; restore map + full address
  everywhere only on the client's confirmed address.
- Phone: (857) 379-4287  → `tel:+18573794287`
- Email: deblandeaumed@gmail.com

---------------------------------------------------------------------------
## LOCK ZONE  (read before every edit)
---------------------------------------------------------------------------
Nothing in the lock zone changes without Stivo's explicit, per-change approval
naming the item. "Fix it" / "clean up" / "refactor" is NOT approval to touch it.
If a task appears to require a lock-zone change: STOP, report, wait.

### Tier 1 registry — hash-locked files
Hashes are SHA-256 (first 16 hex chars) of the Windows working copy, recorded
2026-10-06 at main @ e42cdb5. Check: PowerShell
`(Get-FileHash <file> -Algorithm SHA256).Hash.Substring(0,16)`.
A mismatch at session start = someone changed a locked file → STOP and report.
When an approved Tier 1 change ships, update its hash here in the same commit.

| File | SHA-256 (16) | Why it is locked |
|---|---|---|
| `main.js` | `769004AA88C5C19D` | Formspree AJAX submit + guard; nav/reveal logic |
| `.htaccess` | `2190C3487F22748B` | Only copy (none server-side); blocks `*.md` from the web |
| `assets/favicon.svg` | `8A48D1BE0E2F73E5` | Brand mark; hardcoded hexes are the one allowed exception |

### Tier 1 — locked regions (verified by invariant counts, not hashes)
| Region | Where | Invariant (must stay exactly) |
|---|---|---|
| `:root` palette block | style.css | SHA-256(16) of the `:root {…}` block = `606f0b91a4add5c4` |
| Formspree forms | booking.html, contact.html | `xzepodjv` = 1 in each; 0 elsewhere; never `xykqvdaw` (YEV) |
| Dropdown value | booking.html | `<option value="botox">Neuromodulators</option>` — intentional internal value, leave it |
| Zanda booking links | all 8 pages | `appointment-booking` counts: index 6, services 8, about 6, faq 6, contact 4, booking 3, privacy 2, terms 2 (= 37) |
| Logo lockup | all 8 pages | `class="logo-name"` = 14 total (2 per page, 1 on privacy/terms); text `eblandeau` is intentional |
| Legal entity name | all 8 pages | exact string "DeBlandeau Medical Aesthetic and Wellness, PLLC" — never shortened/altered |
| Cache stamps | all 8 pages | `style.css?v=20260912` ×8, `main.js?v=20260821` ×8, `favicon.svg?v=20260820b` ×16 |

### Tier tables
| Tier | Files | Rule |
|---|---|---|
| **1 — Locked** | everything in the two tables above | Explicit per-item approval; diff shown before commit; hash/invariant updated in same commit |
| **2 — Guarded** | `style.css` (outside `:root`), page structure/markup of the 8 HTML pages, `CLAUDE.md` | Staging branch only; Stivo reviews diff before merge; style.css change ⇒ bump `?v=` on all 8 pages |
| **3 — Content** | visible copy inside the 8 pages, `README.md`, `assets/images/` | Staging branch; content-only (no CSS, no endpoints, no structure); merge on Stivo's go |

---------------------------------------------------------------------------
## DOCTRINE
---------------------------------------------------------------------------
1. **Workflow:** Claude (chat) audits and writes the prompt → Claude Code executes
   → independent verification against the LIVE site (curl / re-fetch) → Stivo
   approves merge. Code's self-reported counts are never the proof; raw command
   output is.
2. **Branches:** every change goes to a named staging branch first. Merge to
   `main` only on Stivo's explicit go (push to main = live deploy).
3. **Gates:** every task ends with raw-output gates. Always include the lock-zone
   invariants above. If ANY gate fails: STOP, do not merge, report — never edit a
   locked item to make a gate pass.
4. **One concern per task.** Content edits, infrastructure (forms, endpoints,
   Zanda), and CSS are never bundled in one task.
5. **Client decisions first.** Clinical claims, credentials, pricing, and
   single-provider vs "team" wording are flagged to Daphne BEFORE building.
6. **Anchors come from live pages,** freshly fetched — never from Drive copies.
7. **Inline styles hide bugs** — when diagnosing layout, grep both style.css and
   `style=""` attributes in the HTML.

## Content rulings (standing)
- **No injectable brand names anywhere on the site** (Sep 12, 2026 — trademark
  concern): never "Botox", "Dysport", Juvéderm, etc. Use "Neuromodulators" /
  "dermal fillers". Only exception: the internal `value="botox"` above.
- Credential: site currently shows "FNP-C" (about.html credential tag,
  index.html bio + tag) and "NP" in headings — FNP vs FNP-C still to be confirmed
  against her license. Do not change either until Daphne confirms.
- No stock photos (owner decision). No fake testimonials.

## Tech & deploy
- Pure HTML / CSS / JS — zero frameworks. Flat file structure, all pages at root.
- One stylesheet (`style.css`), one script (`main.js`). No exceptions.
- Deploy: `git push origin main` → Hostinger auto-deploys.
- Hostinger CDN: hPanel "purge" is unreliable for edge cache. If a CSS/JS/asset
  change doesn't appear, bump a versioned URL (e.g. `?v=YYYYMMDD`) rather than
  trusting a purge.
- **Stylesheet cache-bust:** all 8 pages link `style.css?v=20260912`. This is a
  manual version — **bump the date suffix on every `style.css` change** (across
  all pages) so the CDN serves fresh CSS. `main.js` and `assets/favicon.svg`
  are versioned the same way (currently `?v=20260821` / `?v=20260820b`).
  After any bump, update the Cache stamps invariant in the lock zone.
- HTML pages are NOT versioned — if a user reports stale content that the repo
  and live server both show as correct, it's their browser cache (Ctrl+F5).
- `.htaccess` (repo-managed, the only copy) denies `*.md`, so CLAUDE.md /
  README.md return 403 publicly. http→https is platform-level (Hostinger).

## Iron build rules
1. **CSS variables only** — never hardcode a color. All colors live in `:root`.
   For translucent shadows/borders/overlays use `rgba(var(--accent-rgb), …)` or
   `rgba(var(--dark-rgb), …)`.
2. **GitHub is the source of truth.** Commit after every session.
3. Stop and confirm before any git push to `main` — every push to main needs
   explicit user approval (push = live deploy).

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
  which is YEV's LIVE event-submission form in the same Formspree account —
  never reuse it. Same account pattern as refynme.com, but its OWN endpoint,
  never RefynMe's.
- Notifications route to **deblandeaumed@gmail.com** — CLOSED Sep 2026, verified
  by live delivery (Daphne receives them). Any future routing change happens in
  the Formspree DASHBOARD, not code, and is verified only by a real-browser
  submission landing in the inbox.
- If the endpoint is unreachable, the main.js guard shows a graceful
  "email/call us" message.

## Booking — Zanda (live Oct 2026)
- Daphne's own Zanda account (US region, practice "DeBlandeau Medical Aesthetics
  and Wellness, PLLC"). Separate from RefynMe's Zanda — never mix them.
- Client portal: https://clientportal.us.zandahealth.com/clientportal/deblandeaumedicalaestheticsand
- Booking URL used by every CTA:
  `https://clientportal.us.zandahealth.com/clientportal/deblandeaumedicalaestheticsand/appointment-booking`
  with `target="_blank" rel="noopener noreferrer"` — same pattern as refynme.com.
- All 36 former `href="booking.html"` CTAs open Zanda directly. booking.html keeps
  a "Book Online" link (in `#booking-embed-slot`) + the enquiry form as fallback,
  and has NO inbound internal links (direct URL only). The reachable enquiry path
  is contact.html, in every nav.
- Zanda portal settings (set 2026-10-06): Accept Online Bookings ON, Show Forms
  Page ON, Show Upcoming Appointments ON, Allow New Clients to Register ON,
  Client Verification = Email (SMS not available on the account).
- Zanda forms (Tools → Form Designer), all imported 2026-10-06, none visible on
  the portal by default: Neuromodulator Informed Consent, Dermal Filler Informed
  Consent, Medical Weight Loss and GLP-1 Informed Consent, Photo and Video
  Consent, Financial Policy and Cash-Pay Agreement, HIPAA Notice of Privacy
  Practices & Consent, Neuromodulator Initial Assessment, Medical Weight Loss
  Initial Assessment (all prefixed "DeBlandeau - "). Zanda's stock HIPAA form is
  deactivated. Source files + builder: `C:\Users\Administrator\Documents\deblandeau-zanda`.
- If a Book button ever shows Zanda's "not available for this practice" page,
  the cause is the portal setting, not the site — check Accept Online Bookings.

## Pending from Daphne
- **Zanda services:** portal still offers Zanda's sample services (Initial
  Consultation $120, Standard Consultation $170). Site advertises a FREE
  consult — real service list (name, length, price) needed.
- **Financial Policy blanks** in Zanda: deposit, no-show fee, declined-card fee,
  retail return window, payment methods ([DAPHNE TO SET]).
- **GLP-1 sourcing:** site says "FDA-approved GLP-1 medications"; if she uses
  compounded semaglutide/tirzepatide, that site copy must change.
- **Credential:** FNP vs FNP-C against her license (see Content rulings).
- About bio (3 paragraphs) + credential tags (restore markers are HTML comments
  in index.html + about.html)
- Real testimonials → the whole #testimonials section in index.html is
  commented out; re-enable it only when real names/locations exist
- Business hours — interim copy everywhere is "By appointment only"; per-day
  rows are preserved as an HTML comment in booking.html
- Professional photos → `assets/images/` holds the referenced filenames; owner
  decision: NO stock photos
- Aesthetics service list (services.html — comment marks the slot)
- Pricing stance; Instagram/Facebook links (social anchors were removed as
  dead — restore markers are comments in each footer)

## See also
`README.md` — fuller file map, color/content checklist, and embed instructions.
