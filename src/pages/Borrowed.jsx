import { useState, useEffect } from 'react'
import { Calendar, Package, Undo2 } from 'lucide-react'
import { DashboardLayout } from '../components/layout/DashboardLayout.jsx'
import { Card } from '../components/ui/Card.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Skeleton } from '../components/ui/Skeleton.jsx'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

export function Borrowed() {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchBorrowed = async () => {
      try {
        const token = localStorage.getItem('borrow-buddy-token')
        const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/users/borrowed`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.ok) {
          const data = await res.json()
          setItems(data.filter(t => t.status === 'active'))
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchBorrowed()
  }, [])

  const handleReturn = async (id, itemId) => {
    try {
      const token = localStorage.getItem('borrow-buddy-token')
      await fetch(`${import.meta.env.VITE_API_URL || ''}/api/items/${itemId}/return`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      })
      setItems((prev) => prev.filter((x) => x._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <DashboardLayout
      title="My borrowed items"
      subtitle="Things you have checked out from others."
    >
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
              <Skeleton className="mb-2 h-5 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="mt-4 h-10 w-28 rounded-xl" />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <Card className="text-center py-14">
          <Package className="mx-auto h-12 w-12 text-slate-300" />
          <p className="mt-4 font-display text-lg font-semibold text-slate-800">No active borrows</p>
          <p className="mt-1 text-sm text-slate-500">
            When you borrow something from the dashboard, it will show up here.
          </p>
        </Card>
      ) : (
        <ul className="space-y-4">
          {items.map((row) => (
            <li key={row._id}>
              <Card hover className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                    <Package className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-slate-900">{row.item?.name || 'Unknown item'}</h3>
                    <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                      <Calendar className="h-4 w-4" />
                      Borrowed from {row.lender?.name || 'Unknown'} on {formatDate(row.borrowDate)}
                    </p>
                  </div>
                </div>
                <Button variant="secondary" onClick={() => handleReturn(row._id, row.item?._id)} className="shrink-0">
                  <Undo2 className="h-4 w-4" />
                  Return
                </Button>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </DashboardLayout>
  )
}
