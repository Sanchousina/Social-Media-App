// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "social-media-app-eb0ff.firebaseapp.com",
  projectId: "social-media-app-eb0ff",
  storageBucket: "social-media-app-eb0ff.appspot.com",
  messagingSenderId: "364221921075",
  appId: "1:364221921075:web:6602832eb037bb6c513046"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);