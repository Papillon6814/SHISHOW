import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// routerは遷移管理
// storeは状態管理

Vue.config.productionTip = false

import '@fortawesome/fontawesome-free-webfonts/css/fontawesome.css'
import '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css'

/*
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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// var db = firebase.firestore();
*/

/*
db.collection("users").add({
  first: "Ada",
  last: "Lovelace",
  born: 1815
})
.then(function(docRef) {
  console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});
*/

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
