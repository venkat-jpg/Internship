import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCq-meuy-vHq4V0lhyAKpujylO9D1lOouM",
    authDomain: "drive-clone-38a94.firebaseapp.com",
    projectId: "drive-clone-38a94",
    storageBucket: "drive-clone-38a94.appspot.com",
    messagingSenderId: "1060838955233",
    appId: "1:1060838955233:web:dbe9ca077a77b3178fffa0"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export{db,storage,auth,provider }










