import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import FormField from '../../components/ui/FormField'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import { BannersStore } from '../../store'
import { placeholderImage } from '../../utils/placeholder'

const emptyBanner = {
  title: '',
  subtitle: '',
  ctaLabel: 'Shop Now',
  linkTo: '',
  placement: 'Home · Hero',
  status: 'draft',
  startDate: '',
  endDate: '',
}

export default function BannerFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const { getById, add, update } = BannersStore.useEntityStore()
  const existing = isEdit ? getById(id) : null

  const [form, setForm] = useState(existing || emptyBanner)
  const [error, setError] = useState('')

  if (isEdit && !existing) {
    return <EmptyState message="Banner not found." />
  }

  const setField = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('Banner title is required.')
      return
    }

    const payload = { ...form, image: existing?.image || placeholderImage(form.title) }

    if (isEdit) {
      update(id, payload)
    } else {
      add({ id: `banner-${Date.now()}`, ...payload })
    }
    navigate('/banners')
  }

  return (
    <div>
      <PageHeader
        title={isEdit ? 'Edit Banner' : 'Add Banner'}
        breadcrumbs={[
          { label: 'Dashboard', to: '/' },
          { label: 'Banners & Promotions', to: '/banners' },
          { label: isEdit ? 'Edit' : 'Add' },
        ]}
        actions={
          <Button variant="outline" icon={ArrowLeft} onClick={() => navigate('/banners')}>
            Back to Banners
          </Button>
        }
      />

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <Card className="space-y-4">
          <FormField label="Title" required error={error}>
            <Input value={form.title} onChange={(e) => setField('title', e.target.value)} error={error} />
          </FormField>
          <FormField label="Subtitle">
            <Input value={form.subtitle} onChange={(e) => setField('subtitle', e.target.value)} />
          </FormField>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Button label">
              <Input value={form.ctaLabel} onChange={(e) => setField('ctaLabel', e.target.value)} />
            </FormField>
            <FormField label="Link to" hint="Where the banner button should navigate">
              <Input value={form.linkTo} onChange={(e) => setField('linkTo', e.target.value)} placeholder="/products?sale=summer" />
            </FormField>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Placement">
              <Select value={form.placement} onChange={(e) => setField('placement', e.target.value)}>
                <option value="Home · Hero">Home · Hero</option>
                <option value="Home · Mid-page">Home · Mid-page</option>
              </Select>
            </FormField>
            <FormField label="Status">
              <Select value={form.status} onChange={(e) => setField('status', e.target.value)}>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </Select>
            </FormField>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Start date">
              <Input type="date" value={form.startDate} onChange={(e) => setField('startDate', e.target.value)} />
            </FormField>
            <FormField label="End date">
              <Input type="date" value={form.endDate} onChange={(e) => setField('endDate', e.target.value)} />
            </FormField>
          </div>
        </Card>

        <div className="mt-5 flex gap-2">
          <Button type="submit">{isEdit ? 'Save Changes' : 'Add Banner'}</Button>
          <Button type="button" variant="outline" onClick={() => navigate('/banners')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
