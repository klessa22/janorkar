import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { KEYS, readJSON, writeJSON, removeKey } from '../lib/storage'

// Demo credentials (Rule 2 — no real backend).
const ADMIN_EMAIL = 'admin@gmail.com'
const ADMIN_PASSWORD = 'admin'

interface AuthContextValue {
  isAuthed: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState<boolean>(() =>
    readJSON<boolean>(KEYS.auth, false),
  )

  const login = useCallback((email: string, password: string) => {
    const ok =
      email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD
    if (ok) {
      setIsAuthed(true)
      writeJSON(KEYS.auth, true)
    }
    return ok
  }, [])

  const logout = useCallback(() => {
    setIsAuthed(false)
    removeKey(KEYS.auth)
  }, [])

  const value = useMemo(() => ({ isAuthed, login, logout }), [isAuthed, login, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
