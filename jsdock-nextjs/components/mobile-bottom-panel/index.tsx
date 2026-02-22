"use client"

import { useState } from 'react'
import { Output } from '@/components/output'
import { StdinInput } from '@/components/input'
import { Terminal, TerminalSquare } from 'lucide-react'

type Tab = 'output' | 'input'

export function MobileBottomPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('output')

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Tab Bar */}
      <div className="flex items-stretch h-10 border-b border-border bg-secondary shrink-0">
        <button
          onClick={() => setActiveTab('output')}
          className={`flex items-center gap-1.5 px-4 text-xs font-semibold uppercase tracking-wider transition-colors border-r border-border ${activeTab === 'output'
            ? 'text-primary bg-background border-b-2 border-b-primary'
            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          Output
        </button>
        <button
          onClick={() => setActiveTab('input')}
          className={`flex items-center gap-1.5 px-4 text-xs font-semibold uppercase tracking-wider transition-colors ${activeTab === 'input'
            ? 'text-primary bg-background border-b-2 border-b-primary'
            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
        >
          <TerminalSquare className="w-3.5 h-3.5" />
          Input
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {activeTab === 'output' ? <Output /> : <StdinInput />}
      </div>
    </div>
  )
}
