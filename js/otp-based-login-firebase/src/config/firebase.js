import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCUUEhVilG5yEnpSYREcB-ntyajspkfNAA",
  authDomain: "notion-clone-fe8be.firebaseapp.com",
  projectId: "notion-clone-fe8be",
  storageBucket: "notion-clone-fe8be.appspot.com",
  messagingSenderId: "1018348944419",
  appId: "1:1018348944419:web:d3977c3a4559de9fc70596",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
