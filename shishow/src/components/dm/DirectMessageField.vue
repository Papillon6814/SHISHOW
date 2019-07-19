<template>
  <div id="r">

    <div id="directMessageField">
      <leftArea
      :friendsDocID="leftAreaData"
      @showPopup="popup">
      </leftArea>
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

    <div class="entireBox">
      <div class="GameRequestBannerPosition">
        <GameRequestBanner
        @callFade="fadeOut()">
      </GameRequestBanner>
      </div>
    </div>

  </div>

</template>

<script>
// ほとんどのDMコンポーネントの親
// IDをfirebaseから取得してそれぞれのコンポーネントへ送信する
import leftArea from './leftArea.vue'
import rightArea from './rightArea.vue'
import inputArea from './InputArea.vue'
import GameRequestBanner from '../GameRequestBanner.vue'

import firebase from "../../plugin/firestore";
import 'firebase/firestore'
import '@firebase/auth'
import store from '../../store'

let db = firebase.firestore();

let currentUser;
let friendsDocID = [];

let entireBox;

export default {
  name: 'directMessageField',

  data() {
    return{
      rightAreaData: '',
      leftAreaData: [],
      inputAreaData: '',
      idFromLeftArea: '',
      usernameFromLeftArea: ''
    }
  },

  components: {
    leftArea,
    rightArea,
    inputArea,
    GameRequestBanner
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
    },

    popup: function() {
      entireBox[0].style.display = "block";

      this.$forceUpdate();
    },

    fadeOut: function() {
      entireBox[0].style.display = "none";
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

  mounted: function() {
    entireBox = document.getElementsByClassName("entireBox");
  }
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

.entireBox {
  position: fixed;

  display: none;

  width: 100%;
  height: 120%;

  top: 0;
  left: 0;

  z-index: 10000;

  background-color: rgba(0, 0, 0, 0.6);

  transition: 0.3s;

  .GameRequestBannerPosition {
    position: absolute;

    width: 48%;

    top: 150px;
    left: 50%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }
}

</style>
