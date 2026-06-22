// ── components/sections/CtaSection.tsx ──
import Link from 'next/link'
import BookCall from '@/components/ui/BookCall'
import Reveal from '@/components/ui/Reveal'

interface CtaSectionProps {
  /** Override the heading for page-specific framing */
  heading?: string
  eyebrow?: string
  /** Optional supporting line under the heading */
  sub?: string
}

export default function CtaSection({
  heading = 'Build, scale, maintain. Let’s start with a call.',
  eyebrow = 'Work with us',
  sub,
}: CtaSectionProps) {
  return (
    <section data-no-grid className="bg-surface-deep border-t border-border">
      <div className="container-wide section">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-7">{eyebrow}</p>
          <h2 className="t-h1 display-balance">{heading}</h2>
          {sub && (
            <p className="t-lead mt-7 text-text-secondary measure-lg display-pretty">{sub}</p>
          )}
          <div className="mt-11 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <BookCall size="lg" />
            <Link
              href="/contact"
              className="group font-body text-sm text-text-secondary hover:text-accent transition-colors duration-250"
            >
              Or send a project enquiry
              <span aria-hidden="true" className="ml-1 inline-block transition-transform duration-250 group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
