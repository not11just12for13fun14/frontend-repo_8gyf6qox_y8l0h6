import { useEffect, useMemo, useState } from 'react'
import { getCart, setCart, subtotal } from '../lib/cart'
import { useNavigate, Link } from 'react-router-dom'

export default function Checkout() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [shipping, setShipping] = useState('standard')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setItems(getCart())
  }, [])

  const shippingCost = shipping === 'express' ? 12 : 5
  const itemsTotal = useMemo(() => subtotal(items), [items])
  const total = itemsTotal + (items.length ? shippingCost : 0)

  const onPay = async (e) => {
    e.preventDefault()
    if (!items.length) return navigate('/cart')
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setCart([])
    navigate('/success')
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 text-white">
      <div>
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <form onSubmit={onPay} className="mt-4 space-y-4 p-4 rounded-2xl border border-white/10 bg-white/5">
          <div>
            <label className="mb-1 block text-sm text-white/80">Full name</label>
            <input className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm" value={name} onChange={e=>setName(e.target.value)} required />
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/80">Email</label>
            <input type="email" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/80">Shipping address</label>
            <textarea className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm" rows={3} value={address} onChange={e=>setAddress(e.target.value)} required />
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/80">Shipping method</label>
            <div className="flex gap-3">
              <label className={`btn ${shipping==='standard'?'btn-primary':'btn-ghost'} px-3 py-2`}>
                <input type="radio" name="ship" className="hidden" checked={shipping==='standard'} onChange={()=>setShipping('standard')} />Standard ($5)
              </label>
              <label className={`btn ${shipping==='express'?'btn-primary':'btn-ghost'} px-3 py-2`}>
                <input type="radio" name="ship" className="hidden" checked={shipping==='express'} onChange={()=>setShipping('express')} />Express ($12)
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary px-4 py-2" disabled={loading || !items.length}>{loading ? 'Processing…' : 'Pay now'}</button>
          {!items.length && (
            <div className="text-xs text-white/60">Your cart is empty. <Link to="/" className="underline">Continue shopping</Link>.</div>
          )}
        </form>
      </div>
      <div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-2 text-sm font-medium text-white/80">Order summary</div>
          <div className="space-y-3">
            {items.map((it, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-14 w-14 overflow-hidden rounded-lg border border-white/10 bg-white/5">
                  {it.images?.[0] ? <img src={it.images[0]} alt="" className="h-full w-full object-cover" /> : null}
                </div>
                <div className="flex-1 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="text-white/90">{it.title} × {it.qty}</div>
                    <div className="text-white/70">${(it.price * it.qty).toFixed(2)}</div>
                  </div>
                  {it.customText && <div className="text-xs text-white/60">“{it.customText}”</div>}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-1 text-sm">
            <div className="flex items-center justify-between text-white/70"><span>Items</span><span>${itemsTotal.toFixed(2)}</span></div>
            <div className="flex items-center justify-between text-white/70"><span>Shipping</span><span>${items.length?shippingCost.toFixed(2):'0.00'}</span></div>
            <div className="flex items-center justify-between text-white font-semibold text-base mt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
