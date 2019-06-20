import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // ログイン情報、ログイン状態の２つを保持する場所を作る
  state: {
    user: {},
    // ログイン情報
    status: false
    // ログイン状態
  },
  mutations: {
    onAuthStateChanged(state, user) {
      state.user = user;
      // firebaseが返したユーザー情報
    },
    onUserStatusChanged(state, status) {
      state.status = status;
      // ログインしていたらtrue
    }
  },
  getters: {
    user(state){
      return state.user;
    },
    isSignedIn(state){
      return state.status;
    }
  },
  actions: {

  }
})
