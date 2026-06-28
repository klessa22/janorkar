import { useRef } from 'react'
import { useContent } from '../../context/ContentContext'
import { useGsapContext, gsap } from '../../hooks/useGsap'

export default function ParallaxQuote() {
  const { content } = useContent()
  const bgRef = useRef<HTMLDivElement>(null)

  const scopeRef = useGsapContext((_, scope) => {
    if (bgRef.current) {
      gsap.fromTo(
        bgRef.current,
        { yPercent: -18 },
        {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: { trigger: scope, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }
    gsap.from('[data-quote-text]', {
      opacity: 0,
      y: 40,
      duration: 1.1,
      ease: 'power3.out',
      immediateRender: false,
      scrollTrigger: { trigger: scope, start: 'top 65%' },
    })
  })

  return (
    <section
      ref={scopeRef as React.RefObject<HTMLElement>}
      className="relative flex min-h-[80vh] items-center overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 -top-[18%] h-[136%] bg-cover bg-center"
        style={{ backgroundImage: `url(${content.quote.image})` }}
      />
      <div className="absolute inset-0 bg-stone-950/70" />
      <div className="noise-overlay" />
      <blockquote data-quote-text className="relative mx-auto max-w-5xl px-6 text-center">
        <span className="font-serif text-7xl leading-none text-[var(--color-accent)]">“</span>
        <p className="mt-2 font-serif text-3xl font-medium italic leading-tight text-white sm:text-4xl lg:text-6xl text-balance">
          {content.quote.text}
        </p>
        <footer className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-stone-300">
          — {content.quote.author}
        </footer>
      </blockquote>
    </section>
  )
}
