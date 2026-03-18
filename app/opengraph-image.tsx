// ── app/opengraph-image.tsx ──
// Next.js file-based OG image — auto-wired to <meta property="og:image">
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Day One — Website Studio'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1A1A18',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'serif',
        }}
      >
        {/* Label */}
        <div
          style={{
            color: '#C4522A',
            fontSize: 20,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 24,
            fontFamily: 'sans-serif',
            fontWeight: 500,
          }}
        >
          WEB STUDIO · CYPRUS &amp; GREECE
        </div>

        {/* Wordmark */}
        <div
          style={{
            color: '#F7F4EF',
            fontSize: 96,
            fontWeight: 400,
            lineHeight: 1,
            marginBottom: 32,
          }}
        >
          Day One
        </div>

        {/* Tagline */}
        <div
          style={{
            color: '#9C9790',
            fontSize: 30,
            fontWeight: 300,
            maxWidth: 700,
            lineHeight: 1.4,
            fontFamily: 'sans-serif',
          }}
        >
          Fast, professional websites for small businesses
        </div>

        {/* Price anchor */}
        <div
          style={{
            color: '#C4522A',
            fontSize: 22,
            fontWeight: 500,
            marginTop: 52,
            fontFamily: 'sans-serif',
            letterSpacing: '0.02em',
          }}
        >
          From €350 · Free mockup before you decide
        </div>
      </div>
    ),
    { ...size }
  )
}
