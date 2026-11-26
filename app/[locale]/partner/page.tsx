// ── app/partner/page.tsx · Partner with Day One ──
// Replaces /services and /white-label (both redirect here). Four partnership
// models, how an engagement starts, the white-label rule and working style
// migrated from the old page, the stack, and the closing band. No em-dashes.
import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import CtaSection from '@/components/sections/CtaSection'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import BookCall from '@/components/ui/BookCall'
import { Handshake, Layers, Repeat, Users } from 'lucide-react'
import { getCopy, type Locale } from '@/lib/copy'
import { setRequestLocale, t, localeHref } from '@/lib/copy/request'
import { pageMetadata } from '@/lib/copy/metadata'

type PageProps = { params: Promise<{ locale: Locale }> }

// One icon per partnership model, in the order of the copy: embedded teams,
// white-label engineering, referral and revenue share, monthly retainers.
const modelIcons = [Users, Layers, Handshake, Repeat]

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata(locale, getCopy(locale).meta.partner, '/partner')
}
export default async function PartnerPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = getCopy(locale).partner
  return (
    <>
      <PageHero instant eyebrow={t.hero.eyebrow} title={t.hero.title} lead={t.hero.lead} />

      {/* ── Four models · hairline columns ─────────────────── */}
      <section className="border-b border-border bg-bg">
        <div className="container-wide section">
          <Reveal>
            <p className="eyebrow mb-12">{t.modelsEyebrow}</p>
          </Reveal>
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {t.models.map((m, i) => {
              const Icon = modelIcons[i % modelIcons.length]
              return (
                <RevealItem key={m.title} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-250 ease-out-expo hover:-translate-y-1 hover:border-rust">
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-rust">
                        <Icon size={22} strokeWidth={1.5} />
                      </span>
                      <span className="font-display text-lg tabular-nums text-text-tertiary">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h2 className="t-h3 mt-8 text-text-primary">{m.title}</h2>
                    <p className="mt-4 font-body text-base leading-relaxed text-text-primary">{m.line1}</p>
                    <p className="mt-3 font-body text-base leading-relaxed text-text-secondary">{m.line2}</p>
                  </div>
                </RevealItem>
              )
            })}
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
              <RevealItem key={s.title} className="relative">
                {/* the path between the steps (on one row from lg up) */}
                {i < t.steps.length - 1 && (
                  <span aria-hidden="true" className="absolute left-12 right-[-2rem] top-[1.375rem] hidden h-px bg-border-strong lg:block" />
                )}
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-rust bg-surface font-display text-lg tabular-nums text-rust">
                  {i + 1}
                </span>
                <h2 className="t-h3 mt-6 text-text-primary">{s.title}</h2>
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
                  className="inline-flex items-center rounded-full border border-border-strong bg-card px-4 py-2 font-body text-sm text-text-primary"
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
