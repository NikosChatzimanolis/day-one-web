# Changes: 2026-09 homepage and positioning redesign

Branch `redesign/partner-products`, eleven commits on top of `2d7e97a`. Nothing is pushed.
Gates: `npx tsc --noEmit` clean, `npx next build` exit 0. There is no ESLint config in this repo.

## Routes added

| Route | What it is |
|---|---|
| `/partner` | Partnership models (embedded team, white-label, referral 12% / 20%, revenue share), engagement steps, the migrated white-label rule and working style, stack, CTA. |
| `/products` | Index of the three products as equal rows. |
| `/products/construction-erp` | Product page for the construction ERP platform (renamed from `/products/cy-construction`, which now redirects): split hero with the real dashboard capture, five feature rows, who it is for, demo band. |
| `/products/attendance` | Same layout. |
| `/products/document-signing` | Same layout. |
| `/astrala` | The Astrala Advisory partnership page: what we build, white-label deployments, security posture, referral summary, wordmark link out. |

All six are in `app/sitemap.ts` and prerender statically. Titles and descriptions live in `lib/copy/*.ts` under `meta`.

## Redirects (`next.config.ts`, permanent / 308)

- `/services` → `/partner`
- `/white-label` → `/partner`
- `/products/cy-construction` → `/products/construction-erp`

## Removed pages

- `app/services/page.tsx`
- `app/white-label/page.tsx` (the "We never contact your clients" rule, the "Pull requests, not zip files" paragraph and the stack moved to `/partner`)

`/forge` keeps its route and sitemap entry but is no longer in the navigation.

## Changed

- **Homepage** (`app/page.tsx` + `components/home/*`): rebuilt in the brief's order. Hero is left-anchored with the ghosted Day ONE watermark and no timeline; the timeline lives only in the closing band.
- **Navigation** (`lib/site.ts`, `components/layout/Navbar.tsx`): Partner · Products · Work · Astrala · Security · About · Contact · outlined "Book a call" pill. No chips, no shadows. The mobile drawer now kicks in below 1024px because seven links plus the pill do not fit at 768px.
- **Footer** (`components/layout/Footer.tsx`): one row on the parchment: logo, Email →, Phone →, WhatsApp →, Cyprus, Privacy, "© year Day One Web Studio", "Built for what's next."
- **Closing CTA band** (`components/sections/CtaSection.tsx`, new `Timeline.tsx`): dark, Jost light line over a Cormorant italic line, Build / Scale / Maintain timeline, cream pill, enquiry link. Props changed from `heading/eyebrow/sub` to `line1/line2/sub`; About and Work callers updated.
- **Buttons** (`components/ui/Button.tsx`, `BookCall.tsx`): pills. `primary` is now the ink pill from the mockup (rust stays for accents and mock UI); new `cream` variant for dark bands.
- **Contact** (`app/contact/page.tsx`, `components/contact/*`, `app/api/contact/route.ts`): intent select (Partnership / Product demo / Project / Security review) pre-filled from `?intent=partnership|demo|project|security`. The API validates it and puts the label in the email subject and body. `/contact?intent=demo` is the product demo CTA target.
- **About** (`app/about/page.tsx`): the Team block the brief asked for was added and then removed again on 2026-09-23 (the `{{FOUNDER_NAME}}` placeholder was not wanted on the page). No other change.
- **Work** (`app/work/page.tsx`): "More work" stubs with anchors `#cy-construction`, `#forex`, `#taxi-xanthi`, `#sun-seals` (Delbeteris already had `#delbeteris`). Stubs carry only name and category from the brief.
- **Layout** (`app/layout.tsx`): default title and description from the new copy; title template `%s | Day One`; Cormorant now also loads weight 400 for the italic line; JSON-LD `serviceType` refreshed.
- **Product visuals**: CY-Construction and the attendance platform now use real screenshots (`public/products/`, via `components/products/AppShot.tsx` and next/image) instead of CSS mockups. Sources are demo / seed data only: the CY-Construction demo tenant ("Demo Constructions Ltd", fictional projects, cropped above the signed-in line) and the attendance app's seed-database employee clock screen from the Phoenix repo's screenshot pack. A production attendance screenshot with real staff names was deliberately not used. The signing card and the Astrala Nexus panel remain CSS mockups (no shootable UI / see open item 1). `CyConstructionMock.tsx` and `AttendanceMock.tsx` are now unused but kept.
- **Palette (2026-09-23, per Nico's spec)**: ivory `#F7F4EE` background, stone `#ECE7DE` alternate sections, soft white `#FDFBF7` cards, charcoal `#242320` text, warm grey `#625D55` secondary, terracotta `#A64B32` accent with `#8C3D28` hover, sand `#D8D0C4` borders. Primary buttons charcoal on soft white with `#383630` hover; outline buttons sand border, terracotta on hover; dark bands charcoal with ivory headings and sand body text. The animated mesh and the radial glows are retired (flat colours). Product screenshots untouched.
- **Astrala logo**: `components/brand/AstralaLogo.tsx` renders `public/partners/astrala-logo.png` when the file exists and falls back to the serif wordmark otherwise. The transparent PNG still needs to be dropped in (see open items).
- **Tailwind / CSS**: `font-cormorant` family; `.lazy-block` (content-visibility) for below-the-fold mockups; `.section-tight` rhythm; timeline draw-on keyframes.
- **Copy layer** (`lib/copy/`, `TRANSLATIONS_REVIEW.md`, `scripts/translations-review.mts`): every new string is a key with EN, EL and RU. Regenerate the review file with `node scripts/translations-review.mts`.

## Open items

1. **Astrala positioning: resolved on 2026-09-23.** Nico corrected the relationship: Day One is Astrala's external engineering capacity (they offload technical work to us), Day One's services reach clients through Astrala, and Astrala's services reach clients through Day One. The homepage band, `/astrala` and the meta description now say exactly that; the "Astrala Nexus" feature, its candidates mockup and the "white-label deployments" section are removed. Selected Work now features Delbeteris (real site screenshot in a window frame) over a four-entry strip. The `/work` page still carries the older "content, newsletter and brand work" card, which does not contradict the new wording but could be aligned to it.
2. **Locales.** The brief assumes EN, EL and RU already exist. This repo has no locale routing (it was removed in June 2026); the site renders English. EL and RU ship as complete dictionaries plus the review file, and `getCopy(locale)` in `lib/copy/index.ts` is the seam for a future locale switch, but nothing on the site is reachable in Greek or Russian yet.
3. **Document signing meta line.** The brief gives a meta line for CY-Construction and Attendance but none for signing, so its `meta` key is empty and the row renders without one.
4. **Delbeteris spelling.** The brief and mockup say "Delbeteri transfers"; the client is Delbeteris (delbeteristransfer.com), so the strip says "Delbeteris transfers".
5. **Security nav highlight.** Security was the one rust link in the old header. The mockup shows uniform ink links, so the highlight is off. Flip `highlight: true` back on in `lib/site.ts` if you want it.
6. **/security buttons.** That page keeps its own rust, square-cornered CTA (untouched per the brief) while the rest of the site now uses ink pills.
7. **Footer legal line** is "© year Day One Web Studio" per the brief; the full trading name still lives in `site.legalName` and is no longer rendered anywhere.
8. **OG image** (`app/opengraph-image.tsx`): alt and drawn tagline now use the new positioning; the layout of the image itself is unchanged.
9. **Lighthouse was not run** in this session (no preview server was started, per your preference). Practices kept: hero and product heroes render without the entrance animation so the h1 is the LCP element, mockups are markup only, below-the-fold frames use `content-visibility`, no new fonts or scripts. Please run Lighthouse on the deployed preview and compare against the previous scores.
10. **Astrala logo asset missing.** The logo Nico pasted (blue "A" mark + ASTRALA ADVISORY wordmark on navy) never reached disk because the disk was full at that moment, and the Astrala repo only holds the older ring-and-star logo. Save the current logo as a transparent PNG (or SVG) at `public/partners/astrala-logo.png` and the band and `/astrala` will pick it up automatically; until then they show the serif wordmark.
11. **Product name.** The construction product is called "Construction ERP platform" on the site now (copy key `cyConstruction` kept internally).
