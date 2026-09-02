import { ChevronDown } from 'lucide-react'

export default function Select({ className = '', error, children, ...props }) {
  return (
    <div className="relative">
      <select
        className={`h-10 w-full appearance-none rounded-xl border bg-card px-3.5 pr-9 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-gold/40 ${
          error ? 'border-danger' : 'border-border'
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted"
      />
    </div>
  )
}
