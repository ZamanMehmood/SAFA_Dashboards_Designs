import { useMemo } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Check, Truck, PackageCheck, XCircle, ArrowLeft } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Select from '../../components/ui/Select'
import EmptyState from '../../components/ui/EmptyState'
import { OrdersStore } from '../../store'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

const STEPS = ['processing', 'shipped', 'delivered']

function buildTimeline(status, base) {
  if (status === 'cancelled') return base
  const idx = STEPS.indexOf(status)
  return STEPS.map((step, i) => {
    const existing = base.find((b) => b.label.toLowerCase() === step)
    return {
      label: step.charAt(0).toUpperCase() + step.slice(1),
      time: i <= idx ? existing?.time || 'Just now' : null,
      done: i <= idx,
    }
  })
}

export default function OrderDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getById, update } = OrdersStore.useEntityStore()
  const order = getById(id)
  const status = order?.status
  const setStatus = (nextStatus) => update(id, { status: nextStatus })

  const timeline = useMemo(
    () => (order ? buildTimeline(status, order.timeline) : []),
    [status, order],
  )

  if (!order) {
    return <EmptyState message="Order not found." />
  }

  return (
    <div>
      <PageHeader
        title={`Order #${order.orderNumber}`}
        breadcrumbs={[{ label: 'Dashboard', to: '/' }, { label: 'Orders', to: '/orders' }, { label: `#${order.orderNumber}` }]}
        actions={
          <Button variant="outline" icon={ArrowLeft} onClick={() => navigate('/orders')}>
            Back to Orders
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-ink">Order information</h2>
              <Badge status={status} />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-y-3 text-sm sm:grid-cols-4">
              <div>
                <dt className="text-ink-muted">Order date</dt>
                <dd className="font-medium text-ink">{formatDate(order.date)}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Customer</dt>
                <dd className="font-medium text-ink">{order.customerName}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Delivery fee</dt>
                <dd className="font-medium text-ink">{formatCurrency(order.deliveryFee)}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Order total</dt>
                <dd className="font-semibold text-brand-goldDark">{formatCurrency(order.total)}</dd>
              </div>
            </dl>
          </Card>

          <Card padded={false}>
            <h2 className="px-5 pt-5 text-sm font-semibold text-ink">
              Items ({order.items.reduce((n, i) => n + i.qty, 0)})
            </h2>
            <div className="divide-y divide-border px-5">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 py-4">
                  <img src={item.image} alt={item.name} className="h-14 w-14 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{item.name}</p>
                    <p className="text-xs text-ink-muted">{item.brand}</p>
                    <p className="text-xs text-ink-muted">
                      Size {item.size} · {item.color} · Qty {item.qty}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-ink">{formatCurrency(item.price * item.qty)}</p>
                </div>
              ))}
            </div>
            <div className="h-2" />
          </Card>

          {order.hasReturnRequest && (
            <div className="flex items-center justify-between rounded-2xl border border-warning/30 bg-warning-bg p-5">
              <div>
                <p className="text-sm font-medium text-ink">A return request has been filed for this order.</p>
                <p className="text-xs text-ink-muted">Review the request details and reason for return.</p>
              </div>
              <Link to={`/returns/RET-${order.orderNumber}`}>
                <Button variant="secondary" size="sm">
                  View return request
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="space-y-5">
          <Card>
            <h2 className="mb-4 text-sm font-semibold text-ink">Order status</h2>
            {status === 'cancelled' ? (
              <div className="flex items-center gap-2 text-danger">
                <XCircle size={18} />
                <span className="text-sm font-medium">This order was cancelled.</span>
              </div>
            ) : (
              <ol className="relative ml-3 space-y-6 border-l border-border pl-6">
                {timeline.map((step, idx) => (
                  <li key={step.label} className="relative">
                    <span
                      className={`absolute -left-[31px] flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                        step.done
                          ? 'border-success bg-success text-white'
                          : 'border-border bg-card text-transparent'
                      }`}
                    >
                      {step.done && <Check size={12} strokeWidth={3} />}
                    </span>
                    <p className={`text-sm font-medium ${step.done ? 'text-ink' : 'text-ink-soft'}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-ink-muted">{step.time || '--:--'}</p>
                  </li>
                ))}
              </ol>
            )}

            <div className="mt-5 border-t border-border pt-4">
              <label className="mb-1.5 block text-sm font-medium text-ink">Update status</label>
              <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </Select>
            </div>
          </Card>

          {order.delivery && (
            <Card>
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink">
                <Truck size={16} /> Delivery information
              </h2>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Confirmation code</dt>
                  <dd className="font-medium text-ink">{order.delivery.confirmationCode}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Expected delivery</dt>
                  <dd className="font-medium text-ink">{formatDate(order.delivery.expectedDate)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Courier</dt>
                  <dd className="font-medium text-ink">{order.delivery.courierName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Courier company</dt>
                  <dd className="font-medium text-ink">{order.delivery.courierCompany}</dd>
                </div>
              </dl>
              {status !== 'delivered' && status !== 'cancelled' && (
                <Button
                  className="mt-4 w-full"
                  icon={PackageCheck}
                  onClick={() => setStatus('delivered')}
                >
                  Confirm Delivery
                </Button>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
