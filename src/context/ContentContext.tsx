import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { SiteContent, Project } from '../lib/types'
import { defaultContent, defaultProjects } from '../lib/defaultContent'
import { KEYS, readJSON, writeJSON, deepMerge } from '../lib/storage'
import { applyAccent } from '../lib/color'

interface ContentContextValue {
  content: SiteContent
  projects: Project[]
  setContent: (next: SiteContent) => void
  updateContent: (patch: Partial<SiteContent>) => void
  saveProjects: (next: Project[]) => void
  resetContent: () => void
  resetProjects: () => void
}

const ContentContext = createContext<ContentContextValue | null>(null)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<SiteContent>(() =>
    deepMerge(defaultContent, readJSON<Partial<SiteContent>>(KEYS.content, {})),
  )
  const [projects, setProjects] = useState<Project[]>(() =>
    readJSON<Project[]>(KEYS.projects, defaultProjects),
  )

  // Keep the accent CSS variables in sync with content.accent.
  useEffect(() => {
    applyAccent(content.accent || defaultContent.accent)
  }, [content.accent])

  const setContent = useCallback((next: SiteContent) => {
    setContentState(next)
    writeJSON(KEYS.content, next)
  }, [])

  const updateContent = useCallback((patch: Partial<SiteContent>) => {
    setContentState((prev) => {
      const next = { ...prev, ...patch }
      writeJSON(KEYS.content, next)
      return next
    })
  }, [])

  const saveProjects = useCallback((next: Project[]) => {
    setProjects(next)
    writeJSON(KEYS.projects, next)
  }, [])

  const resetContent = useCallback(() => {
    setContentState(defaultContent)
    writeJSON(KEYS.content, defaultContent)
  }, [])

  const resetProjects = useCallback(() => {
    setProjects(defaultProjects)
    writeJSON(KEYS.projects, defaultProjects)
  }, [])

  const value = useMemo(
    () => ({
      content,
      projects,
      setContent,
      updateContent,
      saveProjects,
      resetContent,
      resetProjects,
    }),
    [content, projects, setContent, updateContent, saveProjects, resetContent, resetProjects],
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}
