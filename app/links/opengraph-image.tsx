import { ImageResponse } from 'next/og'
import { loadFavicon, loadOgFont, OgAvatar, ogFontConfig, OG_SIZE } from '@/lib/og'

export const alt = 'Links'
export const size = OG_SIZE

export default async function LinksOpenGraphImage() {
  const fontData = await loadOgFont()
  const faviconData = loadFavicon()

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
          <OgAvatar faviconData={faviconData} />
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
            Links
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
            Projects, socials, and other links from Raka.
          </div>
        </div>

        <div style={{ fontSize: 20, color: '#71717A' }}>ryuda.me/links</div>
      </div>
    ),
    {
      ...size,
      fonts: ogFontConfig(fontData),
    }
  )
}
