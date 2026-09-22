import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBDTSo4yj_tuK7fUc8Z99jgKDbV5-AjI40",
  authDomain: "e-commerce-e28cb.firebaseapp.com",
  projectId: "e-commerce-e28cb",
  storageBucket: "e-commerce-e28cb.firebasestorage.app",
  messagingSenderId: "523331992170",
  appId: "1:523331992170:web:bc8be96930d13a780f6813",
  measurementId: "G-S927H9FTX2"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
