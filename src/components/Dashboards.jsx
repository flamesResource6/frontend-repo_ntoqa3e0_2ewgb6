import { useEffect, useState } from 'react'

const backend = import.meta.env.VITE_BACKEND_URL || ''

export function DonorDashboard() {
  const [form, setForm] = useState({ donor_id: '', title: '', description: '', food_type: 'meals', quantity: 10, unit: 'portions', lat: 37.7749, lng: -122.4194, tags: ['hot'] })
  const [items, setItems] = useState([])

  const submit = async (e) => {
    e.preventDefault()
    const res = await fetch(`${backend}/api/listings`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, quantity: Number(form.quantity), lat: Number(form.lat), lng: Number(form.lng) }) })
    await res.json()
    const list = await fetch(`${backend}/api/listings`).then(r=>r.json())
    setItems(list.items || [])
  }

  useEffect(() => { fetch(`${backend}/api/listings`).then(r=>r.json()).then(d=>setItems(d.items||[])).catch(()=>{}) }, [])

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-slate-900">Post surplus food</h3>
      <form onSubmit={submit} className="grid sm:grid-cols-2 gap-3">
        <input className="input" placeholder="Your Account ID" value={form.donor_id} onChange={e=>setForm({...form, donor_id: e.target.value})} required />
        <input className="input" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} required />
        <input className="input" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
        <input className="input" placeholder="Food type" value={form.food_type} onChange={e=>setForm({...form, food_type: e.target.value})} />
        <input className="input" type="number" placeholder="Quantity" value={form.quantity} onChange={e=>setForm({...form, quantity: e.target.value})} />
        <input className="input" placeholder="Unit" value={form.unit} onChange={e=>setForm({...form, unit: e.target.value})} />
        <input className="input" placeholder="Latitude" value={form.lat} onChange={e=>setForm({...form, lat: e.target.value})} />
        <input className="input" placeholder="Longitude" value={form.lng} onChange={e=>setForm({...form, lng: e.target.value})} />
        <button className="btn-primary sm:col-span-2">Publish listing</button>
      </form>

      <div>
        <h4 className="font-semibold text-slate-900 mb-2">Your recent listings</h4>
        <div className="grid sm:grid-cols-2 gap-3">
          {items.map(i=> (
            <div key={i._id} className="p-4 bg-white rounded-lg ring-1 ring-slate-100">
              <div className="font-semibold">{i.title}</div>
              <div className="text-sm text-slate-600">{i.quantity} {i.unit} · {i.food_type}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function RecipientDashboard() {
  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194, recipient_id: '' })
  const [matches, setMatches] = useState([])

  const search = async () => {
    const url = `${backend}/api/match?recipient_id=${center.recipient_id}&lat=${center.lat}&lng=${center.lng}&radius_km=50`
    const res = await fetch(url)
    const data = await res.json()
    setMatches(data.matches || [])
  }

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-slate-900">Find nearby donations</h3>
      <div className="grid sm:grid-cols-4 gap-3">
        <input className="input" placeholder="Recipient Account ID" value={center.recipient_id} onChange={e=>setCenter({...center, recipient_id: e.target.value})} />
        <input className="input" placeholder="Latitude" value={center.lat} onChange={e=>setCenter({...center, lat: e.target.value})} />
        <input className="input" placeholder="Longitude" value={center.lng} onChange={e=>setCenter({...center, lng: e.target.value})} />
        <button className="btn-primary" onClick={search}>Search</button>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {matches.map(m => (
          <div key={m.listing_id} className="p-4 bg-white rounded-lg ring-1 ring-slate-100">
            <div className="font-semibold">Listing #{m.listing_id}</div>
            <div className="text-sm text-slate-600">Distance: {m.distance_km} km · ETA: {m.route_eta_min} min</div>
          </div>
        ))}
      </div>
    </div>
  )
}
