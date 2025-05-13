'use client';

import { useEffect } from 'react';
import { initFirebase } from '@/utils/firebase';
import { logEvent, setCurrentScreen } from 'firebase/analytics';

export default function FirebaseAnalytics() {
  useEffect(() => {
    // Initialize Firebase when component mounts
    const initAnalytics = async () => {
      const { analytics } = await initFirebase();
      
      if (analytics) {
        // Log page view
        logEvent(analytics, 'page_view');
        
        // Set current screen
        const pathname = window.location.pathname;
        setCurrentScreen(analytics, pathname);
        
        // Add route change listener for Next.js
        const handleRouteChange = (url) => {
          setCurrentScreen(analytics, url);
          logEvent(analytics, 'page_view', { page_path: url });
        };
        
        // Clean up event listener on unmount
        return () => {
          // No cleanup needed for this basic implementation
        };
      }
    };
    
    initAnalytics();
  }, []);
  
  // This component doesn't render anything
  return null;
}
