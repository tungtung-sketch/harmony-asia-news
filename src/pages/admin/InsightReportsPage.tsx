import { useState, useEffect } from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { 
  FileText, 
  Download, 
  RefreshCw, 
  Settings, 
  Users,
  Eye,
  Calendar,
  Loader2,
  Check,
  X
} from 'lucide-react';

interface InsightReport {
  id: string;
  report_slug: string;
  title_en: string;
  title_ja: string;
  pdf_enabled: boolean;
  watermark_text: string;
  last_content_update: string;
  created_at: string;
  updated_at: string;
}

interface PdfDownload {
  id: string;
  report_slug: string;
  user_email: string;
  user_company: string | null;
  language: string;
  downloaded_at: string;
}

const InsightReportsPage = () => {
  const { lang } = useI18n();
  const isJapanese = lang === 'ja';
  
  const [reports, setReports] = useState<InsightReport[]>([]);
  const [downloads, setDownloads] = useState<PdfDownload[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [globalWatermark, setGlobalWatermark] = useState('For Premium Members of WaLen Only');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch reports
      const { data: reportsData, error: reportsError } = await supabase
        .from('insight_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (reportsError) throw reportsError;
      setReports(reportsData || []);

      // Fetch recent downloads
      const { data: downloadsData, error: downloadsError } = await supabase
        .from('pdf_downloads')
        .select('*')
        .order('downloaded_at', { ascending: false })
        .limit(50);

      if (downloadsError) throw downloadsError;
      setDownloads(downloadsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: isJapanese ? 'エラー' : 'Error',
        description: isJapanese ? 'データの取得に失敗しました。' : 'Failed to fetch data.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePdfEnabled = async (report: InsightReport) => {
    setSaving(report.id);
    try {
      const { error } = await supabase
        .from('insight_reports')
        .update({ pdf_enabled: !report.pdf_enabled })
        .eq('id', report.id);

      if (error) throw error;

      setReports(prev => 
        prev.map(r => r.id === report.id ? { ...r, pdf_enabled: !r.pdf_enabled } : r)
      );

      toast({
        title: isJapanese ? '更新完了' : 'Updated',
        description: isJapanese 
          ? `${report.title_ja}のPDFダウンロードを${!report.pdf_enabled ? '有効' : '無効'}にしました。`
          : `PDF download ${!report.pdf_enabled ? 'enabled' : 'disabled'} for ${report.title_en}.`,
      });
    } catch (error) {
      console.error('Error updating report:', error);
      toast({
        title: isJapanese ? 'エラー' : 'Error',
        description: isJapanese ? '更新に失敗しました。' : 'Failed to update.',
        variant: 'destructive',
      });
    } finally {
      setSaving(null);
    }
  };

  const updateWatermark = async (report: InsightReport, watermarkText: string) => {
    setSaving(report.id);
    try {
      const { error } = await supabase
        .from('insight_reports')
        .update({ watermark_text: watermarkText })
        .eq('id', report.id);

      if (error) throw error;

      setReports(prev => 
        prev.map(r => r.id === report.id ? { ...r, watermark_text: watermarkText } : r)
      );

      toast({
        title: isJapanese ? '更新完了' : 'Updated',
        description: isJapanese ? 'ウォーターマークを更新しました。' : 'Watermark updated.',
      });
    } catch (error) {
      console.error('Error updating watermark:', error);
      toast({
        title: isJapanese ? 'エラー' : 'Error',
        description: isJapanese ? '更新に失敗しました。' : 'Failed to update.',
        variant: 'destructive',
      });
    } finally {
      setSaving(null);
    }
  };

  const refreshContentVersion = async (report: InsightReport) => {
    setSaving(report.id);
    try {
      const { error } = await supabase
        .from('insight_reports')
        .update({ last_content_update: new Date().toISOString() })
        .eq('id', report.id);

      if (error) throw error;

      // Clear cache for this report
      await supabase
        .from('pdf_cache')
        .delete()
        .eq('report_slug', report.report_slug);

      setReports(prev => 
        prev.map(r => r.id === report.id ? { ...r, last_content_update: new Date().toISOString() } : r)
      );

      toast({
        title: isJapanese ? '更新完了' : 'Updated',
        description: isJapanese 
          ? 'コンテンツバージョンを更新し、キャッシュをクリアしました。' 
          : 'Content version updated and cache cleared.',
      });
    } catch (error) {
      console.error('Error refreshing content:', error);
      toast({
        title: isJapanese ? 'エラー' : 'Error',
        description: isJapanese ? '更新に失敗しました。' : 'Failed to update.',
        variant: 'destructive',
      });
    } finally {
      setSaving(null);
    }
  };

  const updateGlobalWatermark = async () => {
    setSaving('global');
    try {
      const { error } = await supabase
        .from('insight_reports')
        .update({ watermark_text: globalWatermark });

      if (error) throw error;

      setReports(prev => 
        prev.map(r => ({ ...r, watermark_text: globalWatermark }))
      );

      toast({
        title: isJapanese ? '更新完了' : 'Updated',
        description: isJapanese 
          ? 'すべてのレポートのウォーターマークを更新しました。' 
          : 'Updated watermark for all reports.',
      });
    } catch (error) {
      console.error('Error updating global watermark:', error);
      toast({
        title: isJapanese ? 'エラー' : 'Error',
        description: isJapanese ? '更新に失敗しました。' : 'Failed to update.',
        variant: 'destructive',
      });
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {isJapanese ? 'インサイトレポート管理' : 'Insight Reports Management'}
            </h1>
            <p className="text-muted-foreground">
              {isJapanese 
                ? 'PDFダウンロード設定とダウンロード履歴を管理します。' 
                : 'Manage PDF download settings and view download history.'}
            </p>
          </div>
          <Button onClick={fetchData} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            {isJapanese ? '更新' : 'Refresh'}
          </Button>
        </div>

        <Tabs defaultValue="reports" className="space-y-6">
          <TabsList>
            <TabsTrigger value="reports" className="gap-2">
              <FileText className="h-4 w-4" />
              {isJapanese ? 'レポート' : 'Reports'}
            </TabsTrigger>
            <TabsTrigger value="downloads" className="gap-2">
              <Download className="h-4 w-4" />
              {isJapanese ? 'ダウンロード履歴' : 'Download History'}
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              {isJapanese ? '全体設定' : 'Global Settings'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-4">
            {reports.map(report => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {isJapanese ? report.title_ja : report.title_en}
                      </CardTitle>
                      <CardDescription>
                        Slug: {report.report_slug}
                      </CardDescription>
                    </div>
                    <Badge variant={report.pdf_enabled ? 'default' : 'secondary'}>
                      {report.pdf_enabled 
                        ? (isJapanese ? 'PDF有効' : 'PDF Enabled')
                        : (isJapanese ? 'PDF無効' : 'PDF Disabled')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`pdf-toggle-${report.id}`}>
                      {isJapanese ? 'PDFダウンロードを有効化' : 'Enable PDF Download'}
                    </Label>
                    <Switch
                      id={`pdf-toggle-${report.id}`}
                      checked={report.pdf_enabled}
                      onCheckedChange={() => togglePdfEnabled(report)}
                      disabled={saving === report.id}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{isJapanese ? 'ウォーターマークテキスト' : 'Watermark Text'}</Label>
                    <div className="flex gap-2">
                      <Input
                        defaultValue={report.watermark_text}
                        onBlur={(e) => {
                          if (e.target.value !== report.watermark_text) {
                            updateWatermark(report, e.target.value);
                          }
                        }}
                        disabled={saving === report.id}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      {isJapanese ? '最終コンテンツ更新' : 'Last content update'}: {new Date(report.last_content_update).toLocaleString(isJapanese ? 'ja-JP' : 'en-US')}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => refreshContentVersion(report)}
                      disabled={saving === report.id}
                      className="gap-2"
                    >
                      {saving === report.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                      {isJapanese ? 'PDFを再生成' : 'Regenerate PDFs'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {reports.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  {isJapanese ? 'レポートがありません。' : 'No reports found.'}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="downloads">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {isJapanese ? '最近のダウンロード' : 'Recent Downloads'}
                </CardTitle>
                <CardDescription>
                  {isJapanese ? '直近50件のPDFダウンロード履歴' : 'Last 50 PDF downloads'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{isJapanese ? 'レポート' : 'Report'}</TableHead>
                      <TableHead>{isJapanese ? 'メール' : 'Email'}</TableHead>
                      <TableHead>{isJapanese ? '会社' : 'Company'}</TableHead>
                      <TableHead>{isJapanese ? '言語' : 'Language'}</TableHead>
                      <TableHead>{isJapanese ? '日時' : 'Date'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {downloads.map(download => (
                      <TableRow key={download.id}>
                        <TableCell className="font-medium">{download.report_slug}</TableCell>
                        <TableCell>{download.user_email}</TableCell>
                        <TableCell>{download.user_company || '-'}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {download.language.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(download.downloaded_at).toLocaleString(isJapanese ? 'ja-JP' : 'en-US')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {downloads.length === 0 && (
                  <div className="py-12 text-center text-muted-foreground">
                    {isJapanese ? 'ダウンロード履歴がありません。' : 'No download history.'}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>{isJapanese ? '全体設定' : 'Global Settings'}</CardTitle>
                <CardDescription>
                  {isJapanese 
                    ? 'すべてのレポートに適用される設定' 
                    : 'Settings applied to all reports'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>{isJapanese ? '全体ウォーターマーク' : 'Global Watermark'}</Label>
                  <div className="flex gap-2">
                    <Input
                      value={globalWatermark}
                      onChange={(e) => setGlobalWatermark(e.target.value)}
                      placeholder="For Premium Members of WaLen Only"
                    />
                    <Button 
                      onClick={updateGlobalWatermark}
                      disabled={saving === 'global'}
                    >
                      {saving === 'global' ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        isJapanese ? '全レポートに適用' : 'Apply to All'
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {isJapanese 
                      ? 'このテキストはすべてのPDFにウォーターマークとして表示されます。' 
                      : 'This text will be displayed as a watermark on all PDFs.'}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">
                    {isJapanese ? 'PDFセキュリティ機能' : 'PDF Security Features'}
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      {isJapanese ? 'ユーザーメールと会社名のウォーターマーク' : 'User email and company watermark'}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      {isJapanese ? 'ダウンロード日時の記録' : 'Download timestamp recording'}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      {isJapanese ? 'テキスト選択の無効化' : 'Text selection disabled'}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      {isJapanese ? '署名付きURL（1時間有効）' : 'Signed URLs (1-hour expiry)'}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      {isJapanese ? 'プレミアム会員認証' : 'Premium member authentication'}
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default InsightReportsPage;
