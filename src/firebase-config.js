// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHvugch4dQ7wKzVEZ_2aKeD5mKUfptD3w",
  authDomain: "argon-dashboard-react-da1f1.firebaseapp.com",
  projectId: "argon-dashboard-react-da1f1",
  storageBucket: "argon-dashboard-react-da1f1.appspot.com",
  messagingSenderId: "1085109592144",
  appId: "1:1085109592144:web:12e2b3f5408fb18027b155",
  measurementId: "${config.measurementId}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);