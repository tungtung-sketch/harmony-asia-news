import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useVisitorAnalytics, VisitorLog } from '@/hooks/useVisitorAnalytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Users, Eye, Smartphone, FileText, Trash2, Plus, Shield } from 'lucide-react';
import { format, subDays } from 'date-fns';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { toast } from 'sonner';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

const VisitorAnalyticsPage: React.FC = () => {
  const {
    logs, exclusions, loading, filters, setFilters,
    stats, dailyVisits, deviceBreakdown, topPages,
    addExclusion, removeExclusion,
  } = useVisitorAnalytics();

  const [selectedVisitor, setSelectedVisitor] = useState<string | null>(null);
  const [newExclusionType, setNewExclusionType] = useState('cookie_id');
  const [newExclusionValue, setNewExclusionValue] = useState('');
  const [newExclusionNote, setNewExclusionNote] = useState('');

  // Get visitor detail
  const visitorLogs = selectedVisitor
    ? logs.filter((l) => l.cookie_id === selectedVisitor).slice(0, 50)
    : [];
  const visitorInfo = visitorLogs[0];

  const handleAddExclusion = async () => {
    if (!newExclusionValue.trim()) return;
    const err = await addExclusion(newExclusionType, newExclusionValue.trim(), newExclusionNote.trim());
    if (err) {
      toast.error('Failed to add exclusion');
    } else {
      toast.success('Exclusion added');
      setNewExclusionValue('');
      setNewExclusionNote('');
    }
  };

  const handleMarkAsTest = async (log: VisitorLog) => {
    const err = await addExclusion('cookie_id', log.cookie_id, 'Marked as test device from visitor explorer');
    if (err) toast.error('Failed to mark as test');
    else toast.success('Marked as test device');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Visitor Analytics</h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVisits.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.uniqueVisitors.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mobile %</CardTitle>
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.mobilePct}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Page</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold truncate">{stats.topPage}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="visitors">Visitor Explorer</TabsTrigger>
            <TabsTrigger value="exclusions">Exclusions</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="pt-4 flex flex-wrap gap-4 items-end">
                <div>
                  <Label className="text-xs">From</Label>
                  <Input
                    type="date"
                    value={format(filters.dateFrom, 'yyyy-MM-dd')}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, dateFrom: new Date(e.target.value) }))
                    }
                  />
                </div>
                <div>
                  <Label className="text-xs">To</Label>
                  <Input
                    type="date"
                    value={format(filters.dateTo, 'yyyy-MM-dd')}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, dateTo: new Date(e.target.value) }))
                    }
                  />
                </div>
                <div>
                  <Label className="text-xs">Device</Label>
                  <Select
                    value={filters.deviceType}
                    onValueChange={(v) => setFilters((f) => ({ ...f, deviceType: v }))}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="desktop">Desktop</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="tablet">Tablet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Path contains</Label>
                  <Input
                    placeholder="/insights"
                    value={filters.pathContains}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, pathContains: e.target.value }))
                    }
                    className="w-40"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={filters.excludeTest}
                    onCheckedChange={(v) => setFilters((f) => ({ ...f, excludeTest: v }))}
                  />
                  <Label className="text-xs">Exclude test</Label>
                </div>
              </CardContent>
            </Card>

            {/* Daily Visits Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Visits Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyVisits}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="visits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Device Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Device Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={deviceBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {deviceBreakdown.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top Pages */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Top Pages</CardTitle>
                </CardHeader>
                <CardContent className="max-h-[300px] overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Path</TableHead>
                        <TableHead className="text-right">Views</TableHead>
                        <TableHead className="text-right">Unique</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topPages.map((p) => (
                        <TableRow key={p.path}>
                          <TableCell className="text-xs truncate max-w-[200px]">{p.path}</TableCell>
                          <TableCell className="text-right">{p.views}</TableCell>
                          <TableCell className="text-right">{p.uniqueVisitors}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* VISITOR EXPLORER TAB */}
          <TabsContent value="visitors" className="space-y-4">
            <Card>
              <CardContent className="pt-4 max-h-[600px] overflow-auto">
                {loading ? (
                  <p className="text-muted-foreground text-sm">Loading...</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Page</TableHead>
                        <TableHead>Device</TableHead>
                        <TableHead>Browser</TableHead>
                        <TableHead>OS</TableHead>
                        <TableHead>Test</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {logs.slice(0, 100).map((l) => (
                        <TableRow key={l.id}>
                          <TableCell className="text-xs whitespace-nowrap">
                            {format(new Date(l.created_at), 'MM/dd HH:mm')}
                          </TableCell>
                          <TableCell className="text-xs truncate max-w-[180px]">{l.page_path}</TableCell>
                          <TableCell className="text-xs">{l.device_type}</TableCell>
                          <TableCell className="text-xs">{l.browser}</TableCell>
                          <TableCell className="text-xs">{l.os}</TableCell>
                          <TableCell>
                            {l.is_test && <Badge variant="outline" className="text-xs">Test</Badge>}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedVisitor(l.cookie_id)}
                            >
                              Detail
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* Visitor Detail Dialog */}
            <Dialog open={!!selectedVisitor} onOpenChange={() => setSelectedVisitor(null)}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Visitor Detail</DialogTitle>
                </DialogHeader>
                {visitorInfo && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Cookie ID:</span>
                        <p className="font-mono text-xs truncate">{visitorInfo.cookie_id}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">IP Hash:</span>
                        <p className="font-mono text-xs truncate">{visitorInfo.ip_hash}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Device:</span>
                        <p>{visitorInfo.device_type}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Browser / OS:</span>
                        <p>{visitorInfo.browser} / {visitorInfo.os}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Seen:</span>
                        <p>{format(new Date(visitorInfo.created_at), 'yyyy-MM-dd HH:mm')}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Recent Pages ({visitorLogs.length})</h4>
                      <div className="max-h-48 overflow-auto space-y-1">
                        {visitorLogs.map((l) => (
                          <div key={l.id} className="flex justify-between text-xs border-b border-border py-1">
                            <span className="truncate max-w-[250px]">{l.page_path}</span>
                            <span className="text-muted-foreground whitespace-nowrap ml-2">
                              {format(new Date(l.created_at), 'MM/dd HH:mm')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        handleMarkAsTest(visitorInfo);
                        setSelectedVisitor(null);
                      }}
                    >
                      <Shield className="h-3 w-3 mr-1" />
                      Mark as Test Device
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* EXCLUSIONS TAB */}
          <TabsContent value="exclusions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Add Exclusion</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3 items-end">
                <div>
                  <Label className="text-xs">Type</Label>
                  <Select value={newExclusionType} onValueChange={setNewExclusionType}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cookie_id">Cookie ID</SelectItem>
                      <SelectItem value="ip_hash">IP Hash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Value</Label>
                  <Input
                    value={newExclusionValue}
                    onChange={(e) => setNewExclusionValue(e.target.value)}
                    placeholder="Paste cookie_id or ip_hash"
                    className="w-64"
                  />
                </div>
                <div>
                  <Label className="text-xs">Note</Label>
                  <Input
                    value={newExclusionNote}
                    onChange={(e) => setNewExclusionNote(e.target.value)}
                    placeholder="My laptop"
                    className="w-40"
                  />
                </div>
                <Button size="sm" onClick={handleAddExclusion}>
                  <Plus className="h-3 w-3 mr-1" /> Add
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Current Exclusions ({exclusions.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Note</TableHead>
                      <TableHead>Added</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exclusions.map((e) => (
                      <TableRow key={e.id}>
                        <TableCell>
                          <Badge variant="outline">{e.exclusion_type}</Badge>
                        </TableCell>
                        <TableCell className="font-mono text-xs truncate max-w-[200px]">
                          {e.exclusion_value}
                        </TableCell>
                        <TableCell className="text-xs">{e.note || '-'}</TableCell>
                        <TableCell className="text-xs">
                          {format(new Date(e.created_at), 'yyyy-MM-dd')}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={async () => {
                              const err = await removeExclusion(e.id);
                              if (err) toast.error('Failed to remove');
                              else toast.success('Exclusion removed');
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {exclusions.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground text-sm py-6">
                          No exclusions configured
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default VisitorAnalyticsPage;
