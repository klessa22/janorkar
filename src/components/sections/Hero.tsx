import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import { useContent } from '../../context/ContentContext'
import { useGsapContext, gsap } from '../../hooks/useGsap'

export default function Hero() {
  const { content } = useContent()
  const bgWrap = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const scopeRef = useGsapContext((_, scope) => {
    // Entrance timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('[data-hero="img"]', { opacity: 0, scale: 1.12, duration: 1.6, ease: 'power2.out' })
      .from('[data-hero="eyebrow"]', { y: 24, opacity: 0, duration: 0.7 }, '-=1.0')
      .from('[data-hero="line"]', { yPercent: 120, opacity: 0, duration: 1, stagger: 0.12 }, '-=0.55')
      .from('[data-hero="subtitle"]', { y: 24, opacity: 0, duration: 0.8 }, '-=0.6')
      .from('[data-hero="badge"]', { y: 18, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.5')
      .from('[data-hero="cta"]', { y: 18, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
      .from('[data-hero="scrollcue"]', { opacity: 0, duration: 0.8 }, '-=0.2')

    // Slow Ken-Burns zoom that loops forever
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { scale: 1.04 },
        { scale: 1.16, duration: 20, ease: 'sine.inOut', repeat: -1, yoyo: true },
      )
    }

    // Scroll parallax on the background layer
    if (bgWrap.current) {
      gsap.to(bgWrap.current, {
        yPercent: 16,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
      })
    }
  })

  return (
    <section
      id="hero"
      ref={scopeRef as React.RefObject<HTMLElement>}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-stone-950 pb-20 pt-28"
    >
      {/* Full-bleed editorial photo */}
      <div ref={bgWrap} className="absolute inset-0 -top-[8%] h-[116%]">
        <img
          ref={imgRef}
          data-hero="img"
          src={content.hero.image}
          alt=""
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Legibility gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/45 to-stone-950/25" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-stone-950/70 via-transparent to-transparent" />
      <div className="noise-overlay" />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="max-w-3xl">
          <p
            data-hero="eyebrow"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--color-accent)' }} />
            {content.hero.eyebrow}
          </p>

          <h1 className="font-serif text-5xl font-semibold leading-[0.98] text-white sm:text-7xl lg:text-8xl">
            {content.hero.titleLines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span
                  data-hero="line"
                  className="block"
                  style={
                    i === content.hero.titleLines.length - 1
                      ? { color: 'var(--color-accent)', fontStyle: 'italic' }
                      : undefined
                  }
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p data-hero="subtitle" className="mt-7 max-w-xl text-base leading-relaxed text-stone-200 sm:text-lg">
            {content.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {content.hero.badges.map((b) => (
              <span
                key={b}
                data-hero="badge"
                className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
              >
                {b}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              data-hero="cta"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full px-7 py-3.5 text-sm font-semibold text-stone-950 shadow-lg shadow-black/20 transition-transform hover:scale-[1.03]"
              style={{ background: 'var(--color-accent)' }}
            >
              {content.hero.ctaPrimary}
            </button>
            <button
              data-hero="cta"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              {content.hero.ctaSecondary}
            </button>
          </div>
        </div>
      </div>

      <button
        data-hero="scrollcue"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </button>
    </section>
  )
}
