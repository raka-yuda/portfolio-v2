'use client'

import { createContext, useContext, useEffect, useCallback, useSyncExternalStore } from 'react'
import { useTheme as useNextTheme } from 'next-themes'

type StyleMode = 'modern' | 'skeumorphic'
type ColorMode = 'light' | 'dark'
type CombinedTheme = 'light-modern' | 'dark-modern' | 'light-skeumorphic' | 'dark-skeumorphic'
const defaultStyleMode: StyleMode = 'skeumorphic'
const STORAGE_KEY = 'portfolio-style'

interface ThemeContextValue {
  colorMode: ColorMode
  styleMode: StyleMode
  combined: CombinedTheme
  setColorMode: (m: ColorMode) => void
  setStyleMode: (m: StyleMode) => void
  toggleColorMode: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  colorMode: 'light',
  styleMode: defaultStyleMode,
  combined: 'light-skeumorphic',
  setColorMode: () => {},
  setStyleMode: () => {},
  toggleColorMode: () => {},
})

function getServerStyle(): StyleMode {
  return defaultStyleMode
}

function getClientStyle(): StyleMode {
  if (typeof window === 'undefined') return defaultStyleMode
  const saved = localStorage.getItem(STORAGE_KEY) as StyleMode | null
  return saved === 'modern' || saved === 'skeumorphic' ? saved : defaultStyleMode
}

function subscribe(onChange: () => void) {
  const handler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onChange()
  }
  window.addEventListener('storage', handler)
  return () => window.removeEventListener('storage', handler)
}

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useNextTheme()
  const styleMode = useSyncExternalStore(subscribe, getClientStyle, getServerStyle)

  const colorMode: ColorMode = theme === 'dark' ? 'dark' : 'light'
  const combined: CombinedTheme = `${colorMode}-${styleMode}` as CombinedTheme

  const setColorMode = (m: ColorMode) => setTheme(m)
  const toggleColorMode = () => setTheme(colorMode === 'dark' ? 'light' : 'dark')

  const setStyleMode = useCallback((m: StyleMode) => {
    localStorage.setItem(STORAGE_KEY, m)
    document.documentElement.dataset.style = m
    // Trigger a re-render in the same tab since localStorage doesn't fire storage events there
    window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }))
  }, [])

  // Keep data-style in sync with the store value
  useEffect(() => {
    document.documentElement.dataset.style = styleMode
  }, [styleMode])

  return (
    <ThemeContext.Provider value={{ colorMode, styleMode, combined, setColorMode, setStyleMode, toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
