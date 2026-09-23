// ── components/home/HomeHero.tsx ──
// Editorial hero: copy on the left, the ghosted Day ONE lockup top-right and
// the Build / Scale / Maintain timeline level with the buttons, as in the
// reference. Rendered without an entrance animation so the h1 paints as the
// LCP element the moment HTML arrives.
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import BookCall from '@/components/ui/BookCall'
import Timeline from '@/components/sections/Timeline'
import { copy } from '@/lib/copy'

export default function HomeHero() {
  const t = copy.home.hero
  const tl = copy.cta.timeline
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="container-wide section-hero-tight">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">{t.eyebrow}</p>
            <h1 className="display-balance font-display text-[clamp(2.2rem,4.3vw,3.5rem)] font-extralight leading-[1.08] tracking-[-0.01em] text-text-primary">
              <span className="block">{t.title1}</span>
              <span className="block">{t.title2}</span>
            </h1>
            <p className="measure-lg display-pretty mt-6 font-body text-base leading-relaxed text-text-secondary md:text-lg">
              {t.sub}
            </p>
            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <BookCall size="lg" label={t.cta} />
              <Link
                href="/work"
                className="group inline-flex items-center gap-1.5 font-body text-sm text-accent transition-colors duration-250 hover:text-accent-dark"
              >
                {t.secondary}
                <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </div>

          <div className="hidden lg:col-span-5 lg:flex lg:flex-col lg:items-end lg:justify-between">
            <div aria-hidden="true" className="origin-top-right scale-[1.2] select-none opacity-[0.09]">
              <Logo variant="mono" size="xl" />
            </div>
            <Timeline labels={[tl.build, tl.scale, tl.maintain]} tone="light" className="mb-2 w-full max-w-[340px]" />
          </div>
        </div>

        <p className="mt-8 font-body text-sm text-text-tertiary">{t.note}</p>
      </div>
    </section>
  )
}
