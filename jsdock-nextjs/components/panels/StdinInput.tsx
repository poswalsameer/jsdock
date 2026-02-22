"use client"

import { Textarea } from '@/components/ui/textarea'
import { TerminalSquare } from 'lucide-react'

// For now this is just a mockup that stores standard input for the worker
// In a real app we'd bind it to an atom and pass it to executeCode
export function StdinInput() {
  return (
    <div className="flex flex-col h-full bg-background border-t border-border">
      <div className="flex items-center gap-2 px-4 py-2 bg-secondary border-b border-border text-muted-foreground font-sans text-xs uppercase tracking-wider font-semibold">
        <TerminalSquare className="w-4 h-4" />
        Standard Input (stdin)
      </div>
      <div className="flex-1 p-2">
        <Textarea
          placeholder="Enter input here (each line can be read via prompt())..."
          className="w-full h-full min-h-0 bg-transparent border-none focus-visible:ring-0 text-foreground font-mono text-[13px] resize-none p-2 placeholder:text-muted-foreground"
        />
      </div>
    </div>
  )
}
