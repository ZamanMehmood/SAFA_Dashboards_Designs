export const loyaltyTiers = [
  {
    id: 'tier-bronze',
    name: 'Bronze',
    minPoints: 0,
    benefits: ['Earn 1 point per 10 SAR spent', 'Birthday discount code'],
    status: 'active',
  },
  {
    id: 'tier-gold',
    name: 'Gold',
    minPoints: 1000,
    benefits: [
      'Earn 1.5 points per 10 SAR spent',
      'Free standard shipping',
      'Early access to new collections',
    ],
    status: 'active',
  },
]

export function tierForPoints(points) {
  return [...loyaltyTiers].reverse().find((t) => points >= t.minPoints) || loyaltyTiers[0]
}

export function nextTier(points) {
  return loyaltyTiers.find((t) => t.minPoints > points) || null
}
