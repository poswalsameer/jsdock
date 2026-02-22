import type { LogEntry } from '../../types'

export interface ExecutionResult {
  logs: LogEntry[]
  error: string | null
  executionTime: number
}

// Ensure we only have one energetic worker at a time and we can terminate it
let currentWorker: Worker | null = null
let currentTimeout: NodeJS.Timeout | null = null

export async function executeCode(code: string, stdin: string = ''): Promise<ExecutionResult> {
  return new Promise((resolve) => {
    // Clean up previous worker if it's still running
    if (currentWorker) {
      currentWorker.terminate()
    }
    if (currentTimeout) {
      clearTimeout(currentTimeout)
    }

    // Spin up new worker
    currentWorker = new Worker(new URL('../../worker/index.js', import.meta.url))

    // 2-second timeout mechanism
    currentTimeout = setTimeout(() => {
      if (currentWorker) {
        currentWorker.terminate()
        currentWorker = null
      }
      resolve({
        logs: [],
        error: "Execution Timed Out (Exceeded 2000ms limit)",
        executionTime: 2000,
      })
    }, 2000)

    // Handle messages
    currentWorker.onmessage = (e) => {
      if (currentTimeout) {
        clearTimeout(currentTimeout)
      }
      const { logs, error, executionTime } = e.data
      resolve({
        logs,
        error,
        executionTime,
      })
    }

    // Handle worker-level errors that might not be caught inside new Function
    currentWorker.onerror = (e) => {
      if (currentTimeout) {
        clearTimeout(currentTimeout)
      }
      resolve({
        logs: [],
        error: e.message || "Unknown worker error",
        executionTime: 0,
      })
    }

    // Send code
    currentWorker.postMessage({ code, stdin })
  })
}
