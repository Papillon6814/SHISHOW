<template>
  <div id="directMessageField">
    <leftArea
    :friendsDocID="leftAreaData"
    ></leftArea>
    <rightArea></rightArea>
    <div class="inputArea">
      <inputArea></inputArea>
    </div>
  </div>
</template>

<script>
// ほとんどのDMコンポーネントの親
// IDをfirebaseから取得してそれぞれのコンポーネントへ送信する
import leftArea from './leftArea.vue'
import rightArea from './rightArea.vue'
import inputArea from './InputArea.vue'

import firebase from "../../plugin/firestore";
import 'firebase/firestore'
import '@firebase/auth'
import store from '../../store'

let db = firebase.firestore();

let currentUser;
let friendsDocID = [];

export default {
  name: 'directMessageField',

  data() {
    return{
      rightAreaData: '',
      leftAreaData: [],
      inputAreaData: ''
    }
  },

  components: {
    leftArea,
    rightArea,
    inputArea,
  },

  methods: {
    onAuth: function() {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit('onAuthStateChanged', user);
        store.commit('onUserStatusChanged', user.uid ? true : false);
      })
    },

    loadFriendID: function() {
      db.collection("USER")
        .doc(currentUser.email)
        .collection("friends")
        .get()
        .then(friendsSnapshot => {
          friendsSnapshot.forEach(doc1 => {
            friendsDocID.push(doc1.id)
            console.log("ID: " + friendsDocID)
          })
      })
    }
  },

  created: function() {
    this.onAuth();
    currentUser = firebase.auth().currentUser;
    this.loadFriendID();
    this.leftAreaData = friendsDocID;
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
