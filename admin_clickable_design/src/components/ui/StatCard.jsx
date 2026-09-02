import Card from './Card'

const TONES = {
  gold: 'bg-brand-gold/10 text-brand-goldDark',
  maroon: 'bg-brand-maroon/10 text-brand-maroon',
  success: 'bg-success-bg text-success',
  info: 'bg-info-bg text-info',
}

export default function StatCard({ label, value, icon: Icon, tone = 'gold', trend }) {
  return (
    <Card className="flex items-center gap-4">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${TONES[tone]}`}>
        {Icon && <Icon size={20} />}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-ink-muted">{label}</p>
        <p className="text-xl font-semibold text-ink truncate">{value}</p>
        {trend && (
          <p className={`text-xs mt-0.5 ${trend.positive ? 'text-success' : 'text-danger'}`}>
            {trend.label}
          </p>
        )}
      </div>
    </Card>
  )
}
