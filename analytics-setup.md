# Google Analytics and Tag Manager Setup

This document provides instructions for setting up and using Google Analytics and Google Tag Manager with your TobyTango website.

## Initial Setup

### 1. Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/) and sign in with your Google account
2. Create a new property:
   - Click on "Admin" in the bottom left
   - In the Property column, click "Create Property"
   - Choose "Web" as the platform
   - Enter your website details
   - Follow the prompts to complete the setup
3. Once created, you'll receive a Measurement ID that starts with "G-"
4. Copy this ID for use in the next steps

### 2. Create Google Tag Manager Account

1. Go to [Google Tag Manager](https://tagmanager.google.com/) and sign in with your Google account
2. Create a new account:
   - Click "Create Account"
   - Enter an account name (e.g., "TobyTango")
   - Enter a container name (e.g., "Web")
   - Select "Web" as the target platform
   - Click "Create"
3. Accept the Terms of Service
4. You'll be given GTM installation code. Your GTM ID is the code that looks like "GTM-XXXXXXX"
5. Copy this ID for use in the next steps

### 3. Update Environment Variables

1. Edit the `.env.local` file at the root of your project
2. Replace the placeholder values with your actual IDs:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Replace with your actual Google Analytics ID
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX             # Replace with your actual Google Tag Manager ID
```

## Advanced Setup (in Google Tag Manager interface)

### Connect GA4 to GTM

1. In Google Tag Manager, go to "Tags" and click "New"
2. Name your tag (e.g., "GA4 Configuration")
3. Click "Tag Configuration" and select "Google Analytics: GA4 Configuration"
4. Enter your Measurement ID (G-XXXXXXXXXX)
5. For "Triggering", select "All Pages"
6. Save the tag

### Adding Custom Event Tracking

1. In Google Tag Manager, go to "Variables" and click "Configure"
2. Enable the built-in variables you want to track (e.g., Click URL, Click Text)
3. Create a new tag:
   - Click "Tags" and then "New"
   - Name your tag (e.g., "GA4 - Video Play Event")
   - Choose "Google Analytics: GA4 Event"
   - Enter the event name (e.g., "video_play")
   - Add any parameters you want to track
   - Create a trigger for when this event should fire

## Using Analytics in Your Code

### Page Views

Page views are automatically tracked on route changes, but you can manually track them too:

```javascript
import { pageview } from '../utils/analytics';

// Track a page view
pageview('/some-path');
```

### Custom Events

For tracking custom events (like button clicks, form submissions, video plays):

```javascript
import { event } from '../utils/analytics';

// Example: Track a button click
event({
  action: 'click',
  category: 'button',
  label: 'download_pdf',
});

// Example: Track a form submission
event({
  action: 'submit',
  category: 'form',
  label: 'contact_form',
});

// Example: Track a video play
event({
  action: 'play',
  category: 'video',
  label: 'tango_tutorial_1',
  value: 1,
});
```

## Viewing Analytics Data

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. Explore the different reports available:
   - Real-time: See who's on your site right now
   - Acquisition: Understand where your traffic is coming from
   - Engagement: See what content users are interacting with
   - Monetization: Track any revenue-generating activities
   - Demographics: Learn about your audience

## Troubleshooting

- **Events not showing up?** Make sure your GTM container is published after making changes.
- **No data in Analytics?** Verify your Measurement ID is correct and that you don't have ad-blockers enabled during testing.
- **Need to debug?** Install the "Tag Assistant" Chrome extension to see if tags are firing correctly.

Remember to respect user privacy and comply with relevant regulations like GDPR and CCPA by implementing proper consent management before enabling tracking.