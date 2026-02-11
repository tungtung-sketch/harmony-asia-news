import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAnalyticsData } from '../useAnalyticsData';
import { FilterState } from '../AnalyticsFilters';
import { Progress } from '@/components/ui/progress';

interface Props {
  filters: FilterState;
}

const FUNNEL_STEPS = [
  { key: 'page_view', label: 'Page Views' },
  { key: 'paywall_hit', label: 'Paywall Hits' },
  { key: 'signup_start', label: 'Signup Started' },
  { key: 'signup_complete', label: 'Signup Complete' },
  { key: 'checkout_start', label: 'Checkout Started' },
  { key: 'subscribe_success', label: 'Subscribe Success' },
];

export const FunnelTab: React.FC<Props> = ({ filters }) => {
  const { events, loading } = useAnalyticsData(filters);

  const funnelData = useMemo(() => {
    const counts = new Map<string, number>();
    FUNNEL_STEPS.forEach(s => counts.set(s.key, 0));
    events.forEach(e => {
      if (counts.has(e.event_name)) {
        counts.set(e.event_name, counts.get(e.event_name)! + 1);
      }
    });

    const firstStep = counts.get('page_view') || 0;

    return FUNNEL_STEPS.map(step => {
      const count = counts.get(step.key) || 0;
      const conversionFromStart = firstStep > 0 ? (count / firstStep) * 100 : 0;
      return {
        ...step,
        count,
        conversionFromStart: Math.round(conversionFromStart * 100) / 100,
      };
    });
  }, [events]);

  if (loading) {
    return <Skeleton className="h-96" />;
  }

  const maxCount = Math.max(...funnelData.map(d => d.count), 1);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          {funnelData.every(d => d.count === 0) ? (
            <p className="text-muted-foreground text-center py-12">No funnel data yet. Events will populate as users interact with your site.</p>
          ) : (
            <div className="space-y-4">
              {funnelData.map((step, i) => (
                <div key={step.key} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="font-medium">{step.label}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">{step.count.toLocaleString()}</span>
                      <span className="text-muted-foreground w-16 text-right">
                        {step.conversionFromStart}%
                      </span>
                    </div>
                  </div>
                  <Progress value={(step.count / maxCount) * 100} className="h-2" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Step-by-Step Conversion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3">Step</th>
                  <th className="text-right py-2 px-3">Count</th>
                  <th className="text-right py-2 px-3">% from Start</th>
                  <th className="text-right py-2 px-3">Drop-off</th>
                </tr>
              </thead>
              <tbody>
                {funnelData.map((step, i) => {
                  const prevCount = i > 0 ? funnelData[i - 1].count : step.count;
                  const dropoff = prevCount > 0 ? ((prevCount - step.count) / prevCount) * 100 : 0;
                  return (
                    <tr key={step.key} className="border-b border-border/50">
                      <td className="py-2 px-3 font-medium">{step.label}</td>
                      <td className="py-2 px-3 text-right">{step.count.toLocaleString()}</td>
                      <td className="py-2 px-3 text-right">{step.conversionFromStart}%</td>
                      <td className="py-2 px-3 text-right text-destructive">
                        {i > 0 ? `${dropoff.toFixed(1)}%` : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
