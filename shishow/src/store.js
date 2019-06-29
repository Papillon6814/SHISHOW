import Vue from "vue";
import Vuex from "vuex";
import firebase from './plugin/firestore'
import "firebase/firestore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    status: false
  },
  mutations: {
    onAuthStateChanged(state, user) {
      state.user = user;
      // firebaseが返したユーザー情報
    },
    onUserStatusChanged(state, status) {
      state.status = status;
      // ログインしているかどうか
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isSignedIn(state) {
      return state.status;
    },

  }
});