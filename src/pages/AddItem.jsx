import { useState } from 'react'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { DashboardLayout } from '../components/layout/DashboardLayout.jsx'
import { Card } from '../components/ui/Card.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Input } from '../components/ui/Input.jsx'
import { Textarea } from '../components/ui/Textarea.jsx'
import { Toggle } from '../components/ui/Toggle.jsx'
import { normalizeInstagramHandle, normalizeWhatsAppDigits } from '../utils/borrowMessage.js'

export function AddItem() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [instagram, setInstagram] = useState('')
  const [available, setAvailable] = useState(true)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const e = {}
    if (!name.trim()) e.name = 'Give your item a name'
    if (!description.trim()) e.description = 'Add a short description'

    const wa = whatsapp.trim()
    const ig = normalizeInstagramHandle(instagram)
    if (!wa && !ig) {
      e.contact = 'Add at least WhatsApp or Instagram so borrowers can reach you'
    }
    if (wa && normalizeWhatsAppDigits(wa).length < 10) {
      e.whatsapp = 'Enter a valid mobile number (with country code if outside India)'
    }
    if (instagram.trim() && !/^[a-zA-Z0-9._]{1,30}$/.test(ig)) {
      e.instagram = 'Use your Instagram username (letters, numbers, . and _)'
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setSuccess(false)
    try {
      const token = localStorage.getItem('borrow-buddy-token')
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          whatsapp: whatsapp.trim(),
          instagram: instagram.trim(),
          available
        })
      })

      if (res.ok) {
        setSuccess(true)
        setName('')
        setDescription('')
        setWhatsapp('')
        setInstagram('')
        setAvailable(true)
        setErrors({})
      } else {
        const data = await res.json()
        setErrors({ contact: data.message || 'Failed to add item' })
      }
    } catch (err) {
      setErrors({ contact: 'Network error. Please try again later.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <DashboardLayout
      title="Add an item"
      subtitle="Share how borrowers can message you—WhatsApp opens with a prefilled text; Instagram uses copy-paste."
    >
      <Card className="max-w-xl shadow-card">
        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
            Item successfully saved and added to the dashboard.
          </div>
        )}

        {errors.contact && (
          <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            {errors.contact}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center gap-2 text-brand-700">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">New listing</span>
          </div>

          <Input
            id="itemName"
            label="Item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            placeholder="What are you lending?"
          />

          <Textarea
            id="itemDescription"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={errors.description}
            hint="Condition, pickup spot, return rules."
            placeholder="What should borrowers know?"
          />

          <div className="rounded-xl border border-brand-100 bg-brand-50/50 p-4">
            <p className="mb-3 text-sm font-semibold text-slate-800">How can borrowers reach you?</p>
            <p className="mb-4 text-xs text-slate-600">
              Add one or both. When someone taps Borrow, we generate a message with their name, registration, and
              college email.
            </p>
            <div className="space-y-4">
              <Input
                id="whatsapp"
                label="WhatsApp number"
                type="tel"
                inputMode="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                error={errors.whatsapp}
                placeholder="e.g. 9876543210 or +91 9876543210"
                hint="Indian 10-digit numbers get +91 added automatically for links."
              />
              <Input
                id="instagram"
                label="Instagram username"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                error={errors.instagram}
                placeholder="e.g. your.handle (without @)"
              />
            </div>
          </div>

          <Toggle
            id="availability"
            label="Available to borrow"
            description="Turn off when you do not want new requests."
            checked={available}
            onChange={setAvailable}
          />

          <Button type="submit" className="w-full sm:w-auto" size="lg" disabled={submitting}>
            {submitting ? 'Saving…' : 'Submit item'}
          </Button>
        </form>
      </Card>
    </DashboardLayout>
  )
}
