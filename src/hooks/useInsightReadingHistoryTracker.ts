import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/i18n/I18nProvider';

/**
 * Records an insight report view into the general reading_history table.
 * Uses 12-hour deduplication to avoid duplicates.
 */
export const useInsightReadingHistoryTracker = (
  reportSlug: string,
  titleEn: string,
  titleJa: string,
  category: string,
  hasFullAccess: boolean
) => {
  const { user } = useAuth();
  const { lang } = useI18n();
  const recorded = useRef(false);

  useEffect(() => {
    if (!user || !hasFullAccess || recorded.current) return;
    recorded.current = true;

    const title = lang === 'ja' ? titleJa : titleEn;
    const language = lang === 'ja' ? 'JP' : 'EN';
    const articleUrl = `/insights/reports/${reportSlug}`;

    const record = async () => {
      try {
        const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString();

        const { data: existing } = await supabase
          .from('reading_history')
          .select('id')
          .eq('user_id', user.id)
          .eq('article_slug', reportSlug)
          .gte('read_at', twelveHoursAgo)
          .maybeSingle();

        if (existing) {
          await supabase
            .from('reading_history')
            .update({ read_at: new Date().toISOString(), article_title: title, language })
            .eq('id', existing.id);
        } else {
          await supabase
            .from('reading_history')
            .insert({
              user_id: user.id,
              article_slug: reportSlug,
              article_title: title,
              article_url: articleUrl,
              language,
              category,
            });
        }
      } catch (err) {
        console.error('Failed to record insight reading history:', err);
      }
    };

    record();
  }, [user, hasFullAccess, reportSlug, titleEn, titleJa, category, lang]);
};
