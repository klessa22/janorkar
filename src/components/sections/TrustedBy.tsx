import { useContent } from '../../context/ContentContext'
import Reveal from '../common/Reveal'

export default function TrustedBy() {
  const { content } = useContent()
  return (
    <section className="border-y border-stone-200 bg-[var(--color-paper)] py-14">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">
          Featured & trusted by
        </p>
        <Reveal stagger className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-16">
          {content.trustedBy.map((name) => (
            <span
              key={name}
              className="font-serif text-xl italic text-stone-400 transition-colors duration-300 hover:text-stone-900 sm:text-2xl"
            >
              {name}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
