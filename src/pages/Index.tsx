import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import LatestArticles from '@/components/LatestArticles';
import InsightHighlight from '@/components/InsightHighlight';
import NewsletterBanner from '@/components/NewsletterBanner';
import AboutStealth from '@/components/AboutStealth';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturedCarousel />
      <LatestArticles />
      <InsightHighlight />
      <NewsletterBanner />
      <AboutStealth />
      <Footer />
    </div>
  );
};

export default Index;
