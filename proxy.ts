// ── proxy.ts ──
// Locale routing without a library. Page files live once under app/[locale].
// English is the default and stays unprefixed in the address bar: /partner is
// rewritten internally to /en/partner. /el/... and /ru/... pass through.
// A literal /en/... is redirected to the unprefixed form so there is one URL
// per English page. API routes, Next internals, files and the OG image are
// left alone.
import { NextResponse, type NextRequest } from 'next/server'

const PREFIXED = ['el', 'ru']

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/opengraph-image' ||
    /\.[a-z0-9]+$/i.test(pathname)
  ) {
    return NextResponse.next()
  }
  const first = pathname.split('/')[1]
  if (first === 'en') {
    const url = req.nextUrl.clone()
    url.pathname = pathname.replace(/^\/en(?=\/|$)/, '') || '/'
    return NextResponse.redirect(url, 308)
  }
  if (PREFIXED.includes(first)) return NextResponse.next()
  const url = req.nextUrl.clone()
  url.pathname = `/en${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
