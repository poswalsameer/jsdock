"use client"

import { Textarea } from '@/components/ui/textarea'
import { TerminalSquare } from 'lucide-react'

// For now this is just a mockup that stores standard input for the worker
// In a real app we'd bind it to an atom and pass it to executeCode
export function StdinInput() {
  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-t border-[#2d2d30]">
      <div className="flex items-center gap-2 px-4 py-2 bg-[#202022] border-b border-[#2d2d30] text-zinc-400 font-sans text-xs uppercase tracking-wider font-semibold">
        <TerminalSquare className="w-4 h-4" />
        Standard Input (stdin)
      </div>
      <div className="flex-1 p-2">
        <Textarea
          placeholder="Enter input here (each line can be read via prompt())..."
          className="w-full h-full min-h-0 bg-transparent border-none focus-visible:ring-0 text-zinc-300 font-mono text-[13px] resize-none p-2 placeholder:text-zinc-600"
        />
      </div>
    </div>
  )
}
