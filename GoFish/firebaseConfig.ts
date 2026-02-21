import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKZSaPpDWwsNhA0euaTkQMRG4PaJozg3A",
  authDomain: "gofish-fd000.firebaseapp.com",
  projectId: "gofish-fd000",
  storageBucket: "gofish-fd000.firebasestorage.app",
  messagingSenderId: "993126915924",
  appId: "1:993126915924:web:08cc798a359329252472c1",
  measurementId: "G-SLPL7PMBVZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);