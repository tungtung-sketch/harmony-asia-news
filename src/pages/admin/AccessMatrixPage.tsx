import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Role, RoleArticleRule, AccessLevel } from '@/types/paywall';
import { Save, RefreshCw } from 'lucide-react';

const accessLevels: AccessLevel[] = ['free', 'basic', 'premium', 'admin_only'];

export const AccessMatrixPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [rules, setRules] = useState<RoleArticleRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: rolesData } = await supabase.from('roles').select('*').order('name');
      const { data: rulesData } = await supabase.from('role_article_rules').select('*');
      
      setRoles((rolesData as Role[]) || []);
      setRules((rulesData as RoleArticleRule[]) || []);
    } catch (error) {
      console.error('Error fetching access data:', error);
      toast({ title: 'Error', description: 'Failed to load access matrix', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getRule = (roleId: string, accessLevel: AccessLevel): RoleArticleRule | undefined => {
    return rules.find(r => r.role_id === roleId && r.access_level === accessLevel);
  };

  const updateRule = async (
    roleId: string, 
    accessLevel: AccessLevel, 
    field: 'can_view_full' | 'can_comment' | 'can_download_pdf',
    value: boolean
  ) => {
    const existingRule = getRule(roleId, accessLevel);
    if (!existingRule) return;

    // Optimistic update
    setRules(prev => prev.map(r => 
      r.id === existingRule.id ? { ...r, [field]: value } : r
    ));

    try {
      const { error } = await supabase
        .from('role_article_rules')
        .update({ [field]: value })
        .eq('id', existingRule.id);

      if (error) throw error;
      
      toast({ title: 'Updated', description: 'Access rule updated successfully' });
    } catch (error) {
      console.error('Error updating rule:', error);
      toast({ title: 'Error', description: 'Failed to update rule', variant: 'destructive' });
      fetchData(); // Revert on error
    }
  };

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
          <h1 className="text-2xl font-bold">Access Control Matrix</h1>
          <p className="text-muted-foreground">Configure which roles can access which content levels</p>
        </div>
        <Button variant="outline" onClick={fetchData}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Full View Access */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Full Content Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Role</th>
                  {accessLevels.map(level => (
                    <th key={level} className="text-center py-3 px-4 font-semibold capitalize">
                      {level.replace('_', ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roles.map(role => (
                  <tr key={role.id} className="border-b">
                    <td className="py-3 px-4 font-medium">{role.name}</td>
                    {accessLevels.map(level => {
                      const rule = getRule(role.id, level);
                      return (
                        <td key={level} className="text-center py-3 px-4">
                          <Switch
                            checked={rule?.can_view_full || false}
                            onCheckedChange={(checked) => updateRule(role.id, level, 'can_view_full', checked)}
                            disabled={role.name === 'ADMIN'} // Admin always has access
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Comment Access */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Comment Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Role</th>
                  {accessLevels.map(level => (
                    <th key={level} className="text-center py-3 px-4 font-semibold capitalize">
                      {level.replace('_', ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roles.map(role => (
                  <tr key={role.id} className="border-b">
                    <td className="py-3 px-4 font-medium">{role.name}</td>
                    {accessLevels.map(level => {
                      const rule = getRule(role.id, level);
                      return (
                        <td key={level} className="text-center py-3 px-4">
                          <Switch
                            checked={rule?.can_comment || false}
                            onCheckedChange={(checked) => updateRule(role.id, level, 'can_comment', checked)}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* PDF Download Access */}
      <Card>
        <CardHeader>
          <CardTitle>PDF Download Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Role</th>
                  {accessLevels.map(level => (
                    <th key={level} className="text-center py-3 px-4 font-semibold capitalize">
                      {level.replace('_', ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roles.map(role => (
                  <tr key={role.id} className="border-b">
                    <td className="py-3 px-4 font-medium">{role.name}</td>
                    {accessLevels.map(level => {
                      const rule = getRule(role.id, level);
                      return (
                        <td key={level} className="text-center py-3 px-4">
                          <Switch
                            checked={rule?.can_download_pdf || false}
                            onCheckedChange={(checked) => updateRule(role.id, level, 'can_download_pdf', checked)}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-2">Legend</h3>
        <div className="grid gap-2 text-sm">
          <div><strong>GUEST:</strong> Non-logged in users or users without subscription</div>
          <div><strong>BASIC:</strong> Users with Basic/Starter subscription</div>
          <div><strong>PREMIUM:</strong> Users with Premium/Business/Enterprise subscription or Free Trial</div>
          <div><strong>ADMIN:</strong> Administrators (always have full access)</div>
        </div>
      </div>
    </div>
  );
};

export default AccessMatrixPage;
