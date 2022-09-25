// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB2z8O3h9bTXmb3mt0I_QyQlysO-XW-D4",
  authDomain: "mobile-order-4d383.firebaseapp.com",
  databaseURL: "https://mobile-order-4d383-default-rtdb.firebaseio.com",
  projectId: "mobile-order-4d383",
  storageBucket: "mobile-order-4d383.appspot.com",
  messagingSenderId: "1029313752045",
  appId: "1:1029313752045:web:b4b6ac5a8aafc6a17d55e4",
  measurementId: "G-MGHD5LQRPP",
};

const admin = initializeApp(firebaseConfig);

export const db = getFirestore(admin);
export const functions = getFunctions(admin);
export const auth = getAuth(admin);
