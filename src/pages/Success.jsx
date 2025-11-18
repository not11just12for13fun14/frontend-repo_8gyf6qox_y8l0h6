import { Link } from 'react-router-dom'

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-xl text-center text-white">
      <h1 className="text-2xl font-semibold">Payment successful! Check email.</h1>
      <p className="mt-2 text-white/70">We’ve sent a confirmation to your inbox.</p>
      <div className="mt-6">
        <Link to="/" className="btn btn-primary px-4 py-2">Back to Home</Link>
      </div>
    </div>
  )
}
