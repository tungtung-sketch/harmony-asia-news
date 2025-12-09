import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Users, Eye, TrendingUp, DollarSign, UserCheck, Clock, BarChart3 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Stats {
  totalArticles: number;
  totalUsers: number;
  totalViews: number;
  activeSubscriptions: number;
  trialUsers: number;
  basicSubscribers: number;
  premiumSubscribers: number;
  monthlyRevenue: number;
  todayViews: number;
  weeklyNewUsers: number;
}

interface RecentUser {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
}

interface RecentView {
  id: string;
  viewed_at: string;
  role_name: string | null;
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalArticles: 0,
    totalUsers: 0,
    totalViews: 0,
    activeSubscriptions: 0,
    trialUsers: 0,
    basicSubscribers: 0,
    premiumSubscribers: 0,
    monthlyRevenue: 0,
    todayViews: 0,
    weeklyNewUsers: 0
  });
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [recentViews, setRecentViews] = useState<RecentView[]>([]);
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

        // Fetch active subscriptions by tier
        const { data: subscriptionData } = await supabase
          .from('subscriptions')
          .select('tier, is_active')
          .eq('is_active', true);

        let trialUsers = 0;
        let basicSubscribers = 0;
        let premiumSubscribers = 0;
        
        subscriptionData?.forEach(sub => {
          if (sub.tier === 'free_trial') trialUsers++;
          else if (sub.tier === 'starter') basicSubscribers++;
          else if (sub.tier === 'business' || sub.tier === 'enterprise') premiumSubscribers++;
        });

        const activeSubscriptions = (subscriptionData?.length || 0) - trialUsers;

        // Calculate estimated monthly revenue (placeholder)
        const monthlyRevenue = (basicSubscribers * 599) + (premiumSubscribers * 1299);

        // Fetch today's views
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const { count: todayViewsCount } = await supabase
          .from('article_views')
          .select('*', { count: 'exact', head: true })
          .gte('viewed_at', today.toISOString());

        // Fetch weekly new users
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const { count: weeklyUsersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', weekAgo.toISOString());

        // Fetch recent users
        const { data: recentUsersData } = await supabase
          .from('profiles')
          .select('id, email, full_name, created_at')
          .order('created_at', { ascending: false })
          .limit(5);

        // Fetch recent views
        const { data: recentViewsData } = await supabase
          .from('article_views')
          .select('id, viewed_at, role_name')
          .order('viewed_at', { ascending: false })
          .limit(10);

        setStats({
          totalArticles: articlesCount || 0,
          totalUsers: usersCount || 0,
          totalViews: viewsCount || 0,
          activeSubscriptions,
          trialUsers,
          basicSubscribers,
          premiumSubscribers,
          monthlyRevenue,
          todayViews: todayViewsCount || 0,
          weeklyNewUsers: weeklyUsersCount || 0
        });

        setRecentUsers(recentUsersData || []);
        setRecentViews(recentViewsData || []);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const primaryStats = [
    { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Active Subscribers', value: stats.activeSubscriptions, icon: UserCheck, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Monthly Revenue', value: `฿${stats.monthlyRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-100' },
    { title: 'Total Article Views', value: stats.totalViews, icon: Eye, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  const secondaryStats = [
    { title: 'Trial Users', value: stats.trialUsers, icon: Clock },
    { title: 'Basic Plan', value: stats.basicSubscribers, icon: TrendingUp },
    { title: 'Premium Plan', value: stats.premiumSubscribers, icon: BarChart3 },
    { title: 'Total Articles', value: stats.totalArticles, icon: FileText },
    { title: "Today's Views", value: stats.todayViews, icon: Eye },
    { title: 'New Users (7d)', value: stats.weeklyNewUsers, icon: Users },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Primary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {primaryStats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  {loading ? (
                    <Skeleton className="h-8 w-20 mt-1" />
                  ) : (
                    <p className="text-2xl font-bold">
                      {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6 mb-8">
        {secondaryStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-7 w-12" />
              ) : (
                <div className="text-xl font-bold">{stat.value.toLocaleString()}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Signups</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : recentUsers.length === 0 ? (
              <p className="text-muted-foreground text-sm">No recent signups</p>
            ) : (
              <div className="space-y-3">
                {recentUsers.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{user.full_name || 'No name'}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {formatDate(user.created_at)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a href="/admin/articles" className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors">
              <FileText className="h-4 w-4" />
              Manage Articles
            </a>
            <a href="/admin/access-matrix" className="block p-3 rounded-lg hover:bg-muted transition-colors">
              → Edit Access Control Matrix
            </a>
            <a href="/admin/users" className="block p-3 rounded-lg hover:bg-muted transition-colors">
              → Manage Users & Subscriptions
            </a>
          </CardContent>
        </Card>

        {/* System Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Admin Email:</span>
              <span className="font-mono text-xs">tungtungtutungtung@gmail.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Access Levels:</span>
              <span>free, basic, premium, admin_only</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Roles:</span>
              <span>GUEST, BASIC, PREMIUM, ADMIN</span>
            </div>
            <div className="flex justify-between pt-2 border-t mt-2">
              <span className="text-muted-foreground">Basic Price:</span>
              <span>฿599/month</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Premium Price:</span>
              <span>฿1,299/month</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
