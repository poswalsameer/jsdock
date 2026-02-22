export const THEMES = {
  'vs-dark': {
    base: 'vs-dark',
    inherit: true,
    rules: [
      // Comments — muted but readable
      { token: 'comment', foreground: '6a737d' },
      // Keywords — bright blue, the VS Code signature
      { token: 'keyword', foreground: '4ec9f0' },
      { token: 'keyword.operator', foreground: '4ec9f0' },
      // Strings — warm gold-orange (VS Code classic green-ish shifted warmer)
      { token: 'string', foreground: 'ce9178' },
      { token: 'string.escape', foreground: 'd7ba7d' },
      // Numbers — vibrant green
      { token: 'number', foreground: 'b5cea8' },
      // Types & classes — yellow-gold
      { token: 'type', foreground: '4ec9f0' },
      { token: 'type.identifier', foreground: '4ec9f0' },
      // Functions — bright yellow
      { token: 'function', foreground: 'dcdcaa' },
      { token: 'identifier', foreground: '9cdcfe' },
      // Variables
      { token: 'variable', foreground: '9cdcfe' },
      { token: 'variable.parameter', foreground: '9cdcfe' },
      // Operators
      { token: 'operator', foreground: 'd4d4d4' },
      // Delimiters
      { token: 'delimiter', foreground: 'd4d4d4' },
      { token: 'delimiter.bracket', foreground: 'ffd700' },
    ],
    colors: {
      // Editor surfaces — deep charcoal, matches --background: #141414
      'editor.background': '#141414',
      'editor.foreground': '#e2e2e2',
      // Caret
      'editorCursor.foreground': '#1a7fd4',
      // Line highlights & selection
      'editor.lineHighlightBackground': '#1e1e1e',
      'editor.lineHighlightBorder': '#1e1e1e',
      'editor.selectionBackground': '#264f78',
      'editor.inactiveSelectionBackground': '#3a3d41',
      // Word highlight on double-click
      'editor.wordHighlightBackground': '#1e3a5f',
      'editor.wordHighlightStrongBackground': '#22456e',
      // Line numbers
      'editorLineNumber.foreground': '#4a4a4a',
      'editorLineNumber.activeForeground': '#8a8a8a',
      // Gutter & widgets
      'editorGutter.background': '#141414',
      'editorWidget.background': '#1c1c1c',
      'editorWidget.border': '#2e2e2e',
      // Indent guides
      'editorIndentGuide.background': '#2e2e2e',
      'editorIndentGuide.activeBackground': '#404040',
      // Minimap
      'minimap.background': '#141414',
      // Scrollbar
      'scrollbarSlider.background': '#2e2e2e',
      'scrollbarSlider.hoverBackground': '#3a3a3a',
      'scrollbarSlider.activeBackground': '#1a7fd4',
    }
  },
  'atom-dark': {
    base: 'vs-dark',
    inherit: true,
    rules: [
      // ── Exact token colors from akamud.vscode-theme-onedark ──────────

      // Comments
      { token: 'comment', foreground: '5C6370' },

      // Keywords — purple
      { token: 'keyword', foreground: 'C678DD' },
      { token: 'keyword.control', foreground: 'C678DD' },
      // JS/TS operators are cyan (source.js keyword.operator → #56B6C2)
      { token: 'keyword.operator', foreground: '56B6C2' },

      // Storage (var/let/const/function keyword) — purple
      { token: 'storage', foreground: 'C678DD' },

      // Strings — green
      { token: 'string', foreground: '98C379' },
      // Escape sequences — cyan
      { token: 'string.escape', foreground: '56B6C2' },
      { token: 'constant.character.escape', foreground: '56B6C2' },

      // Numbers & constants — orange
      { token: 'number', foreground: 'D19A66' },
      { token: 'constant', foreground: 'D19A66' },
      { token: 'constant.numeric', foreground: 'D19A66' },

      // Functions (entity.name.function) — blue
      { token: 'function', foreground: '61AFEF' },
      { token: 'support.function', foreground: '56B6C2' },

      // Types & classes — yellow
      { token: 'type', foreground: 'E5C07B' },
      { token: 'type.identifier', foreground: 'E5C07B' },
      { token: 'class', foreground: 'E5C07B' },
      { token: 'support.class', foreground: 'E5C07B' },

      // Variables — red/coral (matches variable scope in extension)
      { token: 'variable', foreground: 'E06C75' },
      // Parameter variables — foreground (matches variable.parameter → #ABB2BF)
      { token: 'variable.parameter', foreground: 'ABB2BF' },

      // Identifiers (non-classified) — foreground
      { token: 'identifier', foreground: 'ABB2BF' },

      // Operators & delimiters — foreground
      { token: 'operator', foreground: '56B6C2' },
      { token: 'delimiter', foreground: 'ABB2BF' },
      { token: 'delimiter.bracket', foreground: 'ABB2BF' },

      // Regexp — cyan
      { token: 'regexp', foreground: '56B6C2' },
    ],
    colors: {
      // ── Exact editor chrome from akamud One Dark extension ────────────
      'editor.background': '#282C34',
      'editor.foreground': '#ABB2BF',

      // Cursor — focusBorder / badge color
      'editorCursor.foreground': '#528BFF',

      // Line highlight — from extension: #99BBFF0A (very subtle)
      'editor.lineHighlightBackground': '#99BBFF0A',
      'editor.lineHighlightBorder': '#99BBFF0A',

      // Selection
      'editor.selectionBackground': '#3E4451',
      'editor.inactiveSelectionBackground': '#3E445166',

      // Find match
      'editor.findMatchHighlightBackground': '#528BFF3D',

      // Line numbers
      'editorLineNumber.foreground': '#636D83',
      'editorLineNumber.activeForeground': '#ABB2BF',

      // Gutter
      'editorGutter.background': '#282C34',

      // Widgets / autocomplete — editorSuggestWidget values
      'editorWidget.background': '#21252B',
      'editorWidget.border': '#3A3F4B',
      'editorHoverWidget.background': '#21252B',
      'editorHoverWidget.border': '#181A1F',
      'editorSuggestWidget.background': '#21252B',
      'editorSuggestWidget.border': '#181A1F',
      'editorSuggestWidget.selectedBackground': '#2C313A',

      // Indent guides
      'editorIndentGuide.background': '#ABB2BF26',
      'editorIndentGuide.activeBackground': '#626772',

      // Minimap
      'minimap.background': '#282C34',

      // Scrollbar — exact from extension JSON
      'scrollbarSlider.background': '#4E566680',
      'scrollbarSlider.hoverBackground': '#5A637580',
      'scrollbarSlider.activeBackground': '#747D9180',
    }
  },
  'catppuccin': {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6c7086' },
      { token: 'keyword', foreground: 'cba6f7' },
      { token: 'string', foreground: 'a6e3a1' },
      { token: 'number', foreground: 'fab387' },
      { token: 'identifier', foreground: '89b4fa' },
      { token: 'type', foreground: 'f9e2af' },
      { token: 'function', foreground: '89b4fa' },
      { token: 'variable', foreground: 'cdd6f4' },
    ],
    colors: {
      'editor.background': '#1e1e2e',
      'editor.foreground': '#cdd6f4',
      'editorCursor.foreground': '#f5e0dc',
      'editor.lineHighlightBackground': '#313244',
      'editorLineNumber.foreground': '#45475a',
      'editorSelection.background': '#585b70',
      'editorIndentGuide.background': '#313244',
      'editorIndentGuide.activeBackground': '#45475a',
    }
  }
}
