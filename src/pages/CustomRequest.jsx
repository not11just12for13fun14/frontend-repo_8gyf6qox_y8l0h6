import { useState } from 'react'

export default function CustomRequestPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const payload = { name, email, message, hasFile: !!file }
    await fetch('/api/request', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' }})
    setLoading(false)
    setToast('Sent!')
    setTimeout(() => setToast(null), 1500)
    setName(''); setEmail(''); setMessage(''); setFile(null)
  }

  return (
    <div className="mx-auto max-w-xl text-white">
      <h1 className="text-2xl font-semibold">Custom Request</h1>
      <div className="mt-4 p-4 rounded-2xl border border-white/10 bg-white/5">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-white/80">Name</label>
            <input className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm" value={name} onChange={e=>setName(e.target.value)} required placeholder="Your name" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/80">Email</label>
            <input type="email" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="you@example.com" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/80">Message</label>
            <textarea className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm" value={message} onChange={e=>setMessage(e.target.value)} rows={5} placeholder="Describe your idea…" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/80">Reference file (optional)</label>
            <input type="file" onChange={(e)=>setFile(e.target.files?.[0]||null)} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm" />
          </div>
          <button type="submit" className="btn btn-primary px-4 py-2" disabled={loading}>{loading ? 'Sending…' : 'Send Request'}</button>
        </form>
      </div>

      {toast && (
        <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
          <div className="rounded-xl bg-white text-neutral-900 px-4 py-2 shadow">{toast}</div>
        </div>
      )}
    </div>
  )
}
