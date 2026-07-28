// ── app/white-label/page.tsx · White-label development for agencies ──
// Standalone conversion page for agency owners and CTOs evaluating Day One as
// a white-label development subcontractor. Linked from cold pitch emails, so
// it must stand on its own. House rule: no em-dashes anywhere on this page.
import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/sections/PageHero'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import BookCall from '@/components/ui/BookCall'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  // The exact required title, bypassing the site-wide title template.
  title: { absolute: 'White-Label Development for Agencies | Day One' },
  description:
    'Overflow and white-label builds for agencies. Your client, your brand, our build. Next.js, React, React Native. Start with a small paid test task.',
  alternates: { canonical: `${site.url}/white-label` },
}

const MAILTO = `mailto:${site.email}?subject=Test%20task%20proposal`

// Primary CTA styling, borrowed from the site Button recipe but rendered as a
// plain anchor so the mailto opens in place (no blank tab).
const primaryBtn =
  'group relative inline-flex items-center justify-center gap-2 font-body font-medium rounded-sm px-8 py-4 text-sm bg-accent text-white transition-all duration-250 ease-out-expo hover:bg-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2'

const arrow = (
  <span
    aria-hidden="true"
    className="transition-transform duration-250 ease-out-expo group-hover:translate-x-0.5"
  >
    →
  </span>
)

const stack = [
  'Next.js',
  'React',
  'React Native',
  'Expo',
  'TypeScript',
  'Node.js',
  'Supabase',
  'PostgreSQL',
  'Stripe',
  'Azure',
  'CI/CD pipelines',
  'REST and GraphQL APIs',
]

const fit = [
  {
    no: '01',
    title: 'Overflow builds',
    body: 'You sold more than the team can ship this quarter. We take the whole build or a defined slice.',
  },
  {
    no: '02',
    title: 'Features and rescues',
    body: 'A stuck project, a feature the team has no bandwidth for, a migration nobody wants.',
  },
  {
    no: '03',
    title: 'Ongoing capacity',
    body: 'A reliable external pair of senior hands, available across projects.',
  },
]

export default function WhiteLabelPage() {
  return (
    <>
      <PageHero
        instant
        eyebrow="White-label"
        title="White-label development for agencies."
        lead="Your client. Your brand. Our build."
      >
        <p className="font-body text-base md:text-lg text-text-secondary leading-relaxed measure-lg display-pretty">
          Day One takes overflow builds for agencies at project rates. We stay invisible, you stay
          the hero.
        </p>
      </PageHero>

      {/* ── The rule we never break · the trust anchor of the page ── */}
      <section className="bg-bg border-b border-border">
        <div className="container-wide section">
          <Reveal>
            <div
              className="section-dark relative overflow-hidden rounded-sm p-[clamp(2.25rem,5vw,4.5rem)]"
              style={{ border: '1px solid rgba(192, 76, 42, 0.45)' }}
            >
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{
                  background:
                    'radial-gradient(120% 120% at 22% 115%, rgba(192, 76, 42, 0.28), transparent 60%)',
                }}
              />
              <div className="relative z-10">
                <p className="eyebrow mb-7">The rule we never break</p>
                <h2 className="t-h2 display-balance max-w-3xl">We never contact your clients.</h2>
                <p className="t-lead mt-7 measure-lg display-pretty">
                  Not during the project, not after. NDA is standard on every engagement, and every
                  deliverable ships under your brand. Your client relationship is the asset, and it
                  stays yours.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Stack · scannable tag list ─────────────────────── */}
      <section data-no-grid className="bg-surface border-b border-border">
        <div className="container-wide section-sm">
          <Reveal>
            <p className="eyebrow mb-10">Stack</p>
          </Reveal>
          <RevealGroup className="flex max-w-3xl flex-wrap gap-3" stagger={0.03}>
            {stack.map((item) => (
              <RevealItem
                key={item}
                as="span"
                className="inline-flex items-center rounded-sm border border-border-strong bg-card px-4 py-2 font-body text-sm text-text-secondary"
              >
                {item}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Where we fit · hairline columns, no boxes ──────── */}
      <section className="bg-bg border-b border-border">
        <div className="container-wide section">
          <Reveal>
            <p className="eyebrow mb-14">Where we fit</p>
          </Reveal>
          <RevealGroup
            className="grid border-t border-border divide-y md:grid-cols-3 md:divide-y-0 md:divide-x divide-border"
            stagger={0.1}
          >
            {fit.map((f) => (
              <RevealItem key={f.title} className="py-9 md:py-10 md:px-9 first:md:pl-0 last:md:pr-0">
                <span className="t-index text-rust">{f.no}</span>
                <h3 className="t-h3 mt-5 mb-3">{f.title}</h3>
                <p className="font-body text-base leading-relaxed text-text-secondary">{f.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── How working with us feels · dark statement band ── */}
      <section className="section-dark">
        <div className="container-wide section">
          <Reveal>
            <p className="eyebrow mb-8">How working with us feels</p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="t-h2 display-balance max-w-4xl">Pull requests, not zip files.</p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-9 font-body text-base md:text-lg leading-relaxed measure-lg">
              We work inside your process, your PM tool, your repos, your review flow. We
              communicate daily in writing and are available for standups when it matters. Based in
              Cyprus, EET timezone, one hour ahead of CET, so collaboration happens same-day, not
              overnight.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Start small · the paid test task ───────────────── */}
      <section data-no-grid className="bg-surface border-b border-border">
        <div className="container-wide section">
          <Reveal>
            <p className="eyebrow mb-8">Start small</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-h2 display-balance max-w-4xl">
              Every new agency relationship starts with a small paid test task.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-9 font-body text-base md:text-lg text-text-secondary leading-relaxed measure-lg">
              A component, a bugfix, a small feature, priced flat. You judge the code, the
              communication, and the speed before anything bigger is on the table.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-11">
              <a href={MAILTO} data-no-grid className={primaryBtn}>
                Propose a test task
                {arrow}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Proof · two cards into the work ────────────────── */}
      <section className="bg-bg border-b border-border">
        <div className="container-wide section">
          <Reveal>
            <p className="eyebrow mb-10">Proof</p>
          </Reveal>
          <RevealGroup className="grid gap-6 md:grid-cols-2" stagger={0.1}>
            <RevealItem className="h-full">
              <Link href="/forge" className="svc group flex h-full flex-col">
                <p className="eyebrow-muted mb-5">Product</p>
                <h3 className="t-h3 mb-3">Forge</h3>
                <p className="font-body text-base leading-relaxed text-text-secondary">
                  A production task management PWA, designed, built, and shipped solo. Queue
                  system, AI-assisted step extraction, server-side encrypted keys.
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-8 font-body text-sm text-accent">
                  See Forge
                  {arrow}
                </span>
              </Link>
            </RevealItem>
            <RevealItem className="h-full">
              <Link href="/work#platform" className="svc group flex h-full flex-col">
                <p className="eyebrow-muted mb-5">Platform engineering</p>
                <h3 className="t-h3 mb-3">Recruitment and operations platform</h3>
                <p className="font-body text-base leading-relaxed text-text-secondary">
                  48,000 lines of code across 6 services. Security audit, RLS hardening, Azure
                  infrastructure, CI/CD migration.
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-8 font-body text-sm text-accent">
                  Read the case study
                  {arrow}
                </span>
              </Link>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* ── Closing CTA ────────────────────────────────────── */}
      <section data-no-grid className="bg-surface-deep border-t border-border">
        <div className="container-wide section">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-7">Work with us</p>
            <h2 className="t-h1 display-balance">Send us the project you are behind on.</h2>
            <div className="mt-11 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <BookCall size="lg" />
              <a
                href={`mailto:${site.email}`}
                className="mail-sweep font-body text-base text-text-secondary"
              >
                {site.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
