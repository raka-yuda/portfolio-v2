'use client'

import Link from 'next/link'
import { ImgPh } from '@/components/atoms/ImagePlaceholder'
import { IcoLink, IcoGithub } from '@/components/atoms/Icons'
import { track } from '@/lib/analytics'
import type { Project } from '@/types'

interface ProjectItemProps {
  project: Project
  variant: 'card' | 'row'
}

const actionBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 12px',
  borderRadius: 6, background: 'var(--tag-bg)', textDecoration: 'none',
  color: 'var(--text-base)', fontSize: 14, border: 'none',
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/project/${project.slug}`}
      className="card-lift"
      style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit', minHeight: 300 }}
      onClick={() => track('project_click', { slug: project.slug, title: project.title })}
    >
      <div className="card-img">
        <ImgPh h={148} src={project.image} alt={project.title} emoji={project.emoji} blurhash={project.blurhash} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 16, gap: 8 }}>
        <div style={{ fontWeight: 600, fontSize: 17, lineHeight: '130%' }}>
          {project.title} <span style={{ marginLeft: 2 }}>{project.emoji}</span>
        </div>
        <div style={{ fontSize: 14, lineHeight: '22px', color: 'var(--text-soft)' }}>{project.description}</div>
      </div>
    </Link>
  )
}

function ProjectRow({ project }: { project: Project }) {
  const href = `/project/${project.slug}`
  return (
    <div className="row-item" style={{ position: 'relative', padding: '24px 4px' }}>
      <Link href={href} aria-label={project.title} style={{ position: 'absolute', inset: 0, zIndex: 0 }} onClick={() => track('project_click', { slug: project.slug, title: project.title })} />
      <div className="row-stack" style={{ position: 'relative', pointerEvents: 'none' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 500, fontSize: 20, lineHeight: '100%', marginBottom: 12 }}>
            {project.title} {project.emoji}
          </div>
          <div style={{ fontSize: 15, lineHeight: '23px', color: 'var(--text-soft)', marginBottom: 18 }}>
            {project.description}
          </div>
          <div style={{ display: 'flex', gap: 8, pointerEvents: 'auto' }}>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={actionBtnStyle}
                onClick={() => track('project_link_click', { slug: project.slug, title: project.title, url: project.link ?? '' })}
              >
                <IcoLink /> Link
              </a>
            )}
            {project.source && (
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                style={actionBtnStyle}
                onClick={() => track('project_source_click', { slug: project.slug, title: project.title, url: project.source ?? '' })}
              >
                <IcoGithub s={13} /> Source
              </a>
            )}
          </div>
        </div>
        <div className="row-thumb">
          <ImgPh h={112} src={project.image} alt={project.title} emoji={project.emoji} blurhash={project.blurhash} />
        </div>
      </div>
    </div>
  )
}

export function ProjectItem({ project, variant }: ProjectItemProps) {
  return variant === 'card' ? <ProjectCard project={project} /> : <ProjectRow project={project} />
}
