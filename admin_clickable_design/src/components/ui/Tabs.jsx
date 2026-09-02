export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-xl bg-surface p-1 border border-border">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
            active === tab.value
              ? 'bg-card text-ink shadow-sm'
              : 'text-ink-muted hover:text-ink'
          }`}
        >
          {tab.label}
          {typeof tab.count === 'number' && (
            <span
              className={`rounded-full px-1.5 text-xs ${
                active === tab.value ? 'bg-brand-goldLight/60 text-brand-goldDark' : 'bg-border/70 text-ink-muted'
              }`}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
