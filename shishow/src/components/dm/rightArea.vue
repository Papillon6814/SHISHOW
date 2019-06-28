<template>
  <div class="rightArea">
    {{ friendDocID }}
    <div v-for="msg in onloadAllMsg" v-bind:key="msg.id">
      <ul>
        <li>{{ msg.msg }}</li>
        <!-- 日付の変換 -->
        <li>{{ msg.date.toDate().toLocaleString() }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from "../../plugin/firestore";
import 'firebase/firestore'
import '@firebase/auth'
import store from '../../store'

const db = firebase.firestore();
let currentUserEmail;

export default {
  name: 'rightArea',

  data() {
    return {
      msgList: [],
      ID: this.friendDocID || 'eZLLISJVLnyCOIP7XP58'
    }
  },

  props: [
    'friendDocID'
  ],

  computed: {
    onloadAllMsg: function() {
      db.collection("USER")
        .doc(currentUserEmail)
        .collection('friends')
        .doc(this.ID)
        .collection("CHAT")
        .get()
        .then(chatSnapshot => {
          chatSnapshot.forEach(doc1 => {
            this.msgList.push(doc1.data());
          })

          console.log("onload: " + this.msgList[0].msg)

          return this.msgList
        })
    }
  },

  methods: {
    onAuth: function() {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit('onAuthStateChanged', user);
        store.commit('onUserStatusChanged', user.uid ? true : false);
      })
    },

    loadAllMsg: function() {
      this.msgList = [];

      db.collection("USER")
        .doc(currentUserEmail)
        .collection('friends')
        .doc(this.ID)
        .collection("CHAT")
        .get()
        .then(chatSnapshot => {
          chatSnapshot.forEach(doc1 => {
            this.msgList.push(doc1.data());
          })

          console.log(this.msgList.msg)
        })
    }
  },

  created: function() {
    this.onAuth();
    console.log("rightArea created")
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
</style>
