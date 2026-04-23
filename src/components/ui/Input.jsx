export function Input({
  id,
  label,
  error,
  hint,
  className = '',
  inputClassName = '',
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`
          w-full rounded-xl border bg-white px-4 py-2.5 text-slate-900 text-sm
          placeholder:text-slate-400
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500
          ${error ? 'border-red-400 focus:ring-red-200 focus:border-red-500' : 'border-slate-200'}
          ${inputClassName}
        `}
        {...props}
      />
      {hint && !error && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
