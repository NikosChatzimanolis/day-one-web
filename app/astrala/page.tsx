// ── app/astrala/page.tsx · The Astrala Advisory partnership ──
// What Day One builds for Astrala, the white-label deployments, the security
// posture, the referral structure, and a link out to their site. Copy comes
// from lib/copy; no em-dashes.
import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/sections/PageHero'
import CtaSection from '@/components/sections/CtaSection'
import ProductFrame from '@/components/products/ProductFrame'
import NexusMock from '@/components/work/NexusMock'
import AstralaWordmark from '@/components/brand/AstralaWordmark'
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
      <PageHero instant eyebrow={t.hero.eyebrow} title={t.hero.title} lead={t.hero.lead}>
        <a
          href={site.astralaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 font-body text-sm text-accent transition-colors duration-250 hover:text-accent-dark"
        >
          {t.visit}
          <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">↗</span>
        </a>
      </PageHero>

      {/* ── What we build for them ─────────────────────────── */}
      <section className="border-b border-border bg-bg">
        <div className="container-wide section">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow mb-6">{t.build.eyebrow}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="t-h1 display-balance">{t.build.title}</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="measure display-pretty mt-7 font-body text-base leading-relaxed text-text-secondary md:text-lg">
                  {t.build.body}
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
              <ProductFrame variant="bleed" className="aspect-[4/3] md:aspect-[16/10]">
                <NexusMock />
              </ProductFrame>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── White-label deployments ────────────────────────── */}
      <section data-no-grid className="border-b border-border bg-surface">
        <div className="container-wide section">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">{t.whiteLabel.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.06} className="lg:col-span-7 lg:col-start-6">
              <h2 className="t-h2 display-balance text-text-primary">{t.whiteLabel.title}</h2>
              <p className="measure-lg mt-7 font-body text-base leading-relaxed text-text-secondary md:text-lg">
                {t.whiteLabel.body}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Security posture · dark band with the wordmark ─── */}
      <section className="section-dark">
        <div className="container-wide section">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="lg:col-span-7">
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
            <Reveal delay={0.12} className="flex justify-center lg:col-span-4 lg:col-start-9">
              <a
                href={site.astralaUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.visit}
                className="transition-opacity duration-250 hover:opacity-80"
              >
                <AstralaWordmark tagline={copy.home.strategic.tagline} tone="dark" />
              </a>
            </Reveal>
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
