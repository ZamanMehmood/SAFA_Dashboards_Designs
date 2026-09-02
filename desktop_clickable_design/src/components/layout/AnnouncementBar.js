import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import Container from '../common/Container';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../../context/LanguageContext';

function AnnouncementBar() {
  const { t } = useLanguage();

  return (
    <div className="border-b border-line bg-surface-alt text-xs">
      <Container className="flex h-[34px] items-center justify-between text-ink-secondary">
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <span className="hidden text-ink-secondary sm:inline">{t('announcement.changeLanguage')}</span>
          <span className="hidden h-3 w-px bg-line sm:inline-block" />
          <span className="inline-flex items-center gap-1.5">
            {t('announcement.kingdom')}
            <span className="h-2 w-2 rounded-full bg-[#3fa845]" aria-hidden="true" />
          </span>
        </div>
        <Link to="/order-tracking" className="inline-flex items-center gap-1.5 text-ink-secondary">
          {t('announcement.orderTracking')}
          <Icon name="clock" size={14} />
        </Link>
      </Container>
    </div>
  );
}

export default AnnouncementBar;
