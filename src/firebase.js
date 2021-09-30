import firebase from 'firebase';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBvlWaHroyoEwxmWH25SmZzJWUPyzOpUjg",
  authDomain: "facebook-messenger-clone-c0f4d.firebaseapp.com",
  projectId: "facebook-messenger-clone-c0f4d",
  storageBucket: "facebook-messenger-clone-c0f4d.appspot.com",
  messagingSenderId: "234439540842",
  appId: "1:234439540842:web:71a40333b180be35830a13",
  measurementId: "G-52V6DCWMD3"
});

const db = firebaseApp.firestore();
export {db};