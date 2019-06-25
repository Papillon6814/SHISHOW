<template>
  <div id="rightArea">
    <div v-for="msg in msgList" v-bind:key="msg.id">
      <ul>
        <li>{{msg.msg}}</li>
        <!--日付の変換-->
        <li>{{msg.date.toDate().toLocaleString()}}</li>
      </ul>
    </div>
    <div class="inputArea">
      <inputArea></inputArea>
    </div>
  </div>
</template>

<script>
import inputArea from "./InputArea";

import firebase from "../../plugin/firestore";
import 'firebase/firestore'
import '@firebase/auth'
import store from '../../store'

let db = firebase.firestore();

let currentUser;
let msgList = [];

export default {
  data() {
    return {
      msgList: []
      //msg: "",
      //errorMsg: ""
    };
  },

  components: {
    inputArea
  },

  created() {
    this.fireinit();
  },

  methods: {
    fireinit: function() {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit('onAuthStateChanged', user);
        store.commit('onUserStatusChanged', user.uid ? true : false);
      })

      currentUser = firebase.auth().currentUser;
    },
    // これまでのメッセージをロード
    loadMsg() {
      const db = firebase.firestore();


    }
  }
};
</script>

<style lang='scss' scoped>
#rightArea {
  position: absolute;
  margin: 0 auto;

  top: 0;
  right: 0;

  width: 55%;
  height: calc(100% - 50px);

  background-color: $theme_color_dm;

  overflow-y: scroll;

  //下部に表示する
  .inputArea {
    position: fixed;

    width: calc(49.5% - 5px);
    height: 50px;

    left: auto;
    bottom: 7.4%;

    margin: 0 0 0 5px;

    z-index: 3;
  }
}

li {
  list-style: none;
}
</style>
