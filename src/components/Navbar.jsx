import { Link, NavLink } from 'react-router-dom'
import { Menu, Leaf, Map, Rocket, LogIn, UserPlus } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navItem = (to, label) => (
    <NavLink
      to={to}
      onClick={() => setOpen(false)}
      className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-600 hover:text-slate-900'}`}
    >
      {label}
    </NavLink>
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-30 backdrop-blur bg-white/60 border-b border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-emerald-500 to-lime-400 grid place-items-center text-white">
              <Leaf size={20} />
            </div>
            <span className="font-extrabold tracking-tight text-slate-900">ConnectFood AI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navItem('/', 'Home')}
            {navItem('/about', 'About')}
            {navItem('/how', 'How It Works')}
            {navItem('/features', 'Features')}
            {navItem('/map', 'Live Map')}
            {navItem('/blog', 'Blog')}
            {navItem('/contact', 'Contact')}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link to="/login" className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-md text-white bg-emerald-600 hover:bg-emerald-700">
              <LogIn size={16} /> Login
            </Link>
            <Link to="/register" className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-md text-emerald-700 bg-emerald-50 hover:bg-emerald-100">
              <UserPlus size={16} /> Sign up
            </Link>
          </div>

          <button onClick={() => setOpen(o => !o)} className="md:hidden p-2 rounded-md hover:bg-white/60">
            <Menu />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/40 bg-white/70 backdrop-blur">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navItem('/', 'Home')}
            {navItem('/about', 'About')}
            {navItem('/how', 'How It Works')}
            {navItem('/features', 'Features')}
            {navItem('/map', 'Live Map')}
            {navItem('/blog', 'Blog')}
            {navItem('/contact', 'Contact')}
            <div className="flex gap-2 pt-2">
              <Link to="/login" className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold rounded-md text-white bg-emerald-600 hover:bg-emerald-700">
                <LogIn size={16} /> Login
              </Link>
              <Link to="/register" className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold rounded-md text-emerald-700 bg-emerald-50 hover:bg-emerald-100">
                <UserPlus size={16} /> Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
