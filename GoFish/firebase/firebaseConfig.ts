// firebase/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBKZSaPpDWwsNhA0euaTkQMRG4PaJozg3A",
  authDomain: "gofish-fd000.firebaseapp.com",
  projectId: "gofish-fd000",
  storageBucket: "gofish-fd000.appspot.com", 
  messagingSenderId: "993126915924",
  appId: "1:993126915924:web:08cc798a359329252472c1",
  measurementId: "G-SLPL7PMBVZ",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore
export const db = getFirestore(app);