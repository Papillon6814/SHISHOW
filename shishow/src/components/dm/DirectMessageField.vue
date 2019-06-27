<template>
  <div id="directMessageField">
    <leftArea
    :IDlist="IDlist"
    :userNameList="usernames"></leftArea>
    <rightArea></rightArea>
    <div class="inputArea">
      <inputArea
      :ID="ID"></inputArea>
    </div>
  </div>
</template>

<script>
// ほとんどのDMコンポーネントの親

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

let msgListForLeftPage = [];
let userIDList = [];
let userNameList = [];

export default {
  name: 'directMessageField',

  data() {
    return {
      ID: '',
      IDlist: '',
      usernames: '',
      msg: ''
    }
  },

  created: function () {
    this.onAuth();
    currentUser = firebase.auth().currentUser;
    console.log("created")
    this.loadFriendMsgs();
  },

  mounted: function () {
    console.log("mounted")
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
    },

    loadFriendMsgs: function () {
      let db = firebase.firestore();
      //データベースから値を持ってきてsnapshotに代入
      db.collection("USER")
      .doc(currentUser.email)
      .collection("friends")
      .get()
      .then(querysnapshot1 => {
        querysnapshot1.forEach(doc1 => {
          userIDList.push(doc1.id);
          userNameList.push(doc1.data().username);
          // userIDList配列にフレンドのIDを格納していく

          db.collection("USER")
          .doc(currentUser.email)
          .collection('friends')
          .doc(doc1.id)
          .collection("CHAT")
          .limit(1)
          .get()
          .then(querysnapshot2 => {
            // CHATコレクションの中身
            querysnapshot2.forEach(doc2 => {
              msgListForLeftPage.push(doc2.data())
            });

            msgListForLeftPage.sort(function(a, b) {
              if(a.date > b.date) {
                return 1;
              } else {
                return -1;
              }
            });

            let userData = { id_list: msgListForLeftPage,
                            user_name_list: userNameList };
            this.$store.dispatch('openChatArea', userData);

            this.IDlist = msgListForLeftPage;
            this.usernames = userNameList;
          })
        })
      })
      .then(function() {
        // デバッグ用のコンソール出力
        console.log(msgListForLeftPage);
        console.log('uiList: ' + userIDList);
      })
    },
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
