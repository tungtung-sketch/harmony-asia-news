import { supabase } from '@/integrations/supabase/client';

// Generate or retrieve anon_id
function getAnonId(): string {
  let id = localStorage.getItem('walen_anon_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('walen_anon_id', id);
  }
  return id;
}

// Generate session_id (new per tab/session)
function getSessionId(): string {
  let id = sessionStorage.getItem('walen_session_id');
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem('walen_session_id', id);
  }
  return id;
}

function getDevice(): string {
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
  };
}

type EventName =
  | 'page_view'
  | 'article_view'
  | 'report_view'
  | 'paywall_hit'
  | 'signup_start'
  | 'signup_complete'
  | 'checkout_start'
  | 'subscribe_success'
  | 'subscribe_cancel';

interface TrackPayload {
  event_name: EventName;
  path?: string;
  category?: string;
  content_id?: string;
  plan?: string;
  step?: string;
  meta?: Record<string, unknown>;
}

// Debounce to prevent duplicate page_view on rapid navigation
let lastPageView = '';
let lastPageViewTime = 0;

export async function track(payload: TrackPayload) {
  try {
    const now = Date.now();
    const currentPath = payload.path || window.location.pathname;

    // Debounce duplicate page_view
    if (payload.event_name === 'page_view') {
      if (currentPath === lastPageView && now - lastPageViewTime < 1000) {
        return;
      }
      lastPageView = currentPath;
      lastPageViewTime = now;
    }

    const session = await supabase.auth.getSession();
    const accessToken = session.data.session?.access_token;

    const utm = getUtmParams();

    const body = {
      event_name: payload.event_name,
      anon_id: getAnonId(),
      session_id: getSessionId(),
      path: currentPath,
      category: payload.category,
      content_id: payload.content_id,
      plan: payload.plan,
      step: payload.step,
      referrer: document.referrer || undefined,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      language: document.documentElement.lang || navigator.language?.substring(0, 2) || 'en',
      device: getDevice(),
      meta: payload.meta || {},
    };

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // Fire and forget - don't await in UI thread
    supabase.functions.invoke('track', {
      body,
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
    }).catch(() => {
      // Silently fail - tracking should never block UX
    });
  } catch {
    // Silently fail
  }
}

// Convenience helpers
export const trackPageView = (path?: string) =>
  track({ event_name: 'page_view', path });

export const trackArticleView = (contentId: string, category?: string) =>
  track({ event_name: 'article_view', content_id: contentId, category });

export const trackReportView = (contentId: string, category?: string) =>
  track({ event_name: 'report_view', content_id: contentId, category });

export const trackPaywallHit = (contentId?: string, plan?: string) =>
  track({ event_name: 'paywall_hit', content_id: contentId, plan });

export const trackSignupStart = () =>
  track({ event_name: 'signup_start' });

export const trackSignupComplete = () =>
  track({ event_name: 'signup_complete' });

export const trackCheckoutStart = (plan: string) =>
  track({ event_name: 'checkout_start', plan });

export const trackSubscribeSuccess = (plan: string) =>
  track({ event_name: 'subscribe_success', plan });

export const trackSubscribeCancel = () =>
  track({ event_name: 'subscribe_cancel' });
