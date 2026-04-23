import { useState, useEffect } from 'react'
import { AlertTriangle, CheckCircle2, Instagram, MessageCircle, Package, User } from 'lucide-react'
import { DashboardLayout } from '../components/layout/DashboardLayout.jsx'
import { Card } from '../components/ui/Card.jsx'
import { Button } from '../components/ui/Button.jsx'
import { CardSkeleton } from '../components/ui/Skeleton.jsx'
import { BorrowContactModal } from '../components/BorrowContactModal.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { normalizeInstagramHandle, normalizeWhatsAppDigits } from '../utils/borrowMessage.js'

export function Dashboard() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [borrowedIds, setBorrowedIds] = useState(() => new Set())
  const [banner, setBanner] = useState(null)
  const [contactItem, setContactItem] = useState(null)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('borrow-buddy-token')
        const res = await fetch('/api/items', {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.ok) {
          const data = await res.json()
          setItems(data)
        }
      } catch (error) {
        console.error('Failed to fetch items', error)
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [])

  const firstName = user?.name?.split(' ')[0] ?? 'there'

  const hasContact = (item) => {
    const wa = normalizeWhatsAppDigits(item.whatsapp ?? '')
    const ig = normalizeInstagramHandle(item.instagram ?? '')
    return wa.length >= 10 || !!ig
  }

  const handleBorrowClick = (item) => {
    if (!item.available || !hasContact(item)) {
      setBanner({
        type: 'warn',
        text: `“${item.name}” has no WhatsApp or Instagram on file—ask the owner to add one when listing.`,
      })
      setTimeout(() => setBanner(null), 5000)
      return
    }
    setContactItem(item)
  }

  const handleContacted = async () => {
    if (contactItem) {
      setBorrowedIds((prev) => new Set(prev).add(contactItem._id))
      try {
        const token = localStorage.getItem('borrow-buddy-token')
        await fetch(`/api/items/${contactItem._id}/borrow`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        })
      } catch (err) {
        console.error(err)
      }
    }
    setBanner({
      type: 'ok',
      text: 'If WhatsApp opened, your message is ready to send. On Instagram, paste the copied text in the DM if needed.',
    })
    setTimeout(() => setBanner(null), 5000)
  }

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Browse listings—borrow opens WhatsApp or Instagram with your details filled in."
    >
      <BorrowContactModal
        open={!!contactItem}
        onClose={() => setContactItem(null)}
        item={contactItem}
        borrower={user}
        onContacted={handleContacted}
      />

      <div className="mb-8 rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50 to-indigo-50/80 px-5 py-6 shadow-soft">
        <p className="font-display text-xl font-semibold text-slate-900 sm:text-2xl">
          Hi {firstName}{' '}
          <span className="inline-block origin-[70%_70%] animate-wave" aria-hidden>
            👋
          </span>
        </p>
        <p className="mt-1 text-slate-600">
          Lenders share WhatsApp or Instagram—tap Borrow to send a ready-made request with your name, registration, and
          email.
        </p>
      </div>

      {banner && (
        <div
          className={`mb-6 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
            banner.type === 'warn'
              ? 'border-amber-200 bg-amber-50 text-amber-950'
              : 'border-emerald-200 bg-emerald-50 text-emerald-900'
          }`}
          role="status"
        >
          {banner.type === 'warn' ? (
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          ) : (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
          )}
          {banner.text}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
          : items.map((item) => {
              const wa = normalizeWhatsAppDigits(item.whatsapp ?? '')
              const ig = normalizeInstagramHandle(item.instagram ?? '')
              const canBorrow = item.available && (wa.length >= 10 || !!ig)

              return (
                <Card key={item._id} hover className="flex flex-col">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                        <Package className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display font-semibold text-slate-900 leading-snug">{item.name}</h3>
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                          <User className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{item.ownerId?.name || 'User'}</span>
                        </p>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        item.available
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {item.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>

                  <p className="mb-3 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-2">{item.description}</p>

                  <div className="mb-4 flex flex-wrap gap-2 text-xs text-slate-600">
                    {wa.length >= 10 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1">
                        <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                        WhatsApp
                      </span>
                    )}
                    {ig && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1">
                        <Instagram className="h-3.5 w-3.5 text-pink-600" />
                        @{ig}
                      </span>
                    )}
                    {!wa.length && !ig && (
                      <span className="text-amber-700">No contact on listing</span>
                    )}
                  </div>

                  <Button
                    className="w-full"
                    disabled={!canBorrow || borrowedIds.has(item._id)}
                    onClick={() => handleBorrowClick(item)}
                  >
                    {borrowedIds.has(item._id) ? 'Contacted' : 'Borrow'}
                  </Button>
                </Card>
              )
            })}
      </div>
    </DashboardLayout>
  )
}
