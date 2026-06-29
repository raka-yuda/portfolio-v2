'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/lib/theme'
import { useTweaks } from '@/lib/tweaks'
import { IcoHome, IcoTarget, IcoFile, IcoRepeat, IcoArrowUp } from '@/components/atoms/Icons'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { ChevronRight, Wrench } from 'lucide-react'

const ACCENT = '#622222'

export function BottomNav() {
  const pathname = usePathname()
  const { toggleColorMode } = useTheme()
  const { tabVisible, toggleTab } = useTweaks()
  const [expanded, setExpanded] = useState(false)
  const [spinning, setSpinning] = useState(false)
  const spinTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  if (pathname === '/links') return null

  const isHome = pathname === '/'
  const isProjects = pathname.startsWith('/project')
  const isBlogs = pathname.startsWith('/blog')

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const handleThemeToggle = () => {
    toggleColorMode()
    setSpinning(true)
    if (spinTimer.current) clearTimeout(spinTimer.current)
    spinTimer.current = setTimeout(() => setSpinning(false), 600)
  }

  const navBtn = (active: boolean): React.CSSProperties => ({
    width: 44, height: 44, borderRadius: 8, border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    background: active ? 'rgba(98,34,34,0.10)' : 'transparent',
    color: active ? ACCENT : 'var(--icon-color, #3F3F46)',
    transition: 'background 0.18s ease, color 0.18s ease',
  })

  const actionBtn: React.CSSProperties = {
    width: 40, height: 40, borderRadius: 8, border: 'none', cursor: 'pointer',
    background: 'transparent', color: 'var(--icon-color, #3F3F46)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    transition: 'background 0.18s ease, color 0.18s ease',
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'manipulation',
  }

  return (
    <TooltipProvider>
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
        transition: 'box-shadow 0.45s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '0 4px', position: 'relative' }}>
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

      <div className={`${!expanded ? 'pr-3!' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '0px 4px' }}>
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

      {/* Expanded items */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: expanded ? 2 : 0,
          width: expanded ? 'auto' : 0,
          opacity: expanded ? 1 : 0,
          // paddingRight: expanded ? 10 : 0,
          overflow: 'hidden',
          transition: 'width 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.45s ease, gap 0.45s ease, padding 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div className="bottom-nav-divider" style={{ width: 1, height: 28, background: 'rgba(0,0,0,0.12)', margin: '0 6px', flexShrink: 0 }} />
        <Tooltip>
          <TooltipTrigger
            style={{ ...actionBtn, width: 44, height: 44, background: tabVisible ? 'rgba(98,34,34,0.10)' : 'transparent', color: tabVisible ? ACCENT : 'var(--icon-color, #3F3F46)' }}
            onClick={toggleTab}
            aria-label="Tweaks"
          >
            <Wrench size={18} />
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={16}>Tweaks</TooltipContent>
        </Tooltip>
      </div>

      <div className='absolute -right-3'>
        <div className='w-6 h-6 rounded-full flex items-center justify-center bottom-nav' style={{ background: 'var(--surface-1)', border: '1px solid var(--border-soft)', color: 'var(--icon-color, #3F3F46)' }}>
          <Tooltip>
            <TooltipTrigger
              style={actionBtn}
              onClick={() => setExpanded((e) => !e)}
              aria-label={expanded ? 'Collapse nav' : 'Expand nav'}
            >
              <span style={{ display: 'inline-block', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                <ChevronRight size={18} />
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={16}>{expanded ? 'Collapse' : 'Expand'}</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
    </TooltipProvider>
  )
}
