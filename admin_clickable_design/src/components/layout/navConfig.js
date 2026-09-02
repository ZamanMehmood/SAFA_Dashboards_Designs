import {
  LayoutDashboard,
  ShoppingBag,
  Undo2,
  Wallet,
  Package,
  LayoutGrid,
  Store,
  Star,
  Users,
  Award,
  Image,
} from 'lucide-react'

export const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [{ label: 'Dashboard', to: '/', icon: LayoutDashboard }],
  },
  {
    label: 'Sales',
    items: [
      { label: 'Orders', to: '/orders', icon: ShoppingBag },
      { label: 'Return Requests', to: '/returns', icon: Undo2 },
      { label: 'Refund Wallet', to: '/returns/wallet', icon: Wallet },
    ],
  },
  {
    label: 'Catalog',
    items: [
      { label: 'Products', to: '/products', icon: Package },
      { label: 'Categories', to: '/categories', icon: LayoutGrid },
      { label: 'Brands', to: '/brands', icon: Store },
      { label: 'Reviews', to: '/reviews', icon: Star },
    ],
  },
  {
    label: 'Customers',
    items: [
      { label: 'Customers', to: '/customers', icon: Users },
      { label: 'Loyalty Program', to: '/loyalty', icon: Award },
    ],
  },
  {
    label: 'Marketing',
    items: [{ label: 'Banners & Promotions', to: '/banners', icon: Image }],
  },
]
