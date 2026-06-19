import { ImageResponse } from 'next/og'
import { getAllBlogPosts, getBlogPost } from '@/lib/mdx'
import { SITE } from '@/lib/site'
import { loadOgFont, loadOgImage, ogFontConfig, OG_SIZE } from '@/lib/og'

export const alt = 'Blog post preview'
export const size = OG_SIZE

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }))
}

export default async function BlogOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { post } = getBlogPost(slug)
  const fontData = await loadOgFont()
  const imageData = post.image ? await loadOgImage(post.image) : null

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#FAF6E9',
        }}
      >
        <div style={{ flex: 1.65, display: 'flex', position: 'relative' }}>
          {imageData ? (
            <img
              src={imageData}
              alt={post.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#EFEAD8',
                color: '#622222',
                fontSize: 80,
                fontWeight: 700,
              }}
            >
              {SITE.name}
            </div>
          )}
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: 48,
            background: '#1A1814',
            color: '#FAF6E9',
          }}
        >
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            {post.title}
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#C9C2AE',
              marginTop: 16,
              lineHeight: 1.45,
              maxWidth: 900,
            }}
          >
            {post.description}
          </div>
          <div style={{ marginTop: 'auto', fontSize: 18, color: '#9C9685' }}>
            {`ryuda.me/blog/${slug}`}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: ogFontConfig(fontData),
    }
  )
}
