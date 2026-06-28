import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { useContent } from '../../context/ContentContext'
import Reveal from '../common/Reveal'

const SERVICES = ['Architecture', 'Interiors', 'Turnkey Execution', 'Renovation', 'Consultation']
const BUDGETS = ['Under ₹25L', '₹25L – ₹1Cr', '₹1Cr – ₹5Cr', '₹5Cr+']

export default function Contact() {
  const { content } = useContent()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: SERVICES[0],
    budget: BUDGETS[1],
    message: '',
  })

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }))
  const canNext =
    step === 0 ? form.name.trim() && form.phone.trim() : step === 1 ? true : true

  const submit = () => {
    const text = encodeURIComponent(
      `Hello ${content.brandName},%0A%0A` +
        `I'd like to enquire about a project.%0A%0A` +
        `Name: ${form.name}%0A` +
        `Email: ${form.email}%0A` +
        `Phone: ${form.phone}%0A` +
        `Service: ${form.service}%0A` +
        `Budget: ${form.budget}%0A` +
        `Details: ${form.message}`,
    ).replace(/%250A/g, '%0A')
    window.open(`https://wa.me/${content.contact.whatsapp}?text=${text}`, '_blank')
  }

  const info = [
    { Icon: MapPin, label: 'Studio', value: content.contact.address },
    { Icon: Phone, label: 'Phone', value: content.contact.phone, href: `tel:${content.contact.phone}` },
    { Icon: Mail, label: 'Email', value: content.contact.email, href: `mailto:${content.contact.email}` },
    { Icon: Clock, label: 'Hours', value: content.contact.hours },
  ]

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Info */}
        <Reveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-accent)' }}>
            Get in touch
          </p>
          <h2 className="font-serif text-3xl leading-tight text-stone-950 sm:text-4xl lg:text-5xl">
            Let’s talk about your site, your brief and your ambition.
          </h2>
          <p className="mt-5 max-w-md text-stone-600">
            Share a few details and we’ll respond within two working days with a considered point of view.
          </p>

          <div className="mt-10 space-y-5">
            {info.map(({ Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                  style={{ background: 'rgba(var(--accent-rgb),0.12)', color: 'var(--color-accent)' }}
                >
                  <Icon size={19} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-stone-400">{label}</p>
                  {href ? (
                    <a href={href} className="text-stone-800 hover:text-stone-950">
                      {value}
                    </a>
                  ) : (
                    <p className="text-stone-800">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <a
            href={`https://wa.me/${content.contact.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            <MessageCircle size={17} /> Chat on WhatsApp
          </a>
        </Reveal>

        {/* Multi-step form */}
        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-stone-200 bg-white p-7 shadow-sm sm:p-9">
            <div className="mb-7 flex items-center gap-2">
              {[0, 1, 2].map((s) => (
                <div key={s} className="flex flex-1 items-center gap-2">
                  <div
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-semibold transition-colors"
                    style={
                      s <= step
                        ? { background: 'var(--color-accent)', color: '#fff' }
                        : { background: '#f5f5f4', color: '#a8a29e' }
                    }
                  >
                    {s < step ? <Check size={14} /> : s + 1}
                  </div>
                  {s < 2 && (
                    <div className="h-px flex-1" style={{ background: s < step ? 'var(--color-accent)' : '#e7e5e4' }} />
                  )}
                </div>
              ))}
            </div>

            {step === 0 && (
              <div className="space-y-4">
                <Field label="Full name">
                  <input className={inputCls} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Your name" />
                </Field>
                <Field label="Phone">
                  <input className={inputCls} value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+91 …" />
                </Field>
                <Field label="Email (optional)">
                  <input className={inputCls} value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@email.com" />
                </Field>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <Field label="Service">
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((s) => (
                      <Chip key={s} active={form.service === s} onClick={() => set('service', s)}>
                        {s}
                      </Chip>
                    ))}
                  </div>
                </Field>
                <Field label="Budget">
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((b) => (
                      <Chip key={b} active={form.budget === b} onClick={() => set('budget', b)}>
                        {b}
                      </Chip>
                    ))}
                  </div>
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <Field label="Tell us about your project">
                  <textarea
                    className={`${inputCls} min-h-32 resize-none`}
                    value={form.message}
                    onChange={(e) => set('message', e.target.value)}
                    placeholder="Site location, scope, timeline…"
                  />
                </Field>
                <p className="text-xs text-stone-400">
                  Submitting opens WhatsApp with your enquiry pre-filled — review it before sending.
                </p>
              </div>
            )}

            <div className="mt-7 flex items-center justify-between">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 disabled:opacity-0"
              >
                <ArrowLeft size={15} /> Back
              </button>
              {step < 2 ? (
                <button
                  onClick={() => canNext && setStep((s) => s + 1)}
                  disabled={!canNext}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-40"
                  style={{ background: 'var(--color-ink)' }}
                >
                  Continue <ArrowRight size={15} />
                </button>
              ) : (
                <button
                  onClick={submit}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                  style={{ background: 'var(--color-accent)' }}
                >
                  <MessageCircle size={16} /> Send via WhatsApp
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const inputCls =
  'w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-stone-900'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-stone-500">{label}</span>
      {children}
    </label>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border px-4 py-2 text-sm transition-colors"
      style={
        active
          ? { background: 'var(--color-ink)', color: '#fff', borderColor: 'var(--color-ink)' }
          : { borderColor: '#d6d3d1', color: '#57534e' }
      }
    >
      {children}
    </button>
  )
}
