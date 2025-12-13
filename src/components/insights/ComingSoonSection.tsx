import { Crown, Clock, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/i18n/I18nProvider';

interface ComingSoonSectionProps {
  industry: string;
  industryJa?: string;
}

export const ComingSoonSection = ({ industry, industryJa }: ComingSoonSectionProps) => {
  const { lang } = useI18n();
  const isJapanese = lang === 'ja';

  const displayIndustry = isJapanese && industryJa ? industryJa : industry;

  return (
    <div className="p-8 rounded-lg border border-muted bg-muted/30">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-muted flex-shrink-0">
          <Clock className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="text-xs">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
            <Badge variant="outline" className="text-xs">
              {isJapanese ? '準備中' : 'Coming Soon'}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            {isJapanese 
              ? `${displayIndustry}インテリジェンスレポート`
              : `${displayIndustry} Intelligence Reports`
            }
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {isJapanese 
              ? `新しい${displayIndustry}インテリジェンスレポートを準備中です。プレミアム会員様には、公開次第すぐにアクセスいただけます。`
              : `New ${displayIndustry} intelligence reports are in preparation. Premium members will receive access as soon as they are released.`
            }
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Bell className="h-3 w-3" />
            {isJapanese 
              ? 'プレミアム会員には公開時に通知されます'
              : 'Premium members will be notified upon release'
            }
          </div>
        </div>
      </div>
    </div>
  );
};
