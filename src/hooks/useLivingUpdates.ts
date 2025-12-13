import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { differenceInDays } from 'date-fns';

interface LivingUpdate {
  id: string;
  update_date: string;
  headline_en: string;
  headline_ja: string;
  description_en: string;
  description_ja: string;
  tag: string | null;
  related_section: string | null;
}

interface UseLivingUpdatesResult {
  updates: LivingUpdate[];
  loading: boolean;
  error: string | null;
  lastUpdateDate: string | null;
  updateCount30Days: number;
  refetch: () => Promise<void>;
}

export const useLivingUpdates = (reportSlug: string): UseLivingUpdatesResult => {
  const [updates, setUpdates] = useState<LivingUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUpdates = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('insight_updates')
        .select('*')
        .eq('report_slug', reportSlug)
        .eq('is_published', true)
        .order('update_date', { ascending: false });

      if (fetchError) throw fetchError;

      setUpdates(data || []);
    } catch (err) {
      console.error('Error fetching living updates:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch updates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (reportSlug) {
      fetchUpdates();
    }
  }, [reportSlug]);

  const lastUpdateDate = updates.length > 0 ? updates[0].update_date : null;

  const updateCount30Days = updates.filter((update) => {
    const daysDiff = differenceInDays(new Date(), new Date(update.update_date));
    return daysDiff <= 30;
  }).length;

  return {
    updates,
    loading,
    error,
    lastUpdateDate,
    updateCount30Days,
    refetch: fetchUpdates,
  };
};
