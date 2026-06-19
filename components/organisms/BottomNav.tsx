'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/lib/theme'
import { IcoHome, IcoTarget, IcoFile, IcoRepeat, IcoArrowUp } from '@/components/atoms/Icons'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

const ACCENT = '#622222'

export function BottomNav() {
  const pathname = usePathname()
  const { colorMode, toggleColorMode } = useTheme()

  const isHome = pathname === '/'
  const isProjects = pathname.startsWith('/project')
  const isBlogs = pathname.startsWith('/blog')

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const [spinning, setSpinning] = useState(false)
  const spinTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleThemeToggle = () => {
    toggleColorMode()
    setSpinning(true)
    if (spinTimer.current) clearTimeout(spinTimer.current)
    spinTimer.current = setTimeout(() => setSpinning(false), 600)
  }

  const navBtn = (active: boolean): React.CSSProperties => ({
    width: 44, height: 44, borderRadius: 8, border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1,
    background: active ? 'rgba(98,34,34,0.10)' : 'transparent',
    color: active ? ACCENT : 'var(--icon-color, #3F3F46)',
    transition: 'background 0.18s ease, color 0.18s ease',
  })

  const actionBtn: React.CSSProperties = {
    width: 40, height: 40, borderRadius: 8, border: 'none', cursor: 'pointer',
    background: 'transparent', color: 'var(--icon-color, #3F3F46)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1,
    transition: 'background 0.18s ease, color 0.18s ease',
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'manipulation',
  }

  return (
    <div
      className="bottom-nav"
      style={{
        position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        height: 58, background: 'rgba(250, 246, 233, 0.85)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(0,0,0,0.10)', borderRadius: 14,
        display: 'flex', alignItems: 'center', zIndex: 100,
        boxShadow: '0 8px 28px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)',
        padding: '0 6px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '0 4px' }}>
        <Tooltip>
          <TooltipTrigger>
            <Link href="/" style={navBtn(isHome)} aria-label="Home"><IcoHome s={20} /></Link>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={14}>Home</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Link href="/project" style={navBtn(isProjects)} aria-label="Projects"><IcoTarget s={20} /></Link>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={14}>Projects</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Link href="/blog" style={navBtn(isBlogs)} aria-label="Blog"><IcoFile s={20} /></Link>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={14}>Blog</TooltipContent>
        </Tooltip>
      </div>
      <div className="bottom-nav-divider" style={{ width: 1, height: 28, background: 'rgba(0,0,0,0.12)', margin: '0 6px' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '0 4px' }}>
        <Tooltip>
          <TooltipTrigger
            style={actionBtn}
            onClick={handleThemeToggle}
            aria-label="Toggle theme"
          >
            <span className={spinning ? 'spin-once' : ''}><IcoRepeat s={18} /></span>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={16}>Toggle theme</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            style={actionBtn}
            onClick={scrollUp}
            aria-label="Scroll to top"
          >
            <IcoArrowUp s={18} />
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={16}>Scroll to top</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
