// ── components/home/SelectedWork.tsx ──
// Featured Astrala Nexus (copy left, candidates mockup right) over a
// five-column hairline strip of further work, each entry linking to its
// anchor on /work.
import Link from 'next/link'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import ProductFrame from '@/components/products/ProductFrame'
import NexusMock from '@/components/work/NexusMock'
import { copy } from '@/lib/copy'

const stripHrefs = ['/work#cy-construction', '/work#forex', '/work#delbeteris', '/work#taxi-xanthi', '/work#sun-seals']

export default function SelectedWork() {
  const t = copy.home.selectedWork
  return (
    <section className="border-b border-border bg-bg">
      <div className="container-wide section-tight">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow mb-6">{t.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h2 text-text-primary">
                <Link href="/astrala" className="transition-colors duration-250 hover:text-accent">
                  {t.featured.name}
                </Link>
              </h2>
              <p className="mt-2 font-body text-base text-text-tertiary">{t.featured.kind}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="measure display-pretty mt-6 font-body text-base leading-relaxed text-text-secondary">
                {t.featured.body}
              </p>
              <Link
                href="/astrala"
                className="group mt-6 inline-flex items-center gap-1.5 font-body text-sm text-accent transition-colors duration-250 hover:text-accent-dark"
              >
                {t.featured.link}
                <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">→</span>
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-8">
            <ProductFrame variant="bleed" lazy className="aspect-[4/3] md:aspect-[16/9]">
              <NexusMock />
            </ProductFrame>
          </Reveal>
        </div>

        <RevealGroup
          className="mt-10 grid border-t border-border sm:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-border"
          stagger={0.06}
        >
          {t.strip.map((item, i) => (
            <RevealItem key={item.name} className="border-b border-border lg:border-b-0">
              <Link
                href={stripHrefs[i]}
                className="group flex items-center justify-between gap-4 py-5 pr-4 transition-colors duration-250 hover:text-accent lg:px-6 lg:first:pl-0 lg:last:pr-0"
              >
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="truncate font-body text-base text-text-primary transition-colors duration-250 group-hover:text-accent">
                    {item.name}
                  </span>
                  <span className="truncate font-body text-sm text-text-tertiary">{item.kind}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-text-tertiary transition-all duration-250 group-hover:translate-x-0.5 group-hover:text-accent"
                >
                  →
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
