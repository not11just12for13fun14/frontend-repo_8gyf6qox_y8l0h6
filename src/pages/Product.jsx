import { useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { products } from '../lib/products'

export default function Product() {
  const { slug } = useParams()
  const product = useMemo(() => products.find(p => p.slug === slug), [slug])
  const [qty, setQty] = useState(1)
  const [customText, setCustomText] = useState('')

  if (!product) return <div className="text-white">Not found.</div>

  return (
    <div className="grid gap-8 lg:grid-cols-2 text-white">
      <div className="rounded-xl overflow-hidden border border-white/10">
        <img src={product.image} alt="" className="w-full h-auto object-cover" />
      </div>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="mt-1 text-white/70">${product.price.toFixed(2)}</p>
        </div>
        <div className="space-y-3">
          <label className="block text-sm text-white/80">Your instructions / text to engrave (optional)</label>
          <textarea className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm" value={customText} onChange={e=>setCustomText(e.target.value)} rows={4} />
        </div>
        <div className="flex items-center gap-3">
          <input type="number" min={1} max={10} value={qty} onChange={e=>setQty(parseInt(e.target.value||'1'))} className="w-24 rounded-xl border border-white/10 bg-white/5 px-3 py-2" />
          <button className="btn btn-primary px-4 py-2">Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
