export default function Card({ className = '', padded = true, children, ...props }) {
  return (
    <div
      className={`bg-card border border-border rounded-2xl shadow-card ${padded ? 'p-5' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
