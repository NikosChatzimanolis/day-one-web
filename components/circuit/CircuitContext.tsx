// ── components/circuit/CircuitContext.tsx ──
// The circuit fill ENGINE. Owns one requestAnimationFrame loop for the whole
// page. Each frame it computes a single document-space fill front
// (fillFrontDocY = scrollY + innerHeight*REF, clamped to the fork/page-bottom)
// and writes each registered element's positional fill (0..1) to its --fill CSS
// variable, directly via el.style — NEVER through React state, so scrolling
// triggers zero re-renders. Geometry is measured in a separate READ phase
// (getBoundingClientRect) and only when flagged dirty; the per-frame WRITE phase
// never reads layout, so there is no read/write thrash.
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
// in document space. 0.5 = mid-viewport. Tunable in Phase 4.
const REF = 0.5

interface Geometry {
  /** Document-space top of the element's fill span. */
  top: number
  /** Length (px) over which the element interpolates 0→1. */
  span: number
}

const CircuitContext = createContext<CircuitContextValue | null>(null)

export function CircuitProvider({ children }: { children: React.ReactNode }) {
  const registry = useRef<Set<FillRegistration>>(new Set())
  const geometry = useRef<Map<FillRegistration, Geometry>>(new Map())
  const bounds = useRef({ forkY: 0, pageBottom: 0 })
  const lastFill = useRef<Map<FillRegistration, number>>(new Map())
  const needsMeasure = useRef(true)

  const register = useCallback((reg: FillRegistration) => {
    registry.current.add(reg)
    needsMeasure.current = true
    return () => {
      registry.current.delete(reg)
      geometry.current.delete(reg)
      lastFill.current.delete(reg)
      needsMeasure.current = true
    }
  }, [])

  useEffect(() => {
    let raf = 0

    // READ phase — the ONLY place layout is read. Runs on mount, on flagged
    // changes (resize / fonts / load / register), never inside the write loop.
    const measure = () => {
      const scrollY = window.scrollY
      let forkY = Infinity
      let pageBottom = 0
      geometry.current.clear()
      registry.current.forEach((reg) => {
        const r = reg.el.getBoundingClientRect()
        const top = r.top + scrollY
        if (reg.band) {
          // Thin element: a fill band centered on it, so it eases across a short
          // travel instead of snapping.
          const center = top + r.height / 2
          geometry.current.set(reg, { top: center - reg.band / 2, span: reg.band })
        } else {
          // Tall element (rail, section): fill across its own height.
          geometry.current.set(reg, { top, span: r.height || 1 })
        }
        const g = geometry.current.get(reg)!
        forkY = Math.min(forkY, g.top)
        pageBottom = Math.max(pageBottom, g.top + g.span)
      })
      bounds.current = {
        forkY: forkY === Infinity ? 0 : forkY,
        pageBottom: Math.max(pageBottom, document.documentElement.scrollHeight),
      }
      needsMeasure.current = false
    }

    // WRITE phase — style writes only, no layout reads.
    const tick = () => {
      if (needsMeasure.current) measure()
      const { forkY, pageBottom } = bounds.current
      const front = Math.min(
        Math.max(window.scrollY + window.innerHeight * REF, forkY),
        pageBottom,
      )
      registry.current.forEach((reg) => {
        const g = geometry.current.get(reg)
        if (!g) return
        const fill = Math.min(Math.max((front - g.top) / g.span, 0), 1)
        if (lastFill.current.get(reg) !== fill) {
          reg.el.style.setProperty('--fill', String(fill))
          lastFill.current.set(reg, fill)
        }
      })
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
    const settle = window.setTimeout(flagMeasure, 400) // re-measure after font swap

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', flagMeasure)
      window.removeEventListener('load', flagMeasure)
      ro.disconnect()
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
