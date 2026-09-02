import { ShoppingBag, Undo2, Users, Package, Wallet } from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from 'recharts'
import PageHeader from '../../components/ui/PageHeader'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import Table from '../../components/ui/Table'
import Badge from '../../components/ui/Badge'
import { OrdersStore, ReturnsStore, CustomersStore, ProductsStore } from '../../store'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'
import { useNavigate } from 'react-router-dom'

const revenueSeries = [
  { name: 'Mar', revenue: 42000 },
  { name: 'Apr', revenue: 38500 },
  { name: 'May', revenue: 51200 },
  { name: 'Jun', revenue: 47800 },
  { name: 'Jul', revenue: 60200 },
  { name: 'Aug', revenue: 68400 },
]

const ordersSeries = [
  { name: 'Mon', orders: 18 },
  { name: 'Tue', orders: 24 },
  { name: 'Wed', orders: 15 },
  { name: 'Thu', orders: 29 },
  { name: 'Fri', orders: 32 },
  { name: 'Sat', orders: 40 },
  { name: 'Sun', orders: 21 },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const { items: orders } = OrdersStore.useEntityStore()
  const { items: returnRequests } = ReturnsStore.useEntityStore()
  const { items: customers } = CustomersStore.useEntityStore()
  const { items: products } = ProductsStore.useEntityStore()
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const pendingReturns = returnRequests.filter((r) => r.status !== 'refunded' && r.status !== 'rejected').length
  const recentOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)

  return (
    <div>
      <PageHeader title="Dashboard" description="Overview of store performance and recent activity." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Total Orders" value={orders.length} icon={ShoppingBag} tone="gold" />
        <StatCard
          label="Total Revenue"
          value={formatCurrency(totalRevenue)}
          icon={Wallet}
          tone="success"
        />
        <StatCard label="Pending Returns" value={pendingReturns} icon={Undo2} tone="maroon" />
        <StatCard label="Active Customers" value={customers.filter((c) => c.status === 'active').length} icon={Users} tone="info" />
        <StatCard label="Products Listed" value={products.length} icon={Package} tone="gold" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold text-ink">Revenue (last 6 months)</h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueSeries} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C89B4A" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#C89B4A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E7E2DA" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#8A8280' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 12, fill: '#8A8280' }}
                axisLine={false}
                tickLine={false}
                width={44}
                tickFormatter={(value) => `${Math.round(value / 1000)}k`}
              />
              <Tooltip
                formatter={(value) => formatCurrency(value)}
                contentStyle={{ borderRadius: 12, borderColor: '#E7E2DA', fontSize: 13 }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#A97C2F" strokeWidth={2} fill="url(#revenueFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="mb-4 text-sm font-semibold text-ink">Orders this week</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={ordersSeries} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E7E2DA" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#8A8280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#8A8280' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, borderColor: '#E7E2DA', fontSize: 13 }} />
              <Bar dataKey="orders" fill="#5C1A3B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="mt-6" padded={false}>
        <div className="flex items-center justify-between px-5 pt-5">
          <h2 className="text-sm font-semibold text-ink">Recent orders</h2>
        </div>
        <div className="mt-3">
          <Table
            columns={[
              { key: 'orderNumber', header: 'Order #', render: (r) => `#${r.orderNumber}` },
              { key: 'customerName', header: 'Customer' },
              { key: 'date', header: 'Date', render: (r) => formatDate(r.date) },
              { key: 'total', header: 'Total', render: (r) => formatCurrency(r.total) },
              { key: 'status', header: 'Status', render: (r) => <Badge status={r.status} /> },
            ]}
            data={recentOrders}
            onRowClick={(row) => navigate(`/orders/${row.id}`)}
          />
        </div>
      </Card>
    </div>
  )
}
