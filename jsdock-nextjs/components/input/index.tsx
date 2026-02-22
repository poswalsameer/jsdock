"use client"

import { useAtomValue } from 'jotai'
import { TerminalSquare } from 'lucide-react'
import { FONT_FAMILY_MAP } from '@/constants'
import { fontAtom, fontSizeAtom } from '@/store'
import { Textarea } from '@/components/ui/textarea'

export function StdinInput() {
  const font = useAtomValue(fontAtom)
  const fontSize = useAtomValue(fontSizeAtom)

  const fontFamily = FONT_FAMILY_MAP[font] ?? FONT_FAMILY_MAP['Monaco']

  return (
    <div className="flex flex-col h-full bg-background border-t border-border" style={{ fontFamily, fontSize }}>
      <div className="flex items-center gap-2 px-4 py-2 bg-secondary border-b border-border text-muted-foreground font-sans text-sm uppercase tracking-wider font-semibold">
        <TerminalSquare className="w-4 h-4" />
        Input
      </div>
      <Textarea
        placeholder="Enter input here (each line can be read via prompt())..."
        style={{ fontFamily, fontSize }}
        className="w-full rounded-none h-full min-h-0 bg-transparent border-none focus-visible:ring-0 text-foreground resize-none p-2 placeholder:text-muted-foreground"
      />
    </div>
  )
}
