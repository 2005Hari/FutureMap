// Firebase configuration and initialization for authentication
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";


// Real Firebase config from user
const firebaseConfig = {
  apiKey: "AIzaSyBOAEU6Hq2o3z8eXGCnBwFhzK5HBwuSZ0",
  authDomain: "futuremap-b92d5.firebaseapp.com",
  projectId: "futuremap-b92d5",
  storageBucket: "futuremap-b92d5.appspot.com",
  messagingSenderId: "965224181982",
  appId: "1:965224181982:web:239c8592ca200580899524f",
  measurementId: "G-NCMQSZT4PB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, signInWithPopup, db, doc, setDoc, getDoc };
