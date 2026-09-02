import { Link } from 'react-router-dom';
import PlaceholderImage from '../common/PlaceholderImage';

function RailCard({ brand, href }) {
  return (
    <Link to={href} className="relative block overflow-hidden rounded-lg">
      <PlaceholderImage ratio="2 / 3" label={brand} rounded />
      <span
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 40%)' }}
      />
      <span
        className="absolute left-2.5 top-2.5 h-7 w-7 rounded-full border-2 border-gold bg-white"
        aria-hidden="true"
      />
      <span className="absolute bottom-2.5 left-2.5 text-xs font-semibold text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]">
        {brand}
      </span>
    </Link>
  );
}

export default RailCard;
