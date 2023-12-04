// firebase.js (or your Firebase setup file)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDwJgBIIFZSnnDqYa_RMwqtHulGlb3gc0w",
    authDomain: "dragdrop-bc2dd.firebaseapp.com",
    projectId: "dragdrop-bc2dd",
    storageBucket: "dragdrop-bc2dd.appspot.com",
    messagingSenderId: "323279900064",
    appId: "1:323279900064:web:052db35cba0a2cfa5568c5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
