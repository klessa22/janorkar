import type { SiteContent, Project } from './types'

const img = (n: number | string, ext = 'webp') =>
  `${import.meta.env.BASE_URL}portfolio/project-${n}.${ext}`

export const DEFAULT_ACCENT = '#c0673a'

export const defaultContent: SiteContent = {
  brandName: "JANORKAR'S DESIGN STUDIO",
  brandDevanagari: 'जानोरकर',
  accent: DEFAULT_ACCENT,

  hero: {
    eyebrow: 'DPIIT-Recognised Architecture & Interior Practice',
    titleLines: ['Architecture', 'as a form of', 'quiet luxury'],
    subtitle:
      'We design residences, commercial landmarks and hospitality spaces where structure, light and craft are held in precise balance — from first sketch to turnkey handover.',
    badges: ['Architecture', 'Interiors', 'Turnkey Execution'],
    ctaPrimary: 'Book a Consultation',
    ctaSecondary: 'View Portfolio',
    image: img(1),
  },

  marquee: [
    'Architectural Design',
    'Luxury Interiors',
    'Turnkey Execution',
    'Custom Home Design',
    '3D Renderings',
    'Adaptive Reuse',
    'Site Master Planning',
    'Project Management',
  ],

  about: {
    eyebrow: 'The Studio',
    title: 'A design practice built on craft, restraint and rigour.',
    body: [
      "JANORKAR'S DESIGN STUDIO is an architecture and interior practice working at the intersection of bold form and lived comfort. Every project begins with the site, the light and the people who will inhabit it.",
      'From architectural design and engineering to interiors, planning approvals and on-site execution, we hold the entire journey under one roof — so the drawing and the building never drift apart.',
    ],
    image: img(2),
    badge: 'DPIIT-Recognised Studio',
    stats: [
      { value: 150, suffix: '+', label: 'Projects delivered' },
      { value: 15, suffix: '', label: 'Design awards' },
      { value: 18, suffix: '+', label: 'Years of practice' },
      { value: 12, suffix: '', label: 'Cities' },
    ],
  },

  trustedBy: [
    'Architectural Digest',
    'Vogue',
    'Elle Decor',
    'Dezeen',
    'ArchDaily',
    'Wallpaper*',
  ],

  sectors: [
    {
      id: 's1',
      title: 'Residential',
      description:
        'Private homes, villas and apartments designed around light, proportion and the rhythms of family life.',
      image: img(1),
    },
    {
      id: 's2',
      title: 'Commercial',
      description:
        'Offices, retail and mixed-use landmarks that make a brand legible in built form.',
      image: img(3),
    },
    {
      id: 's3',
      title: 'Hospitality',
      description:
        'Hotels, resorts and restaurants engineered for atmosphere, service flow and lasting impression.',
      image: img(4),
    },
  ],

  services: [
    {
      id: 'sv1',
      title: 'Architectural Planning',
      description:
        'Concept, schematic and detailed design backed by architectural engineering and code analysis.',
      features: [
        'Architectural design services',
        'Architectural engineering',
        'Building code & permit coordination',
        'Planning & zoning approvals',
      ],
    },
    {
      id: 'sv2',
      title: 'Interior Architecture',
      description:
        'Interiors conceived as architecture — material, joinery and light detailed to the millimetre.',
      features: [
        'Interior design',
        '3D architectural renderings',
        'Custom home design',
        'Material & FF&E curation',
      ],
    },
    {
      id: 'sv3',
      title: 'Turnkey Execution',
      description:
        'A single accountable team from groundbreaking to handover, on programme and on budget.',
      features: [
        'Project management',
        'Home building & renovations',
        'Adaptive reuse & restoration',
        'Site master planning',
      ],
    },
  ],

  quote: {
    text: 'We do not decorate space. We compose it — so that silence, light and structure do the talking.',
    author: 'JANORKAR’S DESIGN STUDIO',
    image: img(5),
  },

  process: [
    {
      id: 'p1',
      phase: '01',
      title: 'Discovery & Brief',
      description:
        'We listen first — to site, budget, aspiration and constraint — and translate it into a clear design brief.',
    },
    {
      id: 'p2',
      phase: '02',
      title: 'Concept & Form',
      description:
        'Massing studies, sketches and 3D renderings establish the architectural language and spatial story.',
    },
    {
      id: 'p3',
      phase: '03',
      title: 'Design Development',
      description:
        'Engineering, materials and detailing are resolved alongside planning and permit coordination.',
    },
    {
      id: 'p4',
      phase: '04',
      title: 'Documentation & Approvals',
      description:
        'Construction documents, zoning approvals and tender packages prepared for a frictionless build.',
    },
    {
      id: 'p5',
      phase: '05',
      title: 'Execution & Handover',
      description:
        'Turnkey site management through to a finished, photographed, move-in-ready space.',
    },
  ],

  portal: {
    eyebrow: 'Client Portal',
    title: 'Your project, transparent end-to-end.',
    body:
      'Every client and the studio share one source of truth — a private admin dashboard where projects, content and progress stay current.',
    features: [
      {
        id: 'f1',
        title: 'Live Project Library',
        description:
          'Add, edit and publish projects with compressed image uploads — instantly live on the site.',
      },
      {
        id: 'f2',
        title: 'Editable Site Content',
        description:
          'Every headline, stat and contact detail is editable from the dashboard. Nothing is hardcoded.',
      },
      {
        id: 'f3',
        title: 'Brand Controls',
        description:
          'Switch the accent colour and brand wording and watch the whole site update in real time.',
      },
      {
        id: 'f4',
        title: 'Zero Backend',
        description:
          'Runs entirely in the browser via localStorage — fast, private and free to host.',
      },
    ],
  },

  testimonials: [
    {
      id: 't1',
      quote:
        'They held our entire build together — design, approvals and site — without us ever chasing. The house feels inevitable, like it was always meant to stand there.',
      name: 'Aarti & Rohan Mehta',
      role: 'Private Residence, Pune',
    },
    {
      id: 't2',
      quote:
        'The studio understood our brand before we could articulate it. Our flagship store now does half our marketing just by existing.',
      name: 'Kabir Sheth',
      role: 'Retail Group, Mumbai',
    },
    {
      id: 't3',
      quote:
        'Rigorous, calm and genuinely creative. The 3D renderings were indistinguishable from the finished hotel.',
      name: 'Leela Nair',
      role: 'Boutique Hospitality',
    },
  ],

  cta: {
    eyebrow: 'Start the conversation',
    title: 'Let’s design something that outlasts the trend cycle.',
    body:
      'Tell us about your site and ambition. We’ll come back with a considered point of view — not a sales pitch.',
    button: 'Book Consultation',
  },

  contact: {
    address: '2nd Floor, Studio House, FC Road, Pune, Maharashtra 411004',
    phone: '+91 98220 00000',
    whatsapp: '919822000000',
    email: 'studio@janorkardesign.com',
    hours: 'Mon – Sat · 10:00 – 19:00',
  },

  footer: {
    blurb:
      'A DPIIT-recognised architecture and interior practice composing residences, commercial landmarks and hospitality spaces across India.',
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
  },
}

export const defaultProjects: Project[] = [
  {
    id: 'pr1',
    title: 'Cantilever House',
    category: 'Residential',
    location: 'Pune, Maharashtra',
    year: '2024',
    area: '6,400 sq ft',
    client: 'Private Client',
    description:
      'A hillside residence organised around a dramatic cantilevered living volume that reaches toward the valley. Board-formed concrete, oak and a continuous ribbon window dissolve the line between inside and landscape.',
    image: img(1),
    gallery: [img(1), img(2), img(6)],
    services: ['Architectural Design', 'Interiors', 'Turnkey Execution'],
    featured: true,
  },
  {
    id: 'pr2',
    title: 'The Copper Atrium',
    category: 'Commercial',
    location: 'Mumbai, Maharashtra',
    year: '2023',
    area: '42,000 sq ft',
    client: 'Sheth Group',
    description:
      'A corporate headquarters built around a full-height copper-clad atrium that draws daylight deep into the floorplate and gives the brand a singular, photographable heart.',
    image: img(3),
    gallery: [img(3), img(5), img(2)],
    services: ['Architectural Engineering', 'Project Management'],
    featured: true,
  },
  {
    id: 'pr3',
    title: 'Verandah Resort',
    category: 'Hospitality',
    location: 'Alibaug',
    year: '2023',
    area: '88,000 sq ft',
    client: 'Leela Hospitality',
    description:
      'Thirty keys arranged as a village of pavilions beneath deep verandahs, where laterite, lime plaster and water choreograph a slow, coastal sense of arrival.',
    image: img(4),
    gallery: [img(4), img(1), img(5)],
    services: ['Master Planning', 'Architecture', 'Interiors'],
    featured: true,
  },
  {
    id: 'pr4',
    title: 'Civic Reading Room',
    category: 'Public',
    location: 'Nagpur',
    year: '2022',
    area: '24,000 sq ft',
    client: 'Municipal Trust',
    description:
      'An adaptive reuse of a heritage warehouse into a public library, retaining the original timber trusses while inserting a calm, top-lit reading hall.',
    image: img(6),
    gallery: [img(6), img(2), img(3)],
    services: ['Adaptive Reuse', 'Restoration', 'Interiors'],
    featured: false,
  },
  {
    id: 'pr5',
    title: 'Courtyard Apartments',
    category: 'Residential',
    location: 'Pune, Maharashtra',
    year: '2022',
    area: '54,000 sq ft',
    client: 'Developer Confidential',
    description:
      'Forty homes wrapped around a shared green courtyard, each apartment cross-ventilated and daylit, with deep balconies that act as outdoor rooms.',
    image: img(2),
    gallery: [img(2), img(4), img(1)],
    services: ['Architecture', 'Planning Approvals'],
    featured: false,
  },
  {
    id: 'pr6',
    title: 'The Glass Pavilion',
    category: 'Hospitality',
    location: 'Lonavala',
    year: '2024',
    area: '12,000 sq ft',
    client: 'Private Restaurateur',
    description:
      'A fine-dining pavilion of structural glass and slender steel set within a reflecting pool, engineered to all but disappear into the monsoon landscape.',
    image: img(5),
    gallery: [img(5), img(3), img(6)],
    services: ['Architecture', 'Structural Glazing', 'Interiors'],
    featured: true,
  },
]
