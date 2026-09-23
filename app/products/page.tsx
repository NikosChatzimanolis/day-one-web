// ── app/products/page.tsx · Products index ──
import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import CtaSection from '@/components/sections/CtaSection'
import ProductRow from '@/components/products/ProductRow'
import { DashboardShot, PhoneShot, shots } from '@/components/products/AppShot'
import SigningMock from '@/components/products/SigningMock'
import { copy } from '@/lib/copy'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: copy.meta.products.title,
  description: copy.meta.products.description,
  alternates: { canonical: `${site.url}/products` },
}

const t = copy.products

export default function ProductsPage() {
  return (
    <>
      <PageHero instant eyebrow={t.index.eyebrow} title={t.index.title} lead={t.index.lead} />

      <section className="border-b border-border bg-bg">
        <div className="container-wide section-sm divide-y divide-border">
          <ProductRow
            product={t.cyConstruction}
            href="/products/cy-construction"
            mock={<DashboardShot src={shots.cyDashboard} priority />}
            learnMore={copy.common.learnMore}
            headingLevel="h2"
            variant="bleed"
            lazy={false}
          />
          <ProductRow
            product={t.attendance}
            href="/products/attendance"
            mock={<PhoneShot src={shots.attendanceClock} />}
            learnMore={copy.common.learnMore}
            headingLevel="h2"
          />
          <ProductRow
            product={t.documentSigning}
            href="/products/document-signing"
            mock={<SigningMock />}
            learnMore={copy.common.learnMore}
            headingLevel="h2"
          />
        </div>
      </section>

      <CtaSection />
    </>
  )
}
