# Day One homepage redesign — implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans (inline, this session). Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild dayone-web.com around the "Partner / Products / Astrala" positioning: new homepage (9 sections from the brief), new `/partner`, `/products` (+3 product pages), `/astrala`, contact intent selector, About team block, compact footer, new nav, redirects for `/services` and `/white-label`, and a translation-keyed copy layer (EN/EL/RU) with a review file.

**Architecture:** Next 16 App Router, server components by default. All *new* user-facing strings live in `lib/copy/{en,el,ru}.ts` as one nested, typed object per locale (`el`/`ru` are `satisfies Copy` so a missing key is a type error). Pages read `copy` (EN). Product mockups are pure HTML/CSS server components with placeholder data. Existing design system (`globals.css` tokens, `.t-*` type scale, `Reveal`, `PageHero`, `BookCall`, `Button`) is reused, not redefined.

**Tech Stack:** Next 16.1, React 18, Tailwind 3.4, framer-motion (existing `Reveal` only), next/font (Jost, Alex Brush, Cormorant Garamond already loaded).

**Spec:** the user's brief (pasted 2026-09-23) + the attached mockup image. Brief wins over image.

## Global Constraints

- No new CSS framework, font, or i18n library. Cormorant Garamond is already loaded in `app/layout.tsx` (italic only, per brief).
- Brand tokens are already in `app/globals.css`; reuse, never redefine.
- No em-dashes anywhere in new copy. No AI/LLM mentions (standing site rule).
- Product and company names stay untranslated: Day One, CY-Construction, Astrala Advisory, Astrala Nexus.
- Never invent clients, numbers, testimonials or team members. Placeholder data only inside mockups ("Project A", "Site 1", initials "AB").
- Mockups: pure HTML/CSS, no raster, `aria-hidden`, `pointer-events-none`, `content-visibility:auto` below the fold.
- Responsive: every multi-column section stacks on mobile; mockups scale, never overflow.
- Do not touch `/forge` or `/security` content beyond nav and links.
- Keep analytics, cookie banner, privacy page, sitemap, metadata.
- Commit with plain `git commit` (repo identity), no trailers. Do not push.
- Gates: `npx tsc --noEmit` clean and `npx next build` exit 0 (there is no ESLint config in this repo).
- Founder placeholder on /about stays literally `{{FOUNDER_NAME}}`.

---

## File map

**Create**
- `lib/copy/en.ts` — EN dictionary, exports `en` and `type Copy = typeof en`.
- `lib/copy/el.ts`, `lib/copy/ru.ts` — `satisfies Copy`.
- `lib/copy/index.ts` — `export const copy = en; export const locales = { en, el, ru }`.
- `scripts/translations-review.mts` — flattens the three dictionaries into `TRANSLATIONS_REVIEW.md` (run: `node scripts/translations-review.mts`).
- `components/sections/Timeline.tsx` — Build / Scale / Maintain rust timeline (`tone: 'light' | 'dark'`).
- `components/home/HomeHero.tsx`, `TwoWays.tsx`, `ProductsShowcase.tsx`, `StrategicPartner.tsx`, `SelectedWork.tsx`, `HowWeWork.tsx`, `SecurityBar.tsx`.
- `components/products/ProductFrame.tsx` — fixed-aspect cream frame that hosts a mockup.
- `components/products/CyConstructionMock.tsx`, `AttendanceMock.tsx`, `SigningMock.tsx`.
- `components/products/ProductPage.tsx` — shared layout for the three product pages.
- `components/work/NexusMock.tsx` — candidates table (placeholder names).
- `components/brand/AstralaWordmark.tsx` — text wordmark in Cormorant + tagline.
- `app/partner/page.tsx`, `app/products/page.tsx`, `app/products/{cy-construction,attendance,document-signing}/page.tsx`, `app/astrala/page.tsx`.
- `CHANGES.md`, `TRANSLATIONS_REVIEW.md`.

**Modify**
- `lib/site.ts` — new `nav` (Partner, Products, Work, Astrala, Security, About, Contact), `contactIntents`.
- `next.config.ts` — `redirects()` for `/services` and `/white-label` → `/partner` (permanent).
- `app/sitemap.ts` — new routes in, old routes out.
- `app/layout.tsx` — site description + JSON-LD serviceType refreshed.
- `tailwind.config.ts` — `fontFamily.cormorant`.
- `app/globals.css` — `.lazy-block` utility; `.section-dark` italic helper.
- `components/layout/Navbar.tsx` — drop `slice(1)` (no Home entry any more).
- `components/layout/Footer.tsx` — single-row footer per brief.
- `components/sections/CtaSection.tsx` — dark band, two-line heading, timeline + cream pill + enquiry link.
- `components/contact/ContactForm.tsx` + `app/api/contact/route.ts` + `app/contact/page.tsx` — intent selector, `?intent=` prefill (Suspense + `useSearchParams`).
- `app/about/page.tsx` — team block.
- `app/work/page.tsx` — stub entries with anchors `#cy-construction`, `#forex`, `#taxi-xanthi`, `#sun-seals` (Delbeteris exists).
- `app/page.tsx` — rebuilt from the section components.

**Delete**
- `app/services/page.tsx`, `app/white-label/page.tsx` (redirected; white-label copy migrates to `/partner`).

---

## Copy dictionary shape (interface all tasks depend on)

```ts
// lib/copy/en.ts (abridged; every leaf is a string or string[])
export const en = {
  meta: { home: {title, description}, partner: {...}, products: {...}, cyConstruction, attendance, documentSigning, astrala },
  nav: { partner, products, work, astrala, security, about, contact, bookCall, menuOpen, menuClose },
  footer: { email, phone, whatsapp, location, privacy, copyright /* "© {year} Day One Web Studio" */, tagline },
  cta: { line1, line2, timeline: { build, scale, maintain }, bookCall, enquiry },
  home: { hero: {eyebrow, title1, title2, sub, cta, secondary, note},
          twoWays: {eyebrow, partner: {title, lines[], link}, products: {title, lines[], link}},
          products: {eyebrow, title, learnMore},
          strategic: {eyebrow, title, sub, chips[], visit},
          selectedWork: {eyebrow, featured: {name, kind, body, link}, strip: [{name, kind}] x5},
          howWeWork: {eyebrow, items[] x4},
          securityBar: {title, body, link} },
  products: { index: {...}, cyConstruction: ProductCopy, attendance: ProductCopy, documentSigning: ProductCopy, demoCta, whoFor },
  partner: { hero, models[4] {title, line1, line2}, steps[4], stack[], rule, process, cta },
  astrala: { hero, build, whiteLabel, security, referral, cta, visit },
  contact: { intentLabel, intents: {partnership, demo, project, security} },
  about: { team: {eyebrow, title, founderRole} },
  work: { more: {eyebrow, title}, stubs: [...] },
}
type ProductCopy = { name, tagline, meta, features: {title, body}[], whoFor: string[] }
```

`copy` is imported everywhere as `import { copy } from '@/lib/copy'`.

---

### Task 1: Copy layer + review generator
**Files:** create `lib/copy/en.ts`, `el.ts`, `ru.ts`, `index.ts`, `scripts/translations-review.mts`, `TRANSLATIONS_REVIEW.md`.
- [ ] Write `en.ts` with every string from the brief (verbatim where the brief gives copy) and the drafted copy for /partner, /products, /astrala, /contact, /about, /work stubs.
- [ ] Write `el.ts` and `ru.ts` as `satisfies Copy` (product/company names untranslated).
- [ ] Write the generator: flatten `{en, el, ru}` to dotted keys, emit a table `| key | EN | EL | RU |`.
- [ ] Run `node scripts/translations-review.mts` and `npx tsc --noEmit`.
- [ ] Commit: `feat: translation-keyed copy layer (EN/EL/RU) and review file`.

### Task 2: Shared chrome — nav, footer, CTA band, timeline, redirects
**Files:** modify `lib/site.ts`, `next.config.ts`, `tailwind.config.ts`, `app/globals.css`, `Navbar.tsx`, `Footer.tsx`, `CtaSection.tsx`; create `Timeline.tsx`.
- [ ] `nav` = 7 items, no Home, no highlight. Navbar maps `nav` directly.
- [ ] `Timeline` props `{ labels: [string,string,string]; tone?: 'light'|'dark'; className? }`.
- [ ] `CtaSection` props `{ line1?: string; line2?: string; sub?: string }` — dark band, `line2` in Cormorant italic, right column: Timeline + cream `BookCall` + enquiry link. Update callers in `app/about/page.tsx` and `app/work/page.tsx`.
- [ ] Footer: single row: Logo · Email → · Phone → · WhatsApp → · Cyprus · Privacy · © year · tagline.
- [ ] Redirects `/services` → `/partner`, `/white-label` → `/partner` (permanent).
- [ ] `npx tsc --noEmit`; commit `feat: new nav, compact footer, dark CTA band with timeline, redirects`.

### Task 3: /partner
**Files:** create `app/partner/page.tsx`; delete `app/services/page.tsx`, `app/white-label/page.tsx`.
- [ ] Hero (PageHero `instant`), four models (hairline columns, rust numerals), engagement steps (Call → Scope → Pilot month → Retainer), the migrated "We never contact your clients" rule band, stack chips, CTA.
- [ ] Remove the two old pages. Grep for `/services` and `/white-label` links and point them to `/partner`.
- [ ] tsc; commit `feat: /partner replaces /services and /white-label`.

### Task 4: Product mockups + /products
**Files:** create `ProductFrame.tsx`, three mocks, `ProductPage.tsx`, four product routes.
- [ ] Mocks are server components, `aria-hidden`, placeholder data only, fluid widths, no fixed pixel widths above 100%.
- [ ] `ProductPage` props `{ product: ProductCopy; slug; mock: ReactNode; demoHref: '/contact?intent=demo' }`.
- [ ] tsc; commit `feat: products index and three product pages with CSS mockups`.

### Task 5: /astrala + Astrala wordmark + Nexus mock
- [ ] `AstralaWordmark` (Cormorant caps, tagline), `NexusMock`, `app/astrala/page.tsx` (what we build, white-label deployments, security posture, referral summary, CTA, link to astralaadvisory.eu.com).
- [ ] tsc; commit `feat: /astrala partnership page`.

### Task 6: Homepage
- [ ] Seven section components + `app/page.tsx` in brief order; hero without timeline; ghosted "Day ONE" watermark; `.lazy-block` on below-fold mockups.
- [ ] tsc; commit `feat: homepage redesign`.

### Task 7: Contact intent, About team block, Work stubs
- [ ] `ContactForm` gets `<select name="intent">` (Partnership / Product demo / Project / Security review), default from `?intent=` via `useSearchParams` inside `<Suspense>`; API validates against `contactIntents` and includes it in the email.
- [ ] About: team block with `{{FOUNDER_NAME}}`, Lead Developer.
- [ ] Work: "More work" hairline list with anchors for the five strip entries (stubs: name + category only).
- [ ] tsc; commit `feat: contact intent selector, about team block, work stubs`.

### Task 8: Metadata, sitemap, build, CHANGES.md
- [ ] Sitemap routes; layout description; JSON-LD serviceType.
- [ ] `grep -rn "—" app components lib --include=*.tsx` on touched files → none in new copy.
- [ ] `npx next build` exit 0; all routes prerender.
- [ ] `CHANGES.md`: routes added, redirects, removed pages, open items (Astrala constraint, i18n routing absent, signing meta line, Delbeteris spelling, Security nav highlight dropped, Lighthouse not run).
- [ ] Commit `chore: sitemap, metadata, CHANGES.md`.
