import * as firebase from 'firebase';
import "firebase/firestore";


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCYExuQNsOCIJ5_1VnbwOOi3KpCtLKGNHw",
    authDomain: "tutorial-ninja-smoothies-19a19.firebaseapp.com",
    databaseURL: "https://tutorial-ninja-smoothies-19a19.firebaseio.com",
    projectId: "tutorial-ninja-smoothies-19a19",
    storageBucket: "tutorial-ninja-smoothies-19a19.appspot.com",
    messagingSenderId: "985611372191",
    appId: "1:985611372191:web:abcffb5a5ae25c8985c4aa"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore();