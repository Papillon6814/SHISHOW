<template>
  <div class="rightArea">
    {{ friendDocID }}
    <div v-for="N in msgList" v-bind:key="N">
      <div class="chatBalloon">
        <ul>
          <li>{{ N.msg }}</li>
          <!-- 日付の変換 -->
          <li>{{ N.date.toDate().toLocaleString() }}</li>
        </ul>
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
    friendDocID:function(newval){
      this.msgList=[];
      currentUserEmail = firebase.auth().currentUser.email;
        db.collection("USER")
        .doc(currentUserEmail)
        .collection("friends")
        .doc(newval)
        .collection("CHAT")
        .orderBy("date")
        .get()
        .then(chatSnapshot => {
          chatSnapshot.forEach(doc1 => {
            this.msgList.push(doc1.data());
          })

          console.log("onload: " + this.msgList[0].msg)
        }).catch(e=>{
          console.log(e)
        })
    }
  },

  created: function() {
    this.onAuth();
    console.log("rightArea created")
    currentUserEmail = firebase.auth().currentUser.email;
    db.collection("USER")
        .doc(currentUserEmail)
        .collection("friends")
        .doc(this.friendDocID)
        .collection("CHAT")
        .orderBy("date")
        .get()
        .then(chatSnapshot => {
          chatSnapshot.forEach(doc1 => {
            this.msgList.push(doc1.data());
          })

          console.log("onload: " + this.msgList[0].msg)
        }).catch(e=>{
          console.log(e)
        })
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

  background-color: $theme_color_dm;

  overflow-y: scroll;

  .chatBubble {
    display: block;

    width: 450px;
    height: auto;

    // temporary color
    background-color: #fff;
  }
}

li {
  list-style: none;
}

.chatBalloon {
  position: relative;
  display: inline-block;

  left: 28%;

  margin: 1.5em 15px 1.5em 0;
  padding: 7px 10px;

  min-width: 120px;
  max-width: 100%;

  color: #555;
  font-size: 16px;
  background: #adff2f;
}

.chatBalloon:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 100%;
  margin-top: -15px;
  border: 15px solid transparent;
  border-left: 15px solid #adff2f;
}

</style>
