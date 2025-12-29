'use client'

import { useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../lib/i18n'
import { useStore } from '../store/useStore'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const { appSettings } = useStore()

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const language = localStorage.getItem('language') || 'en'
      i18n.changeLanguage(language)
      
      // Apply initial theme
      const root = document.documentElement
      let shouldBeDark = false
      
      if (appSettings.theme === 'auto') {
        shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      } else {
        shouldBeDark = appSettings.theme === 'dark'
      }
      
      if (shouldBeDark) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  }, [])

  // Sync theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const root = document.documentElement
    const theme = appSettings.theme

    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.toggle('dark', prefersDark)
    } else {
      root.classList.toggle('dark', theme === 'dark')
    }
  }, [appSettings.theme])

  if (!mounted) {
    return null
  }

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  )
}
