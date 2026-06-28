import { useNavigate, useLocation } from 'react-router-dom'
import { Instagram, Facebook, Linkedin, ArrowUpRight } from 'lucide-react'
import { useContent } from '../context/ContentContext'

export default function Footer() {
  const { content } = useContent()
  const navigate = useNavigate()
  const location = useLocation()

  const go = (id: string) => {
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(scroll, 240)
    } else scroll()
  }

  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-stone-950 px-6 pb-10 pt-20 text-stone-300">
      <div className="noise-overlay" />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
        <div>
          <div className="mb-5 flex items-baseline gap-2">
            <span
              className="text-3xl"
              style={{ fontFamily: 'var(--font-deva)', color: 'var(--color-accent)' }}
            >
              {content.brandDevanagari}
            </span>
          </div>
          <h3 className="mb-4 max-w-xs font-serif text-2xl leading-tight text-white">
            {content.brandName}
          </h3>
          <p className="max-w-sm text-sm leading-relaxed text-stone-400">{content.footer.blurb}</p>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Instagram, href: content.footer.instagram, label: 'Instagram' },
              { Icon: Facebook, href: content.footer.facebook, label: 'Facebook' },
              { Icon: Linkedin, href: content.footer.linkedin, label: 'LinkedIn' },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
            Navigate
          </h4>
          <ul className="space-y-3 text-sm">
            {['about', 'sectors', 'services', 'portfolio', 'process', 'contact'].map((id) => (
              <li key={id}>
                <button
                  onClick={() => go(id)}
                  className="capitalize text-stone-400 transition-colors hover:text-white"
                >
                  {id}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
            Services
          </h4>
          <ul className="space-y-3 text-sm">
            {content.services.map((s) => (
              <li key={s.id} className="text-stone-400">
                {s.title}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
            Studio
          </h4>
          <ul className="space-y-3 text-sm text-stone-400">
            <li>{content.contact.address}</li>
            <li>
              <a href={`tel:${content.contact.phone}`} className="hover:text-white">
                {content.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${content.contact.email}`} className="hover:text-white">
                {content.contact.email}
              </a>
            </li>
            <li>{content.contact.hours}</li>
          </ul>
        </div>
      </div>

      <div className="relative mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-xs text-stone-500 sm:flex-row">
        <p>
          © {year} {content.brandName}. All rights reserved.
        </p>
        <button
          onClick={() => navigate(isAuthedRoute())}
          className="inline-flex items-center gap-1 text-stone-400 transition-colors hover:text-[var(--color-accent)]"
        >
          Studio Admin <ArrowUpRight size={13} />
        </button>
      </div>
    </footer>
  )
}

function isAuthedRoute() {
  return '/login'
}
