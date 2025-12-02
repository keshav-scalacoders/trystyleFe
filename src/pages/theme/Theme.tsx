import React from 'react'
import { useThemeStore } from '@/lib/stores/theme-store'
import { Button } from '@/components/ui/button'

const FONTS = [
  { label: 'System (default)', value: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' },
  { label: 'Poppins', value: 'Poppins, Inter, ui-sans-serif, system-ui' },
  { label: 'Roboto', value: 'Roboto, Inter, ui-sans-serif, system-ui' },
  { label: 'Georgia (serif)', value: 'Georgia, serif' }
]

export default function ThemePage() {
  const { primary, secondary, fontFamily, fontSizePx, setPrimary, setSecondary, setFontFamily, setFontSizePx, reset } = useThemeStore();

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">Theme settings</h1>

      <p className="mb-6 text-sm text-muted-foreground">Change the app primary/secondary colors, font family and base font size. Changes apply immediately and are saved to localStorage.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium">Primary color</label>
          <div className="flex gap-3 items-center">
            <input type="color" value={primary} onChange={(e)=> setPrimary(e.target.value)} className="h-10 w-14 p-0 border-0 rounded" />
            <input value={primary} onChange={(e)=> setPrimary(e.target.value)} className="flex-1 px-3 py-2 rounded border bg-transparent" />
          </div>

          <label className="block text-sm font-medium">Secondary color</label>
          <div className="flex gap-3 items-center">
            <input type="color" value={secondary} onChange={(e)=> setSecondary(e.target.value)} className="h-10 w-14 p-0 border-0 rounded" />
            <input value={secondary} onChange={(e)=> setSecondary(e.target.value)} className="flex-1 px-3 py-2 rounded border bg-transparent" />
          </div>

          <label className="block text-sm font-medium">Font</label>
          <select value={fontFamily} onChange={(e)=> setFontFamily(e.target.value)} className="w-full px-3 py-2 rounded border bg-transparent">
            {FONTS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>

          <label className="block text-sm font-medium">Base font size: {fontSizePx}px</label>
          <input type="range" min={12} max={22} value={fontSizePx} onChange={(e)=> setFontSizePx(Number(e.target.value))} className="w-full" />

          <div className="flex gap-3 mt-3">
            <Button size="sm" onClick={() => reset()}>Reset</Button>
            <Button size="sm" variant="outline" onClick={() => {
              // copy code snippet for users
              const snippet = `--primary: ${primary}; --secondary: ${secondary}; --font-family: ${fontFamily}; --global-font-size: ${fontSizePx}px;`
              navigator.clipboard?.writeText(snippet)
            }}>Copy CSS</Button>
          </div>
        </div>

        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-xl font-semibold mb-3">Live preview</h2>
          <div className="p-4 rounded-md" style={{ background: 'var(--background)' }}>
            <div style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--global-font-size)' }}>
              <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--primary)' }}>Heading — Primary color</h3>
              <p className="mb-4 text-muted-foreground">This is a paragraph demonstrating the font and base font size. Use the slider to change the size.</p>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded text-white" style={{ background: 'var(--primary)' }}>Primary</button>
                <button className="px-4 py-2 rounded" style={{ background: 'var(--secondary)', color: 'var(--secondary-foreground, black)' }}>Secondary</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
