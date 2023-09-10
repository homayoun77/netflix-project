// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbz5Wl0AIBufBbK0CcAj4LsO27dImgv2k",
  authDomain: "netflix-project-6c9f7.firebaseapp.com",
  projectId: "netflix-project-6c9f7",
  storageBucket: "netflix-project-6c9f7.appspot.com",
  messagingSenderId: "189562931450",
  appId: "1:189562931450:web:0de3a41fa49a8e0487a143"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
