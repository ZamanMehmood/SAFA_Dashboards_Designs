import { Link } from 'react-router-dom';
import PlaceholderImage from '../common/PlaceholderImage';

function CategoryBanner({ label, href }) {
  return (
    <Link to={href} className="relative block overflow-hidden rounded-lg">
      <PlaceholderImage ratio="679 / 195" label={label} rounded />
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.5) 100%)',
        }}
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base font-bold text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.4)] sm:right-6 sm:text-xl">
        {label}
      </span>
    </Link>
  );
}

export default CategoryBanner;
