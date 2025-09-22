# Google Analytics Implementation

This project includes a complete Google Analytics 4 (GA4) implementation with custom event tracking for better insights into user behavior.

## Features

✅ **Automatic page view tracking** - Tracks all route changes  
✅ **Custom event tracking** - Tracks specific user interactions  
✅ **Development mode protection** - Only tracks in production  
✅ **TypeScript support** - Fully typed analytics functions  
✅ **React integration** - Easy to use hooks and components  

## Tracked Events

### Page Views
- Automatically tracks all page navigation
- Includes route changes and initial page load

### Job Site Interactions
- **Job site clicks**: Tracks when users click on job site cards
- **External link clicks**: Tracks clicks on external job site URLs

### Search & Filter Usage
- **Search queries**: Tracks search terms users enter
- **Category filters**: Tracks which categories users filter by

### Newsletter
- **Newsletter signups**: Tracks email subscriptions (without storing email addresses)

## Setup Instructions

1. **Create a Google Analytics 4 property**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new GA4 property
   - Get your Measurement ID (starts with G-)

2. **Configure environment variables**
   - Create a `.env.local` file in the project root
   - Add your tracking ID:
   ```bash
   VITE_GA_TRACKING_ID=G-XXXXXXXXXX
   ```

3. **Deploy to production**
   - Google Analytics only tracks in production mode
   - Development mode shows console logs instead of tracking

## File Structure

```
src/
├── lib/
│   └── analytics.ts          # Main analytics configuration and functions
├── hooks/
│   └── useAnalytics.ts       # Hook for automatic route tracking
├── components/
│   ├── AnalyticsProvider.tsx # Provider component for analytics
│   ├── JobSiteCard.tsx       # Enhanced with click tracking
│   ├── Newsletter.tsx        # Enhanced with signup tracking
│   └── SearchFilter.tsx      # Enhanced with search/filter tracking
└── App.tsx                   # Analytics initialization
```

## Usage Examples

### Manual Event Tracking

```typescript
import { trackEvent, trackJobSiteClick } from '@/lib/analytics';

// Track custom events
trackEvent('button_click', 'navigation', 'header_menu');

// Track job site interactions
trackJobSiteClick('LinkedIn Jobs', 'https://linkedin.com/jobs');
```

### Available Tracking Functions

- `trackPageView(path, title?)` - Track page views
- `trackEvent(action, category, label?, value?)` - Track custom events
- `trackJobSiteClick(siteName, siteUrl)` - Track job site clicks
- `trackSearch(searchTerm)` - Track search queries
- `trackNewsletterSignup(email)` - Track newsletter signups
- `trackFilterUsage(filterType, filterValue)` - Track filter usage

## Privacy & Performance

- **Privacy**: No personal data is stored, only anonymous usage statistics
- **Performance**: Analytics scripts load asynchronously and don't block the UI
- **GDPR**: Consider implementing cookie consent for EU users
- **Development**: Analytics are disabled in development mode

## Verification

To verify Google Analytics is working:

1. Deploy to production with your tracking ID
2. Visit your website and perform tracked actions
3. Check Google Analytics Real-time reports
4. Look for events in the Events section

## Troubleshooting

- **No data in GA**: Ensure you're using the correct tracking ID and deployed to production
- **Development tracking**: Analytics are intentionally disabled in development mode
- **Missing events**: Check browser console for any JavaScript errors
- **Environment variables**: Ensure `.env.local` is properly configured

## Customization

You can easily add more tracking by:

1. Import tracking functions from `@/lib/analytics`
2. Add tracking calls to component event handlers
3. Create custom event categories for better organization

Example:
```typescript
import { trackEvent } from '@/lib/analytics';

const handleCustomAction = () => {
  trackEvent('custom_action', 'feature_name', 'button_label');
  // Your component logic here
};
```
