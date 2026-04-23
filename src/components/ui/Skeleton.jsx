export function Skeleton({ className = '', rounded = 'xl' }) {
  const r = rounded === 'full' ? 'rounded-full' : rounded === 'lg' ? 'rounded-lg' : 'rounded-xl'
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] ${r} ${className}`}
      aria-hidden
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
      <Skeleton className="h-5 w-2/3 mb-3" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <Skeleton className="h-9 w-full rounded-xl" />
    </div>
  )
}
