
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const app = initializeApp({
    apiKey: "AIzaSyA82nT3rO8xM7I1wUnewokwINFM8WoQDE8",
    authDomain: "demos-99513.firebaseapp.com",
    projectId: "demos-99513",
    storageBucket: "demos-99513.appspot.com",
    messagingSenderId: "565290370696",
    appId: "1:565290370696:web:1b06acf90d7c9868ee413d",
    measurementId: "G-PY9M0F2BQ0"
  });

export const db = getFirestore(app);
