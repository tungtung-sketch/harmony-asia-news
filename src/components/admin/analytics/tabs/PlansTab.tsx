import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAnalyticsData } from '../useAnalyticsData';
import { FilterState } from '../AnalyticsFilters';
import { Badge } from '@/components/ui/badge';

interface Props {
  filters: FilterState;
}

export const PlansTab: React.FC<Props> = ({ filters }) => {
  const { events, loading } = useAnalyticsData(filters);

  const planConversion = useMemo(() => {
    const plans = new Map<string, { checkoutStarts: number; successes: number; cancels: number }>();

    events
      .filter(e => e.plan && ['checkout_start', 'subscribe_success', 'subscribe_cancel'].includes(e.event_name))
      .forEach(e => {
        if (!plans.has(e.plan!)) {
          plans.set(e.plan!, { checkoutStarts: 0, successes: 0, cancels: 0 });
        }
        const p = plans.get(e.plan!)!;
        if (e.event_name === 'checkout_start') p.checkoutStarts++;
        if (e.event_name === 'subscribe_success') p.successes++;
        if (e.event_name === 'subscribe_cancel') p.cancels++;
      });

    return Array.from(plans.entries()).map(([plan, data]) => ({
      plan,
      ...data,
      conversionRate: data.checkoutStarts > 0
        ? ((data.successes / data.checkoutStarts) * 100).toFixed(1)
        : '0.0',
    }));
  }, [events]);

  const paywallByPlan = useMemo(() => {
    const counts = new Map<string, number>();
    events
      .filter(e => e.event_name === 'paywall_hit')
      .forEach(e => {
        const p = e.plan || 'unknown';
        counts.set(p, (counts.get(p) || 0) + 1);
      });
    return Array.from(counts.entries())
      .sort(([, a], [, b]) => b - a)
      .map(([plan, hits]) => ({ plan, hits }));
  }, [events]);

  if (loading) {
    return <Skeleton className="h-64" />;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Plan Conversion Rates</CardTitle>
        </CardHeader>
        <CardContent>
          {planConversion.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">No plan conversion data yet. Data will appear when users go through the checkout flow.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3">Plan</th>
                    <th className="text-right py-2 px-3">Checkout Starts</th>
                    <th className="text-right py-2 px-3">Successes</th>
                    <th className="text-right py-2 px-3">Cancels</th>
                    <th className="text-right py-2 px-3">Conv. Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {planConversion.map(p => (
                    <tr key={p.plan} className="border-b border-border/50">
                      <td className="py-2 px-3">
                        <Badge variant="outline" className="capitalize">{p.plan}</Badge>
                      </td>
                      <td className="py-2 px-3 text-right">{p.checkoutStarts}</td>
                      <td className="py-2 px-3 text-right font-medium text-green-600">{p.successes}</td>
                      <td className="py-2 px-3 text-right text-destructive">{p.cancels}</td>
                      <td className="py-2 px-3 text-right font-bold">{p.conversionRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Paywall Hits by Context</CardTitle>
        </CardHeader>
        <CardContent>
          {paywallByPlan.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No paywall data yet</p>
          ) : (
            <div className="space-y-2">
              {paywallByPlan.map(p => (
                <div key={p.plan} className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <span className="capitalize text-sm">{p.plan}</span>
                  <span className="font-bold">{p.hits}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
