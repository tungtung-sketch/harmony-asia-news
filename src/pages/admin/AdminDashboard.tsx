import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Users, Eye, TrendingUp } from 'lucide-react';

interface Stats {
  totalArticles: number;
  totalUsers: number;
  totalViews: number;
  activeSubscriptions: number;
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalArticles: 0,
    totalUsers: 0,
    totalViews: 0,
    activeSubscriptions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch articles count
        const { count: articlesCount } = await supabase
          .from('articles')
          .select('*', { count: 'exact', head: true });

        // Fetch users count
        const { count: usersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // Fetch views count
        const { count: viewsCount } = await supabase
          .from('article_views')
          .select('*', { count: 'exact', head: true });

        // Fetch active subscriptions
        const { count: subsCount } = await supabase
          .from('subscriptions')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true);

        setStats({
          totalArticles: articlesCount || 0,
          totalUsers: usersCount || 0,
          totalViews: viewsCount || 0,
          activeSubscriptions: subsCount || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Articles', value: stats.totalArticles, icon: FileText, color: 'text-blue-600' },
    { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-green-600' },
    { title: 'Article Views', value: stats.totalViews, icon: Eye, color: 'text-purple-600' },
    { title: 'Active Subscriptions', value: stats.activeSubscriptions, icon: TrendingUp, color: 'text-amber-600' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-8 w-16 bg-muted animate-pulse rounded" />
              ) : (
                <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a href="/admin/articles" className="block p-3 rounded-lg hover:bg-muted transition-colors">
              → Manage Articles
            </a>
            <a href="/admin/access-matrix" className="block p-3 rounded-lg hover:bg-muted transition-colors">
              → Edit Access Control Matrix
            </a>
            <a href="/admin/users" className="block p-3 rounded-lg hover:bg-muted transition-colors">
              → Manage Users & Subscriptions
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Admin Email Override:</span>
              <span className="font-mono">tungtungtutungtung@gmail.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Access Levels:</span>
              <span>free, basic, premium, admin_only</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Roles:</span>
              <span>GUEST, BASIC, PREMIUM, ADMIN</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
