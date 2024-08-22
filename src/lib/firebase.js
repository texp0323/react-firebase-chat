import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-9ef1f.firebaseapp.com",
  projectId: "reactchat-9ef1f",
  storageBucket: "reactchat-9ef1f.appspot.com",
  messagingSenderId: "356780192421",
  appId: "1:356780192421:web:cd8baa8eaef7b0e766d34c"
};

const app = initializeApp(firebaseConfig);  

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()