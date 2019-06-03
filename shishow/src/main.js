import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import '@fortawesome/fontawesome-free-webfonts/css/fontawesome.css'

import '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
