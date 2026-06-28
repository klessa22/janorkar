import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 👉 Change this to match your GitHub repository name for project-pages deploys.
//    e.g. https://<user>.github.io/JANORKAR/  ->  BASE = '/JANORKAR/'
const BASE = '/JANORKAR/'

// In dev, redirect a bare "/" to the base path so the app loads at the same
// URL shape it will have on GitHub Pages.
function devRedirectPlugin(base: string): PluginOption {
  return {
    name: 'dev-base-redirect',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req as { url?: string }).url
        if (url === '/' || url === '/index.html') {
          res.statusCode = 302
          res.setHeader('Location', base)
          res.end()
          return
        }
        next()
      })
    },
  }
}

export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss(), devRedirectPlugin(BASE)],
})
