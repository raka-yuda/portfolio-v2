'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useTheme as useNextTheme } from 'next-themes'

type StyleMode = 'modern' | 'skeumorphic'
type ColorMode = 'light' | 'dark'
type CombinedTheme = 'light-modern' | 'dark-modern' | 'light-skeumorphic' | 'dark-skeumorphic'
const defaultStyleMode: StyleMode = 'skeumorphic'

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

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useNextTheme()
  const [styleMode, setStyleModeState] = useState<StyleMode>(defaultStyleMode)

  // Restore persisted style on mount — dev only
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    const saved = localStorage.getItem('portfolio-style') as StyleMode | null
    if (saved === 'modern' || saved === 'skeumorphic') setStyleModeState(saved)
  }, [])

  const colorMode: ColorMode = theme === 'dark' ? 'dark' : 'light'
  const combined: CombinedTheme = `${colorMode}-${styleMode}` as CombinedTheme

  const setColorMode = (m: ColorMode) => setTheme(m)
  const toggleColorMode = () => setTheme(colorMode === 'dark' ? 'light' : 'dark')

  const setStyleMode = (m: StyleMode) => {
    setStyleModeState(m)
    localStorage.setItem('portfolio-style', m)
    document.documentElement.dataset.style = m
  }

  // Keep data-style in sync
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
