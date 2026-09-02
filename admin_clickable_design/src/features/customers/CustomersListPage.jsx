import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Ban, CheckCircle2 } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import SearchInput from '../../components/ui/SearchInput'
import Tabs from '../../components/ui/Tabs'
import Table from '../../components/ui/Table'
import Pagination from '../../components/ui/Pagination'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { CustomersStore } from '../../store'
import { usePagination } from '../../hooks/usePagination'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

const STATUS_TABS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'suspended', label: 'Suspended' },
  { value: 'inactive', label: 'Inactive' },
]

export default function CustomersListPage() {
  const navigate = useNavigate()
  const { items: customers, update } = CustomersStore.useEntityStore()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchesStatus = status === 'all' || c.status === status
      const matchesSearch =
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
      return matchesStatus && matchesSearch
    })
  }, [customers, search, status])

  const tabsWithCounts = STATUS_TABS.map((tab) => ({
    ...tab,
    count: tab.value === 'all' ? customers.length : customers.filter((c) => c.status === tab.value).length,
  }))

  const { page, setPage, totalPages, pageItems, total } = usePagination(filtered, 8)

  return (
    <div>
      <PageHeader
        title="Customers"
        description="View customer accounts, loyalty status and wallet balances."
        breadcrumbs={[{ label: 'Dashboard', to: '/' }, { label: 'Customers' }]}
      />

      <Card padded={false}>
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <Tabs tabs={tabsWithCounts} active={status} onChange={setStatus} />
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by name or email…"
            className="sm:w-72"
          />
        </div>

        <Table
          columns={[
            {
              key: 'name',
              header: 'Customer',
              render: (c) => (
                <div>
                  <p className="text-sm font-medium text-ink">{c.name}</p>
                  <p className="text-xs text-ink-muted">{c.email}</p>
                </div>
              ),
            },
            { key: 'tier', header: 'Tier', render: (c) => <Badge tone="gold">{c.tier}</Badge> },
            { key: 'points', header: 'Points', render: (c) => c.points.toLocaleString() },
            { key: 'walletBalance', header: 'Wallet', render: (c) => formatCurrency(c.walletBalance) },
            { key: 'joinedDate', header: 'Joined', render: (c) => formatDate(c.joinedDate) },
            { key: 'status', header: 'Status', render: (c) => <Badge status={c.status} /> },
            {
              key: 'actions',
              header: '',
              render: (c) => (
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Eye}
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/customers/${c.id}`)
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={c.status === 'suspended' ? CheckCircle2 : Ban}
                    className={c.status === 'suspended' ? 'text-success hover:bg-success-bg' : 'text-danger hover:bg-danger-bg'}
                    onClick={(e) => {
                      e.stopPropagation()
                      update(c.id, { status: c.status === 'suspended' ? 'active' : 'suspended' })
                    }}
                  />
                </div>
              ),
            },
          ]}
          data={pageItems}
          onRowClick={(row) => navigate(`/customers/${row.id}`)}
          emptyMessage="No customers match your filters."
        />

        <Pagination page={page} totalPages={totalPages} onChange={setPage} total={total} pageSize={8} />
      </Card>
    </div>
  )
}
