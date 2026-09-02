import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash2, Star } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import SearchInput from '../../components/ui/SearchInput'
import Select from '../../components/ui/Select'
import Tabs from '../../components/ui/Tabs'
import Table from '../../components/ui/Table'
import Pagination from '../../components/ui/Pagination'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import { ProductsStore, BrandsStore, CategoriesStore } from '../../store'
import { usePagination } from '../../hooks/usePagination'
import { useDisclosure } from '../../hooks/useDisclosure'
import { formatCurrency } from '../../utils/formatCurrency'

const STATUS_TABS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'limited_stock', label: 'Limited Stock' },
  { value: 'out_of_stock', label: 'Out of Stock' },
  { value: 'draft', label: 'Draft' },
]

export default function ProductsListPage() {
  const navigate = useNavigate()
  const { items: products, remove } = ProductsStore.useEntityStore()
  const { items: brands } = BrandsStore.useEntityStore()
  const { items: categories } = CategoriesStore.useEntityStore()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [brandFilter, setBrandFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const deleteDialog = useDisclosure()
  const [pendingDelete, setPendingDelete] = useState(null)

  const brandName = (brandId) => brands.find((b) => b.id === brandId)?.name || '—'
  const categoryName = (categoryId) => categories.find((c) => c.id === categoryId)?.name || '—'

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesStatus = status === 'all' || p.status === status
      const matchesBrand = brandFilter === 'all' || p.brandId === brandFilter
      const matchesCategory = categoryFilter === 'all' || p.categoryId === categoryFilter
      const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase())
      return matchesStatus && matchesBrand && matchesCategory && matchesSearch
    })
  }, [products, search, status, brandFilter, categoryFilter])

  const tabsWithCounts = STATUS_TABS.map((tab) => ({
    ...tab,
    count: tab.value === 'all' ? products.length : products.filter((p) => p.status === tab.value).length,
  }))

  const { page, setPage, totalPages, pageItems, total } = usePagination(filtered, 8)

  return (
    <div>
      <PageHeader
        title="Products"
        description="Manage the product catalog, pricing, variants and availability."
        breadcrumbs={[{ label: 'Dashboard', to: '/' }, { label: 'Products' }]}
        actions={
          <Button icon={Plus} onClick={() => navigate('/products/new')}>
            Add Product
          </Button>
        }
      />

      <Card padded={false}>
        <div className="flex flex-col gap-3 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Tabs tabs={tabsWithCounts} active={status} onChange={setStatus} />
            <SearchInput value={search} onChange={setSearch} placeholder="Search products…" className="sm:w-72" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)} className="sm:w-52">
              <option value="all">All brands</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </Select>
            <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="sm:w-52">
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <Table
          columns={[
            {
              key: 'name',
              header: 'Product',
              render: (p) => (
                <div className="flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{p.name}</p>
                    <p className="text-xs text-ink-muted">{brandName(p.brandId)}</p>
                  </div>
                </div>
              ),
            },
            { key: 'category', header: 'Category', render: (p) => categoryName(p.categoryId) },
            { key: 'price', header: 'Price', render: (p) => formatCurrency(p.price) },
            {
              key: 'rating',
              header: 'Rating',
              render: (p) => (
                <span className="flex items-center gap-1 text-sm text-ink">
                  <Star size={14} className="fill-brand-gold text-brand-gold" />
                  {p.rating} <span className="text-ink-muted">({p.reviewCount})</span>
                </span>
              ),
            },
            { key: 'status', header: 'Status', render: (p) => <Badge status={p.status} /> },
            {
              key: 'actions',
              header: '',
              render: (p) => (
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Pencil}
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/products/${p.id}/edit`)
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Trash2}
                    className="text-danger hover:bg-danger-bg"
                    onClick={(e) => {
                      e.stopPropagation()
                      setPendingDelete(p)
                      deleteDialog.open()
                    }}
                  />
                </div>
              ),
            },
          ]}
          data={pageItems}
          onRowClick={(row) => navigate(`/products/${row.id}/edit`)}
          emptyMessage="No products match your filters."
        />

        <Pagination page={page} totalPages={totalPages} onChange={setPage} total={total} pageSize={8} />
      </Card>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={deleteDialog.close}
        onConfirm={() => pendingDelete && remove(pendingDelete.id)}
        title="Delete product?"
        description={`"${pendingDelete?.name}" will be permanently removed from the catalog. This cannot be undone.`}
        confirmLabel="Delete Product"
      />
    </div>
  )
}
