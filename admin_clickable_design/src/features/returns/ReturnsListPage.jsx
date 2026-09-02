import { useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, Wallet } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import SearchInput from '../../components/ui/SearchInput'
import Tabs from '../../components/ui/Tabs'
import Table from '../../components/ui/Table'
import Pagination from '../../components/ui/Pagination'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { ReturnsStore } from '../../store'
import { usePagination } from '../../hooks/usePagination'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

const STATUS_TABS = [
  { value: 'all', label: 'All' },
  { value: 'requested', label: 'Requested' },
  { value: 'order_confirmed', label: 'Approved' },
  { value: 'refunded', label: 'Refunded' },
  { value: 'rejected', label: 'Rejected' },
]

export default function ReturnsListPage() {
  const navigate = useNavigate()
  const { items: returnRequests } = ReturnsStore.useEntityStore()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const filtered = useMemo(() => {
    return returnRequests.filter((r) => {
      const matchesStatus = status === 'all' || r.status === status
      const matchesSearch =
        !search ||
        r.orderNumber.includes(search) ||
        r.customerName.toLowerCase().includes(search.toLowerCase())
      return matchesStatus && matchesSearch
    })
  }, [returnRequests, search, status])

  const tabsWithCounts = STATUS_TABS.map((tab) => ({
    ...tab,
    count:
      tab.value === 'all'
        ? returnRequests.length
        : returnRequests.filter((r) => r.status === tab.value).length,
  }))

  const { page, setPage, totalPages, pageItems, total } = usePagination(filtered, 8)

  return (
    <div>
      <PageHeader
        title="Return Requests"
        description="Review customer return requests and process refunds."
        breadcrumbs={[{ label: 'Dashboard', to: '/' }, { label: 'Return Requests' }]}
        actions={
          <Link to="/returns/wallet">
            <Button variant="outline" icon={Wallet}>
              Refund Wallet
            </Button>
          </Link>
        }
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
            { key: 'returnNumber', header: 'Return #', render: (r) => `#${r.returnNumber}` },
            { key: 'orderNumber', header: 'Order #', render: (r) => `#${r.orderNumber}` },
            { key: 'customerName', header: 'Customer' },
            { key: 'date', header: 'Date', render: (r) => formatDate(r.date) },
            { key: 'amount', header: 'Amount', render: (r) => formatCurrency(r.amount) },
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
                    navigate(`/returns/${r.id}`)
                  }}
                >
                  View
                </Button>
              ),
            },
          ]}
          data={pageItems}
          onRowClick={(row) => navigate(`/returns/${row.id}`)}
          emptyMessage="No return requests match your filters."
        />

        <Pagination page={page} totalPages={totalPages} onChange={setPage} total={total} pageSize={8} />
      </Card>
    </div>
  )
}
