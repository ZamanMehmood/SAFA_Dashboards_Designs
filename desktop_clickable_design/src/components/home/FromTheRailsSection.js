import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import RailCard from './RailCard';
import { railItems } from '../../data/rails';
import { useLanguage } from '../../context/LanguageContext';

function FromTheRailsSection() {
  const { t, pick } = useLanguage();

  return (
    <section className="py-5 pb-10">
      <Container>
        <SectionHeader title={t('section.fromTheRails')} viewAllHref="/rails" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {railItems.map((item) => (
            <RailCard key={item.id} brand={pick(item.brand)} href={item.href} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default FromTheRailsSection;
