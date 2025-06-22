// ✅ File: src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA98f-G1Vfj6jnZ-wh2QFsAf7qRbnse1QE",
  authDomain: "smart-digital-clinic.firebaseapp.com",
  projectId: "smart-digital-clinic",
  storageBucket: "smart-digital-clinic.appspot.com",
  messagingSenderId: "1049693608793",
  appId: "1:1049693608793:web:1a6372bcfd8a08b44f0a48",
  measurementId: "G-018VDWQYFQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
