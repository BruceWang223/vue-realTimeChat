import firebase from 'firebase/app'
import firestore from 'firebase/firestore'
  
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBB5MiQ1MBwnKl21O50ZGe8hwY3EDANlcs",
    authDomain: "realtime-chat-9eb3b.firebaseapp.com",
    databaseURL: "https://realtime-chat-9eb3b.firebaseio.com",
    projectId: "realtime-chat-9eb3b",
    storageBucket: "realtime-chat-9eb3b.appspot.com",
    messagingSenderId: "180927466579"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({timestampsInSnapshots: true});
export default firebaseApp.firestore();