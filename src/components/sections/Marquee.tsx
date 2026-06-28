import { useContent } from '../../context/ContentContext'

export default function Marquee() {
  const { content } = useContent()
  const items = content.marquee.length ? content.marquee : ['Architecture', 'Interiors']
  const loop = [...items, ...items]

  return (
    <section className="relative overflow-hidden border-y border-stone-800 bg-stone-950 py-5">
      <div className="noise-overlay" />
      <div className="relative flex w-max marquee-track">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="px-8 font-serif text-xl italic text-stone-100 sm:text-2xl">{item}</span>
            <span className="text-lg" style={{ color: 'var(--color-accent)' }}>
              ✦
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
