# Steer as a Day One product

Add Steer to dayone-web.com as the fourth product, next to the Construction ERP platform, the attendance platform and the document signing service. Steer lives at steer-dayone.com; the Day One site presents it, sends agencies to it, and books demos for it.

## Decisions for Nico

Each has a default the build follows unless Nico says otherwise.

1. **The word "AI".** The site rule is that it never mentions AI, LLM or ML. Steer is sold as an AI operator on its own domain. Default: keep the rule on dayone-web.com and describe what Steer does in plain words ("checks every account every hour, writes each change with the reason, executes what you approve"). The alternative is one exception for Steer's tagline.
2. **Name and slug.** The other products use descriptive names ("Attendance and leave platform"). Steer has its own brand, domain and logo. Default: name "Steer", meta line "Google Ads operator for agencies", route `/products/steer`.
3. **Chris's results.** "Clients went from €10 to 25k a month to over €100k" is the strongest proof Day One has. Default: leave it out until Nico and Chris confirm it can be published and how it is worded.
4. **Meta Ads.** Meta is sample data only today. Default: the site says Google Ads, with "Meta Ads next" as one line in the meta row, nothing more.
5. **Second button.** Steer is self-serve, unlike the other three. Default: product page and products index get "Open Steer" (steer-dayone.com/signup) next to "Request a demo".

## Content

English, then Greek and Russian (the copy files use `satisfies Copy`, so typecheck fails until all three exist).

- **name**: Steer
- **tagline**: Every Google Ads account you run, checked every hour. You approve, Steer does the work.
- **meta**: Google Ads · Agencies and in-house teams · Meta Ads next
- **lead**: Steer runs the weekly Google Ads routine on every account an agency manages: it reads the numbers every hour, writes each change with the reason and the before and after, executes what you approve, and sends the client reports on schedule.
- **features** (five, like the other products):
  1. Every account, every hour. Search terms, budgets, bids, ads and keywords checked around the clock against each client's goal.
  2. Changes with the reason. Each plan shows what changes, why, the expected effect, and the before and after.
  3. You stay in control. Suggest mode waits for one click. Autopilot runs only the categories you trust, inside budget caps, quiet hours and a kill switch per client. Every change rolls back for seven days.
  4. Goals in plain language. Tell Steer what each client needs ("reservations under €6 each") and it measures every change against it.
  5. Reports that send themselves. Daily, weekly and monthly reports with the agency's logo, as PDF and email.
- **whoFor**: Agencies running Google Ads for several clients · Account managers who want their week back · Businesses that run their own Google Ads and want a second pair of eyes
- **meta.steer** (page title and description for search and link previews).

All features match what is built and live today; nothing in the copy goes beyond the product.

## Visuals

- Two screenshots from Steer's local demo workspace (fictional clients only, never the Adler or ChrisGoogleAds data): a project overview with the performance chart, and a change plan waiting for approval. Saved as `public/products/steer-overview-v1.png` and `steer-plan-v1.png` (versioned names, the image CDN caches by URL).
- Shot in light theme at 1440 px wide to sit with the site's ivory palette; the Steer mark appears in the screenshot's sidebar, so no extra logo is needed.
- The local demo needs the local Supabase stack running and the demo seed loaded (`NEXT_PUBLIC_DEMO_ENABLED=true` is already set in Steer's `.env.local`).

## Files

| File | Change |
| --- | --- |
| `lib/copy/en.ts`, `el.ts`, `ru.ts` | `meta.steer` and `products.steer` |
| `app/[locale]/products/steer/page.tsx` | New page on the shared `ProductPage`, `DashboardShot` of the plan screenshot |
| `components/products/ProductPage.tsx` | Optional `siteHref` prop: renders "Open Steer" as an outline button beside "Request a demo" |
| `app/[locale]/products/page.tsx` | Fourth `ProductRow` |
| `components/home/ProductsShowcase.tsx` | Row 3: Steer text on the right, overview screenshot bleeding left (mirror of row 1) |
| `components/products/AppShot.tsx` | `shots.steerOverview`, `shots.steerPlan` |
| `app/sitemap.ts` | `/products/steer` at priority 0.8 |
| `lib/site.ts` | `steerUrl = 'https://steer-dayone.com'` |
| `TRANSLATIONS_REVIEW.md` | Regenerated with `node scripts/translations-review.mts` |
| `CHANGES.md` | One entry |

The nav, footer and contact form stay as they are: Products already links to the index, and the contact form's "demo" intent covers Steer demos.

## Steps

1. Take the two screenshots from the local Steer demo workspace.
2. English copy and the new page, product index row, homepage row, sitemap.
3. `ProductPage` second button.
4. Greek and Russian copy, translation review file.
5. `npm run lint`, `npx tsc --noEmit`, `npm run build`.
6. Nico looks at it on a Vercel preview branch before it merges to main (no local preview without asking first).

## Out of scope

- A landing page on steer-dayone.com (parked separately: three directions saved in Steer's brainstorm folder).
- Pricing on either site (pricing session still open).
- A "by Day One Web Studio" link back from steer-dayone.com; a one-line change in Steer that can follow.
