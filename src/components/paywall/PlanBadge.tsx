import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Crown, Star, User, Shield, AlertTriangle } from 'lucide-react';
import { RoleName } from '@/types/paywall';
import { useI18n } from '@/i18n/I18nProvider';

interface PlanBadgeProps {
  plan: RoleName | string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export const PlanBadge: React.FC<PlanBadgeProps> = ({
  plan,
  size = 'md',
  showIcon = true,
  className = ''
}) => {
  const { t } = useI18n();
  const isJapanese = t('lang') === 'ja';

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1'
  };

  const iconSize = size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';

  const getPlanConfig = (planName: string) => {
    const normalizedPlan = planName.toUpperCase();
    
    switch (normalizedPlan) {
      case 'ADMIN':
        return {
          label: isJapanese ? '管理者' : 'Admin',
          icon: <Shield className={iconSize} />,
          variant: 'destructive' as const,
          className: 'bg-red-600 hover:bg-red-700 text-white'
        };
      case 'PREMIUM':
      case 'BUSINESS':
      case 'ENTERPRISE':
        return {
          label: isJapanese ? 'プレミアム' : 'Premium',
          icon: <Crown className={iconSize} />,
          variant: 'default' as const,
          className: 'bg-amber-500 hover:bg-amber-600 text-white'
        };
      case 'BASIC':
      case 'STARTER':
        return {
          label: isJapanese ? 'ベーシック' : 'Basic',
          icon: <Star className={iconSize} />,
          variant: 'secondary' as const,
          className: 'bg-blue-500 hover:bg-blue-600 text-white'
        };
      case 'FREE_TRIAL':
        return {
          label: isJapanese ? '無料トライアル' : 'Free Trial',
          icon: <Star className={iconSize} />,
          variant: 'outline' as const,
          className: 'border-green-500 text-green-600 bg-green-50 dark:bg-green-950/30'
        };
      case 'TRIAL_EXPIRED':
        return {
          label: isJapanese ? 'トライアル終了' : 'Trial Expired',
          icon: <AlertTriangle className={iconSize} />,
          variant: 'destructive' as const,
          className: 'bg-destructive/10 text-destructive border-destructive'
        };
      case 'GUEST':
      default:
        return {
          label: isJapanese ? '未登録' : 'Guest',
          icon: <User className={iconSize} />,
          variant: 'outline' as const,
          className: 'border-muted-foreground/50'
        };
    }
  };

  const config = getPlanConfig(plan);

  return (
    <Badge 
      variant={config.variant}
      className={`${sizeClasses[size]} ${config.className} ${className} flex items-center gap-1`}
    >
      {showIcon && config.icon}
      {config.label}
    </Badge>
  );
};

export default PlanBadge;
