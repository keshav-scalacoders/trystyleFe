import React from 'react'
import BeforeAfterSlider from './BeforeAfterSlider'
import ThumbnailRail from './ThumbnailRail'
import { Heart, Share2 } from 'lucide-react'

export default function ResultPage({
  original,
  processed,
  garment,
  suggestions,
  onChangePhoto
  , onProceedToTryOn
}: {
  original: string
  processed: string
  garment: any
  suggestions: any[]
  onChangePhoto: () => void
  onProceedToTryOn?: () => void | Promise<void>
}) {
  const [current, setCurrent] = React.useState(processed)
  const [activeId, setActive] = React.useState(garment.id)

  React.useEffect(() => {
    setCurrent(processed)
    setActive(garment.id)
  }, [processed, garment.id])

  const pick = (id: any) => {
    const g = suggestions.find((s) => s.id === id)
    if (g) {
      setCurrent(g.tryOn)
      setActive(g.id)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF1EB]">
      <header className="fixed inset-x-0 top-0 bg-white/90 z-40 border-b border-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-primary-600 cursor-pointer font-semibold" onClick={onChangePhoto}>← Change photo</div>
          <div className="text-sm font-semibold">{garment.name} — <span className="text-primary-500 ml-2">{garment.price}</span></div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-slate-100"><Heart className="text-slate-700" /></button>
            <button className="p-2 rounded-full hover:bg-slate-100"><Share2 className="text-slate-700" /></button>
          </div>
        </div>
      </header>

      <main className="pt-20 max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="bg-white p-4 rounded-xl border border-white/50 shadow-md" style={{maxWidth: 600}}>
              <img src={current} alt="try-on" className="w-full object-contain rounded-md border-8 border-white shadow-xl animate-fade-in scale-[.98] md:scale-100" />
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="my-4">
              <h3 className="text-lg font-bold">Preview</h3>
              <p className="text-sm text-slate-600 mt-2">Try different looks and compare with your original photo.</p>
            </div>

            <div className="mt-6">
              <BeforeAfterSlider before={original} after={processed} />
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Try more styles</h4>
              <ThumbnailRail items={suggestions} activeId={activeId} onPick={pick} />
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-4 left-0 right-0 max-w-6xl mx-auto px-4 py-3 flex items-center justify-between bg-white rounded-full shadow-lg border border-white/50">
        <div className="flex items-center gap-3">
          <button className="px-4 py-3 border border-primary-500 text-primary-600 rounded-full">Add to Cart</button>
          <button className="px-6 py-3 bg-primary-500 text-white rounded-full">Buy Now</button>
        </div>

        <div className="flex items-center gap-3">
          {onProceedToTryOn && (
            <button onClick={onProceedToTryOn} className="px-5 py-3 bg-white/90 border border-primary-500 rounded-full text-primary-700 font-semibold hover:bg-white">Use Advanced Try-On</button>
          )}
        </div>
      </div>
    </div>
  )
}
