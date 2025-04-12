// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-19f31.firebaseapp.com",
  projectId: "mern-blog-19f31",
  storageBucket: "mern-blog-19f31.firebasestorage.app",
  messagingSenderId: "726562052444",
  appId: "1:726562052444:web:1cb298beaef0fe58040999"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);