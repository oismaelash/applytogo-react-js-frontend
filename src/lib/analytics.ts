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

// Tracking específico para elementos da interface
export const trackButtonClick = (buttonText: string, buttonLocation?: string) => {
  trackEvent('button_click', 'ui_interaction', `${buttonLocation || 'unknown'}_${buttonText}`, undefined);
};

export const trackCardClick = (cardTitle: string, cardType: string) => {
  trackEvent('card_click', 'ui_interaction', `${cardType}_${cardTitle}`, undefined);
};

export const trackNavigationClick = (navItem: string, navLocation: string) => {
  trackEvent('navigation_click', 'navigation', `${navLocation}_${navItem}`, undefined);
};

export const trackFormInteraction = (formElement: string, action: string) => {
  trackEvent('form_interaction', 'form', `${formElement}_${action}`, undefined);
};

export const trackScrollInteraction = (scrollDirection: 'up' | 'down', scrollPosition: number) => {
  trackEvent('scroll', 'user_behavior', scrollDirection, scrollPosition);
};

export const trackHoverInteraction = (elementType: string, elementText: string) => {
  trackEvent('hover', 'user_behavior', `${elementType}_${elementText}`, undefined);
};

export const trackFocusInteraction = (elementType: string, elementText: string) => {
  trackEvent('focus', 'user_behavior', `${elementType}_${elementText}`, undefined);
};

export const trackPageSectionView = (sectionName: string) => {
  trackEvent('section_view', 'page_interaction', sectionName, undefined);
};
