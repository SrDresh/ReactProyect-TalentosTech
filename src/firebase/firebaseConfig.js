import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNYocrS1m6PA2sWNxH9DWHSkMNcRWQNZg",
  authDomain: "ecommerce-reactjsdemo.firebaseapp.com",
  projectId: "ecommerce-reactjsdemo",
  storageBucket: "ecommerce-reactjsdemo.firebasestorage.app",
  messagingSenderId: "434110778199",
  appId: "1:434110778199:web:adb5039dff0611f50e8c12"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
export default app;
