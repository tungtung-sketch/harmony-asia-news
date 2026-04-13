import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, User, Calendar, CreditCard } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

const PaymentSuccess = () => {
  const { t } = useI18n();
  const [searchParams] = useSearchParams();
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionData = async () => {
      const sessionId = searchParams.get('session_id');
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        const { supabase } = await import("@/integrations/supabase/client");
        
        const { data, error } = await supabase.functions.invoke('retrieve-checkout-session', {
          body: { session_id: sessionId }
        });

        if (error) {
          console.error('Error retrieving session:', error);
        } else {
          setSessionData(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [searchParams]);

  // Fallback data if session retrieval fails
  const subscriptionDetails = sessionData ? {
    plan: sessionData.metadata?.plan === 'basic' ? t("subscribe.plans.basic.title") : t("subscribe.plans.premium.title"),
    planPrice: sessionData.metadata?.plan === 'basic' ? t("subscribe.plans.basic.price") : t("subscribe.plans.premium.price"),
    startDate: new Date().toLocaleDateString(),
    renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    customerDetails: {
      name: sessionData.metadata?.name || "",
      position: sessionData.metadata?.position || "",
      industry: sessionData.metadata?.industry || "",
      purpose: sessionData.metadata?.purpose || ""
    }
  } : {
    plan: "Premium Plan",
    planPrice: "฿1,299/month",
    startDate: new Date().toLocaleDateString(),
    renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    customerDetails: null
  };

  if (loading) {
    return (
      <>
        <SEO
          title={t("paymentSuccess.title")}
          description={t("paymentSuccess.metaDescription")}
          canonicalPath="/payment-success"
        />
        <div className="min-h-screen bg-background">
          <Header />
          <section className="py-16">
            <div className="container mx-auto px-4 text-center">
              <div className="text-lg">{t("paymentSuccess.loading") || "Loading..."}</div>
            </div>
          </section>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={t("paymentSuccess.title")}
        description={t("paymentSuccess.metaDescription")}
        canonicalPath="/payment-success"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Success Hero Section */}
        <section className="relative bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex justify-center mb-6">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                {t("paymentSuccess.hero.title")}
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {t("paymentSuccess.metaDescription")}
              </p>
            </div>
          </div>
        </section>

        {/* Subscription Details */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    {t("paymentSuccess.details.title")}
                  </CardTitle>
                  <CardDescription>
                    Your subscription has been activated successfully
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          {t("paymentSuccess.details.plan")}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold">{subscriptionDetails.plan}</span>
                          <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            Active
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {subscriptionDetails.planPrice}
                        </div>
                      </div>

                      {/* Customer Details */}
                      {subscriptionDetails.customerDetails && (
                        <div className="pt-4 border-t">
                          <div className="text-sm font-medium text-muted-foreground mb-2">
                            {t("paymentSuccess.details.customerInfo") || "Customer Information"}
                          </div>
                          <div className="space-y-2 text-sm">
                            <div><strong>{t("signup.form.name")}:</strong> {subscriptionDetails.customerDetails.name}</div>
                            <div><strong>{t("signup.form.position")}:</strong> {subscriptionDetails.customerDetails.position && t(`signup.positions.${subscriptionDetails.customerDetails.position}`)}</div>
                            <div><strong>{t("signup.form.industry")}:</strong> {subscriptionDetails.customerDetails.industry && t(`signup.industries.${subscriptionDetails.customerDetails.industry}`)}</div>
                            <div><strong>{t("signup.form.purpose")}:</strong> {subscriptionDetails.customerDetails.purpose && t(`signup.purposes.${subscriptionDetails.customerDetails.purpose}`)}</div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          {t("paymentSuccess.details.startDate")}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{subscriptionDetails.startDate}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          {t("paymentSuccess.details.renewalDate")}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{subscriptionDetails.renewalDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What's Next */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>What's included in your subscription?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span>Full access to daily business & policy news</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span>Premium industry reports and executive insights</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span>Downloadable PDF reports and analysis</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span>Daily newsletter with curated insights</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button asChild size="lg" className="h-12">
                  <Link to="/dashboard" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {t("paymentSuccess.actions.dashboard")}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12">
                  <Link to="/news">
                    {t("paymentSuccess.actions.news")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default PaymentSuccess;