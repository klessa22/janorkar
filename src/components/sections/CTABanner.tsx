import { useContent } from '../../context/ContentContext'
import Reveal from '../common/Reveal'

export default function CTABanner() {
  const { content } = useContent()
  return (
    <section className="relative overflow-hidden bg-stone-950 px-6 py-24 text-center text-white lg:py-32">
      <div className="noise-overlay" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'radial-gradient(circle at center, rgba(var(--accent-rgb),0.35), transparent 55%)',
        }}
      />
      <Reveal className="relative mx-auto max-w-3xl">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: 'var(--color-accent)' }}>
          {content.cta.eyebrow}
        </p>
        <h2 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl text-balance">
          {content.cta.title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-stone-400">{content.cta.body}</p>
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-10 rounded-full px-9 py-4 text-sm font-semibold text-stone-950 shadow-lg transition-transform hover:scale-[1.04]"
          style={{ background: 'var(--color-accent)' }}
        >
          {content.cta.button}
        </button>
      </Reveal>
    </section>
  )
}
