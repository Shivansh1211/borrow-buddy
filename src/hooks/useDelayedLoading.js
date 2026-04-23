import { useState, useEffect } from 'react'

/**
 * Simulates async data loading for skeleton demos.
 * @param {number} ms - Delay before showing loaded content
 * @param {boolean} [active=true] - When false, skips delay (e.g. after first load)
 */
export function useDelayedLoading(ms = 600, active = true) {
  const [loading, setLoading] = useState(active)

  useEffect(() => {
    if (!active) {
      setLoading(false)
      return
    }
    setLoading(true)
    const t = setTimeout(() => setLoading(false), ms)
    return () => clearTimeout(t)
  }, [ms, active])

  return loading
}
