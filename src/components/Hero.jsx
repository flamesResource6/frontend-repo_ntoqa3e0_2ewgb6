import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/LU2mWMPbF3Qi1Qxh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-28 sm:pt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900">
            Smart food donations, matched in real time.
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            ConnectFood AI links restaurants and event venues with nearby shelters using AI-driven matching, predictive logistics, and live freshness monitoring.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#get-started" className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Get Started</a>
            <a href="#how" className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-white text-emerald-700 font-semibold border border-emerald-200 hover:bg-emerald-50">See How It Works</a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1.2 }} className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[['Real-time Matches', 'bg-emerald-50 text-emerald-700'], ['Optimized Routes', 'bg-amber-50 text-amber-700'], ['Freshness Sensors', 'bg-sky-50 text-sky-700'], ['Impact Analytics', 'bg-rose-50 text-rose-700']].map(([label, styles], i) => (
            <div key={i} className={`rounded-lg ${styles} px-4 py-3 text-sm font-semibold shadow-sm ring-1 ring-black/5`}>{label}</div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
