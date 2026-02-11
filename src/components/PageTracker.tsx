import React from 'react';
import { usePageTracking } from '@/hooks/usePageTracking';

/**
 * Wrapper component that enables page view tracking.
 * Must be rendered inside BrowserRouter.
 */
export const PageTracker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  usePageTracking();
  return <>{children}</>;
};
