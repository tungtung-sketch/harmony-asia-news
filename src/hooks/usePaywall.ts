import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  AccessLevel, 
  RoleName, 
  ArticleAccess, 
  AccessReason,
  UserAccessContext,
  Role,
  RoleArticleRule,
  ADMIN_EMAIL
} from '@/types/paywall';

// Cache for role rules to avoid repeated fetches
let cachedRules: RoleArticleRule[] | null = null;
let cachedRoles: Role[] | null = null;

export const usePaywall = () => {
  const { user, session } = useAuth();
  const [userContext, setUserContext] = useState<UserAccessContext>({
    isLoggedIn: false,
    email: null,
    role: 'GUEST',
    subscriptionTier: null,
    isAdmin: false
  });
  const [loading, setLoading] = useState(true);
  const [rules, setRules] = useState<RoleArticleRule[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  // Fetch roles and rules
  const fetchAccessData = useCallback(async () => {
    try {
      // Fetch roles if not cached
      if (!cachedRoles) {
        const { data: rolesData } = await supabase
          .from('roles')
          .select('*');
        cachedRoles = (rolesData as Role[]) || [];
      }
      setRoles(cachedRoles);

      // Fetch rules if not cached
      if (!cachedRules) {
        const { data: rulesData } = await supabase
          .from('role_article_rules')
          .select('*');
        cachedRules = (rulesData as RoleArticleRule[]) || [];
      }
      setRules(cachedRules);
    } catch (error) {
      console.error('Error fetching access data:', error);
    }
  }, []);

  // Determine user role based on subscription
  const determineRole = useCallback(async (): Promise<RoleName> => {
    if (!user?.email) return 'GUEST';
    
    // Admin override for special email
    if (user.email === ADMIN_EMAIL) {
      return 'ADMIN';
    }

    try {
      // Check subscription status
      const { data } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session?.access_token}`
        }
      });

      if (data?.subscribed) {
        // Map product_id to role
        const productId = data.product_id || '';
        if (productId.includes('premium') || productId.includes('business') || productId.includes('enterprise')) {
          return 'PREMIUM';
        }
        return 'BASIC';
      }

      // Check local subscription table (for manually granted or non-Stripe subscriptions)
      const { data: localSub } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (localSub) {
        const now = new Date();
        const isActive = localSub.is_active && localSub.status === 'active';
        const hasValidEndDate = !localSub.subscription_end_date || new Date(localSub.subscription_end_date) > now;
        
        // Check for active paid subscription (starter = basic, business/enterprise = premium)
        if (isActive && hasValidEndDate) {
          if (localSub.tier === 'starter') {
            return 'BASIC';
          } else if (localSub.tier === 'business' || localSub.tier === 'enterprise') {
            return 'PREMIUM';
          }
        }
        
        // Check for free trial
        if (localSub.tier === 'free_trial' && localSub.trial_end_date) {
          const trialEnd = new Date(localSub.trial_end_date);
          if (trialEnd > now) {
            return 'PREMIUM'; // Free trial gets premium access
          }
        }
      }

      // Check profile role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profile?.role === 'admin') {
        return 'ADMIN';
      }

      return 'GUEST';
    } catch (error) {
      console.error('Error determining role:', error);
      return 'GUEST';
    }
  }, [user, session]);

  // Initialize user context
  useEffect(() => {
    const initContext = async () => {
      setLoading(true);
      await fetchAccessData();

      if (!user) {
        setUserContext({
          isLoggedIn: false,
          email: null,
          role: 'GUEST',
          subscriptionTier: null,
          isAdmin: false
        });
        setLoading(false);
        return;
      }

      const role = await determineRole();
      const isAdmin = role === 'ADMIN' || user.email === ADMIN_EMAIL;

      setUserContext({
        isLoggedIn: true,
        email: user.email || null,
        role,
        subscriptionTier: role.toLowerCase(),
        isAdmin
      });
      setLoading(false);
    };

    initContext();
  }, [user, session, fetchAccessData, determineRole]);

  // Check if user can view article
  const canViewArticle = useCallback((accessLevel: AccessLevel): ArticleAccess => {
    const { role, isAdmin, email } = userContext;

    // Admin override
    if (isAdmin || email === ADMIN_EMAIL) {
      return {
        canViewPreview: true,
        canViewFull: true,
        canComment: true,
        canDownloadPdf: true,
        reason: 'ADMIN_OVERRIDE',
        userRole: 'ADMIN'
      };
    }

    // Find the role ID
    const roleRecord = roles.find(r => r.name === role);
    if (!roleRecord) {
      return {
        canViewPreview: true,
        canViewFull: accessLevel === 'free',
        canComment: false,
        canDownloadPdf: false,
        reason: accessLevel === 'free' ? 'FREE_CONTENT' : 'GUEST_PREVIEW_ONLY',
        userRole: role
      };
    }

    // Find the matching rule
    const rule = rules.find(r => r.role_id === roleRecord.id && r.access_level === accessLevel);
    
    if (!rule) {
      return {
        canViewPreview: true,
        canViewFull: false,
        canComment: false,
        canDownloadPdf: false,
        reason: 'GUEST_PREVIEW_ONLY',
        userRole: role
      };
    }

    // Determine reason
    let reason: AccessReason = 'FULL_ACCESS';
    if (!rule.can_view_full) {
      if (accessLevel === 'admin_only') {
        reason = 'ADMIN_ONLY_CONTENT';
      } else if (accessLevel === 'premium') {
        reason = 'UPGRADE_TO_PREMIUM';
      } else if (accessLevel === 'basic') {
        reason = 'UPGRADE_TO_BASIC';
      } else {
        reason = 'GUEST_PREVIEW_ONLY';
      }
    } else if (accessLevel === 'free') {
      reason = 'FREE_CONTENT';
    }

    return {
      canViewPreview: true,
      canViewFull: rule.can_view_full,
      canComment: rule.can_comment,
      canDownloadPdf: rule.can_download_pdf,
      reason,
      userRole: role
    };
  }, [userContext, roles, rules]);

  // Record article view for analytics
  const recordArticleView = useCallback(async (articleId: string) => {
    try {
      await supabase.from('article_views').insert({
        article_id: articleId,
        user_id: user?.id || null,
        role_name: userContext.role
      });
    } catch (error) {
      console.error('Error recording article view:', error);
    }
  }, [user, userContext.role]);

  return {
    userContext,
    loading,
    canViewArticle,
    recordArticleView,
    roles,
    rules,
    refreshRules: () => {
      cachedRules = null;
      cachedRoles = null;
      fetchAccessData();
    }
  };
};

// Helper function to get preview content from full content
export const getPreviewContent = (fullContent: string, paragraphs: number = 1): string => {
  if (!fullContent) return '';
  
  // Split by double newlines or <p> tags
  const paragraphMatches = fullContent.split(/\n\n|\<\/p\>/);
  const previewParagraphs = paragraphMatches.slice(0, paragraphs);
  
  return previewParagraphs.join('\n\n').trim();
};
