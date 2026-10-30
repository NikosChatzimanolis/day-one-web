// ── app/products/steer/page.tsx ──
import type { Metadata } from 'next'
import ProductPage from '@/components/products/ProductPage'
import { DashboardShot, shots } from '@/components/products/AppShot'
import { getCopy, type Locale } from '@/lib/copy'
import { setRequestLocale } from '@/lib/copy/request'
import { pageMetadata } from '@/lib/copy/metadata'
import { steerSignupUrl } from '@/lib/site'

type PageProps = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata(locale, getCopy(locale).meta.steer, '/products/steer')
}

export default async function SteerPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const products = getCopy(locale).products
  const { eyebrow, title, steps } = products.steer.tour
  const tour = {
    eyebrow,
    title,
    steps: [
      { src: shots.steerOverview, ...steps.overview },
      { src: shots.steerPlan, ...steps.plan },
      { src: shots.steerChat, ...steps.chat },
      { src: shots.steerCampaigns, ...steps.campaigns },
      { src: shots.steerLog, ...steps.log },
    ],
  }
  return (
    <ProductPage
      product={products.steer}
      mock={<DashboardShot src={shots.steerPlan} priority />}
      frameVariant="bleed"
      tone="steer"
      tour={tour}
      siteHref={steerSignupUrl}
      siteLabel={products.common.openSteer}
    />
  )
}
