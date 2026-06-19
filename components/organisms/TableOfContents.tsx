'use client'

import { useEffect, useState } from 'react'
import type { TocItem } from '@/types'

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveId(e.target.id)
        }
      },
      { rootMargin: '-15% 0px -55% 0px', threshold: 0 }
    )
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [items])

  if (items.length === 0) return null

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <aside
      aria-label="On this page"
      className="hidden lg:block"
      style={{
        position: 'sticky',
        top: 60,
        float: 'left',
        marginLeft: 'calc(-170px - 32px)',
        width: 170,
        alignSelf: 'flex-start',
      }}
    >
      {items.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            style={{
              display: 'block', textAlign: 'left', background: 'none', border: 'none',
              padding: '6px 0', cursor: 'pointer', fontFamily: 'inherit',
              fontSize: 14, lineHeight: 1.4, marginBottom: 4, width: '100%',
              color: activeId === item.id ? 'var(--text-base)' : 'var(--toc-inactive)',
              fontWeight: activeId === item.id ? 500 : 400,
              transition: 'color 0.2s ease',
            }}
          >
            {item.text}
          </button>
      ))}
    </aside>
  )
}
