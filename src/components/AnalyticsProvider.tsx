import { useEffect } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

// Provider component to handle analytics tracking
export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  // Track route changes
  useAnalytics();

  return <>{children}</>;
};
