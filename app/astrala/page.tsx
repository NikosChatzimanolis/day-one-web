// ── app/astrala/page.tsx · The Astrala Advisory partnership ──
// Day One is Astrala's external engineering partner: we take technical work
// off their plate, our services reach clients through them, theirs through
// us. Their logo sits in the hero; then how it works, security posture,
// referral structure, link out. Copy from lib/copy;
// no em-dashes.
import type { Metadata } from 'next'
import Link from 'next/link'
import CtaSection from '@/components/sections/CtaSection'
import AstralaLogo from '@/components/brand/AstralaLogo'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { copy } from '@/lib/copy'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: copy.meta.astrala.title,
  description: copy.meta.astrala.description,
  alternates: { canonical: `${site.url}/astrala` },
}

const t = copy.astrala

const arrow = (
  <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">→</span>
)

export default function AstralaPage() {
  return (
    <>
      {/* ── Hero · copy left, their logo on a charcoal plaque right ── */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="container-wide section-hero">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-7">{t.hero.eyebrow}</p>
              <h1 className="t-display display-balance">{t.hero.title}</h1>
              <p className="t-lead measure-lg display-pretty mt-9 text-text-secondary">{t.hero.lead}</p>
              <a
                href={site.astralaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-10 inline-flex items-center gap-1.5 font-body text-sm text-accent transition-colors duration-250 hover:text-accent-dark"
              >
                {t.visit}
                <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">↗</span>
              </a>
            </div>
            <div className="lg:col-span-5">
              <a
                href={site.astralaUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.visit}
                data-no-grid
                className="flex items-center justify-center rounded-xl bg-dark px-10 py-14 transition-opacity duration-250 hover:opacity-90 md:px-14 md:py-16"
              >
                <AstralaLogo tagline={copy.home.strategic.tagline} tone="dark" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── How the partnership works · three hairline columns ── */}
      <section className="border-b border-border bg-bg">
        <div className="container-wide section">
          <Reveal>
            <p className="eyebrow mb-6">{t.how.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="t-h1 display-balance max-w-2xl">{t.how.title}</h2>
          </Reveal>
          <RevealGroup className="mt-12 grid border-t border-border md:grid-cols-3" stagger={0.08}>
            {t.how.items.map((item, i) => (
              <RevealItem
                key={item.title}
                className="border-b border-border py-9 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <span className="t-index text-rust">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="t-h3 mt-5 text-text-primary">{item.title}</h3>
                <p className="mt-4 font-body text-base leading-relaxed text-text-secondary">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Security posture · dark band ───────────────────── */}
      <section className="section-dark">
        <div className="container-wide section">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow mb-6">{t.security.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h1 display-balance">{t.security.title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="t-lead measure-lg display-pretty mt-7">{t.security.body}</p>
            </Reveal>
            <RevealGroup className="mt-9 flex flex-wrap gap-3" stagger={0.06}>
              {t.security.chips.map((chip) => (
                <RevealItem
                  key={chip}
                  as="span"
                  className="inline-flex items-center rounded-full border border-dark-border px-4 py-2 font-body text-sm text-dark-text"
                >
                  {chip}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ── Referral structure ─────────────────────────────── */}
      <section className="border-b border-border bg-bg">
        <div className="container-wide section">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">{t.referral.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.06} className="lg:col-span-7 lg:col-start-6">
              <h2 className="t-h2 display-balance text-text-primary">{t.referral.title}</h2>
              <p className="measure-lg mt-7 font-body text-base leading-relaxed text-text-secondary md:text-lg">
                {t.referral.body}
              </p>
              <Link
                href="/partner"
                className="group mt-8 inline-flex items-center gap-1.5 font-body text-sm text-accent transition-colors duration-250 hover:text-accent-dark"
              >
                {t.referral.link}
                {arrow}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaSection line2={t.ctaLine2} />
    </>
  )
}
