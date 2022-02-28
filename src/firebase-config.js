// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlK79TQJTq7sYBPpFb08YOcZbO5KOoiCA",
  authDomain: "myanimelist-9f64d.firebaseapp.com",
  projectId: "myanimelist-9f64d",
  storageBucket: "myanimelist-9f64d.appspot.com",
  messagingSenderId: "192826652487",
  appId: "1:192826652487:web:c9111898e0750c950b7e62",
  measurementId: "G-N41MS3Q6QX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()