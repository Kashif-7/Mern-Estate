// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-9f3ac.firebaseapp.com",
  projectId: "mern-estate-9f3ac",
  storageBucket: "mern-estate-9f3ac.firebasestorage.app",
  messagingSenderId: "646463041108",
  appId: "1:646463041108:web:14a59d0c8e4569167207c1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);