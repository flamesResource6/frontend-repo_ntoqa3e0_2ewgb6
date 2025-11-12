import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation } from 'lucide-react'

// Simple 3D-ish map using CSS transforms and animated markers
export default function LiveMap() {
  const [items, setItems] = useState([])
  const [matches, setMatches] = useState([])
  const [center] = useState({ lat: 37.7749, lng: -122.4194 })

  const backend = import.meta.env.VITE_BACKEND_URL || ''

  useEffect(() => {
    // Load listings
    fetch(`${backend}/api/listings`).then(r => r.json()).then(d => setItems(d.items || [])).catch(() => {})
    // Get matches near center as demo
    const url = `${backend}/api/match?recipient_id=demo&lat=${center.lat}&lng=${center.lng}&radius_km=50`
    fetch(url).then(r => r.json()).then(d => setMatches(d.matches || [])).catch(() => {})
  }, [backend, center.lat, center.lng])

  const toScreen = (lat, lng) => {
    const scale = 4
    return { x: (lng - center.lng) * scale * 10 + 200, y: (center.lat - lat) * scale * 10 + 160 }
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Live activity map</h2>
            <p className="text-slate-600 mt-2">Active listings, suggestions, and animated routes.</p>
          </div>
        </div>

        <div className="mt-8 relative rounded-2xl bg-gradient-to-br from-emerald-100 to-lime-100 p-6 ring-1 ring-emerald-200 overflow-hidden">
          <div className="relative h-96 perspective-[1000px]">
            <div className="absolute inset-0 bg-white/30 backdrop-blur rounded-xl" />
            <div className="absolute inset-4 bg-gradient-to-br from-emerald-50 to-white rounded-xl shadow-inner" style={{ transform: 'rotateX(20deg) rotateZ(-3deg)', transformOrigin: 'center' }} />

            {items.map((it) => {
              const pos = toScreen(it.location?.lat ?? center.lat, it.location?.lng ?? center.lng)
              return (
                <motion.div key={it._id} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="absolute" style={{ left: pos.x, top: pos.y }}>
                  <div className="flex items-center gap-1 text-emerald-700 text-xs bg-white/90 rounded-md px-2 py-1 shadow">
                    <MapPin size={14} /> {it.title}
                  </div>
                </motion.div>
              )
            })}

            {matches.slice(0,5).map((m, idx) => {
              const source = items.find(i => i._id === m.listing_id)
              if (!source) return null
              const a = toScreen(source.location.lat, source.location.lng)
              const b = toScreen(center.lat, center.lng)
              const style = { left: a.x, top: a.y }
              return (
                <motion.div key={idx} className="absolute" style={style}
                  animate={{ x: [0, (b.x - a.x)], y: [0, (b.y - a.y)] }}
                  transition={{ duration: 3 + idx, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}>
                  <div className="text-emerald-600">
                    <Navigation size={16} />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
