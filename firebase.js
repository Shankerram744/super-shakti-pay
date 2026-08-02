// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  remove,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

// Firebase Config
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Export
export {
  db,
  ref,
  set,
  get,
  update,
  remove,
  push,
  onValue
};