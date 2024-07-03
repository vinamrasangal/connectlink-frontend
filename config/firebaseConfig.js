// config/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDIIU4dGTG__78K-Q1Xlp-sF6T6kE5cwCw",
    authDomain: "mern-estate-2748d.firebaseapp.com",
    projectId: "mern-estate-2748d",
    storageBucket: "mern-estate-2748d.appspot.com",
    messagingSenderId: "430931184377",
    appId: "1:430931184377:web:a14ca80c7c4cdf8548f028"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
