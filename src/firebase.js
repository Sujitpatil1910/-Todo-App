// Import the necessary functions from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Auth for authentication

// Your Firebase configuration object (Replace with your actual values)
const firebaseConfig = {
  apiKey: "AIzaSyAv5fl_wnrOrSfgY7E6_SS7m40mbObXlKk",
  authDomain: "todo-app-533a7.firebaseapp.com",
  projectId: "todo-app-533a7",
  storageBucket: "todo-app-533a7.firebasestorage.app",
  messagingSenderId: "217387485482",
  appId: "1:217387485482:web:361e7027d2b16bd729f653",
  measurementId: "G-80BXD721BF"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it for use
export const auth = getAuth(app);

// Optionally, if you're using Firebase Analytics
// const analytics = getAnalytics(app);
