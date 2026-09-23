// ── app/work/page.tsx · Work / Proof ──
// Order is deliberate: Forge leads the page, the delivered client sites and
// the Astrala partnership follow as a grouped band of smaller cards, then the
// stubs. New copy on this page avoids em-dashes.
import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import PageHero from '@/components/sections/PageHero'
import CtaSection from '@/components/sections/CtaSection'
import BookCall from '@/components/ui/BookCall'
import { Button } from '@/components/ui/Button'
import ForgeMock from '@/components/forge/ForgeMock'
import SiteShot from '@/components/work/SiteShot'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import Link from 'next/link'
import { getCopy, type Locale } from '@/lib/copy'
import { setRequestLocale, localeHref } from '@/lib/copy/request'

type PageProps = { params: Promise<{ locale: Locale }> }

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Forge, the production task system we built and run; delivered sites for Delbeteris and Ta Pinakia; and the Astrala Advisory partnership.',
}

interface Block {
  label: string
  body: string
}

function CaseBlocks({ blocks, dark }: { blocks: Block[]; dark?: boolean }) {
  return (
    <div
      className={cn(
        'mt-14 grid sm:grid-cols-3 border-t divide-y sm:divide-y-0 sm:divide-x',
        dark ? 'border-dark-border divide-dark-border' : 'border-border divide-border'
      )}
    >
      {blocks.map((b) => (
        <div key={b.label} className="py-8 sm:py-9 sm:px-8 first:sm:pl-0 last:sm:pr-0">
          <p className="eyebrow mb-4">{b.label}</p>
          <p className={cn('font-body text-base leading-relaxed', dark ? 'text-[#A39E96]' : 'text-text-secondary')}>
            {b.body}
          </p>
        </div>
      ))}
    </div>
  )
}

const forgeBlocks: Block[] = [
  {
    label: 'The need',
    body: 'Off-the-shelf trackers didn’t fit how the studio actually works. We needed one page per task, a queue instead of a daily to-do list, and software quiet enough to think in.',
  },
  {
    label: 'What we built',
    body: 'A production task management PWA: two queue lanes you drag to reorder, one page per task holding its intent and its steps, autosave, and sync across devices.',
  },
  {
    label: 'Where it stands',
    body: 'Live and in daily use as the studio’s operational backbone. In early access, free for now, and in active development.',
  },
]

// Anchors for the homepage Selected Work strip. Stubs carry only the name and
// category from the brief; details are added when each case study is written.
const moreWork = [
  { id: 'cy-construction', href: '/products/construction-erp' },
  { id: 'forex' },
] as const

export default async function WorkPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const copy = getCopy(locale)
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Real systems. Live and in use."
        lead="We don’t show logo walls. We show the things we built, what they needed to do, and what happened next."
      />

      {/* ── Forge · product, built and run by Day One ───────── */}
      <section id="forge" className="bg-bg border-b border-border scroll-mt-24">
        <div className="container-wide section">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-center">
            <div>
              <Reveal>
                <p className="eyebrow mb-6">Product · Built and run by Day One</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="t-h1 display-balance">Forge</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="t-lead mt-7 text-text-secondary measure display-pretty">
                  We built it because we needed it. It became the operational backbone the studio
                  runs on, and it ships to early-access users today.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-7 font-body text-sm text-text-tertiary tracking-wide">
                  Product · PWA · Live in early access
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <ForgeMock />
            </Reveal>
          </div>

          <Reveal>
            <CaseBlocks blocks={forgeBlocks} />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-12">
              <Button href={localeHref('/forge')} variant="outline" size="lg" arrow>
                See Forge in detail
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Brand & local business work · grouped smaller cards ── */}
      <section className="bg-bg border-b border-border">
        <div className="container-wide section">
          <Reveal>
            <p className="eyebrow mb-6">Delivered &amp; ongoing</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="t-h2 display-balance max-w-3xl">Brand &amp; local business work</h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
            {/* Delbeteris */}
            <RevealItem className="h-full" as="div">
              <article id="delbeteris" className="svc flex h-full flex-col scroll-mt-24">
                <SiteShot
                  url="delbeteristransfer.com"
                  src="/work/delbeteris-site.jpg"
                  alt="The Delbeteris home page: a black Mercedes van at Kavala airport under the headline Private Transfers and Tours Kavala"
                />
                <p className="eyebrow-muted mt-7 mb-3">Delivered build · Greece</p>
                <h3 className="t-h3 mb-3">Delbeteris</h3>
                <p className="font-body text-base leading-relaxed text-text-secondary">
                  A clean, fast site for a private-transfer company in Kavala. Built to be read on
                  a phone, trusted at a glance, and booked against.
                </p>
                <p className="mt-4 font-body text-sm leading-relaxed text-text-tertiary">
                  Page one on Google before the season started: average position 7.5 with a 4.4%
                  click-through rate across its first four months.
                </p>
                <a
                  href="https://delbeteristransfer.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-auto inline-flex items-center gap-1 pt-6 font-body text-sm text-accent transition-colors duration-250 hover:text-accent-dark"
                >
                  View live
                  <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">↗</span>
                </a>
              </article>
            </RevealItem>

            {/* Ta Pinakia */}
            <RevealItem className="h-full" as="div">
              <article id="ta-pinakia" className="svc flex h-full flex-col scroll-mt-24">
                <SiteShot
                  url="tapinakia.com"
                  src="/work/ta-pinakia-site.jpg"
                  alt="The Ta Pinakia home page: the restaurant’s painted-plate wall behind its Greek signage"
                />
                <p className="eyebrow-muted mt-7 mb-3">Delivered build · Cyprus</p>
                <h3 className="t-h3 mb-3">Ta Pinakia</h3>
                <p className="font-body text-base leading-relaxed text-text-secondary">
                  A warm, appetite-first site for a Cyprus restaurant. Easy to find, easy to read
                  on a phone, and ready before the first guest arrives.
                </p>
                <p className="mt-4 font-body text-sm leading-relaxed text-text-tertiary">
                  An audience from zero: 564 visitors and 1,298 page views in one recent week, with
                  no previous website to build on.
                </p>
                <a
                  href="https://tapinakia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-auto inline-flex items-center gap-1 pt-6 font-body text-sm text-accent transition-colors duration-250 hover:text-accent-dark"
                >
                  View live
                  <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">↗</span>
                </a>
              </article>
            </RevealItem>

            {/* Astrala Advisory */}
            <RevealItem className="h-full" as="div">
              <article id="astrala" className="svc flex h-full flex-col scroll-mt-24">
                <SiteShot
                  url="astralaadvisory.eu.com"
                  src="/work/astrala-site.jpg"
                  alt="The Astrala Advisory home page: a deep navy hero with a wireframe globe and serif headline"
                />
                <p className="eyebrow-muted mt-7 mb-3">Strategic partner · Engineering capacity</p>
                <h3 className="t-h3 mb-3">Astrala Advisory</h3>
                <p className="font-body text-base leading-relaxed text-text-secondary">
                  We take technical work off their plate when they need capacity. Our services reach
                  clients through Astrala, and their services reach clients through us.
                </p>
                <p className="mt-4 font-body text-sm leading-relaxed text-text-tertiary">
                  External engineering team · Services offered through each other
                </p>
                <a
                  href="https://astralaadvisory.eu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-auto inline-flex items-center gap-1 pt-6 font-body text-sm text-accent transition-colors duration-250 hover:text-accent-dark"
                >
                  View live
                  <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">↗</span>
                </a>
              </article>
            </RevealItem>
          </RevealGroup>

          <Reveal delay={0.08}>
            <div className="mt-12">
              <BookCall size="lg" label="Start a build like this" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── More work · stubs ─────────────────────────────── */}
      <section data-no-grid className="bg-surface border-b border-border">
        <div className="container-wide section">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow mb-6">{copy.work.more.eyebrow}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="t-h2 display-balance max-w-xs">{copy.work.more.title}</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 font-body text-sm text-text-tertiary">{copy.work.more.note}</p>
              </Reveal>
            </div>
            <RevealGroup className="lg:col-span-7 lg:col-start-6 flex flex-col" stagger={0.08}>
              {copy.work.stubs.map((stub, i) => {
                const entry = moreWork[i]
                return (
                  <RevealItem
                    key={entry.id}
                    className={cn(
                      'flex flex-col gap-2 border-t border-border-strong py-6 scroll-mt-24 sm:flex-row sm:items-baseline sm:justify-between',
                      i === copy.work.stubs.length - 1 && 'border-b'
                    )}
                  >
                    <span id={entry.id} className="flex flex-col gap-1">
                      <span className="t-h3 text-text-primary">{stub.name}</span>
                      <span className="font-body text-sm text-text-tertiary">{stub.kind}</span>
                    </span>
                    {'href' in entry && (
                      <Link
                        href={localeHref(entry.href)}
                        className="group inline-flex items-center gap-1.5 font-body text-sm text-accent transition-colors duration-250 hover:text-accent-dark"
                      >
                        {copy.work.more.seeProduct}
                        <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">→</span>
                      </Link>
                    )}
                  </RevealItem>
                )
              })}
            </RevealGroup>
          </div>
        </div>
      </section>

      <CtaSection
        line1="Your build could be the next one here."
        sub="Tell us what you need to exist. We will tell you how we would build it."
      />
    </>
  )
}
