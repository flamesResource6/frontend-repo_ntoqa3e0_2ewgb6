import { useState } from 'react'

export function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', role: 'donor', organization: '', lat: 37.7749, lng: -122.4194 })
  const [result, setResult] = useState(null)
  const backend = import.meta.env.VITE_BACKEND_URL || ''

  const submit = async (e) => {
    e.preventDefault()
    const res = await fetch(`${backend}/api/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, lat: Number(form.lat), lng: Number(form.lng) }) })
    setResult(await res.json())
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <input className="input" placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input className="input" type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <select className="input" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="donor">Donor</option>
          <option value="recipient">Recipient</option>
        </select>
        <input className="input" placeholder="Organization" value={form.organization} onChange={e => setForm({ ...form, organization: e.target.value })} />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <input className="input" placeholder="Latitude" value={form.lat} onChange={e => setForm({ ...form, lat: e.target.value })} />
        <input className="input" placeholder="Longitude" value={form.lng} onChange={e => setForm({ ...form, lng: e.target.value })} />
      </div>
      <button className="btn-primary w-full">Create account</button>
      {result && <pre className="p-3 bg-slate-50 rounded text-xs overflow-auto">{JSON.stringify(result, null, 2)}</pre>}
    </form>
  )
}

export function LoginForm() {
  return (
    <div className="text-sm text-slate-600">Demo-only: use the registration to create a profile. Full auth can be added later.</div>
  )
}
