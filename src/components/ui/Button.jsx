const variants = {
  primary:
    'bg-brand-600 text-white shadow-soft hover:bg-brand-700 focus-visible:ring-brand-500',
  secondary:
    'bg-white text-brand-700 border border-brand-200 shadow-sm hover:bg-brand-50 focus-visible:ring-brand-400',
  ghost: 'text-brand-700 hover:bg-brand-50 focus-visible:ring-brand-400',
  danger:
    'bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-500',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2.5 text-sm font-medium rounded-xl',
  lg: 'px-6 py-3 text-base font-medium rounded-xl',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2 font-display font-semibold
        transition-all duration-200 ease-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        disabled:opacity-50 disabled:pointer-events-none
        ${variants[variant] ?? variants.primary}
        ${sizes[size] ?? sizes.md}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
