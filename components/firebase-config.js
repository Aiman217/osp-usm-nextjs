// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {getAuth, EmailAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTeoICyfYYpA5tJW3-kwaehst9SCzvyHo",
  authDomain: "osp-usm-e77b7.firebaseapp.com",
  projectId: "osp-usm-e77b7",
  storageBucket: "osp-usm-e77b7.appspot.com",
  messagingSenderId: "440318430410",
  appId: "1:440318430410:web:659f4d80c88c0e4a367833"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new EmailAuthProvider();