import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import HomePage from '../pages/HomePage';
import CategoryListingPage from '../pages/CategoryListingPage';
import BrandsDirectoryPage from '../pages/BrandsDirectoryPage';
import CartPage from '../pages/CartPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import BrandDetailPage from '../pages/BrandDetailPage';
import ComingSoonPage from '../pages/ComingSoonPage';

/**
 * Every non-home destination currently resolves to ComingSoonPage.
 * As each new screenshot is implemented, swap its matching route(s)
 * here for the real page component.
 */
function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/women" element={<CategoryListingPage />} />
        <Route path="/brands" element={<BrandsDirectoryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/brands/:brandSlug" element={<BrandDetailPage />} />
        <Route path="*" element={<ComingSoonPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
