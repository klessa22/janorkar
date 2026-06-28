import { useMemo, useRef, useState } from 'react'
import { Plus, Pencil, Trash2, Search, X, Upload, Star, ImageIcon } from 'lucide-react'
import { useContent } from '../../context/ContentContext'
import { compressImage } from '../../lib/image'
import type { Project } from '../../lib/types'

const CATEGORIES: Project['category'][] = ['Residential', 'Commercial', 'Public', 'Hospitality']

const blank = (): Project => ({
  id: `pr_${Date.now()}_${Math.floor(Math.random() * 1e4)}`,
  title: '',
  category: 'Residential',
  location: '',
  year: String(new Date().getFullYear()),
  area: '',
  client: '',
  description: '',
  image: '',
  gallery: [],
  services: [],
  featured: false,
})

export default function ProjectsTab() {
  const { projects, saveProjects } = useContent()
  const [editing, setEditing] = useState<Project | null>(null)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'All' | Project['category']>('All')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter(
      (p) =>
        (filter === 'All' || p.category === filter) &&
        (!q || p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)),
    )
  }, [projects, query, filter])

  const remove = (id: string) => {
    if (confirm('Delete this project? This cannot be undone.')) {
      saveProjects(projects.filter((p) => p.id !== id))
    }
  }

  const onSave = (proj: Project) => {
    const exists = projects.some((p) => p.id === proj.id)
    saveProjects(exists ? projects.map((p) => (p.id === proj.id ? proj : p)) : [proj, ...projects])
    setEditing(null)
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl text-stone-900">Projects</h2>
          <p className="text-sm text-stone-500">{projects.length} total · stored locally in your browser</p>
        </div>
        <button
          onClick={() => setEditing(blank())}
          className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
          style={{ background: 'var(--color-accent)' }}
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            className="w-full rounded-lg border border-stone-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-stone-900"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-stone-900"
        >
          <option value="All">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-xl border border-stone-200 bg-white">
            <div className="relative aspect-[4/3] bg-stone-100">
              {p.image ? (
                <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full place-items-center text-stone-300">
                  <ImageIcon size={32} />
                </div>
              )}
              {p.featured && (
                <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-stone-950/80 px-2 py-1 text-[0.65rem] font-medium text-white">
                  <Star size={11} fill="currentColor" /> Featured
                </span>
              )}
            </div>
            <div className="p-4">
              <p className="text-xs uppercase tracking-wider text-stone-400">{p.category}</p>
              <h3 className="font-serif text-lg text-stone-900">{p.title || 'Untitled'}</h3>
              <p className="text-sm text-stone-500">{p.location}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setEditing(p)}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-stone-300 py-2 text-sm font-medium hover:bg-stone-50"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  onClick={() => remove(p.id)}
                  className="inline-flex items-center justify-center rounded-lg border border-stone-300 px-3 py-2 text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {visible.length === 0 && (
          <p className="col-span-full py-16 text-center text-stone-400">No projects yet — add your first one.</p>
        )}
      </div>

      {editing && <ProjectEditor initial={editing} onClose={() => setEditing(null)} onSave={onSave} />}
    </div>
  )
}

function ProjectEditor({
  initial,
  onClose,
  onSave,
}: {
  initial: Project
  onClose: () => void
  onSave: (p: Project) => void
}) {
  const [proj, setProj] = useState<Project>(initial)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const mainInput = useRef<HTMLInputElement>(null)
  const galleryInput = useRef<HTMLInputElement>(null)

  const set = <K extends keyof Project>(k: K, v: Project[K]) => setProj((p) => ({ ...p, [k]: v }))

  const handleMain = async (file?: File) => {
    if (!file) return
    setBusy(true)
    setErr('')
    try {
      set('image', await compressImage(file))
    } catch {
      setErr('Could not process that image.')
    } finally {
      setBusy(false)
    }
  }

  const handleGallery = async (files: FileList | null) => {
    if (!files?.length) return
    setBusy(true)
    setErr('')
    try {
      const compressed = await Promise.all(Array.from(files).slice(0, 6).map((f) => compressImage(f)))
      set('gallery', [...proj.gallery, ...compressed].slice(0, 8))
    } catch {
      setErr('One or more gallery images failed.')
    } finally {
      setBusy(false)
    }
  }

  const save = () => {
    if (!proj.title.trim()) {
      setErr('Title is required.')
      return
    }
    onSave(proj)
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-stone-950/60 p-4 backdrop-blur-sm">
      <div className="my-8 w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between rounded-t-2xl border-b border-stone-200 bg-white px-6 py-4">
          <h3 className="font-serif text-xl text-stone-900">
            {initial.title ? 'Edit project' : 'New project'}
          </h3>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full hover:bg-stone-100">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          {/* Main image */}
          <div>
            <Label>Cover image</Label>
            <div className="flex items-center gap-4">
              <div className="grid h-24 w-32 shrink-0 place-items-center overflow-hidden rounded-lg border border-dashed border-stone-300 bg-stone-50">
                {proj.image ? (
                  <img src={proj.image} alt="" className="h-full w-full object-cover" />
                ) : (
                  <ImageIcon size={24} className="text-stone-300" />
                )}
              </div>
              <div>
                <input
                  ref={mainInput}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleMain(e.target.files?.[0])}
                />
                <button
                  onClick={() => mainInput.current?.click()}
                  className="inline-flex items-center gap-2 rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium hover:bg-stone-50"
                >
                  <Upload size={15} /> Upload
                </button>
                <p className="mt-1.5 text-xs text-stone-400">Auto-compressed to 800px JPEG.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Title" value={proj.title} onChange={(v) => set('title', v)} />
            <div>
              <Label>Category</Label>
              <select
                value={proj.category}
                onChange={(e) => set('category', e.target.value as Project['category'])}
                className={field}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <Input label="Location" value={proj.location} onChange={(v) => set('location', v)} />
            <Input label="Year" value={proj.year} onChange={(v) => set('year', v)} />
            <Input label="Area" value={proj.area} onChange={(v) => set('area', v)} placeholder="6,400 sq ft" />
            <Input label="Client" value={proj.client} onChange={(v) => set('client', v)} />
          </div>

          <div>
            <Label>Description</Label>
            <textarea
              value={proj.description}
              onChange={(e) => set('description', e.target.value)}
              className={`${field} min-h-28 resize-none`}
            />
          </div>

          <Input
            label="Services (comma separated)"
            value={proj.services.join(', ')}
            onChange={(v) => set('services', v.split(',').map((s) => s.trim()).filter(Boolean))}
          />

          {/* Gallery */}
          <div>
            <Label>Gallery images</Label>
            <div className="flex flex-wrap gap-2">
              {proj.gallery.map((g, i) => (
                <div key={i} className="relative h-16 w-20 overflow-hidden rounded-lg border border-stone-200">
                  <img src={g} alt="" className="h-full w-full object-cover" />
                  <button
                    onClick={() => set('gallery', proj.gallery.filter((_, idx) => idx !== i))}
                    className="absolute right-0.5 top-0.5 grid h-5 w-5 place-items-center rounded-full bg-stone-950/70 text-white"
                  >
                    <X size={11} />
                  </button>
                </div>
              ))}
              <input ref={galleryInput} type="file" accept="image/*" multiple hidden onChange={(e) => handleGallery(e.target.files)} />
              <button
                onClick={() => galleryInput.current?.click()}
                className="grid h-16 w-20 place-items-center rounded-lg border border-dashed border-stone-300 text-stone-400 hover:bg-stone-50"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={proj.featured}
              onChange={(e) => set('featured', e.target.checked)}
              className="h-4 w-4 accent-[var(--color-accent)]"
            />
            <span className="text-sm text-stone-700">Mark as featured</span>
          </label>

          {err && <p className="text-sm text-red-600">{err}</p>}
        </div>

        <div className="sticky bottom-0 flex justify-end gap-3 rounded-b-2xl border-t border-stone-200 bg-white px-6 py-4">
          <button onClick={onClose} className="rounded-lg border border-stone-300 px-5 py-2.5 text-sm font-medium hover:bg-stone-50">
            Cancel
          </button>
          <button
            onClick={save}
            disabled={busy}
            className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            style={{ background: 'var(--color-ink)' }}
          >
            {busy ? 'Processing…' : 'Save project'}
          </button>
        </div>
      </div>
    </div>
  )
}

const field =
  'w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-stone-900'

function Label({ children }: { children: React.ReactNode }) {
  return <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-stone-500">{children}</span>
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={field} />
    </label>
  )
}
