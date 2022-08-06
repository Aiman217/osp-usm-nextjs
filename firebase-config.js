// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM8unlLw9FmUSCeQnvPmB3AMNvagbWOBs",
  authDomain: "osp-usm-4d768.firebaseapp.com",
  projectId: "osp-usm-4d768",
  storageBucket: "osp-usm-4d768.appspot.com",
  messagingSenderId: "647778548820",
  appId: "1:647778548820:web:6dbc371314d0cb2d2881c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);