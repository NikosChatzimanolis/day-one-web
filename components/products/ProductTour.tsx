// ── components/products/ProductTour.tsx ──
// A screenshot tour for a product page: a near-black full-bleed band
// (Steer's own dark context, .section-dark + .steer-dark) with a heading,
// then one large screenshot per step in Steer's coloured stage. On desktop
// the image alternates right and left of its text; stacked (text first)
// below lg. The frame is aria-hidden like every ProductFrame, so each step's
// alt text sits on a role="img" wrapper around it.
import Reveal from '@/components/ui/Reveal'
import ProductFrame from '@/components/products/ProductFrame'
import { DashboardShot } from '@/components/products/AppShot'
import { cn } from '@/lib/utils'

export interface TourStep {
  src: string
  /** Short name of the screen (Overview, Change plans, ...). */
  label: string
  title: string
  body: string
  alt: string
}

export interface Tour {
  eyebrow: string
  title: string
  steps: TourStep[]
}

export default function ProductTour({ tour }: { tour: Tour }) {
  return (
    <section data-no-grid className="section-dark steer-dark">
      <div className="container-wide section">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-7">{tour.eyebrow}</p>
          <h2 className="t-h1 display-balance">{tour.title}</h2>
        </Reveal>

        <ol className="mt-14 flex flex-col gap-16 md:mt-20 md:gap-24">
          {tour.steps.map((step, i) => {
            const flip = i % 2 === 1
            return (
              <li key={step.src} className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
                <Reveal className={cn('lg:col-span-4', flip && 'lg:order-2')}>
                  <p className="eyebrow flex items-center gap-4">
                    <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <span aria-hidden="true" className="block h-px w-8 bg-steer" />
                    <span>{step.label}</span>
                  </p>
                  <h3 className="t-h3 display-balance mt-6">{step.title}</h3>
                  <p className="measure display-pretty mt-4 font-body text-base leading-relaxed md:text-lg">{step.body}</p>
                </Reveal>
                <Reveal delay={0.08} className={cn('lg:col-span-8', flip && 'lg:order-1')}>
                  <div role="img" aria-label={step.alt}>
                    {/* 16:11 panel, 6% padding: the 16:10 screen fits whole, uncropped */}
                    <ProductFrame tone="steer" variant="center" lazy className="aspect-[16/11]">
                      <div className="relative aspect-[16/10] w-full">
                        <DashboardShot src={step.src} sizes="(min-width: 1280px) 660px, (min-width: 1024px) 55vw, 100vw" />
                      </div>
                    </ProductFrame>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
