import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <div className="card rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      <Link to={`/products/${product.slug}`} className="block">
        <div className="aspect-[4/3] w-full overflow-hidden bg-white/5">
          <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
        </div>
        <div className="flex items-center justify-between p-4">
          <div>
            <div className="font-medium text-white">{product.title}</div>
            <div className="text-sm text-white/70">${product.price.toFixed(2)}</div>
          </div>
          <div className="rounded-lg bg-white/10 px-2 py-1 text-xs text-white">View</div>
        </div>
      </Link>
    </div>
  )
}
