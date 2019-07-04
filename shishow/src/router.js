import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signup from './views/Signup.vue'
import Signin from './views/Signin.vue'
import Edit from './views/Edit.vue'
import SearchResult from './views/SearchResult.vue'
import Notification from './views/Notification.vue'
import DirectMessage from './views/DirectMessage.vue'
import Follow from './views/Follow.vue'
import Friend from './views/friend.vue'
import GlobalChat from "./views/GlobalChat.vue"




import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
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
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/notification',
      name: 'notification',
      component: Notification
    },
    {
      path: '/directMessage',
      name: 'directMessage',
      component: DirectMessage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/friend',
      name: 'friend',
      component: Friend
    },
    {
      path: '/follow',
      name: 'follow',
      component: Follow,
      component: Friend
    },
    {
      path: '/search',
      name: 'search',
      component: SearchResult
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: "/GlobalChat",
      name: 'GlobalChat',
      component: GlobalChat
    }
  ]
})

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('user is signed in.')
        next()
      } else {
        console.log('user is not signed in.')
        next({
          path: '/signin',
          query: {
            redirect: to.fullPath
          }
        })
      }
    })
  } else {
    next()
  }
})

export default router