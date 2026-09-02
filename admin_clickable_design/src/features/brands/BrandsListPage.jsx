import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash2, Star } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import SearchInput from '../../components/ui/SearchInput'
import Table from '../../components/ui/Table'
import Pagination from '../../components/ui/Pagination'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import { BrandsStore } from '../../store'
import { usePagination } from '../../hooks/usePagination'
import { useDisclosure } from '../../hooks/useDisclosure'

export default function BrandsListPage() {
  const navigate = useNavigate()
  const { items: brands, remove } = BrandsStore.useEntityStore()
  const [search, setSearch] = useState('')
  const deleteDialog = useDisclosure()
  const [pendingDelete, setPendingDelete] = useState(null)

  const filtered = useMemo(
    () => brands.filter((b) => !search || b.name.toLowerCase().includes(search.toLowerCase())),
    [brands, search],
  )

  const { page, setPage, totalPages, pageItems, total } = usePagination(filtered, 8)

  return (
    <div>
      <PageHeader
        title="Brands"
        description="Manage the vendor brands featured across the marketplace."
        breadcrumbs={[{ label: 'Dashboard', to: '/' }, { label: 'Brands' }]}
        actions={
          <Button icon={Plus} onClick={() => navigate('/brands/new')}>
            Add Brand
          </Button>
        }
      />

      <Card padded={false}>
        <div className="flex items-center justify-between p-5">
          <SearchInput value={search} onChange={setSearch} placeholder="Search brands…" className="sm:w-72" />
        </div>

        <Table
          columns={[
            {
              key: 'name',
              header: 'Brand',
              render: (b) => (
                <div className="flex items-center gap-3">
                  <img src={b.logo} alt={b.name} className="h-10 w-10 rounded-lg object-cover" />
                  <p className="text-sm font-medium text-ink">{b.name}</p>
                </div>
              ),
            },
            { key: 'productCount', header: 'Products' },
            {
              key: 'rating',
              header: 'Rating',
              render: (b) => (
                <span className="flex items-center gap-1 text-sm text-ink">
                  <Star size={14} className="fill-brand-gold text-brand-gold" />
                  {b.rating} <span className="text-ink-muted">({b.reviewCount})</span>
                </span>
              ),
            },
            { key: 'joinedDate', header: 'Joined', render: (b) => b.joinedDate },
            { key: 'status', header: 'Status', render: (b) => <Badge status={b.status} /> },
            {
              key: 'actions',
              header: '',
              render: (b) => (
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="sm" icon={Pencil} onClick={() => navigate(`/brands/${b.id}/edit`)} />
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Trash2}
                    className="text-danger hover:bg-danger-bg"
                    onClick={() => {
                      setPendingDelete(b)
                      deleteDialog.open()
                    }}
                  />
                </div>
              ),
            },
          ]}
          data={pageItems}
          emptyMessage="No brands match your search."
        />

        <Pagination page={page} totalPages={totalPages} onChange={setPage} total={total} pageSize={8} />
      </Card>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={deleteDialog.close}
        onConfirm={() => pendingDelete && remove(pendingDelete.id)}
        title="Remove brand?"
        description={`"${pendingDelete?.name}" and its storefront will be removed from the marketplace.`}
        confirmLabel="Remove Brand"
      />
    </div>
  )
}
