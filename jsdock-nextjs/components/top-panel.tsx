"use client"

import { useAtom, useAtomValue } from 'jotai'
import {
  themeAtom,
  fontAtom,
  fontSizeAtom,
  ligaturesAtom,
  codeAtom,
  logsAtom,
  isExecutingAtom,
  executionTimeAtom,
  ThemeType,
  FontType
} from '@/store'
import { executeCode } from '@/lib/execute-code'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Play, Trash2 } from 'lucide-react'

const FONT_FAMILY_MAP: Record<string, string> = {
  'Monaco': 'Monaco, Menlo, Consolas, "Courier New", monospace',
  'JetBrains Mono': 'var(--font-jetbrains-mono), monospace',
  'Geist Mono': 'var(--font-geist-mono), monospace',
}

export function TopPanel() {
  const [theme, setTheme] = useAtom(themeAtom)
  const [font, setFont] = useAtom(fontAtom)
  const [fontSize, setFontSize] = useAtom(fontSizeAtom)
  const [ligatures, setLigatures] = useAtom(ligaturesAtom)

  const code = useAtomValue(codeAtom)
  const [isExecuting, setIsExecuting] = useAtom(isExecutingAtom)
  const [, setLogs] = useAtom(logsAtom)
  const [, setExecutionTime] = useAtom(executionTimeAtom)

  const fontFamily = FONT_FAMILY_MAP[font] ?? FONT_FAMILY_MAP['Monaco']

  const handleRun = async () => {
    setIsExecuting(true)
    setLogs([])
    setExecutionTime(null)

    // TODO: Need to pass stdin eventually
    const result = await executeCode(code, "")

    // In next step, we'll append the actual errors to the output log
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
  }

  const handleClear = () => {
    setLogs([])
    setExecutionTime(null)
  }

  return (
    <div
      className="h-14 border-b border-border bg-card flex items-center justify-between px-4 text-card-foreground"
      style={{ fontFamily }}
    >
      <div className="flex items-center gap-4">
        <div className="font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
          JS Playground
        </div>

        <div className="h-6 w-px bg-border mx-2" />

        {/* Theme Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Theme</span>
          <Select value={theme} onValueChange={(v) => setTheme(v as ThemeType)}>
            <SelectTrigger className="w-[140px] h-8 bg-popover border-border text-xs">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border text-popover-foreground">
              <SelectItem value="vs-dark">VS Code Dark</SelectItem>
              <SelectItem value="atom-dark">Atom Dark</SelectItem>
              <SelectItem value="catppuccin">Catppuccin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Font Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Font</span>
          <Select value={font} onValueChange={(v) => setFont(v as FontType)}>
            <SelectTrigger className="w-[140px] h-8 bg-popover border-border text-xs">
              <SelectValue placeholder="Font Family" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border text-popover-foreground">
              <SelectItem value="Monaco">Monaco</SelectItem>
              <SelectItem value="JetBrains Mono">JetBrains Mono</SelectItem>
              <SelectItem value="Geist Mono">Geist Mono</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Font Size */}
        <div className="flex items-center gap-3 ml-2">
          <span className="text-xs text-muted-foreground">Size ({fontSize}px)</span>
          <Slider
            value={[fontSize]}
            onValueChange={(v) => setFontSize(v[0])}
            min={10}
            max={24}
            step={1}
            className="w-24"
          />
        </div>

        {/* Ligatures */}
        <div className="flex items-center gap-2 ml-4">
          <span className="text-xs text-muted-foreground">Ligatures</span>
          <Switch
            checked={ligatures}
            onCheckedChange={setLigatures}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          className="h-8 gap-2 bg-transparent border-border text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </Button>
        <Button
          size="sm"
          onClick={handleRun}
          disabled={isExecuting}
          className="h-8 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Play className="w-4 h-4 fill-current" />
          {isExecuting ? 'Running...' : 'Run Code'}
        </Button>
      </div>
    </div>
  )
}
