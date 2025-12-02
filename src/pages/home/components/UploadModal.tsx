import React, { useRef, useState } from 'react'
import { Camera } from 'lucide-react'
import { useTryOn } from '@/context/TryOnContext'
import { useAppStore } from '@/lib/stores/app-store'
import { saveAs } from 'file-saver'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/lib/stores/auth-store'
import { LoginModal } from '@/components/login-modal'
import { ShareButton, type ShareButtonProps,} from '@/components/animate-ui/components/community/share-button'

type ShareButtonDemoProps = {
  size?: ShareButtonProps['size'];
  icon?: ShareButtonProps['icon'];
};

export default function UploadModal({
  open,
  onClose,
  onSelect
}: {
  open: boolean
  onClose: () => void
  onSelect: (file: File | string) => void
}) {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const { selected, originalImage, processedImage, setProcessed } = useTryOn()
  const { setModelImage, setClothingImage } = useAppStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const { isLoggedIn } = useAuthStore();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  if (!open) return null

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onSelect(e.dataTransfer.files[0])
    }
  }

  const handlePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) onSelect(f)
  }

  async function handleTryOn() {
    if (!selected) return

    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    try {
      setIsProcessing(true)

      // ensure original model exists as a File in app store
      if (originalImage && originalImage.startsWith('blob:') === false) {
        const resp = await fetch(originalImage)
        const b = await resp.blob()
        const file = new File([b], `model-${Date.now()}.jpg`, { type: b.type || 'image/jpeg' })
        setModelImage(file, originalImage)
      }

      // set clothing file in store if not already
      if (selected.image) {
        const resp = await fetch(selected.image)
        const b = await resp.blob()
        const file = new File([b], `${selected.id}.jpg`, { type: b.type || 'image/jpeg' })
        setClothingImage(file, selected.image, 'Top')
      }

      // simulate processing — the demo uses a pre-baked tryOn image on the garment
      await new Promise((r) => setTimeout(r, 800))
      setProcessed(selected.tryOn)
    } catch (e) {
      console.error('Try-on failed:', e)
      alert('Try on failed. See console for details.')
    } finally {
      setIsProcessing(false)
    }
  }

  async function handleDownload() {
    if (!processedImage) return
    try {
      const res = await fetch(processedImage)
      const blob = await res.blob()
      const filename = `tryon-result-${Date.now()}.png`
      saveAs(blob, filename)
    } catch (e) {
      console.error(e)
      alert('Download failed')
    }
  }

  async function handleShare() {
    if (!processedImage) return
    if (navigator?.share) {
      try {
        await navigator.share({ title: 'My Try-On Result', url: processedImage })
      } catch (e) {
        console.warn('Share failed', e)
      }
      return
    }

    try {
      await navigator.clipboard.writeText(processedImage)
      alert('Result URL copied to clipboard')
    } catch (e) {
      console.warn('Copy failed', e)
      alert(processedImage)
    }
  }

  function clearProcessed() {
    setProcessed(undefined)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 left-4 text-primary-600 font-semibold"> Back</button>

        <div className="flex flex-col items-center justify-center py-8">
          {/* If there's no uploaded photo yet show the large dropzone */}



          {!processedImage && <div className="w-[90%] sm:w-[520px] lg:w-[520px] mx-auto mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start bg-slate-50 rounded-2xl p-4 border border-white/20 shadow-sm">
              <div className="flex flex-col items-center gap-2">
                <div className="text-sm font-semibold text-slate-700">Your Photo</div>
                {!originalImage ? <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
                  className=" border-2 border-dashed border-primary-200 rounded-2xl flex flex-col items-center justify-center gap-6 mx-auto p-6"
                  aria-label="Upload your photo dropzone"
                >
                  <Camera className="text-primary-500" />
                  <div className="font-semibold">Upload your photo</div>
                  <div className="text-sm text-slate-500 text-center px-6">Full-body or half-body works best · We don't store your photos</div>

                  <label htmlFor="upload-input" className="shadow-black text-primary hover:shadow-md px-4 py-3 min-h-12 rounded-full inline-flex items-center justify-center cursor-pointer shadow">Choose file</label>

                  <input id="upload-input" ref={fileRef} onChange={handlePick} accept="image/png,image/jpeg,image/webp" type="file" className="sr-only" />
                </div> : <img src={originalImage} alt="uploaded" className="w-full object-contain min-h-80 rounded-md border" />}
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="text-sm font-semibold text-slate-700">Clothing</div>
                {selected && <img src={selected.image} alt={selected.name} className="w-full object-contain min-h-80 rounded-md border" />}
              </div>
            </div>

            {originalImage && <div className="mt-3 flex items-center justify-center gap-3">
              <label htmlFor="upload-input" className="px-4 py-2 bg-white/90 border border-neutral-200 text-slate-700 rounded-full cursor-pointer hover:shadow">Change / Upload</label>
              <button onClick={handleTryOn} disabled={isProcessing} className="px-6 py-2 bg-secondary cursor-pointer border shadow-black hover:shadow text-primary rounded-lg hover:opacity-95">{isProcessing ? 'Trying...' : 'Try On'}</button>
            </div>}

            <input id="upload-input" ref={fileRef} onChange={handlePick} accept="image/png,image/jpeg,image/webp" type="file" className="sr-only" />
          </div>}

          {/* Duplicate preview block removed — the compact preview above replaces this UI when a photo exists */}

          {/* If a processed result is available show it in place */}
          {processedImage && (
            <div className="w-[90%] sm:w-[500px] lg:w-[500px] mx-auto mt-6 text-center">
              <div className="font-semibold mb-3">Try-On Result</div>
              <div className="bg-black/5 rounded-xl p-3">
                <img src={processedImage} alt="result" className="w-full h-80 object-contain rounded-lg shadow-lg" />
              </div>

              <div className="mt-4 flex items-center justify-center gap-3">
                <Button variant={"default"} onClick={handleDownload} className="">Download</Button>
                <ShareButton size={"md"} icon={"prefix"}>
                  Share
                </ShareButton>
                <button onClick={clearProcessed} className="px-4 py-2 bg-transparent border rounded-full">Back</button>
              </div>
            </div>
          )}

        </div>
      </div>
      <LoginModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        onLoginSuccess={() => { }}
      />
    </div>
  )
}
