<template>
  <div id="leftArea">
    <div class="dmbannerPosition">
      <div v-for="(friend, N) in friendsDocID" :key="N" v-bind:class="'b' + N" >

          <div @click="click(friend)" class="app" id="dm">
            <dmBanner
              :dmBannerUsername="usernames[N]"
              :dmMsg="lastMsg[N]">
            </dmBanner>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
// directMessageFieldからフレンドのIDを受け取ってleftareaの内容を表示する
import dmBanner from'./dmBanner.vue'

import firebase from '../../plugin/firestore';
import 'firebase/firestore'
import '@firebase/auth'
import store from '../../store'

import draggable from 'vuedraggable';

let db = firebase.firestore();

let currentUserEmail;
let lastMsgDate = [];



export default {

  name: 'LeftArea',

  data() {
    return {
      friends: '',
      lastMsg: [],
      usernames: []
    }
  },

  props: [
    'friendsDocID'
  ],

  components: {
    dmBanner
  },

  methods: {
    onAuth: function() {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit('onAuthStateChanged', user);
        store.commit('onUserStatusChanged', user.uid ? true : false);
      })
    },

    // 最後にメッセージが送信された日時とその内容を取得する
    // TODO: returnできるようにする
    loadLastMsgAndDate: function() {
      db.collection("USER")
        .doc(currentUserEmail)
        .collection('friends')
        .orderBy('lastChatDate', 'desc')
        .get()
        .then(friendsSnapshot => {

          friendsSnapshot.forEach(doc1 => {
            // doc1にはフレンドのメールアドレスが格納されている

            db.collection("USER")
              .doc(doc1.data().email)
              .get()
              .then(doc2 => {
                this.usernames.push(doc2.data().username);
              });

            db.collection("PrivateChat")
              .doc(currentUserEmail + doc1.id)
              .collection('contents')
              .orderBy('date', 'desc')
              .limit(1)
              .get()
              .then(contentsSnapshot => {
                contentsSnapshot.forEach(doc2 => {
                  this.lastMsg.push(doc2.data().msg);
                  lastMsgDate.push(doc2.data().date);
                })
              })
            })
      })
    },

    click: function(friend) {
      this.$parent.idFromLeftArea = friend;

    },
  },

  created: function() {
    this.onAuth();
    console.log("leftarea created")
    currentUserEmail = firebase.auth().currentUser.email;
    this.loadLastMsgAndDate();
  },
}

</script>

<style lang='scss' scoped>
  #leftArea {
    overflow-y: scroll;
    overflow-x: hidden;

    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
    width: 45%;

    background-color: $theme_color_dm;

    border-right: solid;
    border-width: 5px;
    border-color: #666;

    z-index: 3;

    .dmbannerPosition{
      $i: 1;
      @while $i <= 30{
        .b#{$i}{
        }
        $i: $i + 1;
      }
    }
  }

</style>
