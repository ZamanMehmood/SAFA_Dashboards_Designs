import { useState } from 'react'
import { Plus, Pencil, Trash2, Award } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import FormField from '../../components/ui/FormField'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import { LoyaltyStore } from '../../store'
import { useDisclosure } from '../../hooks/useDisclosure'

const emptyForm = { name: '', minPoints: '', benefits: '' }

export default function LoyaltyPage() {
  const { items: tiers, add, update, remove } = LoyaltyStore.useEntityStore()
  const formModal = useDisclosure()
  const deleteDialog = useDisclosure()
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [pendingDelete, setPendingDelete] = useState(null)

  const sorted = [...tiers].sort((a, b) => a.minPoints - b.minPoints)

  const openAdd = () => {
    setEditingId(null)
    setForm(emptyForm)
    setError('')
    formModal.open()
  }

  const openEdit = (tier) => {
    setEditingId(tier.id)
    setForm({ name: tier.name, minPoints: String(tier.minPoints), benefits: tier.benefits.join('\n') })
    setError('')
    formModal.open()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Tier name is required.')
      return
    }
    const payload = {
      name: form.name.trim(),
      minPoints: Number(form.minPoints) || 0,
      benefits: form.benefits.split('\n').map((b) => b.trim()).filter(Boolean),
      status: 'active',
    }
    if (editingId) {
      update(editingId, payload)
    } else {
      add({ id: `tier-${Date.now()}`, ...payload })
    }
    formModal.close()
  }

  return (
    <div>
      <PageHeader
        title="Loyalty Program"
        description="Configure membership tiers, point thresholds and member benefits."
        breadcrumbs={[{ label: 'Dashboard', to: '/' }, { label: 'Loyalty Program' }]}
        actions={
          <Button icon={Plus} onClick={openAdd}>
            Add Tier
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((tier) => (
          <Card key={tier.id} className="flex flex-col">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-base font-semibold text-ink">
                <Award size={18} className="text-brand-gold" /> {tier.name}
              </span>
              <Badge status={tier.status} />
            </div>
            <p className="mt-2 text-sm text-ink-muted">Requires {tier.minPoints.toLocaleString()} points</p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-ink">
              {tier.benefits.map((benefit, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-gold" />
                  {benefit}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2 border-t border-border pt-4">
              <Button variant="outline" size="sm" icon={Pencil} className="flex-1" onClick={() => openEdit(tier)}>
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={Trash2}
                className="text-danger hover:bg-danger-bg"
                onClick={() => {
                  setPendingDelete(tier)
                  deleteDialog.open()
                }}
              />
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={formModal.isOpen}
        onClose={formModal.close}
        title={editingId ? 'Edit Tier' : 'Add Tier'}
        footer={
          <>
            <Button variant="outline" onClick={formModal.close}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>{editingId ? 'Save Changes' : 'Add Tier'}</Button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormField label="Tier name" required error={error}>
            <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} error={error} />
          </FormField>
          <FormField label="Minimum points">
            <Input
              type="number"
              min="0"
              value={form.minPoints}
              onChange={(e) => setForm((f) => ({ ...f, minPoints: e.target.value }))}
            />
          </FormField>
          <FormField label="Benefits" hint="One benefit per line">
            <Textarea
              value={form.benefits}
              onChange={(e) => setForm((f) => ({ ...f, benefits: e.target.value }))}
              rows={4}
            />
          </FormField>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={deleteDialog.close}
        onConfirm={() => pendingDelete && remove(pendingDelete.id)}
        title="Delete tier?"
        description={`"${pendingDelete?.name}" will be removed from the loyalty program.`}
        confirmLabel="Delete Tier"
      />
    </div>
  )
}
