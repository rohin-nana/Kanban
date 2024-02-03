// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzRs9-oSjQkuSWiwZ0YS_hnOFiLtuPwbw",
  authDomain: "kanban-78418.firebaseapp.com",
  projectId: "kanban-78418",
  storageBucket: "kanban-78418.appspot.com",
  messagingSenderId: "641216877438",
  appId: "1:641216877438:web:0766541c95b15ed4bf992f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);