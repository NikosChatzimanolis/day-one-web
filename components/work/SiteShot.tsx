// ── components/work/SiteShot.tsx ──
// A framed still of a delivered site's home page, shown in the same browser
// chrome as the rest of the work. Used in place of a live iframe wherever the
// card is too small for a real site to read: the screenshot stays legible at
// card size, can't drift when the client's site changes, and costs the page no
// third-party request. Pair it with a "View live" link for the real thing.
import Image from 'next/image'
import BrowserFrame from '@/components/ui/BrowserFrame'

interface SiteShotProps {
  /** Bare domain, shown in the chrome pill. */
  url: string
  /** Screenshot in /public. */
  src: string
  alt: string
  /** CSS aspect-ratio for the frame body. Captures are 16:9. */
  aspect?: string
  /** Layout hint for next/image; defaults to the three-up work grid. */
  sizes?: string
}

export default function SiteShot({
  url,
  src,
  alt,
  aspect = '16 / 9',
  sizes = '(min-width: 1024px) 380px, (min-width: 768px) 33vw, 100vw',
}: SiteShotProps) {
  return (
    <BrowserFrame url={url}>
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: aspect }}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
      </div>
    </BrowserFrame>
  )
}
