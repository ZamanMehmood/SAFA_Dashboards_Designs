import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

function NewProductsPromo() {
  const { t } = useLanguage();

  return (
    <div className="relative flex h-full min-h-[320px] items-center justify-center overflow-hidden rounded-lg bg-surface-alt">
      <span className="absolute left-[14%] top-[18%] text-sm leading-none text-maroon" aria-hidden="true">
        ✦
      </span>
      <span className="absolute left-[20%] top-[22%] text-[22px] leading-none text-maroon" aria-hidden="true">
        ✦
      </span>

      <div className="px-6 text-center">
        <h2 className="m-0 font-serif text-[26px] font-bold text-maroon sm:text-[34px]">
          {t('promo.newProducts.title')}
        </h2>
        <p className="mb-5 mt-3 text-sm text-ink-secondary">{t('promo.newProducts.subtitle')}</p>
        <Link
          to="/new-arrivals"
          className="border-b border-ink pb-0.5 text-[13px] font-semibold text-ink"
        >
          {t('common.shopNow')}
        </Link>
      </div>

      <span className="absolute bottom-[14%] right-[22%] text-lg leading-none text-maroon" aria-hidden="true">
        ✦
      </span>
    </div>
  );
}

export default NewProductsPromo;
