import ReactGA from 'react-ga4';

// Google Analytics configuration
export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || '';

// Initialize Google Analytics
export const initializeGA = () => {
  if (GA_TRACKING_ID && import.meta.env.PROD) {
    ReactGA.initialize(GA_TRACKING_ID);
    console.log('Google Analytics initialized');
  } else {
    console.log('Google Analytics not initialized (development mode or missing tracking ID)');
  }
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  if (GA_TRACKING_ID && import.meta.env.PROD) {
    ReactGA.send({ 
      hitType: 'pageview', 
      page: path,
      title: title || document.title 
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (GA_TRACKING_ID && import.meta.env.PROD) {
    ReactGA.event({
      action,
      category,
      label,
      value,
    });
  }
};

// Common tracking events for job sites
export const trackJobSiteClick = (siteName: string, siteUrl: string) => {
  trackEvent('click', 'job_site', siteName, undefined);
  trackEvent('click', 'external_link', siteUrl, undefined);
};

export const trackSearch = (searchTerm: string) => {
  trackEvent('search', 'job_search', searchTerm);
};

export const trackNewsletterSignup = (email: string) => {
  trackEvent('sign_up', 'newsletter', email);
};

export const trackFilterUsage = (filterType: string, filterValue: string) => {
  trackEvent('filter', filterType, filterValue);
};
