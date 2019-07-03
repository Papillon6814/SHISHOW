<template>
  <div class="rightArea">
    {{ friendDocID }}
    <div v-for="N in msgList" v-bind:key="N">
      <div class="chatBalloon">
        {{ N.msg }}
      </div>
      <div class="datePosition">
        {{ N.date.toDate().toLocaleString() }}
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../../plugin/firestore";
import 'firebase/firestore'
import '@firebase/auth'
import store from '../../store'
import { type } from 'os';
import { types } from 'util';

const db = firebase.firestore();
let currentUserEmail;
let chatID;

export default {
  name: 'rightArea',

  data() {
    return {
      msgList: []
    }
  },

  props: [
    'friendDocID'
  ],

  methods: {
    onAuth: function() {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit('onAuthStateChanged', user);
        store.commit('onUserStatusChanged', user.uid ? true : false);
      })
    }
  },

  watch:{
    friendDocID: function(newval) {
      this.msgList = [];
      currentUserEmail = firebase.auth().currentUser.email;

      db.collection("USER")
        .doc(currentUserEmail)
        .collection('friends')
        .doc(newval)
        .get()
        .then(doc1 => {
          chatID = doc1.data()['chatID'];
          console.log('chatID: '+chatID);

          db.collection("PrivateChat")
            .doc(chatID)
            .collection("contents")
            .orderBy('date')
            .onSnapshot(querySnapshot => {
              this.msgList = [];
              querySnapshot.forEach(doc2 => {
                this.msgList.push(doc2.data());
              })
            })
        })
    }
  },

  created: function() {
    this.onAuth();
    console.log("rightArea created");

    currentUserEmail = firebase.auth().currentUser.email;
  }
};
</script>

<style lang='scss' scoped>
.rightArea {
  position: absolute;

  top: 0;
  right: 0;

  width: 55%;
  height: calc(100% - 50px);

  background-color: #fff;

  overflow-y: scroll;
  overflow-x: hidden;
}

.chatBalloon {
  position: relative;
  display: inline-block;

  border-radius: 20px;

  border: solid 1px #bbb;/*線*/
  border-radius: 20px;/*角の丸み*/

  left: 38%;

  margin: 1.5em 15px 1.5em 0;
  padding: 7px 10px;

  min-width: 125px;
  max-width: 100%;

  color: $main_text_color;
  font-size: 16px;
  background: #FFF;

  text-align: right;
  font-family: 'Noto Sans JP', sans-serif;
}

.datePosition {
  position: relative;

  left: 40%;
  font-size: 13px;
}



</style>
