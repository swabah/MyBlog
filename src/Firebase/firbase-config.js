import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD57hHUPyrh1myw0aiM1rxo887O5O-8sqA",
    authDomain: "blogproject-68107.firebaseapp.com",
    projectId: "blogproject-68107",
    storageBucket: "blogproject-68107.appspot.com",
    messagingSenderId: "791194264264",
    appId: "1:791194264264:web:35c138a7e43df4b97c3bfd",
    measurementId: "G-VXZJX46SWS"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)