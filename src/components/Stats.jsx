import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function Counter({ to, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const value = Math.floor((inView ? 1 : 0) * to)
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-extrabold text-slate-900">{value.toLocaleString()}</div>
      <div className="text-sm text-slate-600">{label}</div>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="py-16 bg-gradient-to-r from-emerald-50 to-lime-50">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6">
        <Counter to={12840} label="Meals saved" />
        <Counter to={342} label="Partner donors" />
        <Counter to={519} label="NGOs & shelters" />
        <Counter to={92} label="Cities covered" />
      </div>
    </section>
  )
}
