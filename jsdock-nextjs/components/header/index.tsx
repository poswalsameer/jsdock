"use client"

import { useEffect, useCallback } from 'react'
import { Play, Trash2, ChevronUp, ChevronDown, Menu } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import type { Font, Theme } from '@/types'
import { FONT_FAMILY_MAP } from '@/constants'
import { Button } from '@/components/ui/button'
import { executeCode } from '@/lib/execute-code'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  themeAtom,
  fontAtom,
  fontSizeAtom,
  codeAtom,
  logsAtom,
  isExecutingAtom,
  executionTimeAtom,
} from '@/store'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'


export function Header() {
  const code = useAtomValue(codeAtom)
  const [font, setFont] = useAtom(fontAtom)
  const [theme, setTheme] = useAtom(themeAtom)
  const [fontSize, setFontSize] = useAtom(fontSizeAtom)
  const [isExecuting, setIsExecuting] = useAtom(isExecutingAtom)

  const setLogs = useSetAtom(logsAtom)
  const setExecutionTime = useSetAtom(executionTimeAtom)

  const fontFamily = FONT_FAMILY_MAP[font] ?? FONT_FAMILY_MAP['Monaco']

  const handleRun = useCallback(async () => {
    setIsExecuting(true)
    setLogs([])
    setExecutionTime(null)

    const result = await executeCode(code, "")

    const finalLogs = [...result.logs]
    if (result.error) {
      finalLogs.push({
        type: 'error',
        message: result.error,
        timestamp: new Date().toISOString()
      })
    }

    setLogs(finalLogs)
    setExecutionTime(result.executionTime)
    setIsExecuting(false)
  }, [code, setIsExecuting, setLogs, setExecutionTime])

  const handleClear = useCallback(() => {
    setLogs([])
    setExecutionTime(null)
  }, [setLogs, setExecutionTime])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault()
        if (!isExecuting) handleRun()
      } else if (e.shiftKey && e.key === 'Enter') {
        e.preventDefault()
        handleClear()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isExecuting, handleRun, handleClear])

  return (
    <div
      className="h-12 lg:h-14 border-b-2 border-border bg-card relative flex items-center justify-between px-3 lg:px-4 text-card-foreground shrink-0"
      style={{ fontFamily }}
    >
      <div className="text-base lg:text-xl font-medium text-primary shrink-0">
        JS Dock
      </div>

      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 flex-row items-center gap-x-4">
        <Select value={theme} onValueChange={(v) => setTheme(v as Theme)}>
          <SelectTrigger size="sm" className="w-44 bg-popover border-border text-sm rounded-none">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border text-popover-foreground rounded-none overflow-visible">
            <SelectItem value="vs-dark">VS Code Dark</SelectItem>
            <SelectItem value="atom-dark">Atom Dark</SelectItem>
            <SelectItem value="catppuccin">Catppuccin</SelectItem>
          </SelectContent>
        </Select>

        {/* Font Select */}
        <Select value={font} onValueChange={(v) => setFont(v as Font)}>
          <SelectTrigger size="sm" className="w-44 bg-popover border-border text-sm rounded-none">
            <SelectValue placeholder="Font Family" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border text-popover-foreground rounded-none overflow-visible">
            <SelectItem value="Monaco">Monaco</SelectItem>
            <SelectItem value="JetBrains Mono">JetBrains Mono</SelectItem>
            <SelectItem value="Geist Mono">Geist Mono</SelectItem>
          </SelectContent>
        </Select>

        {/* Font Size Stepper */}
        <div className="flex items-stretch h-8 w-44 border border-border">
          <div className="flex items-center justify-center flex-1 text-sm text-foreground bg-popover px-2 select-none tabular-nums">
            {fontSize}px
          </div>
          <div className="flex flex-row border-l border-border">
            <button
              onClick={() => setFontSize(Math.min(24, fontSize + 1))}
              disabled={fontSize >= 24}
              className="flex-1 flex items-center justify-center px-1.5 text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors border-r border-border"
            >
              <ChevronUp className="w-3 h-3" />
            </button>
            <button
              onClick={() => setFontSize(Math.max(10, fontSize - 1))}
              disabled={fontSize <= 10}
              className="flex-1 flex items-center justify-center px-1.5 text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-x-2 lg:gap-x-4">
        <div className="flex lg:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="flex items-center justify-center w-8 h-8 border border-border bg-popover text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Settings"
              >
                <Menu className="w-4 h-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={8}
              className="w-56 rounded-none p-3 flex flex-col gap-3 bg-card border-border"
            >
              {/* Theme */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Theme</span>
                <Select value={theme} onValueChange={(v) => setTheme(v as Theme)}>
                  <SelectTrigger size="sm" className="w-full bg-popover border-border text-xs rounded-none">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border text-popover-foreground rounded-none overflow-visible">
                    <SelectItem value="vs-dark">VS Code Dark</SelectItem>
                    <SelectItem value="atom-dark">Atom Dark</SelectItem>
                    <SelectItem value="catppuccin">Catppuccin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Font */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Font</span>
                <Select value={font} onValueChange={(v) => setFont(v as Font)}>
                  <SelectTrigger size="sm" className="w-full bg-popover border-border text-xs rounded-none">
                    <SelectValue placeholder="Font Family" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border text-popover-foreground rounded-none overflow-visible">
                    <SelectItem value="Monaco">Monaco</SelectItem>
                    <SelectItem value="JetBrains Mono">JetBrains Mono</SelectItem>
                    <SelectItem value="Geist Mono">Geist Mono</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Font Size */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Font Size</span>
                <div className="flex items-stretch h-8 w-full border border-border">
                  <div className="flex items-center justify-center flex-1 text-xs text-foreground bg-popover px-2 select-none tabular-nums">
                    {fontSize}px
                  </div>
                  <div className="flex flex-row border-l border-border">
                    <button
                      onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                      disabled={fontSize >= 24}
                      className="flex-1 flex items-center justify-center px-2 text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors border-r border-border"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setFontSize(Math.max(10, fontSize - 1))}
                      disabled={fontSize <= 10}
                      className="flex-1 flex items-center justify-center px-2 text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="hidden lg:flex items-center gap-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            className="h-8 gap-2 bg-transparent border-border text-muted-foreground hover:text-foreground hover:bg-accent rounded-none"
          >
            Clear
          </Button>
          <Button
            size="sm"
            onClick={handleRun}
            disabled={isExecuting}
            className="h-8 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-none"
          >
            <Play className="w-4 h-4 fill-current" />
            {isExecuting ? 'Running...' : 'Run Code'}
          </Button>
        </div>

        {/* Mobile: icon only */}
        <div className="flex lg:hidden items-center gap-x-1">
          <button
            onClick={handleClear}
            className="flex items-center justify-center w-8 h-8 border border-border bg-transparent text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Clear output"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleRun}
            disabled={isExecuting}
            className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            aria-label="Run code"
          >
            <Play className="w-4 h-4 fill-current" />
          </button>
        </div>

      </div>
    </div>
  )
}
