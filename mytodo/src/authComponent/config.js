import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

const FirebaseApp = firebase.initializeApp(firebaseConfig);

export const db = FirebaseApp.firestore();
export const auth = FirebaseApp.auth();

export default FirebaseApp;
