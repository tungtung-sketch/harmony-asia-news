import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye, FileText, RefreshCw, Crown, Clock, ChevronRight } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { useInsightReadingHistory } from '@/hooks/useInsightReadingHistory';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface ReportWithUpdate {
  id: string;
  report_slug: string;
  report_title: string;
  industry_category: string;
  read_at: string;
  report_url: string;
  hasUpdate: boolean;
}

export const InsightReadingHistory = () => {
  const { lang } = useI18n();
  const { entries, loading, error, checkForUpdates } = useInsightReadingHistory();
  const [entriesWithUpdates, setEntriesWithUpdates] = useState<ReportWithUpdate[]>([]);
  const [checking, setChecking] = useState(false);

  const isJapanese = lang === 'ja';

  // Check for updates on each entry
  useEffect(() => {
    const checkAllUpdates = async () => {
      if (entries.length === 0) return;
      
      setChecking(true);
      const updated: ReportWithUpdate[] = await Promise.all(
        entries.map(async (entry) => {
          const hasUpdate = await checkForUpdates(entry.report_slug);
          return { ...entry, hasUpdate };
        })
      );
      setEntriesWithUpdates(updated);
      setChecking(false);
    };

    checkAllUpdates();
  }, [entries]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isJapanese) {
      return format(date, 'yyyy年M月d日 HH:mm', { locale: ja });
    }
    return format(date, 'MMM d, yyyy h:mm a');
  };

  if (loading || checking) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {isJapanese ? 'インサイトレポート閲覧履歴' : 'Insight Report History'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4 p-3 border rounded-lg">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (entries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {isJapanese ? 'インサイトレポート閲覧履歴' : 'Insight Report History'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-2 opacity-30" />
            <p className="mb-4">
              {isJapanese 
                ? 'まだプレミアムレポートを閲覧していません'
                : 'No premium reports viewed yet'
              }
            </p>
            <Button asChild variant="outline">
              <Link to="/insights">
                {isJapanese ? 'レポートを探す' : 'Browse Reports'}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {isJapanese ? 'インサイトレポート閲覧履歴' : 'Insight Report History'}
          <Badge variant="secondary" className="ml-2">
            <Crown className="h-3 w-3 mr-1" />
            Premium
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {entriesWithUpdates.map((entry) => (
            <Link 
              key={entry.id} 
              to={entry.report_url}
              className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-amber-500/10 flex-shrink-0">
                <FileText className="h-6 w-6 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">
                    {entry.industry_category}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <Eye className="h-3 w-3 mr-1" />
                    {isJapanese ? '閲覧済み' : 'Viewed'}
                  </Badge>
                  {entry.hasUpdate && (
                    <Badge className="text-xs bg-primary text-primary-foreground animate-pulse">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      {isJapanese ? '更新あり' : 'Updated'}
                    </Badge>
                  )}
                </div>
                <h4 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                  {entry.report_title}
                </h4>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {isJapanese ? '最終閲覧: ' : 'Last read: '}
                  {formatDate(entry.read_at)}
                </div>
                {entry.hasUpdate && (
                  <p className="text-xs text-primary mt-1">
                    {isJapanese 
                      ? 'このレポートには前回閲覧後に新しい更新があります'
                      : 'This report has new updates since your last visit'
                    }
                  </p>
                )}
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </Link>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Button asChild variant="outline">
            <Link to="/insights">
              {isJapanese ? 'すべてのレポートを見る' : 'View All Reports'}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
