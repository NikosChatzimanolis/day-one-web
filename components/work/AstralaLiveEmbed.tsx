// ── components/work/AstralaLiveEmbed.tsx ──
// A framed live embed of the client's public site, shown beside the brand board
// as "the direction, live." It renders ONLY if astralaadvisory.eu.com permits
// framing from this origin (X-Frame-Options / CSP frame-ancestors) — a
// server-side change on the client's own site, not something this build can do.
// The "View live" link (rendered by the page) is the fallback; the placeholder
// layer below shows through when the frame can't render.
import BrowserFrame from '@/components/ui/BrowserFrame'

// Point straight at the localised home (/en) so the embed skips the apex 307
// redirect. `?embed=1` is an opt-in hint for Astrala's site to run an "embed
// mode" (suppress the cookie banner + skip non-essential cookies) — harmless
// until they honour it. The "View live" links use the bare domain.
const LIVE_URL = 'https://astralaadvisory.eu.com/en?embed=1'
const LIVE_HREF = 'https://astralaadvisory.eu.com'

export default function AstralaLiveEmbed() {
  return (
    <BrowserFrame url="astralaadvisory.eu.com">
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
        {/* Fallback — visible if framing is blocked or the frame is blank */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-surface px-6 text-center">
          <span className="font-body text-sm text-text-tertiary">Astrala Advisory — live site</span>
          <a
            href={LIVE_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 font-body text-sm text-accent transition-colors duration-250 hover:text-accent-dark"
          >
            View live
            <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">↗</span>
          </a>
        </div>
        <iframe
          src={LIVE_URL}
          title="Astrala Advisory — live site"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </BrowserFrame>
  )
}
