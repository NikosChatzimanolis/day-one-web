// ── components/home/StrategicPartner.tsx ──
// Dark band: the Astrala Advisory partnership, two outlined chips, and the
// Astrala wordmark linking out to their site.
import Link from 'next/link'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import AstralaLogo from '@/components/brand/AstralaLogo'
import { t, localeHref } from '@/lib/copy/request'
import { site } from '@/lib/site'

export default function StrategicPartner() {
  const c = t().home.strategic
  return (
    <section className="section-dark">
      <div className="container-wide section-tight">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow flex items-center gap-4">
                {c.eyebrow}
                <span aria-hidden="true" className="block h-px w-10 bg-dark-border" />
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h1 display-balance mt-5">
                <Link href={localeHref('/astrala')} className="transition-colors duration-250 hover:text-rust">
                  {c.title}
                </Link>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="measure-lg display-pretty mt-5 font-body text-base leading-relaxed md:text-lg">{c.sub}</p>
            </Reveal>
            <RevealGroup className="mt-7 flex flex-wrap gap-3" stagger={0.06}>
              {c.chips.map((chip) => (
                <RevealItem
                  key={chip}
                  as="span"
                  className="inline-flex items-center rounded-sm border border-dark-border px-3.5 py-2 font-body text-sm text-dark-text"
                >
                  {chip}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <Reveal delay={0.12} className="flex justify-center lg:col-span-4 lg:col-start-9 lg:justify-end">
            <a
              href={site.astralaUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={c.visit}
              className="w-full max-w-[380px] transition-opacity duration-250 hover:opacity-80"
            >
              <AstralaLogo tagline={c.tagline} tone="dark" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
