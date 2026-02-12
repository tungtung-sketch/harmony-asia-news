import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/i18n/I18nProvider';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Receipt, ArrowLeft, CreditCard, Calendar, DollarSign } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface BillingRecord {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  description: string;
  invoice_url?: string;
}

const BillingHistory = () => {
  const { user, loading, session } = useAuth();
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const [billingHistory, setBillingHistory] = useState<BillingRecord[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [hasStripeCustomer, setHasStripeCustomer] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
      return;
    }

    if (user && session) {
      fetchBillingHistory();
    }
  }, [user, loading, navigate, session]);

  const fetchBillingHistory = async () => {
    try {
      setHistoryLoading(true);
      
      // First, call check-subscription to sync Stripe data to local DB
      try {
        await supabase.functions.invoke('check-subscription', {
          headers: {
            Authorization: `Bearer ${session?.access_token}`
          }
        });
      } catch (syncErr) {
        console.error('Error syncing subscription:', syncErr);
      }

      // Now fetch the (potentially updated) subscription from local DB
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('stripe_customer_id, tier, created_at, trial_end_date, stripe_subscription_id, subscription_end_date, current_period_end, status')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (subscription?.stripe_customer_id) {
        setHasStripeCustomer(true);
        const records: BillingRecord[] = [];
        
        if (subscription.tier && subscription.tier !== 'free_trial') {
          records.push({
            id: '1',
            amount: subscription.tier === 'business' || subscription.tier === 'enterprise' ? 1299 : 599,
            currency: 'THB',
            status: 'paid',
            created_at: subscription.created_at,
            description: `${subscription.tier === 'business' || subscription.tier === 'enterprise' ? 'Premium' : 'Basic'} Plan Subscription`
          });
        }
        
        setBillingHistory(records);
      } else {
        setHasStripeCustomer(false);
        setBillingHistory([]);
      }
    } catch (error) {
      console.error('Error fetching billing history:', error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat(lang === 'ja' ? 'ja-JP' : 'en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  if (loading) {
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

  return (
    <>
      <SEO
        title={lang === 'ja' ? '請求履歴 - WaLens' : 'Billing History - WaLens'}
        description={lang === 'ja' ? 'お支払い履歴をご確認ください' : 'View your payment history'}
        canonicalPath="/billing-history"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/mypage')}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                {lang === 'ja' ? 'マイページに戻る' : 'Back to My Page'}
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  {lang === 'ja' ? '請求履歴' : 'Billing History'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {historyLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-48" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                        <Skeleton className="h-6 w-20" />
                      </div>
                    ))}
                  </div>
                ) : billingHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <CreditCard className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                    <h3 className="text-lg font-medium mb-2">
                      {lang === 'ja' ? '請求履歴がありません' : 'No billing history'}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {hasStripeCustomer 
                        ? (lang === 'ja' ? 'まだ請求がありません' : 'You have no charges yet')
                        : (lang === 'ja' ? '有料プランにアップグレードすると請求履歴が表示されます' : 'Upgrade to a paid plan to see billing history')
                      }
                    </p>
                    {!hasStripeCustomer && (
                      <Button onClick={() => navigate('/subscribe')}>
                        {lang === 'ja' ? 'プランを見る' : 'View Plans'}
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {billingHistory.map((record) => (
                      <div 
                        key={record.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <DollarSign className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{record.description}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {formatDate(record.created_at)}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatAmount(record.amount, record.currency)}</p>
                          <Badge 
                            variant={record.status === 'paid' ? 'default' : 'secondary'}
                            className="mt-1"
                          >
                            {record.status === 'paid' 
                              ? (lang === 'ja' ? '支払済' : 'Paid')
                              : record.status
                            }
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Manage subscription link */}
                {hasStripeCustomer && (
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-muted-foreground mb-3">
                      {lang === 'ja' 
                        ? '請求情報やお支払い方法を管理するには、Stripeカスタマーポータルをご利用ください。'
                        : 'To manage your billing information and payment methods, use the Stripe customer portal.'
                      }
                    </p>
                    <Button 
                      variant="outline"
                      onClick={async () => {
                        try {
                          const { data, error } = await supabase.functions.invoke('customer-portal', {
                            headers: {
                              Authorization: `Bearer ${session?.access_token}`
                            }
                          });
                          if (error) throw error;
                          if (data?.url) {
                            window.open(data.url, '_blank');
                          }
                        } catch (err) {
                          console.error('Error opening customer portal:', err);
                        }
                      }}
                    >
                      {lang === 'ja' ? '請求管理ポータルを開く' : 'Open Billing Portal'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default BillingHistory;
