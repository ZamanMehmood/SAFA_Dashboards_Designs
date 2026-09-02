import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '../components/common/Container';
import Icon from '../components/common/Icon';
import Rating from '../components/common/Rating';
import Breadcrumb from '../components/product/Breadcrumb';
import ImageGallery from '../components/product/ImageGallery';
import ColorSwatches from '../components/product/ColorSwatches';
import SizeSelector from '../components/product/SizeSelector';
import ProductGrid from '../components/listing/ProductGrid';
import { featuredProducts } from '../data/featuredProducts';
import { useLanguage } from '../context/LanguageContext';

function ProductDetailPage() {
  const { t, pick } = useLanguage();
  const { productId } = useParams();
  const product = featuredProducts.find((item) => item.id === productId);

  const [activeColorIndex, setActiveColorIndex] = useState(product?.defaultColorIndex ?? 0);
  const [activeSize, setActiveSize] = useState(product?.defaultSize);

  if (!product) {
    return (
      <Container className="flex flex-col items-center gap-3 py-28 text-center">
        <h1 className="m-0 text-2xl text-ink">{t('product.notFound')}</h1>
        <Link to="/" className="text-sm font-semibold text-maroon">
          &larr; {t('common.backToHome')}
        </Link>
      </Container>
    );
  }

  const relatedProducts = featuredProducts.filter((item) => item.id !== product.id);
  const moreFromBrand = [...featuredProducts].reverse().filter((item) => item.id !== product.id);

  return (
    <section className="py-8 pb-16">
      <Container>
        <Breadcrumb
          items={[
            { label: t('breadcrumb.women'), href: '/category/women' },
            { label: t('breadcrumb.brands'), href: '/brands' },
            { label: pick(product.brand), href: product.brandHref },
            { label: pick(product.title) },
          ]}
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="m-0 mb-2 text-2xl font-bold text-ink sm:text-[26px]">{pick(product.title)}</h1>
              <span className="text-xl font-semibold text-ink">{pick(product.price)}</span>
            </div>

            <div className="flex w-fit items-center gap-1.5 rounded-full border border-red-300 px-3.5 py-2 text-xs text-red-600">
              <Icon name="clock" size={14} />
              {t('product.hurryLeft', { count: product.stockRemaining })}
            </div>

            <div className="flex items-center justify-between">
              <Link
                to={product.brandHref}
                className="flex items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-ink"
              >
                <Icon name="bag" size={16} />
                {pick(product.brand)}
              </Link>
              <Rating value={product.rating} reviewCount={product.reviewCount} />
            </div>

            <ColorSwatches colors={product.colors} activeIndex={activeColorIndex} onSelect={setActiveColorIndex} />

            <SizeSelector sizes={product.sizes} activeSize={activeSize} onSelect={setActiveSize} />

            <div className="border-t border-line pt-5">
              <h2 className="m-0 mb-2 text-sm font-bold text-ink">{t('product.description')}</h2>
              <p className="m-0 text-[13px] leading-relaxed text-ink-secondary">{pick(product.description)}</p>
            </div>

            <div>
              <h2 className="m-0 mb-2 text-sm font-bold text-ink">{t('product.careInstructions')}</h2>
              <p className="m-0 flex items-center gap-2 text-[13px] text-ink-secondary">
                <Icon name="clock" size={14} />
                {pick(product.careInstructions)}
              </p>
            </div>

            <button
              type="button"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-gold py-3.5 text-sm font-semibold text-white"
            >
              <Icon name="bag" size={18} />
              {t('product.buyNow')}
            </button>
          </div>

          <ImageGallery title={pick(product.title)} />
        </div>

        <div className="mt-14">
          <h2 className="m-0 mb-5 text-xl font-bold text-ink">{t('product.relatedProducts')}</h2>
          <ProductGrid products={relatedProducts} />
        </div>

        <div className="mt-14">
          <h2 className="m-0 mb-5 text-xl font-bold text-ink">
            {t('product.moreFromBrand', { brand: pick(product.brand) })}
          </h2>
          <ProductGrid products={moreFromBrand} />
        </div>
      </Container>
    </section>
  );
}

export default ProductDetailPage;
