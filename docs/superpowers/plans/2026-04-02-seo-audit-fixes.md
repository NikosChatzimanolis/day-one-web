# SEO Audit Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all SEO issues identified in the dayone-web.com audit — canonical tags, structured data, hreflang, title length, meta consistency, and robots.txt.

**Architecture:** All changes are metadata/head-level — no UI changes. We add a JSON-LD component, fix metadata exports in layout files, and add a robots.txt route. The site uses Next.js App Router metadata API for all head tags.

**Tech Stack:** Next.js 16 App Router metadata API, JSON-LD via `<script>` tag in layout, `MetadataRoute` for robots.txt.

---

## Triage Notes

Before implementing, here's what the audit found vs actual state:

| Audit Item | Actual State | Action |
|---|---|---|
| #1 Canonical wrong on /how-we-work | Root layout sets canonical to homepage; how-we-work layout doesn't override | **Fix** |
| #2 No JSON-LD structured data | Confirmed — zero JSON-LD | **Fix** |
| #3 No hreflang tags | Confirmed — but site uses client-side lang switch on same URL, so traditional hreflang has limited value. Add `x-default` self-referencing tags as minimal fix. | **Fix (partial)** |
| #4 Title too long (71 chars) | Confirmed — "Day One — Web Development, Maintenance & Social Media \| Cyprus & Greece" | **Fix** |
| #5 H1 garbled text | **Already fixed** — Hero.tsx has `aria-label` on h1 and `aria-hidden="true"` on animated spans. Audit JS likely read textContent instead of accessible name. | **No action** |
| #6 Low word count /how-we-work | **Already fixed** — redesign added 6-step process + social media block. Now ~700+ words. | **No action** |
| #7 No sitemap / not linked | Sitemap exists at `/app/sitemap.ts`. Missing `robots.txt` to reference it. | **Fix** |
| #8 OG image dynamic | Working as designed (Next.js edge-rendered). | **No action** |
| #9 No noopener on WhatsApp | **Already has** `rel="noopener noreferrer"` on all external links. False positive. | **No action** |
| #10 OG vs meta description mismatch | Confirmed — slight wording differences. | **Fix** |

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `app/layout.tsx` | Modify | Shorten title, align OG/meta descriptions, add hreflang alternates |
| `app/how-we-work/layout.tsx` | Modify | Add canonical override, add hreflang alternates |
| `app/work/tapinakia/page.tsx` | Modify | Add canonical for this page |
| `app/robots.ts` | Create | robots.txt with sitemap reference |
| `app/jsonld.tsx` | Create | Reusable JSON-LD component |
| `app/page.tsx` | Modify | Add LocalBusiness JSON-LD to homepage |
| `app/how-we-work/page.tsx` | Modify | Add WebPage + BreadcrumbList JSON-LD |

---

### Task 1: Fix canonical tag on /how-we-work

**Files:**
- Modify: `app/how-we-work/layout.tsx`
- Modify: `app/work/tapinakia/page.tsx`

The root layout sets `alternates.canonical` to `https://dayone-web.com`. Sub-pages inherit this, so every page gets the homepage canonical. Each sub-page layout must override it.

- [ ] **Step 1: Update how-we-work layout metadata**

In `app/how-we-work/layout.tsx`, add `alternates.canonical`:

```tsx
export const metadata: Metadata = {
  title: 'How We Work — Web Development & Maintenance Process | Day One',
  description:
    'Our web development process: from strategy to ongoing maintenance and social media management. See how we build, launch, and continuously improve your online presence in Cyprus & Greece.',
  alternates: {
    canonical: 'https://dayone-web.com/how-we-work',
  },
}
```

- [ ] **Step 2: Update tapinakia page metadata**

In `app/work/tapinakia/page.tsx`, find the existing metadata export and add `alternates.canonical`:

```tsx
alternates: {
  canonical: 'https://dayone-web.com/work/tapinakia',
},
```

- [ ] **Step 3: Build to verify no errors**

Run: `source ~/.nvm/nvm.sh && npx next build 2>&1 | tail -20`
Expected: `✓ Generating static pages` with no errors

- [ ] **Step 4: Commit**

```bash
git add app/how-we-work/layout.tsx app/work/tapinakia/page.tsx
git commit -m "fix: set correct canonical URLs on sub-pages"
```

---

### Task 2: Shorten page title and align meta/OG descriptions

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Shorten title to under 60 characters**

In `app/layout.tsx`, change the title from:
```
'Day One — Web Development, Maintenance & Social Media | Cyprus & Greece'
```
to:
```
'Day One — Web Development & Maintenance | Cyprus'
```
(50 chars — well under the 60 char limit)

Update in all three places: `metadata.title`, `metadata.openGraph.title`, and `metadata.twitter.title`.

- [ ] **Step 2: Align meta description with OG description**

Set the same description string in `metadata.description`, `metadata.openGraph.description`, and `metadata.twitter.description`. Use:

```
'Web development, website maintenance, and social media management for businesses in Cyprus and Greece. We build, maintain, and grow your online presence.'
```

(Remove "Live in days, not months." from meta, and align OG/Twitter to match exactly.)

- [ ] **Step 3: Build to verify**

Run: `source ~/.nvm/nvm.sh && npx next build 2>&1 | tail -20`
Expected: Clean build

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "fix: shorten page title to <60 chars, align meta/OG descriptions"
```

---

### Task 3: Add robots.txt with sitemap reference

**Files:**
- Create: `app/robots.ts`

- [ ] **Step 1: Create robots.ts**

Create `app/robots.ts`:

```ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://dayone-web.com/sitemap.xml',
  }
}
```

- [ ] **Step 2: Build to verify robots.txt is generated**

Run: `source ~/.nvm/nvm.sh && npx next build 2>&1 | tail -20`
Expected: Build succeeds. Route list should include `/robots.txt`.

- [ ] **Step 3: Commit**

```bash
git add app/robots.ts
git commit -m "feat: add robots.txt with sitemap reference"
```

---

### Task 4: Add JSON-LD structured data

**Files:**
- Create: `app/jsonld.tsx`
- Modify: `app/page.tsx`
- Modify: `app/how-we-work/page.tsx`

- [ ] **Step 1: Create reusable JsonLd component**

Create `app/jsonld.tsx`:

```tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

- [ ] **Step 2: Add LocalBusiness schema to homepage**

In `app/page.tsx`, import and render the JsonLd component at the top of the returned JSX (before the existing layout wrapper):

```tsx
import { JsonLd } from './jsonld'
```

Add inside the component return, before the existing content:

```tsx
<JsonLd data={{
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Day One Web Studio',
  url: 'https://dayone-web.com',
  description: 'Web development, website maintenance, and social media management for businesses in Cyprus and Greece.',
  email: 'contact@dayone-web.com',
  telephone: '+35796254148',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CY',
  },
  areaServed: [
    { '@type': 'Country', name: 'Cyprus' },
    { '@type': 'Country', name: 'Greece' },
  ],
  serviceType: ['Web Development', 'Website Maintenance', 'Social Media Management'],
  priceRange: '€€',
}} />
```

Note: `app/page.tsx` is a client component (`'use client'`). The `<script type="application/ld+json">` tag works fine in client components — it renders to the DOM on hydration and Google's crawler will pick it up. However, if the page uses a wrapper layout that has a server component, the JsonLd can go there instead. Check the page structure: if `page.tsx` renders inside a `ScrollProvider` and returns JSX directly, add the `<JsonLd>` as a sibling element. You may need to wrap the return in a fragment `<>...</>`.

- [ ] **Step 3: Add WebPage + BreadcrumbList schema to /how-we-work**

In `app/how-we-work/page.tsx`, import and add JsonLd inside the `HowWeWorkContent` component, right after the opening `<div>`:

```tsx
import { JsonLd } from '../jsonld'
```

```tsx
<JsonLd data={{
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'How We Work',
  url: 'https://dayone-web.com/how-we-work',
  description: 'Our web development process: from strategy to ongoing maintenance and social media management.',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://dayone-web.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'How We Work',
        item: 'https://dayone-web.com/how-we-work',
      },
    ],
  },
}} />
```

- [ ] **Step 4: Build to verify**

Run: `source ~/.nvm/nvm.sh && npx next build 2>&1 | tail -20`
Expected: Clean build with no errors.

- [ ] **Step 5: Commit**

```bash
git add app/jsonld.tsx app/page.tsx app/how-we-work/page.tsx
git commit -m "feat: add JSON-LD structured data (LocalBusiness + WebPage + Breadcrumbs)"
```

---

### Task 5: Add hreflang tags

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/how-we-work/layout.tsx`

Since the site uses client-side language switching (same URL, no `/el/` or `/ru/` path prefixes), traditional hreflang has limited value — Google can't crawl the alternate language versions. However, adding self-referencing `x-default` and `en` hreflang signals to Google that the page's primary language is English, which is still beneficial.

- [ ] **Step 1: Add hreflang to root layout metadata**

In `app/layout.tsx`, update the `alternates` object:

```tsx
alternates: {
  canonical: 'https://dayone-web.com',
  languages: {
    'en': 'https://dayone-web.com',
    'x-default': 'https://dayone-web.com',
  },
},
```

- [ ] **Step 2: Add hreflang to how-we-work layout metadata**

In `app/how-we-work/layout.tsx`, update the `alternates` object:

```tsx
alternates: {
  canonical: 'https://dayone-web.com/how-we-work',
  languages: {
    'en': 'https://dayone-web.com/how-we-work',
    'x-default': 'https://dayone-web.com/how-we-work',
  },
},
```

- [ ] **Step 3: Build to verify**

Run: `source ~/.nvm/nvm.sh && npx next build 2>&1 | tail -20`
Expected: Clean build

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/how-we-work/layout.tsx
git commit -m "feat: add hreflang tags (en + x-default) for SEO"
```

---

## Summary

| Task | Audit Issue(s) | Files Changed |
|---|---|---|
| Task 1 | #1 Canonical wrong on sub-pages | `app/how-we-work/layout.tsx`, `app/work/tapinakia/page.tsx` |
| Task 2 | #4 Title too long, #10 Description mismatch | `app/layout.tsx` |
| Task 3 | #7 No robots.txt / sitemap not linked | `app/robots.ts` (new) |
| Task 4 | #2 No JSON-LD structured data | `app/jsonld.tsx` (new), `app/page.tsx`, `app/how-we-work/page.tsx` |
| Task 5 | #3 No hreflang tags | `app/layout.tsx`, `app/how-we-work/layout.tsx` |

**Already resolved (no action):** #5 H1 aria-label (already in Hero.tsx), #6 word count (redesign done), #8 OG image (working as designed), #9 noopener (already present).
