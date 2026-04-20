// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtGjnpyr8-eJ7qkTNE4M4kK3hmN8gdBhE",
  authDomain: "sample-295a8.firebaseapp.com",
  projectId: "sample-295a8",
  storageBucket: "sample-295a8.appspot.com",
  messagingSenderId: "1020395407039",
  appId: "1:1020395407039:web:71fb135cdf10762faf680a",
  measurementId: "G-XT4G8SWENL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };