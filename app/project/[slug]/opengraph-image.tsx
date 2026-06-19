import { ImageResponse } from 'next/og'
import { getAllProjects, getProject } from '@/lib/mdx'
import { loadOgFont, loadOgImage, ogFontConfig, OG_SIZE } from '@/lib/og'

export const alt = 'Project preview'
export const size = OG_SIZE

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }))
}

export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { project } = getProject(slug)
  const fontData = await loadOgFont()
  const imageData = project.image ? await loadOgImage(project.image) : null

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
              alt={project.title}
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
                fontSize: 120,
              }}
            >
              {project.emoji}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 52 }}>{project.emoji}</div>
            <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-0.02em' }}>
              {project.title}
            </div>
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
            {project.description}
          </div>
          <div style={{ marginTop: 'auto', fontSize: 18, color: '#9C9685' }}>
            {`ryuda.me/project/${slug}`}
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
