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
        title="タイ経済レポート｜在タイ日系企業のための経済・規制・リスク情報 | WaLens"
        description="週2回、在タイ日系企業の経営判断に効く経済・規制・リスク情報をお届け。為替・規制・エネルギー・サプライチェーンの最新動向。Thailand Economic Report for Japanese Companies."
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
