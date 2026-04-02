// ── app/work/tapinakia/page.tsx ──
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ta Pinakia — Web Development Case Study | Day One',
  description:
    'See how Day One built a custom website for Ta Pinakia — a real business in Cyprus. Web development, design, and ongoing support.',
}

export default function TaPinakiaViewer() {
  return (
    <div className="flex flex-col h-screen bg-[#1A1A18]">
      {/* Minimal header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 flex-shrink-0">
        <Link
          href="/#work"
          className="text-[#9C9790] text-sm hover:text-[#F7F4EF] transition-colors duration-200"
        >
          ← Back to Day One
        </Link>
        <span className="text-[#F7F4EF] text-sm font-medium tracking-wide">Ta Pinakia</span>
        <span className="text-[#9C9790] text-xs">Preview</span>
      </div>
      {/* Full-screen iframe */}
      <iframe
        src="/preview/tapinakia/index.html"
        className="flex-1 w-full border-0"
        title="Ta Pinakia website preview"
      />
    </div>
  )
}
