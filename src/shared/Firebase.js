import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyB0Wv0x9g9dPD7nAZQ5T65hjzxfE2rE5KY',
  authDomain: 'bai-journey-diary-app.firebaseapp.com',
  databaseURL: 'https://bai-journey-diary-app.firebaseio.com',
  projectId: 'bai-journey-diary-app',
  storageBucket: 'bai-journey-diary-app.appspot.com',
  messagingSenderId: '28528724545',
  appId: '1:285287245453:web:896cd8f98e2eb5ec',
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.storage = firebase.storage();

    this.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    this.arrayUnion = firebase.firestore.FieldValue.arrayUnion;
    this.arrayRemove = firebase.firestore.FieldValue.arrayRemove;

    this.GeoPoint = firebase.firestore.GeoPoint;
    this.Timestamp = firebase.firestore.Timestamp;

    this.googleProvider = new firebase.auth.GoogleAuthProvider();
  }
}

export default Firebase;
