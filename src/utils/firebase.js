// Firebase configuration and initialization for authentication
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";


// Real Firebase config from user
const firebaseConfig = {
  apiKey: "AIzaSyAvUAIUODlDKg97eOWPIurrwMaVEjOolxE",
  authDomain: "futuremap-298f6.firebaseapp.com",
  projectId: "futuremap-298f6",
  storageBucket: "futuremap-298f6.firebasestorage.app",
  messagingSenderId: "9237721514",
  appId: "1:9237721514:web:f128b76e4e47314be13bd3",
  measurementId: "G-T5DPCQ22K2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, signInWithPopup, db, doc, setDoc, getDoc };
