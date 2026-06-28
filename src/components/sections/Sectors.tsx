import { useContent } from '../../context/ContentContext'
import { useGsapContext, gsap } from '../../hooks/useGsap'
import { ArrowUpRight } from 'lucide-react'

export default function Sectors() {
  const { content } = useContent()

  const scopeRef = useGsapContext((_, scope) => {
    gsap.from('[data-sector-card]', {
      y: 80,
      opacity: 0,
      rotateX: -18,
      transformPerspective: 900,
      transformOrigin: 'center top',
      duration: 1,
      ease: 'power3.out',
      stagger: 0.15,
      immediateRender: false,
      scrollTrigger: { trigger: scope, start: 'top 70%' },
    })
    gsap.from('[data-sector-head] > *', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      immediateRender: false,
      scrollTrigger: { trigger: '[data-sector-head]', start: 'top 85%' },
    })
  })

  return (
    <section
      id="sectors"
      ref={scopeRef as React.RefObject<HTMLElement>}
      className="mx-auto max-w-7xl px-6 py-24 lg:py-32"
    >
      <div data-sector-head className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-accent)' }}>
            Sectors
          </p>
          <h2 className="max-w-xl font-serif text-3xl leading-tight text-stone-950 sm:text-4xl lg:text-5xl">
            Three arenas, one standard of rigour.
          </h2>
        </div>
        <p className="max-w-xs text-sm text-stone-500">
          From private homes to public landmarks, every commission is held to the same editorial discipline.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {content.sectors.map((s) => (
          <article
            key={s.id}
            data-sector-card
            data-cursor="hover"
            className="group relative h-[460px] overflow-hidden rounded-2xl bg-stone-900"
          >
            <img
              src={s.image}
              alt={s.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-7">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-3xl text-white">{s.title}</h3>
                <span
                  className="grid h-10 w-10 place-items-center rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100"
                  style={{ background: 'var(--color-accent)' }}
                >
                  <ArrowUpRight size={18} className="text-white" />
                </span>
              </div>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
                <p className="overflow-hidden text-sm text-stone-300">
                  <span className="block pt-3">{s.description}</span>
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
