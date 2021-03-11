import firebase from 'firebase/app';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAbiq26Q0gnAi7hs835BdaFT13XRng6WIc",
    authDomain: "ratatouille-6858d.firebaseapp.com",
    projectId: "ratatouille-6858d",
    storageBucket: "ratatouille-6858d.appspot.com",
    messagingSenderId: "921635392532",
    appId: "1:921635392532:web:11a77ccfd4ce844975ab01"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;