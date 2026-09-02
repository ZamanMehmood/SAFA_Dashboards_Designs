const VARIANTS = {
  primary:
    'bg-brand-gold text-white hover:bg-brand-goldDark shadow-sm disabled:opacity-50',
  secondary:
    'bg-brand-maroon text-white hover:bg-brand-maroonDark shadow-sm disabled:opacity-50',
  outline:
    'border border-border bg-card text-ink hover:bg-surface disabled:opacity-50',
  ghost: 'text-ink hover:bg-surface disabled:opacity-50',
  danger: 'bg-danger text-white hover:bg-danger/90 disabled:opacity-50',
}

const SIZES = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-11 px-5 text-sm gap-2',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  children,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={16} strokeWidth={2} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={16} strokeWidth={2} />}
    </button>
  )
}
