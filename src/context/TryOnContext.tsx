import React, { createContext, useContext, useMemo, useState } from 'react'
import GARMENTS from '../data/garments'

type Garment = (typeof GARMENTS)[number]

type TryOnState = {
  garments: Garment[]
  selected?: Garment
  selectGarment: (id: string) => void
  originalImage?: string
  processedImage?: string
  setOriginal: (src?: string) => void
  setProcessed: (src?: string) => void
}

const TryOnCtx = createContext<TryOnState | undefined>(undefined)

export const TryOnProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selected, setSelected] = useState<Garment | undefined>(GARMENTS[0])
  const [originalImage, setOriginalImage] = useState<string | undefined>(undefined)
  const [processedImage, setProcessedImage] = useState<string | undefined>(undefined)

  const value = useMemo(() => ({
    garments: GARMENTS,
    selected,
    selectGarment: (id: string) => setSelected(GARMENTS.find((g) => g.id === id)),
    originalImage,
    processedImage,
    setOriginal: setOriginalImage,
    setProcessed: setProcessedImage
  }), [selected, originalImage, processedImage])

  return <TryOnCtx.Provider value={value}>{children}</TryOnCtx.Provider>
}

export function useTryOn() {
  const ctx = useContext(TryOnCtx)
  if (!ctx) throw new Error('useTryOn must be used within TryOnProvider')
  return ctx
}
