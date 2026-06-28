import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { useContent } from '../../context/ContentContext'

export default function Testimonials() {
  const { content } = useContent()
  const items = content.testimonials
  const [[index, dir], setState] = useState<[number, number]>([0, 0])

  if (!items.length) return null
  const current = items[index]

  const paginate = (d: number) => {
    setState(([i]) => {
      const next = (i + d + items.length) % items.length
      return [next, d]
    })
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-accent)' }}>
        Testimonials
      </p>
      <Quote size={40} className="mx-auto mb-6" style={{ color: 'var(--color-accent)' }} />

      <div className="relative min-h-[220px]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.blockquote
            key={current.id}
            custom={dir}
            initial={{ opacity: 0, x: dir > 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir > 0 ? -60 : 60 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-serif text-2xl font-medium leading-snug text-stone-900 sm:text-3xl lg:text-4xl text-balance">
              “{current.quote}”
            </p>
            <footer className="mt-8">
              <p className="font-semibold text-stone-900">{current.name}</p>
              <p className="text-sm text-stone-500">{current.role}</p>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          onClick={() => paginate(-1)}
          aria-label="Previous"
          className="grid h-11 w-11 place-items-center rounded-full border border-stone-300 transition-colors hover:border-stone-900"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex gap-2">
          {items.map((t, i) => (
            <button
              key={t.id}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setState([i, i > index ? 1 : -1])}
              className="h-2 rounded-full transition-all"
              style={{
                width: i === index ? 26 : 8,
                background: i === index ? 'var(--color-accent)' : '#d6d3d1',
              }}
            />
          ))}
        </div>
        <button
          onClick={() => paginate(1)}
          aria-label="Next"
          className="grid h-11 w-11 place-items-center rounded-full border border-stone-300 transition-colors hover:border-stone-900"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  )
}
