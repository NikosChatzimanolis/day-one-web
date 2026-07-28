// ── app/services/page.tsx — Services ──
import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/sections/PageHero'
import CtaSection from '@/components/sections/CtaSection'
import BookCall from '@/components/ui/BookCall'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Two ways to work with Day One: custom systems built for your exact need, and a growth partnership — your in-house team, without the headcount.',
}

const customIncludes = [
  'Web platforms and the applications a business runs on',
  'Internal systems, dashboards and tools, built around how you actually work',
  'The full stack — design, engineering, infrastructure, the parts nobody sees',
  'Built for your exact need, not adapted from someone else’s',
]

const growthIncludes = [
  'Continuous build — the next feature, the next surface, the next thing you need',
  'Brand and content — the voice, the identity, the editorial system that builds a presence',
  'Marketing strategy and systems — the channels, the cadence, the infrastructure that compounds',
  'Improvement and refinement of what’s already live',
  'Care and upkeep, so nothing quietly rots',
  'Visibility — making sure the right people find you',
]

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Two ways to work together. One continuous relationship."
        lead="We don’t sell packages. We build the system your business needs, then keep shaping it as you grow. Where you start depends on what you need first."
      />

      {/* ── Two offerings — reference service cards ─────────── */}
      <section className="bg-bg border-b border-border">
        <div className="container-wide section">
          <RevealGroup className="grid gap-7 md:grid-cols-2" stagger={0.1}>
            {/* Track 1: Custom Systems */}
            <RevealItem className="svc flex flex-col">
              <span className="t-index text-accent">01</span>
              <p className="eyebrow mt-5 mb-3">Build</p>
              <h3 className="t-h3 mb-4 text-text-primary">Custom systems</h3>
              <p className="t-lead text-text-secondary display-pretty">
                The web platforms, applications and systems your business runs on — built for your exact need. Not a template with your logo on it. The real thing, made to fit.
              </p>
              <ul className="mt-7 flex flex-col">
                {customIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3.5 py-4 border-b border-line first:border-t">
                    <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                    <span className="font-body text-base text-text-primary leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <div className="border-t border-line pt-6">
                  <p className="t-h3 text-text-primary">Quoted per project</p>
                  <p className="mt-2 font-body text-sm text-text-tertiary">It starts in conversation. The scope sets the price.</p>
                </div>
                <div className="mt-7">
                  <BookCall size="lg" />
                </div>
              </div>
            </RevealItem>

            {/* Track 2: Growth Partnership */}
            <RevealItem className="svc flex flex-col">
              <span className="t-index text-accent">02</span>
              <p className="eyebrow mt-5 mb-3">Scale + maintain</p>
              <h3 className="t-h3 mb-4 text-text-primary">Growth partnership</h3>
              <p className="t-lead text-text-secondary display-pretty">
                Your in-house team, without the headcount. The same team that built the system keeps shaping it — month after month, as the business moves. This is where the relationship lives.
              </p>
              <ul className="mt-7 flex flex-col">
                {growthIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3.5 py-4 border-b border-line first:border-t">
                    <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                    <span className="font-body text-base text-text-primary leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <div className="border-t border-line pt-6">
                  <p className="t-h3 text-text-primary">
                    From <span className="text-accent">€650</span><span className="text-text-tertiary text-lg">/mo</span>
                  </p>
                  <p className="mt-2 font-body text-sm text-text-tertiary">Tailored to the work. The floor, not the formula.</p>
                </div>
                <div className="mt-7">
                  <BookCall size="lg" />
                </div>
              </div>
            </RevealItem>
          </RevealGroup>

          {/* Fixed-scope security review: a distinct, one-off engagement */}
          <Reveal delay={0.05}>
            <Link
              href="/security"
              data-no-grid
              className="group mt-8 flex flex-col gap-6 border-l-2 border-rust bg-surface/60 pl-7 pr-7 py-8 transition-colors duration-300 hover:bg-surface md:mt-10 md:flex-row md:items-center md:justify-between md:gap-10"
            >
              <div className="max-w-2xl">
                <p className="eyebrow mb-3">Also available · fixed scope</p>
                <h3 className="t-h3 text-text-primary">Security &amp; GDPR review</h3>
                <p className="mt-3 font-body text-base text-text-secondary leading-relaxed measure-lg">
                  A two-week technical security and GDPR review for teams handling customer, financial, or health data. Severity-rated findings and a prioritized fix list.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 font-body text-sm text-accent whitespace-nowrap">
                See the security review
                <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── How they fit — tight measure statement ─────────── */}
      <section data-no-grid className="bg-surface border-b border-border">
        <div className="container-narrow section-sm">
          <Reveal>
            <p className="eyebrow mb-7">How they fit together</p>
            <p className="t-h2 text-text-primary display-balance">
              Most partners start with a build and grow into the partnership. Some join us mid-flight, with a system already in place. Either way, it&rsquo;s one relationship — and the same team stays with it.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaSection
        heading="Not sure where you start? That’s the call."
        sub="Tell us what you’re building toward. We’ll tell you, plainly, how we’d approach it."
      />
    </>
  )
}
