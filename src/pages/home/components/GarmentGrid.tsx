import GarmentCard from './GarmentCard'

export default function GarmentGrid({ garments, onTry }: { garments: any[]; onTry: (g: any) => void }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20" id="garment-grid">
      <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {garments.map((g) => (
          <GarmentCard key={g.id} img={g.image} name={g.name} price={g.price} onTry={() => onTry(g)} />
        ))}
      </div>
    </section>
  )
}
