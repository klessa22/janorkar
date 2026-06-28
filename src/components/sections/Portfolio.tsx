import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowUpRight, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useContent } from '../../context/ContentContext'
import Reveal from '../common/Reveal'

const FILTERS = ['All', 'Residential', 'Commercial', 'Public', 'Hospitality'] as const

export default function Portfolio() {
  const { projects } = useContent()
  const navigate = useNavigate()
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((p) => {
      const matchCat = filter === 'All' || p.category === filter
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      return matchCat && matchQuery
    })
  }, [projects, filter, query])

  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
      <Reveal className="mb-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-accent)' }}>
            Selected Work
          </p>
          <h2 className="max-w-xl font-serif text-3xl leading-tight text-stone-950 sm:text-4xl lg:text-5xl">
            A portfolio composed, not assembled.
          </h2>
        </div>
        <div className="relative w-full max-w-xs">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            className="w-full rounded-full border border-stone-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-stone-900"
          />
        </div>
      </Reveal>

      <div className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="rounded-full border px-5 py-2 text-sm font-medium transition-colors"
            style={
              filter === f
                ? { background: 'var(--color-ink)', color: '#fff', borderColor: 'var(--color-ink)' }
                : { borderColor: '#d6d3d1', color: '#57534e' }
            }
          >
            {f}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-20 text-center text-stone-500">No projects match your search.</p>
      ) : (
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.article
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                data-cursor="hover"
                onClick={() => navigate(`/projects/${p.id}`)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-stone-200">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-stone-950/0 transition-colors duration-500 group-hover:bg-stone-950/20" />
                  <span className="absolute right-4 top-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight size={18} className="text-stone-900" />
                  </span>
                  <span
                    className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium text-white"
                    style={{ background: 'rgba(var(--accent-rgb),0.9)' }}
                  >
                    {p.category}
                  </span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl text-stone-950">{p.title}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-stone-500">
                      <MapPin size={13} /> {p.location} · {p.year}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm text-stone-400">{p.area}</span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  )
}
