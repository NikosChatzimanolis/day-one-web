// ── components/circuit/CircuitContext.tsx ──
// The circuit fill ENGINE. Owns one requestAnimationFrame loop for the whole
// page. Each frame it computes a single document-space fill front
// (fillFrontDocY = scrollY + innerHeight*REF, clamped to fork/page-bottom) and
// writes each registered element's positional fill (0..1) to its --fill CSS
// variable, directly via el.style — never through React state, so scrolling
// triggers zero re-renders.
//
// Phase 4 hardening:
//  • IntersectionObserver: the per-frame write loop iterates only ON-SCREEN
//    registrants (offscreen elements keep their last correct fill — fully above
//    the front = 1, fully below = 0 — so skipping them is safe).
//  • Idle short-circuit: when scrollY is unchanged and nothing is dirty, the
//    frame does no work beyond a scrollY read.
//  • will-change: a `data-filling` attribute is toggled while 0<fill<1; CSS uses
//    it to hint the compositor only on actively-filling elements.
//  • Reduced motion: the mechanic adds no time-based motion (fill is a pure
//    function of scroll position), so no behavioral change is needed; a CSS
//    guard makes the intent explicit.
'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'

export interface FillRegistration {
  /** The element whose document geometry the engine tracks. */
  el: HTMLElement | SVGElement
  /** Optional fill band (px) for thin elements; undefined = use element height. */
  band?: number
}

export interface CircuitContextValue {
  register: (reg: FillRegistration) => () => void
}

// Viewport reference line (fraction of viewport height) defining the fill front
// in document space. 0.5 = mid-viewport.
const REF = 0.5

interface Geometry {
  top: number
  span: number
}

const CircuitContext = createContext<CircuitContextValue | null>(null)

export function CircuitProvider({ children }: { children: React.ReactNode }) {
  const registry = useRef<Set<FillRegistration>>(new Set())
  const geometry = useRef<Map<FillRegistration, Geometry>>(new Map())
  const bounds = useRef({ forkY: 0, pageBottom: 0 })
  const lastFill = useRef<Map<FillRegistration, number>>(new Map())
  const needsMeasure = useRef(true)
  const visible = useRef<Set<FillRegistration>>(new Set())
  const elToReg = useRef<Map<Element, FillRegistration>>(new Map())
  const io = useRef<IntersectionObserver | null>(null)
  const dirtyVisible = useRef(true)

  const register = useCallback((reg: FillRegistration) => {
    registry.current.add(reg)
    elToReg.current.set(reg.el, reg)
    visible.current.add(reg) // assume visible until the observer says otherwise
    io.current?.observe(reg.el)
    needsMeasure.current = true
    dirtyVisible.current = true
    return () => {
      registry.current.delete(reg)
      geometry.current.delete(reg)
      lastFill.current.delete(reg)
      visible.current.delete(reg)
      elToReg.current.delete(reg.el)
      io.current?.unobserve(reg.el)
      reg.el.removeAttribute('data-filling')
      needsMeasure.current = true
      dirtyVisible.current = true
    }
  }, [])

  useEffect(() => {
    let raf = 0
    let lastScrollY = -1

    // Observe registrants; toggle membership in the visible set. rootMargin pads
    // by half a viewport each way so elements just off-screen update smoothly.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const reg = elToReg.current.get(e.target)
          if (!reg) continue
          if (e.isIntersecting) visible.current.add(reg)
          else visible.current.delete(reg)
        }
        dirtyVisible.current = true
      },
      { rootMargin: '50% 0px 50% 0px' },
    )
    io.current = observer
    registry.current.forEach((reg) => observer.observe(reg.el))

    // READ phase — the ONLY place layout is read. Measures ALL registrants (so an
    // element's geometry is ready the moment it scrolls into view).
    const measure = () => {
      const scrollY = window.scrollY
      let forkY = Infinity
      let pageBottom = 0
      geometry.current.clear()
      registry.current.forEach((reg) => {
        const r = reg.el.getBoundingClientRect()
        const top = r.top + scrollY
        if (reg.band) {
          const center = top + r.height / 2
          geometry.current.set(reg, { top: center - reg.band / 2, span: reg.band })
        } else {
          geometry.current.set(reg, { top, span: r.height || 1 })
        }
        const g = geometry.current.get(reg)!
        forkY = Math.min(forkY, g.top)
        pageBottom = Math.max(pageBottom, g.top + g.span)
      })
      // forkY / pageBottom are GLOBAL bounds across ALL registrants (min top / max
      // bottom) used to clamp the single shared fill front.
      bounds.current = {
        forkY: forkY === Infinity ? 0 : forkY,
        pageBottom: Math.max(pageBottom, document.documentElement.scrollHeight),
      }
      needsMeasure.current = false
    }

    // WRITE phase — style writes only, no layout reads. Iterates only the VISIBLE
    // set; skips entirely when nothing changed since the last frame.
    const tick = () => {
      const measured = needsMeasure.current
      if (measured) measure()
      const sy = window.scrollY
      if (sy !== lastScrollY || measured || dirtyVisible.current) {
        const { forkY, pageBottom } = bounds.current
        const front = Math.min(Math.max(sy + window.innerHeight * REF, forkY), pageBottom)
        visible.current.forEach((reg) => {
          const g = geometry.current.get(reg)
          if (!g) return
          const fill = Math.min(Math.max((front - g.top) / g.span, 0), 1)
          if (lastFill.current.get(reg) !== fill) {
            reg.el.style.setProperty('--fill', String(fill))
            // will-change only while actively filling (0<fill<1).
            if (fill > 0 && fill < 1) reg.el.setAttribute('data-filling', '')
            else reg.el.removeAttribute('data-filling')
            lastFill.current.set(reg, fill)
          }
        })
        lastScrollY = sy
        dirtyVisible.current = false
      }
      raf = requestAnimationFrame(tick)
    }

    const flagMeasure = () => {
      needsMeasure.current = true
    }
    window.addEventListener('resize', flagMeasure, { passive: true })
    window.addEventListener('load', flagMeasure)
    const ro = new ResizeObserver(flagMeasure)
    ro.observe(document.body)
    if (document.fonts?.ready) document.fonts.ready.then(flagMeasure)
    const settle = window.setTimeout(flagMeasure, 400)

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', flagMeasure)
      window.removeEventListener('load', flagMeasure)
      ro.disconnect()
      observer.disconnect()
      io.current = null
      window.clearTimeout(settle)
    }
  }, [])

  const value = useMemo<CircuitContextValue>(() => ({ register }), [register])

  return <CircuitContext.Provider value={value}>{children}</CircuitContext.Provider>
}

/** Returns the circuit engine, or null if used outside a provider. */
export function useCircuit(): CircuitContextValue | null {
  return useContext(CircuitContext)
}
