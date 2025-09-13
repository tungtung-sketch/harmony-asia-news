import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/i18n/I18nProvider';
import { useNavigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { CalendarDays, CreditCard, User, Briefcase, Building, Eye } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  full_name: string;
  email: string;
  position: string;
  industry: string;
  subscription_plan: string;
  created_at: string;
}

interface Subscription {
  tier: string;
  trial_end_date: string;
  subscription_end_date: string;
  is_active: boolean;
}

const MyPage = () => {
  const { user, loading, signOut, session } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const { subscriptionStatus: subStatus, refreshSubscription } = useSubscription();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
      return;
    }

    if (user) {
      fetchUserData();
    }
  }, [user, loading, navigate]);

  const fetchUserData = async () => {
    try {
      // Fetch profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
      } else {
        setProfile(profileData);
      }

      // Fetch subscription data
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (subscriptionError) {
        console.error('Error fetching subscription:', subscriptionError);
      } else {
        setSubscription(subscriptionData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleManageSubscription = async () => {
    if (!session) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) {
        toast({
          title: t("auth.error"),
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      toast({
        title: t("auth.error"),
        description: t("auth.unexpectedError"),
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSubscriptionStatus = () => {
    // Use the new subscription hook status first
    if (subStatus.loading) {
      return { text: t('common.loading'), variant: 'secondary' as const };
    }

    if (subStatus.isActive) {
      if (subStatus.plan === 'free_trial') {
        return { text: t('mypage.freeTrial'), variant: 'default' as const };
      } else if (subStatus.plan === 'premium') {
        return { text: t('subscribe.plans.premium.title'), variant: 'default' as const };
      } else if (subStatus.plan === 'basic') {
        return { text: t('subscribe.plans.basic.title'), variant: 'default' as const };
      }
    }

    // Fallback to local subscription data
    if (!subscription) return { text: t('mypage.noSubscription'), variant: 'secondary' as const };
    
    if (subscription.tier === 'free_trial') {
      const trialEnd = new Date(subscription.trial_end_date);
      const now = new Date();
      
      if (trialEnd > now) {
        return { text: t('mypage.freeTrial'), variant: 'default' as const };
      } else {
        return { text: t('mypage.trialExpired'), variant: 'destructive' as const };
      }
    }
    
    if (subscription.is_active) {
      return { text: t('mypage.activeSubscription'), variant: 'default' as const };
    }
    
    return { text: t('mypage.inactiveSubscription'), variant: 'secondary' as const };
  };

  const dummyReadingHistory = [
    { title: "Thailand Economic Outlook 2024", date: "2024-01-15", category: "Economy" },
    { title: "ASEAN Trade Partnership Updates", date: "2024-01-12", category: "Trade" },
    { title: "Bangkok Infrastructure Development", date: "2024-01-10", category: "Infrastructure" },
    { title: "Southeast Asia Investment Trends", date: "2024-01-08", category: "Investment" },
    { title: "Thai Manufacturing Sector Analysis", date: "2024-01-05", category: "Manufacturing" }
  ];

  if (loading || profileLoading || subStatus.loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">{t('common.loading')}</div>
        </div>
        <Footer />
      </div>
    );
  }

  const displaySubscriptionStatus = getSubscriptionStatus();

  return (
    <>
      <SEO
        title={t("mypage.title")}
        description={t("mypage.description")}
        canonicalPath="/mypage"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">{t('mypage.welcome')}</h1>
              <Button variant="outline" onClick={handleSignOut}>
                {t('mypage.signOut')}
              </Button>
            </div>

            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {t('mypage.profileInfo')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      {t('auth.fullName')}
                    </label>
                    <p className="text-base">{profile?.full_name || t('mypage.notProvided')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      {t('auth.email')}
                    </label>
                    <p className="text-base">{profile?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {t('auth.position')}
                    </label>
                    <p className="text-base">
                      {profile?.position ? t(`signup.positions.${profile.position}`) : t('mypage.notProvided')}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {t('auth.industry')}
                    </label>
                    <p className="text-base">
                      {profile?.industry ? t(`signup.industries.${profile.industry}`) : t('mypage.notProvided')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  {t('mypage.subscriptionInfo')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t('mypage.currentPlan')}</p>
                    <p className="text-lg font-semibold">
                      {subscription?.tier === 'free_trial' 
                        ? t('mypage.freeTrial') 
                        : profile?.subscription_plan ? t(`subscribe.plans.${profile.subscription_plan}.title`) : t('mypage.basicPlan')
                      }
                    </p>
                  </div>
                  <Badge variant={displaySubscriptionStatus.variant}>
                    {displaySubscriptionStatus.text}
                  </Badge>
                </div>

                {subscription && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {subscription.tier === 'free_trial' && subscription.trial_end_date && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          {t('mypage.trialEnds')}
                        </label>
                        <p className="text-base">{formatDate(subscription.trial_end_date)}</p>
                      </div>
                    )}
                    
                    {subscription.subscription_end_date && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          {t('mypage.nextBilling')}
                        </label>
                        <p className="text-base">{formatDate(subscription.subscription_end_date)}</p>
                      </div>
                    )}
                  </div>
                )}

                <Separator />

                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="default">
                    <Link to="/subscribe">
                      {t('mypage.upgradePlan')}
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={handleManageSubscription}>
                    {t('mypage.manageSubscription')}
                  </Button>
                  <Button variant="destructive" onClick={() => toast({
                    title: t('common.loading'),
                    description: "Feature coming soon",
                  })}>
                    {t('mypage.cancelSubscription')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Reading History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  {t('mypage.readingHistory')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dummyReadingHistory.map((article, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50">
                      <div>
                        <h4 className="font-medium">{article.title}</h4>
                        <p className="text-sm text-muted-foreground">{article.category}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{formatDate(article.date)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline">{t('mypage.viewAll')}</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default MyPage;