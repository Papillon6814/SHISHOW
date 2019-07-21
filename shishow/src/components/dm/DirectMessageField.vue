<template>
  <div id="directMessageField">
    <leftArea
    :friendsDocID="leftAreaData"
    ></leftArea>
    <div class="nameTagArea">
      <div class="nameTag">
        {{ usernameFromLeftArea }}
      </div>
      <div class="nameBorder">
      </div>
    </div>
    <rightArea
    ref="rightArea"
    :friendDocID="idFromLeftArea">
    </rightArea>
    <div class="inputArea">
      <inputArea
      @scrollRightArea="callScroll()"
      :friendDocID="idFromLeftArea">
      </inputArea>
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
      inputAreaData: '',
      idFromLeftArea: '',
      usernameFromLeftArea: '',
    }
  },

  components: {
    leftArea,
    rightArea,
    inputArea,
  },

  watch: {
    idFromLeftArea: function(newval) {
      db.collection("USER")
        .doc(currentUser.email)
        .collection("friends")
        .doc(newval)
        .get()
        .then(doc1 => {

          db.collection("USER")
            .doc(doc1.data().email)
            .get()
            .then(doc2 => {
              this.usernameFromLeftArea = doc2.data().username;
            })

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

    callScroll: function() {
      this.$refs.rightArea.chatScroll();
    },

    loadFriendID: function() {
      friendsDocID = [];

      db.collection("USER")
        .doc(currentUser.email)
        .collection("friends")
        .orderBy("lastChatDate", "desc")
        .get()
        .then(friendsSnapshot => {
          friendsSnapshot.forEach(doc1 => {
            friendsDocID.push(doc1.id)
          })
      })
    }
  },

  created: function() {
    this.onAuth();
    currentUser = firebase.auth().currentUser;
    this.loadFriendID();
    this.leftAreaData = friendsDocID;

    db.collection("USER")
      .doc(currentUser.email)
      .collection('friends')
      .limit(1)
      .get()
      .then(friendsSnapshot => {
        this.idFromLeftArea = friendsSnapshot.id;
      })
  },
  
}
  
</script>

<style lang='scss' scoped>
  #directMessageField {
    position: absolute;

    width: 100%;
    height: calc(100% - 100px);

    top: 100px;

    overflow-y: hidden;

    // rightAreaの上の方に表示
    .nameTagArea {
      position: fixed;

      top: 100px;
      right: 17px;

      width: calc(60% - 17px);
      height: 160px;

      background: linear-gradient(to top,
                  rgba(255,255,255,0.1), #fff, #fff);

      z-index: 3;

      .nameTag {
        position: absolute;

        top: 30px;
        left: 10%;

        width: 50%;
        height: 35px;

        background-color: rgba(0, 0, 0, 0);

        font-size: 20px;
        text-align: left;
      }

      .nameBorder {
        position: absolute;

        top: 75px;
        left: 10%;

        width: 85%;
        height: 0;

        border-bottom: solid;
        border-color: #eee;
      }
    }

    // 下部に表示する
    .inputArea {
      position: fixed;

      width: 60%;
      height: 50px;

      right: 0;
      bottom: 45px;

      z-index: 3;
    }
  }
</style>
