import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from "@/components/SEO";
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, CreditCard, Calendar, History, Settings, Download, Phone, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MyPage = () => {
  const { t } = useI18n();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Get user profile data from auth user
  const userProfile = {
    name: user?.user_metadata?.name || user?.email || "User",
    email: user?.email || "",
    position: user?.user_metadata?.position || "manager",
    industry: user?.user_metadata?.industry || "manufacturing"
  };

  // Mock subscription data - in real app, this would come from Stripe API
  const mockSubscriptionData = {
    plan: "Premium Plan",
    status: "Active",
    nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    paymentHistory: [
      { date: "2024-01-15", amount: "฿1,299", status: "Paid" },
      { date: "2023-12-15", amount: "฿1,299", status: "Paid" },
      { date: "2023-11-15", amount: "฿1,299", status: "Paid" }
    ]
  };

  useEffect(() => {
    // Simulate loading subscription data
    const timer = setTimeout(() => {
      setSubscriptionData(mockSubscriptionData);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleManageSubscription = async () => {
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        body: {}
      });
      
      if (error) {
        console.error('Error opening customer portal:', error);
        return;
      }
      
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success(t('myPage.logout.success'));
      navigate('/');
    } catch (error) {
      toast.error(t('myPage.logout.error'));
    }
  };

  if (loading) {
    return (
      <>
        <SEO
          title={t("myPage.title")}
          description={t("myPage.metaDescription")}
          canonicalPath="/my-page"
        />
        <div className="min-h-screen bg-background">
          <Header />
          <section className="py-16">
            <div className="container mx-auto px-4 text-center">
              <div className="text-lg">{t("paymentSuccess.loading")}</div>
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
        title={t("myPage.title")}
        description={t("myPage.metaDescription")}
        canonicalPath="/my-page"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/5 to-secondary/5 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                {t("myPage.hero.title")}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t("myPage.hero.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Profile Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {t("myPage.profile.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        {t("myPage.profile.name")}
                      </div>
                      <div className="text-lg font-semibold">{userProfile.name}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        {t("myPage.profile.email")}
                      </div>
                      <div>{userProfile.email}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        {t("myPage.profile.position")}
                      </div>
                      <div>{t(`signup.positions.${userProfile.position}`)}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        {t("myPage.profile.industry")}
                      </div>
                      <div>{t(`signup.industries.${userProfile.industry}`)}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <Button variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        {t("myPage.actions.editProfile")}
                      </Button>
                      <Button variant="outline" onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        {t("myPage.actions.logout")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Subscription Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      {t("myPage.subscription.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        {t("myPage.subscription.currentPlan")}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold">{subscriptionData?.plan}</span>
                        <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          {subscriptionData?.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        {t("myPage.subscription.nextBilling")}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{subscriptionData?.nextBillingDate}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button onClick={handleManageSubscription} className="w-full">
                        {t("myPage.subscription.manageButton")}
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          {t("myPage.actions.downloadInvoice")}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          {t("myPage.actions.contactSupport")}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Payment History */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    {t("myPage.subscription.paymentHistory")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subscriptionData?.paymentHistory.map((payment: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{payment.date}</div>
                            <div className="text-sm text-muted-foreground">{payment.amount}</div>
                          </div>
                        </div>
                        <Badge variant={payment.status === 'Paid' ? 'default' : 'secondary'}>
                          {payment.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Access History */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>{t("myPage.history.title")}</CardTitle>
                  <CardDescription>{t("myPage.history.recentActivity")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Coming Soon - Your reading history and accessed content will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default MyPage;