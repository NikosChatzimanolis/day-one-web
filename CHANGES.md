# Changes: 2026-09 homepage and positioning redesign

Branch `redesign/partner-products`, eight commits on top of `2d7e97a`. Nothing is pushed.
Gates: `npx tsc --noEmit` clean, `npx next build` exit 0. There is no ESLint config in this repo.

## Routes added

| Route | What it is |
|---|---|
| `/partner` | Partnership models (embedded team, white-label, referral 12% / 20%, revenue share), engagement steps, the migrated white-label rule and working style, stack, CTA. |
| `/products` | Index of the three products as equal rows. |
| `/products/cy-construction` | Product page: split hero with CSS mockup, five feature rows, who it is for, demo band. |
| `/products/attendance` | Same layout. |
| `/products/document-signing` | Same layout. |
| `/astrala` | The Astrala Advisory partnership page: what we build, white-label deployments, security posture, referral summary, wordmark link out. |

All six are in `app/sitemap.ts` and prerender statically. Titles and descriptions live in `lib/copy/*.ts` under `meta`.

## Redirects (`next.config.ts`, permanent / 308)

- `/services` → `/partner`
- `/white-label` → `/partner`

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
- **About** (`app/about/page.tsx`): Team block with `{{FOUNDER_NAME}}`, Lead Developer. The placeholder is literal in all three dictionaries; fill it in `lib/copy/{en,el,ru}.ts` under `about.team.founderName`.
- **Work** (`app/work/page.tsx`): "More work" stubs with anchors `#cy-construction`, `#forex`, `#taxi-xanthi`, `#sun-seals` (Delbeteris already had `#delbeteris`). Stubs carry only name and category from the brief.
- **Layout** (`app/layout.tsx`): default title and description from the new copy; title template `%s | Day One`; Cormorant now also loads weight 400 for the italic line; JSON-LD `serviceType` refreshed.
- **Tailwind / CSS**: `font-cormorant` family; `.lazy-block` (content-visibility) for below-the-fold mockups.
- **Copy layer** (`lib/copy/`, `TRANSLATIONS_REVIEW.md`, `scripts/translations-review.mts`): every new string is a key with EN, EL and RU. Regenerate the review file with `node scripts/translations-review.mts`.

## Open items

1. **Astrala positioning (please confirm before this goes live).** The brief's Astrala copy ("We engineer their recruitment SaaS platform", "Astrala Nexus, Recruitment SaaS", the candidates mockup, `/astrala`) contradicts the constraint recorded in June 2026 that the site may only describe Astrala work as content, newsletter and brand, never claim Day One built or maintains the platform, never use "recruitment", and never depict the product. It is built exactly as briefed. The untouched `/work` page still carries the older "Content, newsletter, and brand work" card and the anonymised platform case study, so the site currently says both things. Decide which stands and I will align `/work` (or revert the Astrala sections) in one pass.
2. **Locales.** The brief assumes EN, EL and RU already exist. This repo has no locale routing (it was removed in June 2026); the site renders English. EL and RU ship as complete dictionaries plus the review file, and `getCopy(locale)` in `lib/copy/index.ts` is the seam for a future locale switch, but nothing on the site is reachable in Greek or Russian yet.
3. **Document signing meta line.** The brief gives a meta line for CY-Construction and Attendance but none for signing, so its `meta` key is empty and the row renders without one.
4. **Delbeteris spelling.** The brief and mockup say "Delbeteri transfers"; the client is Delbeteris (delbeteristransfer.com), so the strip says "Delbeteris transfers".
5. **Security nav highlight.** Security was the one rust link in the old header. The mockup shows uniform ink links, so the highlight is off. Flip `highlight: true` back on in `lib/site.ts` if you want it.
6. **/security buttons.** That page keeps its own rust, square-cornered CTA (untouched per the brief) while the rest of the site now uses ink pills.
7. **Footer legal line** is "© year Day One Web Studio" per the brief; the full trading name still lives in `site.legalName` and is no longer rendered anywhere.
8. **OG image** (`app/opengraph-image.tsx`) still carries the old "ships like a founder" tagline.
9. **Lighthouse was not run** in this session (no preview server was started, per your preference). Practices kept: hero and product heroes render without the entrance animation so the h1 is the LCP element, mockups are markup only, below-the-fold frames use `content-visibility`, no new fonts or scripts. Please run Lighthouse on the deployed preview and compare against the previous scores.
10. **Astrala wordmark** is Cormorant text, as the brief allows. A raster wordmark PNG exists in the Astrala repo (`astralaadvisory/public/brand/astrala-wordmark.png`) if you would rather use the real asset.
