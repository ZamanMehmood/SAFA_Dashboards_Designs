export function formatCurrency(amount, currency = 'SAR') {
  const value = Number(amount ?? 0)
  const formatted = value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `${formatted} ${currency}`
}
