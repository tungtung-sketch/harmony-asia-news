import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, ArrowRight, Clock, Lock, ChevronDown, ChevronUp, TrendingUp } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { usePaywall } from '@/hooks/usePaywall';
import { Link } from 'react-router-dom';
import { differenceInDays, format } from 'date-fns';

interface LivingUpdate {
  id: string;
  update_date: string;
  headline_en: string;
  headline_ja: string;
  description_en: string;
  description_ja: string;
  tag: string | null;
  related_section: string | null;
}

interface LivingUpdatesProps {
  updates: LivingUpdate[];
  reportSlug: string;
  lastUpdateDate?: string;
  updateCount30Days?: number;
  onSectionClick?: (sectionId: string) => void;
  className?: string;
}

const tagColors: Record<string, string> = {
  policy: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  market: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  competitor: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  workforce: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  investment: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
};

const tagLabels: Record<string, { en: string; ja: string }> = {
  policy: { en: 'Policy', ja: '政策' },
  market: { en: 'Market', ja: '市場' },
  competitor: { en: 'Competitor', ja: '競合' },
  workforce: { en: 'Workforce', ja: '人材' },
  investment: { en: 'Investment', ja: '投資' },
};

export const LivingUpdates: React.FC<LivingUpdatesProps> = ({
  updates,
  reportSlug,
  lastUpdateDate,
  updateCount30Days = 0,
  onSectionClick,
  className = '',
}) => {
  const { lang } = useI18n();
  const isJapanese = lang === 'ja';
  const { userContext } = usePaywall();
  const isPremium = userContext.role === 'PREMIUM' || userContext.role === 'ADMIN';
  const [expanded, setExpanded] = useState(false);

  const visibleUpdates = expanded ? updates : updates.slice(0, 3);

  const isNewUpdate = (dateStr: string) => {
    const updateDate = new Date(dateStr);
    const daysDiff = differenceInDays(new Date(), updateDate);
    return daysDiff <= 14;
  };

  const formatUpdateDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, 'yyyy-MM-dd');
  };

  if (!isPremium) {
    return (
      <Card className={`border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 ${className}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">
              {isJapanese ? 'Living Updates｜最新動向' : 'Living Updates'}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Lock className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">
              {isJapanese 
                ? '最新のインテリジェンス更新はプレミアム会員限定です' 
                : 'Latest intelligence updates available for Premium members'}
            </p>
            {updateCount30Days > 0 && (
              <p className="text-sm text-primary font-medium mb-4">
                {isJapanese 
                  ? `過去30日間で${updateCount30Days}件の更新がありました` 
                  : `${updateCount30Days} updates in the past 30 days`}
              </p>
            )}
            <Button asChild>
              <Link to="/subscribe">
                {isJapanese ? 'プレミアムにアップグレード' : 'Upgrade to Premium'}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-secondary/5 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg">
              {isJapanese ? 'Living Updates｜最新動向' : 'Living Updates'}
            </CardTitle>
            {updates.length > 0 && isNewUpdate(updates[0].update_date) && (
              <Badge className="bg-red-500 text-white text-xs animate-pulse">
                NEW
              </Badge>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-muted-foreground">
            {lastUpdateDate && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {isJapanese ? '最終更新: ' : 'Last Update: '}
                {formatUpdateDate(lastUpdateDate)}
              </span>
            )}
            {updateCount30Days > 0 && (
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-primary" />
                {isJapanese 
                  ? `過去30日: ${updateCount30Days}件更新` 
                  : `${updateCount30Days} updates (30d)`}
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {visibleUpdates.map((update, index) => (
          <div 
            key={update.id} 
            className={`p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors ${
              index === 0 && isNewUpdate(update.update_date) ? 'ring-1 ring-primary/20' : ''
            }`}
          >
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono text-muted-foreground">
                [{formatUpdateDate(update.update_date)}]
              </span>
              {update.tag && (
                <Badge variant="secondary" className={`text-xs ${tagColors[update.tag] || ''}`}>
                  {isJapanese ? tagLabels[update.tag]?.ja : tagLabels[update.tag]?.en}
                </Badge>
              )}
              {isNewUpdate(update.update_date) && (
                <Badge className="bg-red-500 text-white text-xs">NEW</Badge>
              )}
            </div>
            <p className="font-medium text-sm mb-1">
              {isJapanese ? update.headline_ja : update.headline_en}
            </p>
            <p className="text-sm text-muted-foreground">
              → {isJapanese ? update.description_ja : update.description_en}
            </p>
            {update.related_section && onSectionClick && (
              <button 
                onClick={() => onSectionClick(update.related_section!)}
                className="text-xs text-primary hover:underline mt-2 flex items-center gap-1"
              >
                {isJapanese ? '関連セクションを見る' : 'View related section'}
                <ArrowRight className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}

        {updates.length > 3 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
            className="w-full"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                {isJapanese ? '折りたたむ' : 'Show less'}
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                {isJapanese ? `さらに${updates.length - 3}件表示` : `Show ${updates.length - 3} more`}
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
