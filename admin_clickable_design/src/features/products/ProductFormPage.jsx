import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import FormField from '../../components/ui/FormField'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import { ProductsStore, BrandsStore, CategoriesStore } from '../../store'
import { placeholderImage } from '../../utils/placeholder'

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'limited_stock', label: 'Limited Stock' },
  { value: 'out_of_stock', label: 'Out of Stock' },
  { value: 'draft', label: 'Draft' },
]

const emptyProduct = {
  name: '',
  brandId: '',
  categoryId: '',
  price: '',
  points: '',
  status: 'draft',
  description: '',
  careInstructions: '',
  shippingInfo: '',
  colors: [{ name: '', hex: '#C89B4A' }],
  sizes: [{ label: '', stock: '' }],
}

export default function ProductFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const { getById, add, update } = ProductsStore.useEntityStore()
  const { items: brands } = BrandsStore.useEntityStore()
  const { items: categories } = CategoriesStore.useEntityStore()

  const existing = isEdit ? getById(id) : null
  const [form, setForm] = useState(() =>
    existing
      ? {
          ...existing,
          price: String(existing.price),
          points: String(existing.points),
        }
      : emptyProduct,
  )
  const [errors, setErrors] = useState({})

  if (isEdit && !existing) {
    return <EmptyState message="Product not found." />
  }

  const setField = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  const setColor = (idx, patch) =>
    setForm((f) => ({
      ...f,
      colors: f.colors.map((c, i) => (i === idx ? { ...c, ...patch } : c)),
    }))
  const addColor = () => setForm((f) => ({ ...f, colors: [...f.colors, { name: '', hex: '#C89B4A' }] }))
  const removeColor = (idx) => setForm((f) => ({ ...f, colors: f.colors.filter((_, i) => i !== idx) }))

  const setSize = (idx, patch) =>
    setForm((f) => ({
      ...f,
      sizes: f.sizes.map((s, i) => (i === idx ? { ...s, ...patch } : s)),
    }))
  const addSize = () => setForm((f) => ({ ...f, sizes: [...f.sizes, { label: '', stock: '' }] }))
  const removeSize = (idx) => setForm((f) => ({ ...f, sizes: f.sizes.filter((_, i) => i !== idx) }))

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Product name is required.'
    if (!form.brandId) next.brandId = 'Select a brand.'
    if (!form.categoryId) next.categoryId = 'Select a category.'
    if (!form.price || Number(form.price) <= 0) next.price = 'Enter a valid price.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const payload = {
      ...form,
      price: Number(form.price),
      points: Number(form.points) || 0,
      colors: form.colors.filter((c) => c.name.trim()),
      sizes: form.sizes
        .filter((s) => s.label.trim())
        .map((s) => ({ ...s, stock: Number(s.stock) || 0 })),
      image: existing?.image || placeholderImage(form.name || 'Product'),
      rating: existing?.rating ?? 0,
      reviewCount: existing?.reviewCount ?? 0,
    }

    if (isEdit) {
      update(id, payload)
    } else {
      add({ id: `prod-${Date.now()}`, ...payload })
    }
    navigate('/products')
  }

  return (
    <div>
      <PageHeader
        title={isEdit ? 'Edit Product' : 'Add Product'}
        breadcrumbs={[
          { label: 'Dashboard', to: '/' },
          { label: 'Products', to: '/products' },
          { label: isEdit ? 'Edit' : 'Add' },
        ]}
        actions={
          <Button variant="outline" icon={ArrowLeft} onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        }
      />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card className="space-y-4">
            <h2 className="text-sm font-semibold text-ink">Basic information</h2>
            <FormField label="Product name" required error={errors.name}>
              <Input
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
                placeholder="e.g. Embroidered Desert Rose Abaya"
                error={errors.name}
              />
            </FormField>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Brand" required error={errors.brandId}>
                <Select value={form.brandId} onChange={(e) => setField('brandId', e.target.value)} error={errors.brandId}>
                  <option value="">Select brand</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </Select>
              </FormField>
              <FormField label="Category" required error={errors.categoryId}>
                <Select
                  value={form.categoryId}
                  onChange={(e) => setField('categoryId', e.target.value)}
                  error={errors.categoryId}
                >
                  <option value="">Select category</option>
                  {categories
                    .filter((c) => !c.parentId)
                    .map((top) => (
                      <optgroup key={top.id} label={top.name}>
                        <option value={top.id}>{top.name} (general)</option>
                        {categories
                          .filter((c) => c.parentId === top.id)
                          .map((child) => (
                            <option key={child.id} value={child.id}>
                              {child.name}
                            </option>
                          ))}
                      </optgroup>
                    ))}
                </Select>
              </FormField>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <FormField label="Price (SAR)" required error={errors.price}>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setField('price', e.target.value)}
                  error={errors.price}
                />
              </FormField>
              <FormField label="Reward points" hint="Points earned per purchase">
                <Input type="number" min="0" value={form.points} onChange={(e) => setField('points', e.target.value)} />
              </FormField>
              <FormField label="Status">
                <Select value={form.status} onChange={(e) => setField('status', e.target.value)}>
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </Select>
              </FormField>
            </div>
          </Card>

          <Card className="space-y-4">
            <h2 className="text-sm font-semibold text-ink">Description & care</h2>
            <FormField label="Description">
              <Textarea value={form.description} onChange={(e) => setField('description', e.target.value)} rows={4} />
            </FormField>
            <FormField label="Care instructions">
              <Textarea
                value={form.careInstructions}
                onChange={(e) => setField('careInstructions', e.target.value)}
                rows={2}
              />
            </FormField>
            <FormField label="Shipping information">
              <Textarea value={form.shippingInfo} onChange={(e) => setField('shippingInfo', e.target.value)} rows={2} />
            </FormField>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-ink">Colors</h2>
              <Button type="button" variant="ghost" size="sm" icon={Plus} onClick={addColor}>
                Add
              </Button>
            </div>
            {form.colors.map((color, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="color"
                  value={color.hex}
                  onChange={(e) => setColor(idx, { hex: e.target.value })}
                  className="h-10 w-10 shrink-0 rounded-lg border border-border"
                />
                <Input
                  value={color.name}
                  onChange={(e) => setColor(idx, { name: e.target.value })}
                  placeholder="Color name"
                />
                <button
                  type="button"
                  onClick={() => removeColor(idx)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-muted hover:bg-danger-bg hover:text-danger"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </Card>

          <Card className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-ink">Sizes & stock</h2>
              <Button type="button" variant="ghost" size="sm" icon={Plus} onClick={addSize}>
                Add
              </Button>
            </div>
            {form.sizes.map((size, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  value={size.label}
                  onChange={(e) => setSize(idx, { label: e.target.value })}
                  placeholder="Size (e.g. M)"
                  className="w-24"
                />
                <Input
                  type="number"
                  min="0"
                  value={size.stock}
                  onChange={(e) => setSize(idx, { stock: e.target.value })}
                  placeholder="Stock qty"
                />
                <button
                  type="button"
                  onClick={() => removeSize(idx)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-muted hover:bg-danger-bg hover:text-danger"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </Card>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              {isEdit ? 'Save Changes' : 'Add Product'}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate('/products')}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
