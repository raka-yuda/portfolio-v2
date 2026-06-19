'use client'

import { useState } from 'react'
import { useTheme } from '@/lib/theme'

const options = [
  {
    id: 'modern' as const,
    label: 'Modern',
    desc: 'Clean, flat, typographic.',
    preview: (
      <div style={{ padding: 10, background: '#FAF6E9', borderRadius: 6 }}>
        <div style={{ height: 36, background: '#D9D1BC', borderRadius: 4, marginBottom: 8 }} />
        <div style={{ height: 8, background: '#3F3F46', borderRadius: 2, marginBottom: 5, width: '70%' }} />
        <div style={{ height: 6, background: '#A1A1AA', borderRadius: 2, width: '50%' }} />
      </div>
    ),
  },
  {
    id: 'skeumorphic' as const,
    label: 'Skeuomorphic',
    desc: 'Rich materials, real-world depth.',
    preview: (
      <div style={{
        padding: 10, borderRadius: 8,
        background: 'linear-gradient(160deg, #D8C888 0%, #C8B870 100%)',
      }}>
        {/* card with own material */}
        <div style={{
          height: 38, borderRadius: 8, marginBottom: 8,
          background: 'linear-gradient(145deg, #F0DC98 0%, #C8A848 100%)',
          border: '1px solid #A08030',
          boxShadow: '0 1px 0 rgba(255,255,255,0.55) inset, 0 3px 8px rgba(60,30,0,0.28)',
        }} />
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <div style={{
            height: 18, flex: 1, borderRadius: 4,
            background: 'linear-gradient(180deg, #D4B860, #B09038)',
            border: '1px solid #907020',
            boxShadow: '0 1px 0 rgba(255,255,255,0.4) inset',
          }} />
          <div style={{
            width: 28, height: 18, borderRadius: 4,
            background: 'linear-gradient(180deg, #A02020, #701010)',
            border: '1px solid #501010',
            boxShadow: '0 1px 0 rgba(255,255,255,0.15) inset',
          }} />
        </div>
      </div>
    ),
  },
]

export function TweaksPanel() {
  const { styleMode: style, setStyleMode: setStyle } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Toggle tab */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open tweaks panel"
        style={{
          position: 'fixed', right: open ? 212 : 0, top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 200,
          background: 'var(--surface-1)',
          border: '1px solid var(--border-soft)',
          borderRight: open ? '1px solid var(--border-soft)' : 'none',
          borderRadius: open ? '8px 0 0 8px' : '8px 0 0 8px',
          padding: '12px 6px',
          cursor: 'pointer',
          color: 'var(--text-soft)',
          fontSize: 11,
          fontFamily: 'inherit',
          fontWeight: 600,
          letterSpacing: '0.06em',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          transition: 'right 0.3s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: '-2px 0 12px rgba(0,0,0,0.06)',
        }}
      >
        TWEAKS
      </button>

      {/* Panel */}
      <div
        style={{
          position: 'fixed', right: open ? 0 : -220, top: '50%',
          transform: 'translateY(-50%)',
          width: 212, zIndex: 199,
          background: 'var(--surface-1)',
          border: '1px solid var(--border-soft)',
          borderRight: 'none',
          borderRadius: '12px 0 0 12px',
          padding: '20px 16px',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.08)',
          transition: 'right 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <p style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.06em', color: 'var(--text-soft)', marginBottom: 16 }}>
          STYLE
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {options.map((opt) => {
            const active = style === opt.id
            return (
              <button
                key={opt.id}
                onClick={() => setStyle(opt.id)}
                style={{
                  background: 'none', border: `2px solid ${active ? 'var(--accent)' : 'var(--border-soft)'}`,
                  borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                  padding: 0, overflow: 'hidden',
                  transition: 'border-color 0.2s ease',
                  fontFamily: 'inherit',
                }}
              >
                <div style={{ padding: 8 }}>{opt.preview}</div>
                <div style={{ padding: '8px 10px 10px', borderTop: '1px solid var(--border-soft)' }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: active ? 'var(--accent)' : 'var(--text-base)', marginBottom: 2 }}>
                    {opt.label}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>{opt.desc}</div>
                </div>
              </button>
            )
          })}
        </div>

        <p style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 16, lineHeight: 1.5 }}>
          Saved to localStorage.<br />Survives page refresh.
        </p>
      </div>
    </>
  )
}
