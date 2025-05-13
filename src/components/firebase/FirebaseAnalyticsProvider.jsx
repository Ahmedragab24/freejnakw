'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the FirebaseAnalytics component with SSR disabled
const FirebaseAnalytics = dynamic(
  () => import('./FirebaseAnalytics'),
  { ssr: false }
);

export default function FirebaseAnalyticsProvider() {
  return <FirebaseAnalytics />;
}
