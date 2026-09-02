import { Inbox } from 'lucide-react'

export default function EmptyState({ icon: Icon = Inbox, message = 'Nothing here yet.', action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-ink-soft">
        <Icon size={22} />
      </div>
      <p className="text-sm text-ink-muted max-w-xs">{message}</p>
      {action}
    </div>
  )
}
