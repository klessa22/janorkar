import { useContent } from '../../context/ContentContext'
import { useGsapContext, gsap } from '../../hooks/useGsap'

export default function Process() {
  const { content } = useContent()

  const scopeRef = useGsapContext(() => {
    // Draw the centre progress line as the section scrolls.
    gsap.fromTo(
      '[data-process-line]',
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top center',
        scrollTrigger: {
          trigger: '[data-process-track]',
          start: 'top 70%',
          end: 'bottom 70%',
          scrub: true,
        },
      },
    )

    gsap.utils.toArray<HTMLElement>('[data-process-step]').forEach((step) => {
      const dir = step.dataset.side === 'left' ? -60 : 60
      gsap.from(step, {
        x: dir,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: step, start: 'top 82%' },
      })
      gsap.from(step.querySelector('[data-process-dot]'), {
        scale: 0,
        duration: 0.5,
        ease: 'back.out(2)',
        immediateRender: false,
        scrollTrigger: { trigger: step, start: 'top 80%' },
      })
    })
  })

  return (
    <section
      id="process"
      ref={scopeRef as React.RefObject<HTMLElement>}
      className="mx-auto max-w-6xl px-6 py-24 lg:py-32"
    >
      <div className="mb-16 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-accent)' }}>
          The Process
        </p>
        <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-tight text-stone-950 sm:text-4xl lg:text-5xl">
          Five deliberate steps from brief to building.
        </h2>
      </div>

      <div data-process-track className="relative">
        {/* centre line */}
        <div className="absolute left-5 top-0 h-full w-px bg-stone-200 md:left-1/2 md:-translate-x-1/2">
          <div data-process-line className="h-full w-full" style={{ background: 'var(--color-accent)' }} />
        </div>

        <div className="space-y-12 md:space-y-4">
          {content.process.map((step, i) => {
            const side = i % 2 === 0 ? 'left' : 'right'
            return (
              <div
                key={step.id}
                data-process-step
                data-side={side}
                className={`relative flex md:items-center ${
                  side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* dot */}
                <div
                  data-process-dot
                  className="absolute left-5 top-2 z-10 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full ring-4 ring-[var(--color-paper)] md:left-1/2"
                  style={{ background: 'var(--color-accent)' }}
                />
                <div className="hidden md:block md:w-1/2" />
                <div className={`w-full pl-12 md:w-1/2 ${side === 'left' ? 'md:pl-0 md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                    <span className="font-serif text-4xl font-semibold text-stone-200">{step.phase}</span>
                    <h3 className="mt-1 font-serif text-2xl text-stone-950">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-500">{step.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
