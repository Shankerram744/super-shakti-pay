// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBFK8LtZrSAZpqeC8dlz4Fgpd8u4yX72B4",
  authDomain: "super-shakti-pay.firebaseapp.com",
  databaseURL: "https://super-shakti-pay-default-rtdb.firebaseio.com",
  projectId: "super-shakti-pay",
  storageBucket: "super-shakti-pay.firebasestorage.app",
  messagingSenderId: "1099835260",
  appId: "1:1099835260:web:62f835e2ea38afbd7366f9",
  measurementId: "G-S0Y6MEJ9P3"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };
