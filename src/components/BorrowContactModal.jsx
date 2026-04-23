import { useEffect, useRef } from 'react'
import { MessageCircle, Instagram, X } from 'lucide-react'
import { Button } from './ui/Button.jsx'
import { buildBorrowRequestMessage, normalizeInstagramHandle, normalizeWhatsAppDigits } from '../utils/borrowMessage.js'

export function BorrowContactModal({ open, onClose, item, borrower, onContacted }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && open && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open || !item || !borrower) return null

  const message = buildBorrowRequestMessage({
    borrowerName: borrower.name,
    borrowerEmail: borrower.email ?? '',
    itemName: item.name,
    ownerName: item.ownerName,
  })

  const waDigits = normalizeWhatsAppDigits(item.whatsapp ?? '')
  const igHandle = normalizeInstagramHandle(item.instagram ?? '')
  const waUrl =
    waDigits.length >= 10
      ? `https://wa.me/${waDigits}?text=${encodeURIComponent(message)}`
      : null
  const igUrl = igHandle ? `https://ig.me/m/${encodeURIComponent(igHandle)}` : null

  const openWhatsApp = () => {
    if (waUrl) window.open(waUrl, '_blank', 'noopener,noreferrer')
    onContacted?.()
  }

  const openInstagram = async () => {
    if (!igUrl) return
    try {
      await navigator.clipboard.writeText(message)
    } catch {
      // User may paste manually after IG opens
    }
    window.open(igUrl, '_blank', 'noopener,noreferrer')
    onContacted?.()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="borrow-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-label="Close"
      />
      <div
        ref={dialogRef}
        className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 id="borrow-modal-title" className="font-display text-lg font-bold text-slate-900">
              Message {item.ownerName}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              WhatsApp opens with this text ready to send. Instagram opens your DM—we copy the message so you can paste
              it (Instagram doesn&apos;t support pre-filled DMs from the web).
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Generated message</p>
          <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-800">
            {message}
          </pre>
        </div>

        <div className="space-y-3">
          {waUrl ? (
            <Button type="button" className="w-full" onClick={openWhatsApp}>
              <MessageCircle className="h-5 w-5" />
              Open WhatsApp
            </Button>
          ) : (
            <p className="text-sm text-slate-500">No WhatsApp number on this listing.</p>
          )}
          {igUrl ? (
            <Button type="button" variant="secondary" className="w-full" onClick={openInstagram}>
              <Instagram className="h-5 w-5" />
              Open Instagram (message copied)
            </Button>
          ) : (
            <p className="text-sm text-slate-500">No Instagram handle on this listing.</p>
          )}
        </div>

        {!waUrl && !igUrl && (
          <p className="mt-3 text-sm text-amber-800">This listing has no contact method yet.</p>
        )}

        <Button type="button" variant="ghost" className="mt-4 w-full" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  )
}
