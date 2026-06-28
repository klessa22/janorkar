import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, ImagePlus, Type, Palette, Database } from 'lucide-react'
import { useContent } from '../../context/ContentContext'

const TAB_ICONS = [ImagePlus, Type, Palette, Database]

export default function ClientPortal() {
  const { content } = useContent()
  const navigate = useNavigate()
  const [active, setActive] = useState(0)
  const features = content.portal.features
  const current = features[active] ?? features[0]

  return (
    <section className="relative overflow-hidden bg-stone-950 py-24 text-white lg:py-32">
      <div className="noise-overlay" />
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full opacity-30 blur-[120px]"
        style={{ background: 'var(--color-accent)' }}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        {/* iPad mockup */}
        <div className="order-2 lg:order-1">
          <div className="relative mx-auto max-w-md rounded-[2rem] border-[10px] border-stone-800 bg-stone-900 p-3 shadow-2xl">
            <div className="overflow-hidden rounded-2xl bg-[var(--color-paper)]">
              <div className="flex items-center justify-between border-b border-stone-200 bg-white px-4 py-3">
                <div className="flex items-center gap-2 text-stone-900">
                  <LayoutDashboard size={16} style={{ color: 'var(--color-accent)' }} />
                  <span className="text-xs font-semibold">Studio Admin</span>
                </div>
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-stone-300" />
                  <span className="h-2 w-2 rounded-full bg-stone-300" />
                  <span className="h-2 w-2 rounded-full" style={{ background: 'var(--color-accent)' }} />
                </div>
              </div>
              <div className="p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="mb-3 h-28 rounded-lg bg-gradient-to-br from-stone-200 to-stone-300" />
                    <div className="space-y-2">
                      <div className="h-3 w-2/3 rounded bg-stone-300" />
                      <div className="h-3 w-1/2 rounded bg-stone-200" />
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {[0, 1, 2].map((n) => (
                        <div key={n} className="h-14 rounded-md bg-stone-200" />
                      ))}
                    </div>
                    <div
                      className="mt-4 flex h-9 items-center justify-center rounded-md text-xs font-semibold text-white"
                      style={{ background: 'var(--color-accent)' }}
                    >
                      {current.title}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Feature tabs */}
        <div className="order-1 lg:order-2">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-accent)' }}>
            {content.portal.eyebrow}
          </p>
          <h2 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">{content.portal.title}</h2>
          <p className="mt-4 max-w-md text-stone-400">{content.portal.body}</p>

          <div className="mt-8 space-y-2">
            {features.map((f, i) => {
              const Icon = TAB_ICONS[i % TAB_ICONS.length]
              const on = i === active
              return (
                <button
                  key={f.id}
                  onClick={() => setActive(i)}
                  className="flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-colors"
                  style={{
                    borderColor: on ? 'var(--color-accent)' : 'rgba(255,255,255,0.1)',
                    background: on ? 'rgba(var(--accent-rgb),0.1)' : 'transparent',
                  }}
                >
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-lg"
                    style={{
                      background: on ? 'var(--color-accent)' : 'rgba(255,255,255,0.06)',
                      color: on ? '#fff' : 'var(--color-accent)',
                    }}
                  >
                    <Icon size={18} />
                  </span>
                  <span>
                    <span className="block font-semibold">{f.title}</span>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.span
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="block overflow-hidden text-sm text-stone-400"
                        >
                          <span className="block pt-1">{f.description}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </button>
              )
            })}
          </div>

          <button
            onClick={() => navigate('/login')}
            className="mt-8 rounded-full px-7 py-3.5 text-sm font-semibold text-stone-950 transition-transform hover:scale-[1.03]"
            style={{ background: 'var(--color-accent)' }}
          >
            Explore the Dashboard
          </button>
        </div>
      </div>
    </section>
  )
}
