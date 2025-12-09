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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { CalendarDays, CreditCard, User, Briefcase, Building, Eye, Pencil, X, Save, Info, Key, Receipt } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useToast } from '@/hooks/use-toast';
import { CancellationModal } from '@/components/CancellationModal';
import { PasswordChangeModal } from '@/components/PasswordChangeModal';

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
  current_period_end: string;
}

interface ArticleView {
  id: string;
  article_id: string;
  viewed_at: string;
  article?: {
    id: string;
    slug: string;
    content_type: string;
  };
  article_content?: {
    title: string;
  }[];
}

const MyPage = () => {
  const { user, loading, signOut, session } = useAuth();
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [isCancellationModalOpen, setIsCancellationModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { subscriptionStatus: subStatus, refreshSubscription } = useSubscription();
  
  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: '',
    position: '',
    industry: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  
  // Reading history state
  const [readingHistory, setReadingHistory] = useState<ArticleView[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  const positions = [
    'ceo', 'executive', 'manager', 'analyst', 'consultant', 'entrepreneur', 'investor', 'other'
  ];

  const industries = [
    'manufacturing', 'technology', 'finance', 'trading', 'retail', 'construction', 'healthcare', 'legal', 'consulting', 'other'
  ];

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
      return;
    }

    if (user) {
      fetchUserData();
      fetchReadingHistory();
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
        if (profileData) {
          setEditForm({
            full_name: profileData.full_name || '',
            position: profileData.position || '',
            industry: profileData.industry || ''
          });
        }
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

  const fetchReadingHistory = async () => {
    try {
      setHistoryLoading(true);
      
      // Fetch article views for the current user (includes sheet news stored with role_name as slug)
      const { data: viewsData, error: viewsError } = await supabase
        .from('article_views')
        .select(`
          id,
          article_id,
          viewed_at,
          role_name
        `)
        .eq('user_id', user?.id)
        .order('viewed_at', { ascending: false })
        .limit(10);

      if (viewsError) {
        console.error('Error fetching reading history:', viewsError);
        return;
      }

      if (viewsData && viewsData.length > 0) {
        // For sheet news (no article_id, slug stored in role_name), we'll display those
        const historyItems: ArticleView[] = viewsData.map(view => ({
          id: view.id,
          article_id: view.article_id || view.role_name || '',
          viewed_at: view.viewed_at,
          article: {
            id: view.article_id || view.role_name || '',
            slug: view.role_name || view.article_id || '',
            content_type: 'news'
          },
          article_content: [{
            title: view.role_name ? 
              view.role_name.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 
              'Article'
          }]
        }));
        
        setReadingHistory(historyItems);
      }
    } catch (error) {
      console.error('Error fetching reading history:', error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleCancellationComplete = async () => {
    await fetchUserData();
    await refreshSubscription();
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form when canceling
      setEditForm({
        full_name: profile?.full_name || '',
        position: profile?.position || '',
        industry: profile?.industry || ''
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: editForm.full_name,
          position: editForm.position,
          industry: editForm.industry,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: lang === 'ja' ? '保存しました' : 'Profile updated',
        description: lang === 'ja' ? 'プロフィール情報が更新されました' : 'Your profile information has been updated.',
      });

      await fetchUserData();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: lang === 'ja' ? 'エラー' : 'Error',
        description: lang === 'ja' ? 'プロフィールの更新に失敗しました' : 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSubscriptionStatus = () => {
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
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {t('mypage.profileInfo')}
                </CardTitle>
                <Button 
                  variant={isEditing ? "ghost" : "outline"} 
                  size="sm"
                  onClick={handleEditToggle}
                >
                  {isEditing ? (
                    <>
                      <X className="h-4 w-4 mr-1" />
                      {t('common.cancel')}
                    </>
                  ) : (
                    <>
                      <Pencil className="h-4 w-4 mr-1" />
                      {t('mypage.editProfile')}
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Remark */}
                <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p>{t('mypage.profileRemark')}</p>
                </div>

                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">{t('auth.fullName')}</Label>
                      <Input
                        id="full_name"
                        value={editForm.full_name}
                        onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                        placeholder={lang === 'ja' ? '氏名を入力' : 'Enter your name'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('auth.email')}</Label>
                      <Input
                        value={profile?.email || ''}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">{t('auth.position')}</Label>
                      <Select 
                        value={editForm.position} 
                        onValueChange={(value) => setEditForm({ ...editForm, position: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('signup.form.positionPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                          {positions.map((pos) => (
                            <SelectItem key={pos} value={pos}>
                              {t(`signup.positions.${pos}`)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">{t('auth.industry')}</Label>
                      <Select 
                        value={editForm.industry} 
                        onValueChange={(value) => setEditForm({ ...editForm, industry: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('signup.form.industryPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((ind) => (
                            <SelectItem key={ind} value={ind}>
                              {t(`signup.industries.${ind}`)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-full flex justify-end">
                      <Button onClick={handleSaveProfile} disabled={isSaving}>
                        <Save className="h-4 w-4 mr-1" />
                        {isSaving ? t('common.loading') : t('mypage.saveProfile')}
                      </Button>
                    </div>
                  </div>
                ) : (
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
                )}
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
                    {/* Free Trial End Date */}
                    {subscription.tier === 'free_trial' && subscription.trial_end_date && (
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          {t('mypage.freeTrialUntil')}
                        </label>
                        <p className="text-base font-semibold text-primary">{formatDate(subscription.trial_end_date)}</p>
                      </div>
                    )}
                    
                    {/* Next Billing Date */}
                    {subscription.tier !== 'free_trial' && (subscription.subscription_end_date || subscription.current_period_end) && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          {t('mypage.nextBilling')}
                        </label>
                        <p className="text-base">
                          {formatDate(subscription.current_period_end || subscription.subscription_end_date)}
                        </p>
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
                  <Button asChild variant="outline">
                    <Link to="/billing-history">
                      <Receipt className="h-4 w-4 mr-1" />
                      {lang === 'ja' ? '請求履歴' : 'Billing History'}
                    </Link>
                  </Button>
                  {/* Show cancel button for any active subscription or trial */}
                  {(subStatus.isActive || (subscription && subscription.is_active)) && (
                    <Button 
                      variant="outline" 
                      onClick={() => setIsCancellationModalOpen(true)}
                      className="text-destructive hover:text-destructive border-destructive/50 hover:bg-destructive/10"
                    >
                      {t('mypage.cancelSubscription')}
                    </Button>
                  )}
                </div>

                {/* Password Change */}
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{lang === 'ja' ? 'パスワード' : 'Password'}</p>
                    <p className="text-sm text-muted-foreground">
                      {lang === 'ja' ? 'アカウントのパスワードを変更' : 'Change your account password'}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setIsPasswordModalOpen(true)}>
                    <Key className="h-4 w-4 mr-1" />
                    {lang === 'ja' ? '変更' : 'Change'}
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
                {historyLoading ? (
                  <div className="text-center py-4 text-muted-foreground">
                    {t('common.loading')}
                  </div>
                ) : readingHistory.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Eye className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p>{t('mypage.noReadingHistory')}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {readingHistory.map((item) => (
                      <Link 
                        key={item.id} 
                        to={`/news/${item.article?.slug || item.article_id}`}
                        className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div>
                          <h4 className="font-medium">
                            {item.article_content?.[0]?.title || 'Untitled Article'}
                          </h4>
                          <p className="text-sm text-muted-foreground capitalize">
                            {item.article?.content_type?.replace('_', ' ') || 'Article'}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-muted-foreground">
                            {formatDateTime(item.viewed_at)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                {readingHistory.length > 0 && (
                  <div className="mt-4 text-center">
                    <Button variant="outline">{t('mypage.viewAll')}</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>

      <CancellationModal
        isOpen={isCancellationModalOpen}
        onClose={() => setIsCancellationModalOpen(false)}
        onCancellationComplete={handleCancellationComplete}
      />

      <PasswordChangeModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
};

export default MyPage;
