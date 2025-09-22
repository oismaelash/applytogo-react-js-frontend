import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/analytics';

// Hook to track page views on route changes
export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when route changes
    trackPageView(location.pathname + location.search);
  }, [location]);
};
