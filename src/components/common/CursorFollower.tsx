import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsMobile } from '../../hooks/useIsMobile'

/**
 * Custom cursor: an outer ring that springs toward the pointer and an inner dot
 * that tracks it tightly. Entirely skipped on mobile / touch — no mousemove
 * listeners are ever attached there (perf spec).
 */
export default function CursorFollower() {
  const isMobile = useIsMobile()
  const [hovering, setHovering] = useState(false)
  const [hidden, setHidden] = useState(true)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.6 })

  useEffect(() => {
    if (isMobile) return
    document.body.classList.add('custom-cursor')

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHidden(false)
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [data-cursor="hover"], input, textarea, select')
      setHovering(!!interactive)
    }
    const leave = () => setHidden(true)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      document.body.classList.remove('custom-cursor')
    }
  }, [isMobile, x, y])

  if (isMobile) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: hidden ? 0 : 1 }}>
      <motion.div
        className="fixed left-0 top-0 rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: 'var(--color-accent)',
        }}
        animate={{
          width: hovering ? 56 : 34,
          height: hovering ? 56 : 34,
          opacity: hovering ? 1 : 0.6,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      <motion.div
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          background: 'var(--color-accent)',
        }}
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />
    </div>
  )
}
