import { Link, NavLink } from 'react-router-dom';
import Icon from '../common/Icon';
import Container from '../common/Container';
import { utilityLinks, primaryNavLinks } from '../../data/navigation';
import { useLanguage } from '../../context/LanguageContext';

function Header() {
  const { t } = useLanguage();

  return (
    <header className="border-b border-line bg-white">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[84px]">
        <ul className="flex flex-1 items-center gap-3 lg:gap-6">
          {utilityLinks.map((item) => (
            <li key={item.labelKey}>
              <Link
                to={item.href}
                className="flex max-w-[60px] flex-col-reverse items-center gap-1 text-center text-[11px] leading-tight text-ink"
              >
                <span className="hidden text-ink-secondary sm:inline">{t(item.labelKey)}</span>
                <Icon name={item.icon} size={20} />
              </Link>
            </li>
          ))}
        </ul>

        <Link to="/" className="flex shrink-0 flex-col items-center text-gold">
          <span className="font-serif text-xl font-bold leading-none tracking-[0.08em] lg:text-[28px]">
            SFA
          </span>
          <span className="mt-0.5 hidden text-[9px] uppercase tracking-[0.25em] sm:block">
            {t('nav.logoSub')}
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-3 lg:gap-7">
          <button type="button" className="flex border-none bg-transparent p-0 text-ink" aria-label="Search">
            <Icon name="search" size={20} />
          </button>
          <nav>
            <ul className="flex items-center gap-3 lg:gap-6">
              {primaryNavLinks.map((item) => (
                <li key={item.labelKey}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `rounded-full text-xs transition-colors sm:text-sm ${
                        isActive ? 'bg-ink px-4 py-1.5 text-white' : 'text-ink'
                      }`
                    }
                  >
                    {t(item.labelKey)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}

export default Header;
