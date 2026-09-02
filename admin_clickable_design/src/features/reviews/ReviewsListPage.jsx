import { useMemo, useState } from 'react'
import { Star, Trash2, EyeOff, Eye, BadgeCheck } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import StatCard from '../../components/ui/StatCard'
import SearchInput from '../../components/ui/SearchInput'
import Tabs from '../../components/ui/Tabs'
import Table from '../../components/ui/Table'
import Pagination from '../../components/ui/Pagination'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import { ReviewsStore } from '../../store'
import { usePagination } from '../../hooks/usePagination'
import { useDisclosure } from '../../hooks/useDisclosure'
import { formatDate } from '../../utils/formatDate'

const RATING_TABS = [
  { value: 'all', label: 'All ratings' },
  { value: '5', label: '5 stars' },
  { value: '4', label: '4 stars' },
  { value: '3', label: '3 stars' },
  { value: '2', label: '2 stars' },
  { value: '1', label: '1 star' },
]

function Stars({ rating }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={13} className={n <= rating ? 'fill-brand-gold text-brand-gold' : 'text-border'} />
      ))}
    </span>
  )
}

export default function ReviewsListPage() {
  const { items: reviews, update, remove } = ReviewsStore.useEntityStore()
  const [search, setSearch] = useState('')
  const [rating, setRating] = useState('all')
  const deleteDialog = useDisclosure()
  const [pendingDelete, setPendingDelete] = useState(null)

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      const matchesRating = rating === 'all' || String(r.rating) === rating
      const matchesSearch =
        !search ||
        r.customerName.toLowerCase().includes(search.toLowerCase()) ||
        r.productName.toLowerCase().includes(search.toLowerCase())
      return matchesRating && matchesSearch
    })
  }, [reviews, search, rating])

  const averageRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '—'
  const flaggedCount = reviews.filter((r) => r.status === 'flagged').length

  const { page, setPage, totalPages, pageItems, total } = usePagination(filtered, 8)

  const toggleVisibility = (review) =>
    update(review.id, { status: review.status === 'hidden' ? 'published' : 'hidden' })

  return (
    <div>
      <PageHeader
        title="Reviews"
        description="Moderate customer ratings and reviews across all products."
        breadcrumbs={[{ label: 'Dashboard', to: '/' }, { label: 'Reviews' }]}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Reviews" value={reviews.length} icon={Star} tone="gold" />
        <StatCard label="Average Rating" value={averageRating} icon={BadgeCheck} tone="success" />
        <StatCard label="Flagged for Review" value={flaggedCount} icon={EyeOff} tone="maroon" />
      </div>

      <Card padded={false} className="mt-6">
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <Tabs tabs={RATING_TABS} active={rating} onChange={setRating} />
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by customer or product…"
            className="sm:w-72"
          />
        </div>

        <Table
          columns={[
            {
              key: 'review',
              header: 'Review',
              render: (r) => (
                <div className="max-w-md">
                  <div className="flex items-center gap-2">
                    <Stars rating={r.rating} />
                    <span className="text-xs text-ink-muted">{formatDate(r.date)}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{r.comment}</p>
                </div>
              ),
            },
            { key: 'productName', header: 'Product' },
            {
              key: 'customerName',
              header: 'Customer',
              render: (r) => (
                <span className="flex items-center gap-1">
                  {r.customerName}
                  {r.verifiedPurchase && <BadgeCheck size={14} className="text-success" />}
                </span>
              ),
            },
            { key: 'status', header: 'Status', render: (r) => <Badge status={r.status} /> },
            {
              key: 'actions',
              header: '',
              render: (r) => (
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={r.status === 'hidden' ? Eye : EyeOff}
                    onClick={() => toggleVisibility(r)}
                  >
                    {r.status === 'hidden' ? 'Unhide' : 'Hide'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Trash2}
                    className="text-danger hover:bg-danger-bg"
                    onClick={() => {
                      setPendingDelete(r)
                      deleteDialog.open()
                    }}
                  />
                </div>
              ),
            },
          ]}
          data={pageItems}
          emptyMessage="No reviews match your filters."
        />

        <Pagination page={page} totalPages={totalPages} onChange={setPage} total={total} pageSize={8} />
      </Card>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={deleteDialog.close}
        onConfirm={() => pendingDelete && remove(pendingDelete.id)}
        title="Delete review?"
        description="This review will be permanently removed and will no longer count toward the product's rating."
        confirmLabel="Delete Review"
      />
    </div>
  )
}
