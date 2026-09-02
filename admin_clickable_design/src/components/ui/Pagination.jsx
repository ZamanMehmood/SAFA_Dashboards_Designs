import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ page, totalPages, onChange, total, pageSize }) {
  if (totalPages <= 1) return null

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  )

  return (
    <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm">
      <span className="text-ink-muted">
        Showing <span className="font-medium text-ink">{from}</span>–
        <span className="font-medium text-ink">{to}</span> of{' '}
        <span className="font-medium text-ink">{total}</span>
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-ink hover:bg-surface disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>
        {pages.map((p, idx) => (
          <span key={p} className="flex items-center">
            {idx > 0 && p - pages[idx - 1] > 1 && (
              <span className="px-1 text-ink-soft">…</span>
            )}
            <button
              onClick={() => onChange(p)}
              className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 ${
                p === page
                  ? 'bg-brand-gold text-white'
                  : 'text-ink hover:bg-surface border border-transparent'
              }`}
            >
              {p}
            </button>
          </span>
        ))}
        <button
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-ink hover:bg-surface disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
