import { toneForStatus, labelForStatus } from '../../utils/statusStyles'

const TONES = {
  success: 'bg-success-bg text-success',
  warning: 'bg-warning-bg text-warning',
  danger: 'bg-danger-bg text-danger',
  info: 'bg-info-bg text-info',
  muted: 'bg-surface text-ink-muted border border-border',
  gold: 'bg-brand-goldLight/50 text-brand-goldDark',
}

export default function Badge({ status, tone, children, className = '' }) {
  const resolvedTone = tone || toneForStatus(status)
  const label = children ?? labelForStatus(status)

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${TONES[resolvedTone] || TONES.muted} ${className}`}
    >
      {label}
    </span>
  )
}
