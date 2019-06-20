import firebase from 'firebase'
import 'firebase/firestore'
import '@firebase/auth'
import store from '../store'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD2D42pBXU_nXpo2wTd_IFs-4hogXE8Dq0",
  authDomain: "shishow-7cc37.firebaseapp.com",
  databaseURL: "https://shishow-7cc37.firebaseio.com",
  projectId: "shishow-7cc37",
  storageBucket: "shishow-7cc37.appspot.com",
  messagingSenderId: "476890822571",
  appId: "1:476890822571:web:508b49508a91c0d3"
};

export default {
  init() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  },
  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
  },
  logout() {
    firebase.auth().signOut()
  },
  onAuth() {
    firebase.auth().onAuthStateChanged(user => {
      user = user ? user: {};
      store.commit('onAuthStateChanged', user);
      store.commit('onUserStatusChanged', user.uid ? true : false);
    });
  }
}
