import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, CreditCard, History, Settings, ExternalLink } from "lucide-react";

const Dashboard = () => {
  const { t } = useI18n();

  // Mock user data - in real app, this would come from authentication context
  const user = {
    name: "Tanaka Hiroshi",
    email: "tanaka@example.com",
    position: "CEO",
    industry: "Manufacturing",
    joinDate: "2024-01-15"
  };

  const subscription = {
    plan: "Premium Plan",
    status: "Active",
    renewalDate: "2024-03-15",
    billingDate: "2024-03-15"
  };

  const recentArticles = [
    { title: "Thailand Economic Outlook 2024", date: "2024-02-01", category: "Economy" },
    { title: "Japanese Investment Trends in ASEAN", date: "2024-01-28", category: "Business Intelligence" },
    { title: "Thai Policy Updates - February", date: "2024-01-25", category: "Policy" }
  ];

  const handleManageSubscription = () => {
    // TODO: Integrate with Stripe Customer Portal
    console.log("Redirecting to Stripe Customer Portal");
  };

  const handleUpgradePlan = () => {
    // TODO: Redirect to upgrade flow
    console.log("Redirecting to upgrade flow");
  };

  return (
    <>
      <SEO
        title={t("dashboard.title")}
        description={t("dashboard.metaDescription")}
        canonicalPath="/dashboard"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/5 to-secondary/5 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                {t("dashboard.welcomeBack")}, {user.name}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t("dashboard.metaDescription")}
              </p>
            </div>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Profile Information */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {t("dashboard.profile.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">{t("signup.form.name")}</div>
                      <div className="text-base">{user.name}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">{t("signup.form.email")}</div>
                      <div className="text-base">{user.email}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">{t("signup.form.position")}</div>
                      <div className="text-base">{user.position}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">{t("signup.form.industry")}</div>
                      <div className="text-base">{user.industry}</div>
                    </div>
                    <Separator />
                    <Button variant="outline" size="sm" className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      {t("dashboard.profile.edit")}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Subscription Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      {t("dashboard.subscription.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          {t("dashboard.subscription.plan")}
                        </div>
                        <div className="text-lg font-semibold">{subscription.plan}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          {t("dashboard.subscription.status")}
                        </div>
                        <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          {t("dashboard.subscription.active")}
                        </Badge>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          {t("dashboard.subscription.renewalDate")}
                        </div>
                        <div className="text-base">{subscription.renewalDate}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          {t("dashboard.subscription.billingDate")}
                        </div>
                        <div className="text-base">{subscription.billingDate}</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex flex-wrap gap-3">
                      <Button onClick={handleManageSubscription} className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        {t("dashboard.subscription.manage")}
                      </Button>
                      <Button variant="outline" onClick={handleUpgradePlan}>
                        {t("dashboard.subscription.upgrade")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Reading History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <History className="h-5 w-5" />
                      {t("dashboard.history.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {recentArticles.length > 0 ? (
                      <div className="space-y-4">
                        {recentArticles.map((article, index) => (
                          <div key={index} className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex-1">
                              <h3 className="font-medium mb-1">{article.title}</h3>
                              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span>{article.date}</span>
                                <Badge variant="secondary">{article.category}</Badge>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </div>
                        ))}
                        <Separator />
                        <Button variant="outline" className="w-full">
                          {t("dashboard.history.viewAll")}
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        {t("dashboard.history.noHistory")}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Dashboard;