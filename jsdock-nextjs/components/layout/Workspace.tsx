"use client"

import { useAtom } from 'jotai'
import { horizontalLayoutAtom, verticalLayoutAtom, codeAtom } from '@/store/atoms'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { TopPanel } from './TopPanel'
import { ConsoleOutput } from '../panels/ConsoleOutput'
import { StdinInput } from '../panels/StdinInput'
import dynamic from 'next/dynamic'

// Dynamically import CodeEditor to disable SSR
const CodeEditor = dynamic(() => import('../editor/CodeEditor').then(mod => mod.CodeEditor), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#1e1e1e] text-zinc-500">
      Initializing Monaco Editor...
    </div>
  )
})

export function Workspace() {
  const [hLayout, setHLayout] = useAtom(horizontalLayoutAtom)
  const [vLayout, setVLayout] = useAtom(verticalLayoutAtom)
  const [, setCode] = useAtom(codeAtom)

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-black text-white">
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
            className="bg-[#1e1e1e]"
          >
            <CodeEditor onChange={(val) => setCode(val || '')} />
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-[#2d2d30] hover:bg-blue-500 transition-colors" />

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

              <ResizableHandle withHandle className="bg-[#2d2d30] hover:bg-blue-500 transition-colors" />

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
