import { useLanguage } from '../../context/LanguageContext';

function ColorSwatches({ colors, activeIndex, onSelect }) {
  const { t, pick } = useLanguage();

  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-sm font-medium text-ink">{t('cart.color')}</span>
      <div className="flex gap-2.5">
        {colors.map((color, index) => (
          <button
            key={color.name.en}
            type="button"
            onClick={() => onSelect(index)}
            title={pick(color.name)}
            aria-label={`${t('cart.color')}: ${pick(color.name)}`}
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              activeIndex === index ? 'ring-2 ring-ink ring-offset-2' : ''
            }`}
          >
            <span className="h-6 w-6 rounded-full border border-line" style={{ backgroundColor: color.hex }} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ColorSwatches;
