import React from 'react'

export default function ThumbnailRail({ items, activeId, onPick }: { items: any[]; activeId?: string | number; onPick: (id: any) => void }) {
  return (
    <div className="w-full overflow-x-auto py-3 px-2 sm:px-0">
      <div className="flex gap-3 items-center">
        {items.map((it) => (
          <button key={it.id} onClick={() => onPick(it.id)} className={`flex-none rounded-xl overflow-hidden border-2 ${activeId === it.id ? 'border-primary-500 scale-110' : 'border-transparent'} transform transition-all duration-200 ease-out`} aria-label={`Try ${it.name}`}>
            <img src={it.thumb} alt={it.name} className="h-20 w-14 object-cover block" />
          </button>
        ))}
      </div>
    </div>
  )
}
