import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import HeroSection from '@/components/homepage/HeroSection';
import SignalOverNoise from '@/components/homepage/SignalOverNoise';
import IntelligenceProof from '@/components/homepage/IntelligenceProof';
import LeadMagnet from '@/components/homepage/LeadMagnet';
import PricingPreview from '@/components/homepage/PricingPreview';
import Footer from '@/components/Footer';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('subscription_success') === 'true') {
      toast.success('Subscription activated! You now have full access to all insights and reports.');
      searchParams.delete('subscription_success');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <SignalOverNoise />
      <IntelligenceProof />
      <LeadMagnet />
      <PricingPreview />
      <Footer />
    </div>
  );
};

export default Index;
