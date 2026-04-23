export function Textarea({ id, label, error, hint, className = '', ...props }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={4}
        className={`
          w-full rounded-xl border bg-white px-4 py-2.5 text-slate-900 text-sm
          placeholder:text-slate-400 resize-y min-h-[100px]
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500
          ${error ? 'border-red-400' : 'border-slate-200'}
        `}
        {...props}
      />
      {hint && !error && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
