import { Link } from 'react-router-dom';
import PlaceholderImage from '../common/PlaceholderImage';
import { useLanguage } from '../../context/LanguageContext';

function SummerSaleBanner() {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-lg">
      <PlaceholderImage ratio="1440 / 280" label="Summer sale banner" className="w-full" />
      <div
        className="absolute inset-0 flex flex-col items-start justify-center gap-2 px-8 text-white sm:px-14"
        style={{ textShadow: '0 2px 12px rgba(0,0,0,0.35)' }}
      >
        <h2 className="m-0 text-xl font-bold sm:text-3xl">{t('brands.summerSale')}</h2>
        <p className="m-0 text-sm sm:text-base">{t('brands.upTo80')}</p>
        <Link
          to="/new-arrivals"
          className="mt-1 border-b border-white pb-0.5 text-[13px] font-semibold"
          style={{ textShadow: 'none' }}
        >
          {t('common.shopNow')}
        </Link>
      </div>
    </div>
  );
}

export default SummerSaleBanner;
