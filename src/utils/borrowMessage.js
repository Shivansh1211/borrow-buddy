/**
 * Builds a friendly borrow request the borrower can send on WhatsApp or Instagram.
 */
export function buildBorrowRequestMessage({
  borrowerName,
  borrowerEmail,
  itemName,
  ownerName,
}) {
  return `Hi ${ownerName},

I'd like to borrow "${itemName}" through Borrow Buddy.

My details:
• Name: ${borrowerName}
• Email: ${borrowerEmail}

Please let me know if it's available and how you'd like to hand it off. Thanks!`
}

/** Strip @ and invalid chars from an Instagram username */
export function normalizeInstagramHandle(handle) {
  if (!handle || typeof handle !== 'string') return ''
  return handle.trim().replace(/^@/, '').replace(/\s/g, '')
}

/**
 * Digits only for wa.me — if 10-digit Indian mobile, prefix 91.
 */
export function normalizeWhatsAppDigits(input) {
  if (!input || typeof input !== 'string') return ''
  const d = input.replace(/\D/g, '')
  if (d.length === 10 && /^[6-9]/.test(d)) return `91${d}`
  return d
}
