import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import FormField from '../../components/ui/FormField'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import { BrandsStore } from '../../store'
import { placeholderImage } from '../../utils/placeholder'

const emptyBrand = { name: '', description: '', status: 'active' }

export default function BrandFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const { getById, add, update } = BrandsStore.useEntityStore()
  const existing = isEdit ? getById(id) : null

  const [form, setForm] = useState(existing || emptyBrand)
  const [error, setError] = useState('')

  if (isEdit && !existing) {
    return <EmptyState message="Brand not found." />
  }

  const setField = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Brand name is required.')
      return
    }

    const payload = { ...form, logo: existing?.logo || placeholderImage(form.name) }

    if (isEdit) {
      update(id, payload)
    } else {
      add({
        id: `brand-${Date.now()}`,
        productCount: 0,
        rating: 0,
        reviewCount: 0,
        joinedDate: new Date().toISOString().slice(0, 10),
        ...payload,
      })
    }
    navigate('/brands')
  }

  return (
    <div>
      <PageHeader
        title={isEdit ? 'Edit Brand' : 'Add Brand'}
        breadcrumbs={[
          { label: 'Dashboard', to: '/' },
          { label: 'Brands', to: '/brands' },
          { label: isEdit ? 'Edit' : 'Add' },
        ]}
        actions={
          <Button variant="outline" icon={ArrowLeft} onClick={() => navigate('/brands')}>
            Back to Brands
          </Button>
        }
      />

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <Card className="space-y-4">
          <FormField label="Brand name" required error={error}>
            <Input value={form.name} onChange={(e) => setField('name', e.target.value)} error={error} />
          </FormField>
          <FormField label="Description">
            <Textarea value={form.description} onChange={(e) => setField('description', e.target.value)} rows={4} />
          </FormField>
          <FormField label="Status">
            <Select value={form.status} onChange={(e) => setField('status', e.target.value)}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
          </FormField>
        </Card>

        <div className="mt-5 flex gap-2">
          <Button type="submit">{isEdit ? 'Save Changes' : 'Add Brand'}</Button>
          <Button type="button" variant="outline" onClick={() => navigate('/brands')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
