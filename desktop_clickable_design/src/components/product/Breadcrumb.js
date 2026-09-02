import { Link } from 'react-router-dom';

function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-[13px] text-ink-secondary">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-2">
            {isLast || !item.href ? (
              <span className="font-medium text-ink">{item.label}</span>
            ) : (
              <Link to={item.href} className="hover:text-ink">
                {item.label}
              </Link>
            )}
            {!isLast && <span aria-hidden="true">&rsaquo;</span>}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
