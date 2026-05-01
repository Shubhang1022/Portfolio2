import { projects } from '@/lib/projects'
import { notes } from '@/lib/notes'

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://web-shooter-dev.preview.emergentagent.com'
  const now = new Date()
  const staticRoutes = [
    { url: `${base}/`, lastModified: now, priority: 1.0 },
    { url: `${base}/notes`, lastModified: now, priority: 0.8 },
  ]
  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: now,
    priority: 0.7,
  }))
  const noteRoutes = notes.map((n) => ({
    url: `${base}/notes/${n.slug}`,
    lastModified: new Date(n.date),
    priority: 0.6,
  }))
  return [...staticRoutes, ...projectRoutes, ...noteRoutes]
}
