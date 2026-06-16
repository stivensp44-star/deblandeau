# deblandeau.com — Project README

## Client
**Deblandeau Medical Aesthetic and Wellness, PLLC**
Provider: **Daphnee Matthew, NP** — Medical Weight Loss & Aesthetics
Near Boston, MA (town TBD)
> Use the FULL legal name "Deblandeau Medical Aesthetic and Wellness, PLLC" (with comma) in titles, footers, schema, and legal text.
Built by: Pierre Louis Ent LLC (Stivo)

## Live URL
https://deblandeau.com

## GitHub Repo
`deblandeau` (private)

## Local Path
`C:\Users\Administrator\Documents\deblandeau`
⚠️ Confirm this path before running ANY Claude Code command.

## Tech Stack
- Pure HTML / CSS / JavaScript — zero frameworks
- Hosted on Hostinger
- Deploy: `git push origin main` → Hostinger auto-deploys

---

## IRON BUILD RULES — READ BEFORE EVERY SESSION

1. **CSS NO-TOUCH RULE**: Every Claude Code prompt MUST begin with:
   > "CRITICAL — DO NOT TOUCH ANY CSS, COLORS, OR STYLING WHATSOEVER."

2. **GitHub is single source of truth.** Commit after every session.

3. **CSS variables ONLY.** Never hardcode a color anywhere. All colors live in `:root` in `style.css`.

4. **One stylesheet, one JS file.** `style.css` and `main.js` — no exceptions.

5. **Flat file structure.** All HTML files at root. No subfolders for pages.

---

## Color System (CSS Variables — DO NOT HARDCODE)
Current palette is **Clinical Navy/Blue** (matches the live build).
```
--bg:           #FAF8F5   Warm off-white background
--surface:      #F2EDE6   Parchment card backgrounds
--dark:         #1B3A6B   Deep clinical navy (primary dark)
--dark-light:   #244D8A   Lighter navy for hover/cards
--accent:       #2B6CB0   Clinical blue (CTA, highlights)
--accent-soft:  #C8D9F0   Light blue wash
--accent-deep:  #1A4F8A   Deep blue for hover states
--text:         #0F1A2E   Near-black body text
--text-muted:   #3D4A5C   Secondary/subdued text
--text-light:   #5A6A82   Tertiary text / placeholders
--white:        #FFFFFF
--accent-rgb:   43, 108, 176   (for rgba() alpha shadows/borders)
--dark-rgb:     27, 58, 107    (for rgba() alpha overlays)
```
⚠️ TO SWAP COLORS WHEN DAPHNEE DELIVERS: Change values in `:root` in `style.css` ONLY.
⚠️ For any translucent shadow/border/overlay, use `rgba(var(--accent-rgb), …)` or `rgba(var(--dark-rgb), …)` — never hardcode hex/rgb.

## Typography
- Display: `Cormorant Garamond` (Google Fonts — italic, editorial)
- Body: `Inter` (Google Fonts — clean, modern)

---

## File Map

| File | Purpose |
|------|---------|
| `index.html` | Homepage — hero, services, about teaser, testimonials, CTA |
| `services.html` | Full service menu — weight loss, injectables, aesthetics |
| `about.html` | Daphnee's story, credentials, philosophy |
| `faq.html` | FAQ accordion — general, weight loss, injectables, appointments |
| `booking.html` | Appointment request form (swap with booking embed when ready) |
| `contact.html` | Contact form + location + hours + map placeholder |
| `privacy.html` | Privacy Policy |
| `terms.html` | Terms of Service |
| `style.css` | Master stylesheet — ALL styles |
| `main.js` | All JavaScript — nav, FAQ, forms, scroll reveal |
| `assets/images/` | All images go here |

---

## Content Waiting on Daphnee

| Item | Where It Goes |
|------|---------------|
| Town/city name | All files — replace "Greater Boston Area" |
| Address | contact.html, footer, privacy.html |
| Phone number | All files |
| Business hours | booking.html, contact.html, footer |
| Bio (3 paragraphs) | about.html, index.html (about teaser) |
| Credentials | about.html, index.html |
| Mission statement | index.html hero subtitle |
| Services exact list | services.html, booking.html dropdown |
| Brand colors | style.css `:root` — 1-minute swap |
| Professional photos | assets/images/ |
| Testimonials (3) | index.html |
| Instagram handle | footer links |
| Facebook page | footer links |
| Booking system choice | booking.html `#booking-embed-slot` |

---

## Forms — Live Submission (Web3Forms)
Both the **booking** and **contact** forms POST to Web3Forms via `fetch` in `main.js`.
To activate (one step):
1. Get a free access key at https://web3forms.com (enter the destination email).
2. In `booking.html` AND `contact.html`, replace `REPLACE-WITH-WEB3FORMS-ACCESS-KEY`
   in `<input type="hidden" name="access_key" …>` with the real key.
Until then, the form shows a graceful "not connected — email/call us" message.
A hidden `botcheck` honeypot field is included for spam protection.

## Favicon
`assets/favicon.svg` — brand monogram (navy tile + blue "D"). Linked in every `<head>`.
Swap with a real logo mark when available.

## Fonts
Loaded via `<link rel="preload"/stylesheet">` in each page `<head>` (NOT `@import` in CSS)
for faster, non-render-blocking delivery. Keep all heads in sync.

## Booking System — When Daphnee Decides (optional upgrade)
To replace the form with a full scheduler: `booking.html` → `<div id="booking-embed-slot">` → swap the form for the embed.
Options: Jane App / Square Appointments / Vagaro / Calendly.

## Google Maps — When Address Is Confirmed
Go to `contact.html` → find the map placeholder comment → replace with:
```html
<iframe
  src="https://maps.google.com/maps?q=[ADDRESS]&output=embed"
  width="100%" height="100%" style="border:0;"
  allowfullscreen="" loading="lazy">
</iframe>
```

---

## Deployment
```bash
git add .
git commit -m "your message"
git push origin main
```
→ Hostinger auto-deploys (same webhook as CDeal)

---

## Open Priority Queue
1. Get Daphnee's content (town, address, phone, bio, photos)
2. Swap CSS colors when she confirms palette
3. Replace contact form endpoint with real handler
4. Add Google Maps embed when address confirmed
5. Replace booking form with booking system embed when chosen
6. Add real testimonials when provided
7. Add social media links when provided
8. SEO meta tags — town-specific keywords
9. Google Analytics / tracking when ready

---

*Built by Pierre Louis Ent LLC — Claude Code + pure HTML/CSS/JS*
