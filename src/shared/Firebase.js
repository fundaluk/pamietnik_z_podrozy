import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.firestore();

    this.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    this.arrayUnion = firebase.firestore.FieldValue.arrayUnion;
    this.arrayRemove = firebase.firestore.FieldValue.arrayRemove;

    this.GeoPoint = firebase.firestore.GeoPoint;
    this.Timestamp = firebase.firestore.Timestamp;

    this.googleProvider = new firebase.auth.GoogleAuthProvider();
  }
}

export default Firebase;
