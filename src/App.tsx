import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { type ReactNode } from 'react'
import { ContentProvider } from './context/ContentContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import CursorFollower from './components/common/CursorFollower'
import ScrollProgress from './components/common/ScrollProgress'
import ScrollToTop from './components/common/ScrollToTop'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthed } = useAuth()
  return isAuthed ? <>{children}</> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <ContentProvider>
      <AuthProvider>
        <HashRouter>
          <ScrollProgress />
          <CursorFollower />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </ContentProvider>
  )
}
