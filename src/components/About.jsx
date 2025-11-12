export default function About() {
  return (
    <section className="py-16" id="about">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Reducing food waste with AI</h2>
          <p className="mt-4 text-slate-700">ConnectFood AI is a smart redistribution platform that continuously matches surplus meals with nearby communities in need. Our models consider distance, capacity, freshness, and timing to make the best match in real time.</p>
          <p className="mt-3 text-slate-700">With predictive logistics and IoT sensor integrations, we prioritize safety, speed, and impact — turning potential waste into meaningful nourishment.</p>
        </div>
        <div className="rounded-2xl p-6 bg-gradient-to-tr from-emerald-50 to-lime-50 ring-1 ring-emerald-100">
          <ul className="space-y-3 text-slate-700">
            <li>• AI-driven matching reduces pickup times and spoilage</li>
            <li>• Predictive routing lowers fuel use and emissions</li>
            <li>• Sensor-based freshness monitoring for safe deliveries</li>
            <li>• Transparent analytics to demonstrate impact</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
