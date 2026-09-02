// Central status -> badge tone map so every module renders statuses consistently.
export const STATUS_TONES = {
  // orders
  processing: 'info',
  shipped: 'warning',
  delivered: 'success',
  cancelled: 'danger',
  // returns / refunds
  requested: 'info',
  order_confirmed: 'warning',
  refunded: 'success',
  rejected: 'danger',
  // generic
  active: 'success',
  inactive: 'muted',
  draft: 'muted',
  scheduled: 'info',
  expired: 'muted',
  limited_stock: 'warning',
  out_of_stock: 'danger',
  in_stock: 'success',
  published: 'success',
  hidden: 'muted',
  flagged: 'danger',
  suspended: 'danger',
}

export function toneForStatus(status) {
  return STATUS_TONES[status] || 'muted'
}

export function labelForStatus(status) {
  if (!status) return '—'
  return status
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
