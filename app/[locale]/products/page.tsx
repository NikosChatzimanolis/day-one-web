// ── app/products/page.tsx · Products index ──
import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import CtaSection from '@/components/sections/CtaSection'
import ProductRow from '@/components/products/ProductRow'
import { DashboardShot, PhoneShot, shots } from '@/components/products/AppShot'
import SigningMock from '@/components/products/SigningMock'
import { getCopy, type Locale } from '@/lib/copy'
import { setRequestLocale, t, localeHref } from '@/lib/copy/request'
import { pageMetadata } from '@/lib/copy/metadata'

type PageProps = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata(locale, getCopy(locale).meta.products, '/products')
}
export default async function ProductsPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const c = getCopy(locale)
  const t = c.products
  return (
    <>
      <PageHero instant eyebrow={t.index.eyebrow} title={t.index.title} lead={t.index.lead} />

      <section className="border-b border-border bg-bg">
        <div className="container-wide section-sm divide-y divide-border">
          <ProductRow
            product={t.cyConstruction}
            href={localeHref('/products/construction-erp')}
            mock={<DashboardShot src={shots.cyDashboard} priority />}
            learnMore={c.common.learnMore}
            headingLevel="h2"
            variant="bleed"
            lazy={false}
          />
          <ProductRow
            product={t.attendance}
            href={localeHref('/products/attendance')}
            mock={<PhoneShot src={shots.attendanceClock} />}
            learnMore={c.common.learnMore}
            headingLevel="h2"
          />
          <ProductRow
            product={t.documentSigning}
            href={localeHref('/products/document-signing')}
            mock={<SigningMock />}
            learnMore={c.common.learnMore}
            headingLevel="h2"
          />
        </div>
      </section>

      <CtaSection />
    </>
  )
}
