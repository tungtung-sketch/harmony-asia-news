import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePaywall } from '@/hooks/usePaywall';
import { supabase } from '@/integrations/supabase/client';

type ActionType = 'view' | 'download' | 'access_data';

interface LogActionParams {
  actionType: ActionType;
  reportSlug: string;
  reportTitle: string;
  industryCategory?: string;
  reportVersion?: string;
  language?: string;
}

interface UserProfile {
  company?: string | null;
}

// Simple hash function for IP anonymization
const hashString = async (str: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.slice(0, 8).map(b => b.toString(16).padStart(2, '0')).join('');
};

// Detect device type from user agent
const getDeviceType = (): string => {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return 'mobile';
  return 'desktop';
};

export const usePremiumActionLogger = () => {
  const { user } = useAuth();
  const { userContext } = usePaywall();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Fetch user profile for company name
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('profiles')
        .select('company')
        .eq('user_id', user.id)
        .maybeSingle();
      setProfile(data);
    };
    fetchProfile();
  }, [user]);

  const logAction = useCallback(async (params: LogActionParams): Promise<void> => {
    // Only log for authenticated users with premium access
    if (!user) return;
    
    // Only log for BASIC, PREMIUM, or ADMIN roles
    const premiumRoles = ['BASIC', 'PREMIUM', 'ADMIN'];
    if (!premiumRoles.includes(userContext.role)) return;

    try {
      // Get anonymized IP hash (use a placeholder since we can't get real IP client-side)
      const ipHash = await hashString(`${navigator.userAgent}-${new Date().toDateString()}`);
      
      const logEntry = {
        action_type: params.actionType,
        user_id: user.id,
        user_email: user.email || '',
        company_name: profile?.company || null,
        report_slug: params.reportSlug,
        report_title: params.reportTitle,
        industry_category: params.industryCategory || null,
        report_version: params.reportVersion || '1.0',
        language: params.language || 'en',
        device_type: getDeviceType(),
        ip_hash: ipHash,
      };

      // Async insert - don't await to avoid blocking user action
      supabase
        .from('premium_action_logs')
        .insert(logEntry)
        .then(({ error }) => {
          if (error) {
            console.error('Failed to log premium action:', error.message);
          }
        });
    } catch (error) {
      // Silently fail - logging should never block user experience
      console.error('Premium action logging error:', error);
    }
  }, [user, profile, userContext.role]);

  const logView = useCallback((reportSlug: string, reportTitle: string, industryCategory?: string, language?: string) => {
    logAction({ actionType: 'view', reportSlug, reportTitle, industryCategory, language });
  }, [logAction]);

  const logDownload = useCallback((reportSlug: string, reportTitle: string, industryCategory?: string, language?: string) => {
    logAction({ actionType: 'download', reportSlug, reportTitle, industryCategory, language });
  }, [logAction]);

  const logDataAccess = useCallback((reportSlug: string, reportTitle: string, industryCategory?: string, language?: string) => {
    logAction({ actionType: 'access_data', reportSlug, reportTitle, industryCategory, language });
  }, [logAction]);

  return {
    logView,
    logDownload,
    logDataAccess,
    logAction,
  };
};
