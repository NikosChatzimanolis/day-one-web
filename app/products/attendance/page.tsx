// ── app/products/attendance/page.tsx ──
import type { Metadata } from 'next'
import ProductPage from '@/components/products/ProductPage'
import AttendanceMock from '@/components/products/AttendanceMock'
import { copy } from '@/lib/copy'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: copy.meta.attendance.title,
  description: copy.meta.attendance.description,
  alternates: { canonical: `${site.url}/products/attendance` },
}

export default function AttendancePage() {
  return <ProductPage product={copy.products.attendance} mock={<AttendanceMock />} />
}
