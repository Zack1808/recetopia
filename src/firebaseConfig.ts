import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "recetopia-a7114.firebaseapp.com",
  projectId: "recetopia-a7114",
  storageBucket: "recetopia-a7114.appspot.com",
  messagingSenderId: "335493367400",
  appId: "1:335493367400:web:372e4e3827afe726315ddd",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
