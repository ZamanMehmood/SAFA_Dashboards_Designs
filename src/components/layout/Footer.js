import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import Container from '../common/Container';
import { footerColumns, socialLinks } from '../../data/navigation';
import { allSaudiBrands } from '../../data/brands';
import { useLanguage } from '../../context/LanguageContext';

const footerBrands = allSaudiBrands.slice(0, 5);

function Footer() {
  const { t, pick } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-maroon pb-5 pt-12 text-white/85">
      <Container>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
          <div>
            <h3 className="mb-5 text-[15px] font-bold text-white">{t('footer.followUs')}</h3>
            <div className="mb-5 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-white/40 text-white"
                  aria-label={social.label}
                >
                  <Icon name={social.icon} size={16} />
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <span className="w-fit rounded border border-white/40 px-3 py-1.5 text-[11px]">
                App Store
              </span>
              <span className="w-fit rounded border border-white/40 px-3 py-1.5 text-[11px]">
                Google Play
              </span>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.headingKey}>
              <h3 className="mb-5 text-[15px] font-bold text-white">{t(column.headingKey)}</h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.labelKey}>
                    <Link to={link.href} className="text-[13px] text-white/75 transition-colors hover:text-white">
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-5 text-[15px] font-bold text-white">{t('footer.topBrands')}</h3>
            <ul className="flex flex-col gap-3">
              {footerBrands.map((brand) => (
                <li key={brand.id}>
                  <Link to={brand.href} className="text-[13px] text-white/75 transition-colors hover:text-white">
                    {pick(brand.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-white/15 pt-5 text-xs text-white/60 sm:flex-row sm:justify-between sm:text-left">
          <span>{t('footer.rightsReserved', { year })}</span>
          <span className="font-serif text-lg font-bold text-white">SFA</span>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
