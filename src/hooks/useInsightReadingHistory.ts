import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface InsightReadingEntry {
  id: string;
  report_slug: string;
  report_title: string;
  industry_category: string;
  read_at: string;
  report_url: string;
}

interface InsightReadingHistoryResult {
  entries: InsightReadingEntry[];
  loading: boolean;
  error: string | null;
  checkForUpdates: (reportSlug: string) => Promise<boolean>;
  refetch: () => Promise<void>;
}

export const useInsightReadingHistory = (): InsightReadingHistoryResult => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<InsightReadingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    if (!user) {
      setEntries([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch from premium_action_logs (views only)
      const { data, error: fetchError } = await supabase
        .from('premium_action_logs')
        .select('id, report_slug, report_title, industry_category, logged_at')
        .eq('user_id', user.id)
        .eq('action_type', 'view')
        .order('logged_at', { ascending: false })
        .limit(50);

      if (fetchError) throw fetchError;

      // Deduplicate by report_slug, keeping most recent
      const uniqueReports = new Map<string, InsightReadingEntry>();
      (data || []).forEach(item => {
        if (!uniqueReports.has(item.report_slug)) {
          uniqueReports.set(item.report_slug, {
            id: item.id,
            report_slug: item.report_slug,
            report_title: item.report_title,
            industry_category: item.industry_category || 'General',
            read_at: item.logged_at,
            report_url: getReportUrl(item.report_slug)
          });
        }
      });

      setEntries(Array.from(uniqueReports.values()));
    } catch (err) {
      console.error('Error fetching insight reading history:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch history');
    } finally {
      setLoading(false);
    }
  };

  const checkForUpdates = async (reportSlug: string): Promise<boolean> => {
    if (!user) return false;

    try {
      // Get the last read time for this report
      const { data: lastRead } = await supabase
        .from('premium_action_logs')
        .select('logged_at')
        .eq('user_id', user.id)
        .eq('report_slug', reportSlug)
        .eq('action_type', 'view')
        .order('logged_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!lastRead) return false;

      // Check if there are updates after last read
      const { data: updates } = await supabase
        .from('insight_updates')
        .select('id')
        .eq('report_slug', reportSlug)
        .eq('is_published', true)
        .gt('update_date', lastRead.logged_at.split('T')[0])
        .limit(1);

      return (updates?.length || 0) > 0;
    } catch (err) {
      console.error('Error checking for updates:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [user]);

  return {
    entries,
    loading,
    error,
    checkForUpdates,
    refetch: fetchHistory
  };
};

// Helper to map report slugs to URLs
function getReportUrl(slug: string): string {
  const urlMap: Record<string, string> = {
    'ev-battery-industry': '/insights/manufacturing/ev-battery'
  };
  return urlMap[slug] || `/insights/reports/${slug}`;
}
