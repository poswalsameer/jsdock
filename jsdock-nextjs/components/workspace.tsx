"use client"

import { useAtom } from 'jotai'
import dynamic from 'next/dynamic'
import { StdinInput } from './input'
import { TopPanel } from './top-panel'
import { ConsoleOutput } from './output'
import {
  codeAtom,
  verticalLayoutAtom,
  horizontalLayoutAtom,
} from '@/store'
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

// Dynamically import CodeEditor to disable SSR
const CodeEditor = dynamic(() => import('./editor').then(mod => mod.CodeEditor), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-background text-muted-foreground">
      Initializing Monaco Editor...
    </div>
  )
})

export function Workspace() {
  const [hLayout, setHLayout] = useAtom(horizontalLayoutAtom)
  const [vLayout, setVLayout] = useAtom(verticalLayoutAtom)
  const [, setCode] = useAtom(codeAtom)

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background text-foreground">
      <TopPanel />

      <div className="flex-1 min-h-0">
        <ResizablePanelGroup
          orientation="horizontal"
          onLayoutChange={(sizes) => setHLayout(sizes as unknown as number[])}
        >
          {/* Left Panel: Editor */}
          <ResizablePanel
            defaultSize={hLayout[0]}
            minSize={30}
            className="bg-background"
          >
            <CodeEditor onChange={(val) => setCode(val || '')} />
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-border hover:bg-primary transition-colors" />

          {/* Right Panel: Output & Input */}
          <ResizablePanel defaultSize={hLayout[1]} minSize={20}>
            <ResizablePanelGroup
              orientation="vertical"
              onLayoutChange={(sizes) => setVLayout(sizes as unknown as number[])}
            >
              {/* Top: Output */}
              <ResizablePanel defaultSize={vLayout[0]} minSize={20}>
                <ConsoleOutput />
              </ResizablePanel>

              <ResizableHandle withHandle className="bg-border hover:bg-primary transition-colors" />

              {/* Bottom: Input */}
              <ResizablePanel defaultSize={vLayout[1]} minSize={10} collapsedSize={0}>
                <StdinInput />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
