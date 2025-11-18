import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCart } from '../lib/cart'

export default function Navbar() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const sync = () => setCount(getCart().reduce((n, i) => n + (i.qty || 1), 0))
    sync()
    const handler = () => sync()
    window.addEventListener('storage', handler)
    const id = setInterval(sync, 1000)
    return () => {
      window.removeEventListener('storage', handler)
      clearInterval(id)
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="rounded-xl bg-white/10 px-2 py-1 text-sm font-semibold text-white">3D</Link>
          <nav className="hidden gap-2 sm:flex">
            <a href="/#catalog" className="btn btn-ghost h-9 px-3">Products</a>
            <Link to="/custom-request" className="btn btn-ghost h-9 px-3">Custom</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/cart" className="btn btn-primary h-9 px-3">
            <span className="sr-only">Cart</span>
            <span className="rounded-md bg-neutral-900/40 px-2 py-0.5 text-xs">{count}</span>
          </Link>
        </div>
      </div>
      <div className="pointer-events-none h-px w-full bg-white/10" />
    </header>
  )
}
