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

export default {
  name: 'directMessageField',

  data() {
    return{
      username: '',
      lastMsg: '',
      iconPic: '',
      msgDate: {},
      msgBubbles: [],
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

    loadAllMsgAndDate: function() {
      db.collection("USER")
        .doc(currentUser.email)
        .collection("friends")
        .get()
        .then(friendsSnapshot => {
          friendsSnapshot.forEach(doc1 => {

          db.collection("USER")
          .doc(currentUser.email)
          .collection("friends")
          .doc(doc1.id)
          .collection("CHAT")
          .get()
          .then(msgSnapshot => {
            msgSnapshot.forEach(doc2 => {
              this.msgBubbles.push(doc2.data().msg);
              this.msgDate.push(doc2.data().date)
              console.log(this.msgBubbles)
              console.log(this.msgDate)
            })
          })
        })
      })
    }
  },

  created: function() {
    this.onAuth();
    currentUser = firebase.auth().currentUser;
    this.loadAllMsgAndDate();
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
