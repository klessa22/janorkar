import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin accent progress bar pinned to the very top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[90] h-[3px] w-full origin-left"
      style={{ scaleX, background: 'var(--color-accent)' }}
    />
  )
}
