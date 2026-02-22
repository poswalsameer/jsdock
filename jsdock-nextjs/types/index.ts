export type Theme = 'vs-dark' | 'atom-dark' | 'catppuccin'
export type Font = 'Monaco' | 'JetBrains Mono' | 'Geist Mono'

export type LogEntry = {
  type: 'log' | 'error' | 'warn' | 'info' | 'system'
  message: string
  timestamp: string
}