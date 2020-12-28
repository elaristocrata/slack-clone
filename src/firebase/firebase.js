import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

export var firebaseConfig = {
    apiKey: "AIzaSyAHqLdabeVIqIIhxaFxJMkHhdVnpLT85w0",
    authDomain: "react-salck-clone.firebaseapp.com",
    databaseURL: "https://react-salck-clone-default-rtdb.firebaseio.com/",
    projectId: "react-salck-clone",
    storageBucket: "react-salck-clone.appspot.com",
    messagingSenderId: "1023230429968",
    appId: "1:1023230429968:web:c933a891c0a899cc15b395",
    measurementId: "G-NZZHVTVRP0"
};

firebase.initializeApp(firebaseConfig);


export default firebase;
