import firebase from "firebase"


const firebaseConfig={
    apiKey: "AIzaSyDcECPNsQwdFojqHxY6AXO_QcwRBby29pw",
    authDomain: "daily-plus-65b30.firebaseapp.com",
    databaseURL: "https://daily-plus-65b30.firebaseio.com",
    projectId: "daily-plus-65b30",
    storageBucket: "daily-plus-65b30.appspot.com",
    messagingSenderId: "180447814007",
    appId: "1:180447814007:web:aee8694d85a2a7c4fc8172",
    measurementId: "G-V5FCNX71M4"

}
firebase.initializeApp(firebaseConfig);

export default firebase