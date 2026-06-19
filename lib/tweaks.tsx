'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface TweaksContextValue {
  open: boolean
  toggle: () => void
  setOpen: (open: boolean) => void
  tabVisible: boolean
  toggleTab: () => void
  setTabVisible: (visible: boolean) => void
}

const TweaksContext = createContext<TweaksContextValue | null>(null)

export function TweaksProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [tabVisible, setTabVisible] = useState(false)
  const toggle = useCallback(() => setOpen((o) => !o), [])
  const toggleTab = useCallback(() => {
    setTabVisible((v) => {
      if (v) setOpen(false)
      return !v
    })
  }, [])

  return (
    <TweaksContext.Provider value={{ open, toggle, setOpen, tabVisible, toggleTab, setTabVisible }}>
      {children}
    </TweaksContext.Provider>
  )
}

export function useTweaks() {
  const ctx = useContext(TweaksContext)
  if (!ctx) throw new Error('useTweaks must be used within TweaksProvider')
  return ctx
}
