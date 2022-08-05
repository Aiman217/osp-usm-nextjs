// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfduDB_4ha6-Ms23qiAX-Vl5iOTeeOYxQ",
  authDomain: "osp-usm-react.firebaseapp.com",
  projectId: "osp-usm-react",
  storageBucket: "osp-usm-react.appspot.com",
  messagingSenderId: "589648208521",
  appId: "1:589648208521:web:efb1a4b0751d2f493edc58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);