// ── app/security/page.tsx · Security & GDPR Review ──
// A fixed-scope technical security + GDPR review landing page. Targeted at
// founders of sub-50 SaaS / fintech / data-handling teams in Cyprus & Greece.
// House rules for THIS page: mailto CTAs (not the site BookCall), no em-dashes
// anywhere, "technical review" / "security review" only (never "audit" or
// "penetration test").
import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/sections/PageHero'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import type { Locale } from '@/lib/copy'
import { setRequestLocale, localeHref } from '@/lib/copy/request'

export const metadata: Metadata = {
  title: 'Security & GDPR Review',
  description:
    'Fixed-scope technical security and GDPR compliance reviews for SaaS, fintech, and data-handling companies in Cyprus and Greece. Two weeks from kickoff to a prioritized fix list.',
}

// This page emails a direct address on purpose (not the site-wide contact form).
const EMAIL = 'nikos@dayone-web.com'
const MAILTO = `mailto:${EMAIL}?subject=Exposure%20snapshot%20request`
const ONE_PAGER = '/day-one-security-review.pdf'

// Primary CTA styling, borrowed from the site Button recipe but rendered as a
// plain anchor so mailto / download open in place (no blank tab).
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

const scope = [
  {
    no: '01',
    title: 'Authentication & authorization',
    line: 'Database-level access control (row-level security) included.',
  },
  {
    no: '02',
    title: 'Secrets & configuration',
    line: 'Leaked keys, tokens, and misconfigured environments.',
  },
  {
    no: '03',
    title: 'API exposure',
    line: 'Broken object-level authorization (IDOR) and unauthenticated endpoints.',
  },
  {
    no: '04',
    title: 'Data mapping & retention',
    line: 'What personal data you hold, where it lives, and for how long.',
  },
  {
    no: '05',
    title: 'Logging & breach readiness',
    line: 'Can you detect and respond inside GDPR’s 72-hour window?',
  },
  {
    no: '06',
    title: 'Cloud & CI/CD configuration',
    line: 'Deployment, access, and pipeline security.',
  },
  {
    no: '07',
    title: 'Third-party exposure',
    line: 'Data shared with external services and processors.',
  },
]

const deliverables = [
  {
    title: 'Findings report',
    line: 'Every issue severity-rated (Critical, High, Medium, Low), with evidence and a concrete fix.',
  },
  {
    title: 'Executive summary',
    line: 'One page a non-technical founder or board can read and act on.',
  },
  {
    title: 'Remediation roadmap',
    line: 'A prioritized 30/60/90-day plan. What to fix first, next, and later.',
  },
  {
    title: 'Live debrief',
    line: 'We walk the findings together and you ask anything you want.',
  },
]

const stats = [
  { label: 'Timeline', value: '2 weeks', note: 'Kickoff to fix list' },
  { label: 'Fixed scope', value: '€3,000–5,000', note: 'No hourly billing' },
  { label: 'Ongoing', value: 'from €1,000/mo', note: 'Optional retainer' },
]

type PageProps = { params: Promise<{ locale: Locale }> }

export default async function SecurityPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      <PageHero
        eyebrow="Security & GDPR"
        title="Technical Security & GDPR Compliance Review"
        lead="Fixed-scope reviews for SaaS, fintech, and data-handling companies in Cyprus & Greece. Two weeks from kickoff to a prioritized fix list."
      >
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <a href={MAILTO} data-no-grid className={primaryBtn}>
            Book a free 30-minute exposure snapshot
            {arrow}
          </a>
          <span className="font-body text-sm text-text-tertiary">
            Free 30-minute call. No obligation.
          </span>
        </div>
      </PageHero>

      {/* ── Problem · tight measured statement ─────────────── */}
      <section data-no-grid className="bg-surface border-b border-border">
        <div className="container-narrow section-sm">
          <Reveal>
            <p className="eyebrow mb-7">The exposure</p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="t-h2 text-text-primary display-balance">
              If your product holds customer, financial, or health data, you carry GDPR liability whether or not anyone has checked your systems.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 font-body text-base md:text-lg text-text-secondary leading-relaxed measure-lg">
              Most teams under 50 people have no in-house security function. The gaps that cause breaches (broken access control, exposed secrets, weak API authorization) stay invisible until someone exploits them or a regulator asks.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Scope · seven editorial numbered rows ──────────── */}
      <section className="bg-bg border-b border-border">
        <div className="container-wide section">
          <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <p className="eyebrow mb-5">What the review covers</p>
              <h2 className="t-h1 display-balance">Seven surfaces. One pass.</h2>
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-7 md:col-start-6 md:self-end">
              <p className="font-body text-base md:text-lg text-text-secondary leading-relaxed measure-lg">
                Each engagement is scoped to your stack. These are the seven places attackers and regulators look first, checked by hand and traced to a fix.
              </p>
            </Reveal>
          </div>

          <RevealGroup className="border-b border-border" stagger={0.07}>
            {scope.map((item) => (
              <RevealItem
                key={item.no}
                className="grid grid-cols-1 items-baseline gap-2 border-t border-border py-8 md:grid-cols-12 md:gap-8 md:py-9"
              >
                <span className="t-index text-accent md:col-span-1">{item.no}</span>
                <h3 className="t-h3 text-text-primary md:col-span-4">{item.title}</h3>
                <p className="font-body text-base leading-relaxed text-text-secondary measure-lg md:col-span-6 md:col-start-7 md:text-lg">
                  {item.line}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Deliverables · offset numbered grid ────────────── */}
      <section data-no-grid className="bg-surface border-b border-border">
        <div className="container-wide section">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow mb-7">What you get</p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="t-h1 max-w-xs display-balance">Four things you can act on.</h2>
              </Reveal>
            </div>

            <RevealGroup
              className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:col-span-7 lg:col-start-6"
              stagger={0.1}
            >
              {deliverables.map((item, i) => (
                <RevealItem key={item.title}>
                  <span className="t-index text-muted">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="t-h3 mt-4 text-text-primary">{item.title}</h3>
                  <p className="mt-3 font-body text-base text-text-secondary leading-relaxed measure">
                    {item.line}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ── Pricing band · dark stat strip ─────────────────── */}
      <section className="section-dark">
        <div className="container-wide section">
          <Reveal className="mb-14 md:mb-16">
            <p className="eyebrow mb-6">The engagement</p>
            <h2 className="t-h1 display-balance">Fixed scope. Fixed price.</h2>
          </Reveal>

          <RevealGroup
            className="grid gap-y-10 sm:grid-cols-3 sm:gap-y-0"
            stagger={0.1}
          >
            {stats.map((stat) => (
              <RevealItem
                key={stat.label}
                className="border-t border-dark-border pt-7 sm:border-t-0 sm:border-l sm:pl-8 sm:pt-0 sm:first:border-l-0 sm:first:pl-0"
              >
                <p className="eyebrow mb-4">{stat.label}</p>
                <p className="t-display text-dark-text">{stat.value}</p>
                <p className="mt-3 font-body text-sm text-dark-text-secondary">{stat.note}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <p className="mt-14 font-body text-base md:text-lg text-dark-text-secondary measure-lg">
              Scoped to your stack. No hourly surprises.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Why me · credibility statement ─────────────────── */}
      <section className="bg-bg border-b border-border">
        <div className="container-wide section">
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-3">
              <p className="eyebrow">Who runs the review</p>
            </Reveal>
            <div className="md:col-span-8 md:col-start-5">
              <Reveal>
                <p className="t-h2 text-text-primary display-balance">
                  I build these systems, so I know how they fail.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-8 font-body text-base md:text-lg text-text-secondary leading-relaxed measure-lg">
                  Full-stack developer specializing in application security, with 8+ years across web, mobile, and AI products. Recent work includes breach investigation and remediation: database-level access-control hardening, secrets rotation, and a full findings-to-remediation roadmap.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────── */}
      <section data-no-grid className="bg-surface-deep border-t border-border">
        <div className="container-wide section">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-7">Start here</p>
            <h2 className="t-h1 display-balance">Not sure where you stand?</h2>
            <p className="t-lead mt-7 text-text-secondary measure-lg display-pretty">
              A free 30-minute exposure snapshot: walk me through your stack and I’ll tell you the first places I’d look. No obligation.
            </p>

            <div className="mt-11 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <a href={MAILTO} data-no-grid className={primaryBtn}>
                {EMAIL}
                {arrow}
              </a>
              <a
                href={ONE_PAGER}
                download
                className="group inline-flex items-center gap-1.5 font-body text-sm text-text-secondary transition-colors duration-250 hover:text-accent"
              >
                Download the one-pager (PDF)
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-250 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </a>
            </div>

            <div className="mt-12 border-t border-border pt-7">
              <Link
                href="/"
                className="group inline-flex items-center gap-1.5 font-body text-sm text-text-tertiary transition-colors duration-250 hover:text-accent"
              >
                A Day One service. See the studio
                {arrow}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
