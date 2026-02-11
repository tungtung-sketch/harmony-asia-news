import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAnalyticsData } from '../useAnalyticsData';
import { FilterState } from '../AnalyticsFilters';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

interface Props {
  filters: FilterState;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted-foreground))'];

export const UsersTab: React.FC<Props> = ({ filters }) => {
  const { events, loading } = useAnalyticsData(filters);

  const userSegments = useMemo(() => {
    const loggedIn = new Set<string>();
    const anonymous = new Set<string>();

    events.forEach(e => {
      if (e.user_id) {
        loggedIn.add(e.user_id);
      } else if (e.anon_id) {
        anonymous.add(e.anon_id);
      }
    });

    return [
      { name: 'Logged In', value: loggedIn.size },
      { name: 'Anonymous', value: anonymous.size },
    ];
  }, [events]);

  const deviceBreakdown = useMemo(() => {
    const counts = new Map<string, number>();
    events.forEach(e => {
      const d = e.device || 'unknown';
      counts.set(d, (counts.get(d) || 0) + 1);
    });
    return Array.from(counts.entries()).map(([device, count]) => ({ device, count }));
  }, [events]);

  const topReferrers = useMemo(() => {
    const counts = new Map<string, number>();
    events
      .filter(e => e.referrer && e.referrer.length > 0)
      .forEach(e => {
        try {
          const host = new URL(e.referrer!).hostname;
          counts.set(host, (counts.get(host) || 0) + 1);
        } catch {
          counts.set(e.referrer!, (counts.get(e.referrer!) || 0) + 1);
        }
      });
    return Array.from(counts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([referrer, count]) => ({ referrer, count }));
  }, [events]);

  const dauData = useMemo(() => {
    const byDay = new Map<string, Set<string>>();
    events.forEach(e => {
      const day = e.ts.substring(0, 10);
      if (!byDay.has(day)) byDay.set(day, new Set());
      byDay.get(day)!.add(e.user_id || e.anon_id || e.session_id);
    });
    return Array.from(byDay.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, users]) => ({ date, dau: users.size }));
  }, [events]);

  const chartConfig = {
    dau: { label: 'DAU', color: 'hsl(var(--primary))' },
  };

  if (loading) {
    return <div className="space-y-4"><Skeleton className="h-64" /><Skeleton className="h-64" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Segments</CardTitle>
          </CardHeader>
          <CardContent>
            {userSegments.every(s => s.value === 0) ? (
              <p className="text-muted-foreground text-center py-8">No data yet</p>
            ) : (
              <div className="space-y-3">
                {userSegments.map((seg, i) => (
                  <div key={seg.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-sm">{seg.name}</span>
                    </div>
                    <span className="font-bold">{seg.value}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Device Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {deviceBreakdown.map(d => (
                <div key={d.device} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{d.device}</span>
                  <span className="font-bold">{d.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Referrers</CardTitle>
          </CardHeader>
          <CardContent>
            {topReferrers.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No referrer data</p>
            ) : (
              <div className="space-y-2">
                {topReferrers.map(r => (
                  <div key={r.referrer} className="flex items-center justify-between">
                    <span className="text-xs truncate max-w-[180px]">{r.referrer}</span>
                    <span className="font-bold text-sm">{r.count}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Daily Active Users (DAU)</CardTitle>
        </CardHeader>
        <CardContent>
          {dauData.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No data yet</p>
          ) : (
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <LineChart data={dauData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} tickFormatter={(v) => v.slice(5)} />
                <YAxis fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="dau" stroke="var(--color-dau)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
