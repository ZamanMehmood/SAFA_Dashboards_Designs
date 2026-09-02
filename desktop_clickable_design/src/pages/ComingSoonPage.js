import { Link, useLocation } from 'react-router-dom';
import Container from '../components/common/Container';
import { useLanguage } from '../context/LanguageContext';

/**
 * Generic stub destination for links that don't have a designed screen yet.
 * Keeps every clickable element in the homepage genuinely navigable now,
 * while the real screen for each route is filled in incrementally as new
 * screenshots arrive.
 */
function ComingSoonPage() {
  const { t } = useLanguage();
  const location = useLocation();

  return (
    <Container className="flex flex-col items-center gap-3 py-28 text-center">
      <span className="text-xs font-bold uppercase tracking-[0.1em] text-gold">{t('comingSoon.eyebrow')}</span>
      <h1 className="m-0 text-2xl text-ink">{t('comingSoon.title')}</h1>
      <p className="m-0 font-mono text-[13px] text-ink-secondary">{location.pathname}</p>
      <Link to="/" className="mt-4 text-sm font-semibold text-maroon">
        &larr; {t('common.backToHome')}
      </Link>
    </Container>
  );
}

export default ComingSoonPage;
