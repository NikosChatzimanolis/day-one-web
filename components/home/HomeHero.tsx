// ── components/home/HomeHero.tsx ──
// Editorial hero: a large two-line headline (Jost light over the Cormorant
// italic, the same pairing as the closing band), the copy and CTAs on the
// left, the product collage running off the right edge, and the Build /
// Scale / Maintain timeline drawing itself on load. The h1 renders without
// an entrance so it paints as the LCP element the moment HTML arrives.
import Link from 'next/link'
import BookCall from '@/components/ui/BookCall'
import Timeline from '@/components/sections/Timeline'
import HeroCollage from '@/components/home/HeroCollage'
import { copy } from '@/lib/copy'

export default function HomeHero() {
  const t = copy.home.hero
  const tl = copy.cta.timeline
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="container-wide section-hero-tight">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-6">{t.eyebrow}</p>
            <h1 className="text-text-primary lg:w-[108%] lg:max-w-none">
              <span className="block font-display text-[clamp(2.6rem,4.6vw,4.4rem)] font-extralight leading-[1.04] tracking-[-0.015em]">
                {t.title1}
              </span>
              <span className="mt-1 block font-cormorant text-[clamp(2.9rem,5.1vw,4.9rem)] font-normal italic leading-[1.02] tracking-[-0.01em]">
                {t.title2}
              </span>
            </h1>
            <p className="measure-lg display-pretty mt-7 font-body text-base leading-relaxed text-text-secondary md:text-lg">
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
            <p className="mt-10 font-body text-sm text-text-tertiary">{t.note}</p>
          </div>

          <div className="flex flex-col lg:col-span-6">
            <HeroCollage />
            <Timeline
              labels={[tl.build, tl.scale, tl.maintain]}
              tone="light"
              animate
              className="mt-8 w-full max-w-[520px] self-start lg:mt-12 lg:self-end"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
