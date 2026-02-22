"use client"

import { useAtomValue } from 'jotai'
import { logsAtom, executionTimeAtom, fontAtom, fontSizeAtom } from '@/store'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Terminal, Clock, AlertCircle } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { clsx } from 'clsx'

// Map font names to CSS font-family stacks (mirrors ThemeProvider & editor)
const FONT_FAMILY_MAP: Record<string, string> = {
  'Monaco': 'Monaco, Menlo, Consolas, "Courier New", monospace',
  'JetBrains Mono': 'var(--font-jetbrains-mono), monospace',
  'Geist Mono': 'var(--font-geist-mono), monospace',
}

export function ConsoleOutput() {
  const logs = useAtomValue(logsAtom)
  const executionTime = useAtomValue(executionTimeAtom)
  const font = useAtomValue(fontAtom)
  const fontSize = useAtomValue(fontSizeAtom)
  const endRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  const fontFamily = FONT_FAMILY_MAP[font] ?? FONT_FAMILY_MAP['Monaco']

  return (
    <div
      className="flex flex-col h-full bg-background text-foreground"
      style={{ fontFamily, fontSize }}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-secondary border-b border-border">
        <div className="flex items-center gap-2 text-muted-foreground font-sans text-xs uppercase tracking-wider font-semibold">
          <Terminal className="w-4 h-4" />
          Output
        </div>
        {executionTime !== null && (
          <div className={clsx(
            "flex items-center gap-1.5 text-xs",
            executionTime >= 2000 ? "text-red-400" : "text-green-400"
          )}>
            {executionTime >= 2000 ? <AlertCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
            {executionTime}ms
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 p-4">
        {logs.length === 0 ? (
          <div className="text-muted-foreground italic" style={{ fontFamily, fontSize }}>No output yet. Run your code to see results.</div>
        ) : (
          <div className="flex flex-col gap-1 w-full">
            {logs.map((log, i) => (
              <div
                key={i}
                className={clsx(
                  "py-1 px-2 rounded w-full whitespace-pre-wrap break-all",
                  log.type === 'error' && "text-destructive bg-destructive/10 border-l-2 border-destructive",
                  log.type === 'warn' && "text-yellow-400 bg-yellow-950/30 border-l-2 border-yellow-500",
                  log.type === 'info' && "text-blue-400",
                  log.type === 'log' && "text-foreground"
                )}
              >
                {log.message}
              </div>
            ))}
            <div ref={endRef} />
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
