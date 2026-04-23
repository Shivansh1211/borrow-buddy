import { NavLink } from 'react-router-dom'
import { LayoutDashboard, PlusCircle, Package, Handshake } from 'lucide-react'

const linkBase =
  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200'

export function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <nav className="sticky top-24 space-y-1 rounded-2xl border border-slate-100 bg-white p-3 shadow-card">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Menu
        </p>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? 'bg-brand-50 text-brand-800 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`
          }
        >
          <LayoutDashboard className="h-5 w-5 shrink-0 text-brand-600" />
          Dashboard
        </NavLink>
        <NavLink
          to="/items/new"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? 'bg-brand-50 text-brand-800 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`
          }
        >
          <PlusCircle className="h-5 w-5 shrink-0 text-brand-600" />
          Add Item
        </NavLink>
        <NavLink
          to="/borrowed"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? 'bg-brand-50 text-brand-800 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`
          }
        >
          <Package className="h-5 w-5 shrink-0 text-brand-600" />
          My Borrowed
        </NavLink>
        <NavLink
          to="/lent"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? 'bg-brand-50 text-brand-800 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`
          }
        >
          <Handshake className="h-5 w-5 shrink-0 text-brand-600" />
          My Lent
        </NavLink>
      </nav>
    </aside>
  )
}
