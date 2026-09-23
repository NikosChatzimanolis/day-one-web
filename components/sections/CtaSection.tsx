// ── components/sections/CtaSection.tsx ──
// The closing band on every page: dark field, a two-line heading (Jost light
// over a Cormorant italic), and on the right the Build / Scale / Maintain
// timeline above a cream pill and the enquiry link.
import Link from 'next/link'
import BookCall from '@/components/ui/BookCall'
import Reveal from '@/components/ui/Reveal'
import Timeline from '@/components/sections/Timeline'
import { t, localeHref } from '@/lib/copy/request'

interface CtaSectionProps {
  /** First line, Jost light. */
  line1?: string
  /** Second line, Cormorant italic. */
  line2?: string
  /** Optional supporting line under the heading. */
  sub?: string
}

export default function CtaSection({ line1, line2, sub }: CtaSectionProps) {
  const c = t().cta
  const l1 = line1 ?? c.line1
  const l2 = line2 ?? c.line2
  return (
    <section data-no-grid className="section-dark">
      <div className="container-wide section-tight">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <Reveal className="lg:col-span-7">
            <h2 className="display-balance">
              <span className="t-h1 block">{l1}</span>
              <span className="mt-2 block font-cormorant text-[clamp(2.2rem,5vw,3.9rem)] font-normal italic leading-[1.1] tracking-[-0.01em] text-dark-text">
                {l2}
              </span>
            </h2>
            {sub && <p className="t-lead measure-lg display-pretty mt-7">{sub}</p>}
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9">
            <Timeline labels={[c.timeline.build, c.timeline.scale, c.timeline.maintain]} tone="dark" className="max-w-[320px]" />
            <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <BookCall variant="cream" size="lg" label={c.bookCall} />
              <Link
                href={localeHref('/contact')}
                className="group font-body text-sm text-dark-text-secondary transition-colors duration-250 hover:text-dark-text"
              >
                {c.enquiry}
                <span aria-hidden="true" className="ml-1 inline-block transition-transform duration-250 group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
