import { useEffect, useState } from 'react'

/**
 * True on phones / small touch devices. Combines a width media-query with a
 * touch capability check so the 3D canvas and cursor follower never run where
 * they would hurt performance (Rule 6).
 */
export function useIsMobile(breakpoint = 768): boolean {
  const query = `(max-width: ${breakpoint - 1}px)`

  const compute = () => {
    if (typeof window === 'undefined') return false
    const narrow = window.matchMedia(query).matches
    const touch =
      'ontouchstart' in window || navigator.maxTouchPoints > 0
    return narrow || touch
  }

  const [isMobile, setIsMobile] = useState<boolean>(compute)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = () => setIsMobile(compute())
    handler()
    mql.addEventListener('change', handler)
    window.addEventListener('resize', handler)
    return () => {
      mql.removeEventListener('change', handler)
      window.removeEventListener('resize', handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return isMobile
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setReduced(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])
  return reduced
}
