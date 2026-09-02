import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import SearchInput from '../../components/ui/SearchInput'
import Tabs from '../../components/ui/Tabs'
import Table from '../../components/ui/Table'
import Pagination from '../../components/ui/Pagination'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { OrdersStore } from '../../store'
import { usePagination } from '../../hooks/usePagination'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

const STATUS_TABS = [
  { value: 'all', label: 'All' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
]

export default function OrdersListPage() {
  const navigate = useNavigate()
  const { items: orders } = OrdersStore.useEntityStore()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchesStatus = status === 'all' || o.status === status
      const matchesSearch =
        !search ||
        o.orderNumber.includes(search) ||
        o.customerName.toLowerCase().includes(search.toLowerCase())
      return matchesStatus && matchesSearch
    })
  }, [orders, search, status])

  const tabsWithCounts = STATUS_TABS.map((tab) => ({
    ...tab,
    count: tab.value === 'all' ? orders.length : orders.filter((o) => o.status === tab.value).length,
  }))

  const { page, setPage, totalPages, pageItems, total } = usePagination(filtered, 8)

  return (
    <div>
      <PageHeader
        title="Orders"
        description="Track and manage every customer order from placement to delivery."
        breadcrumbs={[{ label: 'Dashboard', to: '/' }, { label: 'Orders' }]}
      />

      <Card padded={false}>
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <Tabs tabs={tabsWithCounts} active={status} onChange={setStatus} />
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by order # or customer…"
            className="sm:w-72"
          />
        </div>

        <Table
          columns={[
            { key: 'orderNumber', header: 'Order #', render: (r) => `#${r.orderNumber}` },
            { key: 'customerName', header: 'Customer' },
            { key: 'date', header: 'Date', render: (r) => formatDate(r.date) },
            { key: 'items', header: 'Items', render: (r) => r.items.reduce((n, i) => n + i.qty, 0) },
            { key: 'total', header: 'Total', render: (r) => formatCurrency(r.total) },
            { key: 'status', header: 'Status', render: (r) => <Badge status={r.status} /> },
            {
              key: 'actions',
              header: '',
              render: (r) => (
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Eye}
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/orders/${r.id}`)
                  }}
                >
                  View
                </Button>
              ),
            },
          ]}
          data={pageItems}
          onRowClick={(row) => navigate(`/orders/${row.id}`)}
          emptyMessage="No orders match your filters."
        />

        <Pagination page={page} totalPages={totalPages} onChange={setPage} total={total} pageSize={8} />
      </Card>
    </div>
  )
}
