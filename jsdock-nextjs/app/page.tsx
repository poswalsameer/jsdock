"use client"

import dynamic from 'next/dynamic'
import { useAtom, useSetAtom } from 'jotai'
import { Header } from '@/components/header'
import { Output } from '@/components/output'
import { StdinInput } from '@/components/input'
import { MobileBottomPanel } from '@/components/mobile-bottom-panel'
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
  const [verticalLayout, setVerticalLayout] = useAtom(verticalLayoutAtom)
  const [horizontalLayout, setHorizontalLayout] = useAtom(horizontalLayoutAtom)

  const setCode = useSetAtom(codeAtom)

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background text-foreground">
      <Header />

      {/* ─── Desktop layout (lg and above) ───────────────────────────────── */}
      <div className="hidden lg:flex flex-1 min-h-0">
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
                <Output />
              </ResizablePanel>

              <ResizableHandle withHandle className="bg-border hover:bg-primary transition-colors" />

              <ResizablePanel defaultSize={verticalLayout[1]} minSize={10} collapsedSize={0}>
                <StdinInput />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className="flex lg:hidden flex-col flex-1 min-h-0">
        <div className="flex-6 min-h-0 bg-background">
          <CodeEditor onChange={(val) => setCode(val || '')} />
        </div>
        <div className="h-px bg-border shrink-0" />
        <div className="flex-4 min-h-0">
          <MobileBottomPanel />
        </div>
      </div>
    </div>
  )
}

const CodeEditor = dynamic(() => import('../components/editor').then(mod => mod.CodeEditor), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-background text-muted-foreground">
      Initializing Monaco Editor...
    </div>
  )
})