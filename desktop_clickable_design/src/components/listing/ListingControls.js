import Icon from '../common/Icon';
import { useLanguage } from '../../context/LanguageContext';

/** Filter/sort controls shown alongside the category chip row on listing pages. */
function ListingControls() {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        className="flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-[13px] text-ink"
      >
        <Icon name="filter" size={15} />
        {t('listing.filters')}
      </button>
      <button
        type="button"
        className="flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-[13px] text-ink"
      >
        <Icon name="sort" size={15} />
        {t('listing.sort')}
      </button>
    </div>
  );
}

export default ListingControls;
