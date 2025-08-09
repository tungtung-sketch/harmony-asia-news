import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import NewsSection from '@/components/NewsSection';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';
import AdvertisementSection from '@/components/AdvertisementSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Banner />
      <Header />
      <HeroSection />
      <NewsSection />
      <AdvertisementSection />
      <Footer />
    </div>
  );
};

export default Index;
