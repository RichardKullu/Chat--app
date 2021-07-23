import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCQu80oPrYcKxDDm1nTf9aUukpl4gX4f14',
  authDomain: 'msngr-cb3ae.firebaseapp.com',
  databaseURL: 'https://msngr-cb3ae-default-rtdb.firebaseio.com',
  projectId: 'msngr-cb3ae',
  storageBucket: 'msngr-cb3ae.appspot.com',
  messagingSenderId: '1084421396116',
  appId: '1:1084421396116:web:4e2503b521044486b60681',
  measurementId: 'G-9RJL43D99C',
};
let fb;

export default fb = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

let auth = fb.auth();
let db = fb.firestore();

export { auth, fb, db };
