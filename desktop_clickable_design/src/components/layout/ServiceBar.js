import Icon from '../common/Icon';
import Container from '../common/Container';
import { serviceHighlights } from '../../data/navigation';
import { useLanguage } from '../../context/LanguageContext';

function ServiceBar() {
  const { t } = useLanguage();

  return (
    <div className="border-b border-line">
      <Container className="flex flex-wrap items-center justify-between gap-2.5 py-2.5 md:h-[52px] md:flex-nowrap md:gap-4 md:py-0">
        {serviceHighlights.map((item, index) => (
          <div
            key={item.labelKey}
            className={`flex flex-1 items-center gap-2 whitespace-nowrap text-center text-[11px] text-ink md:text-[13px] ${
              index === 0
                ? 'justify-center md:justify-start'
                : index === serviceHighlights.length - 1
                ? 'justify-center md:justify-end'
                : 'justify-center'
            }`}
          >
            <span>{t(item.labelKey)}</span>
            <Icon name={item.icon === 'apple-pay' ? 'appleLogo' : item.icon} size={16} />
          </div>
        ))}
      </Container>
    </div>
  );
}

export default ServiceBar;
