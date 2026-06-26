'use client'

import Link from 'next/link'
import { ImgPh } from '@/components/atoms/ImagePlaceholder'
import { formatDate } from '@/lib/utils'
import { track } from '@/lib/analytics'
import type { BlogPost } from '@/types'

interface BlogItemProps {
  post: BlogPost
  variant: 'card' | 'row'
}

function initials(title: string) {
  return title.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card-lift"
      style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit', minHeight: 280 }}
      onClick={() => track('blog_click', { slug: post.slug, title: post.title })}
    >
      <div className="card-img">
        <ImgPh h={148} src={post.image} alt={post.title} label={initials(post.title)} blurhash={post.blurhash} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 16, gap: 12 }}>
        <div className="flex flex-col gap-2">
          <div style={{ fontWeight: 600, fontSize: 17, lineHeight: '130%' }}>{post.title}</div>
          <div className="line-clamp-3" style={{ fontSize: 14, lineHeight: '22px', color: 'var(--text-soft)' }}>{post.description}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, color: 'var(--text-soft)' }}>{formatDate(post.publishedAt)}</span>
          <span style={{ fontSize: 13, color: 'var(--text-soft)' }}>{post.readingTime}</span>
        </div>
      </div>
    </Link>
  )
}

function BlogRow({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="row-item"
      style={{ padding: '24px 4px', display: 'block', textDecoration: 'none', color: 'inherit' }}
      onClick={() => track('blog_click', { slug: post.slug, title: post.title })}
    >
      <div className="row-stack">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 500, fontSize: 20, lineHeight: '135%', marginBottom: 12 }}>{post.title}</div>
          <div style={{ fontSize: 15, lineHeight: '23px', color: 'var(--text-soft)', marginBottom: 14 }}>{post.description}</div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: 'var(--text-soft)' }}>{formatDate(post.publishedAt)}</span>
            <span style={{ fontSize: 13, color: 'var(--border-soft)' }}>•</span>
            <span style={{ fontSize: 13, color: 'var(--text-soft)' }}>{post.readingTime}</span>
          </div>
        </div>
        <div className="row-thumb">
          <ImgPh h={112} src={post.image} alt={post.title} label={initials(post.title)} blurhash={post.blurhash} />
        </div>
      </div>
    </Link>
  )
}

export function BlogItem({ post, variant }: BlogItemProps) {
  return variant === 'card' ? <BlogCard post={post} /> : <BlogRow post={post} />
}
