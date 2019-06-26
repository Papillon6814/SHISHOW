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
let msgList = [];
let myFriends = [];

export default {
  name: 'directMessageField',

  components: {
    leftArea,
    rightArea,
    inputArea
  },

  created() {
    this.fireinit();
    this.loadDMFriends();
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
    loadDMFriends() {
      db.collection("USER")
      .doc(currentUser.email)
      collection('friends')
      .get()
      .then(querysnapshot1 => {
        if(querysnapshot1.exists){
          querysnapshot1.forEach(doc1 => {

            db.collection("USER")
            .doc(currentUser.email)
            .doc(doc1.id)
            .collection("CHAT")
            .get()
            .then(querysnapshot2 => {
              if(doc2.data().msg != ""){
                querysnapshot2.forEach(doc2 => {
                  msgList.push(doc2.data().msg);
                })
              }
              console.log(msgList);
            })
            .catch(e2 => {
              console.log(e2);
            })
          })
        } else {
          console.log("You have no friends.");
        }
      })
      .catch(e1 => {
        console.log(e1);
      })
    },
    // これまでのメッセージをロード
    loadMsg() {
      db.collection("USER")
      .doc(currentUser.email)
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
