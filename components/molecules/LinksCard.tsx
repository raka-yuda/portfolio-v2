'use client'

import Link from 'next/link'
import { ReactNode, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

interface LinksCardProps {
  href: string
  icon: ReactNode
  title: string
  description?: string
  external?: boolean
}

export function LinksCard({ href, icon, title, description, external }: LinksCardProps) {
  const [hovered, setHovered] = useState(false)

  const content = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="connect-icon connect-tile"
      style={{
        width: '100%',
        height: 'auto',
        aspectRatio: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '16px 18px',
        borderRadius: 16,
        background: 'var(--surface-1)',
        border: '1px solid var(--border-soft)',
        color: 'var(--text-base)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        textDecoration: 'none',
        textAlign: 'left',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 26 }}>
        {icon}
      </span>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 16, lineHeight: '130%' }}>{title}</div>
        {description && (
          <div style={{ fontSize: 13, opacity: 0.85, marginTop: 3, lineHeight: '18px' }}>{description}</div>
        )}
      </div>
      {external && (
        <ArrowUpRight size={18} style={{ flexShrink: 0, opacity: hovered ? 1 : 0.7, transition: 'opacity 0.2s ease' }} />
      )}
    </div>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
      {content}
    </Link>
  )
}
