import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDSox0IoOl8AgZiYHh6kWUm-BrSgeM7cQI",
    authDomain: "fileheaven-6dde6.firebaseapp.com",
    projectId: "fileheaven-6dde6",
    storageBucket: "fileheaven-6dde6.appspot.com",
    messagingSenderId: "346809166911",
    appId: "1:346809166911:web:c476ddec8a509e3f325c8a",
    measurementId: "G-9NMC50TVEQ"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage }