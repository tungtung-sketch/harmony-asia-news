import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { reportMetadata } from '@/hooks/useInsightReports';

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

      // Fetch from reading_history where URL starts with /insights/
      const { data, error: fetchError } = await supabase
        .from('reading_history')
        .select('id, article_slug, article_title, category, read_at, article_url')
        .eq('user_id', user.id)
        .like('article_url', '/insights/%')
        .order('read_at', { ascending: false })
        .limit(50);

      if (fetchError) throw fetchError;

      // Deduplicate by article_slug, keeping most recent
      const uniqueReports = new Map<string, InsightReadingEntry>();
      (data || []).forEach(item => {
        if (!uniqueReports.has(item.article_slug)) {
          uniqueReports.set(item.article_slug, {
            id: item.id,
            report_slug: item.article_slug,
            report_title: item.article_title,
            industry_category: item.category || 'General',
            read_at: item.read_at,
            report_url: item.article_url || getReportUrl(item.article_slug)
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
        .from('reading_history')
        .select('read_at')
        .eq('user_id', user.id)
        .eq('article_slug', reportSlug)
        .order('read_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!lastRead) return false;

      // Check if there are updates after last read
      const { data: updates } = await supabase
        .from('insight_updates')
        .select('id')
        .eq('report_slug', reportSlug)
        .eq('is_published', true)
        .gt('update_date', lastRead.read_at.split('T')[0])
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

// Helper to map report slugs to canonical URLs (uses shared metadata)
function getReportUrl(slug: string): string {
  return reportMetadata[slug]?.link || `/insights/reports/${slug}`;
}
