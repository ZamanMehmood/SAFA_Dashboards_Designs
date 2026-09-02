import {
  ProductsStore,
  BrandsStore,
  CategoriesStore,
  BannersStore,
  ReviewsStore,
  CustomersStore,
  OrdersStore,
  ReturnsStore,
  LoyaltyStore,
} from './index'

const PROVIDERS = [
  ProductsStore.Provider,
  BrandsStore.Provider,
  CategoriesStore.Provider,
  BannersStore.Provider,
  ReviewsStore.Provider,
  CustomersStore.Provider,
  OrdersStore.Provider,
  ReturnsStore.Provider,
  LoyaltyStore.Provider,
]

export default function AppProviders({ children }) {
  return PROVIDERS.reduceRight((acc, ProviderComponent) => (
    <ProviderComponent>{acc}</ProviderComponent>
  ), children)
}
