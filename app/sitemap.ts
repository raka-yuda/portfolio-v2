import type { MetadataRoute } from 'next'
import { getAllProjects, getAllBlogPosts } from '@/lib/mdx'
import { SITE } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${SITE.url}/project`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ]

  const projects = getAllProjects().map((p) => ({
    url: `${SITE.url}/project/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  const posts = getAllBlogPosts().map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))

  return [...routes, ...projects, ...posts]
}
