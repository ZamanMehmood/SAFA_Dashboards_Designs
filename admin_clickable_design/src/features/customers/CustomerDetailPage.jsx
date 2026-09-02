import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Ban, CheckCircle2, MapPin, Phone } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Table from '../../components/ui/Table'
import EmptyState from '../../components/ui/EmptyState'
import { CustomersStore, OrdersStore } from '../../store'
import { refundTransactions } from '../../data/refundWallet'
import { nextTier } from '../../data/loyaltyTiers'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

export default function CustomerDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getById, update } = CustomersStore.useEntityStore()
  const { items: orders } = OrdersStore.useEntityStore()
  const customer = getById(id)

  if (!customer) {
    return <EmptyState message="Customer not found." />
  }

  const customerOrders = orders.filter((o) => o.customerId === customer.id)
  const customerTransactions = refundTransactions.filter((t) => t.customerId === customer.id)
  const upcomingTier = nextTier(customer.points)
  const progress = upcomingTier
    ? Math.min(100, Math.round((customer.points / upcomingTier.minPoints) * 100))
    : 100

  return (
    <div>
      <PageHeader
        title={customer.name}
        breadcrumbs={[
          { label: 'Dashboard', to: '/' },
          { label: 'Customers', to: '/customers' },
          { label: customer.name },
        ]}
        actions={
          <div className="flex gap-2">
            <Button
              variant={customer.status === 'suspended' ? 'primary' : 'danger'}
              icon={customer.status === 'suspended' ? CheckCircle2 : Ban}
              onClick={() => update(customer.id, { status: customer.status === 'suspended' ? 'active' : 'suspended' })}
            >
              {customer.status === 'suspended' ? 'Reactivate Account' : 'Suspend Account'}
            </Button>
            <Button variant="outline" icon={ArrowLeft} onClick={() => navigate('/customers')}>
              Back
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-ink">Profile</h2>
              <Badge status={customer.status} />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-y-3 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-ink-muted">Email</dt>
                <dd className="font-medium text-ink">{customer.email}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Phone</dt>
                <dd className="font-medium text-ink">{customer.phone}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Joined</dt>
                <dd className="font-medium text-ink">{formatDate(customer.joinedDate)}</dd>
              </div>
            </dl>
          </Card>

          <Card padded={false}>
            <h2 className="px-5 pt-5 text-sm font-semibold text-ink">Order history</h2>
            <Table
              columns={[
                { key: 'orderNumber', header: 'Order #', render: (o) => `#${o.orderNumber}` },
                { key: 'date', header: 'Date', render: (o) => formatDate(o.date) },
                { key: 'total', header: 'Total', render: (o) => formatCurrency(o.total) },
                { key: 'status', header: 'Status', render: (o) => <Badge status={o.status} /> },
              ]}
              data={customerOrders}
              onRowClick={(row) => navigate(`/orders/${row.id}`)}
              emptyMessage="This customer has not placed any orders yet."
            />
          </Card>

          <Card padded={false}>
            <h2 className="px-5 pt-5 text-sm font-semibold text-ink">Wallet transactions</h2>
            <Table
              columns={[
                { key: 'description', header: 'Description' },
                { key: 'date', header: 'Date', render: (t) => formatDate(t.date) },
                {
                  key: 'amount',
                  header: 'Amount',
                  render: (t) => (
                    <span className={t.type === 'credit' ? 'text-success' : 'text-danger'}>
                      {t.type === 'credit' ? '+' : '-'}
                      {formatCurrency(t.amount)}
                    </span>
                  ),
                },
              ]}
              data={customerTransactions}
              emptyMessage="No wallet activity for this customer."
            />
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <h2 className="mb-3 text-sm font-semibold text-ink">Loyalty</h2>
            <div className="flex items-center justify-between">
              <Badge tone="gold">{customer.tier} Membership</Badge>
              <span className="text-sm font-medium text-ink">{customer.points.toLocaleString()} pts</span>
            </div>
            {upcomingTier && (
              <>
                <div className="mt-3 h-2 rounded-full bg-surface">
                  <div className="h-2 rounded-full bg-brand-gold" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-2 text-xs text-ink-muted">
                  {upcomingTier.minPoints - customer.points} points to {upcomingTier.name} Membership
                </p>
              </>
            )}
          </Card>

          <Card>
            <h2 className="mb-3 text-sm font-semibold text-ink">Wallet balance</h2>
            <p className="text-2xl font-semibold text-brand-goldDark">{formatCurrency(customer.walletBalance)}</p>
          </Card>

          <Card>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
              <MapPin size={16} /> Addresses
            </h2>
            {customer.addresses.length === 0 ? (
              <p className="text-sm text-ink-muted">No saved addresses.</p>
            ) : (
              <div className="space-y-3">
                {customer.addresses.map((addr) => (
                  <div key={addr.id} className="rounded-xl border border-border p-3">
                    <p className="text-sm font-medium text-ink">{addr.label}</p>
                    <p className="text-xs text-ink-muted">{addr.line1}</p>
                    <p className="text-xs text-ink-muted">
                      {addr.city}, {addr.country}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-ink-muted">
                      <Phone size={12} /> {addr.phone}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
