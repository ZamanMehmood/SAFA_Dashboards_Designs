import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '../components/common/Container';
import FilterTabs from '../components/common/FilterTabs';
import Breadcrumb from '../components/product/Breadcrumb';
import ListingControls from '../components/listing/ListingControls';
import ProductGrid from '../components/listing/ProductGrid';
import BrandHero from '../components/brands/BrandHero';
import { allSaudiBrands } from '../data/brands';
import { featuredProducts } from '../data/featuredProducts';
import { sortOptions, defaultSortOption } from '../data/sortOptions';
import { useLanguage } from '../context/LanguageContext';

const brandProducts = [
  ...featuredProducts,
  ...featuredProducts.map((product) => ({ ...product, id: `${product.id}-repeat-1` })),
  ...featuredProducts.map((product) => ({ ...product, id: `${product.id}-repeat-2` })),
];

/** Reusable brand storefront template — works for any brand in the directory by slug. */
function BrandDetailPage() {
  const { t, pick } = useLanguage();
  const { brandSlug } = useParams();
  const brand = allSaudiBrands.find((item) => item.id === brandSlug);
  const [activeSort, setActiveSort] = useState(defaultSortOption);
  const translatedSortOptions = sortOptions.map((option) => ({ id: option.id, label: t(option.labelKey) }));

  if (!brand) {
    return (
      <Container className="flex flex-col items-center gap-3 py-28 text-center">
        <h1 className="m-0 text-2xl text-ink">{t('brand.notFound')}</h1>
        <Link to="/brands" className="text-sm font-semibold text-maroon">
          &larr; {t('common.backToBrands')}
        </Link>
      </Container>
    );
  }

  return (
    <>
      <section className="pt-6">
        <Container>
          <Breadcrumb
            items={[
              { label: t('breadcrumb.women'), href: '/category/women' },
              { label: t('breadcrumb.brands'), href: '/brands' },
              { label: pick(brand.name) },
            ]}
          />
        </Container>
      </section>

      <BrandHero name={pick(brand.name)} description={pick(brand.description)} />

      <section className="pb-10 pt-8">
        <Container>
          <h2 className="m-0 mb-5 text-2xl font-bold text-ink sm:text-[26px]">
            {t('brand.productsCount', { count: brand.productCount })}
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ListingControls />
            <FilterTabs
              filters={translatedSortOptions}
              activeFilter={activeSort}
              onChange={setActiveSort}
              className="overflow-x-auto sm:flex-nowrap"
            />
          </div>
        </Container>
      </section>

      <section className="pb-14">
        <Container>
          <ProductGrid products={brandProducts} />
        </Container>
      </section>
    </>
  );
}

export default BrandDetailPage;
