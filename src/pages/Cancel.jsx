import { Link } from 'react-router-dom'

export default function CancelPage() {
  return (
    <div className="mx-auto max-w-xl text-center text-white">
      <h1 className="text-2xl font-semibold">Payment cancelled.</h1>
      <p className="mt-2 text-white/70">Want to review your items?</p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Link to="/cart" className="btn btn-primary px-4 py-2">Back to cart</Link>
        <Link to="/" className="btn btn-ghost px-4 py-2">Continue shopping</Link>
      </div>
    </div>
  )
}
