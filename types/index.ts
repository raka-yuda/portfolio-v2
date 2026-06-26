export interface ProjectFrontmatter {
  title: string
  emoji: string
  description: string
  story: string
  techStack: string[]
  tags: string[]
  link?: string
  source?: string
  image: string
  blurhash?: string
  featured: boolean
  publishedAt: string
  isPublished: boolean
}

export interface Project extends ProjectFrontmatter {
  slug: string
  readingTime: string
}

export interface BlogFrontmatter {
  title: string
  description: string
  publishedAt: string
  tags: string[]
  image: string
  blurhash?: string
  featured: boolean
  isPublished: boolean
}

export interface BlogPost extends BlogFrontmatter {
  slug: string
  readingTime: string
}

export interface TocItem {
  id: string
  text: string
  level: number
}
