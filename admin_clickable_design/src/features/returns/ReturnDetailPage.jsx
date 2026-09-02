import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Wallet, Ban } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import EmptyState from '../../components/ui/EmptyState'
import { ReturnsStore } from '../../store'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDateTime } from '../../utils/formatDate'
import { useDisclosure } from '../../hooks/useDisclosure'

export default function ReturnDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getById, update } = ReturnsStore.useEntityStore()
  const request = getById(id)
  const status = request?.status
  const setStatus = (nextStatus) => update(id, { status: nextStatus })
  const rejectDialog = useDisclosure()
  const refundDialog = useDisclosure()

  if (!request) {
    return <EmptyState message="Return request not found." />
  }

  return (
    <div>
      <PageHeader
        title={`Return #${request.returnNumber}`}
        breadcrumbs={[
          { label: 'Dashboard', to: '/' },
          { label: 'Return Requests', to: '/returns' },
          { label: `#${request.returnNumber}` },
        ]}
        actions={
          <Button variant="outline" icon={ArrowLeft} onClick={() => navigate('/returns')}>
            Back to Returns
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-ink">Return information</h2>
              <Badge status={status} />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-y-3 text-sm sm:grid-cols-4">
              <div>
                <dt className="text-ink-muted">Related order</dt>
                <dd>
                  <Link to={`/orders/${request.orderId}`} className="font-medium text-brand-goldDark hover:underline">
                    #{request.orderNumber}
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="text-ink-muted">Customer</dt>
                <dd className="font-medium text-ink">{request.customerName}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Reason</dt>
                <dd className="font-medium text-ink">{request.reason}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Amount</dt>
                <dd className="font-semibold text-brand-goldDark">{formatCurrency(request.amount)}</dd>
              </div>
            </dl>
            {request.notes && (
              <div className="mt-4 rounded-xl bg-surface px-4 py-3 text-sm text-ink-muted">
                “{request.notes}”
              </div>
            )}
          </Card>

          <Card padded={false}>
            <h2 className="px-5 pt-5 text-sm font-semibold text-ink">
              Items to return ({request.items.length})
            </h2>
            <div className="divide-y divide-border px-5">
              {request.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 py-4">
                  <img src={item.image} alt={item.name} className="h-14 w-14 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{item.name}</p>
                    <p className="text-xs text-ink-muted">{item.brand}</p>
                    <p className="text-xs text-ink-muted">
                      Size {item.size} · {item.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-ink">{formatCurrency(item.price)}</p>
                </div>
              ))}
            </div>
            <div className="h-2" />
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <h2 className="mb-4 text-sm font-semibold text-ink">Timeline</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-muted">Requested</dt>
                <dd className="font-medium text-ink">{formatDateTime(request.date)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">Approved</dt>
                <dd className="font-medium text-ink">
                  {request.confirmedAt ? formatDateTime(request.confirmedAt) : '--:--'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">Refunded</dt>
                <dd className="font-medium text-ink">
                  {request.refundedAt ? formatDateTime(request.refundedAt) : '--:--'}
                </dd>
              </div>
            </dl>
          </Card>

          <Card className="space-y-2">
            <h2 className="mb-2 text-sm font-semibold text-ink">Actions</h2>
            {status === 'requested' && (
              <>
                <Button className="w-full" icon={CheckCircle2} onClick={() => setStatus('order_confirmed')}>
                  Approve Return
                </Button>
                <Button className="w-full" variant="danger" icon={Ban} onClick={rejectDialog.open}>
                  Reject Return
                </Button>
              </>
            )}
            {status === 'order_confirmed' && (
              <>
                <Button className="w-full" icon={Wallet} onClick={refundDialog.open}>
                  Mark as Refunded
                </Button>
                <Button className="w-full" variant="danger" icon={Ban} onClick={rejectDialog.open}>
                  Reject Return
                </Button>
              </>
            )}
            {(status === 'refunded' || status === 'rejected') && (
              <p className="text-sm text-ink-muted">This return has been {status === 'refunded' ? 'refunded' : 'rejected'} — no further action needed.</p>
            )}
          </Card>
        </div>
      </div>

      <ConfirmDialog
        isOpen={rejectDialog.isOpen}
        onClose={rejectDialog.close}
        onConfirm={() => setStatus('rejected')}
        title="Reject return request?"
        description="The customer will be notified that this return request was rejected. This action cannot be undone."
        confirmLabel="Reject Return"
      />
      <ConfirmDialog
        isOpen={refundDialog.isOpen}
        onClose={refundDialog.close}
        onConfirm={() => setStatus('refunded')}
        title="Mark as refunded?"
        description={`This will confirm that ${formatCurrency(request.amount)} has been credited to the customer's refund wallet.`}
        confirmLabel="Mark as Refunded"
        tone="primary"
      />
    </div>
  )
}
