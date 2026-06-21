import type { Metadata } from 'next'
import { PageLayout } from '@/components/templates/PageLayout'
import { HomeAvatar } from '@/components/molecules/HomeAvatar'
import { LinksCard } from '@/components/molecules/LinksCard'
import { Footer } from '@/components/molecules/Footer'
import { IcoFile, IcoGithub, IcoMail, IcoInstagram, IcoGlobe } from '@/components/atoms/Icons'
import { getAllProjects } from '@/lib/mdx'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Links',
  description: 'Projects, socials, and other links from Raka.',
  alternates: { canonical: '/links' },
  openGraph: {
    type: 'website',
    title: 'Links — Raka',
    description: 'Projects, socials, and other links from Raka.',
    url: `${SITE.url}/links`,
    images: [{ url: '/links/opengraph-image', width: 1200, height: 630, alt: 'Links — Raka' }],
  },
  twitter: { card: 'summary_large_image', title: 'Links — Raka', description: 'Projects, socials, and other links from Raka.' },
}

export default function LinksPage() {
  const projects = getAllProjects().slice(0, 2)

  return (
    <PageLayout className="links-page">
      <div style={{ maxWidth: 420, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 40, marginTop: 24 }}>
          <HomeAvatar />
          <h1 style={{ fontWeight: 700, fontSize: 24, marginTop: 18, letterSpacing: '-0.02em' }}>Raka</h1>
          <p style={{ fontSize: 15, color: 'var(--text-soft)', marginTop: 6, lineHeight: '24px' }}>
            Software engineer who builds things for the web and writes about the journey.
          </p>
        </div>

        <section style={{ marginBottom: 40 }}>
          <div style={{ fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-soft)', marginBottom: 16, textAlign: 'left' }}>Projects</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {projects.map((project) => (
              <LinksCard
                key={project.slug}
                href={`/project/${project.slug}`}
                icon={<span style={{ fontSize: 26 }}>{project.emoji}</span>}
                title={project.title}
                description={project.description}
              />
            ))}
            <LinksCard
              href="/"
              icon={<span style={{ fontSize: 26 }}>→</span>}
              title="More on homepage"
              description="All projects and writings"
            />
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <div style={{ fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-soft)', marginBottom: 16, textAlign: 'left' }}>Find Me</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <LinksCard href="/blog" icon={<IcoFile s={26} />} title="Blog" description="Writings and lessons learned" />
            <LinksCard href={SITE.links.github} external icon={<IcoGithub s={26} />} title="GitHub" description="Code and side experiments" />
            <LinksCard href={`mailto:${SITE.email}`} icon={<IcoMail s={26} />} title="Email" description={SITE.email} />
          </div>
        </section>

        <section style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-soft)', marginBottom: 16, textAlign: 'left' }}>Others</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {SITE.links.instagram && (
              <LinksCard href={SITE.links.instagram || '#'} external icon={<IcoInstagram s={26} />} title="Instagram" />
            )}
            {SITE.links.shutterstock && (
              <LinksCard href={SITE.links.shutterstock || '#'} external icon={<IcoGlobe s={26} />} title="Shutterstock" />
            )}
            {SITE.links.pexels && (
              <LinksCard href={SITE.links.pexels || '#'} external icon={<IcoGlobe s={26} />} title="Pexels" />
            )}
          </div>
        </section>

        <Footer />
      </div>
    </PageLayout>
  )
}
