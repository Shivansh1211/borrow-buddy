export function Card({ children, className = '', padding = true, hover = false }) {
  return (
    <div
      className={`
        rounded-2xl bg-white border border-slate-100 shadow-card
        ${padding ? 'p-6' : ''}
        ${hover ? 'transition-all duration-300 hover:shadow-lg hover:border-brand-100 hover:-translate-y-0.5' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
      <div>
        {title && (
          <h2 className="font-display text-lg font-semibold text-slate-900">{title}</h2>
        )}
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
