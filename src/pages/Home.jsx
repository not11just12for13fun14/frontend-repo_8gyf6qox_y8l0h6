import ProductCard from '../components/ProductCard'
import { products } from '../lib/products'

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl text-white">Custom 3D Prints</h1>
        <p className="mx-auto mt-3 max-w-xl text-white/70">Personalize your world</p>
      </section>
      <section id="catalog" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </section>
    </div>
  )
}
