import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutGrid, FileText, ExternalLink, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useContent } from '../context/ContentContext'
import ProjectsTab from '../components/dashboard/ProjectsTab'
import ContentTab from '../components/dashboard/ContentTab'

type Tab = 'projects' | 'content'

export default function Dashboard() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { content } = useContent()
  const [tab, setTab] = useState<Tab>('projects')

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl" style={{ fontFamily: 'var(--font-deva)', color: 'var(--color-accent)' }}>
              {content.brandDevanagari}
            </span>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-stone-900">Studio Admin</p>
              <p className="text-xs text-stone-500">{content.brandName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-medium hover:bg-stone-50"
            >
              <ExternalLink size={15} /> View Site
            </button>
            <button
              onClick={() => {
                logout()
                navigate('/')
              }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white"
              style={{ background: 'var(--color-ink)' }}
            >
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        {/* Tabs */}
        <div className="mb-8 inline-flex rounded-full border border-stone-200 bg-white p-1">
          <TabButton active={tab === 'projects'} onClick={() => setTab('projects')} Icon={LayoutGrid}>
            Projects
          </TabButton>
          <TabButton active={tab === 'content'} onClick={() => setTab('content')} Icon={FileText}>
            Site Content
          </TabButton>
        </div>

        {tab === 'projects' ? <ProjectsTab /> : <ContentTab />}
      </div>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  Icon,
  children,
}: {
  active: boolean
  onClick: () => void
  Icon: typeof LayoutGrid
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
      style={active ? { background: 'var(--color-accent)', color: '#fff' } : { color: '#57534e' }}
    >
      <Icon size={16} /> {children}
    </button>
  )
}
