import Container from '../common/Container';
import NewProductsPromo from './NewProductsPromo';
import CategoryBanner from './CategoryBanner';
import { categoryBanners } from '../../data/categoryBanners';
import { useLanguage } from '../../context/LanguageContext';

function PromoSection() {
  const { t } = useLanguage();

  return (
    <section className="py-5 pb-10">
      <Container>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <NewProductsPromo />
          <div className="flex flex-col gap-3">
            {categoryBanners.map((banner) => (
              <CategoryBanner key={banner.id} label={t(banner.labelKey)} href={banner.href} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default PromoSection;
