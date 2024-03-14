import { initializeApp } from 'firebase/app';
// import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAl62MP5BOdXAjR8soobfvMBPFHZuEDhaY",
  authDomain: "fir-chatbe.firebaseapp.com",
  projectId: "fir-chatbe",
  storageBucket: "fir-chatbe.appspot.com",
  messagingSenderId: "392413950775",
  appId: "1:392413950775:web:de3ae0f276e993b78e20b2",
  measurementId: "G-YMWNW73YSJ"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB  = getFirestore(FIREBASE_APP);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
