import { Link } from 'react-router-dom';
import PlaceholderImage from '../common/PlaceholderImage';

function PromoTile({ label, href }) {
  return (
    <Link to={href} className="relative block overflow-hidden rounded-lg">
      <PlaceholderImage ratio="8 / 5" label={label} rounded />
      <span
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 55%)' }}
      />
      <span className="absolute bottom-6 left-6 max-w-[70%] text-xl font-bold text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.4)] sm:text-2xl">
        {label}
      </span>
    </Link>
  );
}

export default PromoTile;
