import { atom } from 'jotai'
import { DEFAULT_CODE } from '@/constants'
import { atomWithStorage } from 'jotai/utils'
import type { Font, LogEntry, Theme } from '@/types'

export const codeAtom = atomWithStorage<string>('play-code', DEFAULT_CODE)
export const themeAtom = atomWithStorage<Theme>('play-theme', 'vs-dark')
export const fontAtom = atomWithStorage<Font>('play-font', 'Monaco')
export const fontSizeAtom = atomWithStorage<number>('play-fontSize', 16)
export const ligaturesAtom = atomWithStorage<boolean>('play-ligatures', false)
export const horizontalLayoutAtom = atomWithStorage<number[]>('play-h-layout', [60, 40])
export const verticalLayoutAtom = atomWithStorage<number[]>('play-v-layout', [70, 30])

export const logsAtom = atom<LogEntry[]>([])
export const isExecutingAtom = atom<boolean>(false)
export const executionTimeAtom = atom<number | null>(null)
