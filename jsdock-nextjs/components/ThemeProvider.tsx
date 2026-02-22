"use client"

import { useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { themeAtom } from '@/store/atoms'

export function ThemeProvider() {
  const theme = useAtomValue(themeAtom)

  useEffect(() => {
    const root = document.documentElement

    // Remove existing theme classes
    root.classList.remove('theme-vs-dark', 'theme-atom-dark', 'theme-catppuccin')

    // Add the selected theme class
    root.classList.add(`theme-${theme}`)
  }, [theme])

  return null
}
