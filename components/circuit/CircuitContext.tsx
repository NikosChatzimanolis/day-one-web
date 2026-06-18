// ── components/circuit/CircuitContext.tsx ──
// Shared registry for circuit-fill participants. In Phase 1 registration is a
// no-op stub used only so <Section> (and later fillable primitives) can register
// without knowing about the engine. Phase 2 replaces the stub body with the rAF
// fill loop; the public API (register/unregister) stays the same.
'use client'

import { createContext, useCallback, useContext, useMemo, useRef } from 'react'

export interface FillRegistration {
  /** The element whose document geometry the engine tracks. */
  el: HTMLElement
  /** Optional fill band (px) for thin elements; undefined = use element height. */
  band?: number
}

export interface CircuitContextValue {
  register: (reg: FillRegistration) => () => void
}

const CircuitContext = createContext<CircuitContextValue | null>(null)

export function CircuitProvider({ children }: { children: React.ReactNode }) {
  // Phase 1: hold registrations but do nothing with them. Phase 2 reads this set
  // each animation frame.
  const registry = useRef<Set<FillRegistration>>(new Set())

  const register = useCallback((reg: FillRegistration) => {
    registry.current.add(reg)
    return () => {
      registry.current.delete(reg)
    }
  }, [])

  const value = useMemo<CircuitContextValue>(() => ({ register }), [register])

  return <CircuitContext.Provider value={value}>{children}</CircuitContext.Provider>
}

/** Returns the circuit registry, or null if used outside a provider. */
export function useCircuit(): CircuitContextValue | null {
  return useContext(CircuitContext)
}
