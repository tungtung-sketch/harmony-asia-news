import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturedCarousel from '@/components/FeaturedCarousel';

import WhyWaLens from '@/components/WhyWaLens';
import Footer from '@/components/Footer';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('subscription_success') === 'true') {
      toast.success('Subscription activated! You now have full access to all insights and reports.');
      // Clean URL
      searchParams.delete('subscription_success');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturedCarousel />
      
      <WhyWaLens />
      <Footer />
    </div>
  );
};

export default Index;
