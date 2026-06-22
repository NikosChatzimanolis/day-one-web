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
}

export default nextConfig
