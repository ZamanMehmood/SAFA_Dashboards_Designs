import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null

  return (
    <nav className="flex items-center gap-1.5 text-sm text-ink-muted mb-1">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {idx > 0 && <ChevronRight size={14} className="text-ink-soft" />}
            {item.to && !isLast ? (
              <Link to={item.to} className="hover:text-ink transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-ink font-medium' : ''}>{item.label}</span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
