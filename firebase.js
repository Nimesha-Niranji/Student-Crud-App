import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzr2pTzfP8vKa4lTits2_2xNcC1VZhkTw",
    authDomain: "student-data-6f30e.firebaseapp.com",
    databaseURL: "https://student-data-6f30e-default-rtdb.firebaseio.com",
    projectId: "student-data-6f30e",
    storageBucket: "student-data-6f30e.firebasestorage.app",
    messagingSenderId: "153666024153",
    appId: "1:153666024153:web:9ba1166c34f35e092e04c8",
    measurementId: "G-T3E2LZ5ETM"
  };

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const database = firebase.database();

export { auth, database };
