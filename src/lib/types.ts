export interface Project {
  id: string
  title: string
  category: 'Residential' | 'Commercial' | 'Public' | 'Hospitality'
  location: string
  year: string
  area: string
  client: string
  description: string
  /** data-URL (compressed) or a path under /portfolio */
  image: string
  /** extra detail-page images */
  gallery: string[]
  services: string[]
  featured: boolean
}

export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface Sector {
  id: string
  title: string
  description: string
  image: string
}

export interface Service {
  id: string
  title: string
  description: string
  features: string[]
}

export interface ProcessStep {
  id: string
  phase: string
  title: string
  description: string
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
}

export interface PortalFeature {
  id: string
  title: string
  description: string
}

export interface SiteContent {
  brandName: string
  brandDevanagari: string
  accent: string

  hero: {
    eyebrow: string
    titleLines: string[]
    subtitle: string
    badges: string[]
    ctaPrimary: string
    ctaSecondary: string
    image: string
  }

  marquee: string[]

  about: {
    eyebrow: string
    title: string
    body: string[]
    image: string
    badge: string
    stats: Stat[]
  }

  trustedBy: string[]

  sectors: Sector[]
  services: Service[]

  quote: {
    text: string
    author: string
    image: string
  }

  process: ProcessStep[]

  portal: {
    eyebrow: string
    title: string
    body: string
    features: PortalFeature[]
  }

  testimonials: Testimonial[]

  cta: {
    eyebrow: string
    title: string
    body: string
    button: string
  }

  contact: {
    address: string
    phone: string
    whatsapp: string
    email: string
    hours: string
  }

  footer: {
    blurb: string
    instagram: string
    facebook: string
    linkedin: string
  }
}
