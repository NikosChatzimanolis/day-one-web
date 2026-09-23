// ── components/products/ProductPage.tsx ──
// Shared layout for /products/*: split hero (copy left, mockup right), the
// feature rows, who it is for, the demo band, and the closing CTA. Content
// comes entirely from the copy dictionary so the three pages stay parallel.
import { Button } from '@/components/ui/Button'
import BookCall from '@/components/ui/BookCall'
import CtaSection from '@/components/sections/CtaSection'
import ProductFrame from '@/components/products/ProductFrame'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import type { ProductCopy } from '@/lib/copy'
import { t, localeHref } from '@/lib/copy/request'
import { demoHref } from '@/lib/site'

interface ProductPageProps {
  product: ProductCopy
  mock: React.ReactNode
  frameVariant?: 'bleed' | 'center' | 'fill'
}

export default function ProductPage({ product, mock, frameVariant = 'center' }: ProductPageProps) {
  const c = t()
  const p = c.products.common
  const demo = localeHref(demoHref)
  return (
    <>
      {/* ── Hero · rendered without the entrance so the h1 is the LCP ── */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="container-wide section-hero">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-7">{c.nav.products}</p>
              <h1 className="t-h1 display-balance">{product.name}</h1>
              <p className="t-lead display-pretty mt-7 text-text-primary">{product.tagline}</p>
              <p className="measure-lg display-pretty mt-5 font-body text-base leading-relaxed text-text-secondary md:text-lg">
                {product.lead}
              </p>
              {product.meta && <p className="mt-6 font-body text-sm text-text-tertiary">{product.meta}</p>}
              <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Button href={demo} size="lg">
                  {p.requestDemo}
                </Button>
                <BookCall variant="outline" size="lg" magnetic={false} />
              </div>
            </div>
            <div className="lg:col-span-7">
              <ProductFrame variant={frameVariant} className="aspect-[4/3] md:aspect-[3/2]">{mock}</ProductFrame>
            </div>
          </div>
        </div>
      </section>

      {/* ── What it does · hairline rows ───────────────────── */}
      <section className="border-b border-border bg-bg">
        <div className="container-wide section">
          <Reveal>
            <p className="eyebrow mb-10">{p.featuresTitle}</p>
          </Reveal>
          <RevealGroup className="flex flex-col" stagger={0.08}>
            {product.features.map((f, i) => (
              <RevealItem
                key={f.title}
                className={`grid gap-3 border-t border-border py-8 md:grid-cols-12 md:gap-8 md:py-10 ${
                  i === product.features.length - 1 ? 'border-b' : ''
                }`}
              >
                <span className="t-index text-rust md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="t-h3 text-text-primary md:col-span-4">{f.title}</h2>
                <p className="measure-lg font-body text-base leading-relaxed text-text-secondary md:col-span-6 md:col-start-7 md:text-lg">
                  {f.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Who it is for ─────────────────────────────────── */}
      <section data-no-grid className="border-b border-border bg-surface">
        <div className="container-wide section">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">{p.whoForTitle}</p>
            </Reveal>
            <RevealGroup className="flex flex-col lg:col-span-7 lg:col-start-6" stagger={0.08}>
              {product.whoFor.map((line, i) => (
                <RevealItem
                  key={line}
                  className={`flex items-start gap-4 border-t border-border-strong py-6 ${
                    i === product.whoFor.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <span aria-hidden="true" className="mt-[0.55rem] block h-1.5 w-1.5 shrink-0 rounded-full bg-rust" />
                  <p className="font-body text-lg leading-relaxed text-text-primary md:text-xl">{line}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ── Demo band ─────────────────────────────────────── */}
      <section className="border-b border-border bg-bg">
        <div className="container-wide section">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-7">{p.demoEyebrow}</p>
            <h2 className="t-h1 display-balance">{p.demoTitle}</h2>
            <p className="t-lead measure-lg display-pretty mt-7 text-text-secondary">{p.demoBody}</p>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button href={demo} size="lg" arrow>
                {p.requestDemo}
              </Button>
              <BookCall variant="outline" size="lg" magnetic={false} />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
