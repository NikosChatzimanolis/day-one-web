// ── components/work/SiteEmbed.tsx ──
// A framed live embed of a delivered site's public URL, shown in the same
// browser chrome as the other case studies (mirrors AstralaLiveEmbed). The live
// site renders in an iframe; a fallback layer sits behind it — either a caller-
// supplied node (e.g. a hero still) or a "View live" link — and shows through if
// the target ever blocks framing (X-Frame-Options / CSP frame-ancestors).
import BrowserFrame from '@/components/ui/BrowserFrame'

interface SiteEmbedProps {
  /** Bare domain — shown in the chrome pill and used for the View-live href. */
  url: string
  /** iframe src; defaults to https://{url}. Use to point at a localised route. */
  embedSrc?: string
  /** Human label for accessibility and the default fallback line. */
  title: string
  /** CSS aspect-ratio for the frame body. */
  aspect?: string
  /** Optional custom fallback layer (e.g. a hero still). Defaults to a link. */
  children?: React.ReactNode
}

export default function SiteEmbed({ url, embedSrc, title, aspect = '16 / 9', children }: SiteEmbedProps) {
  const href = `https://${url}`
  const src = embedSrc ?? href

  return (
    <BrowserFrame url={url}>
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: aspect }}>
        {/* Fallback — visible if framing is blocked or the frame is blank */}
        {children ?? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-surface px-6 text-center">
            <span className="font-body text-sm text-text-tertiary">{title} — live site</span>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 font-body text-sm text-accent transition-colors duration-250 hover:text-accent-dark"
            >
              View live
              <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">↗</span>
            </a>
          </div>
        )}
        <iframe
          src={src}
          title={`${title} — live site`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </BrowserFrame>
  )
}
