// ── app/products/construction-erp/page.tsx ──
import type { Metadata } from 'next'
import ProductPage from '@/components/products/ProductPage'
import { DashboardShot, shots } from '@/components/products/AppShot'
import { getCopy, type Locale } from '@/lib/copy'
import { setRequestLocale } from '@/lib/copy/request'
import { pageMetadata } from '@/lib/copy/metadata'

type PageProps = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata(locale, getCopy(locale).meta.cyConstruction, '/products/construction-erp')
}

export default async function ConstructionErpPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ProductPage product={getCopy(locale).products.cyConstruction} mock={<DashboardShot src={shots.cyDashboard} priority />} frameVariant="bleed" />
}
