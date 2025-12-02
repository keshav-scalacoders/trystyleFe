import { MoveUpRight } from "lucide-react"

export default function GarmentCard({
  img,
  name,
  price,
  onTry
}: {
  img: string
  name: string
  price: string
  onTry: () => void
}) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-transform transform hover:scale-105">
      <div className="relative aspect-3/4 w-full overflow-hidden group transition-all">
        <img src={img} alt={name} className="object-cover w-full h-full" />
          <div className="absolute inset-0 opacity-0 hover:opacity-90 transition-opacity bg-black/30 flex items-end justify-center p-4">
            <button aria-label={`Try ${name} on`} onClick={onTry} className="cursor-pointer -translate-x-1/2 group-hover:translate-x-0 bg-secondary px-6 min-h-10 hover: rounded-xl text-primary font-medium shadow-md hover:scale-110 transform transition duration-200 hover:bg-primary-600 flex items-center gap-2">Try On <MoveUpRight size={12} /></button>
        </div>
      </div>
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="font-semibold text-sm">{name}</div>
        <div className="text-primary-500 font-bold">{price}</div>
      </div>
    </div>
  )
}
