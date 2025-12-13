import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Crown, FileText, RefreshCw, Clock } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface InsightReportCardProps {
  title: string;
  titleJa: string;
  description: string;
  descriptionJa: string;
  industry: string;
  industryJa: string;
  reportType: 'base' | 'update';
  lastUpdated: string;
  link: string;
  isPremium?: boolean;
  updateCount?: number;
}

export const InsightReportCard = ({
  title,
  titleJa,
  description,
  descriptionJa,
  industry,
  industryJa,
  reportType,
  lastUpdated,
  link,
  isPremium = true,
  updateCount = 0
}: InsightReportCardProps) => {
  const { lang } = useI18n();
  const isJapanese = lang === 'ja';

  const displayTitle = isJapanese ? titleJa : title;
  const displayDescription = isJapanese ? descriptionJa : description;
  const displayIndustry = isJapanese ? industryJa : industry;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isJapanese) {
      return format(date, 'yyyy年M月d日', { locale: ja });
    }
    return format(date, 'MMM d, yyyy');
  };

  return (
    <Link 
      to={link}
      className="group block p-6 rounded-lg border-2 border-amber-500/30 bg-gradient-to-r from-amber-500/5 to-transparent hover:border-amber-500/50 hover:shadow-lg transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-amber-500/10 flex-shrink-0">
          <FileText className="h-8 w-8 text-amber-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {isPremium && (
              <Badge className="bg-amber-500 text-white hover:bg-amber-600">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            )}
            <Badge variant="outline" className="text-xs">
              {displayIndustry}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {reportType === 'base' 
                ? (isJapanese ? 'ベースレポート' : 'Base Report')
                : (isJapanese ? 'アップデート' : 'Update')
              }
            </Badge>
            {updateCount > 0 && (
              <Badge variant="outline" className="text-xs text-primary border-primary/30 bg-primary/5">
                <RefreshCw className="h-3 w-3 mr-1" />
                {isJapanese ? `過去30日間に${updateCount}件更新` : `${updateCount} updates in 30 days`}
              </Badge>
            )}
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {displayTitle}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {displayDescription}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {isJapanese ? '最終更新: ' : 'Updated: '}
            {formatDate(lastUpdated)}
          </div>
        </div>
      </div>
    </Link>
  );
};
