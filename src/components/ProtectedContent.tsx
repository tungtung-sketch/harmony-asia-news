import React from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { PaywallBanner } from './PaywallBanner';

interface ProtectedContentProps {
  children: React.ReactNode;
  requiredPlan: 'basic' | 'premium';
  previewContent?: React.ReactNode;
  className?: string;
}

export const ProtectedContent: React.FC<ProtectedContentProps> = ({ 
  children, 
  requiredPlan, 
  previewContent,
  className = ''
}) => {
  const { subscriptionStatus } = useSubscription();

  // Show loading state
  if (subscriptionStatus.loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
      </div>
    );
  }

  // User has no subscription - show preview + login banner
  if (!subscriptionStatus.isSubscribed || !subscriptionStatus.isActive) {
    return (
      <div className={className}>
        {previewContent && (
          <div className="mb-6">
            {previewContent}
          </div>
        )}
        <PaywallBanner type="login" />
      </div>
    );
  }

  // User has basic but content requires premium
  if (requiredPlan === 'premium' && subscriptionStatus.plan !== 'premium') {
    return (
      <div className={className}>
        {previewContent && (
          <div className="mb-6">
            {previewContent}
          </div>
        )}
        <PaywallBanner type="upgrade-premium" />
      </div>
    );
  }

  // User has sufficient access
  return <div className={className}>{children}</div>;
};