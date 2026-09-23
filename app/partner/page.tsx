// ── app/partner/page.tsx · Partner with Day One ──
// Replaces /services and /white-label (both redirect here). Four partnership
// models, how an engagement starts, the white-label rule and working style
// migrated from the old page, the stack, and the closing band. No em-dashes.
import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import CtaSection from '@/components/sections/CtaSection'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import BookCall from '@/components/ui/BookCall'
import { copy } from '@/lib/copy'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: copy.meta.partner.title,
  description: copy.meta.partner.description,
  alternates: { canonical: `${site.url}/partner` },
}

const t = copy.partner

export default function PartnerPage() {
  return (
    <>
      <PageHero instant eyebrow={t.hero.eyebrow} title={t.hero.title} lead={t.hero.lead} />

      {/* ── Four models · hairline columns ─────────────────── */}
      <section className="border-b border-border bg-bg">
        <div className="container-wide section">
          <Reveal>
            <p className="eyebrow mb-12">{t.modelsEyebrow}</p>
          </Reveal>
          <RevealGroup
            className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.08}
          >
            {t.models.map((m, i) => (
              <RevealItem
                key={m.title}
                className="border-b border-border py-9 sm:pr-8 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <span className="t-index text-rust">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="t-h3 mt-5 text-text-primary">{m.title}</h2>
                <p className="mt-4 font-body text-base leading-relaxed text-text-primary">{m.line1}</p>
                <p className="mt-3 font-body text-base leading-relaxed text-text-secondary">{m.line2}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── How an engagement starts ───────────────────────── */}
      <section data-no-grid className="border-b border-border bg-surface">
        <div className="container-wide section">
          <Reveal>
            <p className="eyebrow mb-12">{t.stepsEyebrow}</p>
          </Reveal>
          <RevealGroup className="grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8" stagger={0.08}>
            {t.steps.map((s, i) => (
              <RevealItem key={s.title} className="relative border-t border-border-strong pt-6">
                <span
                  aria-hidden="true"
                  className="absolute -top-[6px] left-0 block h-[11px] w-[11px] rounded-full border border-rust bg-surface"
                />
                <p className="font-body text-xs uppercase tracking-label text-text-tertiary">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="t-h3 mt-3 text-text-primary">{s.title}</h2>
                <p className="mt-3 font-body text-base leading-relaxed text-text-secondary">{s.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── The rule we never break · migrated from /white-label ── */}
      <section className="section-dark">
        <div className="container-wide section">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">{t.rule.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.06} className="lg:col-span-7 lg:col-start-6">
              <h2 className="t-h1 display-balance">{t.rule.title}</h2>
              <p className="t-lead measure-lg display-pretty mt-7">{t.rule.body}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── How working with us feels · migrated from /white-label ── */}
      <section className="border-b border-border bg-bg">
        <div className="container-wide section">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">{t.process.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.06} className="lg:col-span-7 lg:col-start-6">
              <h2 className="t-h2 display-balance text-text-primary">{t.process.title}</h2>
              <p className="measure-lg mt-7 font-body text-base leading-relaxed text-text-secondary md:text-lg">
                {t.process.body}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Stack · chips ───────────────────────────────────── */}
      <section data-no-grid className="border-b border-border bg-surface">
        <div className="container-wide section-sm">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">{t.stackEyebrow}</p>
            </Reveal>
            <RevealGroup className="flex flex-wrap gap-3 lg:col-span-8" stagger={0.03}>
              {t.stack.map((item) => (
                <RevealItem
                  key={item}
                  as="span"
                  className="inline-flex items-center rounded-full border border-border-strong px-4 py-2 font-body text-sm text-text-secondary"
                >
                  {item}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <Reveal delay={0.1}>
            <div className="mt-12">
              <BookCall size="lg" />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaSection line2={t.ctaLine2} />
    </>
  )
}
