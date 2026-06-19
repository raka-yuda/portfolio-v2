import { ImageResponse } from 'next/og'
import { SITE } from '@/lib/site'

export const alt = SITE.name
export const size = { width: 1200, height: 630 }

async function loadFont() {
  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap',
      { next: { revalidate: false } }
    ).then((res) => res.text())
    const url = css.match(/src: url\((https:\/\/[^)]+\.woff2)\) format\('woff2'\)/)?.[1]
    if (!url) return undefined
    return fetch(url).then((res) => res.arrayBuffer())
  } catch {
    return undefined
  }
}

export default async function OpenGraphImage() {
  const fontData = await loadFont()
  const fontConfig = fontData
    ? [{ name: 'Plus Jakarta Sans', data: fontData, style: 'normal' as const, weight: 700 as const }]
    : undefined

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
          fontFamily: fontConfig ? 'Plus Jakarta Sans' : 'system-ui, -apple-system, sans-serif',
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
            {SITE.name}
          </div>
          <div
            style={{
              fontSize: 36,
              color: '#622222',
              marginTop: 16,
              fontWeight: 700,
            }}
          >
            Personal Portfolio Website
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#3F3F46',
              marginTop: 28,
              maxWidth: 780,
              lineHeight: 1.45,
            }}
          >
            {SITE.description}
          </div>
        </div>

        <div style={{ fontSize: 20, color: '#71717A', fontWeight: 400 }}>{SITE.url}</div>
      </div>
    ),
    {
      ...size,
      fonts: fontConfig,
    }
  )
}
