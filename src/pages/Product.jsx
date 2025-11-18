import { useParams, Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { products } from '../lib/products'
import { addToCart } from '../lib/cart'

export default function Product() {
  const { slug } = useParams()
  const product = useMemo(() => products.find(p => p.slug === slug), [slug])
  const [qty, setQty] = useState(1)
  const [customText, setCustomText] = useState('')
  const [activeImage, setActiveImage] = useState(0)
  const [uploads, setUploads] = useState([])
  const [toast, setToast] = useState(null)

  if (!product) return <div className="text-white">Not found.</div>

  const inc = () => setQty(q => Math.min(10, q + 1))
  const dec = () => setQty(q => Math.max(1, q - 1))

  const onFiles = (files) => {
    const arr = Array.from(files || [])
    const previews = arr.map(f => ({ file: f, url: URL.createObjectURL(f) }))
    setUploads(prev => [...prev, ...previews].slice(0, 5))
  }

  const onAdd = () => {
    addToCart({
      product: product.slug,
      title: product.title,
      price: product.price,
      qty,
      customText,
      images: uploads.length ? uploads.map(u => u.url) : product.images,
    })
    setToast('Added to cart')
    setTimeout(() => setToast(null), 1200)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 text-white">
      <div>
        <div className="rounded-xl overflow-hidden border border-white/10 aspect-[4/3] bg-white/5">
          <img src={(uploads[0]?.url) || product.images[activeImage] || product.image} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {uploads.map((u, i) => (
            <button key={`u-${i}`} onClick={() => setActiveImage(0)} className="h-16 w-16 overflow-hidden rounded-lg border border-white/10">
              <img src={u.url} alt="upload" className="h-full w-full object-cover" />
            </button>
          ))}
          {product.images?.map((src, i) => (
            <button key={i} onClick={() => setActiveImage(i)} className={`h-16 w-16 overflow-hidden rounded-lg border ${activeImage===i ? 'border-white/50' : 'border-white/10'}`}>
              <img src={src} alt="thumb" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="mt-1 text-white/70">${product.price.toFixed(2)}</p>
        </div>

        <div className="space-y-3">
          <label className="block text-sm text-white/80">Your instructions / engraving (optional)</label>
          <textarea className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm" value={customText} onChange={e=>setCustomText(e.target.value)} rows={4} placeholder="e.g. Name to engrave, size preferences…" />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-white/80">Reference images (optional)</label>
          <div className="flex items-center gap-3">
            <input id="file" type="file" accept="image/*" multiple onChange={e=>onFiles(e.target.files)} className="hidden" />
            <label htmlFor="file" className="btn btn-ghost px-3 py-2 cursor-pointer">Upload images</label>
            <div className="text-xs text-white/60">Up to 5</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-xl border border-white/10 bg-white/5">
            <button onClick={dec} className="px-3 py-2">−</button>
            <input type="number" min={1} max={10} value={qty} onChange={e=>setQty(Math.max(1, Math.min(10, parseInt(e.target.value||'1'))))} className="w-16 bg-transparent text-center" />
            <button onClick={inc} className="px-3 py-2">+</button>
          </div>
          <button onClick={onAdd} className="btn btn-primary px-4 py-2">Add to Cart</button>
          <Link to={`/custom-request?product=${encodeURIComponent(product.title)}`} className="btn btn-ghost px-4 py-2">Request fully custom</Link>
        </div>

        <div className="text-sm text-white/60">
          Ships in 3–5 business days. Free returns within 30 days.
        </div>
      </div>

      {toast && (
        <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
          <div className="rounded-xl bg-white text-neutral-900 px-4 py-2 shadow">{toast} • <Link to="/cart" className="underline">View cart</Link></div>
        </div>
      )}
    </div>
  )
}
