# Day One — Web

Marketing website for Day One, a web design and digital presence studio based in Cyprus.

## What it is

A conversion-focused company site covering services, process, past work, pricing, and a contact form. Built to turn visitors into enquiries.

**Pages:**
- `/` — Home: hero, services, how it works preview, past work, pricing, contact form
- `/how-we-work` — Full 4-step process walkthrough with scroll animations
- `/work/tapinakia` — Case study

## Stack

| | |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| Email | Nodemailer (contact form API route) |
| Language | TypeScript |

## Setup

```bash
npm install
```

Configure email for the contact form — add to `.env.local`:

```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
CONTACT_EMAIL=
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
  page.tsx                  Home page
  layout.tsx                Root layout (fonts, metadata)
  how-we-work/page.tsx      Process walkthrough
  work/tapinakia/page.tsx   Case study
  api/contact/              Contact form endpoint (Nodemailer)
  opengraph-image.tsx       OG image generation
components/
  layout/                   Navbar, Footer, SplitLayout
  sections/                 HowItWorks, Pricing, Contact
  ui/                       Logo and other shared UI
context/
  ScrollContext.tsx          Scroll state for nav behaviour
hooks/                       Custom hooks
lib/
  utils.ts                  cn() helper (clsx + tailwind-merge)
```
