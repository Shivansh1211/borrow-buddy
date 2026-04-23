import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BookMarked, Menu, X } from 'lucide-react'
import { Button } from '../ui/Button.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const navClass = ({ isActive }) =>
  `text-sm font-medium transition-colors duration-200 ${
    isActive ? 'text-brand-700' : 'text-slate-600 hover:text-brand-600'
  }`

const mobileLink =
  'block rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-800'

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-lg font-bold text-slate-900 transition-opacity hover:opacity-90"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-soft">
            <BookMarked className="h-5 w-5" strokeWidth={2} />
          </span>
          Borrow Buddy
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" className={navClass}>
                Dashboard
              </NavLink>
              <NavLink to="/items/new" className={navClass}>
                Add Item
              </NavLink>
              <NavLink to="/borrowed" className={navClass}>
                Borrowed
              </NavLink>
              <NavLink to="/lent" className={navClass}>
                Lent
              </NavLink>
            </>
          ) : (
            <>
              <a href="/#features" className="text-sm font-medium text-slate-600 hover:text-brand-600">
                Features
              </a>
              <NavLink to="/auth" className={navClass}>
                Sign in
              </NavLink>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <>
              <span className="hidden text-sm text-slate-600 sm:inline">
                Hi, <span className="font-semibold text-slate-800">{user?.name?.split(' ')[0]}</span>
              </span>
              <Button variant="secondary" size="sm" onClick={logout} className="hidden md:inline-flex">
                Log out
              </Button>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 md:hidden"
                aria-expanded={open}
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((o) => !o)}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" className="hidden sm:block">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link to="/auth" className="hidden sm:block">
                <Button size="sm">Get Started</Button>
              </Link>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 sm:hidden"
                aria-expanded={open}
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((o) => !o)}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </>
          )}
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1" onClick={() => setOpen(false)}>
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard" className={mobileLink}>
                  Dashboard
                </NavLink>
                <NavLink to="/items/new" className={mobileLink}>
                  Add Item
                </NavLink>
                <NavLink to="/borrowed" className={mobileLink}>
                  Borrowed
                </NavLink>
                <NavLink to="/lent" className={mobileLink}>
                  Lent
                </NavLink>
                <button
                  type="button"
                  className={`${mobileLink} w-full text-left text-red-700 hover:bg-red-50`}
                  onClick={() => {
                    setOpen(false)
                    logout()
                  }}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <a href="/#features" className={mobileLink}>
                  Features
                </a>
                <NavLink to="/auth" className={mobileLink}>
                  Sign in
                </NavLink>
                <Link to="/auth" className={mobileLink}>
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
