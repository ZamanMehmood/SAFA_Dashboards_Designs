export default function Input({ className = '', error, ...props }) {
  return (
    <input
      className={`h-10 w-full rounded-xl border bg-card px-3.5 text-sm text-ink placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-brand-gold/40 ${
        error ? 'border-danger' : 'border-border'
      } ${className}`}
      {...props}
    />
  )
}
