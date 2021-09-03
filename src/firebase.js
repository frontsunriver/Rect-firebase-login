import firebase from "firebase/app";
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyA4Nfpf2Kh8Frl5kqSFfJ0J2H0IpAxTQR0",
    authDomain: "react-provider.firebaseapp.com",
    projectId: "react-provider",
    storageBucket: "react-provider.appspot.com",
    messagingSenderId: "257992822548",
    appId: "1:257992822548:web:0eb04c806983c6d890fc01"
});

export const auth = app.auth()
export default app;