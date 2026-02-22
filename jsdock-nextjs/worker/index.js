// worker.js
// This worker runs in an isolated thread with no DOM or window access.
// Intercept console.log, info, warn, error to pass them back.

self.onmessage = function (e) {
  // Block network and storage APIs to prevent external API calls
  // and reading app data. Keep the environment restricted to native JS logic.
  const BLOCKED_APIS = [
    "fetch",
    "XMLHttpRequest",
    "WebSocket",
    "EventSource",
    "localStorage",
    "sessionStorage",
    "indexedDB",
    "caches",
    "BroadcastChannel",
    "open",
    "importScripts",
  ]
  BLOCKED_APIS.forEach((api) => {
    try {
      delete self[api]
    } catch {
      self[api] = undefined
    }
  })

  const { code, stdin } = e.data

  const logs = []
  const originalConsole = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
  }

  function captureLog(type, args) {
    // Format complex objects slightly better than [object Object]
    const formattedArgs = args.map((arg) => {
      if (typeof arg === "object" && arg !== null) {
        try {
          return JSON.stringify(arg, null, 2)
        } catch {
          return String(arg)
        }
      }
      return String(arg)
    })

    logs.push({
      type,
      message: formattedArgs.join(" "),
      timestamp: new Date().toISOString(),
    })
  }

  // Override console methods
  console.log = (...args) => captureLog("log", args)
  console.info = (...args) => captureLog("info", args)
  console.warn = (...args) => captureLog("warn", args)
  console.error = (...args) => captureLog("error", args)

  // Helper to read stdin if provided
  // In a real terminal this blocks, but here we just provide it as a global or function
  let stdinLines = stdin ? stdin.split("\n") : []
  let currentLine = 0

  // We'll expose a global `prompt` function that reads from stdin
  self.prompt = function () {
    if (currentLine < stdinLines.length) {
      return stdinLines[currentLine++]
    }
    return null // EOF
  }

  const startTime = performance.now()

  // Wrap user code in an async IIFE so that top-level await works
  const asyncExecutor = new Function(`return (async () => { ${code} })()`)

  function finish(executionError) {
    const endTime = performance.now()

    // Restore console
    console.log = originalConsole.log
    console.info = originalConsole.info
    console.warn = originalConsole.warn
    console.error = originalConsole.error

    self.postMessage({
      logs,
      error: executionError,
      executionTime: Number((endTime - startTime).toFixed(2)),
    })
  }

  try {
    const result = asyncExecutor()

    // If it returned a Promise (which the async IIFE does), wait for it
    if (result && typeof result.then === "function") {
      result.then(() => finish(null)).catch((err) => finish(err.toString()))
    } else {
      finish(null)
    }
  } catch (err) {
    finish(err.toString())
  }
}
