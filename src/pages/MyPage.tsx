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
import { CalendarDays, CreditCard, User, Briefcase, Building, Eye, Pencil, X, Save, Info, Key, Receipt, Globe } from 'lucide-react';
import SavedArticles from '@/components/SavedArticles';
import { useSubscription } from '@/hooks/useSubscription';
import { useToast } from '@/hooks/use-toast';
import { CancellationModal } from '@/components/CancellationModal';
import { PasswordChangeModal } from '@/components/PasswordChangeModal';
import { ADMIN_EMAIL } from '@/types/paywall';

interface UserProfile {
  full_name: string;
  email: string;
  position: string;
  industry: string;
  company: string;
  country: string;
  subscription_plan: string;
  created_at: string;
}

interface Subscription {
  tier: string;
  trial_end_date: string;
  subscription_end_date: string;
  is_active: boolean;
  current_period_end: string;
  status: string;
}

interface ReadingHistoryItem {
  id: string;
  article_slug: string;
  article_title: string;
  article_url: string;
  language: string;
  read_at: string;
  thumbnail_url: string | null;
  category: string | null;
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
  
  // Check if user is admin
  const isAdmin = user?.email === ADMIN_EMAIL;
  
  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: '',
    position: '',
    industry: '',
    company: '',
    country: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  
  // Reading history state
  const [readingHistory, setReadingHistory] = useState<ReadingHistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  const positions = [
    'ceo', 'executive', 'manager', 'analyst', 'consultant', 'entrepreneur', 'investor', 'other'
  ];

  const industries = [
    'manufacturing', 'technology', 'finance', 'healthcare', 'retail', 
    'automotive', 'realestate', 'agriculture', 'logistics', 'energy', 'consulting', 'other'
  ];

  const countries = [
    'japan', 'thailand', 'singapore', 'malaysia', 'indonesia', 'vietnam', 'philippines', 'myanmar', 'cambodia', 'laos', 'other'
  ];

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
      return;
    }

    if (user) {
      fetchUserData();
    }
  }, [user, loading, navigate]);

  // Separate effect for reading history to re-fetch when language changes
  useEffect(() => {
    if (user) {
      fetchReadingHistory();
    }
  }, [user, lang]);

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
            industry: profileData.industry || '',
            company: profileData.company || '',
            country: profileData.country || ''
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
      
      const { data, error } = await supabase
        .from('reading_history')
        .select('id, article_slug, article_title, article_url, language, read_at, thumbnail_url, category')
        .eq('user_id', user?.id)
        .order('read_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching reading history:', error);
        return;
      }

      // Filter by current language
      const currentLangCode = lang === 'ja' ? 'JP' : 'EN';
      const filteredData = (data || []).filter(item => item.language === currentLangCode);
      setReadingHistory(filteredData);
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
      setEditForm({
        full_name: profile?.full_name || '',
        position: profile?.position || '',
        industry: profile?.industry || '',
        company: profile?.company || '',
        country: profile?.country || ''
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
          company: editForm.company,
          country: editForm.country,
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

  // Helper to check if trial is active (not expired)
  const isTrialActive = () => {
    if (!subscription || subscription.tier !== 'free_trial') return false;
    const trialEnd = new Date(subscription.trial_end_date);
    return trialEnd > new Date();
  };

  // Helper to check if user has an active paid subscription
  const hasPaidSubscription = () => {
    if (!subscription) return false;
    return subscription.tier !== 'free_trial' && subscription.is_active;
  };

  // Helper to check if subscription is cancelled but still active until end date
  const isCancelledButActive = () => {
    if (!subscription) return false;
    return subscription.status === 'cancelled' && subscription.is_active;
  };

  const getSubscriptionStatus = () => {
    // Admin never sees subscription status issues
    if (isAdmin) {
      return { text: lang === 'ja' ? '管理者' : 'Admin', variant: 'default' as const };
    }

    if (subStatus.loading) {
      return { text: t('common.loading'), variant: 'secondary' as const };
    }

    // Check for paid active subscriptions first
    if (subStatus.plan === 'premium' && subStatus.isActive) {
      return { text: t('subscribe.plans.premium.title'), variant: 'default' as const };
    }
    if (subStatus.plan === 'basic' && subStatus.isActive) {
      return { text: t('subscribe.plans.basic.title'), variant: 'default' as const };
    }

    // Check for free trial
    if (subscription?.tier === 'free_trial') {
      if (isTrialActive()) {
        return { text: t('mypage.freeTrial'), variant: 'default' as const };
      } else {
        return { text: t('mypage.trialExpired'), variant: 'destructive' as const };
      }
    }

    // Check cancelled subscription
    if (isCancelledButActive()) {
      return { text: lang === 'ja' ? 'キャンセル済み' : 'Cancelled', variant: 'secondary' as const };
    }

    // No subscription
    if (!subscription) {
      return { text: t('mypage.noSubscription'), variant: 'secondary' as const };
    }
    
    if (subscription.is_active) {
      return { text: t('mypage.activeSubscription'), variant: 'default' as const };
    }
    
    return { text: t('mypage.inactiveSubscription'), variant: 'secondary' as const };
  };

  // Determine if cancel button should show and what text
  const getCancelButtonConfig = () => {
    // Admin never sees cancel button
    if (isAdmin) {
      return { show: false, text: '', isTrialCancel: false };
    }

    // Trial user - show "Cancel Free Trial"
    if (subscription?.tier === 'free_trial' && isTrialActive()) {
      return { 
        show: true, 
        text: lang === 'ja' ? '無料トライアルをキャンセル' : 'Cancel Free Trial',
        isTrialCancel: true 
      };
    }

    // Paid subscription - show "Cancel Subscription"
    if (hasPaidSubscription() && !isCancelledButActive()) {
      return { 
        show: true, 
        text: t('mypage.cancelSubscription'),
        isTrialCancel: false 
      };
    }

    // No active subscription or already cancelled - hide button
    return { show: false, text: '', isTrialCancel: false };
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
  const cancelButtonConfig = getCancelButtonConfig();

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
                    <div className="space-y-2">
                      <Label htmlFor="company">{lang === 'ja' ? '会社名' : 'Company Name'}</Label>
                      <Input
                        id="company"
                        value={editForm.company}
                        onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                        placeholder={lang === 'ja' ? '会社名を入力（任意）' : 'Enter company name (optional)'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">{lang === 'ja' ? '国' : 'Country'}</Label>
                      <Select 
                        value={editForm.country} 
                        onValueChange={(value) => setEditForm({ ...editForm, country: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={lang === 'ja' ? '国を選択' : 'Select country'} />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((c) => (
                            <SelectItem key={c} value={c}>
                              {lang === 'ja' ? getCountryNameJa(c) : getCountryNameEn(c)}
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
                    <div>
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {lang === 'ja' ? '会社名' : 'Company'}
                      </label>
                      <p className="text-base">{profile?.company || t('mypage.notProvided')}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        {lang === 'ja' ? '国' : 'Country'}
                      </label>
                      <p className="text-base">
                        {profile?.country 
                          ? (lang === 'ja' ? getCountryNameJa(profile.country) : getCountryNameEn(profile.country))
                          : t('mypage.notProvided')
                        }
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
                      {isAdmin 
                        ? (lang === 'ja' ? '管理者' : 'Admin')
                        : subscription?.tier === 'free_trial' 
                          ? t('mypage.freeTrial') 
                          : profile?.subscription_plan 
                            ? t(`subscribe.plans.${profile.subscription_plan}.title`) 
                            : t('mypage.basicPlan')
                      }
                    </p>
                  </div>
                  <Badge variant={displaySubscriptionStatus.variant}>
                    {displaySubscriptionStatus.text}
                  </Badge>
                </div>

                {/* Only show subscription dates for non-admin users */}
                {!isAdmin && subscription && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Free Trial End Date - Only show if trial is active */}
                    {subscription.tier === 'free_trial' && isTrialActive() && subscription.trial_end_date && (
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          {t('mypage.freeTrialUntil')}
                        </label>
                        <p className="text-base font-semibold text-primary">{formatDate(subscription.trial_end_date)}</p>
                      </div>
                    )}

                    {/* Trial Expired Notice */}
                    {subscription.tier === 'free_trial' && !isTrialActive() && (
                      <div className="p-3 bg-destructive/10 rounded-lg col-span-full">
                        <p className="text-sm font-medium text-destructive">
                          {lang === 'ja' 
                            ? '無料トライアル期間が終了しました。プレミアムコンテンツにアクセスするにはプランをアップグレードしてください。' 
                            : 'Your free trial has expired. Upgrade your plan to access premium content.'
                          }
                        </p>
                      </div>
                    )}
                    
                    {/* Next Billing Date for paid subscriptions */}
                    {subscription.tier !== 'free_trial' && subscription.is_active && !isCancelledButActive() && (subscription.subscription_end_date || subscription.current_period_end) && (
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

                    {/* Subscription ends on date for cancelled subscriptions */}
                    {isCancelledButActive() && (subscription.subscription_end_date || subscription.current_period_end) && (
                      <div className="p-3 bg-muted rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          {lang === 'ja' ? 'サブスクリプション終了日' : 'Subscription Ends On'}
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
                  {/* Hide upgrade button for admin */}
                  {!isAdmin && (
                    <Button asChild variant="default">
                      <Link to="/subscribe">
                        {t('mypage.upgradePlan')}
                      </Link>
                    </Button>
                  )}
                  <Button asChild variant="outline">
                    <Link to="/billing-history">
                      <Receipt className="h-4 w-4 mr-1" />
                      {lang === 'ja' ? '請求履歴' : 'Billing History'}
                    </Link>
                  </Button>
                  {/* Cancel button with conditional text */}
                  {cancelButtonConfig.show && (
                    <Button 
                      variant="outline" 
                      onClick={() => setIsCancellationModalOpen(true)}
                      className="text-destructive hover:text-destructive border-destructive/50 hover:bg-destructive/10"
                    >
                      {cancelButtonConfig.text}
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

            {/* Saved Articles / Bookmarks */}
            <SavedArticles />

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
                        to={`/news/sheet/${item.article_slug}`}
                        className="flex gap-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium line-clamp-2 text-sm md:text-base">
                            {item.article_title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs md:text-sm text-muted-foreground">
                            {item.category && (
                              <>
                                <Badge variant="outline" className="text-xs">
                                  {item.category}
                                </Badge>
                                <span>•</span>
                              </>
                            )}
                            <span>{formatDateTime(item.read_at)}</span>
                          </div>
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
        isTrialCancellation={cancelButtonConfig.isTrialCancel}
      />

      <PasswordChangeModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
};

// Helper functions for country names
const getCountryNameEn = (code: string): string => {
  const names: Record<string, string> = {
    japan: 'Japan',
    thailand: 'Thailand',
    singapore: 'Singapore',
    malaysia: 'Malaysia',
    indonesia: 'Indonesia',
    vietnam: 'Vietnam',
    philippines: 'Philippines',
    myanmar: 'Myanmar',
    cambodia: 'Cambodia',
    laos: 'Laos',
    other: 'Other'
  };
  return names[code] || code;
};

const getCountryNameJa = (code: string): string => {
  const names: Record<string, string> = {
    japan: '日本',
    thailand: 'タイ',
    singapore: 'シンガポール',
    malaysia: 'マレーシア',
    indonesia: 'インドネシア',
    vietnam: 'ベトナム',
    philippines: 'フィリピン',
    myanmar: 'ミャンマー',
    cambodia: 'カンボジア',
    laos: 'ラオス',
    other: 'その他'
  };
  return names[code] || code;
};

export default MyPage;
