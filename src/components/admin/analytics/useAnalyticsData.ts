import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FilterState } from './AnalyticsFilters';

export interface EventRow {
  id: string;
  ts: string;
  event_name: string;
  user_id: string | null;
  anon_id: string | null;
  session_id: string;
  path: string;
  category: string | null;
  content_id: string | null;
  plan: string | null;
  step: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  language: string | null;
  country: string | null;
  device: string | null;
  meta: Record<string, unknown>;
}

export function useAnalyticsData(filters: FilterState) {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const since = new Date();
      since.setDate(since.getDate() - filters.dateRange);

      let query = supabase
        .from('events')
        .select('*')
        .gte('ts', since.toISOString())
        .order('ts', { ascending: false })
        .limit(1000);

      if (filters.language !== 'all') {
        query = query.eq('language', filters.language);
      }
      if (filters.plan !== 'all') {
        query = query.eq('plan', filters.plan);
      }
      if (filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }
      if (filters.source !== 'all') {
        query = query.eq('utm_source', filters.source);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching analytics:', error);
        setEvents([]);
      } else {
        setEvents((data as unknown as EventRow[]) || []);
      }
    } catch (err) {
      console.error('Analytics fetch error:', err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, refetch: fetchEvents };
}
