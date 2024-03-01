// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCjyrqN1Y24E6RY08hirWpAhjhtp7mcLgw",
  authDomain: "chitchat-8c63f.firebaseapp.com",
  projectId: "chitchat-8c63f",
  storageBucket: "chitchat-8c63f.appspot.com",
  messagingSenderId: "801378367599",
  appId: "1:801378367599:web:354c8f0ddf8dd9e429759a",
  measurementId: "G-ZLN8F0STCV"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth=getAuth();
 export const storage=getStorage();
 export const db=getFirestore();


