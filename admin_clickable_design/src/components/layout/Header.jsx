import { Menu, Bell, Search } from 'lucide-react'

export default function Header({ onOpenMobile }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b border-border bg-card/90 backdrop-blur px-4 sm:px-6">
      <button
        onClick={onOpenMobile}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted hover:bg-surface lg:hidden"
      >
        <Menu size={20} />
      </button>

      <div className="relative hidden max-w-xs flex-1 sm:block">
        <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" />
        <input
          type="text"
          placeholder="Search orders, products, customers…"
          className="h-9 w-full rounded-xl border border-border bg-surface pl-9 pr-3 text-sm text-ink placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted hover:bg-surface">
          <Bell size={19} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" />
        </button>
        <div className="flex items-center gap-2.5 border-l border-border pl-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-maroon text-sm font-semibold text-white">
            AM
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium leading-tight text-ink">Admin Manager</p>
            <p className="text-xs leading-tight text-ink-muted">Store Admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}
