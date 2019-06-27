import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vBlur from 'v-blur'
// routerは遷移管理
// storeは状態管理

Vue.use(vBlur)

Vue.config.productionTip = false;

import "@fortawesome/fontawesome-free-webfonts/css/fontawesome.css";
import "@fortawesome/fontawesome-free-webfonts/css/fa-solid.css";

import firebase from 'firebase'
import 'firebase/firestore'
import '@firebase/auth'

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
