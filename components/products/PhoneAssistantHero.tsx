// ── components/products/PhoneAssistantHero.tsx ──
// The phone assistant page's own hero text, in place of ProductPage's plain
// name / tagline / lead / meta stack: a live badge, the site's two-line
// headline (Jost light over a Cormorant italic, here in rust), one short
// paragraph, the languages as chips, two buttons and the price in a line.
// The h1 has no entrance, so it still paints as the LCP element.
import { Button } from '@/components/ui/Button'
import BookCall from '@/components/ui/BookCall'
import { t } from '@/lib/copy/request'

export default function PhoneAssistantHero() {
  const c = t()
  const x = c.products.phoneAssistant
  const h = x.hero
  return (
    <>
      <p className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-card py-1.5 pl-3 pr-4 font-body text-[13px] text-text-secondary">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rust opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-rust" />
        </span>
        {h.badge}
      </p>

      <p className="eyebrow mb-5">{x.name}</p>
      <h1 className="text-text-primary">
        <span className="display-balance block font-display text-[clamp(2.4rem,4.2vw,3.9rem)] font-extralight leading-[1.05] tracking-[-0.015em]">
          {h.line1}
        </span>
        <span className="display-balance mt-1 block font-cormorant text-[clamp(2.7rem,4.7vw,4.4rem)] font-normal italic leading-[1.04] tracking-[-0.01em] text-rust">
          {h.line2}
        </span>
      </h1>

      <p className="measure display-pretty mt-7 font-body text-lg leading-relaxed text-text-secondary md:text-xl">{h.lead}</p>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <span className="mr-1 font-body text-sm text-text-tertiary">{h.speaks}</span>
        {h.langs.map((l) => (
          <span key={l} className="rounded-full border border-border-strong bg-card px-3 py-1 font-body text-[13px] text-text-primary">
            {l}
          </span>
        ))}
      </div>

      <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Button href="#demo" size="lg" arrow>
          {c.products.common.tryDemo}
        </Button>
        <BookCall variant="outline" size="lg" magnetic={false} />
      </div>

      <p className="mt-6 font-body text-sm text-text-tertiary">
        <span className="text-text-primary">
          {x.price.from} {x.price.amount} {x.price.perMonth}
        </span>
        <span className="mx-2 text-rust">·</span>
        {x.price.setup}
      </p>
    </>
  )
}
