// ── components/home/SecurityBar.tsx ──
// Single-row outlined bar pointing at the fixed-scope security review.
import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import { copy } from '@/lib/copy'

export default function SecurityBar() {
  const t = copy.home.securityBar
  return (
    <section className="bg-bg">
      <div className="container-wide section-sm">
        <Reveal>
          <Link
            href="/security"
            data-no-grid
            className="group flex flex-col gap-3 rounded-sm border border-border-strong px-6 py-5 transition-colors duration-300 hover:border-text-primary md:flex-row md:items-center md:gap-8"
          >
            <span className="font-body text-base text-text-primary md:border-r md:border-border md:pr-8">{t.title}</span>
            <span className="flex-1 font-body text-sm leading-relaxed text-text-secondary">{t.body}</span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-body text-sm text-accent">
              {t.link}
              <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">→</span>
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
