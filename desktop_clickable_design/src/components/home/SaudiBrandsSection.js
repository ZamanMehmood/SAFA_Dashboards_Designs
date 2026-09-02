import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import BrandCard from './BrandCard';
import { saudiBrands } from '../../data/brands';
import { useLanguage } from '../../context/LanguageContext';

function SaudiBrandsSection({ titleKey = 'section.saudiBrands' }) {
  const { t, pick } = useLanguage();

  return (
    <section className="py-10">
      <Container>
        <SectionHeader
          title={t(titleKey)}
          viewAllHref="/brands"
          subtitle={t('section.saudiBrandsSubtitle')}
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {saudiBrands.map((brand) => (
            <BrandCard key={brand.id} name={pick(brand.name)} href={brand.href} />
          ))}
        </div>
        <div className="mt-5 flex justify-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          <span className="h-1.5 w-[18px] rounded-[3px] bg-gold" />
        </div>
      </Container>
    </section>
  );
}

export default SaudiBrandsSection;
