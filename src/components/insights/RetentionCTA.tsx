import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Bell, TrendingUp } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { Link } from 'react-router-dom';

interface RetentionCTAProps {
  updateCount30Days: number;
  reportTitle: string;
  variant?: 'inline' | 'sticky';
  className?: string;
}

export const RetentionCTA: React.FC<RetentionCTAProps> = ({
  updateCount30Days,
  reportTitle,
  variant = 'inline',
  className = '',
}) => {
  const { lang } = useI18n();
  const isJapanese = lang === 'ja';

  if (variant === 'sticky') {
    return (
      <div className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-40 ${className}`}>
        <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/40 dark:border-amber-800 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-full shrink-0">
                <Bell className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">
                  {isJapanese 
                    ? `過去30日間で${updateCount30Days}件の更新` 
                    : `${updateCount30Days} updates in 30 days`}
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  {isJapanese 
                    ? '購読を解約すると、最新のインテリジェンス更新を見逃します' 
                    : 'Unsubscribing means missing ongoing intelligence updates'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className={`border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 ${className}`}>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-full shrink-0">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">
                {isJapanese 
                  ? `このインサイトは過去30日間で${updateCount30Days}回更新されました` 
                  : `This insight has been updated ${updateCount30Days} times in the past 30 days`}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {isJapanese 
                  ? 'プレミアム会員は継続的なインテリジェンス更新を受け取れます' 
                  : 'Premium members receive continuous intelligence updates'}
              </p>
            </div>
          </div>
          <Button asChild size="sm" className="shrink-0">
            <Link to="/subscribe">
              {isJapanese ? '詳細を見る' : 'Learn More'}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
