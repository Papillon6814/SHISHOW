import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    status: false,
    id_list: {},
    user_name_list: {}
  },

  mutations: {
    onAuthStateChanged(state, user) {
      state.user = user;
      // firebaseが返したユーザー情報
    },
    onUserStatusChanged(state, status) {
      state.status = status;
      // ログインしているかどうか
    },
    onOpeningChatArea(state, userData) {
      state.id_list = {};
      state.user_name_list = {};

      state.id_list = userData.id_list;
      state.user_name_list = userData.user_name_list;
    }
  },

  actions: {
    openChatArea({commit}, id_list, user_name_list) {
      let userData = {"id_list": id_list, "user_name_list": user_name_list};
      commit('onOpeningChatArea', userData)
    }
  },

  getters: {
    user(state) {
      return state.user;
    },
    isSignedIn(state) {
      return state.status;
    }
  },

  plugins : [
    createPersistedState({
      storage: window.sessionStorage,
    })
  ]
});
