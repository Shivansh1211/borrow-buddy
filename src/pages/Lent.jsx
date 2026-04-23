import { useState, useEffect } from 'react'
import { DashboardLayout } from '../components/layout/DashboardLayout.jsx'
import { Card } from '../components/ui/Card.jsx'
import { Skeleton } from '../components/ui/Skeleton.jsx'
import { Handshake, User } from 'lucide-react'

const statusStyles = {
  active: 'bg-amber-100 text-amber-900',
  'lent out': 'bg-amber-100 text-amber-900',
  returned: 'bg-slate-100 text-slate-700',
  available: 'bg-emerald-100 text-emerald-800'
}

export function Lent() {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchLent = async () => {
      try {
        const token = localStorage.getItem('borrow-buddy-token')
        const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/users/lent`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.ok) {
          const data = await res.json()
          setItems(data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchLent()
  }, [])

  return (
    <DashboardLayout
      title="My lent items"
      subtitle="Track what you have shared and who has it."
    >
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
              <Skeleton className="mb-3 h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {items.map((row) => (
            <li key={row._id}>
              <Card hover>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display font-semibold text-slate-900 leading-snug">{row.item?.name || 'Unknown item'}</h3>
                    <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                      <User className="h-4 w-4 text-brand-600" />
                      {row.status === 'available' ? 'No active borrower' : (row.borrower?.name || 'Unknown')}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                      statusStyles[row.status] ?? statusStyles.active
                    }`}
                  >
                    {row.status}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                  <Handshake className="h-3.5 w-3.5" />
                  On-campus lend (demo data)
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </DashboardLayout>
  )
}
