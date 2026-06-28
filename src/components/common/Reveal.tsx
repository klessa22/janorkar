import { useRef, useLayoutEffect, type ReactNode, type ElementType } from 'react'
import { gsap, prefersReduced } from '../../hooks/useGsap'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  y?: number
  /** stagger direct children instead of the element itself */
  stagger?: boolean
}

/**
 * Lightweight scroll-reveal wrapper. Uses gsap.from with immediateRender:false
 * (Rule 5) and bails out entirely under prefers-reduced-motion.
 */
export default function Reveal({
  children,
  as,
  className,
  delay = 0,
  y = 40,
  stagger = false,
}: RevealProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = (as ?? 'div') as any
  const ref = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    if (prefersReduced) return
    const el = ref.current
    if (!el) return
    const targets = stagger ? (Array.from(el.children) as HTMLElement[]) : el
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y,
        opacity: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        stagger: stagger ? 0.12 : 0,
        immediateRender: false,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, el)
    return () => ctx.revert()
  }, [delay, y, stagger])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
