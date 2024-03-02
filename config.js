import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyAP9Ius1elUbkgPgUUa8KbrZesZWJd_h_8',
  authDomain: 'shopify-16236.firebaseapp.com',
  projectId: 'shopify-16236',
  storageBucket: 'shopify-16236.appspot.com',
  messagingSenderId: '830883792766',
  appId: '1:830883792766:web:87b7a559b46ab56f34d52f',
  measurementId: 'G-14QLTMCNWV',
};

if (firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
}
