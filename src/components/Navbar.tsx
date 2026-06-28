import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, LayoutDashboard } from 'lucide-react'
import { useContent } from '../context/ContentContext'
import { useAuth } from '../context/AuthContext'

const LINKS = [
  { id: 'about', label: 'Studio' },
  { id: 'sectors', label: 'Sectors' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Work' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const { content } = useContent()
  const { isAuthed } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the overlay menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const goToSection = useCallback(
    (id: string) => {
      setOpen(false)
      const scroll = () => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(scroll, 240)
      } else {
        scroll()
      }
    },
    [location.pathname, navigate],
  )

  const onDashboard = () => navigate(isAuthed ? '/dashboard' : '/login')

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4">
        <motion.nav
          initial={false}
          animate={{
            marginTop: scrolled ? 14 : 22,
            width: scrolled ? 'min(1120px, 96%)' : 'min(1280px, 100%)',
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 26 }}
          className={`flex items-center justify-between rounded-full px-5 py-3 transition-colors duration-500 sm:px-7 ${
            scrolled
              ? 'glass border border-white/40 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.25)]'
              : 'border border-transparent'
          }`}
        >
          <button
            onClick={() => goToSection('hero')}
            className="flex items-baseline gap-2 text-left"
          >
            <span
              className="text-2xl leading-none"
              style={{ fontFamily: 'var(--font-deva)', color: 'var(--color-accent)' }}
            >
              {content.brandDevanagari}
            </span>
            <span className="hidden text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-stone-700 sm:block">
              Design Studio
            </span>
          </button>

          <div className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => goToSection(l.id)}
                className="link-underline text-sm font-medium text-stone-700 transition-colors hover:text-stone-950"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onDashboard}
              className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03] sm:flex"
              style={{ background: 'var(--color-ink)' }}
            >
              <LayoutDashboard size={15} />
              {isAuthed ? 'Dashboard' : 'Login'}
            </button>
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-stone-300 lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-stone-950 text-white"
          >
            <div className="noise-overlay" />
            <div className="flex items-center justify-between px-6 py-7">
              <span
                className="text-3xl"
                style={{ fontFamily: 'var(--font-deva)', color: 'var(--color-accent)' }}
              >
                {content.brandDevanagari}
              </span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/20"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1 }}
                  onClick={() => goToSection(l.id)}
                  className="border-b border-white/10 py-4 text-left font-serif text-4xl text-white/90 sm:text-5xl"
                >
                  {l.label}
                </motion.button>
              ))}
            </nav>
            <div className="px-6 py-8">
              <button
                onClick={() => {
                  setOpen(false)
                  onDashboard()
                }}
                className="w-full rounded-full py-4 text-center font-semibold text-stone-950"
                style={{ background: 'var(--color-accent)' }}
              >
                {isAuthed ? 'Open Dashboard' : 'Studio Login'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
