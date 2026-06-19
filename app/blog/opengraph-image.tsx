import { ImageResponse } from 'next/og'
import { loadOgFont, ogFontConfig, OG_SIZE } from '@/lib/og'

export const alt = 'Blog'
export const size = OG_SIZE

export default async function BlogOpenGraphImage() {
  const fontData = await loadOgFont()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          background: '#FAF6E9',
          color: '#18181B',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: '#18181B',
              color: '#FAF6E9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            R
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            Blog
          </div>
          <div
            style={{
              fontSize: 30,
              color: '#3F3F46',
              marginTop: 24,
              maxWidth: 780,
              lineHeight: 1.45,
            }}
          >
            Writing about software, engineering, and the projects I work on.
          </div>
        </div>

        <div style={{ fontSize: 20, color: '#71717A' }}>ryuda.me/blog</div>
      </div>
    ),
    {
      ...size,
      fonts: ogFontConfig(fontData),
    }
  )
}
