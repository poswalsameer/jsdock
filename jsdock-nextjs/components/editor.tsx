"use client"

import { useEffect, useRef } from 'react'
import { useAtomValue } from 'jotai'
import { codeAtom, themeAtom, fontAtom, fontSizeAtom, ligaturesAtom } from '@/store'
import Editor, { useMonaco } from '@monaco-editor/react'
import { THEMES } from '@/lib/monaco-themes'

// Font mapping for Monaco
const FONT_MAP: Record<string, string> = {
  'Monaco': 'Monaco, Menlo, Consolas, "Courier New", monospace',
  'JetBrains Mono': '"JetBrains Mono", monospace',
  'Geist Mono': 'var(--font-geist-mono), monospace',
}

interface CodeEditorProps {
  onChange: (value: string | undefined) => void
}

export function CodeEditor({ onChange }: CodeEditorProps) {
  const code = useAtomValue(codeAtom)
  const theme = useAtomValue(themeAtom)
  const font = useAtomValue(fontAtom)
  const fontSize = useAtomValue(fontSizeAtom)
  const ligatures = useAtomValue(ligaturesAtom)

  const monaco = useMonaco()
  const editorRef = useRef<import('monaco-editor').editor.IStandaloneCodeEditor | null>(null)

  useEffect(() => {
    if (monaco) {
      // Define themes
      Object.entries(THEMES).forEach(([themeName, themeData]) => {
        // @ts-expect-error - Monaco types might be incomplete for theme definition
        monaco.editor.defineTheme(themeName, themeData)
      })
    }
  }, [monaco])

  useEffect(() => {
    if (monaco && editorRef.current) {
      monaco.editor.setTheme(theme)
    }
  }, [theme, monaco])

  const handleEditorDidMount = (editor: import('monaco-editor').editor.IStandaloneCodeEditor) => {
    editorRef.current = editor
  }

  return (
    <div className="w-full h-full relative">
      <Editor
        height="100%"
        language="javascript"
        value={code}
        onChange={onChange}
        onMount={handleEditorDidMount}
        theme={theme}
        options={{
          fontFamily: FONT_MAP[font] || FONT_MAP['Monaco'],
          fontSize: fontSize,
          fontLigatures: ligatures,
          minimap: { enabled: true },
          formatOnType: true,
          formatOnPaste: true,
          wordWrap: 'on',
          autoClosingBrackets: 'always',
          autoIndent: 'full',
          padding: { top: 16, bottom: 16 },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
        }}
        loading={
          <div className="flex h-full items-center justify-center text-zinc-500">
            Loading Editor...
          </div>
        }
      />
    </div>
  )
}
