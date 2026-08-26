import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Shared "< View all ... Title" heading row used above the Saudi brands,
 * From the rails, and Featured products sections, with an optional
 * right-aligned subtitle beneath the divider.
 */
function SectionHeader({ title, viewAllHref = '#', subtitle }) {
  const { t } = useLanguage();

  return (
    <div className="mb-6">
      <div className="flex items-baseline justify-between gap-4">
        <Link
          to={viewAllHref}
          className="inline-flex items-center gap-1 whitespace-nowrap text-sm text-ink transition-colors hover:text-maroon"
        >
          <span className="text-lg leading-none" aria-hidden="true">
            &lsaquo;
          </span>
          {t('common.viewAll')}
        </Link>
        <h2 className="m-0 text-lg font-bold text-ink sm:text-[22px]">{title}</h2>
      </div>
      <div className="mt-3 h-px bg-line" />
      {subtitle && (
        <p className="mt-2.5 text-right text-[13px] text-ink-secondary">{subtitle}</p>
      )}
    </div>
  );
}

export default SectionHeader;
