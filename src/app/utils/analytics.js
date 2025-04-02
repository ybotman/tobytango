/**
 * Track a page view with Google Analytics
 * @param {string} url - The URL to track
 */
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

/**
 * Track an event with Google Analytics
 * @param {string} action - The event action
 * @param {object} params - Additional event parameters
 */
export const event = ({ action, category, label, value, ...params }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...params,
    });
  }
};

/**
 * Examples of event tracking:
 * 
 * // Track a button click
 * event({
 *   action: 'click',
 *   category: 'button',
 *   label: 'download_pdf',
 * });
 * 
 * // Track a video play
 * event({
 *   action: 'play',
 *   category: 'video',
 *   label: 'tango_tutorial',
 *   value: 1,
 * });
 * 
 * // Track a form submission
 * event({
 *   action: 'submit',
 *   category: 'form',
 *   label: 'contact_form',
 * });
 */