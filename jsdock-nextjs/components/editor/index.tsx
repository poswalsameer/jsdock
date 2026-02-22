"use client"

import { useAtomValue } from 'jotai'
import { FONT_MAP } from '@/constants'
import { useEffect, useRef } from 'react'
import { THEMES } from '@/lib/monaco-themes'
import Editor, { useMonaco } from '@monaco-editor/react'
import {
  codeAtom,
  themeAtom,
  fontAtom,
  fontSizeAtom,
  ligaturesAtom
} from '@/store'

export function CodeEditor({ onChange }: { onChange: (value: string | undefined) => void }) {
  const code = useAtomValue(codeAtom)
  const font = useAtomValue(fontAtom)
  const theme = useAtomValue(themeAtom)
  const fontSize = useAtomValue(fontSizeAtom)
  const ligatures = useAtomValue(ligaturesAtom)

  const monaco = useMonaco()
  const editorRef = useRef<import('monaco-editor').editor.IStandaloneCodeEditor | null>(null)

  function handleEditorDidMount(editor: import('monaco-editor').editor.IStandaloneCodeEditor) {
    editorRef.current = editor
  }

  useEffect(() => {
    if (monaco) {
      Object.entries(THEMES).forEach(([themeName, themeData]) => {
        // @ts-expect-error - Monaco types might be incomplete for theme definition
        monaco.editor.defineTheme(themeName, themeData)
      })
      monaco.editor.setTheme(theme)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monaco])

  useEffect(() => {
    if (monaco && editorRef.current) {
      monaco.editor.setTheme(theme)
    }
  }, [theme, monaco])

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
