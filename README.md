# deblandeau.com — Project README

## Client
**Daphnee Matthew, NP** — Medical Weight Loss & Aesthetics
Near Boston, MA (town TBD)
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
```
--bg:           #FAFAF7   Warm off-white background
--surface:      #F0EDE6   Parchment card backgrounds
--dark:         #1A1A2E   Deep midnight navy (primary dark)
--dark-light:   #252540   Slightly lighter dark for hover/cards
--accent:       #C9A96E   Warm antique gold (CTA, highlights)
--accent-soft:  #E8D9BC   Light gold wash
--accent-deep:  #A8844A   Deep gold for hover states
--text:         #2C2C3E   Near-black body text
--text-muted:   #6B6B7B   Secondary/subdued text
--white:        #FFFFFF
```
⚠️ TO SWAP COLORS WHEN DAPHNEE DELIVERS: Change values in `:root` in `style.css` ONLY.

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

## Booking System — When Daphnee Decides
Go to `booking.html` → find `<div id="booking-embed-slot">` → replace the form with the embed code.
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
