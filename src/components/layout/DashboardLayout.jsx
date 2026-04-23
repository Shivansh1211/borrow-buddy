import { Navbar } from './Navbar.jsx'
import { Sidebar } from './Sidebar.jsx'
import { MobileNav } from './MobileNav.jsx'

export function DashboardLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-20 lg:pb-0">
      <Navbar />
      <div className="mx-auto flex max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:py-10">
        <Sidebar />
        <main className="min-w-0 flex-1">
          {(title || subtitle) && (
            <header className="mb-8">
              {title && (
                <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {title}
                </h1>
              )}
              {subtitle && <p className="mt-1 text-slate-600">{subtitle}</p>}
            </header>
          )}
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
