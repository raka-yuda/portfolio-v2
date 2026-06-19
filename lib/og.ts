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
