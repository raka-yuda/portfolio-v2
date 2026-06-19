'use client'

import { useRef, useEffect, useState } from 'react'

interface FilterTabsProps {
  tabs: string[]
  active: string
  onChange: (tab: string) => void
}

export function FilterTabs({ tabs, active, onChange }: FilterTabsProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [ind, setInd] = useState({ left: 0, width: 0, ready: false })

  useEffect(() => {
    const idx = tabs.indexOf(active)
    const el = tabRefs.current[idx]
    if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth, ready: true })
  }, [active, tabs])

  return (
    <div className="filter-tabs-row" style={{ position: 'relative', display: 'flex', borderBottom: '1px solid var(--border-soft)', marginBottom: 16 }}>
      {tabs.map((tab, i) => (
        <button
          key={tab}
          ref={(el) => { tabRefs.current[i] = el }}
          onClick={() => onChange(tab)}
          className="filter-tab-btn"
          style={{
            background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            fontSize: 16, fontWeight: active === tab ? 700 : 400,
            color: active === tab ? 'var(--text-base)' : 'var(--text-soft)',
            padding: '0 0 14px', transition: 'color 0.2s ease',
            flexShrink: 0,
          }}
        >{tab}</button>
      ))}
      <div className="tab-indicator" style={{
        position: 'absolute', bottom: -1, height: 2, background: 'var(--text-base)',
        left: ind.left, width: ind.width, pointerEvents: 'none',
        transition: ind.ready ? 'left 0.3s cubic-bezier(0.4,0,0.2,1), width 0.3s cubic-bezier(0.4,0,0.2,1)' : 'none',
      }} />
    </div>
  )
}
