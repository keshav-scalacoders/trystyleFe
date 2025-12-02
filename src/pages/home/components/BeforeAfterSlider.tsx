import React, { useRef, useState } from 'react'

export default function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement | null>(null)

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    setPos(pct)
  }

  return (
    <div className="w-full max-w-[900px] mx-auto py-4">
      <div ref={ref} className="relative overflow-hidden rounded-xl border border-white/40 shadow-md" onMouseMove={(e) => e.buttons && handleMove(e)} onTouchMove={(e) => handleMove(e)}>
        <img src={before} alt="before" className="w-full h-auto block" />
        <div style={{ width: `${pos}%` }} className="absolute inset-y-0 left-0 overflow-hidden">
          <img src={after} alt="after" className="w-full h-auto block transform transition-scale duration-200" />
        </div>
        <div style={{ left: `${pos}%` }} className="absolute top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full -translate-x-1/2 border border-slate-200 shadow">
          <div className="w-1.5 h-8 bg-primary-500 rounded" />
        </div>
      </div>
    </div>
  )
}
