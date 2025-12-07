import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEBZJVX7ClgIf53Vp1H31AE69D6PmnIh4",
  authDomain: "smartnfc-9d5c6.firebaseapp.com",
  projectId: "smartnfc-9d5c6",
  storageBucket: "smartnfc-9d5c6.firebasestorage.app",
  messagingSenderId: "968150035532",
  appId: "1:968150035532:web:7803ad8a343e26924c98e9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
