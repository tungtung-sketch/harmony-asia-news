import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";

const Subscribe = () => {
  const { t } = useI18n();

  const plans = [
    {
      name: t("subscribe.plans.freeTrial.title"),
      duration: t("subscribe.plans.freeTrial.duration"),
      price: t("subscribe.plans.freeTrial.price"),
      description: t("subscribe.plans.freeTrial.description"),
      cta: t("subscribe.plans.freeTrial.cta"),
      isPopular: false,
      features: {
        dailyNews: "limited",
        premiumInsights: false,
        executiveReports: false,
        pdfDownloads: false,
        multiSeat: false,
        customServices: false,
      }
    },
    {
      name: t("subscribe.plans.basic.title"),
      price: t("subscribe.plans.basic.price"),
      description: t("subscribe.plans.basic.description"),
      cta: t("subscribe.plans.basic.cta"),
      isPopular: false,
      features: {
        dailyNews: true,
        premiumInsights: false,
        executiveReports: false,
        pdfDownloads: false,
        multiSeat: false,
        customServices: false,
      }
    },
    {
      name: t("subscribe.plans.premium.title"),
      price: t("subscribe.plans.premium.price"),
      description: t("subscribe.plans.premium.description"),
      cta: t("subscribe.plans.premium.cta"),
      isPopular: true,
      features: {
        dailyNews: true,
        premiumInsights: true,
        executiveReports: true,
        pdfDownloads: true,
        multiSeat: false,
        customServices: false,
      }
    },
    {
      name: t("subscribe.plans.corporate.title"),
      price: t("subscribe.plans.corporate.price"),
      description: t("subscribe.plans.corporate.description"),
      cta: t("subscribe.plans.corporate.cta"),
      isPopular: false,
      features: {
        dailyNews: true,
        premiumInsights: true,
        executiveReports: true,
        pdfDownloads: true,
        multiSeat: true,
        customServices: true,
      }
    }
  ];

  const features = [
    { key: "dailyNews", label: t("subscribe.features.dailyNews") },
    { key: "premiumInsights", label: t("subscribe.features.premiumInsights") },
    { key: "executiveReports", label: t("subscribe.features.executiveReports") },
    { key: "pdfDownloads", label: t("subscribe.features.pdfDownloads") },
    { key: "multiSeat", label: t("subscribe.features.multiSeat") },
    { key: "customServices", label: t("subscribe.features.customServices") },
  ];

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
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
              <Button 
                size="lg" 
                onClick={scrollToPricing}
                className="text-lg px-8 py-6"
              >
                {t("subscribe.hero.cta")}
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.isPopular ? 'border-primary shadow-lg scale-105' : 'border-border'}`}>
                  {plan.isPopular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                      {t("subscribe.plans.premium.popular")}
                    </Badge>
                  )}
                   <CardHeader className="text-center">
                     <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                     {plan.duration && (
                       <div className="text-sm text-muted-foreground">({plan.duration})</div>
                     )}
                     <div className="text-3xl font-bold text-primary">{plan.price}</div>
                     <CardDescription className="text-sm mb-4">{plan.description}</CardDescription>
                   </CardHeader>
                   <CardContent className="px-6 pb-4">
                     <p className="text-sm text-muted-foreground">
                       {t(`subscribe.plans.${index === 0 ? 'freeTrial' : index === 1 ? 'basic' : index === 2 ? 'premium' : 'corporate'}.detailedDescription`)}
                     </p>
                   </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant={plan.isPopular ? "default" : "outline"}
                    >
                      {plan.cta}
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
            <h2 className="text-3xl font-bold text-center mb-12">{t("subscribe.features.title")}</h2>
            <div className="max-w-6xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-4 font-semibold">Features</th>
                      {plans.map((plan, index) => (
                        <th key={index} className="text-center py-4 px-4 font-semibold min-w-[120px]">
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feature, featureIndex) => (
                      <tr key={featureIndex} className="border-b border-border/50">
                        <td className="py-4 px-4 font-medium">{feature.label}</td>
                        {plans.map((plan, planIndex) => (
                          <td key={planIndex} className="text-center py-4 px-4">
                            <FeatureIcon included={plan.features[feature.key as keyof typeof plan.features]} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
    </>
  );
};

export default Subscribe;