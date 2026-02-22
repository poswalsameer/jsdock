"use client"

import { useAtom, useSetAtom } from 'jotai'
import dynamic from 'next/dynamic'
import { StdinInput } from '@/components/input'
import { TopPanel } from '@/components/header'
import { ConsoleOutput } from '@/components/output'
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

export default function Home() {
  const setCode = useSetAtom(codeAtom)

  const [horizontalLayout, setHorizontalLayout] = useAtom(horizontalLayoutAtom)
  const [verticalLayout, setVerticalLayout] = useAtom(verticalLayoutAtom)

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background text-foreground">
      <TopPanel />

      <div className="flex-1 min-h-0">
        <ResizablePanelGroup
          orientation="horizontal"
          onLayoutChange={(sizes) => setHorizontalLayout(sizes as unknown as number[])}
        >
          <ResizablePanel
            defaultSize={horizontalLayout[0]}
            minSize={30}
            className="bg-background"
          >
            <CodeEditor onChange={(val) => setCode(val || '')} />
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-border hover:bg-primary transition-colors" />

          <ResizablePanel defaultSize={horizontalLayout[1]} minSize={20}>
            <ResizablePanelGroup
              orientation="vertical"
              onLayoutChange={(sizes) => setVerticalLayout(sizes as unknown as number[])}
            >
              <ResizablePanel defaultSize={verticalLayout[0]} minSize={20}>
                <ConsoleOutput />
              </ResizablePanel>

              <ResizableHandle withHandle className="bg-border hover:bg-primary transition-colors" />

              <ResizablePanel defaultSize={verticalLayout[1]} minSize={10} collapsedSize={0}>
                <StdinInput />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

// Dynamically import CodeEditor to disable SSR
const CodeEditor = dynamic(() => import('../components/editor').then(mod => mod.CodeEditor), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-background text-muted-foreground">
      Initializing Monaco Editor...
    </div>
  )
})