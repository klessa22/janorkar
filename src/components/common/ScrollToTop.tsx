import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

/** Appears after 300px of scroll; smooth-scrolls to top on click. */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ y: -3 }}
          className="fixed bottom-6 right-6 z-[80] grid h-12 w-12 place-items-center rounded-full text-white shadow-lg shadow-black/20"
          style={{ background: 'var(--color-accent)' }}
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
