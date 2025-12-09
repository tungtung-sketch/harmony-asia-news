import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { PlanBadge } from '@/components/paywall';
import { Search, RefreshCw } from 'lucide-react';
import { ADMIN_EMAIL } from '@/types/paywall';

interface UserWithSubscription {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  role: string;
  created_at: string;
  subscription?: {
    tier: string;
    status: string;
    trial_end_date: string | null;
    subscription_end_date: string | null;
  };
}

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserWithSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Fetch profiles with subscriptions
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch subscriptions for each user
      const usersWithSubs = await Promise.all(
        (profiles || []).map(async (profile) => {
          const { data: sub } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', profile.user_id)
            .maybeSingle();

          return {
            ...profile,
            subscription: sub ? {
              tier: sub.tier,
              status: sub.status || 'unknown',
              trial_end_date: sub.trial_end_date,
              subscription_end_date: sub.subscription_end_date
            } : undefined
          };
        })
      );

      setUsers(usersWithSubs);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({ title: 'Error', description: 'Failed to load users', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUserRole = async (userId: string, newRole: 'reader' | 'editor' | 'admin') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;

      setUsers(prev => prev.map(u => 
        u.user_id === userId ? { ...u, role: newRole } : u
      ));

      toast({ title: 'Updated', description: 'User role updated successfully' });
    } catch (error) {
      console.error('Error updating role:', error);
      toast({ title: 'Error', description: 'Failed to update role', variant: 'destructive' });
    }
  };

  const getUserTier = (user: UserWithSubscription): string => {
    if (user.email === ADMIN_EMAIL) return 'ADMIN';
    if (!user.subscription) return 'GUEST';
    
    const tier = user.subscription.tier;
    if (tier === 'free_trial') {
      const trialEnd = user.subscription.trial_end_date;
      if (trialEnd && new Date(trialEnd) > new Date()) {
        return 'FREE_TRIAL';
      }
      return 'GUEST';
    }
    if (tier === 'starter' || tier === 'basic') return 'BASIC';
    if (tier === 'business' || tier === 'enterprise' || tier === 'premium') return 'PREMIUM';
    return 'GUEST';
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Users Management</h1>
          <p className="text-muted-foreground">{users.length} total users</p>
        </div>
        <Button variant="outline" onClick={fetchUsers}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by email or name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left py-3 px-4 font-semibold">User</th>
                  <th className="text-left py-3 px-4 font-semibold">Plan</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Role</th>
                  <th className="text-left py-3 px-4 font-semibold">Joined</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {user.full_name || 'No name'}
                          {user.email === ADMIN_EMAIL && (
                            <Badge variant="destructive" className="text-xs">Super Admin</Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <PlanBadge plan={getUserTier(user)} size="sm" />
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={user.subscription?.status === 'active' ? 'default' : 'outline'}>
                        {user.subscription?.status || 'No subscription'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Select 
                        value={user.role} 
                        onValueChange={(value) => updateUserRole(user.user_id, value as 'reader' | 'editor' | 'admin')}
                        disabled={user.email === ADMIN_EMAIL}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="reader">Reader</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No users found matching your search.
        </div>
      )}
    </div>
  );
};

export default UsersPage;
