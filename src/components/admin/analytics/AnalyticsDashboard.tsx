import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OverviewTab } from './tabs/OverviewTab';
import { ContentTab } from './tabs/ContentTab';
import { UsersTab } from './tabs/UsersTab';
import { FunnelTab } from './tabs/FunnelTab';
import { PlansTab } from './tabs/PlansTab';
import { AnalyticsFilters, FilterState } from './AnalyticsFilters';

export const AnalyticsDashboard: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: 7,
    language: 'all',
    plan: 'all',
    category: 'all',
    source: 'all',
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">User monitoring, content analytics & conversion funnels</p>
      </div>

      <AnalyticsFilters filters={filters} onChange={setFilters} />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="funnel">Funnel</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab filters={filters} />
        </TabsContent>
        <TabsContent value="content">
          <ContentTab filters={filters} />
        </TabsContent>
        <TabsContent value="users">
          <UsersTab filters={filters} />
        </TabsContent>
        <TabsContent value="funnel">
          <FunnelTab filters={filters} />
        </TabsContent>
        <TabsContent value="plans">
          <PlansTab filters={filters} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
