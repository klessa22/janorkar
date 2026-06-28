import { useState } from 'react'
import { useGsapContext, gsap } from '../../hooks/useGsap'

const PHASES = [
  { key: 'site', title: 'Site', copy: 'Survey, levels and the boundary set out — every project begins by reading the ground.' },
  { key: 'foundation', title: 'Foundation', copy: 'Footings and plinth cast to carry the loads the architecture will impose.' },
  { key: 'frame', title: 'Frame', copy: 'Columns and beams rise — the structural skeleton that makes space possible.' },
  { key: 'cantilever', title: 'Cantilever', copy: 'The signature move: a slab reaches into the air, defying its own weight.' },
  { key: 'roof', title: 'Roof', copy: 'The building is capped and made weather-tight, the envelope nearly complete.' },
  { key: 'glazing', title: 'Glazing', copy: 'Glass dissolves the wall — light pours in and the structure disappears.' },
]

export default function ConstructionSequence() {
  const [phase, setPhase] = useState(0)

  const scopeRef = useGsapContext((_, scope) => {
    const svg = scope.querySelector('svg')!
    const draw = (sel: string) =>
      Array.from(svg.querySelectorAll<SVGGeometryElement>(sel)).map((el) => {
        try {
          const len = el.getTotalLength()
          gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
          return el
        } catch {
          gsap.set(el, { opacity: 0 })
          return el
        }
      })

    PHASES.forEach((p) => draw(`[data-phase="${p.key}"] [data-draw]`))
    PHASES.forEach((p) => gsap.set(`[data-phase="${p.key}"] [data-fill]`, { opacity: 0, transformOrigin: 'bottom center', scaleY: 0.6 }))

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: 'top top',
        end: '+=320%',
        scrub: 1,
        pin: '[data-pin]',
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(PHASES.length - 1, Math.floor(self.progress * PHASES.length))
          setPhase(idx)
        },
      },
    })

    PHASES.forEach((p) => {
      tl.to(`[data-phase="${p.key}"] [data-draw]`, { strokeDashoffset: 0, duration: 1, ease: 'power1.inOut' })
      tl.to(`[data-phase="${p.key}"] [data-fill]`, { opacity: 1, scaleY: 1, duration: 0.5, ease: 'power2.out' }, '<0.3')
    })
  })

  const accent = 'var(--color-accent)'

  return (
    <section
      ref={scopeRef as React.RefObject<HTMLElement>}
      className="relative bg-stone-950 text-white"
    >
      <div data-pin className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-60" />
        <div className="noise-overlay" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2">
          {/* Narration */}
          <div className="order-2 lg:order-1">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: accent }}>
              How we build · Phase {String(phase + 1).padStart(2, '0')} / 06
            </p>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              {PHASES[phase].title}
            </h2>
            <p className="mt-5 max-w-md text-stone-400">{PHASES[phase].copy}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {PHASES.map((p, i) => (
                <span
                  key={p.key}
                  className="rounded-full border px-3 py-1 text-xs transition-colors"
                  style={{
                    borderColor: i <= phase ? accent : 'rgba(255,255,255,0.15)',
                    color: i <= phase ? '#fff' : 'rgba(255,255,255,0.45)',
                    background: i === phase ? 'rgba(var(--accent-rgb),0.18)' : 'transparent',
                  }}
                >
                  {p.title}
                </span>
              ))}
            </div>

            <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full transition-[width] duration-300"
                style={{ width: `${((phase + 1) / PHASES.length) * 100}%`, background: accent }}
              />
            </div>
          </div>

          {/* SVG building */}
          <div className="order-1 lg:order-2">
            <svg viewBox="0 0 400 360" className="w-full" fill="none" stroke={accent} strokeWidth={2}>
              {/* SITE */}
              <g data-phase="site" strokeWidth={1.5} stroke="rgba(255,255,255,0.5)" strokeDasharray="6 6">
                <line data-draw x1="20" y1="320" x2="380" y2="320" strokeDasharray="none" stroke={accent} strokeWidth={2.5} />
                <rect data-draw x="60" y="120" width="280" height="200" />
              </g>

              {/* FOUNDATION */}
              <g data-phase="foundation" stroke={accent}>
                <rect data-fill x="70" y="300" width="50" height="20" fill="rgba(var(--accent-rgb),0.25)" stroke="none" />
                <rect data-fill x="180" y="300" width="50" height="20" fill="rgba(var(--accent-rgb),0.25)" stroke="none" />
                <rect data-fill x="285" y="300" width="50" height="20" fill="rgba(var(--accent-rgb),0.25)" stroke="none" />
                <line data-draw x1="70" y1="300" x2="335" y2="300" />
              </g>

              {/* FRAME */}
              <g data-phase="frame" stroke="#fff" strokeWidth={2}>
                <line data-draw x1="90" y1="300" x2="90" y2="150" />
                <line data-draw x1="200" y1="300" x2="200" y2="150" />
                <line data-draw x1="310" y1="300" x2="310" y2="150" />
                <line data-draw x1="90" y1="220" x2="310" y2="220" />
                <line data-draw x1="90" y1="150" x2="310" y2="150" />
              </g>

              {/* CANTILEVER */}
              <g data-phase="cantilever">
                <path data-draw d="M90 150 L360 150 L360 185 L200 185" stroke={accent} strokeWidth={2.5} />
                <rect data-fill x="200" y="152" width="158" height="32" fill="rgba(var(--accent-rgb),0.2)" stroke="none" />
              </g>

              {/* ROOF */}
              <g data-phase="roof" stroke="#fff">
                <path data-draw d="M75 150 L325 110 L325 150" strokeWidth={2.5} />
                <line data-draw x1="75" y1="150" x2="325" y2="150" />
                <polygon data-fill points="75,150 325,110 325,150" fill="rgba(255,255,255,0.08)" stroke="none" />
              </g>

              {/* GLAZING */}
              <g data-phase="glazing" stroke="rgba(255,255,255,0.6)" strokeWidth={1.2}>
                <line data-draw x1="125" y1="150" x2="125" y2="300" />
                <line data-draw x1="160" y1="150" x2="160" y2="300" />
                <line data-draw x1="240" y1="150" x2="240" y2="300" />
                <line data-draw x1="275" y1="150" x2="275" y2="300" />
                <rect data-fill x="92" y="222" width="216" height="76" fill="rgba(var(--accent-rgb),0.12)" stroke="none" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
