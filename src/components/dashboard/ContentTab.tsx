import { useRef, useState } from 'react'
import { ChevronDown, Plus, Trash2, RotateCcw, Upload, ImageIcon } from 'lucide-react'
import { useContent } from '../../context/ContentContext'
import { compressImage } from '../../lib/image'
import type { SiteContent } from '../../lib/types'

/**
 * Every edit here writes straight back to localStorage via updateContent, so the
 * landing page reflects changes live. Content groups are collapsible.
 */
export default function ContentTab() {
  const { content, updateContent, resetContent } = useContent()

  // helper to patch a nested group object
  const patch = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) =>
    updateContent({ [key]: value } as Partial<SiteContent>)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl text-stone-900">Site Content</h2>
          <p className="text-sm text-stone-500">Edits save instantly and appear live on the homepage.</p>
        </div>
        <button
          onClick={() => confirm('Reset ALL content to defaults?') && resetContent()}
          className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50"
        >
          <RotateCcw size={15} /> Reset
        </button>
      </div>

      {/* BRAND & ACCENT */}
      <Group title="Brand & Accent" defaultOpen>
        <Grid>
          <Text label="Brand name" value={content.brandName} onChange={(v) => patch('brandName', v)} />
          <Text label="Devanagari brand mark" value={content.brandDevanagari} onChange={(v) => patch('brandDevanagari', v)} />
        </Grid>
        <div className="mt-4 flex items-center gap-4">
          <div>
            <FieldLabel>Accent colour</FieldLabel>
            <input
              type="color"
              value={content.accent}
              onChange={(e) => patch('accent', e.target.value)}
              className="h-11 w-20 cursor-pointer rounded-lg border border-stone-300 bg-white"
            />
          </div>
          <div className="flex flex-wrap gap-2 pt-5">
            {['#c0673a', '#f97316', '#b45309', '#0e7490', '#4d7c0f', '#9333ea', '#be123c'].map((c) => (
              <button
                key={c}
                onClick={() => patch('accent', c)}
                className="h-8 w-8 rounded-full border-2"
                style={{ background: c, borderColor: content.accent === c ? '#0c0a09' : 'transparent' }}
                aria-label={c}
              />
            ))}
          </div>
        </div>
      </Group>

      {/* HERO */}
      <Group title="Hero">
        <Text label="Eyebrow" value={content.hero.eyebrow} onChange={(v) => patch('hero', { ...content.hero, eyebrow: v })} />
        <StringList
          label="Title lines"
          items={content.hero.titleLines}
          onChange={(titleLines) => patch('hero', { ...content.hero, titleLines })}
        />
        <Area label="Subtitle" value={content.hero.subtitle} onChange={(v) => patch('hero', { ...content.hero, subtitle: v })} />
        <StringList label="Badges" items={content.hero.badges} onChange={(badges) => patch('hero', { ...content.hero, badges })} />
        <Grid>
          <Text label="Primary CTA" value={content.hero.ctaPrimary} onChange={(v) => patch('hero', { ...content.hero, ctaPrimary: v })} />
          <Text label="Secondary CTA" value={content.hero.ctaSecondary} onChange={(v) => patch('hero', { ...content.hero, ctaSecondary: v })} />
        </Grid>
        <ImageField label="Background image" value={content.hero.image} onChange={(v) => patch('hero', { ...content.hero, image: v })} />
      </Group>

      {/* MARQUEE */}
      <Group title="Marquee">
        <StringList label="Ticker items" items={content.marquee} onChange={(marquee) => patch('marquee', marquee)} />
      </Group>

      {/* ABOUT */}
      <Group title="About & Stats">
        <Text label="Eyebrow" value={content.about.eyebrow} onChange={(v) => patch('about', { ...content.about, eyebrow: v })} />
        <Area label="Title" value={content.about.title} onChange={(v) => patch('about', { ...content.about, title: v })} />
        <StringList label="Body paragraphs" items={content.about.body} onChange={(body) => patch('about', { ...content.about, body })} textarea />
        <Text label="Badge text" value={content.about.badge} onChange={(v) => patch('about', { ...content.about, badge: v })} />
        <ImageField label="Image" value={content.about.image} onChange={(v) => patch('about', { ...content.about, image: v })} />
        <FieldLabel>Stats</FieldLabel>
        <ObjectList
          items={content.about.stats}
          onChange={(stats) => patch('about', { ...content.about, stats })}
          create={() => ({ value: 0, suffix: '+', label: 'New stat' })}
          render={(s, update) => (
            <Grid>
              <Text label="Value" value={String(s.value)} onChange={(v) => update({ ...s, value: Number(v) || 0 })} />
              <Text label="Suffix" value={s.suffix} onChange={(v) => update({ ...s, suffix: v })} />
              <Text label="Label" value={s.label} onChange={(v) => update({ ...s, label: v })} />
            </Grid>
          )}
        />
      </Group>

      {/* TRUSTED BY */}
      <Group title="Trusted By">
        <StringList label="Publications" items={content.trustedBy} onChange={(trustedBy) => patch('trustedBy', trustedBy)} />
      </Group>

      {/* SECTORS */}
      <Group title="Sectors">
        <ObjectList
          items={content.sectors}
          onChange={(sectors) => patch('sectors', sectors)}
          create={() => ({ id: `s_${Date.now()}`, title: 'New sector', description: '', image: '' })}
          render={(s, update) => (
            <>
              <Text label="Title" value={s.title} onChange={(v) => update({ ...s, title: v })} />
              <Area label="Description" value={s.description} onChange={(v) => update({ ...s, description: v })} />
              <ImageField label="Image" value={s.image} onChange={(v) => update({ ...s, image: v })} />
            </>
          )}
        />
      </Group>

      {/* SERVICES */}
      <Group title="Services">
        <ObjectList
          items={content.services}
          onChange={(services) => patch('services', services)}
          create={() => ({ id: `sv_${Date.now()}`, title: 'New service', description: '', features: [] })}
          render={(s, update) => (
            <>
              <Text label="Title" value={s.title} onChange={(v) => update({ ...s, title: v })} />
              <Area label="Description" value={s.description} onChange={(v) => update({ ...s, description: v })} />
              <StringList label="Features" items={s.features} onChange={(features) => update({ ...s, features })} />
            </>
          )}
        />
      </Group>

      {/* QUOTE */}
      <Group title="Parallax Quote">
        <Area label="Quote" value={content.quote.text} onChange={(v) => patch('quote', { ...content.quote, text: v })} />
        <Text label="Author" value={content.quote.author} onChange={(v) => patch('quote', { ...content.quote, author: v })} />
        <ImageField label="Background image" value={content.quote.image} onChange={(v) => patch('quote', { ...content.quote, image: v })} />
      </Group>

      {/* PROCESS */}
      <Group title="Process Steps">
        <ObjectList
          items={content.process}
          onChange={(process) => patch('process', process)}
          create={() => ({ id: `p_${Date.now()}`, phase: '06', title: 'New step', description: '' })}
          render={(s, update) => (
            <>
              <Grid>
                <Text label="Phase #" value={s.phase} onChange={(v) => update({ ...s, phase: v })} />
                <Text label="Title" value={s.title} onChange={(v) => update({ ...s, title: v })} />
              </Grid>
              <Area label="Description" value={s.description} onChange={(v) => update({ ...s, description: v })} />
            </>
          )}
        />
      </Group>

      {/* PORTAL */}
      <Group title="Client Portal">
        <Text label="Eyebrow" value={content.portal.eyebrow} onChange={(v) => patch('portal', { ...content.portal, eyebrow: v })} />
        <Area label="Title" value={content.portal.title} onChange={(v) => patch('portal', { ...content.portal, title: v })} />
        <Area label="Body" value={content.portal.body} onChange={(v) => patch('portal', { ...content.portal, body: v })} />
        <FieldLabel>Features</FieldLabel>
        <ObjectList
          items={content.portal.features}
          onChange={(features) => patch('portal', { ...content.portal, features })}
          create={() => ({ id: `f_${Date.now()}`, title: 'New feature', description: '' })}
          render={(s, update) => (
            <>
              <Text label="Title" value={s.title} onChange={(v) => update({ ...s, title: v })} />
              <Area label="Description" value={s.description} onChange={(v) => update({ ...s, description: v })} />
            </>
          )}
        />
      </Group>

      {/* TESTIMONIALS */}
      <Group title="Testimonials">
        <ObjectList
          items={content.testimonials}
          onChange={(testimonials) => patch('testimonials', testimonials)}
          create={() => ({ id: `t_${Date.now()}`, quote: '', name: '', role: '' })}
          render={(s, update) => (
            <>
              <Area label="Quote" value={s.quote} onChange={(v) => update({ ...s, quote: v })} />
              <Grid>
                <Text label="Name" value={s.name} onChange={(v) => update({ ...s, name: v })} />
                <Text label="Role" value={s.role} onChange={(v) => update({ ...s, role: v })} />
              </Grid>
            </>
          )}
        />
      </Group>

      {/* CTA */}
      <Group title="CTA Banner">
        <Text label="Eyebrow" value={content.cta.eyebrow} onChange={(v) => patch('cta', { ...content.cta, eyebrow: v })} />
        <Area label="Title" value={content.cta.title} onChange={(v) => patch('cta', { ...content.cta, title: v })} />
        <Area label="Body" value={content.cta.body} onChange={(v) => patch('cta', { ...content.cta, body: v })} />
        <Text label="Button" value={content.cta.button} onChange={(v) => patch('cta', { ...content.cta, button: v })} />
      </Group>

      {/* CONTACT */}
      <Group title="Contact">
        <Area label="Address" value={content.contact.address} onChange={(v) => patch('contact', { ...content.contact, address: v })} />
        <Grid>
          <Text label="Phone" value={content.contact.phone} onChange={(v) => patch('contact', { ...content.contact, phone: v })} />
          <Text label="WhatsApp number (digits only)" value={content.contact.whatsapp} onChange={(v) => patch('contact', { ...content.contact, whatsapp: v })} />
          <Text label="Email" value={content.contact.email} onChange={(v) => patch('contact', { ...content.contact, email: v })} />
          <Text label="Hours" value={content.contact.hours} onChange={(v) => patch('contact', { ...content.contact, hours: v })} />
        </Grid>
      </Group>

      {/* FOOTER */}
      <Group title="Footer & Social">
        <Area label="Blurb" value={content.footer.blurb} onChange={(v) => patch('footer', { ...content.footer, blurb: v })} />
        <Grid>
          <Text label="Instagram URL" value={content.footer.instagram} onChange={(v) => patch('footer', { ...content.footer, instagram: v })} />
          <Text label="Facebook URL" value={content.footer.facebook} onChange={(v) => patch('footer', { ...content.footer, facebook: v })} />
          <Text label="LinkedIn URL" value={content.footer.linkedin} onChange={(v) => patch('footer', { ...content.footer, linkedin: v })} />
        </Grid>
      </Group>
    </div>
  )
}

/* ---------- primitives ---------- */

const field =
  'w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-stone-900'

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="mb-1.5 mt-3 block text-xs font-medium uppercase tracking-wider text-stone-500">{children}</span>
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>
}

function Text({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <input value={value} onChange={(e) => onChange(e.target.value)} className={field} />
    </label>
  )
}

function Area({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} className={`${field} min-h-20 resize-none`} />
    </label>
  )
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const input = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)

  const upload = async (file?: File) => {
    if (!file) return
    setBusy(true)
    try {
      onChange(await compressImage(file))
    } catch {
      /* ignore */
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex items-start gap-3">
        <div className="grid h-20 w-28 shrink-0 place-items-center overflow-hidden rounded-lg border border-dashed border-stone-300 bg-stone-50">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon size={22} className="text-stone-300" />
          )}
        </div>
        <div className="flex-1">
          <input ref={input} type="file" accept="image/*" hidden onChange={(e) => upload(e.target.files?.[0])} />
          <button
            onClick={() => input.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium hover:bg-stone-50 disabled:opacity-50"
          >
            <Upload size={15} /> {busy ? 'Processing…' : 'Upload'}
          </button>
          <input
            value={value.startsWith('data:') ? '' : value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="…or paste an image URL"
            className={`${field} mt-2`}
          />
        </div>
      </div>
    </div>
  )
}

function Group({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="font-serif text-lg text-stone-900">{title}</span>
        <ChevronDown size={18} className={`text-stone-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="space-y-3 border-t border-stone-100 px-5 py-5">{children}</div>}
    </div>
  )
}

function StringList({
  label,
  items,
  onChange,
  textarea = false,
}: {
  label: string
  items: string[]
  onChange: (items: string[]) => void
  textarea?: boolean
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            {textarea ? (
              <textarea
                value={item}
                onChange={(e) => onChange(items.map((x, idx) => (idx === i ? e.target.value : x)))}
                className={`${field} min-h-16 resize-none`}
              />
            ) : (
              <input
                value={item}
                onChange={(e) => onChange(items.map((x, idx) => (idx === i ? e.target.value : x)))}
                className={field}
              />
            )}
            <button
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-stone-300 text-red-600 hover:bg-red-50"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => onChange([...items, ''])}
        className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-stone-900"
      >
        <Plus size={15} /> Add item
      </button>
    </div>
  )
}

function ObjectList<T>({
  items,
  onChange,
  create,
  render,
}: {
  items: T[]
  onChange: (items: T[]) => void
  create: () => T
  render: (item: T, update: (next: T) => void) => React.ReactNode
}) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
          <div className="mb-2 flex justify-end">
            <button
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700"
            >
              <Trash2 size={13} /> Remove
            </button>
          </div>
          {render(item, (next) => onChange(items.map((x, idx) => (idx === i ? next : x))))}
        </div>
      ))}
      <button
        onClick={() => onChange([...items, create()])}
        className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-stone-300 px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50"
      >
        <Plus size={15} /> Add
      </button>
    </div>
  )
}
