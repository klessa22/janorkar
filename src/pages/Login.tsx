import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Mail, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useContent } from '../context/ContentContext'

export default function Login() {
  const { login } = useAuth()
  const { content } = useContent()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (login(email, password)) {
      navigate('/dashboard')
    } else {
      setError('Invalid email or password. Try admin@gmail.com / admin')
    }
  }

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-stone-950 px-6 text-white">
      <div className="noise-overlay" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[60%] w-[60%] -translate-x-1/2 rounded-full opacity-30 blur-[140px]"
        style={{ background: 'var(--color-accent)' }}
      />

      <Link to="/" className="absolute left-6 top-6 inline-flex items-center gap-2 text-sm text-stone-400 hover:text-white">
        <ArrowLeft size={16} /> Back to site
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <span className="text-4xl" style={{ fontFamily: 'var(--font-deva)', color: 'var(--color-accent)' }}>
            {content.brandDevanagari}
          </span>
          <h1 className="mt-3 font-serif text-3xl">Studio Admin</h1>
          <p className="mt-2 text-sm text-stone-400">Sign in to manage your portfolio & content</p>
        </div>

        <form onSubmit={onSubmit} className="glass-dark rounded-3xl border border-white/10 p-8">
          <label className="mb-4 block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-stone-400">Email</span>
            <div className="relative">
              <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gmail.com"
                className="w-full rounded-xl border border-white/15 bg-white/5 py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-stone-400">Password</span>
            <div className="relative">
              <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" />
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full rounded-xl border border-white/15 bg-white/5 py-3 pl-11 pr-11 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white"
              >
                {show ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </label>

          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            className="mt-6 w-full rounded-xl py-3.5 text-sm font-semibold text-stone-950 transition-transform hover:scale-[1.02]"
            style={{ background: 'var(--color-accent)' }}
          >
            Sign In
          </button>

          <p className="mt-5 rounded-lg bg-white/5 px-4 py-3 text-center text-xs text-stone-400">
            Demo credentials · <span className="text-white">admin@gmail.com</span> / <span className="text-white">admin</span>
          </p>
        </form>
      </motion.div>
    </div>
  )
}
