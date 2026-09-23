// ── components/home/TwoWays.tsx ──
// Partner with us · Our products. Eyebrow on the left, two hairline-separated
// columns of short lines, each with a Learn more link.
import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import { copy } from '@/lib/copy'

function Column({
  title,
  lines,
  link,
  href,
  delay,
}: {
  title: string
  lines: string[]
  link: string
  href: string
  delay: number
}) {
  return (
    <Reveal delay={delay} className="border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
      <h2 className="t-h3 text-text-primary">{title}</h2>
      <ul className="mt-5 flex flex-col gap-1.5">
        {lines.map((line) => (
          <li key={line} className="font-body text-base leading-relaxed text-text-secondary">
            {line}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className="group mt-6 inline-flex items-center gap-1.5 font-body text-sm text-accent transition-colors duration-250 hover:text-accent-dark"
      >
        {link}
        <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">→</span>
      </Link>
    </Reveal>
  )
}

export default function TwoWays() {
  const t = copy.home.twoWays
  return (
    <section data-no-grid className="border-b border-border bg-surface">
      <div className="container-wide section-tight">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-3">
            <p className="eyebrow max-w-[12rem] leading-relaxed">{t.eyebrow}</p>
            <span aria-hidden="true" className="mt-6 block h-px w-10 bg-rust" />
          </Reveal>
          <div className="grid gap-10 lg:col-span-9 lg:grid-cols-2 lg:gap-0">
            <Column title={t.partner.title} lines={t.partner.lines} link={t.partner.link} href="/partner" delay={0.05} />
            <Column title={t.products.title} lines={t.products.lines} link={t.products.link} href="/products" delay={0.1} />
          </div>
        </div>
      </div>
    </section>
  )
}
