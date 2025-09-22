import { useEffect } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import { useClickTracking } from '../hooks/useClickTracking';
import { useInteractionTracking } from '../hooks/useInteractionTracking';
import { useErrorTracking } from '../hooks/useErrorTracking';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

// Provider component to handle analytics tracking
export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  // Track route changes
  useAnalytics();

  // Track all click events
  useClickTracking({
    enabled: true,
    trackCardClicks: true,
    trackButtonClicks: true,
    trackLinkClicks: true,
    trackInputInteractions: true
  });

  // Track advanced interactions
  useInteractionTracking({
    enabled: true,
    trackScroll: true,
    trackHover: false, // Desabilitado por padrão para performance
    trackFocus: true,  // Habilitado para acessibilidade
    trackSectionViews: true,
    scrollThreshold: 50
  });

  // Track errors and performance
  useErrorTracking({
    enabled: true,
    trackJavaScriptErrors: true,
    trackNetworkErrors: false, // Implementar se necessário
    trackPerformance: true
  });

  return <>{children}</>;
};
