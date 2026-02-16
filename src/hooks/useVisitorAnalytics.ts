import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { subDays, format, startOfDay, endOfDay } from 'date-fns';

export interface VisitorLog {
  id: string;
  created_at: string;
  page_path: string;
  referrer: string | null;
  user_agent: string;
  device_type: string;
  browser: string;
  os: string;
  language: string | null;
  viewport_w: number | null;
  viewport_h: number | null;
  ip_hash: string;
  cookie_id: string;
  is_test: boolean;
}

export interface Exclusion {
  id: string;
  created_at: string;
  exclusion_type: string;
  exclusion_value: string;
  note: string | null;
}

export interface VisitorFilters {
  dateFrom: Date;
  dateTo: Date;
  deviceType: string;
  pathContains: string;
  excludeTest: boolean;
}

export function useVisitorAnalytics() {
  const [logs, setLogs] = useState<VisitorLog[]>([]);
  const [exclusions, setExclusions] = useState<Exclusion[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<VisitorFilters>({
    dateFrom: subDays(new Date(), 30),
    dateTo: new Date(),
    deviceType: 'all',
    pathContains: '',
    excludeTest: true,
  });

  const fetchLogs = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('visitor_logs')
        .select('*')
        .gte('created_at', startOfDay(filters.dateFrom).toISOString())
        .lte('created_at', endOfDay(filters.dateTo).toISOString())
        .order('created_at', { ascending: false })
        .limit(1000);

      if (filters.excludeTest) {
        query = query.eq('is_test', false);
      }
      if (filters.deviceType !== 'all') {
        query = query.eq('device_type', filters.deviceType);
      }
      if (filters.pathContains) {
        query = query.ilike('page_path', `%${filters.pathContains}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      setLogs((data as VisitorLog[]) || []);
    } catch (e) {
      console.error('Failed to fetch visitor logs:', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchExclusions = async () => {
    const { data } = await supabase
      .from('analytics_exclusions')
      .select('*')
      .order('created_at', { ascending: false });
    setExclusions((data as Exclusion[]) || []);
  };

  useEffect(() => {
    fetchLogs();
    fetchExclusions();
  }, [filters]);

  // Filter out excluded visitors
  const filteredLogs = useMemo(() => {
    const excludedCookies = new Set(
      exclusions.filter((e) => e.exclusion_type === 'cookie_id').map((e) => e.exclusion_value)
    );
    const excludedIps = new Set(
      exclusions.filter((e) => e.exclusion_type === 'ip_hash').map((e) => e.exclusion_value)
    );
    return logs.filter(
      (l) => !excludedCookies.has(l.cookie_id) && !excludedIps.has(l.ip_hash)
    );
  }, [logs, exclusions]);

  // Overview stats
  const stats = useMemo(() => {
    const totalVisits = filteredLogs.length;
    const uniqueVisitors = new Set(filteredLogs.map((l) => l.cookie_id)).size;
    const mobileCount = filteredLogs.filter((l) => l.device_type === 'mobile').length;
    const mobilePct = totalVisits > 0 ? Math.round((mobileCount / totalVisits) * 100) : 0;

    const pageCounts: Record<string, number> = {};
    filteredLogs.forEach((l) => {
      pageCounts[l.page_path] = (pageCounts[l.page_path] || 0) + 1;
    });
    const topPage = Object.entries(pageCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

    return { totalVisits, uniqueVisitors, mobilePct, topPage };
  }, [filteredLogs]);

  // Daily visits for chart
  const dailyVisits = useMemo(() => {
    const dayMap: Record<string, number> = {};
    filteredLogs.forEach((l) => {
      const day = format(new Date(l.created_at), 'yyyy-MM-dd');
      dayMap[day] = (dayMap[day] || 0) + 1;
    });
    return Object.entries(dayMap)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, visits]) => ({ date, visits }));
  }, [filteredLogs]);

  // Device breakdown
  const deviceBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredLogs.forEach((l) => {
      counts[l.device_type] = (counts[l.device_type] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filteredLogs]);

  // Top pages
  const topPages = useMemo(() => {
    const pageCounts: Record<string, { views: number; uniqueVisitors: Set<string> }> = {};
    filteredLogs.forEach((l) => {
      if (!pageCounts[l.page_path]) {
        pageCounts[l.page_path] = { views: 0, uniqueVisitors: new Set() };
      }
      pageCounts[l.page_path].views++;
      pageCounts[l.page_path].uniqueVisitors.add(l.cookie_id);
    });
    return Object.entries(pageCounts)
      .map(([path, data]) => ({
        path,
        views: data.views,
        uniqueVisitors: data.uniqueVisitors.size,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 20);
  }, [filteredLogs]);

  // Add exclusion
  const addExclusion = async (type: string, value: string, note?: string) => {
    const { error } = await supabase.from('analytics_exclusions').insert({
      exclusion_type: type,
      exclusion_value: value,
      note: note || null,
    });
    if (!error) fetchExclusions();
    return error;
  };

  // Remove exclusion
  const removeExclusion = async (id: string) => {
    const { error } = await supabase.from('analytics_exclusions').delete().eq('id', id);
    if (!error) fetchExclusions();
    return error;
  };

  return {
    logs: filteredLogs,
    rawLogs: logs,
    exclusions,
    loading,
    filters,
    setFilters,
    stats,
    dailyVisits,
    deviceBreakdown,
    topPages,
    addExclusion,
    removeExclusion,
    refetch: fetchLogs,
  };
}
