// ── app/opengraph-image.tsx ──
// Next.js file-based OG image — auto-wired to <meta property="og:image">
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Day One — Web Development, Maintenance & Social Media'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  // Load fonts for the logo
  const alexBrush = await fetch(
    'https://fonts.gstatic.com/s/alexbrush/v23/SZc83FzrJKuqFbwMKk6EtUI.ttf'
  ).then((res) => res.arrayBuffer())

  const jostLight = await fetch(
    'https://fonts.gstatic.com/s/jost/v20/92zPtBhPNqw79Ij1E865zBUv7mz9JQVG.ttf'
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          background: '#F7F4EF',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Gradient mesh background — matches hero */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(ellipse 80% 60% at 20% 20%, rgba(196, 82, 42, 0.06) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(196, 82, 42, 0.04) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 50% 50%, rgba(240, 235, 227, 0.15) 0%, transparent 70%)',
          }}
        />
        {/* Label */}
        <div
          style={{
            color: '#C4522A',
            fontSize: 20,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 24,
            fontFamily: 'Jost',
            fontWeight: 300,
          }}
        >
          WEB DEVELOPMENT · MAINTENANCE · SOCIAL MEDIA
        </div>

        {/* Logo wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 32,
            gap: 0,
          }}
        >
          {/* "Day" in script font */}
          <div
            style={{
              fontFamily: 'Alex Brush',
              fontSize: 108,
              color: '#C04C2A',
              lineHeight: 1,
              marginRight: 12,
            }}
          >
            Day
          </div>
          {/* Divider line */}
          <div
            style={{
              width: 1.5,
              height: 90,
              background: 'rgba(192,76,42,0.3)',
              marginRight: 16,
            }}
          />
          {/* "ONE" + "WEB STUDIO" */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            <div
              style={{
                fontFamily: 'Jost',
                fontWeight: 300,
                fontSize: 36,
                color: '#1A1816',
                letterSpacing: '0.12em',
                lineHeight: 1,
              }}
            >
              ONE
            </div>
            <div
              style={{
                fontFamily: 'Jost',
                fontWeight: 300,
                fontSize: 12,
                color: '#9A8F82',
                letterSpacing: '0.2em',
                lineHeight: 1,
              }}
            >
              WEB STUDIO
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            color: '#6A6057',
            fontSize: 30,
            fontWeight: 300,
            maxWidth: 700,
            lineHeight: 1.4,
            fontFamily: 'Jost',
          }}
        >
          We build, maintain & grow your online presence
        </div>

        {/* Accent line */}
        <div
          style={{
            width: 60,
            height: 3,
            background: '#C4522A',
            marginTop: 52,
            borderRadius: 2,
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Alex Brush',
          data: alexBrush,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Jost',
          data: jostLight,
          style: 'normal',
          weight: 300,
        },
      ],
    }
  )
}
