import React from 'react';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, RefreshCw } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { format } from 'date-fns';

interface BaseReportHeaderProps {
  version?: string;
  lastUpdated?: string;
  className?: string;
}

export const BaseReportHeader: React.FC<BaseReportHeaderProps> = ({
  version = '1.0',
  lastUpdated,
  className = '',
}) => {
  const { lang } = useI18n();
  const isJapanese = lang === 'ja';

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'yyyy-MM-dd');
    } catch {
      return dateStr;
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border/50 ${className}`}>
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-primary" />
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          {isJapanese ? 'ベースレポート' : 'Base Report'}
        </Badge>
      </div>
      
      {version && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <RefreshCw className="h-3 w-3" />
          <span>v{version}</span>
        </div>
      )}

      {lastUpdated && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>
            {isJapanese ? 'ベースレポート更新: ' : 'Base Report Updated: '}
            {formatDate(lastUpdated)}
          </span>
        </div>
      )}

      <p className="text-xs text-muted-foreground ml-auto hidden sm:block">
        {isJapanese 
          ? '四半期ごとに更新される包括的リファレンス' 
          : 'Comprehensive reference updated quarterly'}
      </p>
    </div>
  );
};
