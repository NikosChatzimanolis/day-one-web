// ── hooks/useScrollController.ts ──
'use client'

import { useEffect, useRef } from 'react'
import { useScrollContext } from '@/context/ScrollContext'

// Wheel gesture constants (module-level — never change)
const THRESHOLD       = 250  // px accumulated before a navigation fires
const GESTURE_IDLE_MS = 250  // ms of wheel silence that marks a gesture as ended

export function useScrollController() {
  const {
    currentIndex,
    contactUnlocked,
    isTransitioning,
    totalSections,
    goTo,
    resetContact,
  } = useScrollContext()

  // Stale ref mirrors — event handlers always read current values without re-subscribing
  const currentIndexRef    = useRef(currentIndex)
  const contactUnlockedRef = useRef(contactUnlocked)
  // Tracks whether a panel animation is in flight — scroll is blocked while true
  const isAnimatingRef     = useRef(isTransitioning)
  const touchStartYRef     = useRef(0)

  // Guards keyboard nav from double-firing on key hold
  const navCooldownRef = useRef(false)

  // Wheel gesture state
  // hasNavigatedThisGesture: once true, further events in the same gesture are absorbed.
  // gestureResetTimer: fires after GESTURE_IDLE_MS of silence to mark gesture end.
  const accumulatorRef             = useRef(0)
  const hasNavigatedThisGestureRef = useRef(false)
  const gestureResetTimerRef       = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => { currentIndexRef.current = currentIndex }, [currentIndex])

  // Mirror contactUnlocked AND flush all wheel gesture state on every mode switch.
  // This prevents stale hasNavigatedThisGesture surviving an unlock→relock cycle.
  useEffect(() => {
    contactUnlockedRef.current = contactUnlocked
    if (gestureResetTimerRef.current) clearTimeout(gestureResetTimerRef.current)
    hasNavigatedThisGestureRef.current = false
    accumulatorRef.current = 0
  }, [contactUnlocked])

  // Mirror isTransitioning. When animation ends (false), flush gesture state so the
  // next scroll input is accepted immediately without waiting for a new gesture.
  useEffect(() => {
    isAnimatingRef.current = isTransitioning
    if (!isTransitioning) {
      if (gestureResetTimerRef.current) clearTimeout(gestureResetTimerRef.current)
      hasNavigatedThisGestureRef.current = false
      accumulatorRef.current = 0
    }
  }, [isTransitioning])

  // When external navigation (dot clicks, etc.) changes the index, debounce keyboard
  useEffect(() => {
    navCooldownRef.current = true
    const t = setTimeout(() => { navCooldownRef.current = false }, 500)
    return () => clearTimeout(t)
  }, [currentIndex])

  // Main event listeners — stable deps so this runs once
  useEffect(() => {
    type NavResult = 'navigated' | 'blocked_transition' | 'blocked_bounds'

    function tryNavigate(dir: 'down' | 'up'): NavResult {
      if (contactUnlockedRef.current) return 'blocked_bounds'

      const next = dir === 'down'
        ? currentIndexRef.current + 1
        : currentIndexRef.current - 1

      if (next < 0) return 'blocked_bounds'
      if (next >= totalSections) return 'blocked_bounds'

      // Panel animation in flight — block navigation until the page is fully static
      if (isAnimatingRef.current) return 'blocked_transition'

      const started = goTo(next)
      return started ? 'navigated' : 'blocked_transition'
    }

    function handleWheel(e: WheelEvent) {
      if (contactUnlockedRef.current) return

      // Restart the idle timer on every event — when it fires the gesture has truly ended
      if (gestureResetTimerRef.current) clearTimeout(gestureResetTimerRef.current)
      gestureResetTimerRef.current = setTimeout(() => {
        hasNavigatedThisGestureRef.current = false
        accumulatorRef.current = 0
      }, GESTURE_IDLE_MS)

      // Already consumed this gesture — absorb remaining momentum events
      if (hasNavigatedThisGestureRef.current) return

      // Reset accumulator on direction reversal
      const prevSign = Math.sign(accumulatorRef.current)
      accumulatorRef.current += e.deltaY
      const newSign = Math.sign(accumulatorRef.current)
      if (prevSign !== 0 && newSign !== prevSign) {
        accumulatorRef.current = e.deltaY
      }

      if (Math.abs(accumulatorRef.current) >= THRESHOLD) {
        const dir = accumulatorRef.current > 0 ? 'down' : 'up'
        accumulatorRef.current = 0

        const result = tryNavigate(dir)

        if (result === 'navigated' || result === 'blocked_transition') {
          // Consume the rest of this gesture — no further attempts until finger lifts.
          // blocked_transition: consuming prevents a delayed jump after animation settles.
          hasNavigatedThisGestureRef.current = true
        }
        // blocked_bounds: don't consume — let user retry immediately at the edge
      }
    }

    function handleTouchStart(e: TouchEvent) {
      touchStartYRef.current = e.touches[0].clientY
    }

    function handleTouchEnd(e: TouchEvent) {
      if (contactUnlockedRef.current) return
      const delta = touchStartYRef.current - e.changedTouches[0].clientY
      if (Math.abs(delta) < 30) return
      tryNavigate(delta > 0 ? 'down' : 'up')
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (contactUnlockedRef.current) return
      if (navCooldownRef.current) return   // prevents double-fire on key hold
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        tryNavigate('down')
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        tryNavigate('up')
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
      if (gestureResetTimerRef.current) clearTimeout(gestureResetTimerRef.current)
    }
  }, [totalSections, goTo])

  // Contact re-engagement: when contactUnlocked and user scrolls back to top, re-lock
  useEffect(() => {
    if (!contactUnlocked) return

    function handleScroll() {
      if (window.scrollY === 0) resetContact()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [contactUnlocked, resetContact])
}
