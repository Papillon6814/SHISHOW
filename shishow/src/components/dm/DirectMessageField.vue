<template>
  <div id="directMessageField">
    <leftArea></leftArea>
    <rightArea></rightArea>
    <div class="inputArea">
      <inputArea></inputArea>
    </div>
  </div>
</template>

<script>
import leftArea from './leftArea.vue'
import rightArea from './rightArea.vue'
import inputArea from './InputArea.vue'

import firebase from "../../plugin/firestore";
import 'firebase/firestore'
import '@firebase/auth'
import store from '../../store'

let db = firebase.firestore();
let currentUser;
// 現在ログイン中のユーザー

export default {
  name: 'directMessageField',

  data() {
    return {
      myFriends: '',
      myMsg: ''
    }
  },

  created: function () {
    this.onAuth();
    currentUser = firebase.auth().currentUser;
  },

  components: {
    leftArea,
    rightArea,
    inputArea
  },

  methods: {
    onAuth: function () {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit('onAuthStateChanged', user);
        store.commit('onUserStatusChanged', user.uid ? true : false);
      })
    }
  }
}

</script>

<style lang='scss' scoped>
  #directMessageField {
    position: absolute;

    width: 90%;
    height: 80%;

    left: 5%;
    bottom: 2vh;

    //下部に表示する
    .inputArea {
      position: fixed;

      width: calc(49.5% - 5px);
      height: 50px;

      left: calc(45.5% + 5px);
      bottom: 2vh;

      z-index: 3;
    }
  }
</style>
