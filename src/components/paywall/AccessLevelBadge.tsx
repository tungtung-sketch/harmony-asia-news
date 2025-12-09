import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Lock, Unlock, Crown, Shield } from 'lucide-react';
import { AccessLevel } from '@/types/paywall';
import { useI18n } from '@/i18n/I18nProvider';

interface AccessLevelBadgeProps {
  accessLevel: AccessLevel;
  size?: 'sm' | 'md';
  className?: string;
}

export const AccessLevelBadge: React.FC<AccessLevelBadgeProps> = ({
  accessLevel,
  size = 'sm',
  className = ''
}) => {
  const { t } = useI18n();
  const isJapanese = t('lang') === 'ja';

  const getConfig = () => {
    switch (accessLevel) {
      case 'free':
        return {
          label: isJapanese ? '無料' : 'Free',
          icon: <Unlock className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />,
          className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200'
        };
      case 'basic':
        return {
          label: isJapanese ? 'ベーシック' : 'Basic',
          icon: <Lock className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />,
          className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200'
        };
      case 'premium':
        return {
          label: isJapanese ? 'プレミアム' : 'Premium',
          icon: <Crown className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />,
          className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200'
        };
      case 'admin_only':
        return {
          label: isJapanese ? '管理者限定' : 'Admin Only',
          icon: <Shield className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />,
          className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200'
        };
      default:
        return {
          label: accessLevel,
          icon: <Lock className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />,
          className: 'bg-muted text-muted-foreground'
        };
    }
  };

  const config = getConfig();

  return (
    <Badge 
      variant="outline"
      className={`${config.className} ${className} flex items-center gap-1 ${
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1'
      }`}
    >
      {config.icon}
      {config.label}
    </Badge>
  );
};

export default AccessLevelBadge;
