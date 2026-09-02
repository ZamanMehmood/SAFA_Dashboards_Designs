import { Link } from 'react-router-dom';
import PlaceholderImage from '../common/PlaceholderImage';

function BrandCard({ name, href }) {
  return (
    <Link to={href} className="relative block overflow-hidden rounded-lg">
      <PlaceholderImage ratio="6 / 5" label={name} rounded />
      <span
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 45%)' }}
      />
      <span className="absolute inset-x-0 bottom-4 text-center text-[15px] font-semibold text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]">
        {name}
      </span>
    </Link>
  );
}

export default BrandCard;
