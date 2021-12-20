import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAkBUNvnHiZBOzk1dBoPTuvf3nY4SVKryk",
  authDomain: "marinzadatak-d8910.firebaseapp.com",
  projectId: "marinzadatak-d8910",
  storageBucket: "marinzadatak-d8910.appspot.com",
  messagingSenderId: "666709454770",
  appId: "1:666709454770:web:9cb8169075c6c870efbeab",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
