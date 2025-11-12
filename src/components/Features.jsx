import { motion } from 'framer-motion'
import { Bot, Route, ShieldCheck, MessageCircle, BarChart3 } from 'lucide-react'

const features = [
  { icon: Bot, title: 'Real-time Suggestions', desc: 'Smart matching between donors and recipients based on proximity and need.' },
  { icon: Route, title: 'Route Optimization', desc: 'Predictive logistics and animated routes for faster pickups and deliveries.' },
  { icon: ShieldCheck, title: 'Freshness Validation', desc: 'IoT sensors stream temperature and quality in real time.' },
  { icon: MessageCircle, title: 'Live Chat', desc: 'Seamless communication between donor and recipient.' },
  { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Track donations, reductions in waste, and impact over time.' },
]

export default function Features() {
  return (
    <section id="features" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Platform features</h2>
          <p className="mt-3 text-slate-600">A modern toolkit to reduce food waste at scale.</p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <div className="h-12 w-12 rounded-lg bg-emerald-50 text-emerald-700 grid place-items-center">
                <f.icon />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{f.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
