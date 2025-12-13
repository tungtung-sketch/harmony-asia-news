import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { Download, AlertTriangle, Eye, FileDown, Database, RefreshCw, Search, Calendar } from 'lucide-react';
import { format, subDays, subMonths } from 'date-fns';
import { toast } from 'sonner';

interface ActionLog {
  id: string;
  action_type: string;
  user_email: string;
  company_name: string | null;
  report_slug: string;
  report_title: string;
  industry_category: string | null;
  logged_at: string;
  language: string;
  device_type: string | null;
}

interface AnomalyFlag {
  id: string;
  user_email: string;
  flag_type: string;
  flag_reason: string;
  severity: string;
  detected_at: string;
  is_resolved: boolean;
  review_notes: string | null;
}

interface UsageSummary {
  report_title: string;
  total_views: number;
  total_downloads: number;
  unique_users: number;
}

const PremiumAnalyticsPage: React.FC = () => {
  const [logs, setLogs] = useState<ActionLog[]>([]);
  const [anomalies, setAnomalies] = useState<AnomalyFlag[]>([]);
  const [summary, setSummary] = useState<UsageSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('30');
  const [actionFilter, setActionFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');

  // Fetch logs
  const fetchLogs = async () => {
    setLoading(true);
    try {
      const fromDate = subDays(new Date(), parseInt(dateRange));
      
      let query = supabase
        .from('premium_action_logs')
        .select('*')
        .gte('logged_at', fromDate.toISOString())
        .order('logged_at', { ascending: false })
        .limit(500);

      if (actionFilter !== 'all') {
        query = query.eq('action_type', actionFilter as 'view' | 'download' | 'access_data');
      }
      if (industryFilter !== 'all') {
        query = query.eq('industry_category', industryFilter);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setLogs(data || []);

      // Calculate summary
      const summaryMap = new Map<string, UsageSummary>();
      (data || []).forEach(log => {
        const existing = summaryMap.get(log.report_slug) || {
          report_title: log.report_title,
          total_views: 0,
          total_downloads: 0,
          unique_users: 0,
        };
        if (log.action_type === 'view') existing.total_views++;
        if (log.action_type === 'download') existing.total_downloads++;
        summaryMap.set(log.report_slug, existing);
      });
      setSummary(Array.from(summaryMap.values()));

    } catch (error) {
      console.error('Error fetching logs:', error);
      toast.error('Failed to fetch logs');
    } finally {
      setLoading(false);
    }
  };

  // Fetch anomalies
  const fetchAnomalies = async () => {
    try {
      const { data, error } = await supabase
        .from('anomaly_flags')
        .select('*')
        .order('detected_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setAnomalies(data || []);
    } catch (error) {
      console.error('Error fetching anomalies:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
    fetchAnomalies();
  }, [dateRange, actionFilter, industryFilter]);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Date', 'Action', 'User Email', 'Company', 'Report', 'Industry', 'Language', 'Device'];
    const rows = logs.map(log => [
      format(new Date(log.logged_at), 'yyyy-MM-dd HH:mm'),
      log.action_type,
      log.user_email,
      log.company_name || '',
      log.report_title,
      log.industry_category || '',
      log.language,
      log.device_type || '',
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `premium-analytics-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    toast.success('CSV exported successfully');
  };

  // Resolve anomaly
  const resolveAnomaly = async (id: string, notes: string) => {
    try {
      const { error } = await supabase
        .from('anomaly_flags')
        .update({ 
          is_resolved: true, 
          reviewed_at: new Date().toISOString(),
          review_notes: notes 
        })
        .eq('id', id);

      if (error) throw error;
      toast.success('Anomaly marked as resolved');
      fetchAnomalies();
    } catch (error) {
      toast.error('Failed to resolve anomaly');
    }
  };

  // Filter logs by search
  const filteredLogs = logs.filter(log => 
    log.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.report_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.company_name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'view': return <Eye className="h-4 w-4" />;
      case 'download': return <FileDown className="h-4 w-4" />;
      case 'access_data': return <Database className="h-4 w-4" />;
      default: return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Premium Analytics & Governance</h1>
            <p className="text-muted-foreground">Monitor premium content usage and detect anomalies</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => { fetchLogs(); fetchAnomalies(); }}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={exportToCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{logs.length}</div>
              <p className="text-xs text-muted-foreground">Last {dateRange} days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Unique Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(logs.map(l => l.user_email)).size}
              </div>
              <p className="text-xs text-muted-foreground">Premium members active</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">PDF Downloads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {logs.filter(l => l.action_type === 'download').length}
              </div>
              <p className="text-xs text-muted-foreground">Reports downloaded</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Anomalies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {anomalies.filter(a => !a.is_resolved).length}
              </div>
              <p className="text-xs text-muted-foreground">Unresolved flags</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="logs" className="space-y-4">
          <TabsList>
            <TabsTrigger value="logs">Action Logs</TabsTrigger>
            <TabsTrigger value="reports">Top Reports</TabsTrigger>
            <TabsTrigger value="anomalies">
              Anomalies
              {anomalies.filter(a => !a.is_resolved).length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {anomalies.filter(a => !a.is_resolved).length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="logs" className="space-y-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by email, company, report..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-40">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="365">Last 12 months</SelectItem>
                </SelectContent>
              </Select>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Action type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="view">Views</SelectItem>
                  <SelectItem value="download">Downloads</SelectItem>
                  <SelectItem value="access_data">Data Access</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Logs Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Report</TableHead>
                      <TableHead>Language</TableHead>
                      <TableHead>Device</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          Loading...
                        </TableCell>
                      </TableRow>
                    ) : filteredLogs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No logs found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredLogs.slice(0, 100).map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="text-sm">
                            {format(new Date(log.logged_at), 'yyyy-MM-dd HH:mm')}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getActionIcon(log.action_type)}
                              <span className="capitalize">{log.action_type}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{log.user_email}</TableCell>
                          <TableCell>{log.company_name || '-'}</TableCell>
                          <TableCell className="max-w-48 truncate">{log.report_title}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{log.language.toUpperCase()}</Badge>
                          </TableCell>
                          <TableCell className="capitalize">{log.device_type || '-'}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Reports by Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report</TableHead>
                      <TableHead className="text-right">Views</TableHead>
                      <TableHead className="text-right">Downloads</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {summary
                      .sort((a, b) => (b.total_views + b.total_downloads) - (a.total_views + a.total_downloads))
                      .map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{item.report_title}</TableCell>
                          <TableCell className="text-right">{item.total_views}</TableCell>
                          <TableCell className="text-right">{item.total_downloads}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="anomalies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Anomaly Flags
                </CardTitle>
              </CardHeader>
              <CardContent>
                {anomalies.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No anomalies detected</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Detected</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {anomalies.map((anomaly) => (
                        <TableRow key={anomaly.id}>
                          <TableCell className="text-sm">
                            {format(new Date(anomaly.detected_at), 'yyyy-MM-dd HH:mm')}
                          </TableCell>
                          <TableCell className="font-mono text-sm">{anomaly.user_email}</TableCell>
                          <TableCell className="capitalize">{anomaly.flag_type.replace(/_/g, ' ')}</TableCell>
                          <TableCell className="max-w-64 truncate">{anomaly.flag_reason}</TableCell>
                          <TableCell>
                            <Badge variant={getSeverityColor(anomaly.severity) as any}>
                              {anomaly.severity}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {anomaly.is_resolved ? (
                              <Badge variant="outline">Resolved</Badge>
                            ) : (
                              <Badge variant="destructive">Open</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {!anomaly.is_resolved && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => resolveAnomaly(anomaly.id, 'Reviewed and resolved')}
                              >
                                Resolve
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default PremiumAnalyticsPage;
