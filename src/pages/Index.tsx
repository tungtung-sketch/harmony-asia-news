import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import NewsSection from '@/components/NewsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <NewsSection />
      <Footer />
    </div>
  );
};

export default Index;
