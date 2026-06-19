import Link from 'next/link'
import { ProjectItem } from '@/components/molecules/ProjectItem'
import { BlogItem } from '@/components/molecules/BlogItem'
import { Footer } from '@/components/molecules/Footer'
import { PageLayout } from '@/components/templates/PageLayout'
import { IcoDl, IcoMail, IcoLinkedin, IcoGithub, IcoLeetcode, IcoHackerrank } from '@/components/atoms/Icons'
import { getAllProjects, getAllBlogPosts } from '@/lib/mdx'


export default function HomePage() {
  const projects = getAllProjects().slice(0, 4)
  const posts = getAllBlogPosts().slice(0, 4)

  const socials = [
    { Icon: IcoMail, label: 'Mail', href: 'mailto:raka.yuda.pradipta@gmail.com' },
    { Icon: IcoLinkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/raka-yuda-pradipta/' },
    { Icon: IcoGithub, label: 'GitHub', href: 'https://github.com/raka-yuda' },
    { Icon: IcoLeetcode, label: 'LeetCode', href: 'https://leetcode.com/ryuda' },
    { Icon: IcoHackerrank, label: 'HackerRank', href: 'https://hackerrank.com/ryuda' },
  ]

  return (
    <PageLayout>
      {/* Profile */}
      <div className="home-avatar-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div className="home-avatar-wrap" style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          <div
            className="neu-avatar home-avatar"
            style={{
              width: 68,
              height: 68,
              borderRadius: '50%',
              flexShrink: 0,
              background:
                'linear-gradient(135deg, var(--placeholder-grad-1) 0%, var(--placeholder-grad-2) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-caveat)',
              fontSize: 30,
              color: 'var(--accent)',
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)',
            }}
          >
            R
          </div>
          <div>
            <div className="home-name" style={{ fontWeight: 600, fontSize: 22, lineHeight: '100%', letterSpacing: '-0.01em' }}>Raka <span className="home-name__last opacity-50" style={{ color: 'var(--text-soft)' }}>Yuda Pradipta</span></div> 
            <div className="home-role" style={{ fontSize: 15, color: 'var(--text-soft)', marginTop: 6 }}>Software Engineer</div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <p style={{ fontSize: 16, lineHeight: '26px', color: 'var(--text-body)', marginBottom: 12 }}>
        Software Engineer who believed in user centric development and programming language agnostic.
      </p>
      <p style={{ fontSize: 15, lineHeight: '26px', color: 'var(--text-soft)', marginBottom: 32 }}>
        Been in these field for several years and kinda have a love and hate relationship with software engineer until i found and make this thing the half part of my life. The part of finding this field is in the middle of creativity and logical thinking make me start to pursuing it off.
      </p>

      {/* CTA band */}
      <div
        className="neu-cta"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px',
          border: '1px solid var(--accent)',
          borderRadius: 6,
          marginBottom: 56,
          background: 'linear-gradient(180deg, rgba(98,34,34,0.02), rgba(98,34,34,0.04))',
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-soft)' }}>To get to know me well</span>
        <a
          href="https://drive.google.com/file/d/1a9YjYOATrxUrF92H3NLBVeja2GIy9s5K/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '9px 16px',
            background: 'var(--accent)',
            color: '#fff',
            textDecoration: 'none',
            fontFamily: 'inherit',
            fontSize: 14,
            fontWeight: 600,
            borderRadius: 4,
            letterSpacing: '0.01em',
            boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
        >
          <IcoDl /> CV
        </a>
      </div>

      {/* Personal Projects */}
      <section style={{ marginBottom: 56 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 22 }}>
          <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-0.005em' }}>Personal Projects</span>
          <Link href="/project" className="more-link">
            <span className="more-link__text">More</span>
            <span className="more-link__plus">+</span>
          </Link>
        </div>
        <div className="stagger grid-2">
          {projects.map((p) => <ProjectItem key={p.slug} project={p} variant="card" />)}
        </div>
      </section>

      {/* Blog */}
      <section style={{ marginBottom: 56 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 22 }}>
          <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-0.005em' }}>Blog</span>
          <Link href="/blog" className="more-link">
            <span className="more-link__text">More</span>
            <span className="more-link__plus">+</span>
          </Link>
        </div>
        <div className="stagger grid-2">
          {posts.map((p) => <BlogItem key={p.slug} post={p} variant="card" />)}
        </div>
      </section>

      {/* Let's Connect */}
      <section style={{ marginBottom: 56 }}>
        <span style={{ fontWeight: 700, fontSize: 17, display: 'block', marginBottom: 18, letterSpacing: '-0.005em' }}>
          Let&apos;s Connect
        </span>
        <div className="connect-grid">
          {socials.map(({ Icon, label, href }) => {
            const isEmail = href.startsWith('mailto:')
            return (
              <a
                key={label}
                href={href}
                target={isEmail ? undefined : '_blank'}
                rel={isEmail ? undefined : 'noopener noreferrer'}
                aria-label={label}
                className="connect-icon connect-tile"
                style={{
                  background: 'linear-gradient(135deg, var(--surface-1) 0%, var(--surface-2) 100%)',
                  border: '1px solid var(--border-soft)',
                  borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none',
                  color: 'var(--accent)',
                }}
              >
                <Icon s={28} />
              </a>
            )
          })}
        </div>
      </section>

      <Footer />
    </PageLayout>
  )
}
