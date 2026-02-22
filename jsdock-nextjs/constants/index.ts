export const DEFAULT_CODE = `// Welcome to the JavaScript Playground
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

export const FONT_FAMILY_MAP: Record<string, string> = {
  'Monaco': 'Monaco, Menlo, Consolas, "Courier New", monospace',
  'JetBrains Mono': 'var(--font-jetbrains-mono), monospace',
  'Geist Mono': 'var(--font-geist-mono), monospace',
}

export const FONT_MAP: Record<string, string> = {
  'Monaco': 'Monaco, Menlo, Consolas, "Courier New", monospace',
  'JetBrains Mono': 'var(--font-jetbrains-mono), monospace',
  'Geist Mono': 'var(--font-geist-mono), monospace',
}
