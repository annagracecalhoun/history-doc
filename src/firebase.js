// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtATST3S_pftecvcTbLFJxeYFwg0Wigp8",
  authDomain: "history-doc-50c4d.firebaseapp.com",
  projectId: "history-doc-50c4d",
  storageBucket: "history-doc-50c4d.appspot.com",
  messagingSenderId: "535449402525",
  appId: "1:535449402525:web:6af02faa6523bc3aade874"
};

// Initialize Firebase
let app = initializeApp(firebaseConfig);
let firestore = getFirestore(app);

export default firestore; 