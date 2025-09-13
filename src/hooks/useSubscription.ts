import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface SubscriptionStatus {
  isSubscribed: boolean;
  plan: 'free' | 'basic' | 'premium' | 'free_trial';
  isActive: boolean;
  trialEndDate?: string;
  subscriptionEndDate?: string;
  loading: boolean;
}

export const useSubscription = () => {
  const { user, session } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>({
    isSubscribed: false,
    plan: 'free',
    isActive: false,
    loading: true
  });

  const checkSubscription = async () => {
    if (!user || !session) {
      setSubscriptionStatus({
        isSubscribed: false,
        plan: 'free',
        isActive: false,
        loading: false
      });
      return;
    }

    try {
      setSubscriptionStatus(prev => ({ ...prev, loading: true }));

      // Check Stripe subscription via edge function
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) {
        console.error('Error checking subscription:', error);
        setSubscriptionStatus({
          isSubscribed: false,
          plan: 'free',
          isActive: false,
          loading: false
        });
        return;
      }

      // Also check local subscription table for free trial
      const { data: localSub } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      const now = new Date();
      let plan: 'free' | 'basic' | 'premium' | 'free_trial' = 'free';
      let isActive = false;
      let isSubscribed = false;

      // Check Stripe subscription first
      if (data?.subscribed && data?.product_id) {
        isSubscribed = true;
        isActive = true;
        // Map product ID to plan type - you'll need to update these with actual Stripe product IDs
        if (data.product_id.includes('premium')) {
          plan = 'premium';
        } else {
          plan = 'basic';
        }
      }
      // Check local free trial
      else if (localSub?.tier === 'free_trial' && localSub?.trial_end_date) {
        const trialEnd = new Date(localSub.trial_end_date);
        if (trialEnd > now) {
          plan = 'free_trial';
          isActive = true;
          isSubscribed = true;
        }
      }

      setSubscriptionStatus({
        isSubscribed,
        plan,
        isActive,
        trialEndDate: localSub?.trial_end_date,
        subscriptionEndDate: data?.subscription_end,
        loading: false
      });

    } catch (error) {
      console.error('Error in subscription check:', error);
      setSubscriptionStatus({
        isSubscribed: false,
        plan: 'free',
        isActive: false,
        loading: false
      });
    }
  };

  useEffect(() => {
    checkSubscription();
  }, [user, session]);

  return {
    subscriptionStatus,
    refreshSubscription: checkSubscription
  };
};