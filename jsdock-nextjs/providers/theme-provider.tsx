"use client"

import { useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { themeAtom, fontAtom } from '@/store'

// Map from user-facing font names to CSS font-family stacks.
// JetBrains Mono is loaded via next/font/google in layout.tsx and exposed
// as var(--font-jetbrains-mono). Monaco falls back to system monospace fonts.
const FONT_FAMILY_MAP: Record<string, string> = {
  'Monaco': 'Monaco, Menlo, Consolas, "Courier New", monospace',
  'JetBrains Mono': 'var(--font-jetbrains-mono), monospace',
  'Geist Mono': 'var(--font-geist-mono), monospace',
}

export function ThemeProvider() {
  const theme = useAtomValue(themeAtom)
  const font = useAtomValue(fontAtom)

  // Apply theme class to <html> so CSS variables cascade to the entire app
  useEffect(() => {
    const root = document.documentElement

    // Remove previous theme classes
    root.classList.remove('theme-vs-dark', 'theme-atom-dark', 'theme-catppuccin')

    // Add the new theme class
    root.classList.add(`theme-${theme}`)
  }, [theme])

  // Apply the chosen font as a CSS custom property on <html>.
  // Every component uses this via --font-mono → var(--app-code-font, ...).
  useEffect(() => {
    const root = document.documentElement
    const fontFamily = FONT_FAMILY_MAP[font] ?? FONT_FAMILY_MAP['Monaco']
    root.style.setProperty('--app-code-font', fontFamily)
  }, [font])

  return null
}
