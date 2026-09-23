// ── app/products/attendance/page.tsx ──
import type { Metadata } from 'next'
import ProductPage from '@/components/products/ProductPage'
import { PhoneShot, shots } from '@/components/products/AppShot'
import { getCopy, type Locale } from '@/lib/copy'
import { setRequestLocale } from '@/lib/copy/request'
import { pageMetadata } from '@/lib/copy/metadata'

type PageProps = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata(locale, getCopy(locale).meta.attendance, '/products/attendance')
}

export default async function AttendancePage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ProductPage product={getCopy(locale).products.attendance} mock={<PhoneShot src={shots.attendanceClock} priority />} />
}
