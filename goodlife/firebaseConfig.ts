import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCcLmvADzhcGmHcwtK_FPZXZIpPosYB6a4",
    authDomain: "goodlife-3d5be.firebaseapp.com",
    projectId: "goodlife-3d5be",
    storageBucket: "goodlife-3d5be.firebasestorage.app",
    messagingSenderId: "1045147911337",
    appId: "1:1045147911337:web:eab15aba805ad6888095b8",
    measurementId: "G-90WVY15FQ8"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);