export const reviews = [
  {
    id: 'rev-1',
    productId: 'prod-desert-rose',
    productName: 'Embroidered Desert Rose Abaya',
    customerName: 'Sara Al-Mutairi',
    verifiedPurchase: true,
    rating: 5,
    date: '2026-08-29',
    comment:
      'Excellent quality and remarkably precise embroidery detail. The abaya feels luxurious, and the packaging and presentation were as elegant as I expected from this brand.',
    helpfulCount: 12,
    status: 'published',
  },
  {
    id: 'rev-2',
    productId: 'prod-desert-rose',
    productName: 'Embroidered Desert Rose Abaya',
    customerName: 'Amal Al-Qahtani',
    verifiedPurchase: true,
    rating: 4,
    date: '2026-08-24',
    comment:
      'Very beautiful, and the color matched the photos exactly. The fit was quite good, though I wish the sleeve length were a touch shorter. Overall a wonderful experience.',
    helpfulCount: 8,
    status: 'published',
  },
  {
    id: 'rev-3',
    productId: 'prod-desert-rose',
    productName: 'Embroidered Desert Rose Abaya',
    customerName: 'Noura Al-Otaibi',
    verifiedPurchase: true,
    rating: 4,
    date: '2026-08-17',
    comment:
      'I bought this as a gift for a friend and she loved it. The fabric quality really impressed us, and delivery to Riyadh was very fast.',
    helpfulCount: 5,
    status: 'published',
  },
  {
    id: 'rev-4',
    productId: 'prod-desert-rose',
    productName: 'Embroidered Desert Rose Abaya',
    customerName: 'Reem Al-Harbi',
    verifiedPurchase: true,
    rating: 2,
    date: '2026-07-31',
    comment:
      "The design is genuinely beautiful, but the fabric needs constant ironing. I expected something lighter for summer wear, and it doesn't sit as well on me as it did on the model.",
    helpfulCount: 21,
    status: 'flagged',
  },
  {
    id: 'rev-5',
    productId: 'prod-black-silk-abaya',
    productName: 'Black Silk Abaya',
    customerName: 'Lina Al-Ghamdi',
    verifiedPurchase: true,
    rating: 5,
    date: '2026-07-10',
    comment: 'Beautifully tailored, drapes really well, and the black is a true deep black.',
    helpfulCount: 3,
    status: 'published',
  },
  {
    id: 'rev-6',
    productId: 'prod-linen-set',
    productName: 'Summer Linen Set',
    customerName: 'Mona Al-Shehri',
    verifiedPurchase: false,
    rating: 3,
    date: '2026-06-18',
    comment: 'Nice fabric but ran a size small compared to the size guide.',
    helpfulCount: 1,
    status: 'published',
  },
]

export const ratingBreakdown = { 5: 45, 4: 18, 3: 10, 2: 6, 1: 4 }

export function getReviewsForProduct(productId) {
  return reviews.filter((r) => r.productId === productId)
}
