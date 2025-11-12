import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Stats from './components/Stats'
import { useState, useEffect } from 'react'
import { API_BASE, fetchJson } from './lib/api'

function Home() {
  return (
    <>
      <Hero />
      <About />
      <HowItWorks />
      <Features />
      <Stats />
      <CTA />
    </>
  )
}

function CTA() {
  return (
    <section id="get-started" className="py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold text-slate-900">Ready to reduce food waste?</h3>
        <p className="text-slate-600 mt-2">Join donors and NGOs using AI to move meals faster and safer.</p>
        <div className="mt-6 flex justify-center gap-3">
          <a href="/register" className="px-5 py-3 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Create account</a>
          <a href="/map" className="px-5 py-3 rounded-md bg-white text-emerald-700 font-semibold border border-emerald-200 hover:bg-emerald-50">View live map</a>
        </div>
      </div>
    </section>
  )
}

function AuthForm({ mode }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'donor', lat: '', lng: '' })
  const [msg, setMsg] = useState('')
  const onSubmit = async (e) => {
    e.preventDefault()
    setMsg('Submitting...')
    try {
      if (mode === 'register') {
        const data = await fetchJson('/api/register', { method: 'POST', body: JSON.stringify({ ...form, lat: parseFloat(form.lat) || undefined, lng: parseFloat(form.lng) || undefined }) })
        setMsg('Registered! You can now log in.')
      } else {
        const data = await fetchJson('/api/login', { method: 'POST', body: JSON.stringify({ email: form.email, password: form.password }) })
        localStorage.setItem('cf_user', JSON.stringify(data.user))
        window.location.href = data.user.role === 'donor' ? '/dashboard/donor' : '/dashboard/recipient'
      }
    } catch (err) {
      setMsg(err.message)
    }
  }
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-emerald-50 to-lime-50">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm ring-1 ring-slate-100 p-6">
        <h1 className="text-2xl font-bold text-slate-900">{mode === 'register' ? 'Create account' : 'Login'}</h1>
        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          {mode === 'register' && (
            <>
              <input className="w-full border rounded-md px-3 py-2" placeholder="Name / Organization" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              <select className="w-full border rounded-md px-3 py-2" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                <option value="donor">Donor</option>
                <option value="recipient">NGO / Recipient</option>
              </select>
              <div className="grid grid-cols-2 gap-2">
                <input className="w-full border rounded-md px-3 py-2" placeholder="Latitude (optional)" value={form.lat} onChange={e => setForm({ ...form, lat: e.target.value })} />
                <input className="w-full border rounded-md px-3 py-2" placeholder="Longitude (optional)" value={form.lng} onChange={e => setForm({ ...form, lng: e.target.value })} />
              </div>
            </>
          )}
          <input className="w-full border rounded-md px-3 py-2" placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input className="w-full border rounded-md px-3 py-2" placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          <button className="w-full bg-emerald-600 text-white rounded-md py-2 font-semibold">{mode === 'register' ? 'Sign up' : 'Login'}</button>
          {msg && <p className="text-sm text-slate-600">{msg}</p>}
        </form>
      </div>
    </div>
  )
}

function DonorDashboard() {
  const user = JSON.parse(localStorage.getItem('cf_user') || '{}')
  const [form, setForm] = useState({ title: '', description: '', type: 'meal', quantity: 10, unit: 'servings', lat: user.lat || '', lng: user.lng || '' })
  const [items, setItems] = useState([])
  const [matches, setMatches] = useState([])

  const create = async (e) => {
    e.preventDefault()
    const body = { donor_id: user._id, ...form, quantity: parseFloat(form.quantity), lat: parseFloat(form.lat), lng: parseFloat(form.lng) }
    const res = await fetchJson('/api/listings', { method: 'POST', body: JSON.stringify(body) })
    await refresh()
  }

  const refresh = async () => {
    if (!user.lat || !user.lng) return
    const res = await fetchJson(`/api/listings?lat=${user.lat}&lng=${user.lng}&radius_km=25`)
    setItems(res.items)
  }

  const runMatch = async (listing_id) => {
    const res = await fetchJson('/api/match', { method: 'POST', body: JSON.stringify({ listing_id }) })
    setMatches(res.matches)
  }

  useEffect(() => { refresh() }, [])

  return (
    <div className="min-h-screen pt-20 bg-emerald-50/40">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-xl p-4 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-semibold text-slate-900">Post surplus</h2>
          <form onSubmit={create} className="mt-3 space-y-2">
            <input className="w-full border rounded px-3 py-2" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <textarea className="w-full border rounded px-3 py-2" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <div className="grid grid-cols-2 gap-2">
              <input className="w-full border rounded px-3 py-2" placeholder="Type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} />
              <input className="w-full border rounded px-3 py-2" placeholder="Quantity" type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input className="w-full border rounded px-3 py-2" placeholder="Lat" value={form.lat} onChange={e => setForm({ ...form, lat: e.target.value })} />
              <input className="w-full border rounded px-3 py-2" placeholder="Lng" value={form.lng} onChange={e => setForm({ ...form, lng: e.target.value })} />
            </div>
            <button className="w-full bg-emerald-600 text-white rounded-md py-2 font-semibold">Post</button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm ring-1 ring-slate-100">
            <h3 className="font-semibold mb-2">Nearby listings</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {items.map(it => (
                <div key={it._id} className="border rounded-md p-3">
                  <div className="font-semibold">{it.title}</div>
                  <div className="text-sm text-slate-600">{it.type} • {it.quantity} {it.unit} • {it.distance_km} km</div>
                  <div className="mt-2 flex gap-2">
                    <button onClick={() => runMatch(it._id)} className="px-3 py-1 text-sm rounded bg-emerald-600 text-white">Match</button>
                    <a className="px-3 py-1 text-sm rounded bg-white border" href={`/live/${it._id}`}>Freshness</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {matches.length > 0 && (
            <div className="bg-white rounded-xl p-4 shadow-sm ring-1 ring-slate-100">
              <h3 className="font-semibold mb-2">Top matches</h3>
              <ul className="space-y-2">
                {matches.map(m => (
                  <li key={m._id} className="border rounded p-2 text-sm flex justify-between">
                    <span>Recipient #{m.recipient_id.slice(-4)} • {m.distance_km} km • Score {m.score}</span>
                    <span>ETA {m.route_eta_min} min</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function RecipientDashboard() {
  const user = JSON.parse(localStorage.getItem('cf_user') || '{}')
  const [nearby, setNearby] = useState([])

  const refresh = async () => {
    if (!user.lat || !user.lng) return
    const res = await fetchJson(`/api/listings?lat=${user.lat}&lng=${user.lng}&radius_km=25`)
    setNearby(res.items)
  }
  useEffect(() => { refresh() }, [])

  return (
    <div className="min-h-screen pt-20 bg-emerald-50/40">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-semibold text-slate-900 mb-4">Local food listings</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {nearby.map(it => (
            <div key={it._id} className="border rounded-md p-3">
              <div className="font-semibold">{it.title}</div>
              <div className="text-sm text-slate-600">{it.type} • {it.quantity} {it.unit} • {it.distance_km} km</div>
              <div className="mt-2 flex gap-2">
                <a className="px-3 py-1 text-sm rounded bg-emerald-600 text-white" href={`mailto:donor@example.com?subject=Claim ${it.title}`}>Claim</a>
                <a className="px-3 py-1 text-sm rounded bg-white border" href={`/live/${it._id}`}>Freshness</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LiveSensors() {
  const [data, setData] = useState([])
  const listingId = window.location.pathname.split('/').pop()
  useEffect(() => {
    const ws = new WebSocket(API_BASE.replace('http', 'ws') + `/ws/freshness/${listingId}`)
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data)
      setData(d => [...d.slice(-24), msg])
    }
    return () => ws.close()
  }, [listingId])

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-emerald-50 to-lime-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold">Live freshness</h2>
        <p className="text-slate-600">Simulated IoT stream for temperature and freshness.</p>
        <div className="mt-4 grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <div className="text-sm text-slate-600">Freshness</div>
            <div className="text-3xl font-extrabold text-emerald-600">{data.at(-1)?.freshness ?? '--'}%</div>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <div className="text-sm text-slate-600">Temperature</div>
            <div className="text-3xl font-extrabold text-sky-600">{data.at(-1)?.temperature_c ?? '--'}°C</div>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <div className="text-sm text-slate-600">Humidity</div>
            <div className="text-3xl font-extrabold text-amber-600">{data.at(-1)?.humidity ?? '--'}%</div>
          </div>
        </div>
        <div className="mt-6 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <div className="text-sm text-slate-600 mb-2">Last updates</div>
          <div className="h-48 overflow-auto font-mono text-xs">
            {data.map((d, i) => (
              <div key={i}>{d.timestamp} • {d.temperature_c}°C • {d.humidity}% • {d.freshness}%</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Blog() {
  const [posts, setPosts] = useState([])
  useEffect(() => { (async () => { const res = await fetchJson('/api/blog'); setPosts(res.items) })() }, [])
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Resources</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {posts.map(p => (
            <article key={p._id} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
              <h3 className="font-semibold text-slate-900">{p.title}</h3>
              <p className="text-sm text-slate-600">{p.excerpt}</p>
              <div className="mt-2 flex gap-2">
                {p.tags?.map(t => <span key={t} className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs">{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

function Contact() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold">Contact us</h2>
        <p className="text-slate-600">We'd love to hear from you. Reach us via social or the form below.</p>
        <form className="mt-4 grid gap-3">
          <input className="border rounded px-3 py-2" placeholder="Your email" />
          <textarea className="border rounded px-3 py-2" placeholder="Message" rows={5}></textarea>
          <button className="bg-emerald-600 text-white rounded-md py-2 font-semibold">Send</button>
        </form>
      </div>
    </div>
  )
}

function LiveMap() {
  // Placeholder 3D or map visualization could integrate three.js or map library
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-emerald-50 to-lime-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold">Live 3D Map</h2>
        <p className="text-slate-600">Animated routes and active listings.</p>
        <div className="mt-4 h-[420px] rounded-2xl bg-white ring-1 ring-slate-100 shadow-sm grid place-items-center">
          <div className="text-slate-500">3D map placeholder</div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/how" element={<HowItWorks />} />
        <Route path="/features" element={<Features />} />
        <Route path="/register" element={<AuthForm mode="register" />} />
        <Route path="/login" element={<AuthForm mode="login" />} />
        <Route path="/dashboard/donor" element={<DonorDashboard />} />
        <Route path="/dashboard/recipient" element={<RecipientDashboard />} />
        <Route path="/live/:id" element={<LiveSensors />} />
        <Route path="/map" element={<LiveMap />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}
