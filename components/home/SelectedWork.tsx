// ── components/home/SelectedWork.tsx ──
// Featured Delbeteris (copy left, the live site in a window frame on the
// right) over a two-column hairline strip of further work, each entry
// linking to its anchor on /work.
import Link from 'next/link'
import Image from 'next/image'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import WindowFrame from '@/components/products/WindowFrame'
import { t, localeHref } from '@/lib/copy/request'

const stripHrefs = ['/work#cy-construction', '/work#forex']

export default function SelectedWork() {
  const c = t().home.selectedWork
  return (
    <section className="border-b border-border bg-bg">
      <div className="container-wide section-tight">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow mb-6">{c.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h2 text-text-primary">
                <Link href={localeHref('/work#delbeteris')} className="transition-colors duration-250 hover:text-accent">
                  {c.featured.name}
                </Link>
              </h2>
              <p className="mt-2 font-body text-base text-text-tertiary">{c.featured.kind}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="measure display-pretty mt-6 font-body text-base leading-relaxed text-text-secondary">
                {c.featured.body}
              </p>
              <Link
                href={localeHref('/work#delbeteris')}
                className="group mt-6 inline-flex items-center gap-1.5 font-body text-sm text-accent transition-colors duration-250 hover:text-accent-dark"
              >
                {c.featured.link}
                <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">→</span>
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-8">
            <WindowFrame className="lazy-block">
              <Image
                src="/work/delbeteris-site.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 820px, 100vw"
                className="object-cover object-top"
              />
            </WindowFrame>
          </Reveal>
        </div>

        <RevealGroup
          className="mt-10 grid border-t border-border sm:grid-cols-2 sm:divide-x sm:divide-border"
          stagger={0.06}
        >
          {c.strip.map((item, i) => (
            <RevealItem key={item.name} className="border-b border-border">
              <Link
                href={localeHref(stripHrefs[i])}
                className="group flex items-center justify-between gap-4 py-5 pr-4 transition-colors duration-250 hover:text-accent sm:px-6 sm:first:pl-0 sm:last:pr-0"
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
