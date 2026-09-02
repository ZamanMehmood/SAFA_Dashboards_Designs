import { useLanguage } from '../../context/LanguageContext';

function Rating({ value, reviewCount }) {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-1 text-xs text-ink-secondary">
      <span className="font-semibold text-ink">{value.toFixed(1)}</span>
      <span className="text-[13px] text-star" aria-hidden="true">
        ★
      </span>
      <span>
        {reviewCount} {t('product.reviews')}
      </span>
    </div>
  );
}

export default Rating;
