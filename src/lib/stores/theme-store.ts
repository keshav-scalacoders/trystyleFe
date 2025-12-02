import { create } from 'zustand'

type ThemeState = {
  primary: string
  secondary: string
  fontFamily: string
  fontSizePx: number
  init: () => void
  setPrimary: (hex: string) => void
  setSecondary: (hex: string) => void
  setFontFamily: (font: string) => void
  setFontSizePx: (size: number) => void
  reset: () => void
}

const LOCAL_KEY = 'trystyle:theme'

function calcContrastForeground(hex: string) {
  // very small heuristic to pick white or black based on luminance
  try {
    const cleaned = hex.replace('#', '').trim()
    const r = parseInt(cleaned.substring(0,2), 16)
    const g = parseInt(cleaned.substring(2,4), 16)
    const b = parseInt(cleaned.substring(4,6), 16)
    // relative luminance
    const l = (0.2126*r + 0.7152*g + 0.0722*b) / 255
    return l > 0.56 ? '#000000' : '#ffffff'
  } catch (e) {
    return '#ffffff'
  }
}

function applyThemeToDocument(state: Partial<Pick<ThemeState, 'primary' | 'secondary' | 'fontFamily' | 'fontSizePx'>>) {
  if (typeof document === 'undefined') return

  if (state.primary) {
    document.documentElement.style.setProperty('--primary', state.primary)
    const fg = calcContrastForeground(state.primary)
    document.documentElement.style.setProperty('--primary-foreground', fg)
  }
  if (state.secondary) {
    document.documentElement.style.setProperty('--secondary', state.secondary)
    const fg = calcContrastForeground(state.secondary)
    document.documentElement.style.setProperty('--secondary-foreground', fg)
  }
  if (state.fontFamily) document.documentElement.style.setProperty('--font-family', state.fontFamily)
  if (typeof state.fontSizePx === 'number') document.documentElement.style.setProperty('--global-font-size', `${state.fontSizePx}px`)
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  // defaults will be set when init() runs on client mount
  primary: '#6b7280',
  secondary: '#f3f4f6',
  fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
  fontSizePx: 16,

  init() {
    try {
      // load saved from localStorage if present
      const raw = localStorage.getItem(LOCAL_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        set(parsed)
        applyThemeToDocument(parsed)
        return
      }

      // Otherwise, initialize from computed styles (keeps design in sync)
      const style = getComputedStyle(document.documentElement)
      const primary = style.getPropertyValue('--primary')?.trim() || '#6b7280'
      const secondary = style.getPropertyValue('--secondary')?.trim() || '#f3f4f6'
      const fontFamily = style.getPropertyValue('--font-family')?.trim() || 'Inter, system-ui, sans-serif'
      const fs = style.getPropertyValue('--global-font-size')?.trim() || '16px'
      const fontSizePx = parseInt(fs, 10) || 16

      const initial = { primary, secondary, fontFamily, fontSizePx }
      set(initial)
      applyThemeToDocument(initial)
    } catch (e) {
      // ignore
    }
  },

  setPrimary(hex) {
    set(() => ({ primary: hex }))
    applyThemeToDocument({ primary: hex })
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify({ ...get(), primary: hex })) } catch (e) {}
  },

  setSecondary(hex) {
    set(() => ({ secondary: hex }))
    applyThemeToDocument({ secondary: hex })
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify({ ...get(), secondary: hex })) } catch (e) {}
  },

  setFontFamily(font) {
    set(() => ({ fontFamily: font }))
    applyThemeToDocument({ fontFamily: font })
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify({ ...get(), fontFamily: font })) } catch (e) {}
  },

  setFontSizePx(size) {
    set(() => ({ fontSizePx: size }))
    applyThemeToDocument({ fontSizePx: size })
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify({ ...get(), fontSizePx: size })) } catch (e) {}
  },

  reset() {
    // remove localStorage and reset to defaults read from CSS
    try { localStorage.removeItem(LOCAL_KEY) } catch (e) {}
    const style = getComputedStyle(document.documentElement)
    const primary = style.getPropertyValue('--primary')?.trim() || '#6b7280'
    const secondary = style.getPropertyValue('--secondary')?.trim() || '#f3f4f6'
    const fontFamily = style.getPropertyValue('--font-family')?.trim() || 'Inter, system-ui, sans-serif'
    const fs = style.getPropertyValue('--global-font-size')?.trim() || '16px'
    const fontSizePx = parseInt(fs, 10) || 16
    const initial = { primary, secondary, fontFamily, fontSizePx }
    set(initial)
    applyThemeToDocument(initial)
  }
}))

export default useThemeStore
