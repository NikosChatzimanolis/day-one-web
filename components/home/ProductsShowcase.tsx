// ── components/home/ProductsShowcase.tsx ──
// PRODUCTS as one dense band, composed like the reference: the heading and
// CY-Construction beside a full-bleed dashboard, then the attendance phone
// and the signing card side by side underneath. All three products get the
// same text treatment (ProductText); only the visuals take the shape their
// UI needs.
import Reveal from '@/components/ui/Reveal'
import ProductFrame from '@/components/products/ProductFrame'
import ProductText from '@/components/products/ProductText'
import CyConstructionMock from '@/components/products/CyConstructionMock'
import AttendanceMock from '@/components/products/AttendanceMock'
import SigningMock from '@/components/products/SigningMock'
import { copy } from '@/lib/copy'

export default function ProductsShowcase() {
  const t = copy.home.products
  const p = copy.products
  return (
    <section className="border-b border-border bg-bg">
      <div className="container-wide section-tight">
        {/* row 1 · heading + CY-Construction beside the dashboard */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col lg:col-span-4">
            <Reveal>
              <p className="eyebrow mb-5">{t.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h1 display-balance max-w-sm">{t.title}</h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 lg:mt-auto lg:pt-10">
              <ProductText product={p.cyConstruction} href="/products/cy-construction" learnMore={t.learnMore} />
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-8">
            <ProductFrame variant="bleed" lazy className="aspect-[4/3] md:aspect-[16/10]">
              <CyConstructionMock />
            </ProductFrame>
          </Reveal>
        </div>

        {/* row 2 · two panels */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Reveal delay={0.05} className="grid items-center gap-6 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <ProductFrame variant="center" lazy className="aspect-[5/6]">
              <AttendanceMock />
            </ProductFrame>
            <ProductText product={p.attendance} href="/products/attendance" learnMore={t.learnMore} />
          </Reveal>
          <Reveal delay={0.1} className="grid items-center gap-6 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <ProductFrame variant="center" lazy className="aspect-[5/6]">
              <SigningMock />
            </ProductFrame>
            <ProductText product={p.documentSigning} href="/products/document-signing" learnMore={t.learnMore} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
