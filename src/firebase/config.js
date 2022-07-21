// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/firestore'
import 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxtrhXnwuuwAmn0MBqvmkEKQPbdcxcYsk",
  authDomain: "onoff-clone-4e00e.firebaseapp.com",
  projectId: "onoff-clone-4e00e",
  storageBucket: "onoff-clone-4e00e.appspot.com",
  messagingSenderId: "337994137466",
  appId: "1:337994137466:web:084ecc9cea3d96d971a0c3",
  measurementId: "G-1B8DGS9K92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth()

export {db, auth}