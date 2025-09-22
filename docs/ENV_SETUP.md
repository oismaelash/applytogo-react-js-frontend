# Environment Setup for Google Analytics

## Required Environment Variables

Create a `.env.local` file in the root directory with the following content:

```bash
# Google Analytics Configuration
# Get your tracking ID from Google Analytics 4
# Format: G-XXXXXXXXXX
VITE_GA_TRACKING_ID=your_ga_tracking_id_here
```

## How to get your Google Analytics Tracking ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property or use an existing one
3. Go to Admin > Data Streams
4. Select your web stream or create a new one
5. Copy the Measurement ID (starts with G-)

## Important Notes

- The tracking ID should start with "G-" for Google Analytics 4
- Google Analytics will only track in production mode
- Make sure to add `.env.local` to your `.gitignore` file to keep your tracking ID private
