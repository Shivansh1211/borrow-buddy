export function Toggle({ id, label, checked, onChange, description }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3">
      <div>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-slate-800">
            {label}
          </label>
        )}
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`
          relative h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2
          ${checked ? 'bg-brand-600' : 'bg-slate-300'}
        `}
      >
        <span
          className={`
            absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ease-out
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  )
}
