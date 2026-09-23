// ── app/sitemap.ts ──
import { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', priority: 1, freq: 'weekly' as const },
    { path: '/partner', priority: 0.9, freq: 'monthly' as const },
    { path: '/products', priority: 0.9, freq: 'monthly' as const },
    { path: '/products/construction-erp', priority: 0.8, freq: 'monthly' as const },
    { path: '/products/attendance', priority: 0.8, freq: 'monthly' as const },
    { path: '/products/document-signing', priority: 0.8, freq: 'monthly' as const },
    { path: '/work', priority: 0.9, freq: 'monthly' as const },
    { path: '/astrala', priority: 0.8, freq: 'monthly' as const },
    { path: '/security', priority: 0.8, freq: 'monthly' as const },
    { path: '/forge', priority: 0.6, freq: 'weekly' as const },
    { path: '/about', priority: 0.7, freq: 'monthly' as const },
    { path: '/contact', priority: 0.8, freq: 'monthly' as const },
  ]
  const now = new Date()
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }))
}
