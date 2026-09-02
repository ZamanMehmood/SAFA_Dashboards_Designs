import { placeholderImage } from '../utils/placeholder'

const img = (label, bg) => placeholderImage(label, { w: 640, h: 280, bg })

export const banners = [
  {
    id: 'banner-national-day',
    title: 'National Day Collection',
    subtitle: 'More than 100 authentic Saudi brands we are proud of',
    ctaLabel: 'Shop Now',
    linkTo: '/products?collection=national-day',
    image: img('National Day', '1B8A63'),
    placement: 'Home · Hero',
    status: 'active',
    startDate: '2026-08-20',
    endDate: '2026-09-25',
  },
  {
    id: 'banner-summer-sale',
    title: 'Summer Sale',
    subtitle: 'Up to 80% off',
    ctaLabel: 'Shop Now',
    linkTo: '/products?sale=summer',
    image: img('Summer Sale', '3B6FA0'),
    placement: 'Home · Mid-page',
    status: 'active',
    startDate: '2026-07-01',
    endDate: '2026-09-01',
  },
  {
    id: 'banner-ramadan',
    title: 'Ramadan Collection',
    subtitle: 'New arrivals for the holy month',
    ctaLabel: 'Shop Now',
    linkTo: '/products?collection=ramadan',
    image: img('Ramadan', '5C1A3B'),
    placement: 'Home · Hero',
    status: 'scheduled',
    startDate: '2027-02-10',
    endDate: '2027-03-30',
  },
  {
    id: 'banner-winter-clearance',
    title: 'Winter Clearance',
    subtitle: 'Final reductions on winter styles',
    ctaLabel: 'Shop Now',
    linkTo: '/products?sale=winter',
    image: img('Winter Sale', 'A97C2F'),
    placement: 'Home · Mid-page',
    status: 'expired',
    startDate: '2026-01-05',
    endDate: '2026-02-15',
  },
]

export function getBannerById(id) {
  return banners.find((b) => b.id === id)
}
