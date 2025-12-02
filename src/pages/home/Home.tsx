import { useState } from 'react'
import Hero from './components/Hero'
import GarmentGrid from './components/GarmentGrid'
import UploadModal from './components/UploadModal'
import { TryOnProvider, useTryOn } from '../../context/TryOnContext'
import { useAppStore } from '@/lib/stores/app-store'

const FooterNote = () => (
  <section className="mx-auto px-4 py-4 text-center text-sm text-slate-700 border-t-2">Designed for a premium, minimal fashion shopping experience.</section>
)

function AppContent() {
  const [showUpload, setShowUpload] = useState(false)
  const { garments, selectGarment, selected, setOriginal, setProcessed } = useTryOn()
  const { setModelImage, setClothingImage } = useAppStore()

  const openTryOn = (g: any) => {
    selectGarment(g.id)
    setShowUpload(true)
  }

  const handleSelectFile = async (src: File | string) => {
    if (src === 'sample') {
      const original = garments[0].thumb
      setOriginal(original)
      setProcessed(undefined)
      return
    }

    if (src instanceof File) {
      const url = URL.createObjectURL(src)
      setOriginal(url)
      try {
        setModelImage(src, url)
      } catch (e) {
        console.warn('setModelImage failed', e)
      }

      try {
        if (selected?.image) {
          const res = await fetch(selected.image)
          const blob = await res.blob()
          const clothingFile = new File([blob], `${selected.id}.jpg`, { type: blob.type || 'image/jpeg' })
          setClothingImage(clothingFile, selected.image, 'Top')
        }
      } catch (e) {
      }

      setProcessed(undefined)
      return
    }
  }

  return (
    <div>
      <main className="">
        <Hero />
        <GarmentGrid garments={garments} onTry={openTryOn} />
        <FooterNote />
      </main>

      <UploadModal open={showUpload} onClose={() => setShowUpload(false)} onSelect={handleSelectFile} />
    </div>
  )
}

export default function Home() {
  return (
    <TryOnProvider>
      <AppContent />
    </TryOnProvider>
  )
}
