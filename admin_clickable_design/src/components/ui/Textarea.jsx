export default function Textarea({ className = '', error, rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      className={`w-full rounded-xl border bg-card px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-brand-gold/40 ${
        error ? 'border-danger' : 'border-border'
      } ${className}`}
      {...props}
    />
  )
}
