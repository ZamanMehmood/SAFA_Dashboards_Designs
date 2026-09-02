import { Routes, Route } from 'react-router-dom'
import DashboardLayout from './components/layout/DashboardLayout'

import DashboardPage from './features/dashboard/DashboardPage'

import OrdersListPage from './features/orders/OrdersListPage'
import OrderDetailPage from './features/orders/OrderDetailPage'

import ReturnsListPage from './features/returns/ReturnsListPage'
import ReturnDetailPage from './features/returns/ReturnDetailPage'
import RefundWalletPage from './features/returns/RefundWalletPage'

import ProductsListPage from './features/products/ProductsListPage'
import ProductFormPage from './features/products/ProductFormPage'

import CategoriesPage from './features/categories/CategoriesPage'

import BrandsListPage from './features/brands/BrandsListPage'
import BrandFormPage from './features/brands/BrandFormPage'

import ReviewsListPage from './features/reviews/ReviewsListPage'

import CustomersListPage from './features/customers/CustomersListPage'
import CustomerDetailPage from './features/customers/CustomerDetailPage'

import LoyaltyPage from './features/loyalty/LoyaltyPage'

import BannersListPage from './features/banners/BannersListPage'
import BannerFormPage from './features/banners/BannerFormPage'

import NotFoundPage from './features/misc/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />

        <Route path="orders" element={<OrdersListPage />} />
        <Route path="orders/:id" element={<OrderDetailPage />} />

        <Route path="returns" element={<ReturnsListPage />} />
        <Route path="returns/wallet" element={<RefundWalletPage />} />
        <Route path="returns/:id" element={<ReturnDetailPage />} />

        <Route path="products" element={<ProductsListPage />} />
        <Route path="products/new" element={<ProductFormPage />} />
        <Route path="products/:id/edit" element={<ProductFormPage />} />

        <Route path="categories" element={<CategoriesPage />} />

        <Route path="brands" element={<BrandsListPage />} />
        <Route path="brands/new" element={<BrandFormPage />} />
        <Route path="brands/:id/edit" element={<BrandFormPage />} />

        <Route path="reviews" element={<ReviewsListPage />} />

        <Route path="customers" element={<CustomersListPage />} />
        <Route path="customers/:id" element={<CustomerDetailPage />} />

        <Route path="loyalty" element={<LoyaltyPage />} />

        <Route path="banners" element={<BannersListPage />} />
        <Route path="banners/new" element={<BannerFormPage />} />
        <Route path="banners/:id/edit" element={<BannerFormPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
