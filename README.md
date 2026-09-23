# Day One — Web

The site for Day One Web Studio: a technical partner that builds the systems
funded startups and scale-ups run on, and stays to keep them running. Premium
B2B positioning — build, scale, maintain, as one continuous relationship.

## What it is

A six-page studio site. Every page leads to one clear action: **Book a call**.
The backup conversion path is a project enquiry form (Resend, honeypot-protected).

**Pages:**
- `/` — Home: hero, two ways to work with us, products, Astrala band, selected work, how we work, security bar, CTA
- `/partner` — Partnership models, engagement steps, stack (replaces `/services` and `/white-label`, which redirect here)
- `/products` — the construction ERP platform, the attendance and leave platform, the document signing service (+ one page each)
- `/astrala` — The Astrala Advisory partnership
- `/work` — Case studies and stubs
- `/security` — Fixed-scope security & GDPR review
- `/forge` — Forge, the task tracker the studio runs on (route kept, not in nav)
- `/about` — The studio and the team block
- `/contact` — Book a call + project enquiry form with an intent selector (`?intent=`)

All copy introduced by the 2026-09 redesign is keyed in `lib/copy/{en,el,ru}.ts`; see `TRANSLATIONS_REVIEW.md` and `CHANGES.md`.

## Stack

| | |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Animation | Framer Motion (restrained scroll reveals) |
| Icons | Lucide React |
| Email | Resend (contact form + branded auto-reply) |
| Language | TypeScript |

## Setup

```bash
npm install
```

Configure environment — add to `.env.local`:

```env
RESEND_API_KEY=your_resend_api_key
# Optional: external calendar for "Book a call" (Cal.com / Calendly).
# When unset, "Book a call" routes to /contact#book.
NEXT_PUBLIC_BOOKING_URL=
# Optional: Forge early-access signup URL.
NEXT_PUBLIC_FORGE_URL=https://forge.dayone-web.com
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
```

## Project structure

```
app/
  page.tsx                  Home
  services/page.tsx         Services — two tracks
  work/page.tsx             Work — Astrala + Delbeteris case studies
  forge/page.tsx            Forge product page (own dark identity)
  about/page.tsx            About / Studio
  contact/page.tsx          Book a call + enquiry form
  layout.tsx                Root layout (fonts, metadata, Navbar + Footer)
  api/contact/route.ts      Contact endpoint (Resend, honeypot)
  opengraph-image.tsx       OG image generation
components/
  layout/                   Navbar, Footer
  sections/                 PageHero, CtaSection
  ui/                       Logo, Button, BookCall, Reveal, BrowserFrame, BuiltByDayOne, CustomCursor
  work/AstralaVisual.tsx    Representative platform visual (no confidential internals)
  forge/ForgeMock.tsx       Faithful Forge Queue interface
  contact/ContactForm.tsx   Enquiry form (honeypot anti-spam)
lib/
  site.ts                   Contact details, nav, booking + Forge URLs, entity line
  email.ts, email-templates.ts  Resend wiring + branded templates
  utils.ts                  cn() helper (clsx + tailwind-merge)
```

## Brand

Locked. Primary rust `#C04C2A` (logo + "Built by Day One" chip), website accent
`#B5552F`, near-black `#1A1816`, warm gray `#9A8F82`, divider `rgba(192,76,42,0.3)`.
Fonts: Alex Brush for "Day", Jost for "ONE / WEB STUDIO" and display, DM Sans for body.
The "Built by Day One" chip always uses the primary variant colors — never theme-swapped.

Entity: **Nikolaos Chatzimanolis trading as Day One Web Studio**. Not VAT registered.
