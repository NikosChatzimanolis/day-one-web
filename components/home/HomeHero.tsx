// ── components/home/HomeHero.tsx ──
// Left-anchored hero with the ghosted Day ONE watermark on the right. Rendered
// without an entrance animation so the h1 is painted as the LCP element the
// moment HTML arrives. No background grid: the reference is plain parchment.
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import BookCall from '@/components/ui/BookCall'
import { copy } from '@/lib/copy'

export default function HomeHero() {
  const t = copy.home.hero
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* ghosted watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-3%] top-[22%] hidden origin-right scale-[1.55] select-none opacity-[0.07] lg:block"
      >
        <Logo variant="mono" size="2xl" />
      </div>

      <div className="container-wide section-hero relative">
        <p className="eyebrow mb-7">{t.eyebrow}</p>
        <h1 className="t-display display-balance max-w-4xl">
          <span className="block">{t.title1}</span>
          <span className="block">{t.title2}</span>
        </h1>
        <p className="t-lead measure-lg display-pretty mt-8 text-text-secondary">{t.sub}</p>
        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <BookCall size="lg" label={t.cta} />
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 font-body text-sm text-accent transition-colors duration-250 hover:text-accent-dark"
          >
            {t.secondary}
            <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
        <p className="mt-12 font-body text-sm text-text-tertiary">{t.note}</p>
      </div>
    </section>
  )
}
