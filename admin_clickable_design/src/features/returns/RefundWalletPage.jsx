import { useMemo, useState } from 'react'
import { ArrowDownCircle, ArrowUpCircle, Wallet } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import StatCard from '../../components/ui/StatCard'
import SearchInput from '../../components/ui/SearchInput'
import Tabs from '../../components/ui/Tabs'
import Table from '../../components/ui/Table'
import Pagination from '../../components/ui/Pagination'
import { refundTransactions, getWalletBalance } from '../../data/refundWallet'
import { usePagination } from '../../hooks/usePagination'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

const TYPE_TABS = [
  { value: 'all', label: 'All' },
  { value: 'credit', label: 'Credits' },
  { value: 'debit', label: 'Debits' },
]

export default function RefundWalletPage() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')

  const filtered = useMemo(() => {
    return refundTransactions.filter((t) => {
      const matchesType = type === 'all' || t.type === type
      const matchesSearch =
        !search ||
        t.customerName.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase())
      return matchesType && matchesSearch
    })
  }, [search, type])

  const tabsWithCounts = TYPE_TABS.map((tab) => ({
    ...tab,
    count:
      tab.value === 'all'
        ? refundTransactions.length
        : refundTransactions.filter((t) => t.type === tab.value).length,
  }))

  const { page, setPage, totalPages, pageItems, total } = usePagination(filtered, 8)

  const totalCredits = refundTransactions.filter((t) => t.type === 'credit').reduce((s, t) => s + t.amount, 0)
  const totalDebits = refundTransactions.filter((t) => t.type === 'debit').reduce((s, t) => s + t.amount, 0)

  return (
    <div>
      <PageHeader
        title="Refund Wallet"
        description="A combined ledger of all refund-wallet activity across customers."
        breadcrumbs={[
          { label: 'Dashboard', to: '/' },
          { label: 'Return Requests', to: '/returns' },
          { label: 'Refund Wallet' },
        ]}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Net Wallet Balance" value={formatCurrency(getWalletBalance())} icon={Wallet} tone="gold" />
        <StatCard label="Total Credited" value={formatCurrency(totalCredits)} icon={ArrowDownCircle} tone="success" />
        <StatCard label="Total Debited" value={formatCurrency(totalDebits)} icon={ArrowUpCircle} tone="maroon" />
      </div>

      <Card padded={false} className="mt-6">
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <Tabs tabs={tabsWithCounts} active={type} onChange={setType} />
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by customer or description…"
            className="sm:w-72"
          />
        </div>

        <Table
          columns={[
            { key: 'description', header: 'Description' },
            { key: 'customerName', header: 'Customer' },
            { key: 'date', header: 'Date', render: (r) => formatDate(r.date) },
            {
              key: 'amount',
              header: 'Amount',
              render: (r) => (
                <span className={`flex items-center gap-1.5 font-medium ${r.type === 'credit' ? 'text-success' : 'text-danger'}`}>
                  {r.type === 'credit' ? <ArrowDownCircle size={15} /> : <ArrowUpCircle size={15} />}
                  {r.type === 'credit' ? '+' : '-'}
                  {formatCurrency(r.amount)}
                </span>
              ),
            },
          ]}
          data={pageItems}
          emptyMessage="No wallet transactions match your filters."
        />

        <Pagination page={page} totalPages={totalPages} onChange={setPage} total={total} pageSize={8} />
      </Card>
    </div>
  )
}
