import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Calendar, Ruler, User, ArrowRight } from 'lucide-react'
import { useContent } from '../context/ContentContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { projects } = useContent()
  const project = projects.find((p) => p.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="grid min-h-[70vh] place-items-center px-6 text-center">
          <div>
            <h1 className="font-serif text-4xl text-stone-900">Project not found</h1>
            <p className="mt-3 text-stone-500">It may have been moved or deleted.</p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
              style={{ background: 'var(--color-ink)' }}
            >
              <ArrowLeft size={16} /> Back home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const related = projects.filter((p) => p.id !== project.id && p.category === project.category).slice(0, 3)
  const meta = [
    { Icon: MapPin, label: 'Location', value: project.location },
    { Icon: Calendar, label: 'Year', value: project.year },
    { Icon: Ruler, label: 'Area', value: project.area },
    { Icon: User, label: 'Client', value: project.client },
  ]

  return (
    <>
      <Navbar />
      <article className="pt-28">
        {/* Hero */}
        <div className="mx-auto max-w-7xl px-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-stone-900"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--color-accent)' }}>
            {project.category}
          </p>
          <h1 className="max-w-4xl font-serif text-4xl leading-tight text-stone-950 sm:text-6xl">{project.title}</h1>
        </div>

        <div className="mx-auto mt-10 max-w-7xl px-6">
          <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-stone-200">
            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto mt-14 grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="font-serif text-2xl text-stone-900">About the project</h2>
            <p className="mt-4 text-lg leading-relaxed text-stone-600">{project.description}</p>

            {project.services.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400">Scope of work</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.services.map((s) => (
                    <span key={s} className="rounded-full border border-stone-300 px-4 py-1.5 text-sm text-stone-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-6">
            <h3 className="mb-4 font-serif text-xl text-stone-900">Project facts</h3>
            <dl className="space-y-4">
              {meta.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon size={18} className="mt-0.5" style={{ color: 'var(--color-accent)' }} />
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-stone-400">{label}</dt>
                    <dd className="text-stone-800">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        {/* Gallery */}
        {project.gallery.length > 0 && (
          <div className="mx-auto mt-16 max-w-7xl px-6">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((g, i) => (
                <div key={i} className="aspect-[4/3] overflow-hidden rounded-xl bg-stone-200">
                  <img src={g} alt={`${project.title} ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mx-auto mt-20 max-w-7xl px-6">
            <h2 className="mb-8 font-serif text-3xl text-stone-900">More {project.category} work</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link key={p.id} to={`/projects/${p.id}`} className="group">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl bg-stone-200">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="mt-3 flex items-center justify-between font-serif text-xl text-stone-900">
                    {p.title}
                    <ArrowRight size={18} className="opacity-0 transition-opacity group-hover:opacity-100" />
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="py-20" />
      </article>
      <Footer />
    </>
  )
}
