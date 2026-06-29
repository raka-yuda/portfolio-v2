import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageLayout } from '@/components/templates/PageLayout'
import { TableOfContents } from '@/components/organisms/TableOfContents'
import { AuthorRow } from '@/components/molecules/AuthorRow'
import { Footer } from '@/components/molecules/Footer'
import { BlogItem } from '@/components/molecules/BlogItem'
import { MdxContent } from '@/components/organisms/MdxContent'
import { ImgPh } from '@/components/atoms/ImagePlaceholder'
import { IcoBack } from '@/components/atoms/Icons'
import { getAllBlogPosts, getBlogPost } from '@/lib/mdx'
import { extractToc } from '@/lib/toc'
import { formatDate } from '@/lib/utils'
import { SITE } from '@/lib/site'

export async function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const { post } = getBlogPost(slug)
    const url = `/blog/${slug}`
    return {
      title: post.title,
      description: post.description,
      alternates: { canonical: url },
      openGraph: {
        type: 'article',
        title: post.title,
        description: post.description,
        url,
        publishedTime: post.publishedAt,
        authors: [SITE.fullName],
        tags: post.tags,
        images: [{ url: `${url}/opengraph-image`, width: 1200, height: 630, alt: post.title }],
      },
      twitter: { card: 'summary_large_image', title: post.title, description: post.description },
    }
  } catch {
    return { title: 'Post not found' }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let post, content
  try {
    ;({ post, content } = getBlogPost(slug))
  } catch {
    notFound()
  }

  const toc = extractToc(content)
  const others = getAllBlogPosts().filter((p) => p.slug !== slug).slice(0, 2)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: { '@type': 'Person', name: SITE.fullName, url: SITE.url },
    publisher: { '@type': 'Person', name: SITE.fullName },
    datePublished: post.publishedAt,
    keywords: post.tags.join(', '),
    mainEntityOfPage: `${SITE.url}/blog/${slug}`,
    url: `${SITE.url}/blog/${slug}`,
  }

  return (
    <PageLayout fade>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Link href="/blog" className="back-btn"><IcoBack /> Blogs</Link>
      <h1 className="responsive-h1" style={{ fontWeight: 600, fontSize: 30, lineHeight: '136%', marginBottom: 0, letterSpacing: '-0.01em' }}>
        {post.title}
      </h1>
      <AuthorRow date={formatDate(post.publishedAt)} readTime={post.readingTime} />
      <ImgPh h={200} label="article image" src={post.image} blurhash={post.blurhash} sizes="(max-width: 680px) 100vw, 680px" />

      <div style={{ position: 'relative', marginTop: 40 }}>
        <TableOfContents items={toc} />
        <MdxContent source={content} />

        {others.length > 0 && (
          <div style={{ paddingTop: 40, marginTop: 48, borderTop: '1px solid var(--border-soft)', marginBottom: 40 }}>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 24 }}>Another Story</div>
            <div className="stagger grid-2">
              {others.map((p) => <BlogItem key={p.slug} post={p} variant="card" />)}
            </div>
          </div>
        )}
        <Footer />
      </div>
    </PageLayout>
  )
}
