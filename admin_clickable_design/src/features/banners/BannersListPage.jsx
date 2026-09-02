import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import Table from '../../components/ui/Table'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import { BannersStore } from '../../store'
import { useDisclosure } from '../../hooks/useDisclosure'
import { formatDate } from '../../utils/formatDate'

export default function BannersListPage() {
  const navigate = useNavigate()
  const { items: banners, remove } = BannersStore.useEntityStore()
  const deleteDialog = useDisclosure()
  const [pendingDelete, setPendingDelete] = useState(null)

  return (
    <div>
      <PageHeader
        title="Banners & Promotions"
        description="Manage the promotional banners shown across the home screen."
        breadcrumbs={[{ label: 'Dashboard', to: '/' }, { label: 'Banners & Promotions' }]}
        actions={
          <Button icon={Plus} onClick={() => navigate('/banners/new')}>
            Add Banner
          </Button>
        }
      />

      <Card padded={false}>
        <Table
          columns={[
            {
              key: 'title',
              header: 'Banner',
              render: (b) => (
                <div className="flex items-center gap-3">
                  <img src={b.image} alt={b.title} className="h-12 w-20 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-medium text-ink">{b.title}</p>
                    <p className="text-xs text-ink-muted">{b.subtitle}</p>
                  </div>
                </div>
              ),
            },
            { key: 'placement', header: 'Placement' },
            {
              key: 'dates',
              header: 'Active dates',
              render: (b) => `${formatDate(b.startDate)} – ${formatDate(b.endDate)}`,
            },
            { key: 'status', header: 'Status', render: (b) => <Badge status={b.status} /> },
            {
              key: 'actions',
              header: '',
              render: (b) => (
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="sm" icon={Pencil} onClick={() => navigate(`/banners/${b.id}/edit`)} />
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
          data={banners}
          emptyMessage="No banners yet."
        />
      </Card>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={deleteDialog.close}
        onConfirm={() => pendingDelete && remove(pendingDelete.id)}
        title="Delete banner?"
        description={`"${pendingDelete?.title}" will be removed from the home screen immediately.`}
        confirmLabel="Delete Banner"
      />
    </div>
  )
}
