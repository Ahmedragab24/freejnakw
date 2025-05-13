// Firebase configuration and initialization
'use client';

import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUB-wNYnFb7LtcUWI5ixIjIO2JiiyB5yE",
  authDomain: "freejnakw.firebaseapp.com",
  projectId: "freejnakw",
  storageBucket: "freejnakw.appspot.com",
  messagingSenderId: "785046690011",
  appId: "1:785046690011:web:041bdc54869f05e06414fe",
  measurementId: "G-CKXBL3EB8S"
};

// Initialize Firebase
let app;
let analytics = null;

// Initialize Firebase only on the client side
export const initFirebase = async () => {
  if (typeof window !== 'undefined') {
    app = initializeApp(firebaseConfig);
    
    // Check if analytics is supported before initializing
    if (await isSupported()) {
      analytics = getAnalytics(app);
      console.log('Firebase Analytics initialized');
    }
  }
  return { app, analytics };
};

export { analytics };
