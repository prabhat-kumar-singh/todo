//run firebase login

import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB-EE-De4Bbj3xcN2y9oa8SYzrGr3Gy6cM",
    authDomain: "mytodo-4e8dc.firebaseapp.com",
    projectId: "mytodo-4e8dc",
    storageBucket: "mytodo-4e8dc.appspot.com",
    messagingSenderId: "1071057257100",
    appId: "1:1071057257100:web:fbffc8551f0410810531a9",
    measurementId: "G-167HZPB32S"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

