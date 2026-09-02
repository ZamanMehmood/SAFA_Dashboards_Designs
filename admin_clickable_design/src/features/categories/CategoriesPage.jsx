import { useMemo, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import Table from '../../components/ui/Table'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import FormField from '../../components/ui/FormField'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import { CategoriesStore } from '../../store'
import { useDisclosure } from '../../hooks/useDisclosure'

const emptyForm = { name: '', parentId: '', status: 'active' }

export default function CategoriesPage() {
  const { items: categories, add, update, remove } = CategoriesStore.useEntityStore()
  const formModal = useDisclosure()
  const deleteDialog = useDisclosure()
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [pendingDelete, setPendingDelete] = useState(null)

  const topLevel = categories.filter((c) => c.parentId === null)
  const sorted = useMemo(() => {
    const rows = []
    topLevel.forEach((parent) => {
      rows.push(parent)
      categories.filter((c) => c.parentId === parent.id).forEach((child) => rows.push(child))
    })
    return rows
  }, [categories, topLevel])

  const parentName = (parentId) => categories.find((c) => c.id === parentId)?.name

  const openAdd = () => {
    setEditingId(null)
    setForm(emptyForm)
    setError('')
    formModal.open()
  }

  const openEdit = (category) => {
    setEditingId(category.id)
    setForm({ name: category.name, parentId: category.parentId || '', status: category.status })
    setError('')
    formModal.open()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Category name is required.')
      return
    }
    const payload = {
      name: form.name.trim(),
      parentId: form.parentId || null,
      status: form.status,
    }
    if (editingId) {
      update(editingId, payload)
    } else {
      add({ id: `cat-${Date.now()}`, productCount: 0, ...payload })
    }
    formModal.close()
  }

  return (
    <div>
      <PageHeader
        title="Categories"
        description="Organize the catalog into browsable categories and sub-categories."
        breadcrumbs={[{ label: 'Dashboard', to: '/' }, { label: 'Categories' }]}
        actions={
          <Button icon={Plus} onClick={openAdd}>
            Add Category
          </Button>
        }
      />

      <Card padded={false}>
        <Table
          columns={[
            {
              key: 'name',
              header: 'Name',
              render: (c) => (
                <span className={c.parentId ? 'pl-6 text-ink-muted' : 'font-medium text-ink'}>
                  {c.parentId ? '— ' : ''}
                  {c.name}
                </span>
              ),
            },
            { key: 'parent', header: 'Parent', render: (c) => (c.parentId ? parentName(c.parentId) : '—') },
            { key: 'productCount', header: 'Products' },
            { key: 'status', header: 'Status', render: (c) => <Badge status={c.status} /> },
            {
              key: 'actions',
              header: '',
              render: (c) => (
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="sm" icon={Pencil} onClick={() => openEdit(c)} />
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Trash2}
                    className="text-danger hover:bg-danger-bg"
                    onClick={() => {
                      setPendingDelete(c)
                      deleteDialog.open()
                    }}
                  />
                </div>
              ),
            },
          ]}
          data={sorted}
          emptyMessage="No categories yet."
        />
      </Card>

      <Modal
        isOpen={formModal.isOpen}
        onClose={formModal.close}
        title={editingId ? 'Edit Category' : 'Add Category'}
        footer={
          <>
            <Button variant="outline" onClick={formModal.close}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>{editingId ? 'Save Changes' : 'Add Category'}</Button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormField label="Category name" required error={error}>
            <Input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Abayas & Dresses"
              error={error}
            />
          </FormField>
          <FormField label="Parent category" hint="Leave as None to create a top-level category">
            <Select
              value={form.parentId}
              onChange={(e) => setForm((f) => ({ ...f, parentId: e.target.value }))}
            >
              <option value="">None (top-level)</option>
              {topLevel
                .filter((c) => c.id !== editingId)
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </Select>
          </FormField>
          <FormField label="Status">
            <Select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </Select>
          </FormField>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={deleteDialog.close}
        onConfirm={() => pendingDelete && remove(pendingDelete.id)}
        title="Delete category?"
        description={`"${pendingDelete?.name}" will be removed. Products in this category will need to be reassigned.`}
        confirmLabel="Delete Category"
      />
    </div>
  )
}
