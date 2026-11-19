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
      { source: '/:locale(el|ru)/services', destination: '/:locale/partner', permanent: true },
      { source: '/:locale(el|ru)/white-label', destination: '/:locale/partner', permanent: true },
      { source: '/:locale(el|ru)/products/cy-construction', destination: '/:locale/products/construction-erp', permanent: true },
      // A de-listed product page sends old links to the products index.
      // Temporary on purpose: browsers cache a permanent redirect, which
      // would block the page when it is listed again.
      { source: '/products/document-signing', destination: '/products', permanent: false },
      { source: '/:locale(el|ru)/products/document-signing', destination: '/:locale/products', permanent: false },
    ]
  },
}

export default nextConfig
