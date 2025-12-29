'use client'

import { useEffect, useState } from 'react'
import { useStore } from '@/store/useStore'

export function useTheme() {
  const { appSettings } = useStore()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (appSettings.theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      setTheme(mediaQuery.matches ? 'dark' : 'light')
      
      const handler = (e: MediaQueryListEvent) => {
        setTheme(e.matches ? 'dark' : 'light')
      }
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    } else {
      setTheme(appSettings.theme)
    }
  }, [appSettings.theme])

  return theme
}

