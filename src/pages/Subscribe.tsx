import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';
import { AuthModals } from '@/components/AuthModals';
import { trackCheckoutStart } from '@/lib/tracker';
import CompanyProfileDownload from '@/components/CompanyProfileDownload';

import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Subscribe = () => {
  const { t } = useI18n();
  const { user, session } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium'>('basic');
  const [isProcessing, setIsProcessing] = useState(false);

  // Stripe Payment Links (provided by the client)
  const paymentLinks: Record<'basic' | 'premium', string> = {
    basic: 'https://buy.stripe.com/28EbJ18Nz7gB7bRa4s8Vi00',
    premium: 'https://buy.stripe.com/aFafZhd3P8kFao3ekI8Vi01',
  };

  const plans = [
    {
      id: 'basic' as const,
      name: t("subscribe.plans.basic.title"),
      price: "฿599/month",
      billingInfo: t("subscribe.plans.basic.billingInfo"),
      description: t("subscribe.plans.basic.description"),
      cta: t("subscribe.plans.basic.cta"),
      isPopular: false,
      features: {
        dailyNews: true,
        premiumInsights: false,
        executiveReports: false,
      }
    },
    {
      id: 'premium' as const,
      name: t("subscribe.plans.premium.title"),
      price: "฿1,299/month",
      billingInfo: t("subscribe.plans.premium.billingInfo"),
      description: t("subscribe.plans.premium.description"),
      cta: t("subscribe.plans.premium.cta"),
      isPopular: true,
      features: {
        dailyNews: true,
        premiumInsights: true,
        executiveReports: true,
      }
    }
  ];

  const features = [
    { 
      key: "dailyNews", 
      label: t("subscribe.features.dailyNews"),
      basicDesc: t("subscribe.features.dailyNews.basicDesc"),
      premiumDesc: t("subscribe.features.dailyNews.premiumDesc"),
    },
    { 
      key: "premiumInsights", 
      label: t("subscribe.features.premiumInsights"),
      basicDesc: t("subscribe.features.premiumInsights.basicDesc"),
      premiumDesc: t("subscribe.features.premiumInsights.premiumDesc"),
    },
    { 
      key: "executiveReports", 
      label: t("subscribe.features.executiveReports"),
      basicDesc: t("subscribe.features.executiveReports.basicDesc"),
      premiumDesc: t("subscribe.features.executiveReports.premiumDesc"),
    },
  ];

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubscribe = async (planType: 'basic' | 'premium') => {
    // Check if user is logged in
    if (!user || !session) {
      setSelectedPlan(planType);
      setIsLoginOpen(true);
      return;
    }

    setIsProcessing(true);
    try {
      trackCheckoutStart(planType);
      const url = paymentLinks[planType];
      if (!url) {
        throw new Error('Missing Stripe Payment Link URL');
      }
      // Open in same tab for a clean redirect flow
      window.location.href = url;
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error?.message || t('auth.unexpectedError'),
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAuthSuccess = () => {
    // After successful login/signup, proceed with the selected plan
    if (selectedPlan) {
      handleSubscribe(selectedPlan);
    }
  };

  const handleSwitchToSignUp = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };

  const FeatureIcon = ({ included }: { included: boolean | string }) => {
    if (included === "limited") {
      return <Badge variant="secondary" className="text-xs">Limited</Badge>;
    }
    if (included) {
      return <Check className="h-5 w-5 text-green-600" />;
    }
    return <X className="h-5 w-5 text-muted-foreground" />;
  };

  return (
    <>
      <SEO
        title={t("subscribe.title")}
        description={t("subscribe.metaDescription")}
        canonicalPath="/subscribe"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/5 to-secondary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                {t("subscribe.hero.title")}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {t("subscribe.hero.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.isPopular ? 'border-primary shadow-lg scale-105' : 'border-border'}`}>
                  {plan.isPopular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                      {t("subscribe.plans.premium.popular")}
                    </Badge>
                  )}
                   <CardHeader className="text-center">
                     <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                     <div className="text-3xl font-bold text-primary">{plan.price}</div>
                     <CardDescription className="text-sm mb-2">{plan.billingInfo}</CardDescription>
                     <CardDescription className="text-sm">{plan.description}</CardDescription>
                   </CardHeader>
                   <CardContent className="px-6 pb-4">
                     <p className="text-sm text-muted-foreground">
                       {t(`subscribe.plans.${index === 0 ? 'basic' : 'premium'}.detailedDescription`)}
                     </p>
                   </CardContent>
                   <CardFooter>
                     <Button 
                       onClick={() => handleSubscribe(plan.id)}
                       className="w-full" 
                       variant={plan.isPopular ? "default" : "outline"}
                       disabled={isProcessing}
                     >
                       {isProcessing ? t("common.loading") : plan.cta}
                     </Button>
                   </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">{t("subscribe.features.title")}</h2>
            
            {/* Positioning Statement */}
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-muted-foreground leading-relaxed text-base">
                {t("subscribe.features.positioning.line1")}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm mt-2">
                {t("subscribe.features.positioning.line2")}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-6 font-semibold text-foreground w-1/3">
                        {t("subscribe.features.featureLabel")}
                      </th>
                      {plans.map((plan, index) => (
                        <th key={index} className="text-center py-4 px-6 font-semibold text-foreground w-1/3">
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feature, featureIndex) => (
                      <tr key={featureIndex} className="border-b border-border/30">
                        <td className="py-5 px-6 align-top">
                          <span className="font-medium text-foreground">{feature.label}</span>
                        </td>
                        <td className="py-5 px-6 align-top">
                          <div className="flex items-start gap-2">
                            <div className="mt-0.5 shrink-0">
                              <FeatureIcon included={plans[0].features[feature.key as keyof typeof plans[0]['features']]} />
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {feature.basicDesc}
                            </p>
                          </div>
                        </td>
                        <td className="py-5 px-6 align-top">
                          <div className="flex items-start gap-2">
                            <div className="mt-0.5 shrink-0">
                              <FeatureIcon included={plans[1].features[feature.key as keyof typeof plans[1]['features']]} />
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {feature.premiumDesc}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Company Profile Download */}
        <section className="py-10">
          <div className="container mx-auto px-4 max-w-4xl">
            <CompanyProfileDownload variant="card" />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 max-w-4xl mx-auto">
              {t("subscribe.finalCta.title")}
            </h2>
            <Button size="lg" className="text-lg px-8 py-6" onClick={scrollToPricing}>
              {t("subscribe.finalCta.button")}
            </Button>
          </div>
        </section>

        <Footer />
      </div>

      <AuthModals
        isSignUpOpen={isSignUpOpen}
        isLoginOpen={isLoginOpen}
        onSignUpClose={() => setIsSignUpOpen(false)}
        onLoginClose={() => setIsLoginOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
        onSwitchToSignUp={handleSwitchToSignUp}
      />
    </>
  );
};

export default Subscribe;