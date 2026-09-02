import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import PlaceholderImage from '../common/PlaceholderImage';
import { useLanguage } from '../../context/LanguageContext';

const QUANTITY_OPTIONS = [1, 2, 3, 4, 5];
const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL'];

function CartItemCard({ item, onQuantityChange, onSizeChange, onRemove, onMoveToFavorites }) {
  const { t, pick } = useLanguage();

  return (
    <div className="flex gap-5 rounded-lg border border-line p-5">
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <Link to={item.href} className="text-base font-bold text-ink">
            {pick(item.title)}
          </Link>
          <span className="shrink-0 font-semibold text-gold">
            {item.price.toLocaleString()} {pick(item.currency)}
          </span>
        </div>

        <p className="line-clamp-2 text-[13px] leading-relaxed text-ink-secondary">{pick(item.description)}</p>

        <div className="flex flex-wrap items-start gap-6">
          <label className="flex flex-col gap-1.5 text-xs text-ink-secondary">
            {t('cart.quantity')}
            <select
              value={item.quantity}
              onChange={(event) => onQuantityChange(item.id, Number(event.target.value))}
              className="rounded-lg border border-line px-3 py-1.5 text-sm text-ink outline-none"
            >
              {QUANTITY_OPTIONS.map((qty) => (
                <option key={qty} value={qty}>
                  {qty}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-xs text-ink-secondary">
            {t('cart.size')}
            <select
              value={item.size}
              onChange={(event) => onSizeChange(item.id, event.target.value)}
              className="rounded-lg border border-line px-3 py-1.5 text-sm text-ink outline-none"
            >
              {SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-col gap-1.5 text-xs text-ink-secondary">
            {t('cart.color')}
            <span
              className="h-6 w-6 rounded-full border border-line"
              style={{ backgroundColor: item.color.hex }}
              title={pick(item.color.name)}
              aria-label={`${t('cart.color')}: ${pick(item.color.name)}`}
            />
          </div>
        </div>

        {item.stockRemaining <= 3 && (
          <div className="flex w-fit items-center gap-1.5 rounded-full border border-red-300 px-3 py-1.5 text-xs text-red-600">
            <Icon name="clock" size={14} />
            {t('cart.onlyLeft', { count: item.stockRemaining })}
          </div>
        )}

        <div className="mt-auto flex gap-3 pt-1">
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-line py-2.5 text-[13px] font-medium text-ink"
          >
            <Icon name="trash" size={15} />
            {t('cart.remove')}
          </button>
          <button
            type="button"
            onClick={() => onMoveToFavorites(item.id)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-line py-2.5 text-[13px] font-medium text-ink"
          >
            <Icon name="heart" size={15} />
            {t('cart.moveToFavorites')}
          </button>
        </div>
      </div>

      <div className="w-[230px] shrink-0">
        <PlaceholderImage ratio="4 / 5" label={pick(item.title)} rounded />
      </div>
    </div>
  );
}

export default CartItemCard;
