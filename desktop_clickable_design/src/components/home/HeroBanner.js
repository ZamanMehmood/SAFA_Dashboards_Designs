import { Link } from 'react-router-dom';
import PlaceholderImage from '../common/PlaceholderImage';
import { useLanguage } from '../../context/LanguageContext';

function HeroBanner() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full">
      <PlaceholderImage ratio="1440 / 700" label="Hero banner — National Day group" className="w-full" />
      <div
        className="absolute inset-0 flex max-w-full flex-col items-start justify-center gap-4 px-6 text-white sm:max-w-[560px] sm:px-[8%]"
        style={{ textShadow: '0 2px 12px rgba(0,0,0,0.35)' }}
      >
        <h1 className="m-0 text-[26px] font-bold sm:text-[42px]">{t('hero.title')}</h1>
        <p className="m-0 max-w-[380px] text-[13px] leading-relaxed sm:text-[15px]">{t('hero.subtitle')}</p>
        <Link
          to="/new-arrivals"
          className="mt-2 rounded bg-white px-7 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-px"
          style={{ textShadow: 'none' }}
        >
          {t('common.shopNow')}
        </Link>
      </div>
    </section>
  );
}

export default HeroBanner;
