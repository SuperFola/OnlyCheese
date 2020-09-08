'use strict';

import Firebase from '@firebase/app';
import config from '../config';

export const App = Firebase.initializeApp({
    apiKey: config.VUE_APP_FIREBASE_API_KEY,
    authDomain: config.VUE_APP_FIREBASE_AUTH_DOMAIN,
    storageBucket: config.VUE_APP_FIREBASE_STORAGE_BUCKET,
    databaseURL: config.VUE_APP_FIREBASE_DB_URL,
    projectId: config.VUE_APP_FIREBASE_PROJECT_ID,
    messagingSenderId: config.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
});