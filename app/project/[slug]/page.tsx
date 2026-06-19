import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageLayout } from '@/components/templates/PageLayout'
import { Divider } from '@/components/molecules/Divider'
import { Footer } from '@/components/molecules/Footer'
import { ImgPh } from '@/components/atoms/ImagePlaceholder'
import { Tag } from '@/components/atoms/Tag'
import { ProjectItem } from '@/components/molecules/ProjectItem'
import { IcoBack, IcoLink, IcoGithub } from '@/components/atoms/Icons'
import { getAllProjects, getProject } from '@/lib/mdx'
import { MdxContent } from '@/components/organisms/MdxContent'
import { SITE } from '@/lib/site'

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const { project } = getProject(slug)
    const url = `/project/${slug}`
    return {
      title: project.title,
      description: project.description,
      alternates: { canonical: url },
      openGraph: {
        type: 'article',
        title: project.title,
        description: project.description,
        url,
        tags: project.tags,
        images: [{ url: `${url}/opengraph-image`, width: 1200, height: 630, alt: project.title }],
      },
      twitter: { card: 'summary_large_image', title: project.title, description: project.description },
    }
  } catch {
    return { title: 'Project not found' }
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let project
  let content
  try {
    ({ project, content } = getProject(slug))
  } catch {
    notFound()
  }

  const others = getAllProjects().filter((p) => p.slug !== slug).slice(0, 2)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    author: { '@type': 'Person', name: SITE.fullName, url: SITE.url },
    keywords: [...project.tags, ...project.techStack].join(', '),
    url: `${SITE.url}/project/${slug}`,
    datePublished: project.publishedAt,
  }

  return (
    <PageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href="/project" className="back-btn"><IcoBack /> Projects</Link>
      <h1 className="responsive-h1" style={{ fontWeight: 600, fontSize: 34, lineHeight: '100%', marginBottom: 28, letterSpacing: '-0.01em' }}>
        {project.title} {project.emoji}
      </h1>
      <Divider />
      <ImgPh h={200} label="project screenshot" src={project.image} alt={project.title} emoji={project.emoji}/>

      <div style={{ marginTop: 40, marginBottom: 40 }}>
        <div style={{ fontWeight: 500, fontSize: 17, marginBottom: 14 }}>Description</div>
        <p style={{ fontSize: 19, lineHeight: '31px', color: 'var(--text-soft)' }}>{project.description}</p>
      </div>

      {(project.link || project.source) && (
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontWeight: 500, fontSize: 17, marginBottom: 14 }}>Links</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 16px', borderRadius: 8, textDecoration: 'none',
                  background: 'var(--accent)', color: '#fff', fontSize: 14, fontWeight: 600,
                }}
              >
                <IcoLink s={14} /> Live Preview
              </a>
            )}
            {project.source && (
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 16px', borderRadius: 8, textDecoration: 'none',
                  background: 'var(--surface-2)', color: 'var(--text-base)', fontSize: 14, fontWeight: 600,
                  border: '1px solid var(--border-soft)',
                }}
              >
                <IcoGithub s={16} /> GitHub Repository
              </a>
            )}
          </div>
        </div>
      )}

      <div style={{ marginBottom: 40 }}>
        <MdxContent source={content} />
      </div>

      {project.story && (
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontWeight: 500, fontSize: 17, marginBottom: 14 }}>Story</div>
          <p style={{ fontSize: 19, lineHeight: '31px', color: 'var(--text-soft)', whiteSpace: 'pre-line' }}>{project.story}</p>
        </div>
      )}

      <div style={{ marginBottom: 32 }}>
        <div style={{ fontWeight: 500, fontSize: 17, marginBottom: 14 }}>Tech Stack</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {project.techStack.map((s) => <Tag key={s}>{s}</Tag>)}
        </div>
      </div>

      <div style={{ marginBottom: 56 }}>
        <div style={{ fontWeight: 500, fontSize: 17, marginBottom: 14 }}>Tags</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {project.tags.map((s) => <Tag key={s}>{`#${s}`}</Tag>)}
        </div>
      </div>

      {others.length > 0 && (
        <div style={{ paddingTop: 32, borderTop: '1px solid var(--border-soft)', marginBottom: 40 }}>
          <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 24 }}>Another Projects</div>
          <div className="stagger grid-2">
            {others.map((p) => <ProjectItem key={p.slug} project={p} variant="card" />)}
          </div>
        </div>
      )}
      <Footer />
    </PageLayout>
  )
}
