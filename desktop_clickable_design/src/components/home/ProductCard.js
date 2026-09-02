import { Link } from 'react-router-dom';
import PlaceholderImage from '../common/PlaceholderImage';
import Rating from '../common/Rating';
import Icon from '../common/Icon';
import { useLanguage } from '../../context/LanguageContext';

function ProductCard({ product }) {
  const { t, pick } = useLanguage();

  return (
    <div className="flex flex-col">
      <Link to={product.href} className="relative block">
        <PlaceholderImage ratio="3 / 4" label={pick(product.title)} rounded />
        <button
          type="button"
          className="absolute right-2.5 top-2.5 flex h-[30px] w-[30px] items-center justify-center rounded-full border-none bg-white text-ink shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
          aria-label={t('product.addToFavorites')}
          onClick={(event) => event.preventDefault()}
        >
          <Icon name="heart" size={16} />
        </button>
      </Link>
      <div className="mt-3 flex flex-col gap-1">
        <span className="text-[13px] font-bold text-ink">{pick(product.brand)}</span>
        <Link to={product.href} className="text-[13px] text-ink-secondary">
          {pick(product.title)}
        </Link>
        <span className="mt-0.5 text-[13px] font-semibold text-ink">{pick(product.price)}</span>
        <Rating value={product.rating} reviewCount={product.reviewCount} />
      </div>
    </div>
  );
}

export default ProductCard;
