import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAnalyticsData } from '../useAnalyticsData';
import { FilterState } from '../AnalyticsFilters';
import { Users, Eye, FileText, ShieldAlert, UserPlus, CreditCard } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

interface Props {
  filters: FilterState;
}

export const OverviewTab: React.FC<Props> = ({ filters }) => {
  const { events, loading } = useAnalyticsData(filters);

  const metrics = useMemo(() => {
    const uniqueUsers = new Set(events.map(e => e.user_id || e.anon_id)).size;
    const pageViews = events.filter(e => e.event_name === 'page_view').length;
    const articleViews = events.filter(e => e.event_name === 'article_view').length;
    const paywallHits = events.filter(e => e.event_name === 'paywall_hit').length;
    const signupCompletes = events.filter(e => e.event_name === 'signup_complete').length;
    const subscribeSuccess = events.filter(e => e.event_name === 'subscribe_success').length;

    return [
      { title: 'Active Users', value: uniqueUsers, icon: Users },
      { title: 'Page Views', value: pageViews, icon: Eye },
      { title: 'Article Views', value: articleViews, icon: FileText },
      { title: 'Paywall Hits', value: paywallHits, icon: ShieldAlert },
      { title: 'Signups', value: signupCompletes, icon: UserPlus },
      { title: 'Subscriptions', value: subscribeSuccess, icon: CreditCard },
    ];
  }, [events]);

  const trendData = useMemo(() => {
    const byDay = new Map<string, number>();
    events.forEach(e => {
      const day = e.ts.substring(0, 10);
      byDay.set(day, (byDay.get(day) || 0) + 1);
    });
    return Array.from(byDay.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, events: count }));
  }, [events]);

  const chartConfig = {
    events: { label: 'Events', color: 'hsl(var(--primary))' },
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {metrics.map((m) => (
          <Card key={m.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">{m.title}</CardTitle>
              <m.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-7 w-16" />
              ) : (
                <div className="text-2xl font-bold">{m.value.toLocaleString()}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Events Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-64 w-full" />
          ) : trendData.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">No data yet. Events will appear as users interact with your site.</p>
          ) : (
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} tickFormatter={(v) => v.slice(5)} />
                <YAxis fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="events" stroke="var(--color-events)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
