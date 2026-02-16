import { supabase } from '@/integrations/supabase/client';

function getCookieId(): string {
  let id = localStorage.getItem('walen_cookie_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('walen_cookie_id', id);
  }
  return id;
}

function parseUserAgent(ua: string) {
  let device_type = 'desktop';
  if (/mobile|android|iphone|ipod/i.test(ua)) device_type = 'mobile';
  else if (/tablet|ipad/i.test(ua)) device_type = 'tablet';

  let browser = 'Unknown';
  if (/edg\//i.test(ua)) browser = 'Edge';
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
  else if (/opera|opr/i.test(ua)) browser = 'Opera';

  let os = 'Unknown';
  if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os/i.test(ua)) os = 'macOS';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  return { device_type, browser, os };
}

function getIsTest(): boolean {
  if (localStorage.getItem('walensTester') === 'true') return true;
  const params = new URLSearchParams(window.location.search);
  if (params.get('debug') === '1') return true;
  return false;
}

export function logVisitor() {
  try {
    const ua = navigator.userAgent;
    const { device_type, browser, os } = parseUserAgent(ua);

    const payload = {
      page_path: window.location.pathname,
      referrer: document.referrer || null,
      user_agent: ua,
      device_type,
      browser,
      os,
      language: navigator.language?.substring(0, 2) || null,
      viewport_w: window.innerWidth,
      viewport_h: window.innerHeight,
      cookie_id: getCookieId(),
      is_test: getIsTest(),
    };

    // Fire and forget
    supabase.functions.invoke('log-visitor', { body: payload }).catch(() => {
      // Silently fail - visitor logging should never block UX
    });
  } catch {
    // Silently fail
  }
}
