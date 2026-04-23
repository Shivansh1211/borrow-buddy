import { NavLink } from 'react-router-dom'
import { LayoutDashboard, PlusCircle, Package, Handshake } from 'lucide-react'

const item = ({ isActive }) =>
  `flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium ${
    isActive ? 'text-brand-700' : 'text-slate-500'
  }`

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-lg justify-around px-2 py-1">
        <NavLink to="/dashboard" className={item}>
          <LayoutDashboard className="h-5 w-5" />
          Home
        </NavLink>
        <NavLink to="/items/new" className={item}>
          <PlusCircle className="h-5 w-5" />
          Add
        </NavLink>
        <NavLink to="/borrowed" className={item}>
          <Package className="h-5 w-5" />
          Borrowed
        </NavLink>
        <NavLink to="/lent" className={item}>
          <Handshake className="h-5 w-5" />
          Lent
        </NavLink>
      </div>
    </nav>
  )
}
