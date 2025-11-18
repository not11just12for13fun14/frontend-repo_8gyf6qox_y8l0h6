import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row">
        <p className="text-white/50">© {new Date().getFullYear()} Printful Vibes</p>
        <div className="flex gap-4 text-sm text-white/60">
          <Link to="/custom-request" className="hover:text-white">Custom request</Link>
          <Link to="/cart" className="hover:text-white">Cart</Link>
          <a href="#" className="hover:text-white" target="_blank" rel="noreferrer">Docs</a>
        </div>
      </div>
    </footer>
  )
}
