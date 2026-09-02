import { useState } from 'react';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import FilterTabs from '../common/FilterTabs';
import ProductCard from './ProductCard';
import { productFilters, defaultProductFilter, featuredProducts } from '../../data/featuredProducts';
import { useLanguage } from '../../context/LanguageContext';

function FeaturedProductsSection() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState(defaultProductFilter);
  const visibleProducts = featuredProducts.filter((product) => product.category === activeFilter);
  const translatedFilters = productFilters.map((filter) => ({ id: filter.id, label: t(filter.labelKey) }));

  return (
    <section className="py-5 pb-14">
      <Container>
        <SectionHeader title={t('section.featuredProducts')} viewAllHref="/products" />
        <FilterTabs filters={translatedFilters} activeFilter={activeFilter} onChange={setActiveFilter} />

        {visibleProducts.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-center text-sm text-ink-secondary">{t('common.noProductsCategory')}</p>
        )}
      </Container>
    </section>
  );
}

export default FeaturedProductsSection;
