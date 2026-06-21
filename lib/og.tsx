import { readFileSync } from 'fs'
import { join } from 'path'

export const OG_SIZE = { width: 1200, height: 630 }

export async function loadOgFont(): Promise<ArrayBuffer | undefined> {
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

export async function loadOgImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { next: { revalidate: false } })
    if (!res.ok) return null
    const contentType = res.headers.get('content-type') || 'image/png'
    const buffer = await res.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')
    return `data:${contentType};base64,${base64}`
  } catch {
    return null
  }
}

export function ogFontConfig(fontData: ArrayBuffer | undefined) {
  return fontData
    ? [{ name: 'Plus Jakarta Sans', data: fontData, style: 'normal' as const, weight: 700 as const }]
    : undefined
}

export function loadFavicon(): string | null {
  try {
    const buffer = readFileSync(join(process.cwd(), 'app', 'favicon.png'))
    const base64 = Buffer.from(buffer).toString('base64')
    return `data:image/png;base64,${base64}`
  } catch {
    return null
  }
}

export function OgAvatar({
  faviconData,
  size = 68,
}: {
  faviconData: string | null
  size?: number
}) {
  const wrapperStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    background: 'radial-gradient(circle at 35% 35%, #E8D898, #B89848)',
    boxShadow:
      'inset 0 1px 0 rgba(255,255,255,0.5), 0 4px 12px rgba(60,30,0,0.35), 0 1px 3px rgba(60,30,0,0.2)',

  }

  if (!faviconData) {
    return (
      <div
        style={{
          ...wrapperStyle,
          color: '#8B2020',
          fontFamily: 'Caveat, cursive',
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: 4,
        }}
      >
        R
      </div>
    )
  }

  return (
    <div style={wrapperStyle}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={faviconData}
        alt="Raka"
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          position: 'absolute',
          // inset: 0,
          left: '-2px',
          bottom: '-2px',
          placeSelf: 'center',
        }}
      />
      {/* <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          boxShadow: '0 1px 0 rgba(255,255,255,0.5) inset',
        }}
      /> */}
    </div>
  )
}
