import { useState } from 'react';
import Container from '../components/common/Container';
import FilterTabs from '../components/common/FilterTabs';
import ListingControls from '../components/listing/ListingControls';
import PromoBannerWide from '../components/listing/PromoBannerWide';
import ProductGrid from '../components/listing/ProductGrid';
import PromoTile from '../components/listing/PromoTile';
import HeroBanner from '../components/home/HeroBanner';
import SaudiBrandsSection from '../components/home/SaudiBrandsSection';
import { listingFilters, defaultListingFilter } from '../data/listingFilters';
import { featuredProducts } from '../data/featuredProducts';
import { promoTiles } from '../data/promoTiles';
import { useLanguage } from '../context/LanguageContext';

const firstGridProducts = [
  ...featuredProducts,
  ...featuredProducts.map((product) => ({ ...product, id: `${product.id}-repeat` })),
];

/**
 * Reusable category/listing screen template (first built for the Women's
 * products destination). Reuses the homepage's hero, Saudi brands, and
 * product card building blocks alongside listing-specific pieces
 * (filter/sort toolbar, wide promo banner, bottom promo tiles).
 */
function CategoryListingPage() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState(defaultListingFilter);
  const translatedFilters = listingFilters.map((filter) => ({ id: filter.id, label: t(filter.labelKey) }));

  return (
    <>
      <section className="pb-10 pt-8">
        <Container>
          <h1 className="m-0 mb-5 text-2xl font-bold text-ink sm:text-[26px]">{t('section.featuredProducts')}</h1>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ListingControls />
            <FilterTabs
              filters={translatedFilters}
              activeFilter={activeFilter}
              onChange={setActiveFilter}
              className="overflow-x-auto sm:flex-nowrap"
            />
          </div>
        </Container>
      </section>

      <section className="pb-10">
        <Container>
          <PromoBannerWide
            title={t('promo.extra30')}
            subtitle={t('promo.discoverCollections')}
            ctaLabel={t('common.shopNow')}
            href="/new-arrivals"
          />
        </Container>
      </section>

      <section className="pb-10">
        <Container>
          <ProductGrid products={firstGridProducts} />
        </Container>
      </section>

      <HeroBanner />

      <SaudiBrandsSection titleKey="section.topSaudiBrands" />

      <section className="pb-10">
        <Container>
          <ProductGrid products={featuredProducts} />
        </Container>
      </section>

      <section className="pb-14">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {promoTiles.map((tile) => (
              <PromoTile key={tile.id} label={t(tile.labelKey)} href={tile.href} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export default CategoryListingPage;
