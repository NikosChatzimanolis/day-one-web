import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Hide the floating dev indicator badge (the bottom-left "N"). It is dev-only
  // chrome and never ships to production, but we keep it off so local review of
  // the design reads clean — nothing on screen should look accidental.
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // /services and /white-label were folded into /partner in the 2026-09
  // redesign. Permanent redirects keep old links, search results and the
  // cold-pitch emails that pointed at /white-label working.
  async redirects() {
    return [
      { source: '/services', destination: '/partner', permanent: true },
      { source: '/white-label', destination: '/partner', permanent: true },
      { source: '/products/cy-construction', destination: '/products/construction-erp', permanent: true },
    ]
  },
}

export default nextConfig
