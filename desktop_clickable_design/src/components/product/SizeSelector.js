import { useLanguage } from '../../context/LanguageContext';

function SizeSelector({ sizes, activeSize, onSelect }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-sm font-medium text-ink">{t('cart.size')}</span>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => onSelect(size)}
            className={`min-w-[46px] rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              activeSize === size ? 'border-gold bg-gold text-white' : 'border-line text-ink'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SizeSelector;
