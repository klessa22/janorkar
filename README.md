# JANORKAR'S DESIGN STUDIO — Portfolio

A premium, editorial architect portfolio built with **React 19 + Vite + TypeScript + Tailwind v4 + GSAP + Three.js**, with a built-in, no-backend admin dashboard.

## Quick start

```bash
npm install
npm run dev      # serves at http://localhost:5173/JANORKAR/
npm run build    # type-checks + builds to ./dist
npm run preview  # preview the production build
```

Opening `http://localhost:5173/` redirects to the base path automatically.

## Admin dashboard

- **Login:** `/#/login` → `admin@gmail.com` / `admin`
- **Dashboard:** `/#/dashboard` (protected)
  - **Projects tab** — add / edit / delete projects. Image uploads are canvas-compressed to 800px JPEG (q0.7) so they fit in `localStorage`.
  - **Site Content tab** — edit *every* piece of copy (hero, about, stats, sectors, services, process, testimonials, CTA, contact, footer), the brand name/Devanagari mark, the marquee, and the **accent colour**. Edits save instantly and appear live on the homepage.

All data lives in `localStorage` (keys `jds_content_v1`, `jds_projects_v1`, `jds_auth_v1`). Nothing is hardcoded in the page — defaults live in `src/lib/defaultContent.ts`.

## Routing

`HashRouter` (GitHub-Pages safe): `/` · `/projects/:id` · `/login` · `/dashboard`.

## Deploying to GitHub Pages

1. Push to a repo and set the repo name in **`vite.config.ts`** → `BASE` (currently `/JANORKAR/`).
2. In the repo: **Settings → Pages → Source → GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and deploys `./dist`.

## Performance notes

- The Three.js hero is **lazy-loaded and desktop-only** (`useIsMobile`); mobile gets a CSS gradient. It builds into a separate `Scene3D` chunk so it never loads on phones.
- Cursor follower attaches **no** mousemove listeners on touch devices.
- All `gsap.from(...scrollTrigger)` use `immediateRender: false`; `ScrollTrigger.config({ ignoreMobileResize: true })`.
- `prefers-reduced-motion` short-circuits all GSAP animations.
- Images use `loading="lazy"`; canvas DPR capped at `[1, 1.5]`.
