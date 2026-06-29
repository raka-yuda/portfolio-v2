'use client'

import { useEffect } from 'react'
import { track } from '@/lib/analytics'

export function AnalyticsTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const el = (e.target as HTMLElement)?.closest<HTMLElement>('[data-track]')
      if (!el) return
      const event = el.dataset.track
      if (!event) return
      const data: Record<string, string | number | boolean> = {}
      for (const key of Object.keys(el.dataset)) {
        if (key.startsWith('track-')) {
          const name = key.slice(6).replace(/-([a-z])/g, (_, c) => c.toUpperCase())
          data[name] = el.dataset[key] as string
        }
      }
      track(event, data)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
