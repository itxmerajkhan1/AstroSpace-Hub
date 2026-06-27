import { analytics } from './config';
import { logEvent } from 'firebase/analytics';

/**
 * Analytics service for tracking user behavior.
 */
export const analyticsService = {
  logCustomEvent: (eventName: string, eventParams?: { [key: string]: any }) => logEvent(analytics, eventName, eventParams),
};
