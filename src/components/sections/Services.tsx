import { useContent } from '../../context/ContentContext'
import { useGsapContext, gsap } from '../../hooks/useGsap'
import { Compass, Sofa, HardHat, Check } from 'lucide-react'

const ICONS = [Compass, Sofa, HardHat]

export default function Services() {
  const { content } = useContent()

  const scopeRef = useGsapContext((_, scope) => {
    gsap.from('[data-service-card]', {
      y: 60,
      opacity: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: 'power3.out',
      immediateRender: false,
      scrollTrigger: { trigger: scope, start: 'top 72%' },
    })
  })

  return (
    <section
      id="services"
      ref={scopeRef as React.RefObject<HTMLElement>}
      className="relative overflow-hidden bg-stone-950 py-24 text-white lg:py-32"
    >
      <div className="noise-overlay" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-accent)' }}>
            What we do
          </p>
          <h2 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
            A complete practice, from first line to final handover.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {content.services.map((s, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <article
                key={s.id}
                data-service-card
                data-cursor="hover"
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-500 hover:bg-stone-900"
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: 'rgba(var(--accent-rgb),0.5)' }}
                />
                <div className="relative">
                  <span
                    className="mb-6 grid h-12 w-12 place-items-center rounded-xl transition-colors duration-500"
                    style={{ background: 'rgba(var(--accent-rgb),0.15)', color: 'var(--color-accent)' }}
                  >
                    <Icon size={22} />
                  </span>
                  <h3 className="font-serif text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-400">{s.description}</p>

                  <ul className="mt-6 grid gap-2.5 overflow-hidden">
                    {s.features.map((f, fi) => (
                      <li
                        key={fi}
                        className="flex translate-y-2 items-center gap-2.5 text-sm text-stone-300 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                        style={{ transitionDelay: `${fi * 60}ms` }}
                      >
                        <Check size={15} style={{ color: 'var(--color-accent)' }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <span
                  className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-500 ease-out group-hover:w-full"
                  style={{ background: 'var(--color-accent)' }}
                />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
