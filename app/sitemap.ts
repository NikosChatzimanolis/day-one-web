// ── app/sitemap.ts ──
import { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', priority: 1, freq: 'weekly' as const },
    { path: '/services', priority: 0.9, freq: 'monthly' as const },
    { path: '/security', priority: 0.8, freq: 'monthly' as const },
    { path: '/white-label', priority: 0.8, freq: 'monthly' as const },
    { path: '/work', priority: 0.9, freq: 'monthly' as const },
    { path: '/forge', priority: 0.8, freq: 'weekly' as const },
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
