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

  // Track async operations
  const originalSetTimeout = self.setTimeout
  const originalClearTimeout = self.clearTimeout
  const originalSetInterval = self.setInterval
  const originalClearInterval = self.clearInterval

  const pendingTimeouts = new Set()
  const pendingIntervals = new Set()
  let isMainFinished = false
  let finalError = null

  function attemptFinish() {
    if (
      isMainFinished &&
      pendingTimeouts.size === 0 &&
      pendingIntervals.size === 0
    ) {
      finish(finalError)
    }
  }

  self.setTimeout = function (callback, delay, ...args) {
    const id = originalSetTimeout(
      (...cbArgs) => {
        pendingTimeouts.delete(id)
        try {
          callback(...cbArgs)
        } finally {
          attemptFinish()
        }
      },
      delay,
      ...args,
    )
    pendingTimeouts.add(id)
    return id
  }

  self.clearTimeout = function (id) {
    pendingTimeouts.delete(id)
    originalClearTimeout(id)
    attemptFinish()
  }

  self.setInterval = function (callback, delay, ...args) {
    const id = originalSetInterval(
      (...cbArgs) => {
        callback(...cbArgs)
      },
      delay,
      ...args,
    )
    pendingIntervals.add(id)
    return id
  }

  self.clearInterval = function (id) {
    pendingIntervals.delete(id)
    originalClearInterval(id)
    attemptFinish()
  }

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
      result
        .then(() => {
          isMainFinished = true
          attemptFinish()
        })
        .catch((err) => {
          isMainFinished = true
          finalError = err.toString()
          attemptFinish()
        })
    } else {
      isMainFinished = true
      attemptFinish()
    }
  } catch (err) {
    isMainFinished = true
    finalError = err.toString()
    attemptFinish()
  }
}
