import HeroBanner from '../components/home/HeroBanner';
import SaudiBrandsSection from '../components/home/SaudiBrandsSection';
import PromoSection from '../components/home/PromoSection';
import FromTheRailsSection from '../components/home/FromTheRailsSection';
import FeaturedProductsSection from '../components/home/FeaturedProductsSection';

function HomePage() {
  return (
    <>
      <HeroBanner />
      <SaudiBrandsSection />
      <PromoSection />
      <FromTheRailsSection />
      <FeaturedProductsSection />
    </>
  );
}

export default HomePage;
