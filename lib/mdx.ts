import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { Project, BlogPost, ProjectFrontmatter, BlogFrontmatter } from '@/types'

const contentDir = path.join(process.cwd(), 'content')

// ── Error types ──────────────────────────────────────────────────────────────

export class ContentNotFoundError extends Error {
  constructor(folder: string, slug: string) {
    super(`Content not found: ${folder}/${slug}.mdx`)
    this.name = 'ContentNotFoundError'
  }
}

export class MalformedContentError extends Error {
  constructor(folder: string, slug: string, missing: string[]) {
    super(`Malformed frontmatter in ${folder}/${slug}.mdx — missing fields: ${missing.join(', ')}`)
    this.name = 'MalformedContentError'
  }
}

// ── Validation ───────────────────────────────────────────────────────────────

const PROJECT_REQUIRED: (keyof ProjectFrontmatter)[] = [
  'title', 'emoji', 'description', 'techStack', 'tags', 'publishedAt',
]
const BLOG_REQUIRED: (keyof BlogFrontmatter)[] = [
  'title', 'description', 'publishedAt', 'tags',
]

function validateFrontmatter<T extends object>(
  data: Record<string, unknown>,
  required: (keyof T)[],
  folder: string,
  slug: string,
): T {
  const missing = required.filter((k) => data[k as string] == null)
  if (missing.length > 0) throw new MalformedContentError(folder, slug, missing as string[])
  return data as T
}

// ── File helpers ─────────────────────────────────────────────────────────────

function getFileSlugs(folder: string): string[] {
  const dir = path.join(contentDir, folder)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx')).map((f) => f.replace('.mdx', ''))
}

/** Reads only frontmatter — no content string parsed. Used for list views and sitemap. */
function readMdxMeta(folder: string, slug: string) {
  const filePath = path.join(contentDir, folder, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) throw new ContentNotFoundError(folder, slug)
  const raw = fs.readFileSync(filePath, 'utf-8')
  // gray-matter excerpt: parse only frontmatter, skip body processing
  const { data, content } = matter(raw)
  // reading-time still needs content length for accuracy
  return { frontmatter: data as Record<string, unknown>, readingTime: readingTime(content).text }
}

/** Reads frontmatter + full MDX body. Used for detail pages. */
function readMdxFull(folder: string, slug: string) {
  const filePath = path.join(contentDir, folder, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) throw new ContentNotFoundError(folder, slug)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { frontmatter: data as Record<string, unknown>, content, readingTime: readingTime(content).text }
}

// ── Public interface ─────────────────────────────────────────────────────────

export function getAllProjects(): Project[] {
  return getFileSlugs('project')
    .map((slug) => {
      const { frontmatter, readingTime } = readMdxMeta('project', slug)
      const fm = validateFrontmatter<ProjectFrontmatter>(frontmatter, PROJECT_REQUIRED, 'project', slug)
      return { slug, readingTime, ...fm }
    })
    .filter((project) => project.isPublished ?? true)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getProject(slug: string): { project: Project; content: string } {
  const { frontmatter, content, readingTime } = readMdxFull('project', slug)
  const fm = validateFrontmatter<ProjectFrontmatter>(frontmatter, PROJECT_REQUIRED, 'project', slug)
  return { project: { slug, readingTime, ...fm }, content }
}

export function getAllBlogPosts(): BlogPost[] {
  return getFileSlugs('blog')
    .map((slug) => {
      const { frontmatter, readingTime } = readMdxMeta('blog', slug)
      const fm = validateFrontmatter<BlogFrontmatter>(frontmatter, BLOG_REQUIRED, 'blog', slug)
      return { slug, readingTime, ...fm }
    })
    .filter((post) => post.isPublished ?? true)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getBlogPost(slug: string): { post: BlogPost; content: string } {
  const { frontmatter, content, readingTime } = readMdxFull('blog', slug)
  const fm = validateFrontmatter<BlogFrontmatter>(frontmatter, BLOG_REQUIRED, 'blog', slug)
  return { post: { slug, readingTime, ...fm }, content }
}
