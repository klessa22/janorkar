import { useEffect, useRef, useState } from 'react'
import { BadgeCheck } from 'lucide-react'
import { useContent } from '../../context/ContentContext'
import { useGsapContext, gsap, prefersReduced } from '../../hooks/useGsap'
import type { Stat } from '../../lib/types'

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [val, setVal] = useState(prefersReduced ? stat.value : 0)

  useEffect(() => {
    if (prefersReduced) return
    const el = ref.current
    if (!el) return
    const obj = { n: 0 }
    const tween = gsap.to(obj, {
      n: stat.value,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => setVal(Math.round(obj.n)),
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [stat.value])

  return (
    <span ref={ref}>
      {val}
      {stat.suffix}
    </span>
  )
}

export default function About() {
  const { content } = useContent()
  const imageRef = useRef<HTMLImageElement>(null)

  const scopeRef = useGsapContext((_, scope) => {
    // Parallax scrub on the image.
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: scope, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }
    gsap.from('[data-about="text"] > *', {
      y: 36,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power3.out',
      immediateRender: false,
      scrollTrigger: { trigger: '[data-about="text"]', start: 'top 80%' },
    })
  })

  return (
    <section
      id="about"
      ref={scopeRef as React.RefObject<HTMLElement>}
      className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <img
              ref={imageRef}
              src={content.about.image}
              alt="Studio work"
              loading="lazy"
              className="absolute inset-0 h-[124%] w-full -top-[12%] object-cover"
            />
          </div>
          <div className="glass absolute -bottom-6 -right-4 flex items-center gap-3 rounded-2xl border border-white/50 px-5 py-4 shadow-xl sm:-right-6">
            <BadgeCheck size={26} style={{ color: 'var(--color-accent)' }} />
            <div>
              <p className="text-sm font-semibold text-stone-900">{content.about.badge}</p>
              <p className="text-xs text-stone-500">Govt. of India</p>
            </div>
          </div>
        </div>

        <div data-about="text">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-accent)' }}>
            {content.about.eyebrow}
          </p>
          <h2 className="font-serif text-3xl leading-tight text-stone-950 sm:text-4xl lg:text-5xl text-balance">
            {content.about.title}
          </h2>
          <div className="mt-6 space-y-4 text-stone-600">
            {content.about.body.map((p, i) => (
              <p key={i} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-stone-200 pt-8 sm:grid-cols-4 lg:grid-cols-2">
            {content.about.stats.map((s, i) => (
              <div key={i}>
                <p className="font-serif text-4xl font-semibold text-stone-950 lg:text-5xl">
                  <Counter stat={s} />
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-stone-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
