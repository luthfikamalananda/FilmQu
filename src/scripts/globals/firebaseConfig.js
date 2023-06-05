// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApdHm2aW7FkV6bTeQIjt2gOSWslqByVt4",
  authDomain: "filmqu-75af3.firebaseapp.com",
  projectId: "filmqu-75af3",
  storageBucket: "filmqu-75af3.appspot.com",
  messagingSenderId: "371165696792",
  appId: "1:371165696792:web:57ae0f606a9e03251b046d",
  measurementId: "G-8GM9M20DEH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);