import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export type ThemeType = 'vs-dark' | 'atom-dark' | 'catppuccin'
export type FontType = 'Monaco' | 'JetBrains Mono' | 'Geist Mono'

const DEFAULT_CODE = `// Welcome to the JavaScript Playground
// You can use standard JavaScript and web APIs

function calculateFactorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * calculateFactorial(n - 1);
}

console.log("Starting calculation...");
const result = calculateFactorial(5);
console.log(\`Factorial of 5 is: \${result}\`);

// Demonstrate logging formatting
console.log("An array:");
console.log([1, 2, "three", { four: 4 }]);

// Error handling demo
try {
  throw new Error("This is an expected demo error");
} catch (e) {
  console.error(e.message);
}
`

// Persistent Atoms
export const codeAtom = atomWithStorage<string>('play-code', DEFAULT_CODE)
export const themeAtom = atomWithStorage<ThemeType>('play-theme', 'vs-dark')
export const fontAtom = atomWithStorage<FontType>('play-font', 'Monaco')
export const fontSizeAtom = atomWithStorage<number>('play-fontSize', 14)
export const ligaturesAtom = atomWithStorage<boolean>('play-ligatures', true)

// Layout states (persisted as array of numbers [editorPercentage, rightPercentage])
export const horizontalLayoutAtom = atomWithStorage<number[]>('play-h-layout', [60, 40])
// Right pane layout variables [topPercentage, bottomPercentage]
export const verticalLayoutAtom = atomWithStorage<number[]>('play-v-layout', [70, 30])

// Transient Atoms (not persisted)
export interface LogEntry {
  type: 'log' | 'error' | 'warn' | 'info' | 'system'
  message: string
  timestamp: string
}

export const logsAtom = atom<LogEntry[]>([])
export const isExecutingAtom = atom<boolean>(false)
export const executionTimeAtom = atom<number | null>(null)
