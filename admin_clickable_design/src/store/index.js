import { createEntityStore } from './createEntityStore'
import { products } from '../data/products'
import { brands } from '../data/brands'
import { categories } from '../data/categories'
import { banners } from '../data/banners'
import { reviews } from '../data/reviews'
import { customers } from '../data/customers'
import { orders } from '../data/orders'
import { returnRequests } from '../data/returns'
import { loyaltyTiers } from '../data/loyaltyTiers'

export const ProductsStore = createEntityStore(products)
export const BrandsStore = createEntityStore(brands)
export const CategoriesStore = createEntityStore(categories)
export const BannersStore = createEntityStore(banners)
export const ReviewsStore = createEntityStore(reviews)
export const CustomersStore = createEntityStore(customers)
export const OrdersStore = createEntityStore(orders)
export const ReturnsStore = createEntityStore(returnRequests)
export const LoyaltyStore = createEntityStore(loyaltyTiers)
