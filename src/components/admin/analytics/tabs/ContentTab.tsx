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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface Props {
  filters: FilterState;
}

export const ContentTab: React.FC<Props> = ({ filters }) => {
  const { events, loading } = useAnalyticsData(filters);

  const topCategories = useMemo(() => {
    const counts = new Map<string, number>();
    events
      .filter(e => e.category && ['article_view', 'report_view', 'page_view'].includes(e.event_name))
      .forEach(e => counts.set(e.category!, (counts.get(e.category!) || 0) + 1));
    return Array.from(counts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([category, views]) => ({ category, views }));
  }, [events]);

  const topPages = useMemo(() => {
    const counts = new Map<string, number>();
    events
      .filter(e => e.event_name === 'page_view')
      .forEach(e => counts.set(e.path, (counts.get(e.path) || 0) + 1));
    return Array.from(counts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([path, views]) => ({ path, views }));
  }, [events]);

  const topContent = useMemo(() => {
    const counts = new Map<string, { views: number; category: string | null }>();
    events
      .filter(e => e.content_id && ['article_view', 'report_view'].includes(e.event_name))
      .forEach(e => {
        const existing = counts.get(e.content_id!) || { views: 0, category: e.category };
        existing.views++;
        counts.set(e.content_id!, existing);
      });
    return Array.from(counts.entries())
      .sort(([, a], [, b]) => b.views - a.views)
      .slice(0, 10)
      .map(([content_id, data]) => ({ content_id, views: data.views, category: data.category }));
  }, [events]);

  const chartConfig = {
    views: { label: 'Views', color: 'hsl(var(--primary))' },
  };

  if (loading) {
    return <div className="space-y-4"><Skeleton className="h-64" /><Skeleton className="h-64" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Categories</CardTitle>
          </CardHeader>
          <CardContent>
            {topCategories.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No category data yet</p>
            ) : (
              <ChartContainer config={chartConfig} className="h-64 w-full">
                <BarChart data={topCategories} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" fontSize={12} />
                  <YAxis dataKey="category" type="category" fontSize={11} width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="views" fill="var(--color-views)" radius={4} />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            {topPages.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No page view data yet</p>
            ) : (
              <ChartContainer config={chartConfig} className="h-64 w-full">
                <BarChart data={topPages} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" fontSize={12} />
                  <YAxis dataKey="path" type="category" fontSize={10} width={140} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="views" fill="var(--color-views)" radius={4} />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Content</CardTitle>
        </CardHeader>
        <CardContent>
          {topContent.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No content view data yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3">Content ID</th>
                    <th className="text-left py-2 px-3">Category</th>
                    <th className="text-right py-2 px-3">Views</th>
                  </tr>
                </thead>
                <tbody>
                  {topContent.map(c => (
                    <tr key={c.content_id} className="border-b border-border/50">
                      <td className="py-2 px-3 font-mono text-xs">{c.content_id}</td>
                      <td className="py-2 px-3">{c.category || '—'}</td>
                      <td className="py-2 px-3 text-right font-medium">{c.views}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
