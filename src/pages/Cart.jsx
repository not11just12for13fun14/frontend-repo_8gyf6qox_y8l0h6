import { useEffect, useMemo, useState } from 'react'
import { getCart, setCart, subtotal } from '../lib/cart'
import { Link } from 'react-router-dom'

export default function CartPage() {
  const [items, setItems] = useState([])
  const [toast, setToast] = useState(null)

  useEffect(() => {
    setItems(getCart())
  }, [])

  const total = useMemo(() => subtotal(items), [items])

  const remove = (idx) => {
    const next = items.slice()
    next.splice(idx, 1)
    setItems(next)
    setCart(next)
    setToast('Removed from cart')
    setTimeout(() => setToast(null), 1200)
  }

  return (
    <div className="space-y-6 text-white">
      <h1 className="text-2xl font-semibold">Your Cart</h1>

      {items.length === 0 ? (
        <div className="p-6 text-center rounded-2xl border border-white/10 bg-white/5">
          <p className="text-white/70">Your cart is empty.</p>
          <div className="mt-4">
            <Link to="/" className="btn btn-primary px-4 py-2">Continue shopping</Link>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {items.map((it, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-2xl border border-white/10 bg-white/5">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-white/5">
                  {it.images && it.images[0] ? (
                    <img src={it.images[0]} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="text-xs text-white/50">No image</div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{it.title}</div>
                    <div className="text-sm text-white/70">${(it.price || 0).toFixed(2)}</div>
                  </div>
                  <div className="mt-1 text-xs text-white/60">
                    Qty: {it.qty} {it.customText ? `• "${it.customText}"` : ''}
                  </div>
                </div>
                <button onClick={() => remove(i)} className="btn btn-ghost h-9 w-9 p-0" aria-label="Remove item">×</button>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
            <div className="flex items-center justify-between">
              <div className="text-white/70">Subtotal</div>
              <div className="text-lg font-semibold">${total.toFixed(2)}</div>
            </div>
            <div className="mt-4 flex gap-3">
              <Link to="/checkout" className="btn btn-primary px-4 py-2">Checkout</Link>
              <Link to="/success" className="btn btn-ghost px-4 py-2">Test Success</Link>
              <Link to="/cancel" className="btn btn-ghost px-4 py-2">Test Cancel</Link>
            </div>
          </div>
        </>
      )}

      {toast && (
        <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
          <div className="rounded-xl bg-white text-neutral-900 px-4 py-2 shadow">
            {toast}
          </div>
        </div>
      )}
    </div>
  )
}
