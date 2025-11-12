import { motion } from 'framer-motion'
import { MapPin, Route, Cpu, Rss, Salad, HandHeart } from 'lucide-react'

const steps = [
  { icon: Salad, title: 'Post Surplus Food', desc: 'Donors list food with type, quantity, and pickup location.' },
  { icon: Cpu, title: 'AI Matching', desc: 'Our engine finds nearby NGOs and shelters in seconds.' },
  { icon: Route, title: 'Predictive Routes', desc: 'Optimized paths across a 3D city map with ETAs.' },
  { icon: Rss, title: 'IoT Freshness', desc: 'Sensors track temperature and freshness in real time.' },
  { icon: HandHeart, title: 'Impact', desc: 'Deliver safely and reduce waste with transparent tracking.' },
]

export default function HowItWorks() {
  return (
    <section id="how" className="py-20 bg-gradient-to-b from-white to-emerald-50/40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">How it works</h2>
          <p className="mt-3 text-slate-600">Interactive, AI-assisted flow from donation to delivery.</p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-emerald-100">
              <div className="h-12 w-12 rounded-lg bg-emerald-50 text-emerald-700 grid place-items-center">
                <s.icon />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{s.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
