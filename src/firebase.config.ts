// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDZoCS556oFLyirjun7ZvuEBirG8_N8n6k",
  authDomain: "forceai-95819.firebaseapp.com",
  projectId: "forceai-95819",
  storageBucket: "forceai-95819.appspot.com",
  messagingSenderId: "957144675680",
  appId: "1:957144675680:web:171e1625a87632a2b41a05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()