const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyCfmi_r5UhFukVUs7pfbOyOyMUkHC2KU_Y",
  authDomain: "landscope-b3139.firebaseapp.com",
  databaseURL:
    "https://landscope-b3139-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "landscope-b3139",
  storageBucket: "landscope-b3139.appspot.com",
  messagingSenderId: "327923878091",
  appId: "1:327923878091:web:33f40481cbdef67ece734e",
  measurementId: "G-K7S6KHQ9P6",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.getDatabase();
module.exports = db;

