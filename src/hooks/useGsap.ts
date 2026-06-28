import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Global ScrollTrigger config — avoid mobile address-bar resize thrash (perf spec).
ScrollTrigger.config({ ignoreMobileResize: true })

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Scoped GSAP context hook. The callback receives a gsap.Context-scoped helper;
 * all tweens/triggers created inside are auto-reverted on cleanup.
 *
 * When the user prefers reduced motion, the callback is skipped entirely so the
 * page renders in its natural (final) state.
 */
export function useGsapContext(
  setup: (self: gsap.Context, scope: HTMLElement) => void,
  deps: unknown[] = [],
) {
  const scopeRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    if (prefersReduced) return
    const el = scopeRef.current
    if (!el) return
    const ctx = gsap.context((self) => setup(self, el), el)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return scopeRef
}

export { gsap, ScrollTrigger, prefersReduced }
