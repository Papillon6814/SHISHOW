import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signup from './views/Signup.vue'
import dbtest2 from './views/forDatabase2.vue'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/dbtest2',
      name: 'dbtest2',
      component: dbtest2
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if(requiresAuth) {
    firebase.auth().onAuthStateChanged(function (user) {
      if(user){
        next()
      } else {
        next({
          path: '/dbtest2',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next()
  }
})

export default router
