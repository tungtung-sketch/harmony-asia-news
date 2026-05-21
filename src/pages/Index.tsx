import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import HeroSection from '@/components/homepage/HeroSection';
import SignalOverNoise from '@/components/homepage/SignalOverNoise';
import IntelligenceProof from '@/components/homepage/IntelligenceProof';
import LeadMagnet from '@/components/homepage/LeadMagnet';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

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
      <SEO
        title="WaLens — タイ駐在日本人エグゼクティブのための戦略インテリジェンス"
        description="為替・規制・エネルギー・サプライチェーン——タイ現地の動向を、日本語で、毎日お届けします。Japanese executives managing operations in Thailand."
        canonicalPath="/"
      />
      <Header />
      <HeroSection />
      <SignalOverNoise />
      <IntelligenceProof />
      <LeadMagnet />
      <Footer />
    </div>
  );
};

export default Index;
