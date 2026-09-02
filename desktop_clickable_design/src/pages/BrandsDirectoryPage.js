import { useState, useEffect } from 'react';
import Container from '../components/common/Container';
import BrandCard from '../components/home/BrandCard';
import BrandsSearchBar from '../components/brands/BrandsSearchBar';
import AlphabetIndex from '../components/brands/AlphabetIndex';
import SummerSaleBanner from '../components/brands/SummerSaleBanner';
import { allSaudiBrands } from '../data/brands';
import { useLanguage } from '../context/LanguageContext';

const FIRST_ROW_COUNT = 6;

function BrandsDirectoryPage() {
  const { t, pick, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLetter, setActiveLetter] = useState(null);

  // The alphabet index switches character sets with the language, so a
  // letter selected in one alphabet has no meaning in the other.
  useEffect(() => {
    setActiveLetter(null);
  }, [language]);

  const isFiltering = searchTerm.trim() !== '' || activeLetter !== null;

  const filteredBrands = allSaudiBrands.filter((brand) => {
    const name = pick(brand.name).toLowerCase();
    const matchesSearch = name.includes(searchTerm.trim().toLowerCase());
    const matchesLetter = !activeLetter || name.startsWith(activeLetter.toLowerCase());
    return matchesSearch && matchesLetter;
  });

  const firstRow = allSaudiBrands.slice(0, FIRST_ROW_COUNT);
  const secondRow = allSaudiBrands.slice(FIRST_ROW_COUNT);

  return (
    <section className="py-8 pb-16">
      <Container>
        <h1 className="m-0 mb-6 text-2xl font-bold text-ink sm:text-[26px]">{t('section.topSaudiBrands')}</h1>

        <div className="mb-6">
          <BrandsSearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={t('brands.searchPlaceholder')}
          />
        </div>

        <div className="mb-8">
          <AlphabetIndex activeLetter={activeLetter} onSelect={setActiveLetter} />
        </div>

        {isFiltering ? (
          filteredBrands.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {filteredBrands.map((brand) => (
                <BrandCard key={brand.id} name={pick(brand.name)} href={brand.href} />
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-sm text-ink-secondary">{t('brands.noBrandsFound')}</p>
          )
        ) : (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {firstRow.map((brand) => (
                <BrandCard key={brand.id} name={pick(brand.name)} href={brand.href} />
              ))}
            </div>

            <SummerSaleBanner />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {secondRow.map((brand) => (
                <BrandCard key={brand.id} name={pick(brand.name)} href={brand.href} />
              ))}
            </div>

            <div className="flex justify-center py-6" role="status" aria-label="Loading more brands">
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-gold" />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

export default BrandsDirectoryPage;
