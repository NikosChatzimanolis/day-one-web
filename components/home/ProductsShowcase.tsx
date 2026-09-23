// ── components/home/ProductsShowcase.tsx ──
// PRODUCTS: heading, then the three products as equal rows (copy left, CSS
// mockup right). Mockups are below the fold, so their frames are lazy.
import Reveal from '@/components/ui/Reveal'
import ProductRow from '@/components/products/ProductRow'
import CyConstructionMock from '@/components/products/CyConstructionMock'
import AttendanceMock from '@/components/products/AttendanceMock'
import SigningMock from '@/components/products/SigningMock'
import { copy } from '@/lib/copy'

export default function ProductsShowcase() {
  const t = copy.home.products
  const p = copy.products
  return (
    <section className="border-b border-border bg-bg">
      <div className="container-wide section">
        <Reveal>
          <p className="eyebrow mb-6">{t.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="t-h1 display-balance max-w-md">{t.title}</h2>
        </Reveal>

        <div className="mt-6 divide-y divide-border">
          <ProductRow product={p.cyConstruction} href="/products/cy-construction" mock={<CyConstructionMock />} learnMore={t.learnMore} />
          <ProductRow product={p.attendance} href="/products/attendance" mock={<AttendanceMock />} learnMore={t.learnMore} />
          <ProductRow product={p.documentSigning} href="/products/document-signing" mock={<SigningMock />} learnMore={t.learnMore} />
        </div>
      </div>
    </section>
  )
}
