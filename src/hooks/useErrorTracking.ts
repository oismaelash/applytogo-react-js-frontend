import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

interface ErrorTrackingOptions {
  enabled?: boolean;
  trackJavaScriptErrors?: boolean;
  trackNetworkErrors?: boolean;
  trackPerformance?: boolean;
}

// Hook para tracking de erros e performance
export const useErrorTracking = (options: ErrorTrackingOptions = {}) => {
  const {
    enabled = true,
    trackJavaScriptErrors = true,
    trackNetworkErrors = true,
    trackPerformance = true
  } = options;

  useEffect(() => {
    if (!enabled) return;

    // Tracking de erros JavaScript
    if (trackJavaScriptErrors) {
      const handleError = (event: ErrorEvent) => {
        trackEvent('javascript_error', 'error', `${event.filename}:${event.lineno}`, undefined);
      };

      const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
        trackEvent('promise_rejection', 'error', event.reason?.toString() || 'Unknown', undefined);
      };

      window.addEventListener('error', handleError);
      window.addEventListener('unhandledrejection', handleUnhandledRejection);

      return () => {
        window.removeEventListener('error', handleError);
        window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      };
    }
  }, [enabled, trackJavaScriptErrors]);

  // Tracking de performance
  useEffect(() => {
    if (!enabled || !trackPerformance) return;

    const trackPerformanceMetrics = () => {
      if (typeof window !== 'undefined' && window.performance) {
        // Core Web Vitals
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          // Page Load Time
          const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
          if (loadTime > 0) {
            trackEvent('page_load_time', 'performance', 'load_time', Math.round(loadTime));
          }

          // DOM Content Loaded
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
          if (domContentLoaded > 0) {
            trackEvent('dom_content_loaded', 'performance', 'dom_ready', Math.round(domContentLoaded));
          }

          // First Contentful Paint
          const fcp = performance.getEntriesByName('first-contentful-paint')[0] as PerformanceEntry;
          if (fcp) {
            trackEvent('first_contentful_paint', 'performance', 'fcp', Math.round(fcp.startTime));
          }
        }

        // Largest Contentful Paint
        const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
        if (lcpEntries.length > 0) {
          const lcp = lcpEntries[lcpEntries.length - 1] as PerformanceEntry;
          trackEvent('largest_contentful_paint', 'performance', 'lcp', Math.round(lcp.startTime));
        }

        // Cumulative Layout Shift
        const clsEntries = performance.getEntriesByType('layout-shift');
        let clsValue = 0;
        clsEntries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        if (clsValue > 0) {
          trackEvent('cumulative_layout_shift', 'performance', 'cls', Math.round(clsValue * 1000));
        }
      }
    };

    // Track performance após carregamento completo
    const timer = setTimeout(trackPerformanceMetrics, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [enabled, trackPerformance]);

  return null;
};
