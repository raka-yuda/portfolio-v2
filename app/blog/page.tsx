import type { Metadata } from 'next'
import { getAllBlogPosts } from '@/lib/mdx'
import { BlogClient } from './BlogClient'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Writing about software, engineering, and the projects I work on.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog',
    description: 'Writing about software, engineering, and the projects I work on.',
    url: '/blog',
    images: [{ url: '/blog/opengraph-image', width: 1200, height: 630, alt: 'Blog' }],
  },
  twitter: { card: 'summary_large_image', title: 'Blog', description: 'Writing about software, engineering, and the projects I work on.' },
}

export default function BlogPage() {
  const posts = getAllBlogPosts()
  return <BlogClient posts={posts} />
}
